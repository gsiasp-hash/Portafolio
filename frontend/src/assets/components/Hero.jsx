import { Component } from "react";
import "../css/style.css";

export default class Hero extends Component {
  render() {
    return (
      <div className="bg-[#020617] text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-center flex-col gap-5 md:flex-row md:gap-10 lg:gap-15">
          <div className="text-center md:text-left">
            <p className="text-violet-400 text-sm font-light">Mi nombre es</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] font-bold leading-tight">
              GUILLERMO <span className="text-violet-400">SIAS</span>
            </h1>
            <h2 className="text-xs font-medium ">$ git init</h2>
            <p className="text-sm mt-10">
              Full Stack Developer en formación | JavaScript · React · Node.js ·
              Bootstrap · Tailwind | Ingeniero en Sonido con 10+ años en
              tecnología y gestión técnica
            </p>
            <div className="mt-3">
              <a
                href="#proyectos"
                className="inline-block bg-violet-500 border border-violet-400 hover:bg-violet-700 text-white py-2 px-4 rounded mt-5 text-sm cursor-pointer"
              >
                Ver Proyectos
              </a>
              <a
                href="#contacto"
                className="inline-block bg-transparent border border-violet-950 hover:text-white hover:bg-violet-500 text-violet-700 py-2 px-4 text-sm rounded mt-5 cursor-pointer ml-2"
              >
                Contactame
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
