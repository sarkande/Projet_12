import React from "react";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import User from "../../models/User";
import Activity from "../../models/Activity";
import Performance from "../../models/Performance";
import AverageSessions from "../../models/AverageSessions";
import GraphAverageSessions from "../../components/GraphAverageSessions";
import GraphPerformance from "../../components/GraphPerformance";
import GraphActivity from "../../components/GraphActivity";
import GraphUserScore from "../../components/GraphUserScore";
import UserKeyData from "../../components/UserKeyData";

/**
 * Page to display the user's profile
 * @returns {JSX.Element} - Page with the user's profile
 */
function UserProfile() {
   const currentPath = useLocation().pathname.split("/");
   const idUser = Number(currentPath[currentPath.length - 1]);

   const [user, setUser] = useState(0);
   const [activities, setActivities] = useState(0);
   const [performances, setPerformances] = useState(0);
   const [averageSessions, setAverageSessions] = useState(0);

   const durationAnimation = 2000;

   useEffect(() => {
      const userData = new User(idUser);
      const activitiesData = new Activity(idUser);
      const performancesData = new Performance(idUser);
      const averageSessionsData = new AverageSessions(idUser);

      userData.load().then(() => {
         setUser(userData);
      });

      activitiesData.load().then(() => {
         setActivities(activitiesData);
      });

      performancesData.load().then(() => {
         setPerformances(performancesData);
      });

      averageSessionsData.load().then(() => {
         setAverageSessions(averageSessionsData);
      });
   }, [idUser]);

   return user.isLoaded && !user.error ? (
      <div className="App">
         <div className="home__stats">
            <h1>
               Bonjour{" "}
               <span className="title-name">{user.userInfos.firstName}</span>
            </h1>
            <p>F??licitation ! Vous avez explos?? vos objectifs hier ????</p>

            {!activities.isLoaded ? (
               <p>Activity is loading</p>
            ) : (
               <div>
                  <GraphActivity
                     data={activities.sessions}
                     durationAnimation={durationAnimation}
                  />
               </div>
            )}
            {!averageSessions.isLoaded ? (
               <p>AverageSessions is loading</p>
            ) : (
               <div>
                  <GraphAverageSessions
                     data={averageSessions.sessions}
                     durationAnimation={durationAnimation}
                  />
               </div>
            )}
            {!performances.isLoaded ? (
               <p>Performance is loading</p>
            ) : (
               <div>
                  <GraphPerformance
                     data={performances}
                     durationAnimation={durationAnimation}
                  />
               </div>
            )}
            {!user.isLoaded ? (
               <p>User is loading</p>
            ) : (
               <div>
                  <GraphUserScore
                     data={user.todayScore}
                     durationAnimation={durationAnimation}
                  />
               </div>
            )}
         </div>
         <div className="home__key-data">
            {!user.isLoaded ? (
               <p>User is loading</p>
            ) : (
               <UserKeyData data={user.keyData} />
            )}
         </div>
      </div>
   ) : (
      <div className="App">
         {user.error ? (
            <p>Erreur lors du chargement des donn??es, utilisateur inexistant</p>
         ) : (
            <p>Les information de l'utilisateur sont en cours de chargement</p>
         )}
      </div>
   );
}

export default UserProfile;
