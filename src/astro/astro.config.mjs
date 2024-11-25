import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vue from '@astrojs/vue';
import node from '@astrojs/node';
import angular from "@analogjs/astro-angular";
import config from '/src/temp/config';

const reactConfig = {
  babel: {
    "presets": [
      [
        "@babel/preset-react",
        {
          "runtime": "classic"
        }
      ]
    ],
    "plugins": [
      ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ]
  }
}

const angularConfig = {
  vite: {
    transformFilter: (code, id ) => {
      return !id.includes('/packages/astro-sitecore-jss/')
    },
  }
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(reactConfig),
    vue(),
    angular(angularConfig)
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