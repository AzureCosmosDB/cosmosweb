import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

function readBool(envValue: string | undefined, defaultValue: boolean): boolean {
  if (envValue == null) return defaultValue;

  const normalized = envValue.trim().toLowerCase();
  if (['1', 'true', 'yes', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'off'].includes(normalized)) return false;

  return defaultValue;
}

function readString(envValue: string | undefined): string | null {
  const value = envValue?.trim();
  return value ? value : null;
}

const showAgendaNav = readBool(process.env.CONF_SHOW_AGENDA, true);

const config: Config = {
  title: 'Azure Cosmos DB Dev Home',
  tagline: 'Infinite Scale, Instant Impact!',
  favicon: 'img/favicon.ico',

  clientModules: [
    './src/clientModules/confMobileHashActive.ts',
    './src/clientModules/clientErrorLogger.ts',
  ],

  url: 'https://developer.azurecosmosdb.com',
  baseUrl: '/',

  organizationName: 'azurecosmosdb',
  projectName: 'azurecosmosdbconf',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  // `/conf` is a custom TSX page; Docusaurus' anchor checker can't statically detect
  // anchors rendered by React components, so these are false positives.
  onBrokenAnchors: 'ignore',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        gtag: {
          trackingID: 'G-06VJPSGDCQ',
          anonymizeIP: true,
        },
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [],

  // Values here are serialized into the client bundle and are safe to read in the browser.
  // Use these for `/conf` feature toggles so we don't rely on `process` being defined client-side.
  customFields: (() => {
    const conf: Record<string, unknown> = {};

    // Only set overrides when the env var is explicitly provided.
    // Defaults live in `src/pages/conf/confSettings.json`.
    if (process.env.CONF_SHOW_STREAM !== undefined) {
      conf.showStream = readBool(process.env.CONF_SHOW_STREAM, true);
    }
    if (process.env.CONF_SHOW_AGENDA !== undefined) {
      conf.showAgenda = readBool(process.env.CONF_SHOW_AGENDA, true);
    }
    if (process.env.CONF_STREAM_EMBED_URL !== undefined) {
      conf.streamEmbedUrl = readString(process.env.CONF_STREAM_EMBED_URL);
    }

    return { conf };
  })(),

  themeConfig: {
    // Default social preview image (must exist under /static).
    image: 'img/conf/AzureCosmosDBConf2026_Hero_Landscape.png',
    navbar: {
      title: 'Developer Home',
      logo: {
        alt: 'Azure Cosmos DB Dev Home',
        src: 'img/logo.svg',
      },
      items: [
        {
          label: 'Gallery',
          position: 'left',
          href: 'https://azurecosmosdb.github.io/gallery/',
        },
        {
          to: '/conf',
          type: 'dropdown',
          label: 'Azure Cosmos DB Conf',
          position: 'left',
          items: [
            {
              label: 'Conf Home',
              to: '/conf',
              activeBaseRegex: '^/conf/?$',
              className: 'mobile-only',
            },
            {
              label: 'Cloud Skills Challenge',
              to: '/conf#cloud-skills',
              activeBaseRegex: '^$',
            },
            {
              label: 'News',
              to: '/conf#news',
              // Prevent double-highlighting (e.g. Conf Home + News) in the mobile menu.
              // Docusaurus' active matching is path-based and doesn't handle hash-only routes well.
              activeBaseRegex: '^$',
            },
            ...(showAgendaNav
              ? [
                  {
                    label: 'Agenda',
                    to: '/conf#agenda',
                    activeBaseRegex: '^$',
                  },
                ]
              : []),
            {
              label: 'Speakers',
              to: '/conf#speakers',
              activeBaseRegex: '^$',
            },
            {
              label: 'Resources',
              to: '/conf#resources',
              activeBaseRegex: '^$',
            },
            {
              label: 'Archive',
              to: '/conf#archive',
              activeBaseRegex: '^$',
            },
            {
              label: 'FAQ',
              to: '/conf#faq-section',
              // Hash-only routes: never mark as active to avoid multiple active links.
              activeBaseRegex: '^$',
            },
            {
              label: 'Socials',
              to: '/conf#socials',
              // Hash-only routes: never mark as active to avoid multiple active links.
              activeBaseRegex: '^$',
            },
            {
              label: 'Code Of Conduct',
              to: '/conf/coc',
              activeBasePath: '/conf/coc',
            },
          ],
        },
        {
          label: 'Community',
          position: 'left',
          to: '/community',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: '📄 Azure Cosmos DB Documentation',
              href: 'https://learn.microsoft.com/azure/cosmos-db/',
            },
            {
              label: '📄 Azure DocumentDB (with MongoDB compatibility) documentation',
              href: 'https://learn.microsoft.com/azure/documentdb/',
            },
            {
              label: '📄 Open Source DocumentDB',
              href: 'https://documentdb.io/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/azure-cosmos-db',
            },
            {
              label: 'YouTube',
              href: 'http://aka.ms/AzureCosmosDBYouTube',
            },
            {
              label: 'Discord',
              href: 'https://aka.ms/open-source-discord',
            },
            {
              label: 'X',
              href: 'https://x.com/azurecosmosdb',
            },
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/tags/azure-cosmosdb/info',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: '📖 Blog',
              href: 'https://devblogs.microsoft.com/cosmosdb/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/AzureCosmosDB',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Azure Cosmos DB - Built with ❤️ &nbsp; `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    metadata: [
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  },
};

export default config;
