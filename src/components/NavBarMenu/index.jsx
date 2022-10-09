import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.png";

function NavBarMenu() {
   return (
      <div className="NavBarMenu">
         <div className="NavBarMenu__container">
            <div className="NavBarMenu__container__logo">
               <img
                  className="NavBarMenu__container__logo--img"
                  src={logo}
                  alt="logo"
               />
            </div>
            <div className="NavBarMenu__container__items">
               <div className="NavBarMenu__container__items--item">
                  <Link to="/">Accueil</Link>
               </div>
               <div className="NavBarMenu__container__items--item">
                  <Link to="/">Profil</Link>
               </div>
               <div className="NavBarMenu__container__items--item">
                  <Link to="/">Réglage</Link>
               </div>
               <div className="NavBarMenu__container__items--item">
                  <Link to="/">Communauté</Link>
               </div>
            </div>
         </div>
      </div>
   );
}

export default NavBarMenu;
