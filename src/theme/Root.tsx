'use client'
import React, {useEffect} from 'react';
import {enableHeartEffect} from "@site/src/effects/click-effect-heart";
import {enableFireworkEffect} from "@site/src/effects/click-effect-firework";


// Default implementation, that you can customize
export default function Root({children}) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            enableFireworkEffect()
            enableHeartEffect()
            //startSakura()
        }

        //enableFairyDust()

    }, []);
    return <>{children}</>;
}