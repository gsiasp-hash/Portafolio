import React, { Component } from "react";
import "../css/style.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="bg-[#020617] text-white p-4 flex justify-between items-center">
        <h1 className="text-sm ">
          <span className="text-violet-500 font-bold">GS</span>.portfolio
        </h1>
        <div className="space-x-4 text-xs font-light">
          <a href="#" className="text-violet-400 hover:text-gray-300">
            //Sobre mi
          </a>
          <a href="#" className="text-violet-400   hover:text-gray-300">
            //Skills
          </a>
          <a href="#" className="text-violet-400 hover:text-gray-300">
            //Proyectos
          </a>
          <a
            href="#"
            className="bg-violet-500 hover:bg-violet-700 text-white py-2 px-4 rounded"
          >
            Contacto
          </a>
        </div>
      </nav>
    );
  }
}
