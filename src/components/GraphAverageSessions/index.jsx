import * as d3 from "d3";
import { selectAll } from "d3";
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

      const lineDataAnimation = interpolateArray(
         [lineData[0][1], lineData[6][1]],
         lineData.length
      );
      //https://www.tutorialsteacher.com/d3js/axes-in-d3
      console.log("lineData", lineData);
      console.log("lineDataAnimation", lineDataAnimation);
      const width = 258;
      const height = 263;

      const margin = { top: 50, right: 20, bottom: 50, left: 20 };

      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const svg = d3
         .select(".graph-average-sessions")
         .attr("width", width)
         .attr("height", height);

      const g = svg
         .append("g")
         .attr("transform", `translate(${margin.left},${margin.top})`);

      const scaleX = d3.scaleLinear().domain([1, 7]).range([0, innerWidth]);

      const scaleY = d3.scaleLinear().domain([0, 80]).range([innerHeight, 0]);

      const line = d3
         .line()
         .x((d) => scaleX(d[0]))
         .y((d) => scaleY(d[1]))
         .curve(d3.curveMonotoneX);

      g.append("path")
         .attr("d", line(lineDataAnimation))
         .transition()
         .duration(2000)
         .attr("d", line(lineData));

      const axisX = d3.axisBottom(scaleX).ticks(7);

      const axisXSelector = svg
         .append("g")
         .call(axisX)
         .attr(
            "transform",
            `translate(${margin.left},${
               innerHeight + margin.bottom + margin.bottom / 3
            })`
         );

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

      axisXSelector.select(".domain").remove();
      axisXSelector.selectAll(".tick line").remove();

      const title = svg.append("g");
      title
         .append("text")
         .text("Durée moyenne des")
         .attr("transform", `translate(${margin.left}, ${margin.top})`);

      title
         .append("text")
         .text("sessions")
         .attr("transform", `translate(${margin.left}, ${margin.top + 25})`);

      g.selectAll("circle")
         .data(lineData)
         .enter()
         .append("circle")
         .attr("cx", (d) => scaleX(d[0]))
         .attr("cy", (d) => scaleY(d[1]))
         .attr("r", 5)
         .attr("fill", "white");
   }, [dataGraph]);
   return (
      <div className="home__stats--card red-card">
         <svg className="graph-average-sessions">
            {/* <p>
               Durée moyenne des <br />
               sessions
            </p> */}

            {/* <div className="hebdo">
                  <div className="hebdo__day">L</div>
                  <div className="hebdo__day">M</div>
                  <div className="hebdo__day">M</div>
                  <div className="hebdo__day">J</div>
                  <div className="hebdo__day">V</div>
                  <div className="hebdo__day">S</div>
                  <div className="hebdo__day">D</div>
               </div> */}
         </svg>
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
