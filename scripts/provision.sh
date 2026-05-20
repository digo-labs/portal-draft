#!/usr/bin/env bash
set -euo pipefail

# ============================================================================
# provision.sh — set up AWS infrastructure for an app cloned from app-template.
#
# Creates:
#   • .env from AWS Secrets Manager (DATABASE_URL_MONOREPO, ADMIN_SECRET)
#   • S3 bucket: <app-name>-storage (private, SSE-S3)
#   • Amplify app named <app-name>, connected to this repo's GitHub origin
#   • Amplify 'main' branch with auto-build enabled
#   • Domain association + auto Route 53 CNAME (subdomain → CloudFront)
#     Amplify auto-creates the Route 53 record when the hosted zone is in this account.
#   • Postgres schema + tables in shared RDS (via 'npm run db:push')
#
# Prerequisites:
#   • AWS CLI v2 configured (`aws sts get-caller-identity` must work)
#   • AWS profile has secretsmanager:GetSecretValue for monorepo/* secrets
#   • Git repo with `origin` remote pointing at a GitHub URL
#   • Amplify GitHub App connection already set up for the digo-labs org
#   • Wildcard *.digo-labs.com ACM cert exists in us-east-1
#
# Usage:
#   ./scripts/provision.sh <app-name> [subdomain]
# Examples:
#   ./scripts/provision.sh cool-tool                # subdomain defaults to 'cool-tool'
#   ./scripts/provision.sh cool-tool internal-cool  # custom subdomain
# ============================================================================

# ---- Constants ----
readonly AWS_REGION="us-east-1"
readonly AWS_ACCOUNT="954039860919"
readonly HOSTED_ZONE_NAME="digo-labs.com"
readonly CERT_ARN="arn:aws:acm:us-east-1:954039860919:certificate/17f20f17-350c-4c3e-8c54-2f7717c668cd"

# ---- Args ----
APP_NAME="${1:-}"
SUBDOMAIN="${2:-${APP_NAME}}"

if [ -z "$APP_NAME" ]; then
  echo "Usage: $0 <app-name> [subdomain]" >&2
  exit 1
fi

# ---- Validate inputs ----
if [[ ! "$APP_NAME" =~ ^[a-z0-9][a-z0-9-]*[a-z0-9]$ ]]; then
  echo "✗ app-name must be lowercase alphanumeric + hyphens (e.g. 'cool-tool'); got '$APP_NAME'" >&2
  exit 1
fi
if [[ ! "$SUBDOMAIN" =~ ^[a-z0-9][a-z0-9-]*[a-z0-9]$ ]]; then
  echo "✗ subdomain must be lowercase alphanumeric + hyphens; got '$SUBDOMAIN'" >&2
  exit 1
fi

# ---- Validate AWS credentials ----
if ! aws sts get-caller-identity --region "$AWS_REGION" >/dev/null 2>&1; then
  echo "✗ AWS credentials not configured. Run 'aws configure' or set AWS_PROFILE." >&2
  exit 1
fi

# ---- Detect repo URL ----
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.."

if ! REPO_URL=$(git remote get-url origin 2>/dev/null) || [ -z "$REPO_URL" ]; then
  echo "✗ Could not read git remote 'origin'. Push the repo to GitHub first." >&2
  exit 1
fi
# Convert SSH-style URLs to HTTPS (Amplify expects HTTPS)
if [[ "$REPO_URL" =~ ^git@github.com:(.+)$ ]]; then
  REPO_URL="https://github.com/${BASH_REMATCH[1]%.git}"
fi
REPO_URL="${REPO_URL%.git}"

# ---- Confirm ----
cat <<EOF

Will provision:
  App name:    $APP_NAME
  Subdomain:   $SUBDOMAIN.$HOSTED_ZONE_NAME
  Repository:  $REPO_URL
  S3 bucket:   $APP_NAME-storage
  Amplify:     branch 'main', auto-build on push
  Cert:        wildcard *.digo-labs.com
  Database:    .env from AWS Secrets Manager + 'npm run db:push' (creates Postgres schema + tables)

