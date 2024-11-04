import React, {useEffect, useRef, useState} from "react";
import {Collapse, CollapseProps} from "antd";
import styles from "./VisualizationDisplay.module.scss"
import {AdaptiveSVG, AdaptiveSVGProps} from "@site/src/components/AdaptiveSVG/AdaptiveSVG";

export interface VisualizationDisplayProps extends AdaptiveSVGProps {
    children?: React.ReactNode,
    diagramName?: string,
    defaultExpand?: ("code" | "svg")[],
}

export function VisualizationDisplay(props: VisualizationDisplayProps) {
    const codeComponent = typeof props.children === "string" ? <code>{props.children}</code> : props.children
    let items: CollapseProps['items'] = [{
        key: 'svg',
        label: 'SVG效果',
        children: <AdaptiveSVG {...props}/>

    }]
    if (props.children) {
        items = [
            {
                key: 'code',
                label: '代码',
                children: <div className={styles["code-container"]}>{codeComponent}</div>,
            },...items,
        ];
    }

    return <div className={styles["display-block"]}>
        <h1 className={styles["title"]}>{props.diagramName ? props.diagramName : ""}</h1>
        <Collapse items={items} defaultActiveKey={props.defaultExpand ?? ['code', 'svg']}
                  className={styles["display-collapse"]}/>
    </div>
}