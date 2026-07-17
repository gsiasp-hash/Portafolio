import { motion } from "framer-motion";

const typingText = "$ git init";

export default function Hero() {
  return (
    <div className="bg-[#020617] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex items-center justify-center flex-col gap-5 md:flex-row md:gap-10 lg:gap-15">
        <div className="text-center md:text-left">
          <p className="text-violet-400 text-sm font-light">Mi nombre es</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6rem] font-bold leading-tight">
            GUILLERMO <span className="text-violet-400">SIAS</span>
          </h1>
          <h2 className="text-xs font-medium h-5">
            {typingText.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08, duration: 0.05 }}
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              className="inline-block w-2 h-4 bg-violet-400 ml-0.5 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
          </h2>
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
            <a
              href="/cv-guillermo-sias.pdf"
              download
              className="inline-block bg-transparent border border-slate-700 hover:border-violet-500 hover:text-white text-gray-400 py-2 px-4 text-sm rounded mt-5 cursor-pointer ml-2"
            >
              Descargar CV
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