EOF
read -p "Proceed? [y/N] " -r REPLY
echo
[[ "$REPLY" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 0; }

# ---- 0. Write .env from AWS Secrets Manager ----
if [ -f ".env" ]; then
  echo "↷ .env exists; leaving it alone."
else
  echo "→ Fetching secrets from AWS Secrets Manager..."

  if ! DATABASE_URL=$(aws secretsmanager get-secret-value \
        --secret-id monorepo/database-url \
        --region "$AWS_REGION" \
        --query SecretString --output text 2>&1); then
    echo "✗ Failed to read secret monorepo/database-url:" >&2
    echo "  $DATABASE_URL" >&2
    echo "" >&2
    echo "  Your AWS profile may not have 'secretsmanager:GetSecretValue' permission." >&2
    echo "  Either run with AWS_PROFILE=digo, or ask the admin to grant the permission" >&2
    echo "  on the 'Developers' IAM group (resources: monorepo/database-url, monorepo/admin-secret)." >&2
    exit 1
  fi

  if ! ADMIN_SECRET=$(aws secretsmanager get-secret-value \
        --secret-id monorepo/admin-secret \
        --region "$AWS_REGION" \
        --query SecretString --output text 2>&1); then
    echo "✗ Failed to read secret monorepo/admin-secret:" >&2
    echo "  $ADMIN_SECRET" >&2
    exit 1
  fi

  printf 'DATABASE_URL_MONOREPO=%s\nADMIN_SECRET=%s\n' "$DATABASE_URL" "$ADMIN_SECRET" > .env
  chmod 600 .env
  echo "  ✓ Wrote .env (mode 600)"
fi

# ---- 1. S3 bucket ----
BUCKET="$APP_NAME-storage"
if aws s3api head-bucket --bucket "$BUCKET" 2>/dev/null; then
  echo "↷ S3 bucket $BUCKET exists; leaving it alone."
else
  echo "→ Creating S3 bucket $BUCKET..."
  aws s3api create-bucket --bucket "$BUCKET" --region "$AWS_REGION" >/dev/null
  aws s3api put-bucket-encryption \
    --bucket "$BUCKET" \
    --server-side-encryption-configuration '{"Rules":[{"ApplyServerSideEncryptionByDefault":{"SSEAlgorithm":"AES256"}}]}'
  aws s3api put-public-access-block \
    --bucket "$BUCKET" \
    --public-access-block-configuration BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
fi

# ---- 2. Amplify app ----
BUILD_SPEC=$(cat <<'YAML'
version: 1
applications:
  - frontend:
      phases:
        preBuild:
          commands:
            - npm install
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: dist
        files:
          - '**/*'
      cache:
        paths:
          - node_modules/**/*
YAML
)

CUSTOM_RULES='[{"source":"</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>","status":"200","target":"/index.html"}]'

APP_ID=$(aws amplify list-apps --region "$AWS_REGION" --query "apps[?name=='$APP_NAME'].appId | [0]" --output text 2>/dev/null || true)
if [ -n "$APP_ID" ] && [ "$APP_ID" != "None" ]; then
  echo "↷ Amplify app '$APP_NAME' exists (id $APP_ID); leaving it alone."
else
  echo "→ Fetching GitHub PAT from AWS Secrets Manager..."
  if ! GITHUB_PAT=$(aws secretsmanager get-secret-value \
        --secret-id monorepo/github-pat \
        --region "$AWS_REGION" \
        --query SecretString --output text 2>&1); then
    echo "✗ Failed to read secret monorepo/github-pat:" >&2
    echo "  $GITHUB_PAT" >&2
    echo "" >&2
    echo "  Your AWS profile may not have 'secretsmanager:GetSecretValue' permission" >&2
    echo "  on monorepo/github-pat. Ask the admin to add it to the Developers IAM group." >&2
    exit 1
  fi

  echo "→ Creating Amplify app '$APP_NAME'..."
  APP_ID=$(aws amplify create-app \
    --name "$APP_NAME" \
    --repository "$REPO_URL" \
    --access-token "$GITHUB_PAT" \
    --platform WEB \
    --build-spec "$BUILD_SPEC" \
    --custom-rules "$CUSTOM_RULES" \
    --region "$AWS_REGION" \
    --query "app.appId" --output text)
  unset GITHUB_PAT  # remove from environment after use
  echo "  App id: $APP_ID"
fi

# ---- 3. main branch ----
if aws amplify get-branch --app-id "$APP_ID" --branch-name main --region "$AWS_REGION" >/dev/null 2>&1; then
  echo "↷ Branch 'main' exists; leaving it alone."
else
  echo "→ Creating Amplify branch 'main'..."
  aws amplify create-branch \
    --app-id "$APP_ID" \
    --branch-name main \
    --enable-auto-build \
    --stage PRODUCTION \
    --region "$AWS_REGION" >/dev/null
fi

# ---- 4. Domain association ----
if aws amplify get-domain-association --app-id "$APP_ID" --domain-name "$HOSTED_ZONE_NAME" --region "$AWS_REGION" >/dev/null 2>&1; then
  echo "↷ Domain association for $HOSTED_ZONE_NAME exists; leaving it alone."
else
  echo "→ Creating domain association: $SUBDOMAIN.$HOSTED_ZONE_NAME → branch 'main'..."
  aws amplify create-domain-association \
    --app-id "$APP_ID" \
    --domain-name "$HOSTED_ZONE_NAME" \
    --sub-domain-settings "[{\"prefix\":\"$SUBDOMAIN\",\"branchName\":\"main\"}]" \
    --certificate-settings "type=CUSTOM,customCertificateArn=$CERT_ARN" \
    --region "$AWS_REGION" >/dev/null
fi

# ---- 5. Push database schema + tables ----
echo "→ Running 'npm run db:push' (create schema, push tables, verify, refresh backend)..."
npm run db:push

# ---- Summary ----
cat <<EOF

✓ Provisioning complete.

  App ID:      $APP_ID
  App URL:     https://$SUBDOMAIN.$HOSTED_ZONE_NAME
  S3 bucket:   s3://$BUCKET
  DNS:         Amplify auto-creates $SUBDOMAIN.$HOSTED_ZONE_NAME CNAME (typically ~30s)
  Database:    schema + tables pushed, verified, backend refreshed

Next:
  1. Push a commit to 'main' to trigger the first build. Amplify will run
     'npm install && npm run build' and deploy.
  2. First build is typically 3–5 minutes. Watch progress at
     https://us-east-1.console.aws.amazon.com/amplify/home?region=us-east-1#/$APP_ID
  3. DNS may take a minute or two to propagate.

EOF