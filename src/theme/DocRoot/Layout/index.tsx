import React, {useEffect, useRef, useState} from 'react';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import BackToTopButton from '@theme/BackToTopButton';
import DocRootLayoutSidebar from '@theme/DocRoot/Layout/Sidebar';
import DocRootLayoutMain from '@theme/DocRoot/Layout/Main';
import type {Props} from '@theme/DocRoot/Layout';

import styles from './styles.module.scss';
import RINGS from "vanta/src/vanta.rings";
import GLOBE from "vanta/src/vanta.globe"
import * as THREE from "three";

export default function DocRootLayout({children}: Props): JSX.Element {
    const sidebar = useDocsSidebar();
    const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);

    const backgroundRef = useRef()
    const [vantaEffect, setVantaEffect] = useState(null)
    useEffect(() => {
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
                color2: 0xf7f7f7,
                backgroundColor: 0x00000000,
                backgroundAlpha:0.9,
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
    }, [vantaEffect])
    return (
        <>
            <div className={'vanta'} ref={backgroundRef}></div>
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
