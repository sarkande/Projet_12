import * as d3 from "d3";
import React from "react";

import { Link } from "react-router-dom";
import User from "../../models/User";

//Get All user, actually only 2 with no endpoints
//12 18
class Home extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         user: [new User(12), new User(18)],
      };
   }
   componentDidMount() {
      for (let i = 0; i < this.state.user.length; i++) {
         this.state.user[i].load().then(() => {
            this.setState({ user: this.state.user });
         });
      }
   }

   render() {
      const { user } = this.state;
      console.log(user);
      return (
         <div className="App">
            {user.map((u, index) => {
               console.log(u);
               return u.isLoaded ? (
                  <p key={index}>
                     <Link to={`/user/${u.id}`}>{u.userInfos.firstName}</Link>
                  </p>
               ) : (
                  <p key={index}>Loading...</p>
               );
            })}
         </div>
      );
   }
}

export default Home;
