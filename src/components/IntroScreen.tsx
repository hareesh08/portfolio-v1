import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const getPersonalizedQuotes = (name: string) => [
  `${name}, your potential is limitless.`,
  `Dream big, ${name}. Start today.`,
  `${name}, you're capable of amazing things.`,
  `The best version of ${name} is yet to come.`,
  `${name}, make today count.`,
  `Your journey starts now, ${name}.`,
];

const fallbackFacts = [
  "The first computer programmer was Ada Lovelace in 1843.",
  "The first 1GB hard drive weighed 550 pounds.",
  "The first website is still online at info.cern.ch.",
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
};

const getISTTime = () => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + (istOffset + now.getTimezoneOffset() * 60 * 1000));
  return istTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
};

type Phase = "askName" | "welcome" | "motivation" | "facts" | "ready" | "exit";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [userName, setUserName] = useState("");
  const [phase, setPhase] = useState<Phase>("askName");
  const [fact, setFact] = useState("");
  const [currentTime, setCurrentTime] = useState(getISTTime());
  const [textVisible, setTextVisible] = useState(false);
  const [motivationIndex, setMotivationIndex] = useState(0);
  const [personalizedQuotes, setPersonalizedQuotes] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleComplete = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    if (phase === "askName" && inputRef.current) inputRef.current.focus();
  }, [phase]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(getISTTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
        if (res.ok) {
          const data = await res.json();
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
      const quotes = getPersonalizedQuotes(userName.trim());
      const shuffled = quotes.sort(() => Math.random() - 0.5).slice(0, 3);
      setPersonalizedQuotes(shuffled);
      setPhase("welcome");
      setTextVisible(true);
    }
  };

  useEffect(() => {
    if (phase === "welcome") {
      const timer = setTimeout(() => {
        setTextVisible(false);
        setTimeout(() => { setPhase("motivation"); setTextVisible(true); }, 600);
      }, 2500);
      return () => clearTimeout(timer);
    }
    if (phase === "motivation") {
      const timer = setTimeout(() => {
        if (motivationIndex < personalizedQuotes.length - 1) {
          setTextVisible(false);
          setTimeout(() => { setMotivationIndex(prev => prev + 1); setTextVisible(true); }, 500);
        } else {
          setTextVisible(false);
          setTimeout(() => { setPhase("facts"); setTextVisible(true); }, 600);
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
    if (phase === "facts") {
      const timer = setTimeout(() => {
        setTextVisible(false);
        setTimeout(() => { setPhase("ready"); setTextVisible(true); }, 600);
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (phase === "ready") {
      const timer = setTimeout(() => {
        setPhase("exit");
        setTimeout(handleComplete, 1000);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [phase, motivationIndex, personalizedQuotes.length, handleComplete]);

  return (
    <div className={`fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black transition-all duration-1000 ${
      phase === "exit" ? "opacity-0 scale-105" : "opacity-100"
    }`}>
      {/* Warm ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl transition-all duration-1000 ${
            phase === "askName" ? "bg-white/[0.02]" : "bg-amber-500/[0.03]"
          }`} 
        />
        {phase !== "askName" && (
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-orange-500/[0.02] rounded-full blur-3xl animate-pulse" />
        )}
      </div>

      {/* Time - Top */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <p className={`text-4xl md:text-5xl font-extralight tracking-[0.2em] font-mono transition-colors duration-700 ${
          phase === "askName" ? "text-white/40" : "text-amber-500/40"
        }`}>
          {currentTime}
        </p>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-2xl mx-auto text-center min-h-[300px]">
        
        {/* Ask Name */}
        {phase === "askName" && (
          <div className="space-y-10" style={{ animation: "fadeInUp 0.8s ease-out" }}>
            <div>
              <div className="inline-flex items-center gap-2 text-amber-500/60 text-xs uppercase tracking-[0.4em] mb-6">
                <Sparkles className="w-3 h-3" />
                <span>Welcome</span>
                <Sparkles className="w-3 h-3" />
              </div>
              <h2 className="text-white text-3xl md:text-5xl font-light tracking-wide">
                {getGreeting()}
              </h2>
            </div>
            
            <div className="space-y-8">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                  placeholder="What's your name?"
                  className="w-72 md:w-96 bg-transparent border-b-2 border-white/10 focus:border-amber-500/50 text-white text-center text-2xl font-light py-4 outline-none transition-all duration-300 placeholder:text-white/20"
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-focus-within:w-full" />
              </div>
              
              <button
                onClick={handleNameSubmit}
                disabled={!userName.trim()}
                className={`group inline-flex items-center gap-3 px-8 py-3 rounded-full transition-all duration-300 ${
                  userName.trim() 
                    ? "bg-amber-500/10 border border-amber-500/30 text-amber-500 hover:bg-amber-500/20 hover:border-amber-500/50" 
                    : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
                }`}
              >
                <span className="text-sm uppercase tracking-[0.2em]">Continue</span>
                <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${userName.trim() ? "group-hover:translate-x-1" : ""}`} />
              </button>
            </div>
          </div>
        )}

        {/* Welcome */}
        {phase === "welcome" && (
          <div 
            className={`transition-all duration-700 ease-out ${textVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}`}
          >
            <p className="text-amber-500/60 text-xs uppercase tracking-[0.4em] mb-6">Hello there</p>
            <h1 className="text-5xl md:text-7xl font-light tracking-wide mb-4">
              <span className="text-white">{userName}</span>
            </h1>
            <p className="text-white/40 text-lg font-light">Welcome to my portfolio</p>
          </div>
        )}

        {/* Motivation - Personalized */}
        {phase === "motivation" && personalizedQuotes[motivationIndex] && (
          <div 
            className={`transition-all duration-700 ease-out ${textVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="mb-6">
              <Sparkles className="w-6 h-6 text-amber-500/50 mx-auto" />
            </div>
            <p className="text-2xl md:text-3xl font-light leading-relaxed">
              <span className="text-amber-500">{personalizedQuotes[motivationIndex].split(userName)[0]}</span>
              <span className="text-white font-medium">{userName}</span>
              <span className="text-amber-500">{personalizedQuotes[motivationIndex].split(userName)[1]}</span>
            </p>
            <div className="flex justify-center gap-2 mt-8">
              {personalizedQuotes.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    idx === motivationIndex ? "w-8 bg-amber-500" : "w-2 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Facts */}
        {phase === "facts" && fact && (
          <div 
            className={`transition-all duration-700 ease-out ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <p className="text-amber-500/50 text-xs uppercase tracking-[0.4em] mb-6">Did you know</p>
            <p className="text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-md">
              {fact}
            </p>
          </div>
        )}

        {/* Ready */}
        {phase === "ready" && (
          <div 
            className={`transition-all duration-700 ease-out ${textVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
            <p className="text-white/40 text-sm mb-4">Let's explore together</p>
            <h1 className="text-3xl md:text-4xl font-light">
              <span className="text-white">Ready, </span>
              <span className="text-amber-500">{userName}</span>
              <span className="text-white">?</span>
            </h1>
            <div className="mt-8">
              <div className="w-24 h-1 mx-auto bg-gradient-to-r from-transparent via-amber-500/50 to-transparent rounded-full" />
            </div>
          </div>
        )}
      </div>

      {/* Skip */}
      {phase !== "askName" && phase !== "exit" && (
        <button
          onClick={() => { setPhase("exit"); setTimeout(handleComplete, 800); }}
          className="absolute bottom-8 right-8 text-white/20 hover:text-amber-500/50 text-xs uppercase tracking-[0.3em] transition-colors duration-300"
        >
          Skip
        </button>
      )}

      {/* Bottom accent */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className={`w-12 h-0.5 rounded-full transition-colors duration-700 ${
          phase === "askName" ? "bg-white/10" : "bg-amber-500/20"
        }`} />
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;
