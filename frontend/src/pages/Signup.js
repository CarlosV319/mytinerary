import React from "react";
import { connect } from "react-redux";
import authActions from "../redux/actions/authActions";
import { useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia & Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre & Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts & Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks & Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const Registro = (props) => {
  const inputName = useRef();
  const inputEmail = useRef();
  const inputPassword = useRef();
  const inputLastName = useRef();
  const inputCountry = useRef();
  const inputUrlImage = useRef();

  const responseGoogle = (res) => {
    console.log(res);
    let googleUser = {
      name: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      email: res.profileObj.email,
      password: res.profileObj.googleId,
      urlImage: res.profileObj.imageUrl,
      country: "Argentina",
      google: true,
    };
    props
      .signUp(googleUser)
      .then((response) => response.data.success)
      .catch((errores) => console.log(errores));
  };
  const handleSubmit = async (user) => {
    const errores = await props.signUp(user);
    console.log(errores)
    if (errores) {
      errores.errores.map((e) =>
        toast.info(e.message, {
          position: "top-left",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
    }
  };

  const handleSubmitInputs = (e) => {
    e.preventDefault();
    const user = {
      name: inputName.current.value,
      lastName: inputLastName.current.value,
      country: inputCountry.current.value,
      email: inputEmail.current.value,
      password: inputPassword.current.value,
      urlImage: inputUrlImage.current.value,
    };
    handleSubmit(user);
    inputName.current.value = "";
    inputLastName.current.value = "";
    inputCountry.current.value = "";
    inputEmail.current.value = "";
    inputPassword.current.value = "";
    inputUrlImage.current.value = "";
  };

  return (
    <>
      <Header />
      <div className="container-sigin">
        <main className="form">
          <form onSubmit={handleSubmitInputs} className="form-container">
        <h1> Sign Up</h1> 
            <label
              className="labelFormulario"
              style={{ display: "flex", flexDirection: "column" }}
            >
              Name
              <input type="text" ref={inputName} />
            </label>
            <label
              className="labelFormulario"
              style={{ display: "flex", flexDirection: "column" }}
            >
              LastName
              <input type="text" ref={inputLastName} placeholder="" />
            </label>
            <label
              className="labelFormulario"
              style={{ display: "flex", flexDirection: "column" }}
            >
              Url Image
              <input type="text" ref={inputUrlImage} placeholder="" />
            </label>
            <label
              className="labelFormulario"
              style={{ display: "flex", flexDirection: "column" }}
            >
              Country
              <select ref={inputCountry} name="select">
                {countries.map((country) => {
                  return <option value={country}>{country}</option>;
                })}
              </select>
            </label>

            <label
              className="labelFormulario"
              style={{ display: "flex", flexDirection: "column" }}
            >
              Mail
              <input
                className="email"
                type="text"
                ref={inputEmail}
                name="name"
              />
            </label>
            <label
              className="labelFormulario"
              style={{ display: "flex", flexDirection: "column" }}
            >
              Password
              <input
                className="email"
                type="password"
                ref={inputPassword}
                name="name"
              />
            </label>

            <input className="form-sutmit"  type="submit" value="Send" />
            <GoogleLogin
              clientId="1041125619131-d5vtsqppdsmogh4oc79upcg9ddtjkfjc.apps.googleusercontent.com"
              buttonText="Register With Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            {/* <Google /> */}
          </form>
        </main>
      </div>
      <Footer />
    </>
  );
};

const mapDispatchToProps = {
  signUp: authActions.signUp,
};

export default connect(null, mapDispatchToProps)(Registro);

