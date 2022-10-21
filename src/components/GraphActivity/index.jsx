import * as d3 from "d3";
import { useEffect } from "react";

function GraphActivity({ data, durationAnimation }) {
   console.log("GraphActivity", data);

   useEffect(() => {
      const width = 840;
      const height = 320;
      const margin = { top: 70, right: 70, bottom: 50, left: 50 };

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const svg = d3.select(".graph-activity");
      svg.attr("width", width).attr("height", height);

      const xScale = d3.scaleLinear().domain([1, 7]).range([0, innerWidth]);

      const yScaleKg = d3
         .scaleLinear()
         .domain([
            d3.min(data, (d) => d.kilogram - 1),
            d3.max(data, (d) => d.kilogram + 1),
         ])
         .range([innerHeight, 0]);
      const yScaleCalories = d3
         .scaleLinear()
         .domain([0, 600])
         .range([innerHeight, 0]);

      const xAxis = d3.axisBottom(xScale).ticks(7).tickSizeOuter(0);
      const yAxis = d3
         .axisRight(yScaleKg)
         .ticks(3)
         .tickSizeInner(-innerWidth)
         .tickSizeOuter(0);

      const groupDataCalories = svg
         .append("g")
         .attr("transform", `translate(${margin.left + 13},${margin.top})`);
      const groupDataKg = svg
         .append("g")
         .attr("transform", `translate(${margin.left},${margin.top})`);

      const yAxisSelector = groupDataCalories
         .append("g")
         .attr("transform", `translate(${innerWidth + 15},0)`);
      yAxisSelector.call(yAxis);
      yAxisSelector.selectAll(".tick text").classed("tick-text", true);
      yAxisSelector.selectAll(".tick line").classed("tick-line", true);

      yAxisSelector.selectAll(".domain").remove();

      groupDataKg
         .selectAll("rect")
         .data(data)
         .enter()
         .append("rect")
         .attr("x", (d, i) => xScale(i + 1))
         .attr("y", (d) => yScaleKg(d.kilogram))
         .attr("width", 7)
         .attr("height", (d) => innerHeight - yScaleKg(d.kilogram))
         .attr("fill", "#282D30")
         .attr("rx", 2)
         .attr("ry", 2);

      const xAxisSelector = groupDataKg
         .append("g")
         .attr("transform", `translate(10,${innerHeight})`);
      xAxisSelector.call(xAxis);

      xAxisSelector.selectAll(".tick line").remove();
      xAxisSelector.selectAll(".tick text").classed("tick-text", true);

      groupDataCalories
         .selectAll("rect")
         .data(data)
         .enter()
         .append("rect")
         .attr("x", (d, i) => xScale(i + 1))
         .attr("y", (d) => yScaleCalories(d.calories))
         .attr("width", 7)
         .attr("height", (d) => innerHeight - yScaleCalories(d.calories))
         .attr("fill", "red")
         .attr("rx", 2)
         .attr("ry", 2);

      const title = svg
         .append("g")
         .classed("title", true)
         .attr("transform", `translate(${margin.left},${margin.top - 30})`);
      title.append("text").text("Activité quotidienne").attr("fill", "black");
   }, [data, durationAnimation]);
   return (
      <div className="home__stats--card gray-card large">
         <svg className="graph-activity"></svg>
      </div>
   );
}

export default GraphActivity;
