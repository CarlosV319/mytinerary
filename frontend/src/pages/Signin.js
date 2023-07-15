import React from "react";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";
import { useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";

const SignIn = (props) => {
  const inputEmail = useRef();
  const inputPassword = useRef();

  const responseGoogle = (res) => {
    let googleUser = {
      email: res.profileObj.email,
      password: res.profileObj.googleId,
      google: true,
    };
    props.iniciarSesion(googleUser);
  };

  const handleSubmit = async (userLogin) => {
    const errores = await props.iniciarSesion(userLogin);
    console.log(errores);
  };
  const handleSubmitInputs = (e) => {
    e.preventDefault();
    const logIn = {
      email: inputEmail.current.value,
      password: inputPassword.current.value,
    };
    handleSubmit(logIn);
    inputEmail.current.value = "";
    inputPassword.current.value = "";
  };
  return (
    <>
      <Header />
      <div className="container-sigin">
        <main className="main-formulario">
          <form onSubmit={handleSubmitInputs} className="form">
            <h1 className="form-title"> Sign In</h1>
            <p className="form-paragraf">do not have an account yet?</p>
            <Link className="form-link" to="/Signup">
              Sign Up
            </Link>
            <div className="form-container">
              <div className="form-group">
                <input
                  className="form-input"
                  type="email"
                  ref={inputEmail}
                  name="name"
                  placeholder=" "
                />
                <label className="form-label">Mail</label>
                <span className="form-line"></span>
              </div>
              <div className="form-group">
                <input
                  className="form-input"
                  ref={inputPassword}
                  placeholder=" "
                  type="password"
                  name="name"
                />
                <label className="form-label">Password</label>
                <span className="form-line"></span>
              </div>

              <input className="form-sutmit" type="submit" value="Send" />
              <div>
                <GoogleLogin
                  clientId="1041125619131-d5vtsqppdsmogh4oc79upcg9ddtjkfjc.apps.googleusercontent.com"
                  buttonText="Login With Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </div>
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
};

const mapDispatchToProps = {
  iniciarSesion: authActions.signIn,
};

export default connect(null, mapDispatchToProps)(SignIn);
