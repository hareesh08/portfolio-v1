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

type CommandResult = ReturnType<(typeof commands)[keyof typeof commands]["execute"]>;

const isCloseResult = (result: CommandResult): result is { close: true } => {
  return typeof result === "object" && result !== null && "close" in result;
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
  const dialogRef = useRef<HTMLDivElement>(null);

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
      if (isCloseResult(result)) {
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

  const handleDialogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md px-4"
      style={{ background: "rgba(255, 230, 220, 0.45)" }}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-2xl glass-card rounded-2xl overflow-hidden"
        role="dialog"
        aria-label="Terminal"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleDialogKeyDown}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-mint/25 border-b border-white/80">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-mint" aria-hidden="true" />
            <span className="text-sm font-mono" style={{ color: "rgb(20, 20, 20)" }}>HareeshOS</span>
          </div>
          <button
            onClick={onClose}
            className="hover:text-pink transition-colors"
            style={{ color: "rgba(20, 20, 20, 0.55)" }}
            aria-label="Close terminal"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Output */}
        <div 
          ref={outputRef}
          className="h-80 overflow-y-auto p-4 font-mono text-sm"
        >
          {history.map((line, i) => {
            if (line.type === "input") {
              return <p key={i} className="text-mint mb-1">{line.text}</p>;
            }
            if (line.type === "output") {
              return <p key={i} className="mb-1" style={{ color: "rgba(20, 20, 20, 0.7)" }}>{line.text}</p>;
            }
            if (line.type === "highlight") {
              return <p key={i} className="text-peach mb-1 font-semibold">{line.text}</p>;
            }
            if (line.type === "error") {
              return <p key={i} className="text-pink mb-1">{line.text}</p>;
            }
            if (line.type === "list" && line.items) {
              return (
                <div key={i} className="mb-1 ml-4">
                  {line.items.map((item, j) => (
                    <p key={j} style={{ color: "rgba(20, 20, 20, 0.6)" }}>
                      <ChevronRight className="inline w-3 h-3 mr-2 text-mint/70" />
                      {item}
                    </p>
                  ))}
                </div>
              );
            }
            if (line.type === "project") {
              return (
                <div key={i} className="mb-3 ml-4 border-l-2 border-mint/40 pl-3">
                  <p className="text-peach font-semibold">{line.name}</p>
                  <p className="text-xs" style={{ color: "rgba(20, 20, 20, 0.6)" }}>{line.desc}</p>
                  <p className="text-xs" style={{ color: "rgba(20, 20, 20, 0.45)" }}>{line.tech}</p>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/65 border-t border-white/80 backdrop-blur">
          <span className="text-mint font-mono text-sm" aria-hidden="true">{">"}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command..."
            className="flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-black/30"
            style={{ color: "rgb(20, 20, 20)" }}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal command input"
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

const keystrokeBuffer = { current: "" };
const secretSequence = "help";

const TerminalGameLauncher = ({ children }: { children: React.ReactNode }) => {
  const [showTerminal, setShowTerminal] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      keystrokeBuffer.current += e.key.toLowerCase();
      if (keystrokeBuffer.current.length > secretSequence.length) {
        keystrokeBuffer.current = keystrokeBuffer.current.slice(-secretSequence.length);
      }

      if (keystrokeBuffer.current === secretSequence) {
        setShowTerminal(true);
        keystrokeBuffer.current = "";
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
