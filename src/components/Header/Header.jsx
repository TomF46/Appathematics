import { useSelector } from "react-redux";
import Timer from "./Timer";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const {pathname} = useLocation();
  const gameInProgress = useSelector((state) => state.game.gameInProgress)

  function getPageName(){
    switch(pathname){
      case "/":
        return "Appathematics"
      case "/leaderboards":
        return "Leaderboards"
      case "/custom":
        return "Custom sets"
      default:
        if(pathname.includes("/play") && !gameInProgress) return "Summary";
        return "Appathematics"
    }
  }
  return (
    <nav className="sticky top-0 bg-primary px-4 py-4 shadow-lg">
      {pathname != "/" && (
        <div className="back-button">
          <Link to={"/"}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
        </div>
      )}
      {gameInProgress ? (
        <Timer />
      ): (
        <h1 className="text-center text-white text-3xl">{getPageName()}</h1>
      )}
    </nav>
  );
}

export default Header;
