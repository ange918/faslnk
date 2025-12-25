"use client";

import { useState } from "react";
import { 
  Bars3Icon, 
  UserCircleIcon, 
  SparklesIcon,
  UserGroupIcon,
  RulerIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  PaperAirplaneIcon,
  XMarkIcon,
  BriefcaseIcon,
  ArrowUpTrayIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface DashboardProps {
  userFirstName?: string;
}

export default function DashboardPage({ userFirstName = "Ange" }: DashboardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "adn" | "projects" | "measurements">("chat");
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", content: `Bonjour ${userFirstName}, prêt à créer ?` }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { id: Date.now(), role: "user", content: input }]);
    setInput("");
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: "assistant", 
        content: "C'est une excellente idée. Je vais t'aider à développer ce concept créatif." 
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-black flex flex-col font-sans">
      {/* Header Fixe */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 z-40">
        <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
          <Bars3Icon className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold tracking-[0.2em] text-black">FASHLINK</h1>
        <button className="p-1 hover:bg-gray-50 rounded-full transition-colors">
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
            <UserCircleIcon className="w-6 h-6 text-gray-400" />
          </div>
        </button>
      </header>

      {/* Interface Principale */}
      <main className="flex-1 pt-16 flex flex-col">
        {activeTab === "chat" && (
          <div className="flex-1 flex flex-col pb-24">
            <div className="px-6 pt-10 pb-6 max-w-2xl mx-auto w-full">
              <h2 className="text-3xl font-bold tracking-tight mb-2">Bonjour {userFirstName},</h2>
              <p className="text-gray-500 text-lg">prêt à créer ?</p>
            </div>

            <div className="flex-1 px-6 space-y-8 max-w-2xl mx-auto w-full">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={cn(
                    "flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-400",
                    msg.role === "user" ? "flex-row-reverse" : ""
                  )}
                >
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                    msg.role === "assistant" ? "bg-black text-white" : "bg-white border border-gray-200 text-gray-400"
                  )}>
                    {msg.role === "assistant" ? <SparklesIcon className="w-5 h-5" /> : <UserCircleIcon className="w-5 h-5" />}
                  </div>
                  <div className={cn(
                    "p-5 rounded-2xl max-w-[85%] text-[15px] leading-relaxed shadow-sm",
                    msg.role === "assistant" ? "bg-white border border-gray-100" : "bg-black text-white"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Chat */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#F9FAFB] via-[#F9FAFB] to-transparent">
              <form onSubmit={handleSend} className="max-w-2xl mx-auto relative group">
                <div className="absolute inset-0 bg-black/5 rounded-3xl blur-xl group-focus-within:bg-black/10 transition-all opacity-0 group-focus-within:opacity-100" />
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Décrivez votre idée de collection..."
                  className="relative w-full bg-white border border-gray-200 rounded-2xl px-6 py-5 pr-16 outline-none shadow-sm focus:border-black/20 focus:ring-4 focus:ring-black/5 transition-all text-[15px]"
                />
                <button 
                  type="submit"
                  className="absolute right-2.5 top-2.5 bottom-2.5 aspect-square bg-black text-white rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors shadow-lg active:scale-95"
                >
                  <PaperAirplaneIcon className="w-5 h-5 -rotate-45" />
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "adn" && <ADNCreatifView onBack={() => setActiveTab("chat")} />}
        {activeTab === "projects" && <ProjectsView onBack={() => setActiveTab("chat")} />}
      </main>

      {/* Menu Burger */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-white z-50 p-8 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-12">
                <span className="text-xl font-bold tracking-[0.3em]">MENU</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                  <XMarkIcon className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              <nav className="flex-1 space-y-1">
                <MenuButton icon={UserCircleIcon} label="Mon Profil" onClick={() => setIsMenuOpen(false)} />
                <MenuButton icon={SparklesIcon} label="ADN Créatif" onClick={() => { setActiveTab("adn"); setIsMenuOpen(false); }} />
                <MenuButton icon={SparklesIcon} label="Assistant IA" onClick={() => { setActiveTab("chat"); setIsMenuOpen(false); }} />
                <MenuButton icon={BriefcaseIcon} label="Mes Projets" onClick={() => { setActiveTab("projects"); setIsMenuOpen(false); }} />
                <MenuButton icon={RulerIcon} label="Mesures Clients" onClick={() => setIsMenuOpen(false)} />
                <MenuButton icon={ArrowUpTrayIcon} label="Export & Certificats" onClick={() => setIsMenuOpen(false)} />
                <MenuButton icon={Cog6ToothIcon} label="Paramètres" onClick={() => setIsMenuOpen(false)} />
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <MenuButton icon={ArrowLeftOnRectangleIcon} label="Déconnexion" color="text-red-500" onClick={() => window.location.reload()} />
                </div>
              </nav>

              <div className="pt-8 border-t border-gray-100 mt-auto">
                <div className="flex items-center gap-4 p-2 bg-gray-50 rounded-2xl">
                  <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-inner">
                    {userFirstName[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold">{userFirstName} Kouamé</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Styliste Senior</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuButton({ icon: Icon, label, color, onClick }: { icon: any, label: string, color?: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all text-[15px] font-medium group",
        color || "text-gray-700"
      )}
    >
      <Icon className="w-6 h-6 opacity-70 group-hover:opacity-100 transition-opacity" />
      {label}
    </button>
  );
}

function ADNCreatifView({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [generated, setGenerated] = useState(false);

  if (generated) {
    return (
      <div className="px-6 py-10 max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-2xl font-bold mb-8 uppercase tracking-widest">Votre ADN Créatif</h2>
        <div className="bg-black text-white rounded-3xl p-8 shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-16 -mt-16 rounded-full" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">Identité</p>
            <p className="text-xl font-light leading-relaxed">Fusion minimaliste entre héritage afro-centré et silhouettes architecturales modernes.</p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-1">Marché</p>
              <p className="font-bold">Luxe / Prêt-à-porter</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-1">Style</p>
              <p className="font-bold">Avant-garde</p>
            </div>
          </div>
          <button onClick={onBack} className="w-full py-4 border border-white/20 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
            Retour au Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-10 max-w-2xl mx-auto w-full flex-1 flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold uppercase tracking-widest">ADN Créatif</h2>
        <div className="flex gap-1">
          {[1, 2, 3].map(i => (
            <div key={i} className={cn("w-8 h-1 rounded-full", i <= step ? "bg-black" : "bg-gray-200")} />
          ))}
        </div>
      </div>

      <div className="space-y-8 flex-1">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Inspirations</label>
              <textarea 
                className="w-full bg-white border border-gray-200 rounded-2xl p-5 outline-none min-h-[150px] text-sm leading-relaxed focus:ring-4 focus:ring-black/5 transition-all"
                placeholder="Ex: Afro-futurisme, minimalisme, Bauhaus..."
              />
            </div>
            <Button onClick={() => setStep(2)}>Suivant</Button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Marché cible</label>
              <select className="w-full bg-white border border-gray-200 rounded-2xl p-5 outline-none text-sm appearance-none">
                <option>Luxe / Haute Couture</option>
                <option>Prêt-à-porter Premium</option>
                <option>Streetwear Design</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Gamme de prix</label>
              <select className="w-full bg-white border border-gray-200 rounded-2xl p-5 outline-none text-sm appearance-none">
                <option>Premium (200€ - 800€)</option>
                <option>Luxe (800€ - 3000€+)</option>
              </select>
            </div>
            <Button onClick={() => setStep(3)}>Suivant</Button>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Style Dominant</label>
              <div className="grid grid-cols-2 gap-3">
                {["Minimaliste", "Avant-garde", "Classique", "Eclectique"].map(style => (
                  <button key={style} className="p-4 border border-gray-200 rounded-2xl text-xs font-bold hover:border-black transition-all">
                    {style}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={() => setGenerated(true)} className="bg-black text-white hover:bg-gray-800">
              Générer mon ADN créatif
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectsView({ onBack }: { onBack: () => void }) {
  const projects = [
    { name: "Collection Harmattan", date: "12/03/2025", status: "Terminé" },
    { name: "Lumina S/S 26", date: "05/12/2025", status: "En cours" }
  ];

  return (
    <div className="px-6 py-10 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-bold uppercase tracking-widest">Mes Projets</h2>
        <button className="bg-black text-white p-3 rounded-xl shadow-lg active:scale-95">
          <XMarkIcon className="w-6 h-6 rotate-45" />
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((p, i) => (
          <div key={i} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Créé le {p.date}</p>
              </div>
              <span className={cn(
                "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest",
                p.status === "Terminé" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"
              )}>
                {p.status}
              </span>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-all border border-gray-100">
                <ArrowUpTrayIcon className="w-3 h-3" /> Export PDF
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-50 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-gray-100 transition-all border border-gray-100">
                <ShieldCheckIcon className="w-3 h-3" /> Certificat
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Button({ children, className, ...props }: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "w-full py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all active:scale-[0.98] border border-black/5 shadow-sm bg-black text-white hover:bg-gray-800",
        className
      )}
    >
      {children}
    </button>
  );
}
