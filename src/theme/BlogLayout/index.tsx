import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';

import type {Props} from '@theme/BlogLayout';
//import GLOBE from "vanta/src/vanta.globe";
import DOTS from "vanta/src/vanta.dots"
import WAVES from "vanta/src/vanta.waves"
import BIRDS from 'vanta/src/vanta.birds'
import CLOUDS2 from 'vanta/src/vanta.clouds2'
import TOPOLOGY from 'vanta/src/vanta.topology'
import FOG from 'vanta/src/vanta.fog'
import NET from 'vanta/src/vanta.net'
import styles from "./style.module.scss"
import * as THREE from "three";
import {backgroundSettings} from "@site/src/theme-settings/background-settings";

export default function BlogLayout(props: Props): JSX.Element {
    const {sidebar, toc, children, ...layoutProps} = props;
    const hasSidebar = sidebar && sidebar.items.length > 0;
    const vantaRef = useRef()
    const [vantaEffect, setVantaEffect] = useState(null)
    useEffect(() => {
        if (!vantaEffect) {
            if (!backgroundSettings.blog.threeBackground.enable) return
            const effect = NET({
                el: vantaRef.current,
                THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0xd7c4fc,
                backgroundColor: 0x1c0946,
                points: 15.00,
                maxDistance: 13.00,
                spacing: 16.00
            })
            /*const effect = FOG({
                el: vantaRef.current,
                THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00
            })*/

            /*const effect = BIRDS({
                el: vantaRef.current,
                THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                backgroundColor: 0xffffff,
                colorMode: "lerp",
                birdSize: 1.10,
                wingSpan: 34.00,
                speedLimit: 7.00,
                separation: 46.00,
                alignment: 1.00,
                cohesion: 71.00,
                backgroundAlpha: 0.00
            })*/
            /*const effect = WAVES({
                el: vantaRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00
            })*/
            //@ts-ignore
            let canvas = vantaRef.current.getElementsByClassName('vanta-canvas')
            if (canvas) {
                // @ts-ignore
                //canvas.item(0)!.style.position = "fixed"
            }
            setVantaEffect(effect)

        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])
    return (
        <Layout {...layoutProps}>
            {
                backgroundSettings.blog.threeBackground.enable ? <>
                    <div className={styles['background']}/>
                    <div className={'vanta' + ''} ref={vantaRef}/>

                    <div className={"container margin-vert--lg min-h-[100vh]"}>
                        <div className="row">

                            <BlogSidebar sidebar={sidebar}/>
                            <main
                                className={clsx('col', {
                                    'col--7': hasSidebar,
                                    'col--9 col--offset-1': !hasSidebar,

                                },)}>
                                {children}
                            </main>
                            {toc && <div className="col col--2">{toc}</div>}
                        </div>
                    </div>
                </> : <div className={"container margin-vert--lg min-h-[100vh]"}>
                    <div className="row">

                        <BlogSidebar sidebar={sidebar}/>
                        <main
                            className={clsx('col', {
                                'col--7': hasSidebar,
                                'col--9 col--offset-1': !hasSidebar,

                            },)}>
                            {children}
                        </main>
                        {toc && <div className="col col--2">{toc}</div>}
                    </div>
                </div>
            }


        </Layout>
    );
}
