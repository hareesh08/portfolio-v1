import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Lock, Eye, EyeOff, X } from "lucide-react";

interface ProtectedDataProps {
  value: string;
  masked?: string;
  className?: string;
  inline?: boolean;
}

const ProtectedData = ({ value, masked, className = "", inline = false }: ProtectedDataProps) => {
  const { isAuthorized, checkPassword } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showModal) {
      inputRef.current?.focus();
    }
  }, [showModal]);

  const maskedValue = masked || "•".repeat(Math.min(value.length, 12));

  const handleClick = () => {
    if (!isAuthorized) {
      setShowModal(true);
      setError(false);
      setPassword("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkPassword(password)) {
      setShowModal(false);
      triggerRef.current?.focus();
    } else {
      setError(true);
      setPassword("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowModal(false);
      triggerRef.current?.focus();
    }
  };

  if (isAuthorized) {
    return <span className={className}>{value}</span>;
  }

  return (
    <>
      <span
        ref={triggerRef}
        onClick={handleClick}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        tabIndex={0}
        role="button"
        aria-label="Click to reveal protected information"
        className={`relative cursor-pointer group ${inline ? "inline-flex items-center gap-1" : ""} ${className}`}
      >
        <span className="blur-[3px] select-none">{maskedValue}</span>
        <span className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Lock className="w-3 h-3 text-pink mr-1" aria-hidden="true" />
          <span className="text-xs text-pink font-medium">Click to reveal</span>
        </span>
      </span>

      {showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md"
          style={{ background: "rgba(255, 230, 220, 0.45)" }}
          onClick={() => setShowModal(false)}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="protected-modal-title"
        >
          <div
            className="relative w-full max-w-sm mx-4 p-6 rounded-2xl panel-card border border-white/80 shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg hover:text-pink transition-colors"
              style={{ color: "rgba(20, 20, 20, 0.55)" }}
              aria-label="Close modal"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink/20 border border-pink/40 mb-4" aria-hidden="true">
                <Lock className="w-5 h-5 text-pink" />
              </div>
              <h3 id="protected-modal-title" className="text-lg font-semibold" style={{ color: "rgb(20, 20, 20)" }}>Protected Information</h3>
              <p className="text-sm mt-1" style={{ color: "rgba(20, 20, 20, 0.6)" }}>
                Enter password to view sensitive data
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <input
                  ref={inputRef}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Enter password"
                  className={`w-full px-4 py-3 pr-10 rounded-xl bg-white/65 border backdrop-blur ${
                    error ? "border-pink" : "border-white/80"
                  } placeholder:text-black/40 focus:outline-none focus:border-pink transition-colors`}
                  style={{ color: "rgb(20, 20, 20)" }}
                  aria-label="Password input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-pink transition-colors"
                  style={{ color: "rgba(20, 20, 20, 0.55)" }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                </button>
              </div>

              {error && (
                <p className="text-pink text-sm mb-4 text-center" role="alert">
                  Incorrect password. Please try again.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl sticker font-medium transition-colors"
              >
                Unlock
              </button>
            </form>

            <p className="text-xs text-center mt-4" style={{ color: "rgba(20, 20, 20, 0.45)" }}>
              Contact me for access credentials
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProtectedData;
