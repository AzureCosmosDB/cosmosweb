import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Azure Cosmos DB Conf 2025',
  tagline: 'Infinite Scale, Instant Impact!',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://azurecosmosdb.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'azurecosmosdb', // Usually your GitHub org/user name.
  projectName: 'azurecosmosdbconf', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },



  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
      {
          gtag: {
            trackingID: 'G-CNSKHL41CT',
            anonymizeIP: true,
          },
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          }
        }
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1030, // max resized image's size.
        min: 640, // min resized image's size. if original is lower, use that size.
        steps: 2, // the max number of images generated between min and max (inclusive)
        disableInDev: false,
      },
    ],
  ],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Developer Home',
      logo: {
        alt: 'Azure Cosmos DB Conf 2025',
        src: 'img/logo.svg',

      },
      items: [
        { label: 'Gallery', position: 'left', href: 'https://azurecosmosdb.github.io/gallery/', },      
        {
          to: '/conf', type: 'dropdown', label: 'Azure Cosmos DB Conf', position: 'left',
          items: [
            {
              label: 'Conf Home',
              to: '/conf',
              className: 'mobile-only', 
            },
            {
              label: 'News',
              to: '/conf#news',
            },
            {
              label: 'About Azure Cosmos DB Conf',
              to: '/conf#about',
            },
            {
              label: 'Register',
              href: 'https://developer.microsoft.com/en-us/reactor/events/24779/',
            },
            {
              label: 'Agenda',
              to: '/agenda',
            },
            {
              label: 'Speakers',
              to: '/speakers',
            },
            {
              label: 'Archive',
              href: '/archive',
            },
            {
              label: 'FAQ',
              to: '/conf#faq-section',
            },
            {
              label: 'Socials',
              to: '/conf#faq-section',

            },
            {
              label: 'Code Of Conduct',
              to: '/coc',
            }
            
          ],
        },
        { label: 'Community', position: 'left' , to:'/community'},
      ],
    },
    footer: {
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: 'https://learn.microsoft.com/en-us/azure/cosmos-db/introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/tags/azure-cosmosdb/info',
            },
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/@AzureCosmosDB',
            },
            {
              label: 'X',
              href: 'https://x.com/azurecosmsodb',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/azure-cosmos-db',

            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'https://devblogs.microsoft.com/cosmosdb/',
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

    metadata: [{
      name: 'twitter:card',
      content: 'Welcome to the Azure Cosmos DB Conf 2025!',
    }],

    announcementBar: {
      id: 'Add Your Project!',
      content:
        'Join us for <b><a href="https://aka.ms/AzureCosmosDBConf">Azure Cosmos DB Conf</a></b> on April 15 | <b><a href="https://aka.ms/RegisterAzureCosmosDBConf">Click here to register</a></b> with Microsoft Reactor for updates.',
      backgroundColor: '#50E6FF',
      textColor: '#552F99',
      isCloseable: false,
    },
  }
};

export default config;
