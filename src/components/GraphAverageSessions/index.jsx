import * as d3 from "d3";
import { useEffect } from "react";

//https://observablehq.com/@d3/d3-line

function GraphAverageSessions(data) {
   console.log("GraphAverageSessions", data);
   console.log(data);
   let dataGraph = data.data;

   useEffect(() => {
      const lineData = [];

      dataGraph.forEach((element, index) => {
         lineData.push([element.day, element.sessionLength]);
      });

      console.log("lineData", lineData);

      const walkX = d3
         .scaleLinear()
         .range([0, 200])
         .domain([0, lineData.length]);

      const walkY = d3
         .scaleLinear()
         .range([170, 0])
         .domain([0, Math.max(...lineData.map((d) => d[1])) + 1]);

      let line = d3
         .line()
         .x((d) => walkX(d[0]))
         .y((d) => walkY(d[1]))
         .curve(d3.curveMonotoneX);

      let svg = d3.select(".graph");

      svg.append("path").attr("d", line(lineData));

      svg.selectAll("circle")
         .data(lineData)
         .enter()
         .append("circle")
         .attr("cx", (d) => walkX(d[0]))
         .attr("cy", (d) => walkY(d[1]))
         .attr("r", 3)
         .attr("fill", "blue");
   }, [dataGraph]);
   return (
      <div className="home__stats--card red-card">
         <div className="graph-average-sessions">
            <h2>GraphAverageSessions</h2>
            <div>
               <svg className="graph"></svg>
            </div>
         </div>
      </div>
   );
}

export default GraphAverageSessions;
