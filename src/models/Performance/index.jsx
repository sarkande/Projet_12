import API from "../../services/API";

class Performance {
   constructor(id) {
      this.userId = id;

      API.getUserPerformance(this._iuserIdd)
         .then((user) => {
            this.kind = user.kind;
            this.data = user.data;
            console.log(this);
         })
         .catch((error) => {
            console.log(error);
         });
   }
}

export default Performance;
