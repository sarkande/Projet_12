import API from "../../services/API";

/** Performance class */
class Performance {
   /** constructor
    * @param {Number} id - Id of the user
    **/
   constructor(id) {
      this.userId = id;
      this.kind = null;
      this.data = null;
      this.isLoaded = false;

      this.error = false;
   }
   /** load data from the api
    * @returns {Promise} - Promise of the API call
    */
   async load() {
      return await API.getUserPerformance(this.userId)
         .then((user) => {
            this.kind = user.kind;
            this.data = user.data;
            this.isLoaded = true;
         })
         .catch((error) => {
            console.log(error);
            this.error = true;
         });
   }
}

export default Performance;
