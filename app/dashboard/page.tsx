"use client";

import { useState } from "react";
import { 
  Bars3Icon, 
  UserCircleIcon, 
  SparklesIcon,
  UserGroupIcon,
  AcademicCapIcon as RulerIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  PaperAirplaneIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/lib/utils";

export default function DashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", content: "Bienvenue sur FASHLINK. Je suis ton assistant de direction créative. Dis-moi ce que tu veux créer aujourd'hui." }
  ]);
  const [input, setInput] = useState("");

  const menuItems = [
    { name: "Mon profil", icon: UserCircleIcon },
    { name: "ADN créatif", icon: SparklesIcon },
    { name: "Mes clients", icon: UserGroupIcon },
    { name: "Prendre des mesures", icon: RulerIcon },
    { name: "Messages", icon: ChatBubbleLeftRightIcon },
    { name: "Paramètres", icon: Cog6ToothIcon },
    { name: "Déconnexion", icon: ArrowLeftOnRectangleIcon, color: "text-red-500" },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages([...messages, { id: Date.now(), role: "user", content: input }]);
    setInput("");
    
    // Simple mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: "assistant", 
        content: "C'est une excellente idée. Je vais t'aider à développer ce concept créatif." 
      }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-black/5 flex items-center justify-between px-4 z-40">
        <button onClick={() => setIsMenuOpen(true)} className="p-2 hover:bg-black/5 rounded-full transition-colors">
          <Bars3Icon className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold tracking-widest">FASHLINK</h1>
        <button className="p-1 border-2 border-black/10 rounded-full">
          <UserCircleIcon className="w-8 h-8 text-gray-400" />
        </button>
      </header>

      {/* Main Chat Interface */}
      <main className="flex-1 pt-20 pb-24 px-4 max-w-2xl mx-auto w-full flex flex-col">
        <div className="flex-1 space-y-6">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={cn(
                "flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                msg.role === "user" ? "flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                msg.role === "assistant" ? "bg-black text-white" : "bg-gold text-black"
              )}>
                {msg.role === "assistant" ? <SparklesIcon className="w-5 h-5" /> : <UserCircleIcon className="w-5 h-5" />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed",
                msg.role === "assistant" ? "bg-gray-100" : "bg-black text-white"
              )}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Input Area */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent">
        <form onSubmit={handleSend} className="max-w-2xl mx-auto relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Décris ton idée de collection..."
            className="w-full bg-gray-100 border border-black/5 rounded-2xl px-5 py-4 pr-14 outline-none focus:border-gold/50 transition-all text-sm"
          />
          <button 
            type="submit"
            className="absolute right-2 top-2 bottom-2 aspect-square bg-black text-white rounded-xl flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <PaperAirplaneIcon className="w-5 h-5 -rotate-45" />
          </button>
        </form>
      </div>

      {/* Burger Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-xs bg-white z-50 p-6 flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <span className="text-xl font-bold tracking-widest">MENU</span>
                <button onClick={() => setIsMenuOpen(false)}>
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => (
                  <button 
                    key={item.name}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium",
                      item.color || "text-gray-700"
                    )}
                  >
                    <item.icon className="w-6 h-6" />
                    {item.name}
                  </button>
                ))}
              </nav>

              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 p-2">
                  <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center font-bold">A</div>
                  <div>
                    <p className="text-sm font-bold">Ange Kouamé</p>
                    <p className="text-xs text-gray-400">Styliste Senior</p>
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
