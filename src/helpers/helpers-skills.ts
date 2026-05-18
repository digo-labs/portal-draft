import { ComponentType } from 'react';

interface Frontmatter {
  title?:    string;
  subtitle?: string;
  skill?:    string;
}

type MdxModuleFull = { default: ComponentType; frontmatter?: Frontmatter; };

const mdxLoaders = import.meta.glob<MdxModuleFull>('../app/docs/*.mdx');

export class HelpersSkills {
  public getSlug(path: string): string {
    const match = path.match(/\/([^/]+)\.mdx$/);

    return match ? match[1] : '';
  }

  public getLoaderBySlug(): Record<string, () => Promise<MdxModuleFull>> {
    const map: Record<string, () => Promise<MdxModuleFull>> = {};

    for (const [path, loader] of Object.entries(mdxLoaders)) {
      map[this.getSlug(path)] = loader;
    }

    return map;
  }
}
