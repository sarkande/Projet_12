import { useEffect } from "react";
import icon_1 from "../../assets/user_icons/icon_1.png";
import icon_2 from "../../assets/user_icons/icon_2.png";
import icon_3 from "../../assets/user_icons/icon_3.png";
import icon_4 from "../../assets/user_icons/icon_4.png";

function UserKeyData({ data }) {
   useEffect(() => {
      console.log("UserKeyData", data);
   }, [data]);

   return (
      <div className="user-key-data">
         <div className="user-key-data__item">
            <div className="user-key-data__item--icon">
               <img src={icon_1} alt="icon" />
            </div>
            <div className="user-key-data__item--title">
               <p className="user-key-data__item--title-data">
                  {data.calorieCount
                     .toString()
                     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  kCal
               </p>
               <p className="user-key-data__item--title-subtitle">Calories</p>
            </div>
         </div>
         <div className="user-key-data__item">
            <div className="user-key-data__item--icon">
               <img src={icon_2} alt="icon" />
            </div>
            <div className="user-key-data__item--title">
               <p className="user-key-data__item--title-data">
                  {data.proteinCount}g
               </p>
               <p className="user-key-data__item--title-subtitle">Proteines</p>
            </div>
         </div>
         <div className="user-key-data__item">
            <div className="user-key-data__item--icon">
               <img src={icon_3} alt="icon" />
            </div>
            <div className="user-key-data__item--title">
               <p className="user-key-data__item--title-data">
                  {data.carbohydrateCount}g
               </p>
               <p className="user-key-data__item--title-subtitle">Glucides</p>
            </div>
         </div>
         <div className="user-key-data__item">
            <div className="user-key-data__item--icon">
               <img src={icon_4} alt="icon" />
            </div>
            <div className="user-key-data__item--title">
               <p className="user-key-data__item--title-data">
                  {data.lipidCount}g
               </p>
               <p className="user-key-data__item--title-subtitle">Lipides</p>
            </div>
         </div>
      </div>
   );
}

export default UserKeyData;
