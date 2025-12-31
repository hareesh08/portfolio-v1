import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import ProtectedData from "./ProtectedData";

const experiences = [
  {
    title: "Android Developer Intern",
    company: "Ky Technologies Pvt Ltd",
    period: "Jan 2025 - Mar 2025",
    description: "Built Customer Service Management System with JWT auth, geofencing, automated workflows",
    current: true,
  },
  {
    title: "Freelance Developer",
    company: "Upwork",
    period: "Jul 2021 - Jul 2022",
    description: "Python web scraping & automation tools for various clients",
    current: false,
  },
];

const education = {
  degree: "B.Tech Information Technology",
  institution: "SRM Easwari Engineering College",
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
    <section id="experience" className="py-20 px-4 bg-gradient-hero relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-purple-400 text-sm font-medium tracking-wider uppercase">Journey</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Experience & <span className="text-gradient">Education</span>
          </h2>
        </motion.div>

        {/* Bento Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Work Experience - Large card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bento-card glass-card rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Work Experience</h3>
            </div>

            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-white">{exp.title}</h4>
                      <p className="text-sm text-pink-400">{exp.company}</p>
                    </div>
                    {exp.current && (
                      <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/50 mb-2">{exp.period}</p>
                  <p className="text-sm text-white/70">{exp.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bento-card glass-card rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Education</h3>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
              <h4 className="font-semibold text-white mb-1">{education.degree}</h4>
              <p className="text-sm text-cyan-400 mb-2">{education.institution}</p>
              <p className="text-xs text-white/50 mb-3">{education.period}</p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/70">CGPA:</span>
                <span className="px-3 py-1 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full">
                  <ProtectedData value={education.cgpa} masked="•.••" className="text-sm font-semibold text-white" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 lg:col-span-3 bento-card glass-card rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white">Certifications</h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {certifications.map((cert, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 glass rounded-full text-sm text-white/80 hover:text-white hover:bg-white/10 transition-all"
                >
                  🏆 {cert}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
