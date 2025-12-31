import { Mail, Phone, MapPin, Github, Linkedin, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { motion, Variants } from "framer-motion";
import ProtectedData from "./ProtectedData";
import { useAuth } from "@/context/AuthContext";

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

const Contact = () => {
  const { isAuthorized } = useAuth();
  
  return (
    <section id="contact" className="py-24 bg-gradient-hero relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="container px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-lg font-semibold tracking-wide uppercase mb-3">Contact</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Connect</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Interested in collaborating or have a project in mind? Feel free to reach out!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <motion.div
                variants={itemVariants}
                className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  {isAuthorized ? (
                    <a href="mailto:dhareesh205@gmail.com" className="font-semibold group-hover:text-primary transition-colors">
                      Dhareesh205@gmail.com
                    </a>
                  ) : (
                    <ProtectedData 
                      value="Dhareesh205@gmail.com" 
                      masked="d•••••@gmail.com"
                      className="font-semibold"
                    />
                  )}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  {isAuthorized ? (
                    <a href="tel:+918072703652" className="font-semibold group-hover:text-primary transition-colors">
                      +91 80727 03652
                    </a>
                  ) : (
                    <ProtectedData 
                      value="+91 80727 03652" 
                      masked="+91 •••••••••"
                      className="font-semibold"
                    />
                  )}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-default"
                whileHover={{ scale: 1.03, x: 5 }}
              >
                <motion.div 
                  className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <MapPin className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold group-hover:text-primary transition-colors">Chennai, Tamil Nadu, India</p>
                </div>
              </motion.div>

              <motion.a
                variants={itemVariants}
                href="https://hareeshworks.in"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                whileHover={{ scale: 1.03, x: 5 }}
              >
                <motion.div 
                  className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  <Globe className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <p className="text-sm text-muted-foreground">Website</p>
                  <p className="font-semibold group-hover:text-primary transition-colors">hareeshworks.in</p>
                </div>
              </motion.a>
            </motion.div>

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative p-8 rounded-xl bg-gradient-card border border-border flex flex-col justify-center items-center text-center overflow-hidden hover:border-primary/50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <motion.div 
                className="relative w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/15 transition-colors"
                whileHover={{ scale: 1.1, rotate: 10 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-3xl">🚀</span>
              </motion.div>
              <h3 className="relative text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Ready to Build Something?</h3>
              <p className="relative text-muted-foreground text-sm mb-6 leading-relaxed group-hover:text-muted-foreground/80 transition-colors">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <motion.div className="relative w-full" whileHover={{ scale: 1.05 }}>
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary w-full transition-all duration-300"
                  asChild
                >
                  <a href="mailto:Dhareesh205@gmail.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </a>
                </Button>
              </motion.div>

              <div className="relative flex items-center gap-4 mt-6 pt-6 border-t border-border w-full justify-center">
                <motion.a
                  href="https://github.com/hareesh08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 hover:bg-secondary transition-all duration-300 group/social"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Github className="w-5 h-5 text-muted-foreground group-hover/social:text-primary transition-colors" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/hareesh-d-50147727b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-secondary/50 border border-border hover:border-primary/50 hover:bg-secondary transition-all duration-300 group/social"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Linkedin className="w-5 h-5 text-muted-foreground group-hover/social:text-primary transition-colors" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
