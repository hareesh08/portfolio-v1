import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import ProtectedData from "./ProtectedData";

const experiences = [
  {
    title: "Android & Backend Developer Intern",
    company: "Ky Technologies Pvt Ltd, Chennai",
    period: "Jan 2025 - Mar 2025",
    description: "Engineered full-stack service management platform with JWT auth, geofencing, and 40% API optimization",
  },
  {
    title: "Freelance Python Developer",
    company: "Upwork - Remote",
    period: "Jul 2021 - Jul 2022",
    description: "Automated data extraction pipelines for 8+ clients, processing 50,000+ records with 70% efficiency gain",
  },
];

const education = {
  degree: "B.Tech Information Technology",
  institution: "SRM Easwari Engineering College, Chennai",
  period: "2022 - 2026",
  cgpa: "7.75",
};

const certifications = [
  "Microsoft Azure Fundamentals (AZ-900)",
  "Cisco CCNA (Modules 1-3)",
  "Cisco Python Essentials (Modules 1-2)",
  "Introduction to CyberSecurity",
  "Android App Development",
  "Python Advance Course",
];

const Experience = () => {
  return (
    <section id="experience" className="section-shell">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
          <p className="section-label">Experience</p>
          <h2 className="section-title mt-3">Work, education, and proof.</h2>
          <p className="section-subtitle mt-4">
            Short, focused experience signals backed by practical outcomes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="panel-card p-5 md:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-lime-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Work</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Recent roles</p>
              </div>
            </div>

            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.title} className="rounded-2xl border border-white/8 bg-white/4 p-4">
                  <h4 className="text-white font-semibold">{exp.title}</h4>
                  <p className="text-lime-300 text-sm mt-1">{exp.company}</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 mt-1">{exp.period}</p>
                  <p className="text-white/62 text-sm leading-relaxed mt-3">{exp.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="panel-card p-5 md:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-lime-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Education</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">Formal training</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/4 p-4 mb-4">
              <h4 className="text-white font-semibold">{education.degree}</h4>
              <p className="text-lime-300 text-sm mt-1">{education.institution}</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/40 mt-1">{education.period}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-white/50 text-sm">CGPA</span>
                <span className="chip rounded-none border-white/8 bg-white/4">
                  <ProtectedData value={education.cgpa} masked="•.••" />
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
                <Award className="w-4 h-4 text-lime-300" />
              </div>
              <h4 className="text-white font-semibold">Certifications</h4>
            </div>

            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span key={cert} className="chip rounded-none border-white/8 bg-white/4">
                  {cert}
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
