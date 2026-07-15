import { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <div className="bg-[#020617] text-white py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl pb-3">//Sobre mi</h2>
        <p className="text-sm">
          Soy Ingeniero en Sonido y Desarrollador Full Stack. Mi
          trayectoria en el ámbito técnico del audio me dotó de una sólida
          capacidad analítica y una metodología rigurosa para la resolución de
          problemas. Actualmente, diseño y desarrollo soluciones digitales
          utilizando el ecosistema de JavaScript (HTML5, CSS3, React y Node.js).
          Disfruto enormemente construyendo interfaces fluidas y conectándolas
          con arquitecturas estables. Vengo de un mundo donde el "en vivo" no da
          margen de error, por lo que sé mantener la cabeza fría bajo presión,
          aprender rápido sobre la marcha y aportar soluciones estructuradas a
          equipos que avancen a paso firme.
        </p>
      </div>
    );
  }
}
