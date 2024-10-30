import {VisualizationDisplay} from "@site/src/components/VisualizationDisplay/VisualizationDisplay";
import * as d3 from "d3"

export function VisualizationDisplayTest() {
    return (
        <VisualizationDisplay onInitialize={(svg) => {
            d3.select(svg).attr("preserveAspectRatio", "xMidYMid meet")
            d3.select(svg).append("circle").attr("cx", "2500").attr("cy", "1500").attr("r", 5)


        }} onUpdate={() => {
        }} diagramName={"图像"}
                              x={0}
                              y={0}
                              width={3000}
                              height={2000}
        >
    <pre>
        <code>
            var a=0
            console.log(114514)
        </code>
    </pre>
        </VisualizationDisplay>
    )
}