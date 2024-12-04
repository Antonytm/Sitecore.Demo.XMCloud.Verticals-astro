import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import config from '/src/temp/config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react()
  ],
  output: 'server',
  server: {
		headers: {
			"Access-Control-Allow-Origin": "*"
		}
	},
  adapter: node({
    mode: 'standalone',
  }),
  outDir: './dist',
  security: {
    checkOrigin: false,
  },
  i18n: {
    defaultLocale: "en",
    locales: ["fr-CA", "en", "ja-JP"],
  },
  redirects: {
    '/-/jssmedia/[...slug]': `${config.sitecoreApiHost}/-/jssmedia/[...slug]`,
    '/-/media/[...slug]': `${config.sitecoreApiHost}/-/media/[...slug]`,
    '/sitecore/api/[...slug]': `${config.sitecoreApiHost}/sitecore/api/[...slug]`,
  },
  image: {
    domains: [`${config.publicUrl}`]
  }
});