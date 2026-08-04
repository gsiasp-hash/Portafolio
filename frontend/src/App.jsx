import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Particles from "./components/rb/Particles";

function App() {
  return (
    <div className="min-h-screen text-ink relative">
      <Particles />
      <div className="relative z-10">
        <Navbar />
        <Home />
        <Footer />
      </div>
    </div>
  );
}

export default App;