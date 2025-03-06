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
module.exports = function tailwindPlugin(context, options) {
    return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
            postcssOptions.plugins.push(require('@tailwindcss/postcss'));
            postcssOptions.plugins.push(require('autoprefixer'));
            return postcssOptions;
        },
        customPostCssPlugin,
    };
}