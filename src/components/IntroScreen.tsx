import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
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
];

const generalMotivations = [
  "The only way to do great work is to love what you do.",
  "Innovation distinguishes between a leader and a follower.",
  "Stay hungry, stay foolish.",
  "Code is poetry written for machines to execute and humans to understand.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Your limitation—it's only your imagination.",
  "Dream it. Wish it. Do it.",
];

const fallbackFacts = [
  "There are more stars in the universe than grains of sand on Earth.",
  "The Milky Way is on a collision course with Andromeda in 4 billion years.",
  "A day on Venus is longer than its year.",
  "Neutron stars can spin 600 times per second.",
  "The observable universe is 93 billion light-years in diameter.",
];

const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 7) return "sunrise";
  if (hour >= 7 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 19) return "sunset";
  if (hour >= 19 && hour < 22) return "evening";
  if (hour >= 22 || hour < 2) return "night";
  return "midnight";
};

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

const getBackgroundStyle = (timeOfDay: string) => {
  switch (timeOfDay) {
    case "sunrise": return "bg-gradient-to-b from-orange-900/40 via-pink-900/30 to-purple-900/40";
    case "morning": return "bg-gradient-to-b from-blue-400/20 via-cyan-300/10 to-yellow-200/10";
    case "afternoon": return "bg-gradient-to-b from-sky-500/20 via-blue-400/10 to-cyan-300/10";
    case "sunset": return "bg-gradient-to-b from-orange-500/30 via-red-500/20 to-purple-700/30";
    case "evening": return "bg-gradient-to-b from-indigo-900/40 via-purple-900/30 to-pink-900/20";
    case "night": return "bg-gradient-to-b from-slate-900/60 via-indigo-950/50 to-purple-950/40";
    case "midnight": return "bg-gradient-to-b from-black via-slate-950/80 to-indigo-950/60";
    default: return "bg-black";
  }
};

