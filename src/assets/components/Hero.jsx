import React, { Component } from "react";
import "../css/style.css";

export default class Hero extends Component {
  render() {
    return (
        <div className="bg-gray-700 p-8 text-center text-white">
          <h1 className="text-3xl font-bold mb-4">Bienvenido a mi portafolio</h1>
          <p className="text-lg">
            Soy Guillermo Sias, un desarrollador apasionado por crear soluciones
          </p>
        </div>
    );
  }
}
