import React from "react";
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
  Twitter, 
  Globe, 
  ArrowUpRight 
} from "lucide-react";

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
  { label: "Deviantart", url: "https://www.deviantart.com/denka-maoda-pedro", icon: Twitter },
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
      {/* Background Effects */}
      <div className="noise-bg mix-blend-overlay"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent/10 blur-[150px] pointer-events-none" />
      
      <motion.div 
        className="relative z-10 w-full max-w-[600px] mx-auto flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Profile */}
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center mb-10">
          <div className="relative group mb-6">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-accent opacity-75 blur-md group-hover:opacity-100 transition-opacity duration-500"></div>
            <img 
              src={PROFILE.avatar} 
              alt={PROFILE.name} 
              className="relative w-28 h-28 rounded-full object-cover border-2 border-background/50 z-10"
            />
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
