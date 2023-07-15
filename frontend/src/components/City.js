import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Header from "./Header";
import { connect } from "react-redux";
import cityActions from "../redux/actions/cityActions";
import itineraryActions from "../redux/actions/itineraryActions";
import { Accordion } from "react-bootstrap";
import Footer from "./Footer";
import Comment from "./Comment"
// import Comments from "./Comments";
import Itinerary from "./Itinerary";

const City = (props) => {
  let { id } = useParams();

  useEffect(() => {
    props.getItinerary(id);
    props.getOneCity(id);
  }, []);
  

 

  return (
    <div className="containercity">
      <Header />
      <div className="container-city">
        {props.Cities && (
          <div className="container-card">
            <div key={props.Cities._id} className="city-img">
              <img src={props.Cities.img} alt={props.Cities.name} />
              <div className="container-n">
                <p className="name-city tuclase">{props.Cities.name}</p>
                <p className="name-city tuclase">{props.Cities.pais}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {props.itineraries.length !== 0 ? 
     
          props.itineraries.map((itineraries) => <Itinerary itineraries={itineraries} key={itineraries.id}/>): <h1 className="sinItinerarios">
            there are no itineraries for this city
            </h1>
           
            }
        <div className="city-container">
          <Link as={Link} to={"/Cities"} className="boton-una-city">
            <span id="span1"></span> Back to Cities!!
          </Link>
        </div>
      
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    itineraries: state.itineraryReducer.itinerary,
    Cities: state.cityReducer.city,
 
  };
};

const mapDispatchToProps = {
  getItinerary: itineraryActions.getItineraryByCity,
  getOneCity: cityActions.fetchUnaCity,
 
};
export default connect(mapStateToProps, mapDispatchToProps)(City);
