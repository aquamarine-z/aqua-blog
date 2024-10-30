import React, {useEffect, useRef, useState} from "react";
import {Collapse, CollapseProps} from "antd";
import styles from "./style.module.css"
import {AdaptiveSVG} from "@site/src/components/AdaptiveSVG/AdaptiveSVG";
export interface VisualizationDisplayProps {
    onInitialize?: (svg: SVGSVGElement) => void,
    onUpdate?: (svg: SVGSVGElement) => void,
    children: React.ReactNode,
    diagramName?: string,
    defaultExpand?: ("code" | "svg")[],

    x?: number,
    y?: number,
    width?: number,
    height?: number,
}
export function VisualizationDisplay({
                                         onInitialize,
                                         onUpdate,
                                         children,
                                         diagramName,
                                         x,
                                         y,
                                         width,
                                         height,
                                         defaultExpand
                                     }: VisualizationDisplayProps) {

    const codeComponent=typeof children==="string"?<code>{children}</code>:children
    const items: CollapseProps['items'] = [
        {
            key: 'code',
            label: '代码',
            children:<div className={styles["code-container"]}>{codeComponent}</div> ,
        },
        {
            key: 'svg',
            label: 'SVG效果',
            children: <AdaptiveSVG onInitialize={onInitialize}
                                   onUpdate={onUpdate}
                                   x={x}
                                   y={y}
                                   width={width}
                                   height={height}
            ></AdaptiveSVG>
        },
    ];

    return <div className={styles["display-block"]}>
        <h1 className={styles["title"]}>{diagramName ? diagramName : ""}</h1>
        <Collapse items={items} defaultActiveKey={defaultExpand ?? ['code', 'svg']}
                  className={styles["display-collapse"]}/>
    </div>
}