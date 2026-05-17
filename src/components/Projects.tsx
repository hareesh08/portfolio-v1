import { motion } from "framer-motion";
import { Github, ExternalLink, Star } from "lucide-react";

const projects = [
  {
    title: "Service Management App",
    description: "Full-stack Android app for customer service ops with JWT auth, role-based access, and WebSocket chat",
    tech: ["Kotlin", "Jetpack Compose", "Django REST", "PostgreSQL"],
    github: "https://github.com/hareesh08/servicemanagerportal",
    featured: true,
  },
  {
    title: "Offline License Management System",
    description: "Secure offline licensing with AES-256 encryption, HWID binding, and HMAC validation",
    tech: ["C#", ".NET 8", "Native AOT", "AES-256"],
    github: "https://github.com/hareesh08/ButterAuth-1",
    featured: true,
  },
  {
    title: "ERP WebView Android App",
    description: "Android WebView app with dynamic REST API integration and optimized JSON parsing",
    tech: ["Kotlin", "Jetpack Compose", "Retrofit", "OkHttp"],
    github: "https://github.com/hareesh08/EECFate1",
    featured: true,
  },
  {
    title: "Report Automation System",
    description: "Automated report generation and scheduled email delivery reducing processing time from 8 hours to 30 minutes",
    tech: ["Python", "Pandas", "SMTP"],
    github: "https://github.com/hareesh08/MailSender_Web-ui_Raw",
    featured: false,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="section-shell">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <p className="section-label">Projects</p>
          <h2 className="section-title mt-3">Featured work with real weight.</h2>
          <p className="section-subtitle mt-4">
            A mix of mobile, backend, and tooling work built to solve actual problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ delay: idx * 0.08 }}
              className="panel-card p-5 md:p-6 bento-card"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="text-xl font-bold text-white leading-tight">{project.title}</h3>
                {project.featured && (
                  <span className="tag shrink-0">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </span>
                )}
              </div>

              <p className="text-white/65 leading-relaxed mb-5">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((tech) => (
                    <span key={tech} className="chip">{tech}</span>
                  ))}
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                View Code
                <ExternalLink className="w-3 h-3" />
              </a>
            </motion.article>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-8 flex justify-center">
          <a
            href="https://github.com/hareesh08"
            target="_blank"
            rel="noopener noreferrer"
            className="sticker inline-flex items-center gap-2 px-5 py-3"
          >
            <Github className="w-4 h-4" />
            View All Work
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
