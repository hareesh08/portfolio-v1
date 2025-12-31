import { useState } from "react";
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

  // Generate masked version
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
    } else {
      setError(true);
      setPassword("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowModal(false);
    }
  };

  if (isAuthorized) {
    return <span className={className}>{value}</span>;
  }

  return (
    <>
      {/* Masked data with click to reveal */}
      <span
        onClick={handleClick}
        className={`relative cursor-pointer group ${inline ? "inline-flex items-center gap-1" : ""} ${className}`}
      >
        <span className="blur-[3px] select-none">{maskedValue}</span>
        <span className="absolute inset-0 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Lock className="w-3 h-3 text-primary mr-1" />
          <span className="text-xs text-primary font-medium">Click to reveal</span>
        </span>
      </span>

      {/* Password Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
          onKeyDown={handleKeyDown}
        >
          <div 
            className="relative w-full max-w-sm mx-4 p-6 rounded-2xl bg-card border border-border shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Protected Information</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Enter password to view sensitive data
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Enter password"
                  autoFocus
                  className={`w-full px-4 py-3 pr-10 rounded-xl bg-secondary/50 border ${
                    error ? "border-red-500" : "border-border"
                  } text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {error && (
                <p className="text-red-500 text-sm mb-4 text-center">
                  Incorrect password. Please try again.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Unlock
              </button>
            </form>

            {/* Hint */}
            <p className="text-xs text-muted-foreground/60 text-center mt-4">
              Contact me for access credentials
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProtectedData;
