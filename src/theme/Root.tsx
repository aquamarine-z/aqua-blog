'use client'
import React, {useEffect} from 'react';
import BrowserOnly from "@docusaurus/BrowserOnly";

// Default implementation, that you can customize
export default function Root({children}) {
    useEffect(() => {
        document.documentElement.setAttribute("data-component-style", "default")
    }, []);
    const root = <>{children}</>
    return <BrowserOnly>{() => root}</BrowserOnly>
}