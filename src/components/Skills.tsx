import { motion } from "framer-motion";
import { Code2, Smartphone, Database, Shield, Server, Cloud } from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Programming",
    skills: ["Kotlin", "Java", "Python", "C#", "SQL"],
    color: "text-pink",
    bg: "bg-pink/20",
  },
  {
    icon: Smartphone,
    title: "Android",
    skills: ["Jetpack Compose", "MVVM", "Retrofit", "OkHttp", "Room", "Coroutines", "Android Architecture Components"],
    color: "text-peach",
    bg: "bg-peach/25",
  },
  {
    icon: Server,
    title: "Backend",
    skills: ["Django REST Framework", "FastAPI", "RESTful APIs", "JWT Auth", "WebSockets", "Microservices"],
    color: "text-black",
    bg: "bg-cream/30",
  },
  {
    icon: Database,
    title: "Databases",
    skills: ["PostgreSQL", "SQLite"],
    color: "text-mint",
    bg: "bg-mint/25",
  },
  {
    icon: Cloud,
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Docker", "Postman", "Azure", "Android Studio", "Linux", "Claude Code"],
    color: "text-peach",
    bg: "bg-peach/25",
  },
  {
    icon: Shield,
    title: "Security",
    skills: ["JWT Authentication", "AES-256 Encryption", "HMAC", "Secure API Design", "API Security"],
    color: "text-pink",
    bg: "bg-pink/20",
  },
];

const Skills = () => {
  return (
    <section id="skills" className="section-shell">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <p className="section-label">Skills</p>
          <h2 className="section-title mt-3">Technical stack, sharpened.</h2>
          <p className="section-subtitle mt-4">
            The work leans mobile-first, backend-aware, and security-conscious.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ delay: idx * 0.08 }}
              className="panel-card p-5 md:p-6 bento-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-11 h-11 rounded-2xl border border-white/80 flex items-center justify-center backdrop-blur ${category.bg}`}>
                  <category.icon className={`w-5 h-5 ${category.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: "rgb(20, 20, 20)" }}>{category.title}</h3>
                  <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(20, 20, 20, 0.5)" }}>Focused capability</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span key={skill} className="chip">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "5+", label: "Languages" },
            { value: "10+", label: "Frameworks" },
            { value: "15+", label: "Tools" },
            { value: "4+", label: "Years" },
          ].map((stat) => (
            <div key={stat.label} className="panel-card p-4 text-center">
                <p className="text-2xl font-bold text-pink">{stat.value}</p>
              <p className="text-[11px] uppercase tracking-[0.22em] mt-1" style={{ color: "rgba(20, 20, 20, 0.55)" }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
