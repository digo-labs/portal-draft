import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
  plugins: [
    babel({
      plugins: ['module:@preact/signals-react-transform'],
    }),
    react(),
    tailwindcss(),
    mdx({
      providerImportSource: '@mdx-js/react',
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [rehypeSlug],
    }),
  ],
  server: {
    port: 8008,
  },
  resolve: {
    tsconfigPaths: true,
    conditions: ['module', 'browser', 'import'],
  },
  build: {
    chunkSizeWarningLimit: 10000,
  },
});
