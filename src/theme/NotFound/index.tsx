'use client'
import React, {useEffect, useRef, useState} from 'react';
import {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import NotFoundContent from '@theme/NotFound/Content';
//import NET from "vanta/src/vanta.net";
//import BIRDS from 'vanta/src/vanta.birds'
import * as THREE from "three-v121";
import styles from './style.module.scss'
import BrowserOnly from "@docusaurus/BrowserOnly";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export default function Index(): JSX.Element {
    const title = translate({
        id: 'theme.NotFound.title',
        message: 'Page Not Found',
    });
    const [vantaEffect, setVantaEffect] = useState(null)
    const vantaRef = useRef()
    useEffect(() => {

        if (ExecutionEnvironment.canUseDOM&&(!vantaEffect)) {
            import('vanta/src/vanta.birds').then(lib => {
                const BIRDS = lib.default
                const effect = BIRDS({
                el: vantaRef.current,
                THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color1: 0x0,
                color2: 0xffffff,
                birdSize: 1.50,
                separation: 73.00,
                alignment: 40.00,
                cohesion: 55.00,
                backgroundAlpha: 0.00
                })
                //@ts-ignore
                let canvas = vantaRef.current.getElementsByClassName('vanta-canvas')
                if (canvas) {
                    // @ts-ignore
                    canvas.item(0)!.style.position = "fixed"
                }
                setVantaEffect(effect)
            })

        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])
    const components=()=> <>
        <div className={styles['background']}></div>
        <div className={'vanta'} ref={vantaRef}/>

        <PageMetadata title={title}/>
        <Layout>
            <NotFoundContent/>
        </Layout></>
    return <BrowserOnly>
        {components}
    </BrowserOnly>
}
