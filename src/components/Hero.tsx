import { Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import ProtectedData from "./ProtectedData";
import { useAuth } from "@/context/AuthContext";

const stories = [
  { id: 1, label: "Skills", color: "from-pink-500 to-orange-500", emoji: "💻" },
  { id: 2, label: "Projects", color: "from-purple-500 to-pink-500", emoji: "🚀" },
  { id: 3, label: "Work", color: "from-cyan-500 to-blue-500", emoji: "💼" },
  { id: 4, label: "Contact", color: "from-green-500 to-cyan-500", emoji: "📱" },
];

const Hero = () => {
  const { isAuthorized } = useAuth();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.toLowerCase());
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex flex-col bg-gradient-hero overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Stories bar - Instagram style */}
      <div className="relative z-10 pt-24 pb-4 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {stories.map((story, idx) => (
              <motion.button
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => scrollToSection(story.label)}
                className="flex flex-col items-center gap-2 flex-shrink-0"
              >
                <div className={`story-ring`}>
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${story.color} flex items-center justify-center text-2xl`}>
                    {story.emoji}
                  </div>
                </div>
                <span className="text-xs text-white/70">{story.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-4xl mx-auto w-full">
          {/* Profile card - Glass */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-3xl p-8 md:p-12"
          >
            {/* Profile header */}
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
              {/* Avatar with gradient ring */}
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-500 p-1">
                  <div className="w-full h-full rounded-full bg-[#1a1025] flex items-center justify-center text-4xl font-bold text-white">
                    HR
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-[#1a1025] flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
              </div>

              {/* Name & stats */}
              <div className="text-center md:text-left flex-1">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">Hareesh Ragavendra</h1>
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                </div>
                <p className="text-pink-400 font-medium mb-3">@hareesh.dev</p>
                
                {/* Stats row - Instagram style */}
                <div className="flex items-center justify-center md:justify-start gap-6">
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">5+</p>
                    <p className="text-xs text-white/50">Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">3+</p>
                    <p className="text-xs text-white/50">Years</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-white">15+</p>
                    <p className="text-xs text-white/50">Skills</p>
                  </div>
                </div>
              </div>

              {/* Follow button */}
              <motion.a
                href="mailto:hareeshworksoffcial@gmail.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl font-semibold text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-shadow"
              >
                Contact
              </motion.a>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <p className="text-white/80 leading-relaxed">
                <span className="text-pink-400">Android Developer</span> & <span className="text-cyan-400">Full-Stack Engineer</span> 
                {" "}passionate about building modern apps with <span className="text-purple-400">Kotlin</span>, 
                {" "}<span className="text-purple-400">Jetpack Compose</span> & Django REST Framework ✨
              </p>
            </div>

            {/* Location & links */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-white/50">
                <MapPin className="w-4 h-4" />
                <ProtectedData value="Chennai, India" masked="••••••, India" />
              </div>
              
              <div className="flex items-center gap-3">
                <a 
                  href="https://github.com/hareesh08" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/hareesh-d-50147727b" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:hareeshworksoffcial@gmail.com"
                  className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center mt-6"
          >
            <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-white/70">Available for opportunities</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-white/30 text-sm">Scroll ↓</div>
      </motion.div>
    </section>
  );
};

export default Hero;
