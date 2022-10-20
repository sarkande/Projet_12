import * as d3 from "d3";
import { useEffect } from "react";

//https://observablehq.com/@d3/d3-line

function GraphAverageSessions({ data, durationAnimation }) {
   //load data from props

   useEffect(() => {
      //array of data to graph
      const lineData = [];

      //extract data
      data.forEach((element, index) => {
         lineData.push([element.day, element.sessionLength]);
      });

      //interpolate data to make a smooth graph animation
      const lineDataAnimation = interpolateArray(
         [lineData[0][1], lineData[6][1]],
         lineData.length
      );

      //set the dimensions and margins of the graph
      const width = 258;
      const height = 263;
      const margin = { top: 50, right: 20, bottom: 50, left: 20 };

      //set the inner dimensions of the graph (without margins)
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      //set the size of the svg
      const svg = d3
         .select(".graph-average-sessions")
         .attr("width", width)
         .attr("height", height);

      //first group to stock the graph
      const g = svg
         .append("g")
         .attr("transform", `translate(${margin.left},${margin.top})`);

      //domains and ranges
      const scaleX = d3.scaleLinear().domain([1, 7]).range([0, innerWidth]);
      const scaleY = d3.scaleLinear().domain([0, 80]).range([innerHeight, 0]);

      //line
      const line = d3
         .line()
         .x((d) => scaleX(d[0]))
         .y((d) => scaleY(d[1]))
         .curve(d3.curveMonotoneX);

      //append the line
      g.append("path")
         .attr("d", line(lineDataAnimation))
         .transition()
         .duration(durationAnimation)
         .attr("d", line(lineData));

      //set the x axis
      const axisX = d3.axisBottom(scaleX).ticks(7);

      //append the x axis
      const axisXSelector = svg
         .append("g")
         .call(axisX)
         .attr(
            "transform",
            `translate(${margin.left},${
               innerHeight + margin.bottom + margin.bottom / 3
            })`
         );

      //transform the x axis text to days
      axisXSelector.selectAll(".tick text").each(function (d, i) {
         switch (d) {
            case 1:
               d3.select(this).text("L");
               break;
            case 2:
               d3.select(this).text("M");
               break;
            case 3:
               d3.select(this).text("M");
               break;
            case 4:
               d3.select(this).text("J");
               break;
            case 5:
               d3.select(this).text("V");
               break;
            case 6:
               d3.select(this).text("S");
               break;
            case 7:
               d3.select(this).text("D");
               break;
            default:
               break;
         }
      });

      //remove unpleasant ticks
      axisXSelector.select(".domain").remove();
      axisXSelector.selectAll(".tick line").remove();

      //append title
      const title = svg.append("g");
      title
         .append("text")
         .classed("title", true)
         .text("Durée moyenne des")
         .attr("transform", `translate(${margin.left}, ${margin.top})`);

      title
         .append("text")
         .classed("title", true)
         .text("sessions")
         .attr("transform", `translate(${margin.left}, ${margin.top + 25})`);

      //Append dots to the line
      const circles = g
         .selectAll("circle")
         .data(lineData)
         .enter()
         .append("circle")
         .classed("graph-line-dot", true)
         .attr("cx", (d) => scaleX(d[0]))
         .attr("cy", (d) => scaleY(d[1]))
         .attr("r", 5)
         .attr("fill", "white")
         .transition()
         .duration(durationAnimation)
         .delay(durationAnimation);

      //set the groupe rect
      const widthHoverSelector =
         parseInt(scaleX.range()[1] / scaleX.domain()[1]) + 6;
      const groupHoverSelector = svg.append("g");
      const tooltip = groupHoverSelector.append("g");
      for (let i = 0; i < scaleX.domain()[1]; i++) {
         groupHoverSelector
            .append("rect")
            .classed("hover-selector", true)
            .attr("hover-selector", i)
            .attr("x", i * widthHoverSelector)
            .attr("y", 0)
            .attr("width", widthHoverSelector * (7 - i))
            .attr("height", height)

            .on("mouseenter", function (event, d) {
               d3.select(circles.nodes()[i])
                  .transition()
                  .duration(100)
                  .style("opacity", "1"); // <== CSS selector (DOM)
               d3.select(this)
                  .transition()
                  .duration(100)
                  .style("opacity", "0.2"); // <== CSS selector (DOM)

               tooltip.attr(
                  "transform",
                  `translate(${i === scaleX.domain()[1] - 1 ? -30 : 0}, 30)`
               );
               tooltip
                  .append("rect")
                  .classed("tooltip-rect", true)
                  .attr("x", i * widthHoverSelector + 10)
                  .attr("y", d3.select(circles.nodes()[i]).attr("cy") - 15)
                  .attr("width", 39)
                  .attr("height", 25);

               tooltip
                  .append("text")
                  .text(lineData[i][1] + " min")
                  .classed("tooltip-text", true)
                  .attr("x", i * widthHoverSelector + 18)
                  .attr("y", d3.select(circles.nodes()[i]).attr("cy"));
            })
            .on("mouseleave ", function (event, d) {
               d3.select(circles.nodes()[i])
                  .transition()
                  .duration(100)
                  .style("opacity", "0"); // <== CSS selector (DOM)

               d3.select(this).transition().duration(100).style("opacity", "0"); // <== CSS selector (DOM)

               //remove tooltip
               tooltip.selectAll(".tooltip-rect, .tooltip-text").remove();
            });
      }
   }, [data]);
   return (
      <div className="home__stats--card red-card">
         <svg className="graph-average-sessions"></svg>
      </div>
   );
}

//Based on http://hevi.info/do-it-yourself/interpolating-and-array-to-fit-another-size/
//and readapt
function interpolateArray(data, fitCount) {
   var linearInterpolate = function (before, after, atPoint) {
      return before + (after - before) * atPoint;
   };

   var newData = new Array();
   var springFactor = new Number((data.length - 1) / (fitCount - 1));
   newData[0] = data[0]; // for new allocation
   for (var i = 1; i < fitCount - 1; i++) {
      var tmp = i * springFactor;
      var before = new Number(Math.floor(tmp)).toFixed();
      var after = new Number(Math.ceil(tmp)).toFixed();
      var atPoint = tmp - before;
      newData[i] = [
         i + 1,
         linearInterpolate(data[before], data[after], atPoint),
      ];
   }
   newData[fitCount - 1] = data[data.length - 1]; // for new allocation
   newData[0] = [1, data[0]];
   newData[fitCount - 1] = [newData.length, data[data.length - 1]];
   return newData;
}

export default GraphAverageSessions;
