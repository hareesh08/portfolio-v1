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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-strong" : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
                <img src="./profile.png" alt="H" className="w-full h-full object-cover" />
              </div>
              <span className="font-semibold text-white hidden sm:block">Hareesh</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Resume Button */}
            <a
              href="./Hareesh_Ragavendra_Resume.pdf"
              download={isAuthorized}
              onClick={handleResumeClick}
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-full text-black text-sm font-medium transition-all"
            >
              {isAuthorized ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              Resume
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 glass-strong border-t border-white/10">
              <div className="p-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-white/70 hover:text-white rounded-xl hover:bg-white/10 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="./Hareesh_Ragavendra_Resume.pdf"
                  download={isAuthorized}
                  onClick={handleResumeClick}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-amber-500 rounded-xl text-black font-medium mt-4"
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setShowPasswordModal(false)}
        >
          <div
            className="w-full max-w-sm glass-card rounded-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mb-4">
                  <Lock className="w-8 h-8 text-amber-500" />
                </div>
                <h3 className="text-xl font-semibold text-white">Download Resume</h3>
                <p className="text-sm text-white/50 mt-1">Enter password to access</p>
              </div>

              <form onSubmit={handlePasswordSubmit}>
                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(false); }}
                    placeholder="Enter password"
                    autoFocus
                    className={`w-full px-4 py-3 glass rounded-xl text-white placeholder:text-white/30 outline-none ${
                      error ? "ring-2 ring-red-500" : "focus:ring-2 focus:ring-amber-500"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {error && (
                  <p className="text-red-400 text-sm text-center mb-4">Incorrect password</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-500 hover:bg-amber-600 rounded-xl text-black font-medium transition-all"
                >
                  Unlock
                </button>
              </form>

              <p className="text-xs text-white/30 text-center mt-4">
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
