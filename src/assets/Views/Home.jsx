import React, { Component } from "react";
import Navbar from "../components/Navbar";
import Proyectos from "./Proyectos";
import Footer from "../components/Footer";
import Proyecto from "../components/Proyecto";
import Hero from "../components/Hero";
import About from "../components/About";

export default class Home extends Component {
  render() {
    return (
      <div className="min-h-screen flex flex-col font-mono">
        <Hero />
        <About/>
      </div>
    );
  }
}
