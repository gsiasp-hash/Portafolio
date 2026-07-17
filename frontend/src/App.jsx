import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
