import {
   USER_MAIN_DATA,
   USER_ACTIVITY,
   USER_AVERAGE_SESSIONS,
   USER_PERFORMANCE,
} from "../../assets/mockedData";

const axios = require("axios");

const data_request_mock =
   process.env.REACT_APP_USE_MOCK_DATA === "true" ? true : false;
const url_datas = "http://localhost:3000/user";

class API {
   static getUser(id) {
      if (data_request_mock) {
         return new Promise((resolve, reject) => {
            const user = USER_MAIN_DATA.find((user) => user.id === id);
            if (user) {
               resolve(user);
            } else {
               reject("User not found");
            }
         });
      } else {
         return axios
            .get(url_datas + "/" + id)
            .then((response) => response.data.data);
      }
   }

   static getUserActivity(id) {
      if (data_request_mock) {
         return new Promise((resolve, reject) => {
            const user = USER_ACTIVITY.find((user) => user.userId === id);
            if (user) {
               resolve(user);
            } else {
               reject("User not found");
            }
         });
      } else {
         return axios
            .get(url_datas + "/" + id + "/activity")
            .then((response) => response.data.data);
      }
   }

   static getUserAverageSessions(id) {
      if (data_request_mock) {
         return new Promise((resolve, reject) => {
            const user = USER_AVERAGE_SESSIONS.find(
               (user) => user.userId === id
            );
            if (user) {
               resolve(user);
            } else {
               reject("User not found");
            }
         });
      } else {
         return axios
            .get(url_datas + "/" + id + "/average-sessions")
            .then((response) => response.data.data);
      }
   }

   static getUserPerformance(id) {
      if (data_request_mock) {
         return new Promise((resolve, reject) => {
            const user = USER_PERFORMANCE.find((user) => user.userId === id);
            if (user) {
               resolve(user);
            } else {
               reject("User not found");
            }
         });
      } else {
         return axios
            .get(url_datas + "/" + id + "/performance")
            .then((response) => response.data.data);
      }
   }
}

export default API;
