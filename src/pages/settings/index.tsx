import {translate} from "@docusaurus/Translate";
import Layout from "@theme/Layout";
import React, {useEffect, useState} from "react";
import {Card, ConfigProvider, Divider, Select, Switch} from "antd";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import {useThemeStore} from "@site/src/store/theme-store";
import {disEnableHeartEffect, enableHeartEffect} from "@site/src/effects/click-effect-heart";
import {disEnableFireworkEffect, enableFireworkEffect} from "@site/src/effects/click-effect-firework";
import {theme as antdTheme} from 'antd';

const {defaultAlgorithm, darkAlgorithm} = antdTheme;

export default function () {
    const [ifmColorPrimary, setIfmColorPrimary] = useState(getComputedStyle(document.documentElement).getPropertyValue('--ifm-color-primary'));
    const [ifmBackgroundColor, setIfmBackgroundColor] = useState(getComputedStyle(document.documentElement).getPropertyValue('--ifm-background-color'));
    const [ifmColorContent, setIfmColorContent] = useState(getComputedStyle(document.documentElement).getPropertyValue('--ifm-color-content'));
    const [isDarkMode, setIsDarkMode] = useState(document.documentElement.getAttribute('data-theme') === 'dark');
    // 在组件卸载时停止观察
    useEffect(() => {
        // 初始化 observer
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    setIfmColorPrimary(getComputedStyle(document.documentElement).getPropertyValue('--ifm-color-primary'));
                    setIfmBackgroundColor(getComputedStyle(document.documentElement).getPropertyValue('--ifm-background-color'));
                    setIfmColorContent(getComputedStyle(document.documentElement).getPropertyValue('--ifm-color-content'));
                    setIsDarkMode(document.documentElement.getAttribute('data-theme') === 'dark');
                }
            }
        });

        // 启动观察
        observer.observe(document.documentElement, {attributes: true, attributeFilter: ['data-theme']});

        // 返回一个清理函数，组件卸载时会调用 disconnect 停止观察
        return () => {
            observer.disconnect();
        };
    }, []); // 如果需要监听属性变化，只执行一次，确保 cleanup
    const themeStore = useThemeStore()
    const generalOptions = [
        {value: 1, label: "开启"},
        {value: 0, label: "关闭"},
        {value: -1, label: "禁用"},
    ]
    const defaultOptions = {
        enable3dBackground: themeStore.generalTheme.enable3dBackground === undefined ? -1 : themeStore.generalTheme.enable3dBackground === true ? 1 : 0,
        enableClickFirework: themeStore.generalTheme.enableClickFirework === undefined ? -1 : themeStore.generalTheme.enableClickFirework === true ? 1 : 0,
        enableClickHeart: themeStore.generalTheme.enableClickHeart === undefined ? -1 : themeStore.generalTheme.enableClickHeart === true ? 1 : 0,
    }
    const theme = {...themeStore.defaultTheme}
    for (const key in themeStore.generalTheme) {
        if (themeStore.generalTheme[key] !== undefined) {
            theme[key] = themeStore.generalTheme[key];
        }
    }
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (theme.enableClickHeart) {
                enableHeartEffect()
            } else {
                disEnableHeartEffect()
            }
            if (theme.enableClickFirework) {
                enableFireworkEffect()
            } else {
                disEnableFireworkEffect()
            }
        }

        //enableFairyDust()

    }, [themeStore]);
    return <Layout
        title={`${translate({id: "settings.title"})}`}
        description="Description will go into a meta tag in <head />">
        <main>
            <div className={"flex flex-col pt-10 pb-10 w-full items-center"}>
                <ConfigProvider
                    theme={

                        {
                            token: {
                                // Seed Token，影响范围大
                                colorPrimary: ifmColorContent,
                                colorBgContainer: ifmBackgroundColor,
                                colorBorder: ifmColorPrimary,
                                colorText: ifmColorContent,
                                borderRadius: 2,

                            },
                            algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                        }}
                >
                    <Card
                        title={<Text className={"text-xl select-none font-bold m-0"}>个性化</Text>}
                        className={"w-11/12 rounded-md"}
                    >
                        <div className={"w-full flex flex-col gap-2"}>
                            <Card
                                title={<Text
                                    className={"text-xl select-none font-bold m-0"}>总控制(非禁用状态下控制所有页面属性)</Text>}
                                className={"w-full rounded-md pl-5 pr-5 gap-2"}
                            >
                                <div className={"w-full flex flex-col items-center justify-start gap-2 select-none"}>
                                    <div className={"w-full flex flex-row items-center justify-between"}>
                                        <Text
                                            className={"font-medium text-lg"}>3D特效{"(仅限可开关此功能的页面)"}</Text>
                                        <Select
                                            className={"w-fit"}
                                            defaultValue={defaultOptions.enable3dBackground}

                                            options={generalOptions} onChange={value => {
                                            themeStore.setThemeStore({
                                                ...themeStore,
                                                generalTheme: {
                                                    ...themeStore.generalTheme,
                                                    enable3dBackground: value === -1 ? undefined : value === 1
                                                }
                                            })
                                        }}/>
                                    </div>

                                    <div className={"w-full flex flex-row items-center justify-between"}>
                                        <Text className={"font-medium text-lg"}>点击烟花效果</Text>
                                        <Select className={"w-fit"}
                                                defaultValue={defaultOptions.enableClickFirework}
                                                options={generalOptions} onChange={value => {
                                            themeStore.setThemeStore({
                                                ...themeStore,
                                                generalTheme: {
                                                    ...themeStore.generalTheme,
                                                    enableClickFirework: value === -1 ? undefined : value === 1
                                                }
                                            })
                                        }}/>
                                    </div>
                                    <div className={"w-full flex flex-row items-center justify-between"}>
                                        <Text className={"font-medium text-lg"}>点击爱心效果</Text>
                                        <Select className={"w-fit"}
                                                defaultValue={defaultOptions.enableClickHeart}
                                                options={generalOptions} onChange={value => {
                                            themeStore.setThemeStore({
                                                ...themeStore,
                                                generalTheme: {
                                                    ...themeStore.generalTheme,
                                                    enableClickHeart: value === -1 ? undefined : value === 1
                                                }
                                            })
                                        }}/>
                                    </div>
                                </div>
                            </Card>
                            <Card
                                title={<Text className={"text-xl select-none font-bold m-0"}>主页</Text>}
                                className={"w-full rounded-md pl-5 pr-5 gap-2"}
                            >
                                <div className={"w-full flex flex-col items-center justify-start gap-2 select-none"}>
                                    <div className={"w-full flex flex-row items-center justify-between"}>
                                        <Text className={"font-medium text-lg"}>3D特效</Text>
                                        <Switch value={themeStore.homepageTheme.enable3dBackground} onChange={value => {
                                            themeStore.setThemeStore({
                                                ...themeStore,
                                                homepageTheme: {
                                                    ...themeStore.homepageTheme,
                                                    enable3dBackground: value
                                                }
                                            })
                                        }}></Switch>
                                    </div>

                                    <div className={"w-full flex flex-row items-center justify-between"}>
                                        <Text className={"font-medium text-lg"}>点击烟花效果</Text>
                                        <Switch value={themeStore.homepageTheme.enableClickFirework}
                                                onChange={value => {
                                                    themeStore.setThemeStore({
                                                        ...themeStore,
                                                        homepageTheme: {
                                                            ...themeStore.homepageTheme,
                                                            enableClickFirework: value
                                                        }
                                                    })
                                                }}></Switch>
                                    </div>
                                    <div className={"w-full flex flex-row items-center justify-between"}>
                                        <Text className={"font-medium text-lg"}>点击爱心效果</Text>
                                        <Switch value={themeStore.homepageTheme.enableClickHeart} onChange={value => {
                                            themeStore.setThemeStore({
                                                ...themeStore,
                                                homepageTheme: {
                                                    ...themeStore.homepageTheme,
                                                    enableClickHeart: value
                                                }
                                            })
                                        }}></Switch>
                                    </div>
                                </div>
                            </Card>
                            <Card
                                title={<Text className={"text-xl select-none font-bold m-0"}>教程</Text>}
                                className={"w-full rounded-md pl-5 pr-5"}
                            >
                                <div className={"w-full flex flex-col items-center justify-start gap-2 select-none"}>
                                    <div className={"w-full flex flex-row items-center justify-between"}>
                                        <Text className={"font-medium text-lg"}>3D特效</Text>
                                        <Switch value={themeStore.docTheme.enable3dBackground} onChange={value => {
                                            themeStore.setThemeStore({
                                                ...themeStore,
                                                docTheme: {
                                                    ...themeStore.docTheme,
                                                    enable3dBackground: value
                                                }
                                            })
                                        }}></Switch>
                                    </div>

                                    <div className={"w-full flex flex-row items-center justify-between"}>
                                        <Text className={"font-medium text-lg"}>点击烟花效果</Text>
                                        <Switch value={themeStore.docTheme.enableClickFirework} onChange={value => {
                                            themeStore.setThemeStore({
                                                ...themeStore,
                                                docTheme: {
                                                    ...themeStore.docTheme,
                                                    enableClickFirework: value
                                                }
                                            })
                                        }}></Switch>
                                    </div>
                                    <div className={"w-full flex flex-row items-center justify-between"}>
                                        <Text className={"font-medium text-lg"}>点击爱心效果</Text>
                                        <Switch value={themeStore.docTheme.enableClickHeart} onChange={value => {
                                            themeStore.setThemeStore({
                                                ...themeStore,
                                                docTheme: {
                                                    ...themeStore.docTheme,
                                                    enableClickHeart: value
                                                }
                                            })
                                        }}></Switch>
                                    </div>
                                </div>
                            </Card>
                            <Card
                                title={<Text className={"text-xl select-none font-bold m-0"}>博客</Text>}
                                className={"w-full rounded-md pl-5 pr-5"}
                            >
                                <div className={"w-full flex flex-col items-center justify-start gap-2 select-none"}>
                                    <div className={"w-full flex flex-row items-center justify-between"}>
                                        <Text className={"font-medium text-lg"}>3D特效</Text>
                                        <Switch value={themeStore.blogTheme.enable3dBackground} onChange={value => {
                                            themeStore.setThemeStore({
                                                ...themeStore,
                                                blogTheme: {
                                                    ...themeStore.blogTheme,
                                                    enable3dBackground: value
                                                }
                                            })
                                        }}></Switch>
                                    </div>

                                    <div className={"w-full flex flex-row items-center justify-between"}>
                                        <Text className={"font-medium text-lg"}>点击烟花效果</Text>
                                        <Switch value={themeStore.blogTheme.enableClickFirework} onChange={value => {
                                            themeStore.setThemeStore({
                                                ...themeStore,
                                                blogTheme: {
                                                    ...themeStore.blogTheme,
                                                    enableClickFirework: value
                                                }
                                            })
                                        }}></Switch>
                                    </div>
                                    <div className={"w-full flex flex-row items-center justify-between"}>
                                        <Text className={"font-medium text-lg"}>点击爱心效果</Text>
                                        <Switch value={themeStore.blogTheme.enableClickHeart} onChange={value => {
                                            themeStore.setThemeStore({
                                                ...themeStore,
                                                blogTheme: {
                                                    ...themeStore.blogTheme,
                                                    enableClickHeart: value
                                                }
                                            })
                                        }}></Switch>
                                    </div>
                                </div>
                            </Card>
                            <Card
                                title={<Text className={"text-xl select-none font-bold m-0"}>其它页面</Text>}
                                className={"w-full rounded-md pl-5 pr-5"}
                            >
                                <div className={"w-full flex flex-col items-center justify-start gap-2 select-none"}>
                                    <div className={"w-full flex flex-row items-center justify-between"}>
                                        <Text
                                            className={"font-medium text-lg"}>3D特效{"(仅限可开关此功能的页面)"}</Text>
                                        <Switch value={themeStore.defaultTheme.enable3dBackground} onChange={value => {
                                            themeStore.setThemeStore({
                                                ...themeStore,
                                                defaultTheme: {
                                                    ...themeStore.defaultTheme,
                                                    enable3dBackground: value
                                                }
                                            })
                                        }}></Switch>
                                    </div>

                                    <div className={"w-full flex flex-row items-center justify-between"}>
                                        <Text className={"font-medium text-lg"}>点击烟花效果</Text>
                                        <Switch value={themeStore.defaultTheme.enableClickFirework} onChange={value => {
                                            themeStore.setThemeStore({
                                                ...themeStore,
                                                defaultTheme: {
                                                    ...themeStore.defaultTheme,
                                                    enableClickFirework: value
                                                }
                                            })
                                        }}></Switch>
                                    </div>
                                    <div className={"w-full flex flex-row items-center justify-between"}>
                                        <Text className={"font-medium text-lg"}>点击爱心效果</Text>
                                        <Switch value={themeStore.defaultTheme.enableClickHeart} onChange={value => {
                                            themeStore.setThemeStore({
                                                ...themeStore,
                                                defaultTheme: {
                                                    ...themeStore.defaultTheme,
                                                    enableClickHeart: value
                                                }
                                            })
                                        }}></Switch>
                                    </div>
                                </div>
                            </Card>
                        </div>

                    </Card>
                </ConfigProvider>
            </div>
        </main>
    </Layout>

}