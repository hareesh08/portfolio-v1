import { useState, useEffect, useCallback, useRef } from "react";
import { ArrowRight } from "lucide-react";

const getPersonalizedQuotes = (name: string) => [
  `${name}, you are made of stardust and infinite possibilities.`,
  `The universe conspired to bring you here, ${name}.`,
  `${name}, your potential stretches beyond the galaxies.`,
  `Like stars, ${name}, you were born to shine.`,
  `${name}, explore the cosmos within you.`,
  `Every great journey begins with a single step, ${name}.`,
  `${name}, you are the author of your own constellation.`,
  `Dream beyond horizons, ${name}. The universe is listening.`,
  `In this vast cosmos, ${name}, you are unique and irreplaceable.`,
  `${name}, your mind holds more connections than stars in the Milky Way.`,
];

const fallbackFacts = [
  "There are more stars in the universe than grains of sand on Earth.",
  "The Milky Way is on a collision course with Andromeda in 4 billion years.",
  "A day on Venus is longer than its year.",
  "Neutron stars can spin 600 times per second.",
  "The observable universe is 93 billion light-years in diameter.",
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good Morning";
  if (hour >= 12 && hour < 17) return "Good Afternoon";
  if (hour >= 17 && hour < 21) return "Good Evening";
  return "Good Night";
};

