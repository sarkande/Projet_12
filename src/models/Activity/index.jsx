import API from "../../services/API";

/** Activity class */
class Activity {
   /** constructor
    * @param {Number} id - Id of the user
    **/
   constructor(id) {
      this.userId = id;
      this.sessions = null;
      this.isLoaded = false;

      this.error = false;
   }
   /** load data from the api
    * @returns {Promise} - Promise of the API call
    */
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
