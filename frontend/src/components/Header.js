import React from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";

const Header = (props) => {
  var logoUser = props.token ? (
    <img className="user" alt="img" src={props.urlImage} />
  ) : (
    <img
      className="user"
      alt="img"
      src={require("../assets/loging.png").default}
    />
  );

  return (
    <header className="header">
      <Navbar collapseOnSelect expand="lg" className="fondo-nav" variant="dark">
        <Container>
          <Navbar.Brand className="tamaño-logo" href="#home">
            <Link className="color-link" to="/">
              MyTinerary
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto espacio"></Nav>

            <Nav className="me-auto">
              <Nav.Link>
                <Link className="color-link" to="/">
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link className="color-link" to="/Cities">
                  Cities
                </Link>
              </Nav.Link>
              <NavDropdown
                className="user"
                title={logoUser}
                id="collasible-nav-dropdown"
              >
                {props.token ? (
                  <NavDropdown.Item onClick={() => props.logOut()}>
                    Log Out
                  </NavDropdown.Item>
                ) : (
                  <>
                    <NavDropdown.Item as={Link} to={"/Signin"}>
                      Sign In
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to={"/Signup"}>
                      Sign Up
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
const mapStateToProps = (state) => {
  return {
    token:state.authReducer.token,
    name: state.authReducer.name,
    urlImage: state.authReducer.urlImage,  };
  
};
const mapDispatchToProps = {
  logOut: authActions.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
