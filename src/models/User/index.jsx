import API from "../../services/API";

class User {
   constructor(id) {
      this.id = id;
      this.userInfos = null;
      this.todayScore = null;
      this.keyData = null;
      this.isLoaded = false;
   }

   async load() {
      return await API.getUser(this.id)
         .then((user) => {
            this.userInfos = user.userInfos;
            this.todayScore = user.todayScore;
            this.keyData = user.keyData;
            this.isLoaded = true;

            console.log("user", this);
         })
         .catch((error) => {
            console.log(error);
         });
   }
   getUserInfos() {
      return this;
   }
}

export default User;
/*      
      id: 12,
      userInfos: {
         firstName: "Karl",
         lastName: "Dovineau",
         age: 31,
      },
      todayScore: 0.12,
      keyData: {
         calorieCount: 1930,
         proteinCount: 155,
         carbohydrateCount: 290,
         lipidCount: 50,
      }, */
