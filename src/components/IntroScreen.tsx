import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const getPersonalizedQuotes = (name: string) => [
  `${name}, you are made of stardust and infinite possibilities.`,
  `The universe conspired to bring you here, ${name}.`,
  `${name}, your potential stretches beyond the galaxies.`,
];

const generalMotivations = [
  "The only way to do great work is to love what you do.",
  "Innovation distinguishes between a leader and a follower.",
  "Stay hungry, stay foolish.",
];

const fallbackFacts = [
  "There are more stars in the universe than grains of sand on Earth.",
  "The Milky Way is on a collision course with Andromeda in 4 billion years.",
  "A day on Venus is longer than its year.",
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
  return istTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
};

type Phase = "intro" | "bigbang" | "askName" | "welcome" | "journey" | "motivation" | "cosmic" | "warp" | "exit";

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [userName, setUserName] = useState("");
  const [phase, setPhase] = useState<Phase>("intro");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cosmicFact, setCosmicFact] = useState("");
  const [currentTime, setCurrentTime] = useState(getISTTime());
  const [motivationIndex, setMotivationIndex] = useState(0);
  const [allQuotes, setAllQuotes] = useState<string[]>([]);
  const [bigBangPhase, setBigBangPhase] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showStartOverlay, setShowStartOverlay] = useState(true);
  const isMobile = useIsMobile();

  const handleComplete = useCallback(() => onComplete(), [onComplete]);

  // Reduced star count for mobile performance
  const starCount = isMobile ? 30 : 60;
  const stars = useMemo(() => 
    Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 3,
    })),
  [starCount]);

  // Reduced bigbang particles
  const bigbangParticles = useMemo(() => 
    Array.from({ length: isMobile ? 12 : 24 }, (_, i) => ({
      angle: (i / (isMobile ? 12 : 24)) * 360,
      distance: 30 + Math.random() * 30,
      delay: Math.random() * 200,
    })),
  [isMobile]);

  // Reduced warp lines
  const warpLines = useMemo(() => 
    Array.from({ length: isMobile ? 20 : 40 }, (_, i) => ({
      left: 50 + (Math.random() - 0.5) * 80,
      top: 50 + (Math.random() - 0.5) * 80,
      delay: Math.random() * 0.2,
    })),
  [isMobile]);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(getISTTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch cosmic fact once
  useEffect(() => {
    const fetchFact = async () => {
      try {
        const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
        if (res.ok) {
          const data = await res.json();
          if (data.text && data.text.length < 150) {
            setCosmicFact(data.text);
            return;
          }
        }
      } catch { /* ignore */ }
      setCosmicFact(fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)]);
    };
    fetchFact();
  }, []);

  // Handle video play on start
  const handleStart = async () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      try {
        await video.play();
        setShowStartOverlay(false);
      } catch {
        // Play failed, skip to bigbang
        setShowStartOverlay(false);
        setPhase("bigbang");
      }
    } else {
      setShowStartOverlay(false);
      setPhase("bigbang");
    }
  };

  // Big Bang sequence
  useEffect(() => {
    if (phase === "bigbang") {
      setBigBangPhase(1);
      const t2 = setTimeout(() => setBigBangPhase(2), 600);
      const t3 = setTimeout(() => setBigBangPhase(3), 1400);
      const t4 = setTimeout(() => setPhase("askName"), 2000);
      return () => { clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }
  }, [phase]);

  // Focus input when askName phase starts
  useEffect(() => {
    if (phase === "askName") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [phase]);

  // Handle name submission
  const handleNameSubmit = () => {
    if (!userName.trim()) return;
    const personalized = getPersonalizedQuotes(userName.trim()).slice(0, 2);
    const general = generalMotivations.slice(0, 1);
    setAllQuotes([...personalized, ...general]);
    setPhase("welcome");
  };

  // Phase transitions
  useEffect(() => {
    if (phase === "welcome") {
      const t = setTimeout(() => setPhase("journey"), 1800);
      return () => clearTimeout(t);
    }
    if (phase === "journey") {
      const t = setTimeout(() => setPhase("motivation"), 2000);
      return () => clearTimeout(t);
    }
    if (phase === "motivation") {
      if (motivationIndex < allQuotes.length - 1) {
        const t = setTimeout(() => setMotivationIndex(prev => prev + 1), 2500);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("cosmic"), 2500);
        return () => clearTimeout(t);
      }
    }
    if (phase === "cosmic") {
      const t = setTimeout(() => setPhase("warp"), 2500);
      return () => clearTimeout(t);
    }
    if (phase === "warp") {
      const t = setTimeout(() => {
        setPhase("exit");
        setTimeout(handleComplete, 400);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [phase, motivationIndex, allQuotes.length, handleComplete]);

  return (
    <div className={`fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${phase === "exit" ? "opacity-0" : "opacity-100"}`}>
      
      {/* Intro Video Phase */}
      {phase === "intro" && (
        <div className="absolute inset-0 bg-black">
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            playsInline
            muted={false}
            autoPlay
            onEnded={() => setPhase("bigbang")}
          >
            <source src="/Intro-Desktop.mp4" type="video/mp4" />
          </video>
          
          {/* Start Overlay */}
          {showStartOverlay && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20">
              {/* Subtle ambient particles - reduced count */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: isMobile ? 15 : 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white/20 intro-particle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      width: `${1 + Math.random()}px`,
                      height: `${1 + Math.random()}px`,
                      animationDelay: `${Math.random() * 3}s`,
                    }}
                  />
                ))}
              </div>
              
              {/* Ambient glow - reduced blur */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-white/5 rounded-full blur-xl" />
              
              {/* Title */}
              <div className="relative z-10 text-center mb-10 intro-fade-in">
                <p className="text-white/40 text-xs uppercase tracking-[0.4em] mb-3">Welcome to</p>
                <h1 className="text-white text-4xl md:text-6xl font-extralight tracking-wider mb-3">The Cosmos</h1>
                <p className="text-white/40 text-sm font-light">A cinematic portfolio experience</p>
              </div>
              
              {/* Start Button - White on black */}
              <button
                onClick={handleStart}
                className="relative z-10 group flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-white text-black rounded-full font-medium text-base md:text-lg tracking-wide transition-all duration-300 hover:bg-white/90 intro-scale-in"
              >
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">Begin Experience</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              
              {/* Hint text */}
              <p className="relative z-10 text-white/30 text-xs mt-6 tracking-widest uppercase intro-fade-in-delayed">Click to start with sound</p>
            </div>
          )}
        </div>
      )}

      {/* Background - Pure black for intro phases */}
      {phase !== "intro" && (
        <div className="absolute inset-0 bg-black">
          {/* Big Bang Effect */}
          {phase === "bigbang" && (
            <>
              {/* Core */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-all ${
                bigBangPhase === 0 ? "w-0 h-0 opacity-0 duration-200" :
                bigBangPhase === 1 ? "w-4 h-4 opacity-100 duration-400" :
                bigBangPhase === 2 ? "w-32 h-32 md:w-48 md:h-48 opacity-100 duration-600" :
                "w-[200vw] h-[200vh] opacity-0 duration-800"
              }`} style={{ boxShadow: bigBangPhase >= 1 && bigBangPhase <= 2 ? '0 0 60px 30px rgba(255,255,255,0.5)' : 'none' }} />
              
              {/* Simple ring effects */}
              {bigBangPhase >= 2 && (
                <>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 bigbang-ring" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bigbang-ring-delayed" />
                  
                  {/* Particles */}
                  {bigbangParticles.map((p, i) => (
                    <div 
                      key={i} 
                      className="absolute top-1/2 left-1/2 w-1 h-1 md:w-2 md:h-2 rounded-full bg-white bigbang-particle"
                      style={{ 
                        '--angle': `${p.angle}deg`, 
                        '--distance': `${p.distance}vw`, 
                        animationDelay: `${p.delay}ms`,
                      } as React.CSSProperties} 
                    />
                  ))}
                  
                  {/* Flash */}
                  <div className="absolute inset-0 bg-white bigbang-flash" />
                </>
              )}
            </>
          )}

          {/* Stars - Simple opacity animation only */}
          {phase !== "bigbang" && phase !== "warp" && (
            <div className="absolute inset-0">
              {stars.map((star) => (
                <div 
                  key={star.id} 
                  className="absolute rounded-full bg-white star-twinkle"
                  style={{ 
                    left: `${star.x}%`, 
                    top: `${star.y}%`, 
                    width: `${star.size}px`, 
                    height: `${star.size}px`, 
                    animationDelay: `${star.delay}s`,
                  }} 
                />
              ))}
            </div>
          )}

          {/* Warp effect */}
          {phase === "warp" && (
            <div className="absolute inset-0 overflow-hidden">
              {/* Center glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full warp-center" />
              
              {/* Streaking lines */}
              {warpLines.map((l, i) => (
                <div 
                  key={i} 
                  className="warp-line" 
                  style={{ 
                    left: `${l.left}%`, 
                    top: `${l.top}%`, 
                    animationDelay: `${l.delay}s`,
                  }} 
                />
              ))}
              
              {/* White overlay */}
              <div className="absolute inset-0 warp-overlay" />
            </div>
          )}

          {/* Subtle ambient glow */}
          {phase !== "bigbang" && phase !== "warp" && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-white/5 rounded-full blur-xl" />
          )}
        </div>
      )}

      {/* IST Time Display */}
      {phase !== "intro" && phase !== "bigbang" && phase !== "exit" && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 phase-fade-in">
          <p className="text-white/50 text-sm font-mono tracking-widest">
            {currentTime} <span className="text-white/30">IST</span>
          </p>
        </div>
      )}

      {/* Big Bang Text */}
      {phase === "bigbang" && bigBangPhase === 1 && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <p className="text-white/90 text-lg md:text-2xl font-extralight tracking-[0.4em] uppercase phase-fade-in">
            In the beginning...
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center px-6 max-w-xl mx-auto text-center min-h-[300px] ${phase === "bigbang" || phase === "intro" ? "opacity-0" : "opacity-100"}`}>
        
        {/* Ask Name Phase */}
        {phase === "askName" && (
          <div className="space-y-8 phase-slide-up">
            <div>
              <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] mb-6 text-white/40">
                <span className="w-6 h-px bg-white/20" />
                <span>Welcome, Traveler</span>
                <span className="w-6 h-px bg-white/20" />
              </div>
              <h2 className="text-white text-3xl md:text-5xl font-extralight tracking-wide">{getGreeting()}</h2>
            </div>
            <div className="space-y-6">
              <input 
                ref={inputRef} 
                type="text" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder="What shall I call you?" 
                className="w-64 md:w-80 bg-transparent border-b border-white/30 focus:border-white/60 text-white text-center text-xl md:text-2xl font-extralight py-3 outline-none transition-colors duration-300 placeholder:text-white/30" 
              />
              <div>
                <button 
                  onClick={handleNameSubmit} 
                  disabled={!userName.trim()}
                  className={`group inline-flex items-center gap-3 px-8 py-3 rounded-full transition-all duration-300 ${
                    userName.trim() 
                      ? "bg-white text-black hover:bg-white/90" 
                      : "bg-white/10 text-white/30 cursor-not-allowed"
                  }`}
                >
                  <span className="text-sm uppercase tracking-[0.2em]">Begin Journey</span>
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${userName.trim() ? "group-hover:translate-x-1" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Phase */}
        {phase === "welcome" && (
          <div className="phase-scale-in">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <span className="text-3xl font-light text-white">{userName.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <p className="text-xs uppercase tracking-[0.4em] mb-3 text-white/50">Greetings</p>
            <h1 className="text-4xl md:text-6xl font-extralight tracking-wider text-white mb-3">{userName}</h1>
            <p className="text-white/40 text-base font-extralight">Welcome to my universe</p>
          </div>
        )}

        {/* Journey Phase */}
        {phase === "journey" && (
          <div className="phase-scale-in">
            <div className="text-4xl mb-6 text-white/60">✧</div>
            <p className="text-xl md:text-2xl font-extralight text-white/70 leading-relaxed">
              Prepare for a journey<br/>
              <span className="text-white">through the cosmos</span>
            </p>
          </div>
        )}

        {/* Motivation Phase */}
        {phase === "motivation" && allQuotes.length > 0 && (
          <div className="phase-fade-in" key={motivationIndex}>
            <div className="mb-6 text-3xl text-white/60">✦</div>
            <p className="text-lg md:text-xl font-extralight leading-relaxed max-w-md text-white/70">
              {allQuotes[motivationIndex]?.includes(userName) ? (
                allQuotes[motivationIndex].split(userName).map((part, idx, arr) => (
                  <span key={idx}>
                    {part}
                    {idx < arr.length - 1 && (
                      <span className="text-white font-normal">{userName}</span>
                    )}
                  </span>
                ))
              ) : (
                allQuotes[motivationIndex]
              )}
            </p>
            <div className="flex justify-center gap-2 mt-8">
              {allQuotes.map((_, idx) => (
                <div key={idx} className={`rounded-full transition-all duration-400 ${
                  idx === motivationIndex ? "w-8 h-1 bg-white" : "w-1 h-1 bg-white/30"
                }`} />
              ))}
            </div>
          </div>
        )}

        {/* Cosmic Fact Phase */}
        {phase === "cosmic" && (
          <div className="phase-slide-up">
            <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] mb-6 text-white/40">
              <span className="w-5 h-px bg-white/20" />
              <span>Did You Know?</span>
              <span className="w-5 h-px bg-white/20" />
            </div>
            <p className="text-white/60 text-base md:text-lg font-extralight leading-relaxed max-w-sm">{cosmicFact}</p>
          </div>
        )}

        {/* Warp Phase */}
        {phase === "warp" && (
          <div className="phase-scale-in">
            <h1 className="text-3xl md:text-5xl font-extralight tracking-wider text-white mb-3">Entering Portfolio</h1>
            <p className="text-white/50 text-base font-extralight">
              Hold on, <span className="text-white">{userName}</span>...
            </p>
          </div>
        )}
      </div>

      {/* Skip Button */}
      {phase !== "intro" && phase !== "askName" && phase !== "exit" && (
        <button
          onClick={() => { setPhase("exit"); setTimeout(handleComplete, 400); }}
          className="absolute bottom-6 right-6 text-white/40 hover:text-white/70 text-xs uppercase tracking-[0.2em] transition-colors duration-300"
        >
          Skip
        </button>
      )}

      <style>{`
        /* Intro screen - simple opacity animations */
        @keyframes introFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .intro-fade-in { 
          animation: introFadeIn 0.8s ease-out forwards; 
        }
        .intro-fade-in-delayed { 
          animation: introFadeIn 0.6s ease-out 0.6s forwards; 
          opacity: 0;
        }
        
        @keyframes introScaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .intro-scale-in { 
          animation: introScaleIn 0.6s ease-out 0.3s forwards; 
          opacity: 0;
        }
        
        /* Ambient particles - very light */
        @keyframes introParticle {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.4; }
        }
        .intro-particle { 
          animation: introParticle 4s ease-in-out infinite;
        }
        
        /* Star twinkle - opacity only */
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        .star-twinkle { 
          animation: twinkle 3s ease-in-out infinite;
        }
        
        /* Big Bang - simplified */
        @keyframes bigbangRing {
          from { width: 0; height: 0; opacity: 1; }
          to { width: 150vw; height: 150vh; opacity: 0; }
        }
        .bigbang-ring { 
          animation: bigbangRing 0.8s ease-out forwards;
        }
        .bigbang-ring-delayed { 
          animation: bigbangRing 0.8s ease-out 0.1s forwards;
        }
        
        @keyframes bigbangParticle {
          from { 
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0); 
            opacity: 1; 
          }
          to { 
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--distance)); 
            opacity: 0; 
          }
        }
        .bigbang-particle { 
          animation: bigbangParticle 0.8s ease-out forwards;
        }
        
        @keyframes bigbangFlash {
          from { opacity: 0.6; }
          to { opacity: 0; }
        }
        .bigbang-flash { 
          animation: bigbangFlash 0.4s ease-out forwards;
        }
        
        /* Warp - simplified */
        @keyframes warpLine {
          from { 
            width: 0;
            opacity: 0;
          }
          20% { opacity: 0.8; }
          to { 
            width: 100vw;
            opacity: 0;
          }
        }
        .warp-line {
          position: absolute;
          height: 1px;
          background: white;
          animation: warpLine 1s ease-in forwards;
        }
        
        @keyframes warpCenter {
          from { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          to { transform: translate(-50%, -50%) scale(50); opacity: 0; }
        }
        .warp-center { 
          animation: warpCenter 1s ease-in forwards;
        }
        
        @keyframes warpOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .warp-overlay {
          background: white;
          animation: warpOverlay 1s ease-in forwards;
        }
        
        /* Phase transitions - simple */
        @keyframes phaseFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .phase-fade-in { 
          animation: phaseFadeIn 0.6s ease-out forwards; 
        }
        
        @keyframes phaseSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .phase-slide-up { 
          animation: phaseSlideUp 0.6s ease-out forwards; 
        }
        
        @keyframes phaseScaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .phase-scale-in { 
          animation: phaseScaleIn 0.6s ease-out forwards; 
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;
