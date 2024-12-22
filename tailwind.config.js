/** @type {import('tailwindcss').Config} */
module.exports = {
corePlugins: {
        preflight: false,
    },
    content: [],
    theme: {
        extend: {},
    },
    plugins: [require('tailwind-scrollbar')({ nocompatible: true })], // 使用 scrollbar 插件
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    prefix: "",
}

