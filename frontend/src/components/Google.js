import React from "react";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";



const Google = (props) => {
  const responseGoogle = (response) => {
    console.log(response);
    let googleUser = {
      name: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      country: "Argentina",
      email: response.profileObj.email,
      password: response.profileObj.googleId,
      urlImage: response.profileObj.imageUrl,
      google: true,
    };
    props
      .signUp(googleUser)
      .then((res) => res.data.success)
      .catch((error) => console.log(error));
  };
  return (
    <>
      <GoogleLogin
        clientId="1041125619131-d5vtsqppdsmogh4oc79upcg9ddtjkfjc.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};
const mapStateToProps = (state) => {
    return {
      usuario: state.authReducer,
    };
  };
 
  export default connect(mapStateToProps)(Google);
  
