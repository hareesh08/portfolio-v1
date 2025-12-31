import { useState, useRef, useEffect } from "react";
import { X, Minus, Square, Maximize2, ChevronRight, ChevronDown, FileCode, FileJson, FileText, Folder, FolderOpen, Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import ProtectedData from "./ProtectedData";
import { useAuth } from "@/context/AuthContext";

interface IDEWindowProps {
  id: string;
  isActive: boolean;
  isMinimized: boolean;
  zIndex: number;
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  initialPosition: { x: number; y: number };
}

const IDEWindow = ({ id, isActive, isMinimized, zIndex, onClose, onMinimize, onFocus, initialPosition }: IDEWindowProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState({ width: 900, height: 600 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);
  const { isAuthorized } = useAuth();

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: Math.max(0, e.clientX - dragOffset.x),
          y: Math.max(0, e.clientY - dragOffset.y),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  if (isMinimized) return null;

  const windowContent = getWindowContent(id, isAuthorized);

  return (
    <div
      ref={windowRef}
      onClick={onFocus}
      className={`absolute rounded-lg overflow-hidden window-shadow flex flex-col ${
        isActive ? "ring-2 ring-blue-500/50" : ""
      }`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 0 : position.y,
        width: isMaximized ? "100%" : size.width,
        height: isMaximized ? "calc(100% - 48px)" : size.height,
        zIndex: isActive ? 100 : zIndex,
      }}
    >
      {/* Title bar */}
      <div
        onMouseDown={handleMouseDown}
        onDoubleClick={toggleMaximize}
        className={`flex items-center h-9 px-3 cursor-move select-none ${
          isActive ? "bg-[#3c3f41]" : "bg-[#2b2b2b]"
        }`}
      >
        {/* Window controls */}
        <div className="flex items-center gap-2 mr-4">
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center group"
          >
            <X className="w-2 h-2 text-[#4a0002] opacity-0 group-hover:opacity-100" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 flex items-center justify-center group"
          >
            <Minus className="w-2 h-2 text-[#4a3600] opacity-0 group-hover:opacity-100" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
            className="w-3 h-3 rounded-full bg-[#27ca40] hover:bg-[#27ca40]/80 flex items-center justify-center group"
          >
            <Maximize2 className="w-2 h-2 text-[#004a00] opacity-0 group-hover:opacity-100" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 flex-1 overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#2b2b2b] rounded-t text-sm">
            <FileCode className="w-4 h-4 text-blue-400" />
            <span className="text-[#a9b7c6] truncate">{windowContent.filename}</span>
          </div>
        </div>

        {/* Title */}
        <span className="text-xs text-[#808080] ml-auto">
          JetBrains IDE
        </span>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex bg-[#2b2b2b] overflow-hidden">
        {/* Sidebar - File explorer */}
        <div className="w-48 bg-[#3c3f41] border-r border-[#323232] flex-shrink-0 hidden md:block">
          <div className="p-2 text-xs text-[#808080] uppercase tracking-wider border-b border-[#323232]">
            Project
          </div>
          <div className="p-2 text-sm">
            <FileTreeItem icon={<FolderOpen className="w-4 h-4 text-[#87939a]" />} label="portfolio" isOpen>
              <FileTreeItem icon={<Folder className="w-4 h-4 text-[#87939a]" />} label="src">
                <FileTreeItem icon={<FileCode className="w-4 h-4 text-blue-400" />} label="About.tsx" active={id === "about"} />
                <FileTreeItem icon={<FileJson className="w-4 h-4 text-yellow-400" />} label="Skills.json" active={id === "skills"} />
                <FileTreeItem icon={<Folder className="w-4 h-4 text-[#87939a]" />} label="Projects" active={id === "projects"} />
                <FileTreeItem icon={<FileText className="w-4 h-4 text-blue-300" />} label="Experience.md" active={id === "experience"} />
                <FileTreeItem icon={<FileCode className="w-4 h-4 text-blue-400" />} label="Contact.tsx" active={id === "contact"} />
              </FileTreeItem>
            </FileTreeItem>
          </div>
        </div>

        {/* Editor area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Breadcrumb */}
          <div className="h-6 bg-[#2b2b2b] border-b border-[#323232] flex items-center px-3 text-xs text-[#808080]">
            <span>portfolio</span>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span>src</span>
            <ChevronRight className="w-3 h-3 mx-1" />
            <span className="text-[#a9b7c6]">{windowContent.filename}</span>
          </div>

          {/* Code content */}
          <div className="flex-1 overflow-auto ide-scrollbar font-mono text-sm">
            {windowContent.content}
          </div>

          {/* Status bar */}
          <div className="h-6 bg-[#3c3f41] border-t border-[#323232] flex items-center justify-between px-3 text-xs text-[#808080]">
            <div className="flex items-center gap-4">
              <span>UTF-8</span>
              <span>LF</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{windowContent.language}</span>
              <span>Ln 1, Col 1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// File tree item component
const FileTreeItem = ({ 
  icon, 
  label, 
  children, 
  isOpen = false, 
  active = false 
}: { 
  icon: React.ReactNode; 
  label: string; 
  children?: React.ReactNode; 
  isOpen?: boolean; 
  active?: boolean;
}) => {
  const [open, setOpen] = useState(isOpen);
  const hasChildren = !!children;

  return (
    <div>
      <div
        onClick={() => hasChildren && setOpen(!open)}
        className={`flex items-center gap-1 py-0.5 px-1 rounded cursor-pointer ${
          active ? "bg-[#214283] text-white" : "hover:bg-[#4e5254] text-[#a9b7c6]"
        }`}
      >
        {hasChildren ? (
          open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />
        ) : (
          <span className="w-3" />
        )}
        {icon}
        <span className="truncate">{label}</span>
      </div>
      {hasChildren && open && <div className="ml-4">{children}</div>}
    </div>
  );
};

// Get content for each window type
const getWindowContent = (id: string, isAuthorized: boolean) => {
  switch (id) {
    case "about":
      return {
        filename: "About.tsx",
        language: "TypeScript React",
        content: <AboutContent isAuthorized={isAuthorized} />,
      };
    case "skills":
      return {
        filename: "Skills.json",
        language: "JSON",
        content: <SkillsContent />,
      };
    case "projects":
      return {
        filename: "Projects/index.ts",
        language: "TypeScript",
        content: <ProjectsContent />,
      };
    case "experience":
      return {
        filename: "Experience.md",
        language: "Markdown",
        content: <ExperienceContent isAuthorized={isAuthorized} />,
      };
    case "contact":
      return {
        filename: "Contact.tsx",
        language: "TypeScript React",
        content: <ContactContent isAuthorized={isAuthorized} />,
      };
    default:
      return {
        filename: "index.ts",
        language: "TypeScript",
        content: <div className="p-4 text-[#a9b7c6]">Select a file</div>,
      };
  }
};

// Content Components
const AboutContent = ({ isAuthorized }: { isAuthorized: boolean }) => (
  <div className="p-4">
    <CodeLine num={1}><span className="ide-keyword">const</span> <span className="ide-variable">developer</span> = {"{"}</CodeLine>
    <CodeLine num={2} indent={1}><span className="ide-function">name</span>: <span className="ide-string">"Hareesh Ragavendra"</span>,</CodeLine>
    <CodeLine num={3} indent={1}><span className="ide-function">role</span>: <span className="ide-string">"Android Developer & Full-Stack Engineer"</span>,</CodeLine>
    <CodeLine num={4} indent={1}><span className="ide-function">location</span>: <ProtectedData value='"Chennai, Tamil Nadu, India"' masked='"[REDACTED], India"' className="ide-string" />,</CodeLine>
    <CodeLine num={5} indent={1}><span className="ide-function">available</span>: <span className="ide-keyword">true</span>,</CodeLine>
    <CodeLine num={6}>{"}"}</CodeLine>
    <CodeLine num={7} />
    <CodeLine num={8}><span className="ide-comment">{"// About Me"}</span></CodeLine>
    <CodeLine num={9}><span className="ide-keyword">const</span> <span className="ide-variable">about</span> = <span className="ide-string">`</span></CodeLine>
    <CodeLine num={10} indent={1}><span className="ide-string">Passionate about building modern Android applications</span></CodeLine>
    <CodeLine num={11} indent={1}><span className="ide-string">with Kotlin and Jetpack Compose. Experienced in</span></CodeLine>
    <CodeLine num={12} indent={1}><span className="ide-string">full-stack development with Django REST Framework.</span></CodeLine>
    <CodeLine num={13}><span className="ide-string">`</span>;</CodeLine>
    <CodeLine num={14} />
    <CodeLine num={15}><span className="ide-comment">{"// Tech Stack"}</span></CodeLine>
    <CodeLine num={16}><span className="ide-keyword">const</span> <span className="ide-variable">techStack</span> = [</CodeLine>
    <CodeLine num={17} indent={1}><span className="ide-string">"Kotlin"</span>, <span className="ide-string">"Java"</span>, <span className="ide-string">"Python"</span>, <span className="ide-string">"C#"</span>,</CodeLine>
    <CodeLine num={18} indent={1}><span className="ide-string">"Jetpack Compose"</span>, <span className="ide-string">"Django"</span>, <span className="ide-string">"PostgreSQL"</span></CodeLine>
    <CodeLine num={19}>];</CodeLine>
    <CodeLine num={20} />
    <CodeLine num={21}><span className="ide-keyword">export</span> <span className="ide-keyword">default</span> developer;</CodeLine>
  </div>
);

const SkillsContent = () => (
  <div className="p-4">
    <CodeLine num={1}>{"{"}</CodeLine>
    <CodeLine num={2} indent={1}><span className="ide-function">"languages"</span>: [</CodeLine>
    <CodeLine num={3} indent={2}><span className="ide-string">"Kotlin"</span>, <span className="ide-string">"Java"</span>, <span className="ide-string">"Python"</span>, <span className="ide-string">"C#"</span></CodeLine>
    <CodeLine num={4} indent={1}>],</CodeLine>
    <CodeLine num={5} indent={1}><span className="ide-function">"android"</span>: [</CodeLine>
    <CodeLine num={6} indent={2}><span className="ide-string">"Jetpack Compose"</span>, <span className="ide-string">"Android NDK"</span>,</CodeLine>
    <CodeLine num={7} indent={2}><span className="ide-string">"REST APIs"</span>, <span className="ide-string">"MVVM"</span>, <span className="ide-string">"Retrofit"</span></CodeLine>
    <CodeLine num={8} indent={1}>],</CodeLine>
    <CodeLine num={9} indent={1}><span className="ide-function">"backend"</span>: [</CodeLine>
    <CodeLine num={10} indent={2}><span className="ide-string">"Django REST Framework"</span>, <span className="ide-string">"PostgreSQL"</span>,</CodeLine>
    <CodeLine num={11} indent={2}><span className="ide-string">"Git"</span>, <span className="ide-string">"cPanel"</span></CodeLine>
    <CodeLine num={12} indent={1}>],</CodeLine>
    <CodeLine num={13} indent={1}><span className="ide-function">"security"</span>: [</CodeLine>
    <CodeLine num={14} indent={2}><span className="ide-string">"Penetration Testing"</span>, <span className="ide-string">"Reverse Engineering"</span>,</CodeLine>
    <CodeLine num={15} indent={2}><span className="ide-string">"Burp Suite"</span>, <span className="ide-string">"Web Testing"</span></CodeLine>
    <CodeLine num={16} indent={1}>],</CodeLine>
    <CodeLine num={17} indent={1}><span className="ide-function">"stats"</span>: {"{"}</CodeLine>
    <CodeLine num={18} indent={2}><span className="ide-function">"languages"</span>: <span className="ide-number">4</span>,</CodeLine>
    <CodeLine num={19} indent={2}><span className="ide-function">"frameworks"</span>: <span className="ide-number">8</span>,</CodeLine>
    <CodeLine num={20} indent={2}><span className="ide-function">"tools"</span>: <span className="ide-number">15</span>,</CodeLine>
    <CodeLine num={21} indent={2}><span className="ide-function">"yearsExperience"</span>: <span className="ide-number">3</span></CodeLine>
    <CodeLine num={22} indent={1}>{"}"}</CodeLine>
    <CodeLine num={23}>{"}"}</CodeLine>
  </div>
);

const ProjectsContent = () => {
  const projects = [
    { name: "ServiceManager", desc: "Customer Service Management System", tech: "Kotlin, Django", featured: true },
    { name: "EECFate", desc: "ERP WebView Android App", tech: "Kotlin, Retrofit", featured: true },
    { name: "ButterAuth", desc: "Offline License Management", tech: "C#, JWT, AES", featured: false },
    { name: "MailSender", desc: "Report Automation Tool", tech: "Python, Pandas", featured: false },
  ];

  return (
    <div className="p-4">
      <CodeLine num={1}><span className="ide-comment">{"// Featured Projects"}</span></CodeLine>
      <CodeLine num={2}><span className="ide-keyword">import</span> {"{ Project }"} <span className="ide-keyword">from</span> <span className="ide-string">"@types"</span>;</CodeLine>
      <CodeLine num={3} />
      <CodeLine num={4}><span className="ide-keyword">export const</span> <span className="ide-variable">projects</span>: Project[] = [</CodeLine>
      {projects.map((project, idx) => (
        <div key={project.name}>
          <CodeLine num={5 + idx * 6} indent={1}>{"{"}</CodeLine>
          <CodeLine num={6 + idx * 6} indent={2}>
            <span className="ide-function">name</span>: <span className="ide-string">"{project.name}"</span>,
            {project.featured && <span className="ide-comment"> {"// ⭐ Featured"}</span>}
          </CodeLine>
          <CodeLine num={7 + idx * 6} indent={2}><span className="ide-function">description</span>: <span className="ide-string">"{project.desc}"</span>,</CodeLine>
          <CodeLine num={8 + idx * 6} indent={2}><span className="ide-function">tech</span>: <span className="ide-string">"{project.tech}"</span>,</CodeLine>
          <CodeLine num={9 + idx * 6} indent={2}>
            <span className="ide-function">github</span>: 
            <a href={`https://github.com/hareesh08/${project.name}`} target="_blank" rel="noopener noreferrer" className="ide-string hover:underline ml-1">
              "github.com/hareesh08/{project.name}"
            </a>
          </CodeLine>
          <CodeLine num={10 + idx * 6} indent={1}>{"},"}</CodeLine>
        </div>
      ))}
      <CodeLine num={29}>];</CodeLine>
      <CodeLine num={30} />
      <CodeLine num={31}><span className="ide-comment">{"// View all: "}</span>
        <a href="https://github.com/hareesh08" target="_blank" rel="noopener noreferrer" className="ide-string hover:underline">
          github.com/hareesh08
        </a>
      </CodeLine>
    </div>
  );
};

const ExperienceContent = ({ isAuthorized }: { isAuthorized: boolean }) => (
  <div className="p-4">
    <CodeLine num={1}><span className="ide-keyword"># Experience</span></CodeLine>
    <CodeLine num={2} />
    <CodeLine num={3}><span className="ide-function">## Work</span></CodeLine>
    <CodeLine num={4} />
    <CodeLine num={5}><span className="ide-string">### Android Developer Intern</span></CodeLine>
    <CodeLine num={6}><span className="ide-comment">Ky Technologies Pvt Ltd | Jan 2025 - Mar 2025</span></CodeLine>
    <CodeLine num={7}><span className="ide-text">- Built Customer Service Management System</span></CodeLine>
    <CodeLine num={8}><span className="ide-text">- JWT auth, geofencing, automated workflows</span></CodeLine>
    <CodeLine num={9} />
    <CodeLine num={10}><span className="ide-string">### Freelance Developer</span></CodeLine>
    <CodeLine num={11}><span className="ide-comment">Upwork | Jul 2021 - Jul 2022</span></CodeLine>
    <CodeLine num={12}><span className="ide-text">- Python web scraping & automation tools</span></CodeLine>
    <CodeLine num={13} />
    <CodeLine num={14}><span className="ide-function">## Education</span></CodeLine>
    <CodeLine num={15} />
    <CodeLine num={16}><span className="ide-string">### B.Tech Information Technology</span></CodeLine>
    <CodeLine num={17}><span className="ide-comment">SRM Easwari Engineering College | 2022 - 2026</span></CodeLine>
    <CodeLine num={18}><span className="ide-text">- CGPA: </span><ProtectedData value="7.75" masked="•.••" className="ide-number" /></CodeLine>
    <CodeLine num={19} />
    <CodeLine num={20}><span className="ide-function">## Certifications</span></CodeLine>
    <CodeLine num={21}><span className="ide-text">- Microsoft Azure Fundamentals (AZ-900)</span></CodeLine>
    <CodeLine num={22}><span className="ide-text">- Android App Development</span></CodeLine>
    <CodeLine num={23}><span className="ide-text">- Python Advance Course</span></CodeLine>
  </div>
);

const ContactContent = ({ isAuthorized }: { isAuthorized: boolean }) => (
  <div className="p-4">
    <CodeLine num={1}><span className="ide-keyword">interface</span> <span className="ide-class">Contact</span> {"{"}</CodeLine>
    <CodeLine num={2} indent={1}><span className="ide-variable">email</span>: <span className="ide-class">string</span>;</CodeLine>
    <CodeLine num={3} indent={1}><span className="ide-variable">phone</span>: <span className="ide-class">string</span>;</CodeLine>
    <CodeLine num={4} indent={1}><span className="ide-variable">social</span>: <span className="ide-class">Social</span>;</CodeLine>
    <CodeLine num={5}>{"}"}</CodeLine>
    <CodeLine num={6} />
    <CodeLine num={7}><span className="ide-keyword">const</span> <span className="ide-variable">contact</span>: Contact = {"{"}</CodeLine>
    <CodeLine num={8} indent={1}><span className="ide-function">email</span>: <ProtectedData value='"hareeshworksoffcial@gmail.com"' masked='"h•••••@gmail.com"' className="ide-string" />,</CodeLine>
    <CodeLine num={9} indent={1}><span className="ide-function">phone</span>: <ProtectedData value='"+91 80727 03652"' masked='"+91 •••••••••"' className="ide-string" />,</CodeLine>
    <CodeLine num={10} indent={1}><span className="ide-function">location</span>: <ProtectedData value='"Chennai, Tamil Nadu, India"' masked='"[REDACTED], India"' className="ide-string" />,</CodeLine>
    <CodeLine num={11} indent={1}><span className="ide-function">social</span>: {"{"}</CodeLine>
    <CodeLine num={12} indent={2}>
      <span className="ide-function">github</span>: 
      <a href="https://github.com/hareesh08" target="_blank" rel="noopener noreferrer" className="ide-string hover:underline ml-1 inline-flex items-center gap-1">
        "github.com/hareesh08" <ExternalLink className="w-3 h-3" />
      </a>,
    </CodeLine>
    <CodeLine num={13} indent={2}>
      <span className="ide-function">linkedin</span>: 
      <a href="https://linkedin.com/in/hareesh-d-50147727b" target="_blank" rel="noopener noreferrer" className="ide-string hover:underline ml-1 inline-flex items-center gap-1">
        "linkedin.com/in/hareesh-d" <ExternalLink className="w-3 h-3" />
      </a>
    </CodeLine>
    <CodeLine num={14} indent={1}>{"}"}</CodeLine>
    <CodeLine num={15}>{"}"}</CodeLine>
    <CodeLine num={16} />
    <CodeLine num={17}><span className="ide-comment">{"// Let's connect!"}</span></CodeLine>
    <CodeLine num={18}>
      <a 
        href="mailto:hareeshworksoffcial@gmail.com" 
        className="inline-flex items-center gap-2 px-3 py-1 mt-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs transition-colors"
      >
        <Mail className="w-3 h-3" />
        Send Email
      </a>
    </CodeLine>
  </div>
);

// Code line component with line numbers
const CodeLine = ({ num, children, indent = 0 }: { num: number; children?: React.ReactNode; indent?: number }) => (
  <div className="flex hover:bg-[#323232]/50 leading-6">
    <span className="line-number">{num}</span>
    <span style={{ paddingLeft: indent * 24 }}>{children || " "}</span>
  </div>
);

export default IDEWindow;
