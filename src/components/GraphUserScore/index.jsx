import * as d3 from "d3";
import React, { useEffect } from "react";
function GraphUserScore(data) {
   const todayScore = data.data;

   useEffect(() => {
      d3.selectAll(".graph")
         .data([todayScore])
         .enter()
         .append("h2")
         .text("New Temperature");
   }, [todayScore]);

   return (
      <div className="home__stats--card">
         <div className="graph-userScore">
            <h2>GraphUserScore</h2>
            <p>{todayScore}</p>
            <div className="graph"></div>
         </div>
      </div>
   );
}

export default GraphUserScore;
