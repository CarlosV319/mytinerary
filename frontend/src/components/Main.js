import React from "react";
import { Link } from "react-router-dom";

function Main () {
  return (
    <main className="main">
      <h2>MyTinerary</h2>
      <h5>
        Find your perfect trip, designed by insiders who know and love their
        cities!
      </h5>

      <Link as={Link} to={"/Cities"} className="boton">
       
        <span id="span1"></span> Search Cities!!
      </Link>
    </main>
  );
};
export default Main;

