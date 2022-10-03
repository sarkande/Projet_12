import API from "../../services/API";

class Activity {
   constructor(id) {
      this.userId = id;

      API.getUserActivity(this.userId)
         .then((user) => {
            this.sessions = user.sessions;
         })
         .catch((error) => {
            console.log(error);
         });
   }
}

export default Activity;
