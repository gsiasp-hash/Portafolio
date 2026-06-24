import { useState } from "react";
import Home from "./assets/Views/Home";
import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";
import Proyectos from "./assets/Views/Proyectos"

function App() {
  return (
    <>
      <div className="min-h-screen font-mono">
        <Navbar className="position-fixed z-0" />
        <Home />
        <Proyectos/>
        <Footer />
      </div>
    </>
  );
}

export default App;
