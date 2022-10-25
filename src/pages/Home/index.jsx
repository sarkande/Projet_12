import React from "react";

import { Link } from "react-router-dom";
import User from "../../models/User";

//Get All user, actually only 2 with no endpoints
//12 18
/** React class to display links to our 2 users profiles */
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
      return (
         <div className="App">
            <ul>
               {user.map((u, index) => {
                  return u.isLoaded ? (
                     <li key={index}>
                        <Link to={`/user/${u.id}`}>
                           {u.userInfos.firstName}
                        </Link>
                     </li>
                  ) : (
                     <li key={index}>Loading...</li>
                  );
               })}
            </ul>
         </div>
      );
   }
}

export default Home;
