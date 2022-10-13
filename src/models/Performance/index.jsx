import API from "../../services/API";

class Performance {
   constructor(id) {
      this.userId = id;

      API.getUserPerformance(this.userId)
         .then((user) => {
            this.kind = user.kind;
            this.data = user.data;
         })
         .catch((error) => {
            console.log(error);
         });
   }
}

export default Performance;
