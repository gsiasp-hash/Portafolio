import React, { Component } from "react";
import "../css/style.css";

export default class Navbar extends Component {
  render() {
    return (
        <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Guillermo Sias</h1>
            <div className="space-x-4">
              <a href="#" className="text-white hover:text-gray-300">
                Inicio
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                Sobre mí
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                Proyectos
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                Contacto
              </a>
            </div>
        </nav>
    );
    }}