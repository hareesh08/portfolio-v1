import { Code2, Database, Shield, Wrench, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";

const skillCategories = [
  {
    icon: Code2,
    title: "Programming Languages",
    description: "Core languages I work with daily",
    skills: ["Kotlin", "Java", "Python", "C#"],
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
  },
  {
    icon: Wrench,
    title: "Android Development",
    description: "Modern Android architecture & tools",
    skills: ["Jetpack Compose", "Android NDK", "REST APIs", "MVVM", "Retrofit", "OkHttp", "Unit Testing"],
    gradient: "from-green-500/20 to-emerald-500/20",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-400",
  },
  {
    icon: Database,
    title: "Database & Backend",
    description: "Server-side technologies",
    skills: ["SQL", "PostgreSQL", "Django REST Framework", "Git", "cPanel", "WordPress"],
    gradient: "from-purple-500/20 to-pink-500/20",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-400",
  },
  {
    icon: Shield,
    title: "Security & Testing",
    description: "Security analysis & QA",
    skills: ["Penetration Testing", "Web Testing", "Reverse Engineering", "Burp Suite", "Debugging"],
    gradient: "from-orange-500/20 to-red-500/20",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-400",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
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

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium tracking-wide">Technical Skills</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              My <span className="text-primary">Expertise</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Technologies and tools I use to bring ideas to life
            </p>
          </motion.div>

          {/* Skills grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-5"
          >
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.title}
                variants={itemVariants}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                
                <div className="relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 h-full">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`p-3 rounded-xl ${category.iconBg} border border-white/5`}>
                      <category.icon className={`w-6 h-6 ${category.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground/70">{category.description}</p>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground/50">0{idx + 1}</span>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIdx) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm bg-white/5 text-muted-foreground rounded-lg border border-white/5 hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all duration-200 cursor-default"
                        style={{ animationDelay: `${skillIdx * 50}ms` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Languages", value: "4+" },
              { label: "Frameworks", value: "8+" },
              { label: "Tools", value: "15+" },
              { label: "Years Coding", value: "3+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-card/30 border border-border/30">
                <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
