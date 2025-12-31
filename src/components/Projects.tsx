import { Github, Calendar, ExternalLink, Folder, Star } from "lucide-react";
import { motion, Variants } from "framer-motion";

const projects = [
  {
    title: "Service Management App",
    description:
      "Customer Service Management System with JWT authentication, geofencing, and automated ticket workflows. Built with modern UI/UX patterns.",
    tech: ["Kotlin", "Jetpack Compose", "Django REST", "PostgreSQL"],
    github: "https://github.com/hareesh08/servicemanagerportal",
    period: "Jan 2025 - Mar 2025",
    type: "Internship",
    featured: true,
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "ERP WebView Android App",
    description:
      "Advanced JSON API parser using Retrofit and OkHttp to efficiently process and display dynamic data in a WebView application.",
    tech: ["Kotlin", "Jetpack Compose", "Retrofit", "OkHttp"],
    github: "https://github.com/hareesh08/EECFate1",
    period: "Nov 2024 - Dec 2024",
    type: "Work",
    featured: true,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Offline License Management System",
    description:
      "Secure licensing system using JWT, AES encryption, and HWID binding. Features offline validation and tamper-proofing.",
    tech: ["C#", "Native AOT", "JWT", "AES Encryption"],
    github: "https://github.com/hareesh08/ButterAuth-1",
    period: "May 2025 - Jun 2025",
    type: "System Design",
    featured: false,
  },
  {
    title: "Report Automation Tool",
    description:
      "Python-based system for automating the distribution of internal assessment marks via email using Excel data.",
    tech: ["Python", "Pandas", "GUI", "Email Automation"],
    github: "https://github.com/hareesh08/MailSender_Web-ui_Raw",
    period: "Nov 2023 - Feb 2024",
    type: "College Work",
    featured: false,
  },
  {
    title: "Lead Generator Text Tool",
    description:
      "Text-based manipulation tool built in C# with Native AOT optimization for performance-critical operations.",
    tech: ["C#", "Native AOT", "Text Processing"],
    github: "https://github.com/hareesh08/FixcomboV3",
    period: "May 2024 - Aug 2024",
    type: "Tools",
    featured: false,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const Projects = () => {
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 bg-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Folder className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium tracking-wide">Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              A showcase of my work in Android development, security, and automation
            </p>
          </motion.div>

          {/* Featured Projects */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid lg:grid-cols-2 gap-6 mb-12"
          >
            {featuredProjects.map((project, idx) => (
              <motion.article
                key={project.title}
                variants={itemVariants}
                className="group relative"
              >
                {/* Gradient glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                
                <div className="relative h-full rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 overflow-hidden">
                  {/* Featured badge */}
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-yellow-500 font-medium">Featured</span>
                    </div>
                  </div>

                  <div className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <span className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-lg border border-primary/20">
                        {project.type}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-5 flex-1 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs bg-white/5 text-muted-foreground rounded-lg border border-white/5 hover:border-primary/30 hover:text-primary transition-all duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      <div className="flex items-center gap-2 text-muted-foreground/60 text-xs">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="font-mono">{project.period}</span>
                      </div>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all duration-200"
                      >
                        <Github className="w-4 h-4" />
                        Code
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Other Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h3 className="text-xl font-semibold text-center text-muted-foreground mb-8">
              Other Notable Projects
            </h3>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {otherProjects.map((project) => (
              <motion.article
                key={project.title}
                variants={itemVariants}
                className="group p-5 rounded-xl bg-card/30 border border-border/30 hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <Folder className="w-5 h-5 text-primary/60" />
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>

                <h4 className="text-base font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-muted-foreground/70 text-sm mb-4 leading-relaxed line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 2).map((tech) => (
                      <span key={tech} className="text-xs text-muted-foreground/60 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground/40 font-mono">{project.type}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* GitHub CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center mt-16"
          >
            <a
              href="https://github.com/hareesh08"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-card/50 border border-border/50 hover:border-primary/30 text-muted-foreground hover:text-primary transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">View all projects on GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
