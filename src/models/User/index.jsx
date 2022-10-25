import API from "../../services/API";

/** User class*/
class User {
   /** constructor
    * @param {Number} id - Id of the user
    **/
   constructor(id) {
      this.id = id;
      this.userInfos = null;
      this.todayScore = null;
      this.keyData = null;
      this.isLoaded = false;

      this.error = false;
   }
   /** load data from the api
    * @returns {Promise} - Promise of the API call
    */
   async load() {
      return await API.getUser(this.id)
         .then((user) => {
            this.userInfos = user.userInfos;
            this.todayScore = user.todayScore;
            this.keyData = user.keyData;
            this.isLoaded = true;
         })
         .catch((error) => {
            console.log(error);
            this.error = true;
         });
   }
}

export default User;
