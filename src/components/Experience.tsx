import { Briefcase, MapPin, Calendar } from "lucide-react";
import { motion, Variants } from "framer-motion";
import ProtectedData from "./ProtectedData";

const experiences = [
  {
    title: "Android Developer Intern",
    company: "Ky Technologies Pvt Ltd",
    location: "Chennai (Remote)",
    period: "Jan 2025 - Mar 2025",
    description:
      "Developed a Customer Service Management System with JWT authentication, geofencing, and automated ticket workflows, enhancing operational efficiency.",
    current: true,
  },
  {
    title: "Freelance Developer",
    company: "Upwork",
    location: "Chennai (Remote)",
    period: "Jul 2021 - Jul 2022",
    description:
      "Developed Python-based web scraping tools and automation solutions for various clients, delivering efficient data extraction and processing systems.",
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const rightItemVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-lg font-semibold tracking-wide uppercase mb-3">Experience</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Journey So Far</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Professional experience and educational background</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Work Experience */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Work Experience</h3>
              </motion.div>

              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group relative pl-6 border-l-2 border-border hover:border-primary/60 transition-all duration-300"
                  >
                    <motion.div 
                      className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-background border-2 border-primary group-hover:border-primary/80 group-hover:scale-125 transition-all duration-300"
                      whileHover={{ scale: 1.3, boxShadow: '0 0 10px rgba(174, 194, 248, 0.5)' }}
                    />

                    <motion.div 
                      className="pb-6 p-4 rounded-lg bg-card/30 border border-transparent group-hover:border-primary/20 group-hover:bg-card/60 transition-all duration-300"
                      whileHover={{ scale: 1.01, x: 5 }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{exp.title}</h4>
                        {exp.current && (
                          <motion.span 
                            className="px-2 py-0.5 text-xs font-mono bg-green-500/20 text-green-400 rounded border border-green-500/30"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            Recent
                          </motion.span>
                        )}
                      </div>
                      <p className="text-primary font-medium text-sm mb-2 group-hover:text-primary/90 transition-colors">{exp.company}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3 group-hover:text-muted-foreground/80 transition-colors">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-muted-foreground/90 transition-colors">{exp.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={rightItemVariants} className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">Education</h3>
              </motion.div>

              <motion.div 
                variants={rightItemVariants} 
                className="group p-6 rounded-xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                
                <h4 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors duration-300">{education.degree}</h4>
                <p className="text-primary font-medium mb-3 group-hover:text-primary/90 transition-colors">{education.institution}</p>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4 group-hover:text-muted-foreground/80 transition-colors">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {education.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {education.period}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">CGPA:</span>
                  <span className="px-3 py-1 font-mono font-semibold bg-primary/10 text-primary rounded-md border border-primary/20 group-hover:border-primary/50 transition-all">
                    <ProtectedData value={education.cgpa} masked="•.••" />
                  </span>
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div variants={rightItemVariants} className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Certifications</h4>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <motion.div
                    variants={rightItemVariants}
                    className="group p-4 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 hover:bg-secondary/50 transition-all duration-300 cursor-default"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <p className="font-medium text-sm group-hover:text-primary transition-colors">Microsoft Azure Fundamentals (AZ-900)</p>
                    <p className="text-xs text-muted-foreground mt-1 group-hover:text-muted-foreground/80 transition-colors">Cloud Computing • 2025</p>
                  </motion.div>
                  <motion.div
                    variants={rightItemVariants}
                    className="group p-4 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 hover:bg-secondary/50 transition-all duration-300 cursor-default"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <p className="font-medium text-sm group-hover:text-primary transition-colors">Android App Development Basics</p>
                    <p className="text-xs text-muted-foreground mt-1 group-hover:text-muted-foreground/80 transition-colors">Online Course • 2023</p>
                  </motion.div>
                  <motion.div
                    variants={rightItemVariants}
                    className="group p-4 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 hover:bg-secondary/50 transition-all duration-300 cursor-default"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <p className="font-medium text-sm group-hover:text-primary transition-colors">Python Advance Course</p>
                    <p className="text-xs text-muted-foreground mt-1 group-hover:text-muted-foreground/80 transition-colors">Programming Hero • 2022</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
