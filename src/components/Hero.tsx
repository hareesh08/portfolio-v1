import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import ProtectedData from "./ProtectedData";

const Hero = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center section-shell">
      <div className="relative max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        <div className="lg:col-span-8 panel-card brutal-panel p-6 md:p-10 lg:p-12 overflow-hidden">
          <div className="reveal inline-flex items-center gap-3">
            <span className="tag">Portfolio / 2026</span>
            <span className="chip">Neumorphism x Brutalism</span>
          </div>

          <div className="reveal mt-8" style={{ transitionDelay: "90ms" }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[0.9]">
              <span className="reveal-line inline-block">Hareesh</span>
            </h1>
          </div>

          <div className="reveal mt-4" style={{ transitionDelay: "170ms" }}>
            <p className="text-xl md:text-3xl font-bold text-lime-300 uppercase tracking-[0.16em]">
              <span className="reveal-line inline-block">Android Developer</span>
            </p>
          </div>

          <div className="reveal mt-6 max-w-2xl" style={{ transitionDelay: "240ms" }}>
            <p className="text-white/68 text-base md:text-lg leading-relaxed">
              <span className="block">I design sharp mobile experiences and practical backend systems.</span>
              <span className="block">Scroll to reveal the work, the stack, and the proof.</span>
            </p>
          </div>

          <div className="reveal mt-8 flex flex-wrap gap-4" style={{ transitionDelay: "320ms" }}>
            <a href="mailto:hareeshworksofficial@gmail.com" className="sticker inline-flex items-center gap-3 px-5 py-3">
              <Mail className="w-4 h-4" />
              Contact Me
            </a>
            <a href="#projects" className="inline-flex items-center px-5 py-3 border-2 border-white/15 bg-white/5 text-white font-semibold uppercase tracking-[0.16em] hover:border-lime-300/40 hover:bg-white/10 transition-colors">
              See Projects
            </a>
          </div>

          <div className="reveal mt-10 flex flex-wrap gap-3" style={{ transitionDelay: "390ms" }}>
            {[
              "Kotlin",
              "Jetpack Compose",
              "Django REST",
              "FastAPI",
              "Security",
            ].map((item) => (
              <span key={item} className="chip">{item}</span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 panel-card p-6 md:p-8 reveal" style={{ transitionDelay: "420ms" }}>
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 rounded-[28px] overflow-hidden border-4 border-black shadow-[10px_10px_0_rgba(0,0,0,0.45)] shrink-0">
              <img src="./profile.png" alt="Hareesh Ragavendra" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="section-label">Location</p>
              <div className="mt-2 text-white/90 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-lime-300" />
                <ProtectedData value="Chennai, Tamil Nadu, India" masked="Hidden" />
              </div>
              <p className="mt-3 text-sm text-white/60 max-w-xs">
                Full-stack work with a bias toward usable interfaces and secure systems.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-center">
            {[
              { value: "6+", label: "Projects" },
              { value: "4+", label: "Years" },
              { value: "20+", label: "Skills" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/5 p-4">
                <div className="text-2xl font-black text-lime-300">{stat.value}</div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/45 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-white/8 pt-5">
            <div className="text-xs uppercase tracking-[0.22em] text-white/45">Available for work</div>
            <div className="flex items-center gap-3">
              <a href="https://github.com/hareesh08" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/hareesh-d-50147727b" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