type Phase = "bigbang" | "askName" | "welcome" | "journey" | "motivation" | "cosmic" | "warp" | "exit";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [userName, setUserName] = useState("");
  const [phase, setPhase] = useState<Phase>("bigbang");
  const [cosmicFact, setCosmicFact] = useState("");
  const [textVisible, setTextVisible] = useState(false);
  const [motivationIndex, setMotivationIndex] = useState(0);
  const [personalizedQuotes, setPersonalizedQuotes] = useState<string[]>([]);
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);
  const [bigBangPhase, setBigBangPhase] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleComplete = useCallback(() => onComplete(), [onComplete]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 200 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 3,
    }));
    setStars(generatedStars);

    // Fetch random fact from API
    const fetchFact = async () => {
      try {
        const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
        if (res.ok) {
          const data = await res.json();
          if (data.text && data.text.length < 200) {
            setCosmicFact(data.text);
            return;
          }
        }
        setCosmicFact(fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)]);
      } catch {
        setCosmicFact(fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)]);
      }
    };
    fetchFact();
  }, []);

  useEffect(() => {
    if (phase === "bigbang") {
      const timers = [
        setTimeout(() => setBigBangPhase(1), 500),
        setTimeout(() => setBigBangPhase(2), 1500),
        setTimeout(() => setBigBangPhase(3), 2500),
        setTimeout(() => { setPhase("askName"); setTextVisible(true); }, 4000),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === "askName" && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 500);
    }
  }, [phase]);

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
        setTimeout(() => { setPhase("journey"); setTextVisible(true); }, 800);
      }, 2500);
      return () => clearTimeout(timer);
    }
    if (phase === "journey") {
      const timer = setTimeout(() => {
        setTextVisible(false);
        setTimeout(() => { setPhase("motivation"); setTextVisible(true); }, 800);
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (phase === "motivation") {
      const timer = setTimeout(() => {
        if (motivationIndex < personalizedQuotes.length - 1) {
          setTextVisible(false);
          setTimeout(() => { setMotivationIndex(prev => prev + 1); setTextVisible(true); }, 600);
        } else {
          setTextVisible(false);
          setTimeout(() => { setPhase("cosmic"); setTextVisible(true); }, 800);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (phase === "cosmic") {
      const timer = setTimeout(() => {
        setTextVisible(false);
        setTimeout(() => { setPhase("warp"); setTextVisible(true); }, 800);
      }, 3500);
      return () => clearTimeout(timer);
    }
    if (phase === "warp") {
      const timer = setTimeout(() => {
        setPhase("exit");
        setTimeout(handleComplete, 1500);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [phase, motivationIndex, personalizedQuotes.length, handleComplete]);

  return (
    <div className={`fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 ${phase === "exit" ? "opacity-0" : "opacity-100"}`}>
      <div className="absolute inset-0 bg-black">
        {phase === "bigbang" && (
          <>
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-1000 ${
              bigBangPhase === 0 ? "w-0 h-0 opacity-0" :
              bigBangPhase === 1 ? "w-4 h-4 bg-white shadow-[0_0_60px_30px_rgba(255,255,255,0.8)]" :
              bigBangPhase === 2 ? "w-32 h-32 bg-white shadow-[0_0_200px_100px_rgba(255,200,100,0.6)]" :
              "w-[300vw] h-[300vh] bg-transparent opacity-0"
            }`} />
            {bigBangPhase >= 2 && (
              <>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bigbang-ring" style={{ animationDelay: '0ms' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/30 bigbang-ring" style={{ animationDelay: '200ms' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/30 bigbang-ring" style={{ animationDelay: '400ms' }} />
              </>
            )}
            {bigBangPhase >= 2 && (
              <div className="absolute inset-0">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div key={i} className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full bigbang-particle"
                    style={{ '--angle': `${(i / 50) * 360}deg`, '--distance': `${Math.random() * 50 + 30}vw`, animationDelay: `${Math.random() * 500}ms` } as React.CSSProperties} />
                ))}
              </div>
            )}
          </>
        )}

        <div className={`absolute inset-0 transition-opacity duration-2000 ${phase !== "bigbang" && phase !== "askName" ? "opacity-100" : "opacity-0"}`}>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
          <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-indigo-900/30 via-transparent to-transparent blur-3xl" />
        </div>

        <div className={`absolute inset-0 transition-opacity duration-2000 ${phase === "bigbang" && bigBangPhase < 3 ? "opacity-0" : "opacity-100"}`}>
          {stars.map((star) => (
            <div key={star.id} className={`absolute rounded-full bg-white star-twinkle ${phase === "warp" ? "warp-star" : ""}`}
              style={{ left: `${star.x}%`, top: `${star.y}%`, width: `${star.size}px`, height: `${star.size}px`, animationDelay: `${star.delay}s` }} />
          ))}
        </div>

        {phase !== "bigbang" && phase !== "askName" && phase !== "exit" && (
          <>
            <div className="shooting-star" style={{ top: '15%', left: '5%', animationDelay: '0s' }} />
            <div className="shooting-star" style={{ top: '35%', left: '70%', animationDelay: '2.5s' }} />
            <div className="shooting-star" style={{ top: '65%', left: '20%', animationDelay: '5s' }} />
          </>
        )}

        {phase === "warp" && (
          <div className="absolute inset-0">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="warp-line" style={{ left: `${50 + (Math.random() - 0.5) * 100}%`, top: `${50 + (Math.random() - 0.5) * 100}%`, animationDelay: `${Math.random() * 0.5}s` }} />
            ))}
          </div>
        )}

        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-all duration-1000 ${
          phase === "warp" ? "w-[200vw] h-[200vh] bg-white/80" : phase === "bigbang" ? "w-0 h-0" : "w-[600px] h-[600px] bg-purple-500/5"
        }`} />
      </div>

      {phase === "bigbang" && bigBangPhase >= 1 && bigBangPhase < 3 && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <p className={`text-white/80 text-xl md:text-2xl font-extralight tracking-[0.5em] uppercase transition-opacity duration-500 ${bigBangPhase === 1 ? "opacity-100" : "opacity-0"}`}>
            In the beginning...
          </p>
        </div>
      )}

      <div className={`relative z-10 flex flex-col items-center justify-center px-6 max-w-2xl mx-auto text-center min-h-[400px] transition-opacity duration-1000 ${phase === "bigbang" ? "opacity-0" : "opacity-100"}`}>
        {phase === "askName" && (
          <div className={`space-y-10 transition-all duration-1000 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div>
              <div className="inline-flex items-center gap-3 text-purple-400/60 text-xs uppercase tracking-[0.5em] mb-8">
                <span className="w-8 h-px bg-purple-400/30" /><span>Welcome, Traveler</span><span className="w-8 h-px bg-purple-400/30" />
              </div>
              <h2 className="text-white text-4xl md:text-6xl font-extralight tracking-wide">{getGreeting()}</h2>
            </div>
            <div className="space-y-8">
              <input ref={inputRef} type="text" value={userName} onChange={(e) => setUserName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder="What shall I call you?" className="w-72 md:w-96 bg-transparent border-b border-white/20 focus:border-purple-400/60 text-white text-center text-2xl font-extralight py-4 outline-none transition-all duration-500 placeholder:text-white/20" />
              <div>
                <button onClick={handleNameSubmit} disabled={!userName.trim()}
                  className={`group inline-flex items-center gap-3 px-10 py-4 rounded-full transition-all duration-500 ${userName.trim() ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 text-white hover:from-purple-500/30 hover:to-blue-500/30" : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"}`}>
                  <span className="text-sm uppercase tracking-[0.3em]">Begin Journey</span>
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${userName.trim() ? "group-hover:translate-x-2" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        )}

        {phase === "welcome" && (
          <div className={`transition-all duration-1000 ease-out ${textVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"}`}>
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-400/20 flex items-center justify-center ring-4 ring-purple-500/10">
                <span className="text-4xl font-light text-white">{userName.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <p className="text-purple-400/60 text-xs uppercase tracking-[0.5em] mb-4">Greetings</p>
            <h1 className="text-5xl md:text-7xl font-extralight tracking-wider text-white mb-4">{userName}</h1>
            <p className="text-white/40 text-lg font-extralight">Welcome to my universe</p>
          </div>
        )}

        {phase === "journey" && (
          <div className={`transition-all duration-1000 ease-out ${textVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <div className="text-6xl mb-8 cosmic-glow">✧</div>
            <p className="text-2xl md:text-3xl font-extralight text-white/80 leading-relaxed">
              Prepare for a journey<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">through the cosmos</span>
            </p>
          </div>
        )}

        {phase === "motivation" && personalizedQuotes[motivationIndex] && (
          <div className={`transition-all duration-1000 ease-out ${textVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="mb-8 text-purple-400/40 text-4xl cosmic-glow">✦</div>
            <p className="text-xl md:text-2xl font-extralight leading-relaxed max-w-lg">
              {personalizedQuotes[motivationIndex].split(userName).map((part, idx, arr) => (
                <span key={idx}>
                  <span className="text-white/70">{part}</span>
                  {idx < arr.length - 1 && <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-light">{userName}</span>}
                </span>
              ))}
            </p>
            <div className="flex justify-center gap-3 mt-10">
              {personalizedQuotes.map((_, idx) => (
                <div key={idx} className={`rounded-full transition-all duration-500 ${idx === motivationIndex ? "w-10 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500" : "w-1.5 h-1.5 bg-white/20"}`} />
              ))}
            </div>
          </div>
        )}

        {phase === "cosmic" && (
          <div className={`transition-all duration-1000 ease-out ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="inline-flex items-center gap-3 text-cyan-400/50 text-xs uppercase tracking-[0.4em] mb-8">
              <span className="w-6 h-px bg-cyan-400/30" /><span>Cosmic Wonder</span><span className="w-6 h-px bg-cyan-400/30" />
            </div>
            <p className="text-white/60 text-lg md:text-xl font-extralight leading-relaxed max-w-md">{cosmicFact}</p>
          </div>
        )}

        {phase === "warp" && (
          <div className={`transition-all duration-1000 ease-out ${textVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <h1 className="text-4xl md:text-6xl font-extralight tracking-wider text-white mb-4">Entering Portfolio</h1>
            <p className="text-white/50 text-lg font-extralight">Hold on, <span className="text-purple-400">{userName}</span>...</p>
          </div>
        )}
      </div>

      {phase !== "bigbang" && phase !== "askName" && phase !== "exit" && phase !== "warp" && (
        <button onClick={() => { setPhase("exit"); setTimeout(handleComplete, 800); }}
          className="absolute bottom-8 right-8 text-white/20 hover:text-purple-400/60 text-xs uppercase tracking-[0.3em] transition-colors duration-300">Skip</button>
      )}

      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.3; transform: scale(1); } 50% { opacity: 1; transform: scale(1.3); } }
        .star-twinkle { animation: twinkle 3s ease-in-out infinite; }
        @keyframes shoot { 0% { transform: translateX(0) translateY(0); opacity: 1; } 100% { transform: translateX(400px) translateY(400px); opacity: 0; } }
        .shooting-star { position: absolute; width: 150px; height: 2px; background: linear-gradient(90deg, white, transparent); transform: rotate(-45deg); animation: shoot 4s ease-out infinite; }
        @keyframes bigbang-expand { 0% { width: 0; height: 0; opacity: 1; } 100% { width: 200vw; height: 200vh; opacity: 0; } }
        .bigbang-ring { animation: bigbang-expand 2s ease-out forwards; }
        @keyframes bigbang-particle { 0% { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0); opacity: 1; } 100% { transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--distance)); opacity: 0; } }
        .bigbang-particle { animation: bigbang-particle 2s ease-out forwards; }
        @keyframes warpLine { 0% { transform: scale(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: scale(100); opacity: 0; } }
        .warp-line { position: absolute; width: 2px; height: 2px; background: white; border-radius: 50%; animation: warpLine 1.5s ease-in forwards; }
        .warp-star { animation: warpLine 1s ease-in forwards !important; }
        .cosmic-glow { text-shadow: 0 0 30px rgba(168, 85, 247, 0.5), 0 0 60px rgba(168, 85, 247, 0.3); }
      `}</style>
    </div>
  );
};

export default IntroScreen;
