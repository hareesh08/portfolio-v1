import { useState } from "react";
import { motion } from "framer-motion";

const skillCategories = [
  {
    name: "languages",
    skills: ["Kotlin", "Java", "Python", "C#"],
    color: "terminal-cyan",
  },
  {
    name: "android",
    skills: ["Jetpack Compose", "Android NDK", "REST APIs", "MVVM", "Retrofit", "OkHttp", "Unit Testing"],
    color: "terminal-text",
  },
  {
    name: "backend",
    skills: ["SQL", "PostgreSQL", "Django REST Framework", "Git", "cPanel", "WordPress"],
    color: "terminal-yellow",
  },
  {
    name: "security",
    skills: ["Penetration Testing", "Web Testing", "Reverse Engineering", "Burp Suite", "Debugging"],
    color: "terminal-magenta",
  },
];

const Skills = () => {
  const [activeTab, setActiveTab] = useState("languages");

  return (
    <section id="skills" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
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
              <span className="ml-4 text-[#606060] text-sm font-mono">skills.sh</span>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm md:text-base">
              {/* Command */}
              <div className="mb-6">
                <span className="terminal-cyan">❯</span>
                <span className="terminal-text ml-2">$ cat skills.json | jq '.categories'</span>
              </div>

              {/* Tree structure */}
              <div className="mb-8">
                <div className="terminal-text mb-2">skills/</div>
                {skillCategories.map((cat, idx) => (
                  <div key={cat.name} className="ml-4">
                    <button
                      onClick={() => setActiveTab(cat.name)}
                      className={`flex items-center gap-2 hover:terminal-text transition-colors ${
                        activeTab === cat.name ? cat.color : "terminal-dim"
                      }`}
                    >
                      <span>{idx === skillCategories.length - 1 ? "└──" : "├──"}</span>
                      <span className="hover:underline">{cat.name}/</span>
                      <span className="text-xs terminal-dim">({cat.skills.length} items)</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Active category display */}
              <div className="border-t border-[#00ff00]/20 pt-6">
                <div className="mb-4">
                  <span className="terminal-cyan">❯</span>
                  <span className="terminal-text ml-2">$ ls -la ./skills/{activeTab}/</span>
                </div>

                <div className="bg-[#111] rounded p-4 border border-[#00ff00]/10">
                  <div className="terminal-dim text-xs mb-3">
                    total {skillCategories.find(c => c.name === activeTab)?.skills.length}
                  </div>
                  
                  {skillCategories
                    .find(c => c.name === activeTab)
                    ?.skills.map((skill, idx) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-center gap-4 py-1 hover:bg-[#1a1a1a] px-2 -mx-2 rounded transition-colors"
                      >
                        <span className="terminal-dim text-xs w-20">-rwxr-xr-x</span>
                        <span className="terminal-dim text-xs w-16">hareesh</span>
                        <span className={skillCategories.find(c => c.name === activeTab)?.color}>
                          {skill}
                        </span>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-[#00ff00]/20">
                <div className="mb-4">
                  <span className="terminal-cyan">❯</span>
                  <span className="terminal-text ml-2">$ neofetch --stats</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "Languages", value: "4+", icon: "λ" },
                    { label: "Frameworks", value: "8+", icon: "⚙" },
                    { label: "Tools", value: "15+", icon: "🔧" },
                    { label: "Years", value: "3+", icon: "⏱" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-[#111] border border-[#00ff00]/10 rounded p-4 text-center">
                      <div className="terminal-text text-2xl mb-1">{stat.value}</div>
                      <div className="terminal-dim text-xs">{stat.label}</div>
                    </div>
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

export default Skills;
