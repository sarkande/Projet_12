import * as d3 from "d3";
import React from "react";

import { useLocation } from "react-router-dom";

import User from "../../models/User";
import Activity from "../../models/Activity";
import Performance from "../../models/Performance";
import AverageSessions from "../../models/AverageSessions";
import GraphAverageSessions from "../../components/GraphAverageSessions";
import GraphPerformance from "../../components/GraphPerformance";
import GraphActivity from "../../components/GraphActivity";
import GraphUserScore from "../../components/GraphUserScore";

class UserProfile extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         user: new User(12),
         activity: new Activity(12),
         performance: new Performance(12),
         averageSessions: new AverageSessions(12),
      };
   }
   componentDidMount() {
      this.state.user.load().then(() => {
         this.setState({ user: this.state.user });
      });
      this.state.activity.load().then(() => {
         this.setState({ activity: this.state.activity });
         console.log(this.state.activity);
      });
      this.state.performance.load().then(() => {
         this.setState({ performance: this.state.performance });
         console.log(this.state.performance);
      });
      this.state.averageSessions.load().then(() => {
         this.setState({ averageSessions: this.state.averageSessions });
         console.log(this.state.averageSessions);
      });
   }

   render() {
      const { user, activity, performance, averageSessions } = this.state;
      if (!user.isLoaded) return <div>Loading...</div>;
      else {
         return (
            <div className="App">
               <h1>Hello {user.userInfos.firstName}</h1>
               <header className="App-header">test</header>
               <div id="d3">test d3</div>
               <p className="d3-a" id="d3-p"></p>
               <div className="home__stats">
                  {!activity.isLoaded ? (
                     <p>Activity is loading</p>
                  ) : (
                     <div>
                        <GraphActivity data={activity.sessions} />
                     </div>
                  )}
                  {!averageSessions.isLoaded ? (
                     <p>AverageSessions is loading</p>
                  ) : (
                     <div>
                        <GraphAverageSessions data={averageSessions.sessions} />
                     </div>
                  )}
                  {!performance.isLoaded ? (
                     <p>Performance is loading</p>
                  ) : (
                     <div>
                        <GraphPerformance data={performance} />
                     </div>
                  )}
                  {!user.isLoaded ? (
                     <p>User is loading</p>
                  ) : (
                     <div>
                        <GraphUserScore data={user.todayScore} />
                     </div>
                  )}
               </div>
            </div>
         );
      }
   }
}

export default UserProfile;
