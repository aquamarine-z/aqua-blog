import React, {useEffect, useRef, useState} from "react";
import styles from "./AdaptiveSVG.module.scss";

export interface AdaptiveSVGProps {
    onInitialize?: (svg?: SVGSVGElement, data?: any) => void,
    onUpdate?: (svg?: SVGSVGElement, data?: any) => void,
    x?: number,
    y?: number,
    width?: number,
    height?: number
    data?: any,

    canMaximize?: boolean,

    showInformation?: boolean,

    playable?: boolean,
    onPlay?: (svg: SVGSVGElement, data?: any) => void,
}


export function AdaptiveSVG({
                                onInitialize = () => {
                                },
                                onUpdate = () => {
                                },
                                x = 0,
                                y = 0,
                                width = 1024,
                                height = 768,
                                data = undefined,

                                canMaximize = true,

                                showInformation = true,

                                playable = false,
                                onPlay = () => {
                                },

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
    const showTitleBar=canMaximize

    const svgElement = <div className={styles["svg-container"]}>

        {showTitleBar ? <div className={styles["title-bar"]}>

        </div> : <div style={{width: "100%", height: "20px"}}/>}
        <svg
            preserveAspectRatio={"xMidYMid meet"}
            className={styles["diagram"] + ` invert`}
            viewBox={viewBox}
            ref={svgRef}
            onResize={(event) => {

            }}
        />
        {showInformation && <div className={styles["diagram-info"]}>
            <p className={styles["info"]}>实际宽高 {actualWidth}:{actualHeight}</p>
            <p className={styles["info"]}>图像ViewBox宽高 {viewBoxWidth}:{viewBoxHeight} </p>
        </div>
        }


    </div>
    useEffect(() => {
        onUpdate(svgRef.current, data);
    }, [data]);
    useEffect(() => {
        if (onInitialize) {
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