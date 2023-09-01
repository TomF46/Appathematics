// import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Timer from "./Timer";
import { Link, useLocation } from "react-router-dom";

function Header({gameInProgress}) {
  const {pathname} = useLocation();

  function getPageName(){
    switch(pathname){
      case "/":
        return "Appathematics"
      case "/leaderboards":
        return "Leaderboards"
      default:
        if(pathname.includes("/play") && !gameInProgress) return "Summary";
        return "Appathematics"
    }
  }
  return (
    <nav className="sticky top-0 bg-primary px-4 py-4 shadow-lg relative">
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

Header.propTypes = {
  gameInProgress: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    gameInProgress: state.game.gameInProgress,
  };
};

export default connect(mapStateToProps)(Header);
