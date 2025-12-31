import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    hash: "a1b2c3d",
    title: "Service Management App",
    description: "Customer Service Management System with JWT authentication, geofencing, and automated ticket workflows.",
    tech: ["Kotlin", "Jetpack Compose", "Django REST", "PostgreSQL"],
    github: "https://github.com/hareesh08/servicemanagerportal",
    date: "2025-03-15",
    type: "feat",
    featured: true,
  },
  {
    hash: "e4f5g6h",
    title: "ERP WebView Android App",
    description: "Advanced JSON API parser using Retrofit and OkHttp to efficiently process and display dynamic data.",
    tech: ["Kotlin", "Jetpack Compose", "Retrofit", "OkHttp"],
    github: "https://github.com/hareesh08/EECFate1",
    date: "2024-12-20",
    type: "feat",
    featured: true,
  },
  {
    hash: "i7j8k9l",
    title: "Offline License Management",
    description: "Secure licensing system using JWT, AES encryption, and HWID binding with offline validation.",
    tech: ["C#", "Native AOT", "JWT", "AES"],
    github: "https://github.com/hareesh08/ButterAuth-1",
    date: "2025-06-10",
    type: "security",
    featured: false,
  },
  {
    hash: "m0n1o2p",
    title: "Report Automation Tool",
    description: "Python-based system for automating distribution of internal assessment marks via email.",
    tech: ["Python", "Pandas", "Email Automation"],
    github: "https://github.com/hareesh08/MailSender_Web-ui_Raw",
    date: "2024-02-28",
    type: "tool",
    featured: false,
  },
  {
    hash: "q3r4s5t",
    title: "Lead Generator Text Tool",
    description: "Text-based manipulation tool built in C# with Native AOT optimization.",
    tech: ["C#", "Native AOT", "Text Processing"],
    github: "https://github.com/hareesh08/FixcomboV3",
    date: "2024-08-15",
    type: "tool",
    featured: false,
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Scanlines */}
      <div className="absolute inset-0 scanlines opacity-20 z-0" />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Terminal Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-lg border border-[#00ff00]/30 bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,255,0,0.1)] overflow-hidden"
          >
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-[#00ff00]/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
              </div>
              <span className="ml-4 text-[#606060] text-sm font-mono">projects.sh</span>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm">
              {/* Command */}
              <div className="mb-6">
                <span className="terminal-cyan">❯</span>
                <span className="terminal-text ml-2">$ git log --oneline --all --graph</span>
              </div>

              {/* Git log style projects */}
              <div className="space-y-1">
                {projects.map((project, idx) => (
                  <motion.div
                    key={project.hash}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    {/* Git graph line */}
                    <div className="flex items-start gap-3 group">
                      {/* Graph decoration */}
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="terminal-red">*</span>
                      </div>

                      {/* Commit info */}
                      <div className="flex-1 py-2 px-3 -mx-3 rounded hover:bg-[#111] transition-colors">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="terminal-yellow">{project.hash}</span>
                          <span className={`px-2 py-0.5 text-xs rounded ${
                            project.type === "feat" ? "bg-[#00ff00]/10 terminal-text" :
                            project.type === "security" ? "bg-[#ff00ff]/10 terminal-magenta" :
                            "bg-[#00ffff]/10 terminal-cyan"
                          }`}>
                            {project.type}
                          </span>
                          {project.featured && (
                            <span className="px-2 py-0.5 text-xs bg-[#ffff00]/10 terminal-yellow">
                              ★ featured
                            </span>
                          )}
                        </div>
                        
                        <div className="terminal-white font-medium mb-1">
                          {project.title}
                        </div>
                        
                        <div className="terminal-dim text-xs mb-2 leading-relaxed">
                          {project.description}
                        </div>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mb-2">
                          {project.tech.map((tech) => (
                            <span key={tech} className="text-xs terminal-cyan">
                              [{tech}]
                            </span>
                          ))}
                        </div>

                        {/* Meta info */}
                        <div className="flex items-center gap-4 text-xs">
                          <span className="terminal-dim">{project.date}</span>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="terminal-cyan hover:terminal-text flex items-center gap-1 transition-colors"
                          >
                            view source <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Graph connector */}
                    {idx < projects.length - 1 && (
                      <div className="flex items-center gap-3">
                        <span className="terminal-red ml-[3px]">│</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* GitHub link */}
              <div className="mt-8 pt-6 border-t border-[#00ff00]/20">
                <div className="mb-4">
                  <span className="terminal-cyan">❯</span>
                  <span className="terminal-text ml-2">$ open https://github.com/hareesh08</span>
                </div>
                
                <a
                  href="https://github.com/hareesh08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-[#0a0a0a] transition-all text-sm"
                >
                  <span>View all repositories</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
