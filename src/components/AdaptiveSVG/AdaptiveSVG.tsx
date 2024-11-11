import React, {ReactDOM, useEffect, useRef, useState} from "react";

import styles from "./AdaptiveSVG.module.scss";
// @ts-ignore
import playImage from "/static/icon/MdiPlay.png"
// @ts-ignore
import maxImage from "/static/icon/SolarMaximizeLinear.png"
import {createPortal, render} from "react-dom";
import {createRoot} from "react-dom/client";
import {style} from "d3";

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

function showMaximumImage(component: React.ReactNode) {

    if (document.body.getElementsByClassName("modal").length != 0) {
        return
    }
    const onClose = () => {
        document.body.style.overflow = ""
        document.body.removeChild(div)
    }
    const imageComponent = <div onClick={(event) => {
        event.stopPropagation()
        onClose()
    }} className={styles["maximize-background"]}>
        <div className={styles["maximize-container"]+' glass' } onClick={(e) => {
            e.stopPropagation()
        }}>
            {component}
        </div>
    </div>
    const div = document.createElement("div")

    document.body.appendChild(div)
    document.body.style.overflow = "hidden"
    div.setAttribute("class", "modal")
    div.focus()
    const root = createRoot(div)
    root.render(imageComponent)
}

function TitleBarButton({imageUrl, onClick}: {
    imageUrl: string,
    onClick: () => void
}) {
    return <img src={imageUrl} className={styles['title-bar-button']} onClick={onClick}/>
}

export function AdaptiveSVG(props: AdaptiveSVGProps) {
    const {
        x = 0,
        y = 0,
        width = 1024,
        height = 768,
        data = undefined,

        showInformation = true,

        canMaximize = true,

        playable = false,
        onInitialize = () => {
        },
        onUpdate=()=>{},
        onPlay=()=>{},
    } = props
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
    const showTitleBar = canMaximize || playable
    //console.log(showTitleBar)

    const titleBar = showTitleBar ? <div className={styles["title-bar"]}>
        {canMaximize && <TitleBarButton imageUrl={maxImage} onClick={() => {
            showMaximumImage(
                <AdaptiveSVG {...props} canMaximize={false}/>
            )
        }}/>}
        {playable && <TitleBarButton imageUrl={playImage} onClick={() => {
        }}/>}
    </div> : <div style={{width: "100%", height: "20px"}}/>
    const svgElement = <div className={styles["svg-container"]+' glass'}>
        {titleBar}
        <svg
            preserveAspectRatio={"xMidYMid meet"}
            className={styles["diagram"] + ` invert-color`}
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