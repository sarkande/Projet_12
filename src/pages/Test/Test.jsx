import * as d3 from "d3";
import React, { useState } from "react";

import User from "../../models/User";
import Activity from "../../models/Activity";
import AverageSessions from "../../models/AverageSessions";
import Performance from "../../models/Performance";

function draw() {
   d3.select(".d3-a").text("test d3");
}

function Test() {
   const activity = new Activity(12);
   const averageSessions = new AverageSessions(12);
   const performance = new Performance(12);
   const user = new User(12);
   console.log(activity);
   console.log(averageSessions);
   console.log(performance);
   console.log(typeof user);
   console.log(user);

   setTimeout(() => {
      console.log("World!");
      console.log(user);
   }, 5000);
   //console.log(user.getUserInfos());

   //let userName = user?.userInfos?.firstName + " " + user?.userInfos?.lastName;
   return (
      <div className="App">
         <h1>Hello {user.userInfos}</h1>
         <header className="App-header">test</header>
         <div id="d3">test d3</div>
         <p className="d3-a" id="d3-p"></p>
         {draw()}
      </div>
   );
}

export default Test;
