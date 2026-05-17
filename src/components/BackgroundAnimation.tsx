import { useIsMobile } from "@/hooks/use-mobile";

const BackgroundAnimation = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-0 page-grid opacity-[0.12]" />
      <div className="absolute inset-0 noise-overlay" />

      <div className={`absolute -top-20 -left-20 w-[320px] md:w-[560px] h-[320px] md:h-[560px] rounded-full bg-lime-300/10 blur-3xl bg-orb`} />
      <div className={`absolute top-1/3 -right-24 w-[260px] md:w-[420px] h-[260px] md:h-[420px] rounded-full bg-white/8 blur-3xl bg-orb`} style={{ animationDelay: '2s' }} />
      <div className={`absolute -bottom-24 left-1/4 w-[340px] md:w-[540px] h-[340px] md:h-[540px] rounded-full bg-emerald-400/8 blur-3xl bg-orb`} style={{ animationDelay: '4s' }} />

      {!isMobile && (
        <div className="absolute inset-0">
          <div className="particle absolute top-[12%] left-[14%] w-1 h-1 bg-lime-300/40 rounded-full" />
          <div className="particle absolute top-[24%] right-[18%] w-1.5 h-1.5 bg-white/30 rounded-full" />
          <div className="particle absolute top-[48%] left-[8%] w-1 h-1 bg-white/20 rounded-full" />
          <div className="particle absolute top-[68%] right-[12%] w-1 h-1 bg-lime-300/30 rounded-full" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/55" />

      <style>{`
        @keyframes bgOrb {
          0%, 100% { opacity: 0.5; transform: translateY(0); }
          50% { opacity: 0.7; transform: translateY(-10px); }
        }
        .bg-orb {
          animation: bgOrb 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BackgroundAnimation;
