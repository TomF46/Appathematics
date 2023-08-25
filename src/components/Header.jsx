// import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { connect } from "react-redux";

function Header() {
  return (
    <nav className="bg-primary px-4 py-4 shadow-lg">
            <h1 className="text-center text-white text-lg">Appathematics</h1>
    </nav>
  );
}

Header.propTypes = {
};

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
