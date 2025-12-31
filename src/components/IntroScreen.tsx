import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, Code2 } from "lucide-react";

const fallbackFacts = [
  "The first computer programmer was Ada Lovelace in 1843.",
  "The first 1GB hard drive weighed 550 pounds.",
  "The first website is still online at info.cern.ch.",
];

const allMotivationalQuotes = [
  "Every expert was once a beginner.",
  "Your potential is limitless.",
  "Great things take time. Keep going.",
  "Dream big. Start small. Act now.",
  "Success is built one step at a time.",
  "The best time to start is today.",
  "Believe in yourself and create magic.",
  "Your only limit is your mind.",
  "Turn your obstacles into opportunities.",
  "Progress, not perfection.",
  "Stay curious. Stay hungry.",
  "Make today count.",
];

const getRandomQuotes = () => {
  const shuffled = [...allMotivationalQuotes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
};

interface IntroScreenProps {
  onComplete: () => void;
}

const getISTTime = () => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + (istOffset + now.getTimezoneOffset() * 60 * 1000));
  return istTime.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

const getGreeting = () => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + (istOffset + now.getTimezoneOffset() * 60 * 1000));
  const hour = istTime.getHours();
  
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
};

type Phase = "askName" | "welcome" | "motivation" | "loading" | "facts" | "ready" | "exit";

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [userName, setUserName] = useState("");
  const [phase, setPhase] = useState<Phase>("askName");
  const [fact, setFact] = useState("");
  const [currentTime, setCurrentTime] = useState(getISTTime());
  const [textVisible, setTextVisible] = useState(false);
  const [motivationIndex, setMotivationIndex] = useState(0);
  const [motivationalQuotes] = useState(getRandomQuotes);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (phase === "askName" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [phase]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(getISTTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const response = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
        if (response.ok) {
          const data = await response.json();
          if (data.text && data.text.length < 150) {
            setFact(data.text);
            return;
          }
        }
        setFact(fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)]);
      } catch {
        setFact(fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)]);
      }
    };
    fetchFact();
  }, []);

  const handleNameSubmit = () => {
    if (userName.trim()) {
      setPhase("welcome");
      setTextVisible(true);
    }
  };

  useEffect(() => {
    if (phase === "welcome") {
      const timer = setTimeout(() => {
        setTextVisible(false);
        setTimeout(() => {
          setPhase("motivation");
          setTextVisible(true);
        }, 500);
      }, 2500);
      return () => clearTimeout(timer);
    }

    if (phase === "motivation") {
      const timer = setTimeout(() => {
        if (motivationIndex < motivationalQuotes.length - 1) {
          setTextVisible(false);
          setTimeout(() => {
            setMotivationIndex(prev => prev + 1);
            setTextVisible(true);
          }, 400);
        } else {
          setTextVisible(false);
          setTimeout(() => {
            setPhase("loading");
          }, 500);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (phase === "loading") {
      const timer = setTimeout(() => {
        setPhase("facts");
        setTextVisible(true);
      }, 800);
      return () => clearTimeout(timer);
    }

    if (phase === "facts") {
      const timer = setTimeout(() => {
        setTextVisible(false);
        setTimeout(() => {
          setPhase("ready");
          setTextVisible(true);
        }, 500);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (phase === "ready") {
      const timer = setTimeout(() => {
        setPhase("exit");
        setTimeout(handleComplete, 1000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [phase, motivationIndex, motivationalQuotes.length, handleComplete]);

  return (
    <div
      className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-[#1e1e2e] transition-all duration-1000 ${
        phase === "exit" ? "opacity-0 scale-105" : "opacity-100 scale-100"
      }`}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      {/* Time display */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-[#a9b7c6]/60 text-3xl md:text-4xl font-light tracking-wider font-mono">
          {currentTime}
        </p>
        <p className="text-[#606060] text-xs tracking-[0.3em] uppercase mt-1">IST</p>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-16 max-w-3xl mx-auto text-center min-h-[300px]">
        
        {/* Ask Name Phase */}
        {phase === "askName" && (
          <div className="animate-fade-in space-y-8">
            <div className="space-y-2">
              <Code2 className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h2 className="text-[#a9b7c6] text-2xl md:text-4xl font-light tracking-wide">
                {getGreeting()}!
              </h2>
              <p className="text-[#606060] text-base md:text-lg">
                What should I call you?
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <input
                ref={inputRef}
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder="Enter your name..."
                className="w-64 md:w-80 bg-[#2b2b2b] border border-[#3c3f41] focus:border-blue-500 text-[#a9b7c6] text-center text-xl md:text-2xl font-mono py-3 px-4 rounded-lg outline-none transition-all placeholder:text-[#606060]"
                autoComplete="off"
              />
              
              <button
                onClick={handleNameSubmit}
                disabled={!userName.trim()}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm tracking-wider transition-all duration-300 font-mono ${
                  userName.trim() 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "bg-[#3c3f41] text-[#606060] cursor-not-allowed"
                }`}
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Welcome Phase */}
        {phase === "welcome" && (
          <div className={`transition-all duration-700 ${
            textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <p className="text-[#606060] text-sm tracking-[0.3em] uppercase mb-4 font-mono">Welcome</p>
            <h1 className="text-[#a9b7c6] text-4xl md:text-6xl font-light tracking-wide mb-4">
              Hello, <span className="text-blue-400">{userName}</span>
            </h1>
            <p className="text-[#808080] text-lg">
              Great to have you here
            </p>
          </div>
        )}

        {/* Motivation Phase */}
        {phase === "motivation" && (
          <div className={`transition-all duration-500 ${
            textVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
          }`}>
            <p className="text-[#cc7832] text-xl md:text-3xl font-light leading-relaxed tracking-wide italic font-mono">
              "{motivationalQuotes[motivationIndex]}"
            </p>
          </div>
        )}

        {/* Loading Phase */}
        {phase === "loading" && (
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
            <p className="text-[#606060] text-sm tracking-wider font-mono">Loading workspace...</p>
          </div>
        )}

        {/* Facts Phase */}
        {phase === "facts" && fact && (
          <div className="space-y-6">
            <p className="text-[#6a8759] text-xs tracking-[0.2em] uppercase font-mono">// Did you know?</p>
            
            <div className={`transition-all duration-500 max-w-2xl ${
              textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <p className="text-[#a9b7c6] text-base md:text-lg font-light leading-relaxed">
                {fact}
              </p>
            </div>
          </div>
        )}

        {/* Ready Phase */}
        {phase === "ready" && (
          <div className={`transition-all duration-700 ${
            textVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}>
            <p className="text-[#6a8759] text-sm tracking-[0.3em] uppercase mb-6 font-mono">// Ready</p>
            <h1 className="text-[#a9b7c6] text-3xl md:text-5xl font-light tracking-wide mb-3">
              Opening <span className="text-blue-400">{userName}'s</span> Workspace
            </h1>
            <p className="text-[#808080] text-lg">
              Portfolio of <span className="text-[#ffc66d]">Hareesh Ragavendra</span>
            </p>
          </div>
        )}
      </div>

      {/* Skip button */}
      {phase !== "askName" && phase !== "exit" && (
        <button
          onClick={() => {
            setPhase("exit");
            setTimeout(handleComplete, 800);
          }}
          className="absolute bottom-8 right-8 text-[#606060] hover:text-[#a9b7c6] text-xs tracking-[0.2em] uppercase transition-colors font-mono"
        >
          Skip →
        </button>
      )}
    </div>
  );
};

export default IntroScreen;
