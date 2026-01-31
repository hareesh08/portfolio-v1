import { useIsMobile } from "@/hooks/use-mobile";

const BackgroundAnimation = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient orbs - reduced blur for mobile */}
      <div className={`absolute top-0 left-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-amber-500/[0.03] rounded-full ${isMobile ? 'blur-xl' : 'blur-2xl'} bg-orb`} />
      <div className={`absolute top-1/3 right-0 w-[250px] md:w-[350px] h-[250px] md:h-[350px] bg-orange-500/[0.02] rounded-full ${isMobile ? 'blur-xl' : 'blur-2xl'} bg-orb`} style={{ animationDelay: '2s' }} />
      <div className={`absolute bottom-0 left-1/4 w-[350px] md:w-[500px] h-[350px] md:h-[500px] bg-amber-500/[0.02] rounded-full ${isMobile ? 'blur-xl' : 'blur-2xl'} bg-orb`} style={{ animationDelay: '4s' }} />
      
      {/* Floating particles - reduced count on mobile */}
      {!isMobile && (
        <div className="absolute inset-0">
          <div className="particle absolute top-[10%] left-[15%] w-1 h-1 bg-amber-500/30 rounded-full" />
          <div className="particle absolute top-[20%] right-[20%] w-1.5 h-1.5 bg-amber-500/20 rounded-full" />
          <div className="particle absolute top-[40%] left-[10%] w-1 h-1 bg-white/20 rounded-full" />
          <div className="particle absolute top-[60%] right-[15%] w-1 h-1 bg-amber-500/25 rounded-full" />
        </div>
      )}

      {/* Grid pattern - simplified */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,161,22,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,161,22,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />

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
