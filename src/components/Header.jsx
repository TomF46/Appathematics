// import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Timer from "./Timer";

function Header({gameInProgress}) {
  return (
    <nav className="bg-primary px-4 py-4 shadow-lg">
      {gameInProgress ? (
        <Timer />
      ): (
        <h1 className="text-center text-white text-xl">Appathematics</h1>
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
