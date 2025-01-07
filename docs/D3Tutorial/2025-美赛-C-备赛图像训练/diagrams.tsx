import {VisualizationDisplay} from "@site/src/components/VisualizationDisplay/VisualizationDisplay";
import * as d3 from "d3";

export default {
    //一般的折线图
    Diagram1: () => {
        const height = 1080
        const width = 1920
        const padding = 200
        return (<VisualizationDisplay diagramName={"Gold Price"} showInformation={true} height={height} width={width}
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
        return <VisualizationDisplay height={height} width={width} onInitialize={(svg) => {
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
        return <VisualizationDisplay height={height} width={width} onInitialize={(svg) => {
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
    }
}