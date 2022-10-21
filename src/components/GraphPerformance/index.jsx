import { useEffect } from "react";
import * as d3 from "d3";

function GraphPerformance({ data, durationAnimation }) {
   useEffect(() => {
      const width = 258;
      const height = 263;

      const centerX = width / 2;
      const centerY = height / 2;
      const maxValueData = 250;

      const sizeOfRadar = Object.keys(data.kind).length;
      const radius = 90;
      const radiusInterval = 27;
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
         dataForRadar.push({
            axis: data.kind[data.data[key].kind],
            value: parseInt((data.data[key].value * radius) / maxValueData), //replace 1 by max value
         });
      }

      //Draw the radar chart
      const pointsAnimationData = d3.range(sizeOfRadar).map((i) => {
         const angle = (i / sizeOfRadar) * -Math.PI * 2 + Math.PI;
         return [Math.sin(angle) * 1 + centerX, Math.cos(angle) * 1 + centerY];
      });

      //Draw the radar chart
      const pointsData = d3.range(sizeOfRadar).map((i) => {
         const angle = (i / sizeOfRadar) * -Math.PI * 2 + Math.PI;
         return [
            Math.sin(angle) * dataForRadar[i].value + centerX,
            Math.cos(angle) * dataForRadar[i].value + centerY,
         ];
      });

      //draw the shapes
      pointsData.push(pointsData[0]);
      pointsAnimationData.push(pointsAnimationData[0]);

      var pathAreaBegin = d3.area()(pointsAnimationData);
      var pathAreaEnd = d3.area()(pointsData);
      //add the shape to the svg
      svg.append("path")
         .classed("area", true)
         .attr("d", pathAreaBegin)
         .transition()
         .duration(durationAnimation)
         .attr("d", pathAreaEnd);

      for (var i = 0; i < sizeOfRadar; i++) {
         const angle = (i / sizeOfRadar) * -Math.PI * 2 + Math.PI;
         g.append("text")
            .attr("class", "axis-label")
            .attr("x", Math.sin(angle) * (radius + textOffSet + textOffSet / 2))
            .attr("y", Math.cos(angle) * (radius + textOffSet))
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("fill", "white")
            .attr("font-size", "10px")
            .text(data.kind[i + 1]);
      }
   }, [data, durationAnimation]);
   return (
      <div className="home__stats--card black-card">
         <svg className="graph-performance"></svg>
      </div>
   );
}

export default GraphPerformance;
