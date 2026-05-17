import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import ProtectedData from "./ProtectedData";
import { useAuth } from "@/context/AuthContext";

const Contact = () => {
  const { isAuthorized } = useAuth();

  return (
    <section id="contact" className="section-shell pb-24">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <p className="section-label">Contact</p>
          <h2 className="section-title mt-3">Let’s build the next thing.</h2>
          <p className="section-subtitle mt-4">
            Reach out for mobile apps, backend systems, or clean technical help.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="panel-card p-5 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/8 bg-white/4 p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-lime-300" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">Email</p>
                  {isAuthorized ? (
                    <a href="mailto:hareeshworksofficial@gmail.com" className="text-white font-medium hover:text-lime-300 transition-colors">hareeshworksofficial@gmail.com</a>
                  ) : (
                    <ProtectedData value="hareeshworksofficial@gmail.com" masked="h••••••••@gmail.com" className="text-white font-medium" />
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/4 p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-lime-300" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">Phone</p>
                  {isAuthorized ? (
                    <a href="tel:+918072703652" className="text-white font-medium hover:text-lime-300 transition-colors">+91 80727 03652</a>
                  ) : (
                    <ProtectedData value="+91 80727 03652" masked="+91 •••••••••" className="text-white font-medium" />
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/4 p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-lime-300" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/40">Location</p>
                  <ProtectedData value="Chennai, Tamil Nadu, India" masked="Location hidden" className="text-white font-medium" />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div className="panel-card p-5 md:p-6 border border-white/8 bg-white/4">
                <p className="text-white/65 leading-relaxed max-w-lg">
                  Tell me what you’re building and I’ll respond with the shortest path to a solid implementation.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href="mailto:hareeshworksofficial@gmail.com" className="sticker inline-flex items-center gap-3 px-5 py-3">
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
                <a href="https://github.com/hareesh08" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-3 border-2 border-white/15 bg-white/5 text-white font-semibold uppercase tracking-[0.16em] hover:border-lime-300/40 hover:bg-white/10 transition-colors">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/hareesh-d-50147727b" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-3 border-2 border-white/15 bg-white/5 text-white font-semibold uppercase tracking-[0.16em] hover:border-lime-300/40 hover:bg-white/10 transition-colors">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-10 text-white/35 text-sm uppercase tracking-[0.18em] font-mono">
          © 2026 Hareesh Ragavendra
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
