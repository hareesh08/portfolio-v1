import { useState, useEffect } from "react";
import { Menu, X, Download, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const navLinks = [
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-strong" : "bg-transparent"}`}
      >
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="panel-card px-4 py-3 flex items-center justify-between gap-4" role="navigation" aria-label="Main navigation">
            <a href="#" className="flex items-center gap-3" aria-label="Hareesh Ragavendra Portfolio Home">
              <div className="w-11 h-11 rounded-2xl overflow-hidden border border-white/80 shadow-[0_12px_24px_rgba(255,157,157,0.45)]">
                <img src="./profile.png" alt="Hareesh Ragavendra" className="w-full h-full object-cover" decoding="async" />
              </div>
              <div>
                <div className="font-black leading-none" style={{ color: "rgb(20, 20, 20)" }}>Hareesh</div>
                <div className="text-[11px] uppercase tracking-[0.2em]" style={{ color: "rgba(20, 20, 20, 0.55)" }}>Portfolio</div>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-2" role="menubar">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="chip hover:!border-pink hover:!text-pink transition-colors" role="menuitem">
                  {link.label}
                </a>
              ))}
            </div>

            <a
              href="./Hareesh_Ragavendra_Resume.pdf"
              download={isAuthorized}
              onClick={handleResumeClick}
              className="hidden md:inline-flex items-center gap-2 sticker px-4 py-2"
              aria-label={isAuthorized ? "Download Resume" : "Resume (Requires Password)"}
            >
              {isAuthorized ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              Resume
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2"
              style={{ color: "rgba(20, 20, 20, 0.8)" }}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div id="mobile-menu" className="md:hidden absolute top-full left-0 right-0 px-4 pt-2" role="menu">
              <div className="panel-card p-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-2xl border border-white/70 bg-white/80 transition-all"
                    style={{ color: "rgb(20, 20, 20)" }}
                    role="menuitem"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="./Hareesh_Ragavendra_Resume.pdf"
                  download={isAuthorized}
                  onClick={handleResumeClick}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 sticker mt-4"
                  role="menuitem"
                  aria-label={isAuthorized ? "Download Resume" : "Resume (Requires Password)"}
                >
                  {isAuthorized ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  Resume
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Password Modal */}
        {showPasswordModal && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center md:backdrop-blur-md px-4"
            style={{ background: "rgba(255, 230, 220, 0.45)" }}
            onClick={() => setShowPasswordModal(false)}
            onKeyDown={(e) => e.key === "Escape" && setShowPasswordModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
          >
            <div
              className="w-full max-w-sm panel-card overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-pink border border-pink/70 flex items-center justify-center mb-4 shadow-[0_18px_40px_rgba(255,157,157,0.5)]" aria-hidden="true">
                    <Lock className="w-8 h-8 text-black" />
                  </div>
                  <h3 id="resume-modal-title" className="text-xl font-black" style={{ color: "rgb(20, 20, 20)" }}>Download Resume</h3>
                  <p className="text-sm mt-1" style={{ color: "rgba(20, 20, 20, 0.6)" }}>Enter password to access</p>
                </div>

                <form onSubmit={handlePasswordSubmit}>
                  <div className="relative mb-4">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(false); }}
                      placeholder="Enter password"
                      autoFocus
                      className={`w-full px-4 py-3 border border-white/80 rounded-2xl text-black placeholder:text-black/40 outline-none bg-white/65 backdrop-blur ${error ? "ring-2 ring-pink" : "focus:ring-2 focus:ring-pink"}`}
                      aria-label="Password input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-pink transition-colors"
                      style={{ color: "rgba(20, 20, 20, 0.55)" }}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" aria-hidden="true" /> : <Eye className="w-5 h-5" aria-hidden="true" />}
                    </button>
                  </div>

                  {error && (
                    <p className="text-pink text-sm text-center mb-4" role="alert">Incorrect password</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 sticker transition-all"
                  >
                    Unlock
                  </button>
                </form>

                <p className="text-xs text-center mt-4" style={{ color: "rgba(20, 20, 20, 0.45)" }}>
                  Contact me for access
                </p>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default Navbar;
