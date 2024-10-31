/** @type {import('tailwindcss').Config} */
module.exports = {
corePlugins: {
        preflight: false,
    },
    content: [],
    theme: {
        extend: {},
    },
    plugins: [],
    purge: ['./src/**/*.{js,jsx,ts,tsx}'],
    prefix: "tw-",
}

