import { useEffect } from "react";
import * as d3 from "d3";

function GraphPerformance({ data }) {
   console.log("GraphPerformance", data);
   useEffect(() => {
      const width = 258;
      const height = 263;
      const margin = { top: 50, right: 20, bottom: 50, left: 20 };

      const centerX = width / 2;
      const centerY = height / 2;
      const maxValueData = 250;

      const sizeOfRadar = Object.keys(data.kind).length;
      const radius = 80;
      const radiusInterval = 23;
      const numberOfRadar = 5;
      const textOffSet = 16;
      // const innerWidth = width - margin.left - margin.right;
      // const innerHeight = height - margin.top - margin.bottom;

      const svg = d3
         .select(".graph-performance")
         .attr("width", width)
         .attr("height", height);

      const g = svg
         .append("g")
         .attr("transform", `translate(${centerX},${centerY})`);

      //construct a radar chart

      var pointsRadar = [];

      for (let i = 0; i < numberOfRadar; i++) {
         pointsRadar = [];
         for (var j = 0; j <= sizeOfRadar; j++) {
            pointsRadar.push([
               ((j * 360) / sizeOfRadar) * (Math.PI / 180),
               radius - i * radiusInterval,
            ]);
         }

         var pathData = d3.lineRadial()(pointsRadar);

         g.append("path")
            .attr("d", pathData)
            .attr("fill", "none")
            .attr("stroke", "white");
      }
      //Transform the data into a format that can be used by the radar chart
      var dataForRadar = [];

      for (var key in data.data) {
         console.log("key", data.data[key]);
         dataForRadar.push({
            axis: data.kind[data.data[key].kind],
            value: parseInt((data.data[key].value * radius) / maxValueData), //replace 1 by max value
         });
      }
      console.log("dataForRadar", dataForRadar);

      //Draw the radar chart
      const pointsData = d3.range(sizeOfRadar).map((i) => {
         const angle = (i / sizeOfRadar) * -Math.PI * 2 + Math.PI;
         return [
            Math.sin(angle) * dataForRadar[i].value + centerX,
            Math.cos(angle) * dataForRadar[i].value + centerY,
         ];
      });

      console.log("points", pointsData);
      //draw the shapes
      pointsData.push(pointsData[0]);
      var pathArea = d3.area()(pointsData);
      //add the shape to the svg
      svg.append("path")
         .attr("d", pathArea)
         .attr("fill", "red")
         .attr("opacity", 0.5);

      console.log("size", sizeOfRadar);
      for (var i = 0; i < sizeOfRadar; i++) {
         const angle = (i / sizeOfRadar) * -Math.PI * 2 + Math.PI;
         g.append("text")
            .attr("class", "axis-label")
            .attr(
               "x",
               Math.sin(angle) *
                  (radius +
                     textOffSet +
                     textOffSet / 2 +
                     (data.kind[i + 1].length > 6 ? textOffSet / 2 : 0))
            )
            .attr("y", Math.cos(angle) * (radius + textOffSet))
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("fill", "white")
            .attr("font-size", "10px")
            .text(data.kind[i + 1]);
      }
   }, [data]);
   return (
      <div className="home__stats--card black-card">
         <svg className="graph-performance"></svg>
      </div>
   );
}

export default GraphPerformance;
