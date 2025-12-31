import { motion } from "framer-motion";
import ProtectedData from "./ProtectedData";

const experiences = [
  {
    title: "Android Developer Intern",
    company: "Ky Technologies Pvt Ltd",
    location: "Chennai (Remote)",
    period: "Jan 2025 - Mar 2025",
    description: "Developed a Customer Service Management System with JWT authentication, geofencing, and automated ticket workflows.",
    current: true,
  },
  {
    title: "Freelance Developer",
    company: "Upwork",
    location: "Chennai (Remote)",
    period: "Jul 2021 - Jul 2022",
    description: "Developed Python-based web scraping tools and automation solutions for various clients.",
    current: false,
  },
];

const education = {
  degree: "Bachelor of Information Technology",
  institution: "SRM Easwari Engineering College",
  location: "Chennai, India",
  period: "2022 - 2026",
  cgpa: "7.75",
};

const certifications = [
  "Microsoft Azure Fundamentals (AZ-900)",
  "Android App Development",
  "Python Advance Course",
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
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
              <span className="ml-4 text-[#606060] text-sm font-mono">experience.sh</span>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm">
              
              {/* Work Experience Section */}
              <div className="mb-8">
                <div className="mb-4">
                  <span className="terminal-cyan">❯</span>
                  <span className="terminal-text ml-2">$ cat /var/log/work_history.log</span>
                </div>

                <div className="space-y-4">
                  {experiences.map((exp, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-[#111] border border-[#00ff00]/10 rounded p-4"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {exp.current && (
                          <span className="px-2 py-0.5 text-xs bg-[#00ff00]/10 terminal-text animate-pulse">
                            ACTIVE
                          </span>
                        )}
                        <span className="terminal-yellow">{exp.period}</span>
                      </div>
                      <div className="terminal-white font-medium">{exp.title}</div>
                      <div className="terminal-cyan text-xs mb-2">@ {exp.company} • {exp.location}</div>
                      <div className="terminal-dim text-xs leading-relaxed">{exp.description}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Education Section */}
              <div className="mb-8 pt-6 border-t border-[#00ff00]/20">
                <div className="mb-4">
                  <span className="terminal-cyan">❯</span>
                  <span className="terminal-text ml-2">$ cat ~/.education</span>
                </div>

                <div className="bg-[#111] border border-[#00ff00]/10 rounded p-4">
                  <div className="terminal-white font-medium">{education.degree}</div>
                  <div className="terminal-cyan text-xs mb-2">@ {education.institution}</div>
                  <div className="flex flex-wrap gap-4 text-xs">
                    <span className="terminal-dim">{education.period}</span>
                    <span className="terminal-dim">{education.location}</span>
                    <span className="flex items-center gap-2">
                      <span className="terminal-dim">CGPA:</span>
                      <ProtectedData value={education.cgpa} masked="•.••" className="terminal-yellow" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="pt-6 border-t border-[#00ff00]/20">
                <div className="mb-4">
                  <span className="terminal-cyan">❯</span>
                  <span className="terminal-text ml-2">$ ls ~/certifications/</span>
                </div>

                <div className="space-y-1">
                  {certifications.map((cert, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 py-1 hover:bg-[#111] px-2 -mx-2 rounded transition-colors"
                    >
                      <span className="terminal-dim text-xs">-rw-r--r--</span>
                      <span className="terminal-text">{cert}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
