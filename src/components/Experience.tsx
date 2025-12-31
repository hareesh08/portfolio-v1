import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import ProtectedData from "./ProtectedData";

const experiences = [
  {
    title: "Android Developer Intern",
    company: "Ky Technologies Pvt Ltd",
    period: "Jan 2025 - Mar 2025",
    description: "Built Customer Service Management System with JWT auth, geofencing",
    current: true,
  },
  {
    title: "Freelance Developer",
    company: "Upwork",
    period: "Jul 2021 - Jul 2022",
    description: "Python web scraping & automation tools for clients",
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
    <section id="experience" className="py-16 md:py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-amber-500 text-sm font-medium mb-2">Experience</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            Work & Education
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Work */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-medium text-white">Work</h3>
            </div>

            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <div key={idx} className="p-4 bg-white/5 rounded-lg">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-white text-sm">{exp.title}</h4>
                    {exp.current && (
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs rounded">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-amber-500 text-xs mb-1">{exp.company}</p>
                  <p className="text-gray-500 text-xs mb-2">{exp.period}</p>
                  <p className="text-gray-400 text-sm">{exp.description}</p>
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
            className="glass-card rounded-xl p-5"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="font-medium text-white">Education</h3>
            </div>

            <div className="p-4 bg-white/5 rounded-lg mb-4">
              <h4 className="font-medium text-white text-sm mb-1">{education.degree}</h4>
              <p className="text-blue-500 text-xs mb-1">{education.institution}</p>
              <p className="text-gray-500 text-xs mb-3">{education.period}</p>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">CGPA:</span>
                <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 text-sm rounded">
                  <ProtectedData value={education.cgpa} masked="•.••" />
                </span>
              </div>
            </div>

            {/* Certifications */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <Award className="w-4 h-4 text-emerald-500" />
              </div>
              <h4 className="font-medium text-white text-sm">Certifications</h4>
            </div>

            <div className="space-y-2">
              {certifications.map((cert, idx) => (
                <div key={idx} className="px-3 py-2 bg-white/5 rounded-lg text-gray-400 text-sm">
                  {cert}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
