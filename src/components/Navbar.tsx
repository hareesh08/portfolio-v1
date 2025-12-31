import { useState, useEffect } from "react";
import { Menu, X, Download, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { href: "#skills", label: "./skills" },
  { href: "#projects", label: "./projects" },
  { href: "#experience", label: "./experience" },
  { href: "#contact", label: "./contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const { isAuthorized, checkPassword } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleResumeClick = (e: React.MouseEvent) => {
    if (!isAuthorized) {
      e.preventDefault();
      setShowPasswordModal(true);
      setError(false);
      setPassword("");
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkPassword(password)) {
      setShowPasswordModal(false);
      window.open("./Hareesh_Ragavendra_Resume.pdf", "_blank");
    } else {
      setError(true);
      setPassword("");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${
        isScrolled ? "bg-[#0a0a0a]/95 backdrop-blur border-b border-[#00ff00]/20" : "bg-transparent"
      }`}
    >
      <nav className="container px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="terminal-cyan">❯</span>
            <span className="terminal-text group-hover:glow-primary transition-all">hareesh</span>
            <span className="terminal-dim">@portfolio</span>
            <span className="terminal-text cursor-blink">_</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="terminal-dim hover:terminal-text transition-colors text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Resume Button */}
          <div className="hidden md:block">
            <a
              href="./Hareesh_Ragavendra_Resume.pdf"
              download={isAuthorized}
              onClick={handleResumeClick}
              className="flex items-center gap-2 px-3 py-1.5 border border-[#00ff00]/50 terminal-text hover:bg-[#00ff00] hover:text-[#0a0a0a] transition-all text-sm"
            >
              {isAuthorized ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>resume.pdf</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden terminal-text p-2"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/98 border-b border-[#00ff00]/20">
            <div className="container px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block terminal-dim hover:terminal-text transition-colors py-2"
                >
                  <span className="terminal-cyan mr-2">❯</span>
                  {link.label}
                </a>
              ))}
              <a
                href="./Hareesh_Ragavendra_Resume.pdf"
                download={isAuthorized}
                onClick={handleResumeClick}
                className="flex items-center gap-2 px-3 py-2 border border-[#00ff00]/50 terminal-text hover:bg-[#00ff00] hover:text-[#0a0a0a] transition-all text-sm w-full justify-center mt-4"
              >
                {isAuthorized ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                <span>resume.pdf</span>
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Password Modal */}
      {showPasswordModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
          onClick={() => setShowPasswordModal(false)}
        >
          <div
            className="relative w-full max-w-sm mx-4 rounded border border-[#00ff00]/30 bg-[#0a0a0a] shadow-[0_0_50px_rgba(0,255,0,0.2)] overflow-hidden font-mono"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-[#111] border-b border-[#00ff00]/20">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
                <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
                <div className="w-2 h-2 rounded-full bg-[#27ca40]" />
              </div>
              <span className="ml-2 text-[#606060] text-xs">auth.sh</span>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <span className="terminal-cyan text-sm">❯</span>
                <span className="terminal-text text-sm ml-2">$ sudo download resume.pdf</span>
              </div>
              
              <div className="terminal-dim text-xs mb-4">
                [sudo] password required for download:
              </div>

              <form onSubmit={handlePasswordSubmit}>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    placeholder="Enter password..."
                    autoFocus
                    className="w-full px-3 py-2 bg-[#111] border border-[#00ff00]/30 terminal-text text-sm outline-none focus:border-[#00ff00] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 terminal-dim hover:terminal-text transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {error && (
                  <div className="terminal-red text-xs mb-4">
                    Error: Authentication failed. Incorrect password.
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 py-2 border border-[#606060] terminal-dim hover:terminal-white transition-colors text-sm"
                  >
                    cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 border border-[#00ff00] terminal-text hover:bg-[#00ff00] hover:text-[#0a0a0a] transition-all text-sm"
                  >
                    authenticate
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
