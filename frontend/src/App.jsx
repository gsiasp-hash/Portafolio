import MainTemplate from "./components/templates/MainTemplate";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Particles from "./components/rb/Particles";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="min-h-screen text-ink relative">
    
      <Analytics />
    <MainTemplate>
      <Home />
    </MainTemplate>
    </div>
      
  );
}

export default App;
