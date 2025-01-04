import React, {useEffect, useRef, useState} from "react";
import {Collapse, CollapseProps} from "antd";
import styles from "./VisualizationDisplay.module.scss"
import {AdaptiveSVG, AdaptiveSVGProps} from "@site/src/components/AdaptiveSVG/AdaptiveSVG";
import {translate} from "@docusaurus/Translate";

export interface VisualizationDisplayProps extends AdaptiveSVGProps {
    children?: React.ReactNode,
    diagramName?: string,
    defaultExpand?: ("code" | "svg")[],
}

export function VisualizationDisplay(props: VisualizationDisplayProps) {
    const codeComponent = typeof props.children === "string" ? <code>{props.children}</code> : props.children
    let items: CollapseProps['items'] = [{
        key: 'svg',
        label: translate({id:"components.visualization_display.header.image",description:"Image"}),
        children: <AdaptiveSVG {...props}/>

    }]
    if (props.children) {
        items = [
            {
                key: 'code',
                label: translate({id:"components.visualization_display.header.code",description:"Code"}),
                children: <div className={styles["code-container"]}>{codeComponent}</div>,
            },...items,
        ];
    }

    return <div className={styles["display-block"]}>
        <h1 className={styles["title"]}>{props.diagramName ? props.diagramName : ""}</h1>
        <Collapse items={items} defaultActiveKey={props.defaultExpand ?? ['code', 'svg']}
                  className={styles["display-collapse"]+ ' glass'}/>
    </div>
}