import API from "../../services/API";

class AverageSessions {
   constructor(id) {
      this.userId = id;

      API.getUserAverageSessions(this.userId)
         .then((user) => {
            this.sessions = user.sessions;
         })
         .catch((error) => {
            console.log(error);
         });
   }
}

export default AverageSessions;
