import { motion } from "framer-motion";
import { Github, ExternalLink, Star } from "lucide-react";

const projects = [
  {
    title: "Service Management App",
    description: "Customer Service Management with JWT auth, geofencing, automated workflows",
    tech: ["Kotlin", "Compose", "Django"],
    github: "https://github.com/hareesh08/servicemanagerportal",
    featured: true,
  },
  {
    title: "ERP WebView App",
    description: "Advanced JSON API parser using Retrofit and OkHttp",
    tech: ["Kotlin", "Retrofit", "OkHttp"],
    github: "https://github.com/hareesh08/EECFate1",
    featured: true,
  },
  {
    title: "License Management",
    description: "Secure licensing with JWT, AES encryption, HWID binding",
    tech: ["C#", "JWT", "AES"],
    github: "https://github.com/hareesh08/ButterAuth-1",
    featured: false,
  },
  {
    title: "Report Automation",
    description: "Python-based email automation for assessment marks",
    tech: ["Python", "Pandas"],
    github: "https://github.com/hareesh08/MailSender_Web-ui_Raw",
    featured: false,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-16 md:py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-amber-500 text-sm font-medium mb-2">Projects</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Featured Work
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bento-card glass-card rounded-xl p-5"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-white">{project.title}</h3>
                {project.featured && (
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-500/10 rounded text-amber-500 text-xs">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tech */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs bg-white/5 text-gray-400 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-amber-500 transition-colors"
              >
                <Github className="w-4 h-4" />
                View Code
                <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="https://github.com/hareesh08"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-xl text-gray-400 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            View all on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
