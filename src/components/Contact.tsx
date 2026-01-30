import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import ProtectedData from "./ProtectedData";
import { useAuth } from "@/context/AuthContext";

const Contact = () => {
  const { isAuthorized } = useAuth();

  return (
    <section id="contact" className="py-16 md:py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-amber-500 text-sm font-medium mb-2">Contact</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Get in Touch
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-5 md:p-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Email</p>
                  {isAuthorized ? (
                    <a href="mailto:hareeshworksofficial@gmail.com" className="text-white text-sm hover:text-amber-500 transition-colors">
                      hareeshworksofficial@gmail.com
                    </a>
                  ) : (
                    <ProtectedData value="hareeshworksofficial@gmail.com" masked="h••••••••@gmail.com" className="text-white text-sm" />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Phone</p>
                  {isAuthorized ? (
                    <a href="tel:+918072703652" className="text-white text-sm hover:text-emerald-500 transition-colors">
                      +91 80727 03652
                    </a>
                  ) : (
                    <ProtectedData value="+91 80727 03652" masked="+91 •••••••••" className="text-white text-sm" />
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">Location</p>
                  <ProtectedData value="Chennai, Tamil Nadu, India" masked="Location hidden" className="text-white text-sm" />
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col justify-center">
              <p className="text-gray-400 mb-6">
                Have a project in mind? Let's work together and build something great.
              </p>

              <a
                href="mailto:hareeshworksofficial@gmail.com"
                className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-xl transition-colors flex items-center justify-center gap-2 mb-4"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>

              <div className="flex items-center justify-center gap-3">
                <a
                  href="https://github.com/hareesh08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/hareesh-d-50147727b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 pt-8 border-t border-white/5"
        >
          <p className="text-gray-500 text-sm">
            © 2026 Hareesh Ragavendra
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
