import {VisualizationDisplay} from "@site/src/components/VisualizationDisplay/VisualizationDisplay";
import * as d3 from "d3";

export default {
    //一般的折线图
    Diagram1: () => {
        const height = 1080
        const width = 1920
        const padding = 200
        return (<VisualizationDisplay
            diagramName={"Gold Price"}
            showInformation={true}
            height={height}
            width={width}
            defaultExpand={[]}
            onInitialize={(svg) => {

                const data = []
                for (let i = 0; i < 1200; i++) {
                    //y从1200到2000
                    const y = Math.random() * 800 + 1200
                    data.push({x: i, y: y})
                }
                const yScale = d3.scaleLinear().range([padding, height - padding]).domain([2000, 1200]).nice()
                const xScale = d3.scaleLinear().range([padding, width - padding]).domain([0, 1200])
                const xAxis = d3.axisBottom(xScale)
                const yAxis = d3.axisLeft(yScale)
                d3.select(svg).append("g").attr("class", "xAxis").attr("transform", `translate(0, ${height - padding})`).call(xAxis)
                d3.select(svg).append("g").attr("class", "yAxis").attr("transform", `translate(${padding}, 0)`).call(yAxis)

                //draw legends : x is the "x value" y is the "y value"
                d3.select(svg).append("text").attr("x", width / 2).attr("y", height - padding / 2).attr("text-anchor", "middle").text("x value").style("font-size", "24px")
                d3.select(svg).append("text").attr("x", padding / 2 - 40).attr("y", height / 2).attr("text-anchor", "middle").attr("transform", `rotate(-90, ${padding / 2}, ${height / 2})`).text("y value").style("font-size", "24px")

                d3.select(svg).selectAll(".xAxis text").style("font-size", "24px").style("transform", "translateY(10px)");
                d3.select(svg).selectAll(".yAxis text").style("font-size", "24px").style("transform", "translateX(-10px)");

                //draw lines with data with blue lines

                d3.select(svg).selectAll("line")
                    .data(data)
                    .enter()
                    .append("line")
                    .attr("x1", (d) => xScale(d.x))
                    .attr("y1", (d) => yScale(d.y))
                    .attr("x2", (d, i, nodes) => {
                        if (i === nodes.length - 1) {
                            return xScale(d.x)
                        } else {
                            return xScale(data[i + 1].x)
                        }
                    })
                    .attr("y2", (d, i, nodes) => {
                        if (i === nodes.length - 1) {
                            return yScale(d.y)
                        } else {
                            return yScale(data[i + 1].y)
                        }
                    })
                    .attr("stroke", "blue")
                    .attr("stroke-width", 2)
            }}/>)
    },
    //这个图不知道叫什么 效果见示例...
    Diagram2: () => {
        const height = 1080
        const width = 1920
        const padding = 200
        const data = []
        for (let i = 0; i < 30; i++) {
            const y = Math.random() * 0.2 - 0.1
            data.push({x: i, y: y})
        }
        return <VisualizationDisplay defaultExpand={[]} height={height} width={width} onInitialize={(svg) => {
            const xScale = d3.scaleLinear().range([padding, width - padding]).domain([0, 30])
            const yScale = d3.scaleLinear().range([height - padding, padding]).domain([0, 1])

            const xAxis = d3.axisBottom(xScale)
            const yAxis = d3.axisLeft(yScale)
            d3.select(svg).append("g").attr("class", "xAxis").attr("transform", `translate(0, ${yScale(0) + 100})`).call(xAxis)
            d3.select(svg).append("g").attr("class", "yAxis").attr("transform", `translate(${padding - 50}, 0)`).call(yAxis)

            //add a rect to contain the diagram and its edges must be the x and y axis
            d3.select(svg).append("rect").attr("x", padding - 50).attr("y", padding - 50).attr("width", width - 2 * padding + 100).attr("height", height - 2 * padding + 150).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 2)
            //set the font-size of the x and y axis to 24px and reset the offset
            d3.select(svg).selectAll(".xAxis text").style("font-size", "24px").style("transform", "translateY(10px)");
            d3.select(svg).selectAll(".yAxis text").style("font-size", "24px").style("transform", "translateX(-10px)");
            //draw the line from x,y(x) to x,0
            d3.select(svg).selectAll(".data-line")
                .data(data)
                .enter()
                .append("line")
                .attr("x1", (d) => xScale(d.x))
                .attr("y1", (d) => yScale(d.y))
                .attr("x2", (d) => xScale(d.x))
                .attr("y2", (d) => yScale(0))
                .attr("stroke", "black")
                .attr("stroke-width", 4)
            //draw all the points in blue and radius=5px
            d3.select(svg).selectAll(".data-circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", (d) => xScale(d.x))
                .attr("cy", (d) => yScale(d.y))
                .attr("r", 7)
                .attr("fill", "aquamarine")
            //add a line at y=0 
            d3.select(svg).append("line").attr("x1", padding - 50).attr("y1", yScale(0)).attr("x2", width - padding + 50).attr("y2", yScale(0)).attr("stroke", "aquamarine").attr("stroke-width", 4)
            //draw legends : x is the "x value" y is the "y value"
            d3.select(svg).append("text").attr("x", width / 2).attr("y", height - padding / 2 + 75).attr("text-anchor", "middle").text("x value").style("font-size", "24px")
            d3.select(svg).append("text").attr("x", padding / 2 - 40).attr("y", height / 2 - 50).attr("text-anchor", "middle").attr("transform", `rotate(-90, ${padding / 2}, ${height / 2})`).text("y value").style("font-size", "24px")
        }}/>
    },
    //带格子的折线图
    Diagram3: () => {
        const height = 1080
        const width = 1920
        const padding = 200
        const data = []
        for (let i = 0; i < 40; i++) {
            const y = Math.random() * 0.4
            data.push({x: i, y: y})
        }
        return <VisualizationDisplay defaultExpand={[]} height={height} width={width} onInitialize={(svg) => {
            const xScale = d3.scaleLinear().range([padding, width - padding]).domain([0, 40])
            const yScale = d3.scaleLinear().range([height - padding, padding]).domain([0, 0.4])
            //create axis with tickSize
            const xAxis = d3.axisBottom(xScale).tickSize(2 * padding - height).tickPadding(10);
            const yAxis = d3.axisLeft(yScale).tickSize(2 * padding - width).tickPadding(10);
            d3.select(svg).append("g").attr("class", "xAxis").attr("transform", `translate(0, ${height - padding})`).call(xAxis)
            d3.select(svg).append("g").attr("class", "yAxis").attr("transform", `translate(${padding}, 0)`).call(yAxis)
            //set the font-size of the x and y axis to 24px and reset the offset
            d3.select(svg).selectAll(".xAxis text").style("font-size", "24px").style("transform", "translateY(10px)");
            d3.select(svg).selectAll(".yAxis text").style("font-size", "24px").style("transform", "translateX(-10px)");

            //draw all data in a line with red and its width is 5px
            d3.select(svg).selectAll(".data-line")
                .data(data)
                .enter()
                .append("line")
                .attr("x1", (d) => xScale(d.x))
                .attr("y1", (d) => yScale(d.y))
                .attr("x2", (d, i, nodes) => {
                    if (i === nodes.length - 1) {
                        return xScale(d.x)
                    } else {
                        return xScale(data[i + 1].x)
                    }
                })
                .attr("y2", (d, i, nodes) => {
                    if (i === nodes.length - 1) {
                        return yScale(d.y)
                    } else {
                        return yScale(data[i + 1].y)
                    }
                })
                .attr("stroke", "red")
                .attr("stroke-width", 5)

        }}/>
    },
    //箱线图
    Diagram4: () => {
        const height = 1080
        const width = 1920
        const padding = 200
        const data = [[], [], []]
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 40; j++) {
                const y = Math.random() * 0.16 + 0.02
                data[i].push(y)
            }

            data[i].push(Math.random() * 0.02)
            data[i].push(Math.random() * 0.02 + 0.18)
        }
        return <VisualizationDisplay defaultExpand={[]} height={height} width={width} onInitialize={(svg) => {
            const xDomain = ["Data1", "Data2", "Data3"]
            const xScale = d3.scaleBand().domain(xDomain).range([padding, width - padding]).padding(0.1)
            const yScale = d3.scaleLinear().range([height - padding, padding]).domain([0, 0.2])
            const xAxis = d3.axisBottom(xScale).tickSizeOuter(0); // 将外部刻度线长度设置为 0
            const yAxis = d3.axisLeft(yScale).tickValues(d3.range(0.02, 0.2, 0.02))
                .tickSizeOuter(0); // 将外部刻度线长度设置为 0// 指定刻度值，从 0.02 到 0.18，步长为 0.02.tickFormat(d3.format(".2f")); // 格式化刻度标签为小数点后两位
            d3.select(svg).append("g").attr("class", "xAxis").attr("transform", `translate(0, ${height - padding})`).call(xAxis)
            d3.select(svg).append("g").attr("class", "yAxis").attr("transform", `translate(${padding}, 0)`).call(yAxis)
            //set the font-size of the x and y axis to 24px and reset the offset
            d3.select(svg).selectAll(".xAxis text").style("font-size", "24px").style("transform", "translateY(10px)");
            d3.select(svg).selectAll(".yAxis text").style("font-size", "24px").style("transform", "translateX(-10px)");
            //draw a rect to contain the diagram
            d3.select(svg).append("rect").attr("x", padding).attr("y", padding).attr("width", width - 2 * padding).attr("height", height - 2 * padding).attr("fill", "none").attr("stroke", "black").attr("stroke-width", 1)
            const drawBox = (index: number, color: string) => {
                const boxData = data[index].sort((a, b) => a - b)
                const q1 = d3.quantile(boxData, 0.25)
                const q3 = d3.quantile(boxData, 0.75)
                const iqr = q3 - q1
                const min = Math.max(d3.min(boxData), q1 - 1.5 * iqr)
                const max = Math.min(d3.max(boxData), q3 + 1.5 * iqr)
                console.log(min, max)
                const median = d3.median(boxData)
                const centerX = xScale(xDomain[index]) + xScale.bandwidth() / 2
                const boxWidth = xScale.bandwidth()
                const diagramGroup = d3.select(svg).append(`g`).attr("class", `box-${index}`)
                diagramGroup.append("line").attr("class", "line-min").attr("x1", centerX - boxWidth / 2).attr("y1", yScale(min)).attr("x2", centerX + boxWidth / 2).attr("y2", yScale(min)).attr("stroke", "black").attr("stroke-width", 3)
                diagramGroup.append("line").attr("class", "line-max").attr("x1", centerX - boxWidth / 2).attr("y1", yScale(max)).attr("x2", centerX + boxWidth / 2).attr("y2", yScale(max)).attr("stroke", "black").attr("stroke-width", 3)
                diagramGroup.append("line").attr("class", "line-max-to-min").attr("x1", centerX).attr("y1", yScale(max)).attr("x2", centerX).attr("y2", yScale(min)).attr("stroke", "black").attr("stroke-width", 3)
                diagramGroup.append("rect").attr("class", "rect-q1-q3").attr("x", centerX - boxWidth / 2).attr("y", yScale(q3)).attr("width", boxWidth).attr("height", yScale(q1) - yScale(q3)).attr("stroke", "black").attr("stroke-width", 3).attr("fill", color)
                diagramGroup.append("line").attr("class", "line-median").attr("x1", centerX - boxWidth / 2).attr("y1", yScale(median)).attr("x2", centerX + boxWidth / 2).attr("y2", yScale(median)).attr("stroke", "black").attr("stroke-width", 3)
                //draw points out of max-min range
                const outlierData = boxData.filter((d) => d < min || d > max)
                diagramGroup.append("g").attr("class", "outlier-data").selectAll("polygon").data(outlierData).enter().append("polygon")
                    .attr("points", (d, _) => {
                        const x = centerX
                        const y = yScale(d)
                        return `${x - 5},${y} ${x},${y - 10} ${x + 5},${y} ${x},${y + 10}`

                    }).attr("fill", "black")
                console.log(outlierData)
            }
            drawBox(0, "red")
            drawBox(1, "blue")
            drawBox(2, "green")
        }}/>
    },
    //散点图矩阵
    Diagram5: () => {
        const height = 1920
        const width = 1920
        const padding = 300
        const data = []
        for (let i = 0; i < 3000; i++) {
            data.push({x: Math.random() * 3 + 3, y: Math.random() * 3 + 3})
        }

        //console.log(data)
        return <VisualizationDisplay height={height} width={width} onInitialize={(svg) => {
            const xScale = d3.scaleLinear().domain([3, 6]).range([padding, width - padding])
            const yScale = d3.scaleLinear().domain([3, 6]).range([height - padding, padding])
            const xAxisBottom = d3.axisBottom(xScale).tickSizeOuter(0)
            const yAxisLeft = d3.axisLeft(yScale).tickSizeOuter(0)
            const xAxisTop = d3.axisTop(xScale).tickSizeOuter(0).tickFormat(d => "")
            const yAxisRight = d3.axisRight(yScale).tickSizeOuter(0).tickFormat(d => "")
            d3.select(svg).append("g").attr("class", "xAxisBottom").attr("transform", `translate(0,${height - padding})`).call(xAxisBottom)
            d3.select(svg).append("g").attr("class", "yAxisLeft").attr("transform", `translate(${padding},0)`).call(yAxisLeft)
          
            //select fontsize to 24px
            d3.select(svg).selectAll(".xAxisBottom text").style("font-size", "24px").style("transform", "translateY(10px)")
            d3.select(svg).selectAll(".yAxisLeft text").style("font-size", "24px").style("transform", "translateX(-10px)")
            const hexagonGroup = d3.select(svg).append("g").attr("class", "hexagon-group")
            const isPointInHexagon = (x, y, centerX, centerY, sideLength) => {
                // 转换为局部坐标系
                const localX = x - centerX;
                const localY = y - centerY;

                // 坐标系顺时针旋转 30 度
                const rotatedX = localX * Math.cos(Math.PI / 6) + localY * Math.sin(Math.PI / 6);
                const rotatedY = -localX * Math.sin(Math.PI / 6) + localY * Math.cos(Math.PI / 6);

                // 取绝对值
                const absX = Math.abs(rotatedX);
                const absY = Math.abs(rotatedY);

                // 判断是否在六边形内部
                return absX <= sideLength && absY <= sideLength * Math.sqrt(3) / 2 && absY <= -absX * Math.sqrt(3) + sideLength * Math.sqrt(3);
            }
            const drawHexagon = (x: number, y: number, r: number, color: string = "transparent") => {
                const points = []
                for (let i = 0; i < 6; i++) {
                    const angle = Math.PI * 2 / 6 * i + Math.PI / 6
                    points.push(`${(x + r * Math.cos(angle)).toFixed(2)},${(y + r * Math.sin(angle)).toFixed(2)}`)
                }

                hexagonGroup.append("polygon").attr("points", points.join(" ")).attr("fill", color).attr("stroke", "transparent").attr("stroke-width", 2)


            }
            const r = 0.1
            let offset = false
            const numbers = []
            for (let i = 3.2; i < 5.8; i += 1.5 * r) {
                const offsetValue = offset ? Math.sqrt(3) / 2 * r : 0
                for (let j = 3.2; j < 5.8; j += Math.sqrt(3) * r) {
                    numbers.push(data.filter(d => isPointInHexagon(d.x, d.y, j + offsetValue, i, r)).length)
                }
                offset = !offset
            }
            // 创建颜色比例尺
            const getGradientColor = (t) => {
                // 限制 t 的范围在 0 到 1 之间
                t = Math.max(0, Math.min(1, t));
                // 从透明到黄色
                const alpha = t; // alpha 从 0 到 1
                return `rgba(0, 0, 255, ${alpha})`; // 黄色，透明度逐渐增加

            }
            for (let i = 3.2; i < 5.8; i += 1.5 * r) {
                const offsetValue = offset ? Math.sqrt(3) / 2 * r : 0
                for (let j = 3.2; j < 5.8; j += Math.sqrt(3) * r) {
                    const count = data.filter(d => isPointInHexagon(d.x, d.y, j + offsetValue, i, r)).length
                    //console.log(getGradientColor(count / d3.max(numbers)))
                    drawHexagon(xScale(j + offsetValue), yScale(i), xScale(3 + r) - xScale(3), getGradientColor(count / d3.max(numbers)))
                }
                offset = !offset
            }


            const xValueGroup = d3.select(svg).append("g").attr("class", "x-value-group")
            const gap = 0.05
            const delta = 0.3
            const xNumbers = []
            for (let i = 3 + delta / 2; i < 6; i += delta) {

                const count = data.filter(d => d.x >= i && d.x < i + delta).length
                xNumbers.push(count)
            }
            const xValueScale = d3.scaleLinear().domain([0, d3.max(xNumbers)]).range([0, 150])
            for (let i = 3 + delta / 2; i < 6; i += delta) {
                const count = data.filter(d => d.x >= i && d.x < i + delta).length
                const halfWidth = (xScale(delta - gap) - xScale(0))/2;
                xValueGroup.append("rect").attr("x", xScale(i) - halfWidth).attr("y", padding - xValueScale(count)).attr("width", 2 * halfWidth).attr("height", xValueScale(count)).attr("fill","blue").attr("stroke","black").attr("stroke-width","3")
            }
            
            
            
            const yValueGroup = d3.select(svg).append("g").attr("class", "y-value-group")
            const yNumbers = []
            for (let i = 3 + delta / 2; i < 6; i += delta) {
                const count = data.filter(d => d.y >= i && d.y < i + delta).length
                yNumbers.push(count)
            }
            const yValueScale = d3.scaleLinear().domain([0, d3.max(yNumbers)]).range([0, 150])
            for (let i = 3 + delta / 2; i < 6; i += delta) {
                const count = data.filter(d => d.y >= i && d.y < i + delta).length
                const halfWidth = -(yScale(delta - gap) - yScale(0))/2;
                yValueGroup.append("rect").attr("x", width-padding).attr("y", yScale(i)-halfWidth).attr("height", 2 * halfWidth).attr("width", yValueScale(count)).attr("fill","blue").attr("stroke","black").attr("stroke-width","3")
            }
              d3.select(svg).append("g").attr("class", "xAxisTop").attr("transform", `translate(0,${padding})`).call(xAxisTop)
            d3.select(svg).append("g").attr("class", "yAxisRight").attr("transform", `translate(${width - padding},0)`).call(yAxisRight)
        }}/>
    },
    //颜色+散点图矩阵
    Diagram6:() => {
        const height = 1920
        const width = 1920
        const padding = 200
        const data:number[][]=[]
        for(let i=0;i<15;i++){
            const array=[]
            for (let j=0;j<15;j++){
                array.push(-parseFloat(Math.random().toFixed(1)))
            }
            data.push(array)
        }
        const dataNames=[
            "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O"
        ]
        return (<VisualizationDisplay
            showInformation={true}
            height={height}
            width={width}
            onInitialize={(svg) => {
                const xScale=d3.scaleBand().domain(dataNames).range([padding,width-padding])
                const yScale=d3.scaleBand().domain(dataNames).range([padding,height-padding])
                
            }}/>)
    },
}