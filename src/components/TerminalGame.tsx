import { useState, useEffect, useCallback, useRef } from "react";
import { Terminal, X, ChevronRight } from "lucide-react";

const commands = {
  help: {
    description: "Show available commands",
    execute: () => [
      { type: "output", text: "Available commands:" },
      { type: "list", items: ["help - Show this message", "about - About me", "skills - List skills", "projects - View projects", "contact - Get contact info", "clear - Clear terminal", "exit - Close terminal"] },
    ],
  },
  about: {
    description: "Learn about me",
    execute: () => [
      { type: "output", text: "" },
      { type: "output", text: "Hareesh Ragavendra" },
      { type: "highlight", text: "Android Developer & Full-Stack Engineer" },
      { type: "output", text: "" },
      { type: "output", text: "I build mobile apps with Kotlin/Jetpack Compose and" },
      { type: "output", text: "backend services with Django/FastAPI." },
      { type: "output", text: "" },
      { type: "output", text: "Based in Chennai, Tamil Nadu, India" },
    ],
  },
  skills: {
    description: "List technical skills",
    execute: () => [
      { type: "output", text: "" },
      { type: "output", text: "Languages:" },
      { type: "list", items: ["Kotlin", "Java", "Python", "C#", "SQL"] },
      { type: "output", text: "" },
      { type: "output", text: "Android:" },
      { type: "list", items: ["Jetpack Compose", "MVVM", "Retrofit", "Room", "Coroutines"] },
      { type: "output", text: "" },
      { type: "output", text: "Backend:" },
      { type: "list", items: ["Django REST", "FastAPI", "RESTful APIs", "WebSockets"] },
      { type: "output", text: "" },
      { type: "output", text: "Tools:" },
      { type: "list", items: ["Git", "Docker", "Android Studio", "Azure"] },
    ],
  },
  projects: {
    description: "View featured projects",
    execute: () => [
      { type: "output", text: "" },
      { type: "output", text: "Featured Projects:" },
      { type: "output", text: "" },
      { type: "project", name: "Service Management App", desc: "Full-stack Android app with JWT auth", tech: "Kotlin, Jetpack Compose, Django REST" },
      { type: "project", name: "Offline License System", desc: "AES-256 encrypted licensing solution", tech: "C#, .NET 8, Native AOT" },
      { type: "project", name: "ERP WebView Android", desc: "Android WebView with REST API integration", tech: "Kotlin, Retrofit, OkHttp" },
      { type: "output", text: "" },
      { type: "output", text: "View more at: github.com/hareesh08" },
    ],
  },
  contact: {
    description: "Get contact information",
    execute: () => [
      { type: "output", text: "" },
      { type: "output", text: "Email: hareeshworksofficial@gmail.com" },
      { type: "output", text: "GitHub: github.com/hareesh08" },
      { type: "output", text: "LinkedIn: linkedin.com/in/hareesh-d-50147727b" },
      { type: "output", text: "" },
      { type: "highlight", text: "Available for work" },
    ],
  },
  clear: {
    description: "Clear terminal",
    execute: () => null,
  },
  exit: {
    description: "Close terminal",
    execute: () => ({ close: true }),
  },
};

type OutputLine = {
  type: "input" | "output" | "highlight" | "list" | "project" | "error";
  text?: string;
  items?: string[];
  name?: string;
  desc?: string;
  tech?: string;
};

interface TerminalGameProps {
  onClose: () => void;
}

const TerminalGame = ({ onClose }: TerminalGameProps) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<OutputLine[]>([
    { type: "output", text: "Welcome to HareeshOS v1.0" },
    { type: "output", text: "Type 'help' for available commands" },
    { type: "output", text: "" },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    outputRef.current?.scrollTo(0, outputRef.current.scrollHeight);
  }, [history]);

  const handleCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const output: OutputLine[] = [{ type: "input", text: `> ${cmd}` }];

    if (trimmed === "") {
      output.push({ type: "output", text: "" });
    } else if (commands[trimmed as keyof typeof commands]) {
      const result = commands[trimmed as keyof typeof commands].execute();
      if (result === null) {
        setHistory([]);
        return;
      }
      if (Array.isArray(result) && result.length === 1 && (result[0] as any).close) {
        onClose();
        return;
      }
      output.push(...(result as OutputLine[]));
    } else {
      output.push({ type: "error", text: `Command not found: ${trimmed}. Type 'help' for available commands.` });
    }

    setHistory(prev => [...prev, ...output]);
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);
  }, [onClose]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm px-4">
      <div 
        className="w-full max-w-2xl glass-card rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-emerald-500/10 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span className="text-white/80 text-sm font-mono">HareeshOS</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Output */}
        <div 
          ref={outputRef}
          className="h-80 overflow-y-auto p-4 font-mono text-sm"
        >
          {history.map((line, i) => {
            if (line.type === "input") {
              return <p key={i} className="text-emerald-400 mb-1">{line.text}</p>;
            }
            if (line.type === "output") {
              return <p key={i} className="text-white/70 mb-1">{line.text}</p>;
            }
            if (line.type === "highlight") {
              return <p key={i} className="text-emerald-400 mb-1">{line.text}</p>;
            }
            if (line.type === "error") {
              return <p key={i} className="text-red-400 mb-1">{line.text}</p>;
            }
            if (line.type === "list" && line.items) {
              return (
                <div key={i} className="mb-1 ml-4">
                  {line.items.map((item, j) => (
                    <p key={j} className="text-white/50">
                      <ChevronRight className="inline w-3 h-3 mr-2 text-emerald-500/50" />
                      {item}
                    </p>
                  ))}
                </div>
              );
            }
            if (line.type === "project") {
              return (
                <div key={i} className="mb-3 ml-4 border-l-2 border-emerald-500/30 pl-3">
                  <p className="text-emerald-400">{line.name}</p>
                  <p className="text-white/50 text-xs">{line.desc}</p>
                  <p className="text-white/30 text-xs">{line.tech}</p>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 bg-black/30 border-t border-white/10">
          <span className="text-emerald-500 font-mono text-sm">{">"}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command..."
            className="flex-1 bg-transparent text-white/90 font-mono text-sm outline-none placeholder:text-white/30"
            autoComplete="off"
            autoCapitalize="off"
          />
        </div>
      </div>

      <style>{`
        @keyframes terminalPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default TerminalGame;

let keystrokeBuffer = "";
const secretSequence = "help";

const TerminalGameLauncher = ({ children }: { children: React.ReactNode }) => {
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      keystrokeBuffer += e.key.toLowerCase();
      if (keystrokeBuffer.length > secretSequence.length) {
        keystrokeBuffer = keystrokeBuffer.slice(-secretSequence.length);
      }

      if (keystrokeBuffer === secretSequence) {
        setShowTerminal(true);
        keystrokeBuffer = "";
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, []);

  return (
    <>
      {children}
      {showTerminal && <TerminalGame onClose={() => setShowTerminal(false)} />}
    </>
  );
};

export { TerminalGameLauncher };