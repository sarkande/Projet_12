function Home() {
   return (
      <div className="home">
         <h1>
            Bonjour <span className="home__title--user">Thomas</span>
         </h1>
         <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>

         <div className="home__stats">
            <div className="home__stats--card large"></div>
            <div className="home__stats--card red-card"></div>
            <div className="home__stats--card black-card"></div>
            <div className="home__stats--card"></div>
         </div>
      </div>
   );
}

export default Home;
