import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {HtmlClassNameProvider, ThemeClassNames} from '@docusaurus/theme-common';

import {
    DocsSidebarProvider,
    useDocRootMetadata,
    // @ts-ignore
} from '@docusaurus/plugin-content-docs/client';
import DocRootLayout from '@theme/DocRoot/Layout';
import NotFoundContent from '@theme/NotFound/Content';
import type {Props} from '@theme/DocRoot';
import {useThemeStore} from "@site/src/store/theme-store";
//import RINGS from "vanta/src/vanta.rings";
//import * as THREE from "three";

export default function DocRoot(props: Props): JSX.Element {
    const currentDocRouteMetadata = useDocRootMetadata(props);

    if (!currentDocRouteMetadata) {
        // We only render the not found content to avoid a double layout
        // see https://github.com/facebook/docusaurus/pull/7966#pullrequestreview-1077276692
        return <NotFoundContent/>;
    }
    const themeStore = useThemeStore()
    const theme = {...themeStore.docTheme}
    for (const key in themeStore.generalTheme) {
  if (themeStore.generalTheme[key] !== undefined) {
    theme[key] = themeStore.generalTheme[key];
  }
}
    const {docElement, sidebarName, sidebarItems} = currentDocRouteMetadata;
    return (
        <div data-component-style={theme.enable3dBackground ? "glass" : "default"}>
            <HtmlClassNameProvider className={clsx(ThemeClassNames.page.docsDocPage)}>

                <DocsSidebarProvider name={sidebarName} items={sidebarItems}>

                    <DocRootLayout>
                        {docElement}
                    </DocRootLayout>
                </DocsSidebarProvider>
            </HtmlClassNameProvider>
        </div>
           


    );
}
