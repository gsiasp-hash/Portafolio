import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Particles from "./components/rb/Particles";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="min-h-screen text-ink relative">
      <Particles />
      <div className="relative z-10">
        <Navbar />
        <Home />
        <Footer />
      </div>
      <Analytics />
    </div>
  );
}

export default App;