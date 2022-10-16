import API from "../../services/API";

class Performance {
   constructor(id) {
      this.userId = id;
      this.kind = null;
      this.data = null;
      this.isLoaded = false;

      this.error = false;
   }
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
