import {create} from "zustand";
import {persist} from "zustand/middleware";

export interface ThemeStore {
    blogTheme: ThemeOption,
    docTheme: ThemeOption,
    defaultTheme: ThemeOption,
    homepageTheme: ThemeOption,
    generalTheme: ThemeOption,
    setThemeStore(themeStore: ThemeStore): void
}

export interface ThemeOption {
    enableClickHeart?: boolean,
    enableClickFirework?: boolean,
    enable3dBackground?: boolean,
}

export const useThemeStore = create<ThemeStore>()(persist((set, get) => {
    return {
        blogTheme: {
            enableClickHeart: true,
            enableClickFirework: true,
            enable3dBackground: true,
        },
        docTheme: {
            enableClickHeart: true,
            enableClickFirework: true,
            enable3dBackground: true,
        },
        defaultTheme: {
            enableClickHeart: true,
            enableClickFirework: true,
            enable3dBackground: true,
        },
        generalTheme: {
            enableClickHeart: undefined,
            enableClickFirework: undefined,
            enable3dBackground: undefined,
        },
        homepageTheme: {
            enableClickHeart: true,
            enableClickFirework: true,
            enable3dBackground: true,
        },
        setThemeStore: (themeStore) => set(themeStore)
    }
}, {name: "aqua-blog-theme-store"}))