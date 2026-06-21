import React, { Component } from "react";
import "../css/style.css";

export default class Navbar extends Component {
  render() {
    return (
      <div className="bg-gray-800 text-white p-4 font-bold">
        Guillermo <span className="text-yellow-700">Sias</span>
      </div>
    );
  }
}
