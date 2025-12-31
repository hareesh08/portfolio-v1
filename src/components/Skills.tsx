import { motion } from "framer-motion";
import { Code2, Smartphone, Database, Shield } from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Languages",
    skills: ["Kotlin", "Java", "Python", "C#"],
    color: "from-pink-500 to-rose-500",
    size: "col-span-1",
  },
  {
    icon: Smartphone,
    title: "Android",
    skills: ["Jetpack Compose", "Android NDK", "MVVM", "Retrofit", "REST APIs", "OkHttp"],
    color: "from-purple-500 to-pink-500",
    size: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    icon: Database,
    title: "Backend",
    skills: ["Django REST", "PostgreSQL", "Git", "cPanel"],
    color: "from-cyan-500 to-blue-500",
    size: "col-span-1",
  },
  {
    icon: Shield,
    title: "Security",
    skills: ["Pen Testing", "Reverse Engineering", "Burp Suite"],
    color: "from-orange-500 to-pink-500",
    size: "col-span-1 md:col-span-2",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 bg-gradient-hero relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-pink-400 text-sm font-medium tracking-wider uppercase">What I Know</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`${category.size} bento-card glass-card rounded-3xl p-6 overflow-hidden relative group`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon */}
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-3">{category.title}</h3>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-white/5 text-white/70 rounded-full border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="col-span-1 bento-card glass-card rounded-3xl p-6 flex flex-col justify-center"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "4+", label: "Languages" },
                { value: "8+", label: "Frameworks" },
                { value: "15+", label: "Tools" },
                { value: "3+", label: "Years" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-xs text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
