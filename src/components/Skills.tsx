import { motion } from "framer-motion";
import { Code2, Smartphone, Database, Shield } from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Languages",
    skills: ["Kotlin", "Java", "Python", "C#"],
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Smartphone,
    title: "Android",
    skills: ["Jetpack Compose", "Android NDK", "MVVM", "Retrofit", "REST APIs", "OkHttp"],
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Database,
    title: "Backend",
    skills: ["Django REST", "PostgreSQL", "Git", "cPanel"],
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Shield,
    title: "Security",
    skills: ["Pen Testing", "Reverse Engineering", "Burp Suite"],
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-16 md:py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-amber-500 text-sm font-medium mb-2">Skills</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Technical Expertise
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bento-card glass-card rounded-xl p-5"
            >
              {/* Icon & Title */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 ${category.bg} rounded-lg flex items-center justify-center`}>
                  <category.icon className={`w-5 h-5 ${category.color}`} />
                </div>
                <h3 className="font-medium text-white">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm bg-white/5 text-gray-300 rounded-lg border border-white/5 hover:border-amber-500/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { value: "4+", label: "Languages" },
            { value: "8+", label: "Frameworks" },
            { value: "15+", label: "Tools" },
            { value: "3+", label: "Years" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <p className="text-xl font-bold text-amber-500">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
