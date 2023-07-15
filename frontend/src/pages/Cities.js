import React, { useEffect } from "react";
import { Card, Form, Alert } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import cityActions from "../redux/actions/cityActions";

function Cities(props) {
  useEffect(() => {
    props.arrayCities();
  }, []);

  const auxCities = props.auxiliar;
  const filtrar = props.filtrar;

  return (
    <div className="containert-cities">
      <Header />
      <div className="input">
        <Form.Control
          type="search"
          placeholder="Read only input here..."
          onChange={(evento) => filtrar(auxCities, evento.target.value)}
        />
      </div>
      {props.todasLasCities.length > 0 ? (
        props.todasLasCities.map((element) => {
          return (
            <Card className="card-cities">
              <div key={element._id} className="imagen-city">
                <Link to={`/city/${element._id}`}>
                  <Card.Img variant="top" src={element.img} />
                </Link>

                <Card.Body>
                  <Card.Title>{element.name}</Card.Title>
                  <p>{element.pais}</p>
                </Card.Body>
              </div>
            </Card>
          );
        })
      ) : (
        <Alert variant="info">
          City not found, please try another search..
        </Alert>
      )}
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    todasLasCities: state.cityReducer.cities,
    auxiliar: state.cityReducer.copiaCities,
  };
};

const mapDispatchToProps = {
  arrayCities: cityActions.fetchearCities,
  filtrar: cityActions.filtrar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cities);
