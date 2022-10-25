import icon_1 from "../../assets/icons/icon_1.png";
import icon_2 from "../../assets/icons/icon_2.png";
import icon_3 from "../../assets/icons/icon_3.png";
import icon_4 from "../../assets/icons/icon_4.png";

/**
 * Footer of the application thqt is displqy on the left
 * @returns {any}
 */
function NavBarFooter() {
   return (
      <div className="NavBarFooter">
         <div className="NavBarFooter__container">
            <div className="NavBarFooter__container__items">
               <div className="NavBarFooter__container__items--item">
                  <img src={icon_1} alt="icon_1" />
               </div>
               <div className="NavBarFooter__container__items--item">
                  <img src={icon_2} alt="icon_2" />
               </div>
               <div className="NavBarFooter__container__items--item">
                  <img src={icon_3} alt="icon_2" />
               </div>
               <div className="NavBarFooter__container__items--item">
                  <img src={icon_4} alt="icon_2" />
               </div>
            </div>
            <div className="NavBarFooter__container__copyright">
               <p>Copyright, SportSee 2022</p>
            </div>
         </div>
      </div>
   );
}

export default NavBarFooter;
