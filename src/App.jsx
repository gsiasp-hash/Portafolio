import { useState } from "react";
import Home from "./assets/Views/Home";
import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";

function App() {
  return (
    <>
      <div className="min-h-screen font-mono bg-[#020617]">
        <Navbar className="position-fixed z-0" />
        <Home />
        <Footer />
      </div>
    </>
  );
}

export default App;
