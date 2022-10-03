// import API from "../services/API";
import Activity from "../models/Activity/index.jsx";
import User from "../models/User/index.jsx";
function App() {
   const user = new User(12);
   console.log(user);

   const activityUser = new Activity(user.id);
   return (
      <div className="App">
         <header className="App-header">test</header>
      </div>
   );
}

export default App;
