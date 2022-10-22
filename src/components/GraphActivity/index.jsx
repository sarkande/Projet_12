import * as d3 from "d3";
import { useEffect } from "react";

function GraphActivity({ data, durationAnimation }) {
   console.log("GraphActivity", data);

   useEffect(() => {
      const width = 840;
      const height = 320;
      const margin = { top: 80, right: 70, bottom: 50, left: 50 };

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
         .attr("y", innerHeight)
         .attr("width", 7)
         .attr("height", 0)
         .classed("bar-kg", true)
         .attr("rx", 2)
         .attr("ry", 2)
         .transition()
         .delay((d, i) => (i * durationAnimation) / 10)
         .duration(durationAnimation)
         .attr("y", (d) => yScaleKg(d.kilogram))
         .attr("height", (d) => innerHeight - yScaleKg(d.kilogram));

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
         .attr("y", innerHeight)
         .attr("width", 7)
         .attr("height", 0)
         .classed("bar-calorie", true)
         .attr("rx", 2)
         .attr("ry", 2)
         .transition()
         .delay((d, i) => (i * durationAnimation) / 10)
         .duration(durationAnimation)
         .attr("y", (d) => yScaleCalories(d.calories))
         .attr("height", (d) => innerHeight - yScaleCalories(d.calories));

      const title = svg
         .append("g")
         .classed("title", true)
         .attr("transform", `translate(${margin.left},${margin.top - 50})`);
      title.append("text").text("Activité quotidienne");

      const legend = svg
         .append("g")
         .classed("legend", true)
         .attr(
            "transform",
            `translate(${innerWidth - margin.right - 100},${margin.top - 50})`
         );
      legend
         .append("circle")
         .attr("x", 0)
         .attr("y", 0)
         .attr("r", 4)
         .classed("legend-circle-kg", true);

      legend
         .append("text")
         .text("Poids (kg)")
         .attr("x", 10)
         .attr("y", 5)
         .classed("legend-text-kg", true);

      legend
         .append("circle")
         .attr("x", 0)
         .attr("y", 0)
         .attr("r", 4)
         .attr("transform", `translate(96,0)`)
         .classed("legend-circle-calorie", true);
      legend
         .append("text")
         .text("Calories brûlées (kCal)")
         .attr("x", 10)
         .attr("y", 5)
         .classed("legend-text-calorie", true)
         .attr("transform", `translate(96,0)`);

      //set the groupe rect
      const widthHoverSelector =
         parseInt(xScale.range()[1] / xScale.domain()[1]) + 22;
      const groupHoverSelector = svg.append("g");
      const tooltip = groupHoverSelector.append("g");
      for (let i = 0; i < xScale.domain()[1]; i++) {
         groupHoverSelector
            .append("rect")
            .classed("hover-selector", true)
            .attr("hover-selector", i)
            .attr("x", i * widthHoverSelector)
            .attr("y", 0 + margin.top)
            .attr("width", widthHoverSelector)
            .attr("height", innerHeight)

            .on("mouseenter", function (event, d) {
               d3.select(this)
                  .transition()
                  .duration(100)
                  .style("opacity", "0.2"); // <== CSS selector (DOM)

               tooltip.attr(
                  "transform",
                  `translate(${
                     i === xScale.domain()[1] - 1
                        ? -70 - +widthHoverSelector
                        : 0
                  }, 30)`
               );
               tooltip
                  .append("rect")
                  .classed("tooltip-rect", true)
                  .attr("x", i * widthHoverSelector + widthHoverSelector + 10)
                  .attr("y", margin.top / 3 - 10)
                  .attr("width", 40)
                  .attr("height", 55);

               tooltip
                  .append("text")
                  .text(`${data[i].kilogram} kg`)
                  .classed("tooltip-text", true)
                  .attr("x", i * widthHoverSelector + widthHoverSelector + 20)
                  .attr("y", margin.top / 3 + 10);
               tooltip
                  .append("text")
                  .text(`${data[i].calories} kCal`)
                  .classed("tooltip-text", true)
                  .attr("x", i * widthHoverSelector + widthHoverSelector + 15)
                  .attr("y", margin.top / 3 + 30);
            })
            .on("mouseleave ", function (event, d) {
               d3.select(this).transition().duration(100).style("opacity", "0"); // <== CSS selector (DOM)

               //remove tooltip
               tooltip.selectAll(".tooltip-rect, .tooltip-text").remove();
            });
      }
   }, [data, durationAnimation]);
   return (
      <div className="home__stats--card gray-card large">
         <svg className="graph-activity"></svg>
      </div>
   );
}

export default GraphActivity;
