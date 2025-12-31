import { useState, useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import ProtectedData from "./ProtectedData";
import { useAuth } from "@/context/AuthContext";

const Hero = () => {
  const { isAuthorized } = useAuth();
  const [displayedLines, setDisplayedLines] = useState<number>(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const terminalLines = [
    { type: "command", text: "$ whoami" },
    { type: "output", text: "hareesh_ragavendra" },
    { type: "command", text: "$ cat role.txt" },
    { type: "output", text: "Android Developer & Full-Stack Engineer" },
    { type: "command", text: "$ cat about.txt" },
    { type: "output", text: "Passionate about building modern Android apps with" },
    { type: "highlight", text: "Kotlin, Jetpack Compose & Django REST Framework" },
    { type: "command", text: "$ echo $STATUS" },
    { type: "success", text: "✓ Available for opportunities" },
  ];

  useEffect(() => {
    if (displayedLines < terminalLines.length) {
      const line = terminalLines[displayedLines];
      const delay = line.type === "command" ? 800 : 400;
      
      const timer = setTimeout(() => {
        setDisplayedLines(prev => prev + 1);
      }, delay);
      
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [displayedLines]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
      {/* Scanlines overlay */}
      <div className="absolute inset-0 scanlines opacity-30 z-10" />
      
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container relative z-20 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Terminal Window */}
          <div className="rounded-lg border border-[#00ff00]/30 bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,255,0,0.1)] overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#111] border-b border-[#00ff00]/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27ca40]" />
              </div>
              <span className="ml-4 text-[#606060] text-sm font-mono">hareesh@portfolio ~ </span>
            </div>

            {/* Terminal Body */}
            <div className="p-6 font-mono text-sm md:text-base min-h-[400px]">
              {terminalLines.slice(0, displayedLines).map((line, idx) => (
                <div key={idx} className="mb-2">
                  {line.type === "command" && (
                    <div className="flex items-center gap-2">
                      <span className="terminal-cyan">❯</span>
                      <span className="terminal-text">{line.text}</span>
                    </div>
                  )}
                  {line.type === "output" && (
                    <div className="pl-4 terminal-white">{line.text}</div>
                  )}
                  {line.type === "highlight" && (
                    <div className="pl-4 terminal-yellow">{line.text}</div>
                  )}
                  {line.type === "success" && (
                    <div className="pl-4 terminal-text">{line.text}</div>
                  )}
                </div>
              ))}
              
              {/* Blinking cursor */}
              {isTyping && (
                <div className="flex items-center gap-2">
                  <span className="terminal-cyan">❯</span>
                  <span className="w-2 h-5 bg-[#00ff00] cursor-blink" />
                </div>
              )}

              {/* After typing complete - show interactive section */}
              {!isTyping && (
                <div className="mt-8 pt-6 border-t border-[#00ff00]/20">
                  {/* Location */}
                  <div className="mb-4">
                    <span className="terminal-dim">$ cat location.txt</span>
                    <div className="pl-4 mt-1">
                      <ProtectedData 
                        value="Chennai, Tamil Nadu, India" 
                        masked="[REDACTED], India" 
                        className="terminal-white"
                      />
                    </div>
                  </div>

                  {/* Links */}
                  <div className="mb-6">
                    <span className="terminal-dim">$ ls -la ./links/</span>
                    <div className="pl-4 mt-2 space-y-1">
                      <a 
                        href="https://github.com/hareesh08" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 terminal-cyan hover:terminal-text transition-colors group"
                      >
                        <span className="terminal-dim">drwxr-xr-x</span>
                        <Github className="w-4 h-4" />
                        <span>github.com/hareesh08</span>
                        <span className="terminal-dim group-hover:terminal-text">→</span>
                      </a>
                      <a 
                        href="https://www.linkedin.com/in/hareesh-d-50147727b" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 terminal-cyan hover:terminal-text transition-colors group"
                      >
                        <span className="terminal-dim">drwxr-xr-x</span>
                        <Linkedin className="w-4 h-4" />
                        <span>linkedin.com/in/hareesh</span>
                        <span className="terminal-dim group-hover:terminal-text">→</span>
                      </a>
                      <a 
                        href="mailto:hareeshworksoffcial@gmail.com"
                        className="flex items-center gap-3 terminal-cyan hover:terminal-text transition-colors group"
                      >
                        <span className="terminal-dim">-rw-r--r--</span>
                        <Mail className="w-4 h-4" />
                        <span>hareeshworksoffcial@gmail.com</span>
                        <span className="terminal-dim group-hover:terminal-text">→</span>
                      </a>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href="mailto:hareeshworksoffcial@gmail.com"
                      className="px-4 py-2 border border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00] hover:text-[#0a0a0a] transition-all font-mono text-sm"
                    >
                      ./contact.sh
                    </a>
                    <a 
                      href="#projects"
                      className="px-4 py-2 border border-[#00ffff] text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] transition-all font-mono text-sm"
                    >
                      ./view_projects.sh
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-8">
            <div className="text-[#00ff00]/50 text-sm font-mono animate-pulse">
              ↓ scroll for more ↓
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
