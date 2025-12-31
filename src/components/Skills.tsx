import { Code2, Database, Shield, Wrench } from "lucide-react";
import { motion, Variants } from "framer-motion";

const skillCategories = [
  {
    icon: Code2,
    title: "Programming Languages",
    skills: ["Kotlin", "Java", "Python", "C#"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Wrench,
    title: "Android Development",
    skills: ["Jetpack Compose", "Android NDK", "REST APIs", "MVVM", "Retrofit", "OkHttp", "Unit Testing"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Database,
    title: "Database & Backend",
    skills: ["SQL", "PostgreSQL", "Django REST Framework", "Git", "cPanel", "WordPress"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Security & Testing",
    skills: ["Penetration Testing", "Web Testing", "Reverse Engineering", "Burp Suite", "Debugging"],
    color: "from-orange-500 to-red-500",
  },
];

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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-background relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      <div className="container px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-lg font-semibold tracking-wide uppercase mb-3">Skills</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Technical Expertise</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive skill set spanning mobile development, backend systems, and security testing
            </p>
          </motion.div>

          {/* Skills grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-6"
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="group relative p-6 rounded-xl bg-gradient-card border border-border hover:border-primary/50 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  boxShadow: 'inset 0 0 30px rgba(174, 194, 248, 0.15)'
                }} />

                <div className="relative flex items-start gap-4">
                  <div 
                    className={`p-3 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-15 border border-${category.color.split('-')[1]}-500/20 group-hover:bg-opacity-25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0`}
                  >
                    <category.icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 text-sm font-semibold bg-secondary/60 text-muted-foreground rounded-md border border-border hover:border-primary/40 hover:text-primary hover:bg-secondary/80 hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
