import React, { Component } from "react";
import Proyecto from "../components/Proyecto";

export default class Proyectos extends Component {
  render() {
    return (
      <div className="bg-[#020617] text-white py-10 px-3 md:mx-40">
        <h2 className="text-3xl pb-3">//Proyectos</h2>
        <Proyecto/>
      </div>
    );
  }
}
