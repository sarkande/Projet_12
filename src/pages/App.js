import API from "../services/API";

function App() {
   API.getUser(12).then((user) => {
      console.log(user);
   });

   API.getUserActivity(12).then((user) => {
      console.log(user);
   });

   API.getUserAverageSessions(12).then((user) => {
      console.log(user);
   });

   API.getUserPerformance(12).then((user) => {
      console.log(user);
   });

   return (
      <div className="App">
         <header className="App-header">test</header>
      </div>
   );
}

export default App;
