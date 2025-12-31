import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail } from "lucide-react";
import ProtectedData from "./ProtectedData";
import { useAuth } from "@/context/AuthContext";

const Contact = () => {
  const { isAuthorized } = useAuth();
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cmd = command.toLowerCase().trim();
    let response = "";

    if (cmd === "help") {
      response = `Available commands:
  email    - Show email address
  phone    - Show phone number
  location - Show location
  social   - Show social links
  clear    - Clear terminal
  help     - Show this help`;
    } else if (cmd === "email") {
      response = isAuthorized 
        ? "hareeshworksoffcial@gmail.com" 
        : "[PROTECTED] Enter password to reveal";
    } else if (cmd === "phone") {
      response = isAuthorized 
        ? "+91 80727 03652" 
        : "[PROTECTED] Enter password to reveal";
    } else if (cmd === "location") {
      response = isAuthorized 
        ? "Chennai, Tamil Nadu, India" 
        : "[PROTECTED] Enter password to reveal";
    } else if (cmd === "social") {
      response = `GitHub:   https://github.com/hareesh08
LinkedIn: https://linkedin.com/in/hareesh-d-50147727b`;
    } else if (cmd === "clear") {
      setOutput([]);
      setCommand("");
      return;
    } else if (cmd === "") {
      setCommand("");
      return;
    } else {
      response = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setOutput([...output, `❯ ${command}`, response]);
    setCommand("");
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
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
              <span className="ml-4 text-[#606060] text-sm font-mono">contact.sh</span>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm">
              {/* Header */}
              <div className="mb-6">
                <span className="terminal-cyan">❯</span>
                <span className="terminal-text ml-2">$ ./contact --interactive</span>
              </div>

              <div className="terminal-dim mb-6 text-xs">
                ╔══════════════════════════════════════════════════════╗
                <br />
                ║  Interactive Contact Terminal v1.0.0                 ║
                <br />
                ║  Type 'help' for available commands                  ║
                <br />
                ╚══════════════════════════════════════════════════════╝
              </div>

              {/* Contact Info Display */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 terminal-cyan" />
                    <span className="terminal-dim">email:</span>
                    <ProtectedData 
                      value="hareeshworksoffcial@gmail.com" 
                      masked="h•••••@gmail.com"
                      className="terminal-text"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 terminal-cyan text-center">📱</span>
                    <span className="terminal-dim">phone:</span>
                    <ProtectedData 
                      value="+91 80727 03652" 
                      masked="+91 •••••••••"
                      className="terminal-text"
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 terminal-cyan text-center">📍</span>
                    <span className="terminal-dim">location:</span>
                    <ProtectedData 
                      value="Chennai, Tamil Nadu, India" 
                      masked="[REDACTED], India"
                      className="terminal-text"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <a 
                    href="https://github.com/hareesh08"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 terminal-cyan hover:terminal-text transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span className="terminal-dim">github:</span>
                    <span>hareesh08</span>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/hareesh-d-50147727b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 terminal-cyan hover:terminal-text transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="terminal-dim">linkedin:</span>
                    <span>hareesh-d</span>
                  </a>
                </div>
              </div>

              {/* Interactive Terminal */}
              <div className="border-t border-[#00ff00]/20 pt-6">
                <div className="bg-[#111] rounded border border-[#00ff00]/10 p-4 min-h-[150px]">
                  {/* Output history */}
                  <div className="space-y-1 mb-4">
                    {output.map((line, idx) => (
                      <div 
                        key={idx} 
                        className={line.startsWith("❯") ? "terminal-cyan" : "terminal-white whitespace-pre-wrap"}
                      >
                        {line}
                      </div>
                    ))}
                  </div>

                  {/* Input */}
                  <form onSubmit={handleCommand} className="flex items-center gap-2">
                    <span className="terminal-cyan">❯</span>
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      placeholder="type 'help' for commands..."
                      className="flex-1 bg-transparent terminal-text outline-none placeholder:terminal-dim"
                      autoComplete="off"
                    />
                    <button type="submit" className="terminal-cyan hover:terminal-text transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-[#00ff00]/20">
                <div className="mb-4">
                  <span className="terminal-cyan">❯</span>
                  <span className="terminal-text ml-2">$ echo "Let's connect!"</span>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:hareeshworksoffcial@gmail.com"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-[#0a0a0a] transition-all text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send Email</span>
                  </a>
                  <a
                    href="https://github.com/hareesh08"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] transition-all text-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12 font-mono"
          >
            <div className="terminal-dim text-xs">
              <span>© 2025 Hareesh Ragavendra</span>
              <span className="mx-2">•</span>
              <span>Built with React + TypeScript</span>
            </div>
            <div className="terminal-dim text-xs mt-1">
              <span className="cursor-blink">█</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
