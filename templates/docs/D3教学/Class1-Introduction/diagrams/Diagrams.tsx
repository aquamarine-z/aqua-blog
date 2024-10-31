import {VisualizationDisplay} from "@site/src/components/VisualizationDisplay/VisualizationDisplay";
import * as d3 from "d3"
import {AdaptiveSVG} from "@site/src/components/AdaptiveSVG/AdaptiveSVG";

function Diagram1({children}: { children: any }) {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        diagramName={"图1:创建一个SVG元素"}
        onInitialize={(svg) => {
            d3.select(svg).attr("style", "background:gray")
        }}>
        {children}
    </VisualizationDisplay>
}

function DiagramRect({children}: { children: any }) {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        diagramName={"图2:Rect的使用"}
        onInitialize={(svg) => {
            const rect = d3.select(svg).append('rect')
            rect.attr('x', 30).attr('y', 30)
                .attr('width', 300).attr('height', 300)
                .attr('fill', 'gray')
                .attr('stroke', 'black')
                .attr('stroke-width', 5)
        }}>
        {children}
    </VisualizationDisplay>
}

function DiagramCircle({children}: { children: any }) {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        diagramName={"图3:Circle的使用"}
        onInitialize={(svg) => {
            const circle = d3.select(svg).append('circle')
            circle.attr('cx', 30).attr('cy', 30)
                .attr('r', 20)
                .attr('fill', 'red')
        }}>
        {children}
    </VisualizationDisplay>
}

function DiagramLine({children}: { children: any }) {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        diagramName={"图4:Line的使用"}
        onInitialize={(svg) => {
            const line = d3.select(svg).append('line')
            line.attr('x1', 30).attr('y1', 30)
                .attr('x2', 300).attr('y2', 200)
                .attr('stroke', 'red').attr('stroke-width', 3)
        }}>
        {children}
    </VisualizationDisplay>
}

function DiagramPath({children}: { children: any }) {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        diagramName={"图5:Path的使用"}
        onInitialize={(svg) => {
            const path = d3.select(svg).append('path')
            path.attr('d', 'M100 100 L200 200 L300 100 L400 400')
                .attr('stroke', 'blue')
                .attr('stroke-width', 5)
                .attr('fill', 'none')
        }}>
        {children}
    </VisualizationDisplay>
}

function DiagramText({children}: { children: any }) {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        diagramName={"图6:Text的使用"}
        onInitialize={(svg) => {
            const text = d3.select(svg).append('text')
            text.attr('x', 200).attr('y', 200)
                .text('Hello World')
                .attr('font-family', 'sans-serif')
                .attr('fill', 'black')
                .attr('font-size', 40)
        }}>
        {children}
    </VisualizationDisplay>
}

function Diagram7({children}: { children: any }) {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        diagramName={"图7:D3的链式调用示例"}
        onInitialize={(svg) => {
            d3.select(svg)
                .attr("width", 600).attr("height", 400)//设置svg的属性为宽600高400
                .attr("style", "background:red") //设置svg的style 背景颜色为红色
        }}>
        {children}
    </VisualizationDisplay>
}

function Diagram8({children}: { children: any }) {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        diagramName={"图8:数据的绑定与绘制"}
        onInitialize={(svg) => {
            d3.select(svg).attr('width', 600).attr('height', 400).attr('style', 'border:black solid 2px;border-radius:5px;')
            const data = [12, 10, 19, 10, 4, 3, 4, 5, 6, 7]
            const rects = d3.select(svg).selectAll('rect').data(data).enter().append('rect')
            rects.attr('x', (d, i) => i * 50).attr('y', 20).attr('width', 40).attr('height', (d) => 10 * d)
        }}>
        {children}
    </VisualizationDisplay>
}

function Diagram9({children}: { children: any }) {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        diagramName={"图9:使用比例尺绘图"}
        onInitialize={(svg) => {
            d3.select(svg).attr('width', 600).attr('height', 400).attr('style', 'border:black solid 2px;border-radius:5px;')
            const data = [12, 10, 19, 10, 4, 3, 4, 5, 6, 7]
            const rects = d3.select(svg).selectAll('rect').data(data).enter().append('rect')
            const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([50, 500])
            const yScale = d3.scaleLinear().domain([0, Math.max(...data)]).range([0, 300])
            rects.attr('x', (d, i) => xScale(i)).attr('y', 20).attr('width', 40).attr('height', (d) => yScale(d))
        }}>
        {children}
    </VisualizationDisplay>
}

function Diagram10() {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        defaultExpand={["svg"]}
        onInitialize={(svg) => {
            d3.select(svg).append('text').attr('x', 20).attr('y', 20).text('(0,0)').attr("font-size", 24)
        }} children={<></>}>
    </VisualizationDisplay>
}

function Diagram11({children}: { children: any }) {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        diagramName={"图11:比例尺反向映射"}
        onInitialize={(svg) => {
            const data = [12, 10, 19, 10, 4, 3, 4, 5, 6, 7]
            const rects = d3.select(svg).selectAll('rect').data(data).enter().append('rect')
            const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([50, 500])
            const yScale = d3.scaleLinear().domain([0, Math.max(...data)]).range([300, 0])
            rects.attr('x', (d, i) => xScale(i)).attr('y', (d) => yScale(d)).attr('width', 40).attr('height', (d) => 300 - yScale(d))
        }}>
        {children}
    </VisualizationDisplay>
}

