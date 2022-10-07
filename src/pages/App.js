import Activity from "../models/Activity/index.jsx";
import User from "../models/User/index.jsx";
import AverageSessions from "../models/AverageSessions/index.jsx";
import Performance from "../models/Performance/index.jsx";

import * as d3 from "d3";

function App() {
   const user = new User(12);
   console.log(user);

   const activityUser = new Activity(user.id);
   console.log(activityUser);

   const averageSessionsUser = new AverageSessions(user.id);
   console.log(averageSessionsUser);

   const performanceUser = new Performance(user.id);
   console.log(performanceUser);

   d3.select(".d3-a").text("Hello world!");

   return (
      <div className="App">
         <header className="App-header">test</header>
         <div id="d3">test d3</div>
         <p className="d3-a" id="d3-p"></p>
      </div>
   );
}

export default App;
