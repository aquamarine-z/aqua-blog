import React, {forwardRef, useEffect, useState} from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Giscus, {AvailableLanguage, GiscusProps} from '@giscus/react';
import {
    useThemeConfig,
    useColorMode,
    ThemeConfig
} from '@docusaurus/theme-common';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

interface CustomThemeConfig extends ThemeConfig {
    giscus: GiscusProps & { darkTheme: string };
}

export const Comment = forwardRef<HTMLDivElement>((_props, ref) => {
    const {giscus} = useThemeConfig() as CustomThemeConfig;
    const {colorMode} = useColorMode();
    const {theme = 'light', darkTheme = 'dark_dimmed'} = giscus;
    const giscusTheme = colorMode === 'dark' ? darkTheme : theme;
    const [routeDidUpdate, setRouteDidUpdate] = useState(false);
    const docusaurusConfig=useDocusaurusContext()
    let language=docusaurusConfig.i18n.currentLocale
    if(language==="zh-cn") language="zh-CN"
    if(language==="jp") language="ja"
    useEffect(() => {
        function eventHandler(e) {
            setRouteDidUpdate(true);
        }

        // @ts-ignore
        window.emitter.on('onRouteDidUpdate', eventHandler);

        return () => {
            // @ts-ignore
            window.emitter.off('onRouteDidUpdate', eventHandler);
        };
    }, []);

    if (!routeDidUpdate) {
        return null;
    }

    return (
        <BrowserOnly fallback={<div>Loading Comments...</div>}>
            {() => (
                <div ref={ref} id="comment" style={{paddingTop: 50}}>
                    <Giscus
                        id="comments"
                        mapping="title"
                        strict="1"
                        reactionsEnabled="1"
                        emitMetadata="0"
                        inputPosition="top"
                        lang={language as AvailableLanguage}
                        loading={"eager"}
                        {...giscus}
                        theme={giscusTheme}
                    />
                </div>
            )}
        </BrowserOnly>
    );
});

export default Comment;