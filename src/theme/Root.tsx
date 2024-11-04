import React, {useEffect} from 'react';
import {enableHeartEffect} from "@site/src/effects/click-effect-heart";
import {enableFairyDust} from "@site/src/effects/cursor-effect-fairy-dust";
import {startSakura} from "@site/src/effects/background-sakura";
import {enableFireworkEffect} from "@site/src/effects/click-effect-firework";


// Default implementation, that you can customize
export default function Root({children}) {
    useEffect(() => {
        enableFireworkEffect()
        enableHeartEffect()
        //enableFairyDust()
        startSakura()
    }, []);
    return <>{children}</>;
}