import React, {useEffect, useRef, useState} from "react";
import {Collapse, CollapseProps} from "antd";
import styles from "./styles.module.css"

export interface VisualizationDisplayProps {
    onInitialize: (svg: SVGSVGElement) => void,
    onUpdate: () => void,
    children: React.ReactNode,
    diagramName?: string,

    x?: number,
    y?: number,
    width?: number,
    height?: number,
}

export interface SvgSizeInformation {

}

export function VisualizationDisplay({
                                         onInitialize,
                                         onUpdate,
                                         children,
                                         diagramName,
                                         x,
                                         y,
                                         width,
                                         height
                                     }: VisualizationDisplayProps) {
    const svgRef = useRef<SVGSVGElement>()
    const startX = x ?? 0
    const startY = y ?? 0
    const endX = startX + (width ?? 1024)
    const endY = startY + (height ?? 768)
    const viewBox = `${startX} ${startY} ${endX} ${endY}`
    const [viewBoxWidth, setViewBoxWidth] = useState(endX - startX)
    const [viewBoxHeight, setViewBoxHeight] = useState(endY - startY)
    const [actualWidth, setActualWidth] = useState(0)
    const [actualHeight, setActualHeight] = useState(0)
    const svgElement = <div>
        <svg
            className={styles["diagram"]}
            viewBox={viewBox}
            ref={svgRef}
            onResize={(event) => {

            }}
        />
        <p>实际宽高: {actualWidth}:{actualHeight}</p>
        <p>图像ViewBox宽高: {viewBoxWidth}:{viewBoxHeight} </p>
    </div>

    useEffect(() => {
        onInitialize(svgRef.current)
        const viewBoxObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'viewBox') {
                    // @ts-ignore
                    const viewBoxStrs = mutation.target.getAttribute('viewBox').toString().split(" ")
                    //const x=viewBoxStrs[0]
                    //const y=viewBoxStrs[1]
                    const width = viewBoxStrs[2] - viewBoxStrs[0]
                    const height = viewBoxStrs[3] - viewBoxStrs[1]
                    setViewBoxWidth(width)
                    setViewBoxHeight(height)
                    // console.log(x,y,width,height)

                }
            });
        });
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const width = Math.floor(entry.contentRect.width)
                const height = Math.floor(entry.contentRect.height)
                setActualWidth(width)
                setActualHeight(height)
            }
        });


        resizeObserver.observe(svgRef.current)
        viewBoxObserver.observe(svgRef.current, {attributes: true});
        return () => {
            viewBoxObserver.disconnect()
            resizeObserver.disconnect()
        }
    }, []);
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: '代码',
            children: <div>{children}</div>,
        },
        {
            key: '2',
            label: 'SVG效果',
            children: svgElement
        },
    ];

    return <div className={styles["display-block"]}>
        <h1 className={styles["title"]}>{diagramName ? diagramName : ""}</h1>
        <Collapse items={items} defaultActiveKey={['1', '2']} className={styles["display-collapse"]}/>

    </div>
}