const getAccentColor = (timeOfDay: string) => {
  switch (timeOfDay) {
    case "sunrise": return "from-orange-400 to-pink-500";
    case "morning": return "from-cyan-400 to-blue-500";
    case "afternoon": return "from-sky-400 to-blue-500";
    case "sunset": return "from-orange-500 to-red-500";
    case "evening": return "from-purple-400 to-pink-500";
    case "night": return "from-indigo-400 to-purple-500";
    case "midnight": return "from-slate-400 to-indigo-500";
    default: return "from-purple-400 to-blue-500";
  }
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
  const [timeOfDay] = useState(getTimeOfDay());
  const [motivationIndex, setMotivationIndex] = useState(0);
  const [allQuotes, setAllQuotes] = useState<string[]>([]);
  const [bigBangPhase, setBigBangPhase] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showStartOverlay, setShowStartOverlay] = useState(true);

  const handleComplete = useCallback(() => onComplete(), [onComplete]);
  const accentGradient = getAccentColor(timeOfDay);
  const showStars = timeOfDay === "night" || timeOfDay === "midnight" || timeOfDay === "evening";

  // Memoize stars with varied sizes and brightness
  const stars = useMemo(() => 
    Array.from({ length: 300 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 0.5,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 4,
      brightness: 0.3 + Math.random() * 0.7,
    })),
  []);

  // Memoize bigbang particles with varied properties
  const bigbangParticles = useMemo(() => 
    Array.from({ length: 80 }, (_, i) => ({
      angle: (i / 80) * 360,
      distance: Math.random() * 60 + 20,
      delay: Math.random() * 300,
      size: Math.random() * 3 + 1,
      color: ['#fff', '#ffd700', '#ff6b6b', '#4ecdc4', '#a855f7'][Math.floor(Math.random() * 5)],
    })),
  []);

  // Memoize warp lines with streaks
  const warpLines = useMemo(() => 
    Array.from({ length: 150 }, (_, i) => ({
      left: 50 + (Math.random() - 0.5) * 100,
      top: 50 + (Math.random() - 0.5) * 100,
      delay: Math.random() * 0.3,
      length: 50 + Math.random() * 100,
    })),
  []);

  // Nebula clouds
  const nebulaClouds = useMemo(() => 
    Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 200 + Math.random() * 300,
      color: ['purple', 'blue', 'pink', 'cyan', 'indigo'][i],
      delay: Math.random() * 10,
    })),
  []);

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
          if (data.text && data.text.length < 200) {
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
        // Play failed
      }
    }
  };

  // Big Bang sequence - simplified
  useEffect(() => {
    if (phase === "bigbang") {
      setBigBangPhase(1);
      const t2 = setTimeout(() => setBigBangPhase(2), 800);
      const t3 = setTimeout(() => setBigBangPhase(3), 1800);
      const t4 = setTimeout(() => setPhase("askName"), 2500);
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
    const personalized = getPersonalizedQuotes(userName.trim())
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    const general = generalMotivations
      .sort(() => Math.random() - 0.5)
      .slice(0, 1);
    setAllQuotes([...personalized, ...general].sort(() => Math.random() - 0.5));
    setPhase("welcome");
  };

  // Phase transitions - simplified
  useEffect(() => {
    if (phase === "welcome") {
      const t = setTimeout(() => setPhase("journey"), 2000);
      return () => clearTimeout(t);
    }
    if (phase === "journey") {
      const t = setTimeout(() => setPhase("motivation"), 2500);
      return () => clearTimeout(t);
    }
    if (phase === "motivation") {
      if (motivationIndex < allQuotes.length - 1) {
        const t = setTimeout(() => setMotivationIndex(prev => prev + 1), 3000);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("cosmic"), 3000);
        return () => clearTimeout(t);
      }
    }
    if (phase === "cosmic") {
      const t = setTimeout(() => setPhase("warp"), 3000);
      return () => clearTimeout(t);
    }
    if (phase === "warp") {
      const t = setTimeout(() => {
        setPhase("exit");
        setTimeout(handleComplete, 500);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [phase, motivationIndex, allQuotes.length, handleComplete]);

  return (
    <div className={`fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700 ${phase === "exit" ? "opacity-0" : "opacity-100"}`}>
      
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
          
          {/* Start Overlay with Cinematic Button */}
          {showStartOverlay && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-20">
              {/* Cinematic particles */}
              <div className="absolute inset-0 overflow-hidden">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white/30 intro-particle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      width: `${1 + Math.random() * 2}px`,
                      height: `${1 + Math.random() * 2}px`,
                      animationDelay: `${Math.random() * 5}s`,
                      animationDuration: `${3 + Math.random() * 4}s`,
                    }}
                  />
                ))}
              </div>
              
              {/* Ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/5 via-transparent to-transparent rounded-full blur-3xl" />
              
              {/* Title */}
              <div className="relative z-10 text-center mb-12 intro-title-animate">
                <p className="text-white/40 text-xs uppercase tracking-[0.5em] mb-4">Welcome to</p>
                <h1 className="text-white text-5xl md:text-7xl font-extralight tracking-wider mb-4">The Cosmos</h1>
                <p className="text-white/50 text-sm font-light">A cinematic portfolio experience</p>
              </div>
              
              {/* Start Button - White with black background */}
              <button
                onClick={handleStart}
                className="relative z-10 group flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-medium text-lg tracking-wide transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_20px_rgba(255,255,255,0.3)] intro-button-animate"
              >
                <span className="relative">
                  <svg
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-500 group-hover:rotate-90"
                  >
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path
                      d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">Begin Experience</span>
                <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-2" />
              </button>
              
              {/* Hint text */}
              <p className="relative z-10 text-white/30 text-xs mt-8 tracking-widest uppercase intro-hint-animate">Click to start with sound</p>
            </div>
          )}
        </div>
      )}

      {/* Background */}
      {phase !== "intro" && (
        <div className="absolute inset-0 bg-black">
          <div className={`absolute inset-0 ${getBackgroundStyle(timeOfDay)} transition-all duration-1000`} />
          
          {/* Sun/Moon */}
          {phase !== "bigbang" && (
            <>
              {(timeOfDay === "sunrise" || timeOfDay === "morning" || timeOfDay === "afternoon") && (
                <div className={`absolute w-32 h-32 rounded-full blur-xl ${
                  timeOfDay === "sunrise" ? "top-1/3 right-1/4 bg-orange-400/30" :
                  timeOfDay === "morning" ? "top-1/4 right-1/3 bg-yellow-300/20" :
                  "top-1/4 left-1/2 bg-yellow-200/20"
                }`} />
              )}
              {timeOfDay === "sunset" && (
                <div className="absolute bottom-1/4 left-1/4 w-40 h-40 rounded-full bg-orange-500/30 blur-2xl" />
              )}
              {(timeOfDay === "night" || timeOfDay === "midnight") && (
                <div className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full bg-slate-200/20 blur-sm" />
              )}
            </>
          )}

          {/* Big Bang Effect - Enhanced */}
          {phase === "bigbang" && (
            <>
              {/* Core singularity */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all ${
                bigBangPhase === 0 ? "w-0 h-0 opacity-0 duration-300" :
                bigBangPhase === 1 ? "w-6 h-6 bg-white shadow-[0_0_80px_40px_rgba(255,255,255,0.9),0_0_120px_60px_rgba(255,200,100,0.6)] duration-500" :
                bigBangPhase === 2 ? "w-40 h-40 bg-gradient-radial from-white via-yellow-200 to-orange-400 shadow-[0_0_300px_150px_rgba(255,200,100,0.8),0_0_500px_250px_rgba(255,100,50,0.4)] duration-700" :
                "w-[400vw] h-[400vh] bg-transparent opacity-0 duration-1000"
              }`} />
              
              {/* Shockwave rings */}
              {bigBangPhase >= 2 && (
                <>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/50 bigbang-ring" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-yellow-400/40 bigbang-ring" style={{ animationDelay: '100ms' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/30 bigbang-ring" style={{ animationDelay: '200ms' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/30 bigbang-ring" style={{ animationDelay: '300ms' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/20 bigbang-ring" style={{ animationDelay: '400ms' }} />
                  
                  {/* Explosion particles */}
                  <div className="absolute inset-0 overflow-hidden">
                    {bigbangParticles.map((p, i) => (
                      <div 
                        key={i} 
                        className="absolute top-1/2 left-1/2 rounded-full bigbang-particle"
                        style={{ 
                          '--angle': `${p.angle}deg`, 
                          '--distance': `${p.distance}vw`, 
                          animationDelay: `${p.delay}ms`,
                          width: `${p.size}px`,
                          height: `${p.size}px`,
                          backgroundColor: p.color,
                          boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
                        } as React.CSSProperties} 
                      />
                    ))}
                  </div>
                  
                  {/* Flash overlay */}
                  <div className="absolute inset-0 bg-white bigbang-flash" />
                </>
              )}
            </>
          )}

          {/* Nebula clouds - ambient background */}
          {phase !== "bigbang" && phase !== "warp" && (
            <div className="absolute inset-0 overflow-hidden">
              {nebulaClouds.map((cloud, i) => (
                <div
                  key={i}
                  className="absolute rounded-full nebula-cloud"
                  style={{
                    left: `${cloud.x}%`,
                    top: `${cloud.y}%`,
                    width: `${cloud.size}px`,
                    height: `${cloud.size}px`,
                    background: `radial-gradient(circle, ${
                      cloud.color === 'purple' ? 'rgba(147, 51, 234, 0.15)' :
                      cloud.color === 'blue' ? 'rgba(59, 130, 246, 0.12)' :
                      cloud.color === 'pink' ? 'rgba(236, 72, 153, 0.1)' :
                      cloud.color === 'cyan' ? 'rgba(34, 211, 238, 0.1)' :
                      'rgba(99, 102, 241, 0.12)'
                    }, transparent 70%)`,
                    animationDelay: `${cloud.delay}s`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </div>
          )}

          {/* Stars - Enhanced with glow */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${phase === "bigbang" && bigBangPhase < 3 ? "opacity-0" : showStars ? "opacity-100" : "opacity-40"}`}>
            {stars.map((star) => (
              <div 
                key={star.id} 
                className={`absolute rounded-full star-twinkle ${phase === "warp" ? "warp-star" : ""}`}
                style={{ 
                  left: `${star.x}%`, 
                  top: `${star.y}%`, 
                  width: `${star.size}px`, 
                  height: `${star.size}px`, 
                  animationDelay: `${star.delay}s`,
                  animationDuration: `${star.duration}s`,
                  backgroundColor: `rgba(255, 255, 255, ${star.brightness})`,
                  boxShadow: star.size > 2 ? `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.brightness * 0.5})` : 'none',
                }} 
              />
            ))}
          </div>

          {/* Shooting stars - Enhanced with trail */}
          {showStars && phase !== "bigbang" && phase !== "exit" && (
            <>
              <div className="shooting-star-enhanced" style={{ top: '10%', left: '0%', animationDelay: '0s' }} />
              <div className="shooting-star-enhanced" style={{ top: '25%', left: '60%', animationDelay: '2s' }} />
              <div className="shooting-star-enhanced" style={{ top: '45%', left: '10%', animationDelay: '4s' }} />
              <div className="shooting-star-enhanced" style={{ top: '60%', left: '75%', animationDelay: '6s' }} />
              <div className="shooting-star-enhanced" style={{ top: '80%', left: '30%', animationDelay: '8s' }} />
            </>
          )}

          {/* Warp effect - Enhanced hyperspace */}
          {phase === "warp" && (
            <div className="absolute inset-0 overflow-hidden">
              {/* Center glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full warp-center-glow" />
              
              {/* Streaking lines */}
              {warpLines.map((l, i) => (
                <div 
                  key={i} 
                  className="warp-streak" 
                  style={{ 
                    left: `${l.left}%`, 
                    top: `${l.top}%`, 
                    animationDelay: `${l.delay}s`,
                    '--streak-length': `${l.length}px`,
                  } as React.CSSProperties} 
                />
              ))}
              
              {/* Radial blur overlay */}
              <div className="absolute inset-0 warp-blur-overlay" />
            </div>
          )}

          {/* Central glow */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-all duration-1000 ${
            phase === "warp" ? "w-[200vw] h-[200vh] bg-white/80" : phase === "bigbang" ? "w-0 h-0" : "w-[600px] h-[600px] bg-white/5"
          }`} />
        </div>
      )}

      {/* IST Time Display */}
      {phase !== "bigbang" && phase !== "exit" && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 animate-fadeIn">
          <p className="text-white/50 text-sm font-mono tracking-widest">
            {currentTime} <span className="text-white/30">IST</span>
          </p>
        </div>
      )}

      {/* Big Bang Text */}
      {phase === "bigbang" && bigBangPhase === 1 && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <p className="text-white/90 text-xl md:text-2xl font-extralight tracking-[0.5em] uppercase animate-fadeIn">
            In the beginning...
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center px-6 max-w-2xl mx-auto text-center min-h-[400px] ${phase === "bigbang" ? "opacity-0" : "opacity-100"}`}>
        
        {/* Ask Name Phase */}
        {phase === "askName" && (
          <div className="space-y-10 animate-slideUp">
            <div>
              <div className={`inline-flex items-center gap-3 text-xs uppercase tracking-[0.5em] mb-8`}>
                <span className="w-8 h-px bg-white/20" />
                <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>Welcome, Traveler</span>
                <span className="w-8 h-px bg-white/20" />
              </div>
              <h2 className="text-white text-4xl md:text-6xl font-extralight tracking-wide">{getGreeting()}</h2>
            </div>
            <div className="space-y-8">
              <input 
                ref={inputRef} 
                type="text" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                placeholder="What shall I call you?" 
                className="w-72 md:w-96 bg-transparent border-b-2 border-white/20 focus:border-white/50 text-white text-center text-2xl font-extralight py-4 outline-none transition-all duration-300 placeholder:text-white/30" 
              />
              <div>
                <button 
                  onClick={handleNameSubmit} 
                  disabled={!userName.trim()}
                  className={`group inline-flex items-center gap-3 px-10 py-4 rounded-full transition-all duration-300 ${
                    userName.trim() 
                      ? "bg-white/10 border border-white/30 text-white hover:bg-white/20" 
                      : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
                  }`}
                >
                  <span className="text-sm uppercase tracking-[0.3em]">Begin Journey</span>
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${userName.trim() ? "group-hover:translate-x-2" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Phase */}
        {phase === "welcome" && (
          <div className="animate-scaleIn">
            <div className="mb-8">
              <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${accentGradient} flex items-center justify-center ring-4 ring-white/20`}>
                <span className="text-4xl font-light text-white">{userName.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <p className={`text-xs uppercase tracking-[0.5em] mb-4 bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>Greetings</p>
            <h1 className="text-5xl md:text-7xl font-extralight tracking-wider text-white mb-4">{userName}</h1>
            <p className="text-white/50 text-lg font-extralight">Welcome to my universe</p>
          </div>
        )}

        {/* Journey Phase */}
        {phase === "journey" && (
          <div className="animate-scaleIn">
            <div className={`text-6xl mb-8 bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>✧</div>
            <p className="text-2xl md:text-3xl font-extralight text-white/80 leading-relaxed">
              Prepare for a journey<br/>
              <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>through the cosmos</span>
            </p>
          </div>
        )}

        {/* Motivation Phase */}
        {phase === "motivation" && allQuotes.length > 0 && (
          <div className="animate-fadeIn" key={motivationIndex}>
            <div className={`mb-8 text-4xl bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>✦</div>
            <p className="text-xl md:text-2xl font-extralight leading-relaxed max-w-lg text-white/80">
              {allQuotes[motivationIndex]?.includes(userName) ? (
                allQuotes[motivationIndex].split(userName).map((part, idx, arr) => (
                  <span key={idx}>
                    {part}
                    {idx < arr.length - 1 && (
                      <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent font-normal`}>{userName}</span>
                    )}
                  </span>
                ))
              ) : (
                allQuotes[motivationIndex]
              )}
            </p>
            <div className="flex justify-center gap-3 mt-10">
              {allQuotes.map((_, idx) => (
                <div key={idx} className={`rounded-full transition-all duration-500 ${
                  idx === motivationIndex ? `w-10 h-1.5 bg-gradient-to-r ${accentGradient}` : "w-1.5 h-1.5 bg-white/30"
                }`} />
              ))}
            </div>
          </div>
        )}

        {/* Cosmic Fact Phase */}
        {phase === "cosmic" && (
          <div className="animate-slideUp">
            <div className={`inline-flex items-center gap-3 text-xs uppercase tracking-[0.4em] mb-8`}>
              <span className="w-6 h-px bg-white/20" />
              <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>Did You Know?</span>
              <span className="w-6 h-px bg-white/20" />
            </div>
            <p className="text-white/70 text-lg md:text-xl font-extralight leading-relaxed max-w-md">{cosmicFact}</p>
          </div>
        )}

        {/* Warp Phase */}
        {phase === "warp" && (
          <div className="animate-scaleIn">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-wider text-white mb-4">Entering Portfolio</h1>
            <p className="text-white/60 text-lg font-extralight">
              Hold on, <span className={`bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent`}>{userName}</span>...
            </p>
          </div>
        )}
      </div>

      {/* Skip Button - visible during intro and other phases */}
      {phase !== "askName" && phase !== "exit" && (
        <button
          onClick={() => { setPhase("exit"); setTimeout(handleComplete, 500); }}
          className="absolute bottom-8 right-8 text-white/50 hover:text-white text-xs uppercase tracking-[0.3em] transition-colors duration-300"
        >
          Skip
        </button>
      )}

      <style>{`
        /* Intro screen animations */
        @keyframes introParticle {
          0%, 100% { opacity: 0.2; transform: translateY(0); }
          50% { opacity: 0.6; transform: translateY(-20px); }
        }
        .intro-particle { animation: introParticle 4s ease-in-out infinite; }
        
        @keyframes introTitleAnimate {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .intro-title-animate { animation: introTitleAnimate 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both; }
        
        @keyframes introButtonAnimate {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .intro-button-animate { animation: introButtonAnimate 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both; }
        
        @keyframes introHintAnimate {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .intro-hint-animate { animation: introHintAnimate 1s ease-out 1.2s both; }
        
        /* Base animations - optimized */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .animate-slideUp { animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .animate-scaleIn { animation: scaleIn 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        
        /* Star twinkle - optimized for performance */
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .star-twinkle { 
          animation: twinkle 3s ease-in-out infinite;
          will-change: opacity;
        }
        
        /* Nebula floating - reduced motion */
        @keyframes nebulaFloat {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.7; }
        }
        .nebula-cloud { 
          animation: nebulaFloat 12s ease-in-out infinite;
          will-change: opacity;
        }
        
        /* Shooting star - simplified */
        @keyframes shootEnhanced {
          0% { 
            transform: translateX(0) translateY(0) rotate(-45deg); 
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { 
            transform: translateX(400px) translateY(400px) rotate(-45deg); 
            opacity: 0; 
          }
        }
        .shooting-star-enhanced {
          position: absolute;
          width: 150px;
          height: 2px;
          background: linear-gradient(90deg, white 0%, rgba(255, 255, 255, 0.5) 40%, transparent 100%);
          border-radius: 2px;
          animation: shootEnhanced 4s ease-out infinite;
          will-change: transform, opacity;
        }
        .shooting-star-enhanced::before {
          content: '';
          position: absolute;
          left: 0;
          top: -1px;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px 3px rgba(255, 255, 255, 0.8);
        }
        
        /* Big Bang effects - optimized */
        @keyframes bigbang-expand {
          0% { width: 0; height: 0; opacity: 1; }
          100% { width: 200vw; height: 200vh; opacity: 0; }
        }
        .bigbang-ring { 
          animation: bigbang-expand 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: width, height, opacity;
        }
        
        @keyframes bigbang-particle {
          0% { 
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(0); 
            opacity: 1; 
          }
          100% { 
            transform: translate(-50%, -50%) rotate(var(--angle)) translateX(var(--distance)); 
            opacity: 0; 
          }
        }
        .bigbang-particle { 
          animation: bigbang-particle 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: transform, opacity;
        }
        
        @keyframes bigbang-flash {
          0% { opacity: 0.8; }
          100% { opacity: 0; }
        }
        .bigbang-flash { 
          animation: bigbang-flash 0.6s ease-out forwards;
          will-change: opacity;
        }
        
        /* Warp effects - optimized */
        @keyframes warpStreak {
          0% { 
            transform: translate(-50%, -50%) scaleX(0.1);
            opacity: 0;
          }
          20% { opacity: 1; }
          100% { 
            transform: translate(-50%, -50%) scaleX(30);
            opacity: 0;
          }
        }
        .warp-streak {
          position: absolute;
          width: var(--streak-length);
          height: 2px;
          background: linear-gradient(90deg, transparent, white, transparent);
          border-radius: 2px;
          animation: warpStreak 1.2s ease-in forwards;
          will-change: transform, opacity;
        }
        
        @keyframes warpCenterGlow {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(100); opacity: 0; }
        }
        .warp-center-glow { 
          animation: warpCenterGlow 1.2s ease-in forwards;
          box-shadow: 0 0 60px 30px white;
          will-change: transform, opacity;
        }
        
        @keyframes warpBlur {
          0% { opacity: 0; }
          100% { opacity: 0.6; }
        }
        .warp-blur-overlay {
          background: radial-gradient(circle at center, transparent 0%, rgba(255, 255, 255, 0.2) 100%);
          animation: warpBlur 1.2s ease-in forwards;
          will-change: opacity;
        }
        
        .warp-star { 
          animation: warpStreak 0.6s ease-in forwards !important; 
          width: 2px !important;
          height: 2px !important;
        }
      `}</style>
    </div>
  );
};

export default IntroScreen;
