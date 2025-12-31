import { useState, useEffect } from "react";
import { 
  User, Code, FolderGit2, Briefcase, Mail, FileText, 
  Wifi, Battery, Volume2, Search, ChevronUp
} from "lucide-react";
import IDEWindow from "./IDEWindow";

interface DesktopIcon {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const desktopIcons: DesktopIcon[] = [
  { id: "about", label: "About.tsx", icon: <User className="w-8 h-8" /> },
  { id: "skills", label: "Skills.json", icon: <Code className="w-8 h-8" /> },
  { id: "projects", label: "Projects", icon: <FolderGit2 className="w-8 h-8" /> },
  { id: "experience", label: "Experience.md", icon: <Briefcase className="w-8 h-8" /> },
  { id: "contact", label: "Contact.tsx", icon: <Mail className="w-8 h-8" /> },
];

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState<string[]>(["about"]);
  const [activeWindow, setActiveWindow] = useState<string>("about");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openWindow = (id: string) => {
    if (minimizedWindows.includes(id)) {
      setMinimizedWindows(prev => prev.filter(w => w !== id));
    }
    if (!openWindows.includes(id)) {
      setOpenWindows(prev => [...prev, id]);
    }
    setActiveWindow(id);
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w !== id));
    setMinimizedWindows(prev => prev.filter(w => w !== id));
    if (activeWindow === id) {
      const remaining = openWindows.filter(w => w !== id);
      setActiveWindow(remaining[remaining.length - 1] || "");
    }
  };

  const minimizeWindow = (id: string) => {
    setMinimizedWindows(prev => [...prev, id]);
    if (activeWindow === id) {
      const remaining = openWindows.filter(w => w !== id && !minimizedWindows.includes(w));
      setActiveWindow(remaining[remaining.length - 1] || "");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="h-screen w-screen bg-[#1e1e2e] overflow-hidden flex flex-col">
      {/* Desktop Area */}
      <div className="flex-1 relative p-4 overflow-hidden">
        {/* Wallpaper gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1e1e2e] via-[#2a2a40] to-[#1a1a2e]" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
        
        {/* Desktop Icons */}
        <div className="relative z-10 grid grid-cols-1 gap-2 w-24">
          {desktopIcons.map((icon) => (
            <button
              key={icon.id}
              onDoubleClick={() => openWindow(icon.id)}
              onClick={() => openWindow(icon.id)}
              className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-white/10 transition-colors group"
            >
              <div className="text-white/80 group-hover:text-white transition-colors">
                {icon.icon}
              </div>
              <span className="text-xs text-white/80 group-hover:text-white text-center font-mono">
                {icon.label}
              </span>
            </button>
          ))}
        </div>

        {/* Windows */}
        {openWindows.map((windowId, index) => (
          <IDEWindow
            key={windowId}
            id={windowId}
            isActive={activeWindow === windowId}
            isMinimized={minimizedWindows.includes(windowId)}
            zIndex={openWindows.indexOf(windowId) + 10}
            onClose={() => closeWindow(windowId)}
            onMinimize={() => minimizeWindow(windowId)}
            onFocus={() => setActiveWindow(windowId)}
            initialPosition={{ 
              x: 120 + index * 30, 
              y: 20 + index * 30 
            }}
          />
        ))}
      </div>

      {/* Taskbar */}
      <div className="h-12 bg-[#181825]/95 backdrop-blur border-t border-[#313244] flex items-center px-4 relative z-50">
        {/* Start button */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/10 transition-colors">
          <div className="w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-500 rounded" />
        </button>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-1.5 ml-2 bg-[#313244] rounded-full">
          <Search className="w-4 h-4 text-white/50" />
          <span className="text-sm text-white/50 hidden sm:inline">Search</span>
        </div>

        {/* Open windows */}
        <div className="flex-1 flex items-center gap-1 ml-4 overflow-x-auto">
          {openWindows.map((windowId) => {
            const icon = desktopIcons.find(i => i.id === windowId);
            const isMinimized = minimizedWindows.includes(windowId);
            return (
              <button
                key={windowId}
                onClick={() => openWindow(windowId)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
                  activeWindow === windowId && !isMinimized
                    ? "bg-white/20 border-b-2 border-blue-500" 
                    : "hover:bg-white/10"
                } ${isMinimized ? "opacity-50" : ""}`}
              >
                <span className="text-white/80">{icon?.icon && <span className="w-4 h-4 [&>svg]:w-4 [&>svg]:h-4">{icon.icon}</span>}</span>
                <span className="text-sm text-white/80 hidden md:inline">{icon?.label}</span>
              </button>
            );
          })}
        </div>

        {/* System tray */}
        <div className="flex items-center gap-3 text-white/70">
          <ChevronUp className="w-4 h-4 hidden sm:block" />
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4 hidden sm:block" />
          <Battery className="w-4 h-4" />
          <div className="text-right text-xs pl-3 border-l border-[#313244]">
            <div>{formatTime(currentTime)}</div>
            <div className="text-white/50">{formatDate(currentTime)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desktop;
