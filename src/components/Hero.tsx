import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import ProtectedData from "./ProtectedData";

const Hero = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center section-shell">
      <div className="relative max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        <div className="lg:col-span-8 panel-card p-6 md:p-10 lg:p-12 overflow-hidden">
          <div className="reveal inline-flex items-center gap-3 flex-wrap">
            <span className="tag">Portfolio / 2026</span>
            <span className="chip">Tech-Lux</span>
          </div>

          <div className="reveal mt-8" style={{ transitionDelay: "90ms" }}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase leading-[0.9]" style={{ color: "rgb(var(--ink))" }}>
              <span className="reveal-line inline-block">Hareesh</span>
            </h1>
          </div>

          <div className="reveal mt-4" style={{ transitionDelay: "170ms" }}>
            <p className="text-xl md:text-3xl font-bold text-pink uppercase tracking-[0.16em]">
              <span className="reveal-line inline-block">Android Developer</span>
            </p>
          </div>

          <div className="reveal mt-6 max-w-2xl" style={{ transitionDelay: "240ms" }}>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: "rgba(var(--ink-rgb), 0.7)" }}>
              <span className="block">I design sharp mobile experiences and practical backend systems.</span>
              <span className="block">Scroll to reveal the work, the stack, and the proof.</span>
            </p>
          </div>

          <div className="reveal mt-8 flex flex-wrap gap-4" style={{ transitionDelay: "320ms" }}>
            <a href="mailto:hareeshworksofficial@gmail.com" className="sticker inline-flex items-center gap-3 px-5 py-3">
              <Mail className="w-4 h-4" />
              Contact Me
            </a>
            <a href="#projects" className="inline-flex items-center px-5 py-3 rounded-full border border-white/80 bg-white/80 text-black font-semibold uppercase tracking-[0.16em] hover:bg-white/85 transition-colors dark:border-white/15 dark:bg-white/10 dark:text-white/90 dark:hover:bg-white/15">
              See Projects
            </a>
          </div>

            <div className="reveal mt-10 flex flex-wrap gap-3" style={{ transitionDelay: "390ms" }} role="list" aria-label="Technical skills">
              {[
                "Kotlin",
                "Jetpack Compose",
                "Django REST",
                "FastAPI",
                "Security",
              ].map((item) => (
                <span key={item} className="chip" role="listitem">{item}</span>
              ))}
            </div>
        </div>

        <div className="lg:col-span-4 panel-card reveal" style={{ transitionDelay: "420ms" }}>
          <div className="panel-card p-6 md:p-8 h-full">
            <div className="flex items-start gap-4">
              <div className="w-24 h-24 rounded-[28px] overflow-hidden border border-white/80 dark:border-white/15 shadow-[0_18px_40px_rgba(255,157,157,0.45)] shrink-0">
                <img src="./profile.png" alt="Hareesh Ragavendra" className="w-full h-full object-cover" loading="lazy" decoding="async" />
              </div>
              <div>
                <p className="section-label">Location</p>
                <div className="mt-2 flex items-center gap-2" style={{ color: "rgb(var(--ink))" }}>
                  <MapPin className="w-4 h-4 text-pink" />
                  <ProtectedData value="Chennai, Tamil Nadu, India" masked="Hidden" />
                </div>
                <p className="mt-3 text-sm" style={{ color: "rgba(var(--ink-rgb), 0.65)" }}>
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
                <div key={stat.label} className="rounded-2xl border border-white/70 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                  <div className="text-2xl font-bold text-pink">{stat.value}</div>
                  <div className="text-[11px] uppercase tracking-[0.2em] mt-1" style={{ color: "rgba(var(--ink-rgb), 0.55)" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/70 dark:border-white/10 pt-5">
              <div className="text-xs uppercase tracking-[0.22em]" style={{ color: "rgba(var(--ink-rgb), 0.55)" }}>Available for work</div>
              <div className="flex items-center gap-3">
                <a href="https://github.com/hareesh08" target="_blank" rel="noopener noreferrer" className="hover:text-pink transition-colors" style={{ color: "rgba(var(--ink-rgb), 0.6)" }} aria-label="GitHub Profile">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/hareesh-d-50147727b" target="_blank" rel="noopener noreferrer" className="hover:text-peach transition-colors" style={{ color: "rgba(var(--ink-rgb), 0.6)" }} aria-label="LinkedIn Profile">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
