import FadeContent from "./rb/FadeContent";

export default function AnimatedSection({ children, className = "" }) {
  return (
    <FadeContent
      className={className}
      duration={800}
      ease="power2.out"
      threshold={0.15}
      blur
    >
      {children}
    </FadeContent>
  );
}