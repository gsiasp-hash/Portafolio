import { Component } from "react";
import Proyectos from "./Proyectos";
import Contacto from "./Contacto";
import Skills from "./Skills";
import Hero from "../components/Hero";
import About from "../components/About";

export default class Home extends Component {
  render() {
    return (
      <div className="min-h-screen flex flex-col font-mono">
        <Hero />
        <About />
        <Skills />
        <Proyectos />
        <Contacto />
      </div>
    );
  }
}
