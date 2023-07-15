import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Slide from "../components/Slide";
import Footer from "../components/Footer";

export default class Home extends React.Component {
  render() {
    return (
      <div className="containert">
        <Header />
        <Main />
        <Slide />
        <Footer />
      </div>
    );
  }
}
