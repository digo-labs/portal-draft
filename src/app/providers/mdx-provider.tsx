import { CodeBlock, CodeBlockHeader, CodeBlockTitle, CodeBlockActions, CodeBlockCopyButton } from '@digo-labs/ui';

import { ReactNode }                    from 'react';
import { MDXProvider as MDXJSProvider } from '@mdx-js/react';
import type { MDXComponents }           from 'mdx/types';

import { SkillPreview } from 'app/components/skills/skill-preview';

const components: MDXComponents = {
  SkillPreview: SkillPreview,
  h1:   props => <h1 className="typo-header text-neutral-12 mb-6 text-4xl" {...props} />,
  h2:   ({ id, ...props }) => <h2 id={id} className="typo-header text-neutral-12 mt-10 mb-4 text-2xl" {...props} />,
  h3:   ({ id, ...props }) => <h3 id={id} className="typo-header text-neutral-11 mt-6 mb-4 text-xl" {...props} />,
  p:    props => <p className="typo-body text-neutral-10 typo-3 mb-4 leading-relaxed" {...props} />,
  code: (props) => {
    if (typeof props.children === 'string') {
      return <code className="bg-accent-2 border-accent-3 text-accent-11 typo-2 typo-code rounded-xs border px-1.5 py-0.5" {...props} />;
    }
    return <code {...props} />;
  },
  pre: ({ children }) => {
    const codeElement = children as { props?: { className?: string; children?: unknown } };
    const match       = /language-(\w+)/.exec(codeElement?.props?.className || '');
    const language    = match?.[1] || 'text';
    const code        = codeElement?.props?.children;
    const codeString  = typeof code === 'string' ? code : Array.isArray(code) ? code.join('') : String(code || '');

    return (
      <CodeBlock code={codeString} language={language} className="not-prose my-4">
        <CodeBlockHeader>
          <CodeBlockTitle />
          <CodeBlockActions>
            <CodeBlockCopyButton />
          </CodeBlockActions>
        </CodeBlockHeader>
      </CodeBlock>
    );
  },

  table: props => <table {...props} className="my-6 w-full border-separate border-spacing-0" />,
  th:    props => <th {...props} className="border-neutral-4 bg-neutral-2 typo-3 typo-label text-neutral-12 border-y border-r px-4 py-3 text-left shadow-md first:rounded-l-sm first:border-l last:rounded-r-sm" />,
  td:    props => <td {...props} className="border-neutral-6 typo-3 typo-code text-neutral-11 border-b border-dashed p-4" />,

  ul:     props => <ul {...props} className="text-neutral-10 typo-3 typo-body mb-4 list-inside list-disc leading-relaxed" />,
  ol:     props => <ol {...props} className="text-neutral-10 typo-3 typo-body mb-4 list-inside list-decimal leading-relaxed" />,
  li:     props => <li {...props} className="mb-1" />,
  strong: props => <strong {...props} className="text-neutral-12 typo-weight-600" />,
  a:      props => <a {...props} className="text-accent-11 typo-weight-600 hover:text-accent-12 hover:underline" />,
};

export function MDXProvider(properties: { children: ReactNode; }) {
  const { children } = properties;
  return (
    <MDXJSProvider components={components}>
      {children}
    </MDXJSProvider>
  );
}
