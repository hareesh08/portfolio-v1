const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-3xl blob" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-teal-500/[0.02] rounded-full blur-3xl blob" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/[0.02] rounded-full blur-3xl blob" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        <div className="particle absolute top-[10%] left-[15%] w-1 h-1 bg-emerald-500/30 rounded-full" />
        <div className="particle absolute top-[20%] right-[20%] w-1.5 h-1.5 bg-emerald-500/20 rounded-full" />
        <div className="particle absolute top-[40%] left-[10%] w-1 h-1 bg-white/20 rounded-full" />
        <div className="particle absolute top-[60%] right-[15%] w-1 h-1 bg-emerald-500/25 rounded-full" />
        <div className="particle absolute top-[80%] left-[25%] w-1.5 h-1.5 bg-white/15 rounded-full" />
        <div className="particle absolute top-[30%] left-[50%] w-1 h-1 bg-emerald-500/20 rounded-full" />
        <div className="particle absolute top-[70%] right-[30%] w-1 h-1 bg-white/20 rounded-full" />
        <div className="particle absolute top-[50%] left-[80%] w-1.5 h-1.5 bg-emerald-500/15 rounded-full" />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20,184,166,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,184,166,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a1a14]/50" />
    </div>
  );
};

export default BackgroundAnimation;
