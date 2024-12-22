import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import fs from 'fs';
import path from 'path';

function customPostCssPlugin() {
    return {
        name: "custom-postcss",
        configurePostCss(options) {
            // Append new PostCSS plugins here.
            options.plugins.push(require("postcss-preset-env")); // allow newest CSS syntax
            return options;
        }
    };
}

const config: Config = {
    title: 'Aquamarine',
    tagline: "Aquamarine's Homepage",
    favicon: 'img/aqua-avatar-round.ico',
    // Set the production url of your site here
    url: 'https://aquamarine-z.github.io',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/aqua-blog/',

    future: {
        experimental_faster: {
            swcJsLoader: true,
            swcJsMinimizer: true,
            swcHtmlMinimizer: true,
            lightningCssMinimizer: true,
            rspackBundler: true,
            mdxCrossCompilerCache: true,
        },
    },
    plugins: [
        'docusaurus-plugin-sass',
        async function tailwindPlugin(context, options) {
            return {
                name: 'docusaurus-tailwindcss',
                configurePostCss(postcssOptions) {
                    postcssOptions.plugins.push(require('tailwindcss'));
                    postcssOptions.plugins.push(require('autoprefixer'));
                    return postcssOptions;
                },
                customPostCssPlugin,
            };
        },

    ],

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'aquamarine-z', // Usually your GitHub org/user name.
    projectName: 'aqua-blog', // Usually your repo name.
    deploymentBranch: "gh-pages",

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',


    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'zh-cn',
        path: "i18n",
        locales: [
            'en',
            'zh-cn',
            "jp",
        ],
        localeConfigs: {
            en: {
                htmlLang: 'en-GB',

            },
            "zh-cn": {
                label: "简体中文",
            },
            jp: {
                label: "日本語"
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
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
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
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
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
    stylesheets: [
        {
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity:
                'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        },
    ],
    clientModules: [require.resolve('./src/clientModules/routeModules.ts')],
    themeConfig: {
        //Replace with your project's social card
        image: 'img/avatar-aqua.png',
        colorMode: {
            defaultMode: 'light',
            disableSwitch: false, // 关闭颜色模式切换开关
            respectPrefersColorScheme: false,
        },
        giscus: {
            repo: 'aquamarine-z/aqua-blog-discussion',
            repoId: 'R_kgDONLC_uw',
            category: 'Announcements',
            categoryId: 'DIC_kwDONLC_u84CkA5u',
            theme: 'light',
            darkTheme: 'dark_dimmed'
        },

        navbar: {

            hideOnScroll: true,
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
                    label: "Learning",
                    position: "right",
                    items: [
                        {to: 'docs/DSA/', label: 'DSA'},
                        {to: 'docs/Japanese/', label: "Japanese"}
                    ]
                },
                {
                    label: '网址导航',
                    position: 'right',
                    items: [
                        {href: 'https://www.educoder.net/', label: '头歌实践教学平台(Java作业)'},
                        {href: 'https://www.scholat.com/login.html', label: '学者网(数据结构实验)'},
                        {href: 'https://www.zhihuishu.com/', label: '智慧树'},
                        {href: 'https://v8.chaoxing.com/', label: '学习通'},
                    ]
                },
                {
                    label: '小工具',
                    position: 'right',
                    items: [
                        {to: '/tools/score-calculator', label: '期末考试合格计算器'},
                    ]
                },
                {
                    to: '/friends',
                    label: 'Friends',
                    position: 'right'
                },

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
                        {
                            label: 'Line',
                            href: "https://line.me/ti/p/6fcWHiO0vg",
                        },
                        {
                            label: 'Github',
                            href: 'https://github.com/aquamarine-z'
                        }
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
                    ],
                }
            ],
            copyright: `Copyright © ${new Date().getFullYear()} Aqua-Blog, Inc. Built with Docusaurus.`,
        },

        docs: {},
        prism: {
            theme: prismThemes.vsLight,
            darkTheme: prismThemes.gruvboxMaterialDark,
            additionalLanguages: ['java', 'cpp', "bash", "plant-uml", "markup"]
        },
    } satisfies Preset.ThemeConfig,

};

export default config;
