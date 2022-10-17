import * as d3 from "d3";
import React, { useEffect } from "react";
function GraphUserScore(data) {
   const todayScore = data.data;

   useEffect(() => {}, [todayScore]);

   return (
      <div className="home__stats--card">
         <div className="graph-userScore">
            <h2>GraphUserScore</h2>
            <p>{todayScore}</p>
            <div className="graph">aaa</div>
         </div>
      </div>
   );
}

export default GraphUserScore;
