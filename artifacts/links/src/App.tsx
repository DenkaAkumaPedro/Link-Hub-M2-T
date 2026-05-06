import React, { useEffect, useRef } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { motion } from "framer-motion";
import { 
  Instagram, 
  Youtube, 
  Github, 
  Linkedin, 
  Globe, 
  ArrowUpRight 
} from "lucide-react";

const Deviantart = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.207 4.794l.23-.43V0H15.07l-.436.44-2.058 3.925-.646.436H4.58v6.42h4.04l.36.436-4.4 8.388v4.36h4.368l.426-.44 2.07-3.925.644-.436h7.34v-6.42h-4.05l-.36-.438 4.19-7.95z"/>
  </svg>
);

// ====== EDITE AQUI: seus dados pessoais ======
const PROFILE = {
  name: "Modelo 2 Teste",
  bio: "HUEHUE TESTE.",
  avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSRQBpXi2sM7EYh88CyibizQ0OOGCHHJk0Aw&s", // Troque pela URL da sua foto
};

// ====== EDITE AQUI: seus links ======
const LINKS = [
  { label: "Site Pessoal", url: "https://example.com", icon: Globe },
  { label: "Instagram", url: "https://instagram.com", icon: Instagram },
  { label: "YouTube", url: "https://youtube.com", icon: Youtube },
  { label: "GitHub", url: "https://github.com", icon: Github },
  { label: "LinkedIn", url: "https://linkedin.com", icon: Linkedin },
  { label: "Deviantart", url: "https://www.deviantart.com/denka-maoda-pedro", icon: Deviantart },
];

// ====== EDITE AQUI: seus trabalhos favoritos ======
const WORKS = [
  { 
    title: "Project Alpha", 
    description: "Design system e plataforma web para fintech.", 
    image: "/work1.png", 
    url: "https://denkaakumapedro.wixsite.com/portfolio/trabalho-2" 
  },
  { 
    title: "Neon Dashboard", 
    description: "Interface analítica com foco em visualização de dados.", 
    image: "/work2.png", 
    url: "https://denkaakumapedro.wixsite.com/portfolio/trabalho-5" 
  },
];

function HexagonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const HEX_RADIUS = 32;
    const GAP = 6;
    const STEP = (HEX_RADIUS * 2 + GAP) * Math.sin(Math.PI / 3);
    const ROW_H = (HEX_RADIUS * 2 + GAP) * 0.75 + HEX_RADIUS * 0.5;

    type Hex = {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      phase: number;
      speed: number;
      amp: number;
      alpha: number;
      alphaTarget: number;
      alphaDelta: number;
    };

    const hexes: Hex[] = [];

    const cols = Math.ceil(window.innerWidth / STEP) + 2;
    const rows = Math.ceil(window.innerHeight / (ROW_H)) + 2;

    for (let row = -1; row < rows; row++) {
      for (let col = -1; col < cols; col++) {
        const offset = row % 2 === 0 ? 0 : STEP / 2;
        const bx = col * STEP + offset;
        const by = row * ROW_H;
        hexes.push({
          x: bx,
          y: by,
          baseX: bx,
          baseY: by,
          phase: Math.random() * Math.PI * 2,
          speed: 0.004 + Math.random() * 0.006,
          amp: 3 + Math.random() * 5,
          alpha: Math.random() * 0.12 + 0.03,
          alphaTarget: Math.random() * 0.12 + 0.03,
          alphaDelta: (Math.random() - 0.5) * 0.0004,
        });
      }
    }

    const drawHex = (x: number, y: number, r: number, alpha: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 180) * (60 * i - 30);
        const px = x + r * Math.cos(angle);
        const py = y + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    let t = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;

      for (const h of hexes) {
        h.phase += h.speed;
        h.x = h.baseX + Math.cos(h.phase) * h.amp;
        h.y = h.baseY + Math.sin(h.phase * 0.7) * h.amp * 0.6;

        h.alpha += h.alphaDelta;
        if (h.alpha > 0.18 || h.alpha < 0.02) h.alphaDelta *= -1;

        drawHex(h.x, h.y, HEX_RADIUS, h.alpha);
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

const queryClient = new QueryClient();

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center py-16 px-4 sm:px-6">
      {/* Hexagon Background */}
      <HexagonBackground />
      
      <motion.div 
        className="relative z-10 w-full max-w-[600px] mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Profile */}
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-10">
          <div className="relative group mb-6 w-32 h-32">
            <svg
              viewBox="0 0 120 120"
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 20, pointerEvents: "none" }}
            >
              <defs>
                <filter id="hex-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="hex-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgb(168,85,247)" />
                  <stop offset="100%" stopColor="rgb(6,182,212)" />
                </linearGradient>
              </defs>
              <polygon
                points="60,4 112,32 112,88 60,116 8,88 8,32"
                fill="none"
                stroke="url(#hex-grad)"
                strokeWidth="2"
                filter="url(#hex-glow)"
                className="transition-all duration-500 group-hover:opacity-100"
                opacity="0.85"
              />
            </svg>
            <svg
              viewBox="0 0 120 120"
              className="absolute inset-0 w-full h-full"
              style={{ zIndex: 10 }}
            >
              <defs>
                <clipPath id="hex-clip">
                  <polygon points="60,4 112,32 112,88 60,116 8,88 8,32" />
                </clipPath>
              </defs>
              <image
                href={PROFILE.avatar}
                x="0" y="0"
                width="120" height="120"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#hex-clip)"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/70">
            {PROFILE.name}
          </h1>
          <p className="text-muted-foreground max-w-[400px] leading-relaxed">
            {PROFILE.bio}
          </p>
        </motion.div>

        {/* Links List */}
        <motion.div variants={itemVariants} className="w-full flex flex-col gap-4 mb-14">
          {LINKS.map((link, idx) => {
            const Icon = link.icon;
            return (
              <a 
                key={idx} 
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between w-full p-4 rounded-2xl bg-card border border-card-border overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:-translate-y-1"
              >
                {/* Hover gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative flex items-center gap-4 z-10">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-lg">{link.label}</span>
                </div>
                
                <ArrowUpRight className="relative z-10 w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
              </a>
            );
          })}
        </motion.div>

        {/* Works Section */}
        <motion.div variants={itemVariants} className="w-full mb-10">
          <h2 className="text-xl font-semibold mb-6 text-foreground/90 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Trabalhos Favoritos
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {WORKS.map((work, idx) => (
              <a 
                key={idx}
                href={work.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl overflow-hidden bg-card border border-card-border transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:-translate-y-1"
              >
                <div className="w-full h-36 overflow-hidden relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                  <img 
                    src={work.image} 
                    alt={work.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-base mb-1 group-hover:text-accent transition-colors duration-300">
                    {work.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {work.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div variants={itemVariants} className="mt-8 text-center text-muted-foreground/60 text-sm">
          <p>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</p>
        </motion.div>

      </motion.div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
