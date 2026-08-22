import Particles from "../rb/Particles";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

export default function MainTemplate({ children }) {
  return (
    <div className="min-h-screen text-ink relative">
      <Particles />
      <div className="relative z-10">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
