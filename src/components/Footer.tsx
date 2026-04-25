import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
             <span>Built by Hareesh</span>
           </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/hareesh08"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-emerald-500 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/hareesh-d-50147727b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-emerald-500 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:hareeshworksofficial@gmail.com"
              className="text-muted-foreground hover:text-emerald-500 transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          <p className="text-sm text-muted-foreground font-mono">© {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
