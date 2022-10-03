import {
   USER_MAIN_DATA,
   USER_ACTIVITY,
   USER_AVERAGE_SESSIONS,
   USER_PERFORMANCE,
} from "../../assets/mockedData";
const axios = require("axios");

const data_request_mock = true;
const url_datas = "http://localhost:3000/datas";

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
         return axios.get(url_datas + "/" + id);
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
         return axios.get(url_datas + "/" + id + "/activity");
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
         return axios.get(url_datas + "/" + id + "/average-sessions");
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
         return axios.get(url_datas + "/" + id + "/performance");
      }
   }
}

export default API;