function Diagram12({children}: { children: any }) {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        diagramName={"图12:绘制坐标轴"}
        onInitialize={(svg) => {
            const data = [12, 10, 19, 10, 4, 3, 4, 5, 6, 7]
            const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([100, 500])
            const yScale = d3.scaleLinear().domain([0, Math.max(...data)]).range([300, 0])
            const xAxis = d3.axisBottom(xScale)
            const yAxis = d3.axisLeft(yScale)
            d3.select(svg).append('g').attr('transform', 'translate(0,350)').call(xAxis)
            d3.select(svg).append('g').attr('transform', 'translate(100,50)').call(yAxis)
        }}>
        {children}
    </VisualizationDisplay>
}

function Diagram13({children}: { children: any }) {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        diagramName={"图13:新建一个SVG元素"}
        onInitialize={(svg) => {
        }}>
        {children}
    </VisualizationDisplay>
}

function Diagram14({children}: { children: any }) {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        diagramName={"图14:绘制坐标轴"}
        onInitialize={(svg) => {
            const data = [12, 10, 19, 10, 4, 3, 4, 5, 6, 7]
            const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([50, 550])
            const yScale = d3.scaleLinear().domain([0, Math.max(...data)]).range([350, 50])
            const xAxis = d3.axisBottom(xScale).ticks(10)
            const yAxis = d3.axisLeft(yScale).ticks(5)
            d3.select(svg).append('g').attr('transform', 'translate(0,350)').call(xAxis)
            d3.select(svg).append('g').attr('transform', 'translate(50,0)').call(yAxis)
        }}>
        {children}
    </VisualizationDisplay>
}

function Diagram15({children}: { children: any }) {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        diagramName={"图15:绘制折线"}
        onInitialize={(svg) => {
            const data = [12, 10, 19, 10, 4, 3, 4, 5, 6, 7]
            const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([50, 550])
            const yScale = d3.scaleLinear().domain([0, Math.max(...data)]).range([350, 50])
            const xAxis = d3.axisBottom(xScale).ticks(10)
            const yAxis = d3.axisLeft(yScale).ticks(5)
            d3.select(svg).append('g').attr('transform', 'translate(0,350)').call(xAxis)
            d3.select(svg).append('g').attr('transform', 'translate(50,0)').call(yAxis)
            d3.select(svg).append('path')
                .attr('d', d3.line()(data.map((d, i) => [xScale(i), yScale(d)])))
                .attr('fill', 'none')
                .attr('stroke', 'red').attr('stroke-width', 3)
        }}>
        {children}
    </VisualizationDisplay>
}

function Diagram16({children}: { children: any }) {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        diagramName={"图16:绘制数据点"}
        onInitialize={(svg) => {
            const data = [12, 10, 19, 10, 4, 3, 4, 5, 6, 7]
            const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([50, 550])
            const yScale = d3.scaleLinear().domain([0, Math.max(...data)]).range([350, 50])
            const xAxis = d3.axisBottom(xScale).ticks(10)
            const yAxis = d3.axisLeft(yScale).ticks(5)
            d3.select(svg).append('g').attr('transform', 'translate(0,350)').call(xAxis)
            d3.select(svg).append('g').attr('transform', 'translate(50,0)').call(yAxis)
            d3.select(svg).append('path')
                .attr('d', d3.line()(data.map((d, i) => [xScale(i), yScale(d)])))
                .attr('fill', 'none')
                .attr('stroke', 'red').attr('stroke-width', 3)
            d3.select(svg).selectAll('points').data(data).enter().append('circle').attr('class', 'point')
                .attr('cx', (_, i) => xScale(i)).attr('cy', (d) => yScale(d))
                .attr('r', 4).attr('fill', 'red')
        }}>
        {children}
    </VisualizationDisplay>
}

function Diagram17({children}: { children: any }) {
    return <VisualizationDisplay
        x={0}
        y={0}
        width={600}
        height={400}
        diagramName={"图16:绘制数据点"}
        onInitialize={(svg) => {
            const data = [12, 10, 19, 10, 4, 3, 4, 5, 6, 7]
            const xScale = d3.scaleLinear().domain([0, data.length - 1]).range([50, 550])
            const yScale = d3.scaleLinear().domain([0, Math.max(...data)]).range([350, 50])
            const xAxis = d3.axisBottom(xScale).ticks(10)
            const yAxis = d3.axisLeft(yScale).ticks(5)
            d3.select(svg).append('g').attr('transform', 'translate(0,350)').call(xAxis)
            d3.select(svg).append('g').attr('transform', 'translate(50,0)').call(yAxis)
            d3.select(svg).append('path')
                .attr('d', d3.line()(data.map((d, i) => [xScale(i), yScale(d)])))
                .attr('fill', 'none')
                .attr('stroke', 'red').attr('stroke-width', 3)
            d3.select(svg).selectAll('points').data(data).enter().append('circle').attr('class', 'point')
                .attr('cx', (_, i) => xScale(i)).attr('cy', (d) => yScale(d))//设置点的x y坐标
                .attr('r', 4).attr('fill', 'red') //设置点的半径为4 颜色为红色
            d3.select(svg).selectAll('data-text').data(data).enter().append('text').attr('class', 'data-text')
                .attr('text-anchor', 'middle') //设置文字居中显示
                .attr('x', (_, i) => xScale(i)).attr('y', (d) => yScale(d) - 10)//设置各个数据文字的坐标 注意yScale(d)-10的作用是让数据文字出现在点的上方
                .text((d) => d)
        }}>
        {children}
    </VisualizationDisplay>
}

export default {
    Diagram1,
    DiagramRect,
    DiagramCircle,
    DiagramLine,
    DiagramPath,
    DiagramText,
    Diagram7,
    Diagram8,
    Diagram9,
    Diagram10,
    Diagram11,
    Diagram12,
    Diagram13,
    Diagram14,
    Diagram15,
    Diagram16,
    Diagram17,
}