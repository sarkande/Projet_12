import * as d3 from "d3";
import React from "react";

import User from "../../models/User";

class Test2 extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         user: new User(12),
      };
   }
   componentDidMount() {
      console.log("componentDidMount");

      this.state.user.load().then(() => {
         this.setState({ user: this.state.user });
      });
   }

   render() {
      const { user } = this.state;
      if (!user.isLoaded) return <div>Loading...</div>;
      else {
         console.log(user);
         return (
            <div className="App">
               <h1>Hello {user.userInfos.firstName}</h1>
               <header className="App-header">test</header>
               <div id="d3">test d3</div>
               <p className="d3-a" id="d3-p"></p>
            </div>
         );
      }
   }
}

export default Test2;
