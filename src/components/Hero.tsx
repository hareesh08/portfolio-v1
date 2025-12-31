import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import ProtectedData from "./ProtectedData";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-4xl mx-auto w-full">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-6 md:p-10"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            {/* Avatar */}
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden flex-shrink-0 border border-white/10">
              <img 
                src="./android-chrome-512x512.png" 
                alt="Hareesh Ragavendra" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl md:text-3xl font-semibold text-white mb-1">
                Hareesh Ragavendra
              </h1>
              <p className="text-amber-500 font-medium mb-3">
                Android Developer & Full-Stack Engineer
              </p>
              
              {/* Location */}
              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <ProtectedData value="Chennai, Tamil Nadu, India" masked="Location hidden" />
              </div>

              {/* Status */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-sm">Available for work</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex md:flex-col gap-6 md:gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-amber-500">5+</p>
                <p className="text-xs text-gray-500">Projects</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-500">3+</p>
                <p className="text-xs text-gray-500">Years</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-amber-500">15+</p>
                <p className="text-xs text-gray-500">Skills</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="text-gray-400 leading-relaxed mb-8 text-center md:text-left">
            Passionate about building modern Android applications with 
            <span className="text-amber-500"> Kotlin</span> and 
            <span className="text-amber-500"> Jetpack Compose</span>. 
            Experienced in full-stack development with Django REST Framework.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="mailto:hareeshworksoffcial@gmail.com"
              className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </a>
            <a
              href="#projects"
              className="w-full sm:w-auto px-6 py-3 glass hover:bg-white/10 text-white rounded-xl transition-colors text-center"
            >
              View Projects
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center md:justify-start gap-3 mt-8 pt-6 border-t border-white/5">
            <a
              href="https://github.com/hareesh08"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-amber-500/30 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/hareesh-d-50147727b"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-amber-500/30 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:hareeshworksoffcial@gmail.com"
              className="w-10 h-10 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:border-amber-500/30 transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
