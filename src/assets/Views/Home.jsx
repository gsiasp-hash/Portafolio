import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Proyectos from "./Proyectos";
import Footer from "../components/Footer";
import Proyecto from "../components/Proyecto";
import Hero from "../components/Hero";

export default class Home extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Hero />
        <Proyectos />
        <Proyecto />
        <Footer />
      </>
    );
  }
}
