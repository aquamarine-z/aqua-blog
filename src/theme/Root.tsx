'use client'
import React, {useEffect} from 'react';
import {enableHeartEffect} from "@site/src/effects/click-effect-heart";
import {enableFireworkEffect} from "@site/src/effects/click-effect-firework";
import BrowserOnly from "@docusaurus/BrowserOnly";
import i18n from "i18next";
import {I18nextProvider} from "react-i18next";
import I18nSync from "@site/src/components/I18nSync";


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
    const root= <>{children}</>
    return <BrowserOnly>{()=>root}</BrowserOnly>
}