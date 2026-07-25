import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import ProtectedData from "./ProtectedData";
import { useAuth } from "@/context/AuthContext";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const Contact = () => {
  const { isAuthorized } = useAuth();
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="contact" className="section-shell pb-24">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-8">
          <p className="section-label">Contact</p>
          <h2 className="section-title mt-3">Let's build the next thing.</h2>
          <p className="section-subtitle mt-4">
            Reach out for mobile apps, backend systems, or clean technical help.
          </p>
        </div>

        <div className="reveal panel-card p-5 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/70 bg-white/80 p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl border border-white/80 bg-pink/20 flex items-center justify-center shrink-0" aria-hidden="true">
                  <Mail className="w-5 h-5 text-pink" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "rgba(20, 20, 20, 0.5)" }}>Email</p>
                  {isAuthorized ? (
                    <a href="mailto:hareeshworksofficial@gmail.com" className="font-medium hover:text-pink transition-colors" style={{ color: "rgb(20, 20, 20)" }}>hareeshworksofficial@gmail.com</a>
                  ) : (
                    <ProtectedData value="hareeshworksofficial@gmail.com" masked="h••••••••@gmail.com" className="font-medium" />
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-white/70 bg-white/80 p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl border border-white/80 bg-peach/25 flex items-center justify-center shrink-0" aria-hidden="true">
                  <Phone className="w-5 h-5 text-peach" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "rgba(20, 20, 20, 0.5)" }}>Phone</p>
                  {isAuthorized ? (
                    <a href="tel:+918072703652" className="font-medium hover:text-peach transition-colors" style={{ color: "rgb(20, 20, 20)" }}>+91 80727 03652</a>
                  ) : (
                    <ProtectedData value="+91 80727 03652" masked="+91 •••••••••" className="font-medium" />
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-white/70 bg-white/80 p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl border border-white/80 bg-mint/25 flex items-center justify-center shrink-0" aria-hidden="true">
                  <MapPin className="w-5 h-5 text-mint" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "rgba(20, 20, 20, 0.5)" }}>Location</p>
                  <ProtectedData value="Chennai, Tamil Nadu, India" masked="Location hidden" className="font-medium" />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div className="panel-card p-5 md:p-6 border border-white/70 bg-white/55">
                <p className="leading-relaxed max-w-lg" style={{ color: "rgba(20, 20, 20, 0.7)" }}>
                  Tell me what you're building and I'll respond with the shortest path to a solid implementation.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="mailto:hareeshworksofficial@gmail.com" className="sticker inline-flex items-center gap-3 px-5 py-3">
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
                  <a href="https://github.com/hareesh08" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-3 rounded-full border border-white/80 bg-white/80 text-black font-semibold uppercase tracking-[0.16em] hover:bg-white/85 transition-colors">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/hareesh-d-50147727b" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-3 rounded-full border border-white/80 bg-white/80 text-black font-semibold uppercase tracking-[0.16em] hover:bg-white/85 transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal text-center mt-10 text-sm uppercase tracking-[0.18em] font-mono" style={{ color: "rgba(20, 20, 20, 0.45)" }}>
          © 2026 Hareesh Ragavendra
        </div>
      </div>
    </section>
  );
};

export default Contact;
