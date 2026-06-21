import React, { Component } from "react";
import "../css/style.css";
import fotodeperfil from "../img/fotodeperfil.jpg";

export default class Hero extends Component {
  render() {
    return (
      <div className="bg-gray-950 text-white py-10 flex items-center justify-center flex-col gap-5 md:flex-row md:gap-10 lg:flex-row lg:gap-15 px-4">
        <img
          src={fotodeperfil}
          alt="Foto de perfil"
          className="h-120 mask-r-from-80% mask-b-from-80% rounded-md"
        />
        <div className="max-w-md">
          <h1 className="text-3xl font-bold">Bienvenido a mi portafolio</h1>
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
