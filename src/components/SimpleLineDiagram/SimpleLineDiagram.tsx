import {useState} from "react";
import {VisualizationDisplay} from "@site/src/components/VisualizationDisplay/VisualizationDisplay";
import * as d3 from "d3";
import Translate, {translate} from "@docusaurus/Translate";

export function SimpleLineDiagram() {
    const [dataString, setDataString] = useState(JSON.stringify({points:[{x:1,y:1},{x:2,y:2}]}));
    const [data, setData] = useState(undefined);

    function stringToJson(): any {
        try{
            return JSON.parse(dataString.toString());
        }catch(e){
            alert(translate({id:"components.simple_line_diagram.generate_error"})+":"+e.message)
            return undefined;
        }
    }

    return (
        <>

            <div className={"w-full flex flex-col items-center justify-start gap-4"}>
                <h1 className={"w-full text-center "}><Translate id={"components.simple_line_diagram.title"}>Simple Line Diagram Generator</Translate></h1>
                <h2 className={"w-full text-center"}>
                    <Translate id={"components.simple_line_diagram.description"}></Translate>
                    
                </h2>
                <textarea placeholder={translate({id:"components.simple_line_diagram.placeholder"})} value={dataString}
                          onChange={(e) => setDataString(e.target.value)}
                          className="glass rounded-2xl h-48 w-3/4 text-opacity-80"
                />
                <button className={"w-24 h-12 rounded-2xl glass hover-float active:scale-95"}
                        onClick={() => {
                            setData(stringToJson())
                            //console.log(stringToJson())
                        }}><Translate id={"components.simple_line_diagram.button"}>Generate</Translate>
                </button>
                <VisualizationDisplay 
                    data={data}
                    height={600}
                    width={1000}
                    onUpdate={(svg, data) => {
                                           const height = 600
                                           const width = 1000
                                           if(data===undefined) return
                                           d3.select(svg).select(".xAxis").remove();
                                           d3.select(svg).select(".yAxis").remove();
                                           d3.select(svg).select(".line").remove();
                                           const x: number[] = []
                                           const y: number[] = []
                                           const dataArray = data.points as Array<any>
                                           dataArray.forEach(item => {
                                               x.push(item.x)
                                               y.push(item.y)
                                           })
                                           //console.log(x)
                                           const xScale = d3.scaleLinear().range([50, width - 50]).domain([d3.min(x), d3.max(x)])
                                           const yScale = d3.scaleLinear().range([height - 50, 50]).domain([d3.min(y), d3.max(y)])
                                           const xAxis = d3.axisBottom(xScale)
                                           const yAxis = d3.axisLeft(yScale)
                                           const xAxisGroup = d3.select(svg).append("g").attr("class","xAxis")
                                           xAxisGroup.call(xAxis)
                                           xAxisGroup.attr("style", `transform:translate(0px,${height - 50}px)`)
                                           const yAxisGroup = d3.select(svg).append("g").attr("class","yAxis")
                                           yAxisGroup.call(yAxis)
                                           yAxisGroup.style("transform", `translate(50px,0px)`)
                                           const lineGenerator = d3.line()
                                               .x(d => xScale(d["x"])) // 提取 x 坐标
                                               .y(d => yScale(d["y"])); // 提取 y 坐标
                                           // 4. 生成路径数据（d 属性的值）
                                           const pathData = lineGenerator(data.points);
                                           //console.log(pathData);
                                           d3.select(svg).append("path")
                                               .attr("d", pathData) // 设置路径数据
                                               .attr("fill", "none") // 取消填充
                                               .attr("stroke", "#000000") // 设置线条颜色
                                               .attr("stroke-width", 2)// 设置线条宽度
                                               .attr("class", 'line')
                                       }}
                />
            </div>

        </>
    )
}