import API from "../../services/API";

class Activity {
   constructor(id) {
      this.userId = id;
      this.sessions = null;
      this.isLoaded = false;

      this.error = false;
   }

   async load() {
      return await API.getUserActivity(this.userId)
         .then((user) => {
            this.sessions = user.sessions;
            this.isLoaded = true;
         })
         .catch((error) => {
            console.log(error);

            this.error = true;
         });
   }
}

export default Activity;
