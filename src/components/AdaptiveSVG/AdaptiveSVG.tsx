import React, {useEffect, useRef, useState} from "react";
import styles from "./style.module.css";

export interface AdaptiveSVGProps {
    onInitialize?: (svg: SVGSVGElement) => void,
    onUpdate?: (svg: SVGSVGElement) => void,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
}

export function AdaptiveSVG({
                                onInitialize,
                                onUpdate,
                                x,
                                y,
                                width,
                                height,
                            }: AdaptiveSVGProps) {
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
            preserveAspectRatio={"xMidYMid meet"}
            className={styles["diagram"]}
            viewBox={viewBox}
            ref={svgRef}
            onResize={(event) => {

            }}
        />
        <div className={styles["diagram-info"]}>
            <p>实际宽高 {actualWidth}:{actualHeight}</p>
            <p>图像ViewBox宽高 {viewBoxWidth}:{viewBoxHeight} </p>
        </div>

    </div>
    useEffect(() => {
        if(onInitialize){
            onInitialize(svgRef.current)
        }

    }, []);
    useEffect(() => {

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
    return svgElement
}