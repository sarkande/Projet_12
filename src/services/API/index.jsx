import {
   USER_MAIN_DATA,
   USER_ACTIVITY,
   USER_AVERAGE_SESSIONS,
   USER_PERFORMANCE,
} from "../../assets/mockedData";

const axios = require("axios");

const data_request_mock =
   process.env.REACT_APP_USE_MOCK_DATA === "true" ? true : false;
const url_datas = process.env.REACT_APP_DB;

/** Api class, contains the differents call api to load data from db*/
class API {
   /** get user main data
    * @param {Number} id - Id of the user
    * @returns {Promise} - Promise of the API call
    * */
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
   /** get user activity
    * @param {Number} id - Id of the user
    * @returns {Promise} - Promise of the API call
    * */
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
   /** get user average sessions
    * @param {Number} id - Id of the user
    * @returns {Promise} - Promise of the API call
    * */
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
   /** get user performance
    * @param {Number} id - Id of the user
    * @returns {Promise} - Promise of the API call
    * */
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
