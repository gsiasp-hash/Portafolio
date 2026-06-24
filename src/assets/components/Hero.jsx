import React, { Component } from "react";
import "../css/style.css";
import fotodeperfil from "../img/fotodeperfil.jpg";

export default class Hero extends Component {
  render() {
    return (
      <div className="bg-gray-950 text-white py-10 flex items-center justify-center flex-col gap-5 md:flex-row md:gap-10 lg:flex-row lg:gap-15 px-4">
        <div className="">
          <h1 className="text-3xl font-bold">
            Guillermo <span className="text-purple-400">Sias</span>
          </h1>
          <h2 className="text-md font-medium ">Bienvenido a mi portafolio</h2>
          <p className="mt-10">
            Full Stack Developer en formación | JavaScript · React · Node.js ·
            Bootstrap · Tailwind | Ingeniero en Sonido con 7+ años en tecnología
            y gestión técnica
          </p>
        </div>
      </div>
    );
  }
}
