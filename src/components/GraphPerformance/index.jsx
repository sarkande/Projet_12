import { useEffect } from "react";
import * as d3 from "d3";

function GraphPerformance({ data }) {
   console.log("GraphPerformance", data);
   useEffect(() => {
      const width = 258;
      const height = 263;
      const margin = { top: 50, right: 20, bottom: 50, left: 20 };

      // const innerWidth = width - margin.left - margin.right;
      // const innerHeight = height - margin.top - margin.bottom;

      const svg = d3
         .select(".graph-performance")
         .attr("width", width)
         .attr("height", height);

      // const points = d3.range(numberOfPoints).map((d) => {
      //    const angle = (d / numberOfPoints) * Math.PI * 2;
      //    return { x: Math.sin(angle), y: Math.cos(angle) };
      // });
      const g = svg
         .append("g")
         .attr("transform", `translate(${width / 2},${height / 2})`);

      const sizeOfRadar = Object.keys(data.kind).length;
      const radius = 100;
      const radiusInterval = 30;
      const numberOfRadar = 5;

      var points = [];

      for (let i = 0; i < numberOfRadar; i++) {
         console.log("i", i);
         points = [];
         for (var j = 0; j <= sizeOfRadar; j++) {
            points.push([
               ((j * 360) / sizeOfRadar) * (Math.PI / 180),
               radius - i * radiusInterval,
            ]);
         }

         var pathData = d3.radialLine()(points);

         g.append("path")
            .attr("d", pathData)
            .attr("fill", "none")
            .attr("stroke", "white");
      }
   }, [data]);
   return (
      <div className="home__stats--card black-card">
         <svg className="graph-performance"></svg>
      </div>
   );
}

export default GraphPerformance;
