import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
    title: 'Aquamarine',
    tagline: "Aquamarine's Homepage",
    favicon: 'img/aqua-avatar-round.ico',
    // Set the production url of your site here
    url: 'https://aquamarine-z.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/aqua-blog/',
    plugins: [
        'docusaurus-plugin-sass',
        async function myPlugin(context, options) {
        return {
            name: 'docusaurus-tailwindcss',
            configurePostCss(postcssOptions) {
                postcssOptions.plugins.push(require('tailwindcss'));
                postcssOptions.plugins.push(require('autoprefixer'));
                return postcssOptions;
            },
        };
    },
    ],

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'aquamarine-z', // Usually your GitHub org/user name.
    projectName: 'aqua-blog', // Usually your repo name.
    deploymentBranch:"gh-pages",

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-cn',
        locales: [
            //'en',
            'zh-cn',
            //"jp",
        ],
        localeConfigs: {
            en: {
                htmlLang: 'en-GB',

            },
            "zh-cn":{
                label:"简体中文",
            },
            jp:{
                label:"日本語"
            }
            // 如果不需要重写默认值，可以忽略 locale (例如 fr)
        },

    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    //editUrl:
                        //'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    /*editUrl:
                        'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                    */
                    // Useful options to enforce blogging best practices

                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                theme: {

                    customCss: [
                        './src/css/custom.css',
                        './src/css/tailwind.css',
                        './src/css/fix-footer.css',

                    ],
                },
            } satisfies Preset.Options,
        ],
    ],

    themeConfig: {
        //Replace with your project's social card
        image: 'img/avatar-aqua.png',
        colorMode: {
            defaultMode: 'light',
            disableSwitch: false, // 关闭颜色模式切换开关
            respectPrefersColorScheme: false,
        },

        navbar: {

            hideOnScroll:true,
            title: 'My Site',
            logo: {
                alt: 'My Site Logo',
                src: 'img/avatar-aqua-round.png',

            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: 'Tutorial',
                },
                {to: '/blog', label: 'Blog', position: 'left'},
                {
                    href: 'https://github.com/aquamarine-z',
                    label: 'GitHub',
                    position: 'right',
                },
                {
                    type: 'localeDropdown',
                    position: 'left',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [
                {
                    title: 'Docs',
                    items: [
                        {
                            label: 'Tutorial',
                            to: '/docs/intro',
                        },
                    ],
                },
                {
                    title: 'Community',
                    items: [
                        /*{
                            label: 'Stack Overflow',
                            href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                        },
                        {
                            label: 'Discord',
                            href: 'https://discordapp.com/invite/docusaurus',
                        },
                        {
                            label: 'Twitter',
                            href: 'https://twitter.com/docusaurus',
                        },*/
                    ],
                },
                {
                    title: 'More',
                    items: [
                        {
                            label: 'Blog',
                            to: '/blog',
                        },
                        {
                            label: 'GitHub',
                            href: 'https://github.com/aquamarine-z',
                        },
                    ],
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
