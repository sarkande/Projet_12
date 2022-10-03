import Activity from "../models/Activity/index.jsx";
import User from "../models/User/index.jsx";
import AverageSessions from "../models/AverageSessions/index.jsx";
import Performance from "../models/Performance/index.jsx";

function App() {
   const user = new User(12);
   console.log(user);

   const activityUser = new Activity(user.id);
   console.log(activityUser);

   const averageSessionsUser = new AverageSessions(user.id);
   console.log(averageSessionsUser);

   const performanceUser = new Performance(user.id);
   console.log(performanceUser);
   return (
      <div className="App">
         <header className="App-header">test</header>
      </div>
   );
}

export default App;
