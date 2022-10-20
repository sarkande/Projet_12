import * as d3 from "d3";
import React, { useEffect } from "react";
function GraphUserScore({ data, durationAnimation }) {
   const todayScore = data * 100;
   const todayScoreDegree = (todayScore * 360) / 100;
   useEffect(() => {
      //set the dimensions and margins of the graph
      const width = 258;
      const height = 263;
      const margin = { top: 50, right: 20, bottom: 50, left: 20 };

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const radius = 80;
      const radiusStroke = 10;
      const svg = d3.select(".graph-userScore");
      svg.attr("width", width).attr("height", height);

      const arcBegin = d3
         .arc()
         .cornerRadius(20)
         .innerRadius(radius)
         .outerRadius(radius + radiusStroke)
         .startAngle(0)
         .endAngle(0);
      const arcEnd = d3
         .arc()
         .cornerRadius(20)
         .innerRadius(radius)
         .outerRadius(radius + radiusStroke)
         .startAngle(0)
         .endAngle(-(Math.PI / 180) * todayScoreDegree);

      const arcContainer = svg.append("g").classed("arc-container", true);
      arcContainer.attr("transform", `translate(${width / 2},${height / 2})`);
      arcContainer
         .append("path")
         .attr("d", arcBegin)
         .attr("fill", "red")
         .transition()
         .duration(durationAnimation)
         .attrTween("d", function () {
            const interpolate = d3.interpolate(
               0,
               -((Math.PI / 180) * todayScoreDegree)
            );
            return function (t) {
               return arcEnd.endAngle(interpolate(t))();
            };
         });

      const title = svg
         .append("g")
         .classed("title", true)
         .attr("transform", `translate(0,${margin.top})`);
      title.append("text").text("Score").attr("fill", "black");

      const score = svg
         .append("g")
         .classed("score", true)
         .attr(
            "transform",
            `translate(${innerWidth / 2 - 10},${height / 2 - 10})`
         );
      score
         .append("text")
         .text(todayScore + "%")
         .classed("score-text-percent", true);
      score
         .append("text")
         .text("de votre")
         .attr("transform", `translate(-5,20)`)
         .classed("score-text-subtitle", true);
      score
         .append("text")
         .text("objectif")
         .attr("transform", `translate(-1, 40)`)
         .classed("score-text-subtitle", true);
   }, [todayScore]);

   return (
      <div className="home__stats--card">
         <svg className="graph-userScore"></svg>
      </div>
   );
}

export default GraphUserScore;
