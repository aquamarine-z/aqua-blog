import React, {JSX, useEffect, useRef, useState} from 'react';
// @ts-ignore
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import type {Props} from '@theme/DocRoot/Layout';

import styles from './styles.module.scss';
import RINGS from "vanta/src/vanta.rings";
import GLOBE from "vanta/src/vanta.globe"
import * as THREE from "three-v121";
import {useThemeStore} from "@site/src/store/theme-store";
import {disEnableFireworkEffect, enableFireworkEffect} from "@site/src/effects/click-effect-firework";
import {disEnableHeartEffect, enableHeartEffect} from "@site/src/effects/click-effect-heart";

export default function DocRootLayout({children}: Props): JSX.Element {
    const themeStore = useThemeStore()
    const theme = {...themeStore.docTheme}
    for (const key in themeStore.generalTheme) {
        if (themeStore.generalTheme[key] !== undefined) {
            theme[key] = themeStore.generalTheme[key];
        }
    }
    const sidebar = useDocsSidebar();
    const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
    //console.log(theme.enable3dBackground)
    // @ts-ignore
    const backgroundRef = useRef()
    const [vantaEffect, setVantaEffect] = useState(null)
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

    }, [theme]);
    useEffect(() => {
        document.documentElement.setAttribute("data-component-style", theme.enable3dBackground ? "glass" : "default")
    }, [theme]);
    useEffect(() => {
        if (!theme.enable3dBackground) {
            if (vantaEffect) vantaEffect.destroy()
            return
        }
        if (!vantaEffect) {
            const effect = GLOBE({
                el: backgroundRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color2: 0x7a7a7a,
               
                backgroundColor: 0x00000000,
                backgroundAlpha:0.85,
            })
            //@ts-ignore
            let canvas = backgroundRef.current.getElementsByClassName('vanta-canvas')
            if (canvas) {
                // @ts-ignore
                canvas.item(0)!.style.position = "fixed"
            }
            setVantaEffect(effect)

        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect, themeStore.docTheme.enable3dBackground])
    return (
        <>
            <div className={'vanta'} ref={backgroundRef}/>
            <div className={styles['background']}>
                <div className={styles.docsWrapper}>
                    <BackToTopButton/>
                    <div className={styles.docRoot}>

                        {sidebar && (
                            <DocRootLayoutSidebar
                                sidebar={sidebar.items}
                                hiddenSidebarContainer={hiddenSidebarContainer}
                                setHiddenSidebarContainer={setHiddenSidebarContainer}
                            />
                        )}

                        <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
                            {children}

                        </DocRootLayoutMain>


                    </div>
                </div>
            </div>


        </>


    )
        ;
}
