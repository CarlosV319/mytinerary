import React from "react";
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import City from "./components/City";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { connect } from "react-redux";
import authActions from "./redux/actions/authActions";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = (props) => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.logInLS(localStorage.getItem("token"));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cities" element={<Cities />} />
        <Route path="/city/:id" element={<City />} />
        {props.token ? (
          <Route path="*" element={<Home />} />
        ) : (
          <>
            <Route path="/Signup" element={<Signup />} />
            <Route path="/signIn" element={<Signin />} />
          </>
        )}
      </Routes>
      <ToastContainer
        position="top-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token
  };
};

const mapDispatchToProps = {
  logInLS: authActions.logInLS,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
