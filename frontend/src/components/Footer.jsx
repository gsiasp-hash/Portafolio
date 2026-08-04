export default function Footer() {
  return (
    <footer className="border-t border-hairline py-8 px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-xs text-mute">
          [ <span className="text-accent">GS</span> ] 2026 · audio & code
        </p>
        <div className="flex items-center gap-6 text-xs">
          <a href="https://github.com/gsiasp-hash" target="_blank" rel="noreferrer" className="text-accent hover:text-accent-hover transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/guillermo-sias-762775180/" target="_blank" rel="noreferrer" className="text-accent hover:text-accent-hover transition-colors">
            LinkedIn
          </a>
          <a href="mailto:g.siasp@gmail.com" className="text-accent hover:text-accent-hover transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}