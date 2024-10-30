import {VisualizationDisplay} from "@site/src/components/VisualizationDisplay/VisualizationDisplay";
import * as d3 from "d3"
import SyntaxHighlighter from 'react-syntax-highlighter';
import {docco} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {ReactNode} from "react";

export function VisualizationDisplayTest({children}: { children:any}) {
    return (
        <VisualizationDisplay onInitialize={(svg) => {
            d3.select(svg).append("circle").attr("cx", "2500").attr("cy", "1500").attr("r", 5)
        }} onUpdate={() => {
        }} diagramName={"图像"}
                              x={0}
                              y={0}
                              width={3000}
                              height={2000}
                              defaultExpand={["svg", "code"]}
        >
            {children}
        </VisualizationDisplay>
    )
}