import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// GitHub Pages config. Owner: Vadosina-git, repo: bondarguard-site.
// If owner moves to a <user>.github.io repo in the future, drop `base`.
export default defineConfig({
  site: 'https://vadosina-git.github.io',
  base: '/bondarguard-site/',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !/\/api\//.test(page),
    }),
    mdx(),
  ],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  build: {
    assets: 'assets',
  },
});
