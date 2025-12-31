import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";
import ProtectedData from "./ProtectedData";
import { useAuth } from "@/context/AuthContext";

const Contact = () => {
  const { isAuthorized } = useAuth();

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-hero relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">Get in Touch</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-white/50 mt-4 max-w-md mx-auto">
            Have a project in mind? Let's talk about it.
          </p>
        </motion.div>

        {/* Contact Card - DM Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl overflow-hidden"
        >
          {/* Chat header */}
          <div className="p-4 border-b border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-xl font-bold text-white">
              HR
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">Hareesh Ragavendra</h3>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full" />
                Active now
              </p>
            </div>
          </div>

          {/* Contact info as messages */}
          <div className="p-6 space-y-4">
            {/* Email */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="glass rounded-2xl rounded-tl-sm p-4 max-w-xs">
                <p className="text-xs text-white/50 mb-1">Email</p>
                {isAuthorized ? (
                  <a href="mailto:hareeshworksoffcial@gmail.com" className="text-white hover:text-pink-400 transition-colors">
                    hareeshworksoffcial@gmail.com
                  </a>
                ) : (
                  <ProtectedData value="hareeshworksoffcial@gmail.com" masked="h•••••@gmail.com" className="text-white" />
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="glass rounded-2xl rounded-tl-sm p-4 max-w-xs">
                <p className="text-xs text-white/50 mb-1">Phone</p>
                {isAuthorized ? (
                  <a href="tel:+918072703652" className="text-white hover:text-cyan-400 transition-colors">
                    +91 80727 03652
                  </a>
                ) : (
                  <ProtectedData value="+91 80727 03652" masked="+91 •••••••••" className="text-white" />
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="glass rounded-2xl rounded-tl-sm p-4 max-w-xs">
                <p className="text-xs text-white/50 mb-1">Location</p>
                <ProtectedData value="Chennai, Tamil Nadu, India" masked="••••••, India" className="text-white" />
              </div>
            </div>
          </div>

          {/* Message input */}
          <div className="p-4 border-t border-white/10">
            <a
              href="mailto:hareeshworksoffcial@gmail.com"
              className="flex items-center gap-4 w-full"
            >
              <div className="flex-1 glass rounded-full px-6 py-3 text-white/50 text-sm">
                Send me a message...
              </div>
              <button className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white hover:scale-105 transition-transform">
                <Send className="w-5 h-5" />
              </button>
            </a>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mt-8"
        >
          <a
            href="https://github.com/hareesh08"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/hareesh-d-50147727b"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 glass rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <Linkedin className="w-6 h-6" />
          </a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-white/30 text-sm">
            © 2025 Hareesh Ragavendra • Built with React + TypeScript
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
