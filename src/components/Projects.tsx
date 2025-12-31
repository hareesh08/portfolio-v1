import { motion } from "framer-motion";
import { Github, ExternalLink, Heart, MessageCircle, Send, Bookmark } from "lucide-react";

const projects = [
  {
    title: "Service Management App",
    description: "Customer Service Management with JWT auth, geofencing, automated workflows",
    tech: ["Kotlin", "Compose", "Django"],
    github: "https://github.com/hareesh08/servicemanagerportal",
    image: "🔧",
    likes: "1.2K",
    featured: true,
  },
  {
    title: "ERP WebView App",
    description: "Advanced JSON API parser using Retrofit and OkHttp",
    tech: ["Kotlin", "Retrofit", "OkHttp"],
    github: "https://github.com/hareesh08/EECFate1",
    image: "📱",
    likes: "890",
    featured: true,
  },
  {
    title: "License Management",
    description: "Secure licensing with JWT, AES encryption, HWID binding",
    tech: ["C#", "JWT", "AES"],
    github: "https://github.com/hareesh08/ButterAuth-1",
    image: "🔐",
    likes: "654",
    featured: false,
  },
  {
    title: "Report Automation",
    description: "Python-based email automation for assessment marks",
    tech: ["Python", "Pandas"],
    github: "https://github.com/hareesh08/MailSender_Web-ui_Raw",
    image: "📊",
    likes: "432",
    featured: false,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 bg-gradient-hero relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Featured <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        {/* Projects Grid - Instagram Post Style */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bento-card glass-card rounded-3xl overflow-hidden"
            >
              {/* Post header */}
              <div className="flex items-center gap-3 p-4 border-b border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-lg">
                  {project.image}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm">{project.title}</p>
                  <p className="text-xs text-white/50">
                    {project.featured && <span className="text-pink-400">Featured • </span>}
                    {project.tech.join(" • ")}
                  </p>
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              </div>

              {/* Post content */}
              <div className="p-6 min-h-[120px] flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                <div className="text-6xl">{project.image}</div>
              </div>

              {/* Post actions - Instagram style */}
              <div className="p-4 border-t border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <button className="text-white/70 hover:text-pink-500 transition-colors">
                      <Heart className="w-6 h-6" />
                    </button>
                    <button className="text-white/70 hover:text-white transition-colors">
                      <MessageCircle className="w-6 h-6" />
                    </button>
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                  </div>
                  <button className="text-white/70 hover:text-white transition-colors">
                    <Bookmark className="w-6 h-6" />
                  </button>
                </div>
                
                <p className="text-sm font-semibold text-white mb-1">{project.likes} likes</p>
                <p className="text-sm text-white/70">
                  <span className="font-semibold text-white">hareesh.dev</span>{" "}
                  {project.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://github.com/hareesh08"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            <Github className="w-5 h-5" />
            View all on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
