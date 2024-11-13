'use client'
import React, {useEffect} from 'react';
import {enableHeartEffect} from "@site/src/effects/click-effect-heart";
import {enableFireworkEffect} from "@site/src/effects/click-effect-firework";
import {clickEffectSettings} from "@site/src/theme-settings/click-effect-settings";


// Default implementation, that you can customize
export default function Root({children}) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            if (clickEffectSettings.firework) {
                enableFireworkEffect()
            }
            if (clickEffectSettings.heart) {
                enableHeartEffect()
            }

            //startSakura()
        }

        //enableFairyDust()

    }, []);
    return <>{children}</>;
}