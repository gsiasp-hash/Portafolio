import React, { Component } from "react";
import "../css/style.css";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-sm ">
          <span className="text-purple-400 font-bold">GS</span>.portfolio
        </h1>
        <div className="space-x-4 text-xs font-light">
          <a href="#" className="text-purple-300 hover:text-gray-300">
            //Sobre mi
          </a>
          <a href="#" className="text-purple-300 hover:text-gray-300">
            //Skills
          </a>
          <a href="#" className="text-purple-300 hover:text-gray-300">
            //Proyectos
          </a>
          <a href="#" className="bg-purple-800 border border-purple-400 hover:bg-purple-700 text-white py-1 px-3 rounded">
            Contacto
          </a>
        </div>
      </nav>
    );
  }
}
