import { Briefcase, GraduationCap, Award } from "lucide-react";
import ProtectedData from "./ProtectedData";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

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
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} id="experience" className="section-shell">
      <div className="max-w-6xl mx-auto">
        <div className="reveal mb-8">
          <p className="section-label">Experience</p>
          <h2 className="section-title mt-3">Work, education, and proof.</h2>
          <p className="section-subtitle mt-4">
            Short, focused experience signals backed by practical outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="reveal panel-card p-5 md:p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl border border-white/80 bg-pink/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-pink" />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: "rgb(20, 20, 20)" }}>Work</h3>
                <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(20, 20, 20, 0.5)" }}>Recent roles</p>
              </div>
            </div>

            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.title} className="rounded-2xl border border-white/70 bg-white/80 p-4">
                  <h4 className="font-semibold" style={{ color: "rgb(20, 20, 20)" }}>{exp.title}</h4>
                  <p className="text-pink text-sm mt-1">{exp.company}</p>
                  <p className="text-[11px] uppercase tracking-[0.18em] mt-1" style={{ color: "rgba(20, 20, 20, 0.5)" }}>{exp.period}</p>
                  <p className="text-sm leading-relaxed mt-3" style={{ color: "rgba(20, 20, 20, 0.7)" }}>{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal panel-card p-5 md:p-6" style={{ transitionDelay: "100ms" }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-2xl border border-white/80 bg-peach/25 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-peach" />
              </div>
              <div>
                <h3 className="text-lg font-bold" style={{ color: "rgb(20, 20, 20)" }}>Education</h3>
                <p className="text-xs uppercase tracking-[0.2em]" style={{ color: "rgba(20, 20, 20, 0.5)" }}>Formal training</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/70 bg-white/80 p-4 mb-4">
              <h4 className="font-semibold" style={{ color: "rgb(20, 20, 20)" }}>{education.degree}</h4>
              <p className="text-peach text-sm mt-1">{education.institution}</p>
              <p className="text-[11px] uppercase tracking-[0.18em] mt-1" style={{ color: "rgba(20, 20, 20, 0.5)" }}>{education.period}</p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm" style={{ color: "rgba(20, 20, 20, 0.6)" }}>CGPA</span>
                <span className="chip">
                  <ProtectedData value={education.cgpa} masked="•.••" />
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl border border-white/80 bg-cream/30 flex items-center justify-center">
                <Award className="w-4 h-4 text-black" />
              </div>
              <h4 className="font-semibold" style={{ color: "rgb(20, 20, 20)" }}>Certifications</h4>
            </div>

            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span key={cert} className="chip">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
