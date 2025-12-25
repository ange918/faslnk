"use client";

import { useState } from "react";
import { 
  ArrowLeftIcon,
  PhoneIcon,
  VideoCameraIcon,
  PaperAirplaneIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/app/lib/utils";

interface MessagesViewProps {
  onBack: () => void;
}

export default function MessagesView({ onBack }: MessagesViewProps) {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [messages, setMessages] = useState([
    { id: 1, sender: "Marie Dupont", text: "Bonjour Ange, avez-vous pu avancer sur les mesures ?", time: "10:30", isMe: false },
    { id: 2, sender: "Moi", text: "Oui Marie, tout est prêt. Je vous envoie le récapitulatif dans l'après-midi.", time: "10:32", isMe: true },
  ]);
  const [input, setInput] = useState("");

  const chats = [
    { id: 1, name: "Marie Dupont", lastMsg: "Super ! J'ai hâte de voir...", time: "10:35", unread: 2 },
    { id: 2, name: "Jean Laurent", lastMsg: "Le tissu est arrivé hier.", time: "Hier", unread: 0 },
    { id: 3, name: "Sarah Mensah", lastMsg: "Est-ce possible de changer...", time: "Lun", unread: 0 },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { 
      id: Date.now(), 
      sender: "Moi", 
      text: input, 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      isMe: true 
    }]);
    setInput("");
  };

  if (selectedChat) {
    return (
      <div className="fixed inset-0 bg-white z-[60] flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
        <header className="p-6 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedChat(null)} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-black rounded-2xl flex items-center justify-center font-bold text-white text-xs">
                {selectedChat.name[0]}
              </div>
              <div>
                <p className="font-bold text-sm tracking-tight">{selectedChat.name}</p>
                <p className="text-[9px] text-green-500 font-bold uppercase tracking-widest mt-0.5">En ligne</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-black transition-colors"><PhoneIcon className="w-5 h-5" /></button>
            <button className="p-2 text-gray-400 hover:text-black transition-colors"><VideoCameraIcon className="w-5 h-5" /></button>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-6 overflow-y-auto bg-gray-50/30">
          <div className="text-center">
            <span className="px-3 py-1 bg-gray-100 text-[9px] font-bold text-gray-400 uppercase tracking-widest rounded-full">Aujourd'hui</span>
          </div>
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={cn(
                "flex flex-col max-w-[80%]",
                msg.isMe ? "ml-auto items-end" : "items-start"
              )}
            >
              <div className={cn(
                "px-5 py-3.5 rounded-3xl text-[13px] leading-relaxed shadow-sm",
                msg.isMe ? "bg-black text-white rounded-tr-none" : "bg-white border border-gray-100 rounded-tl-none"
              )}>
                {msg.text}
              </div>
              <span className="text-[9px] text-gray-400 mt-2 px-1 font-bold uppercase tracking-wider">{msg.time}</span>
            </div>
          ))}
        </main>

        <div className="p-6 border-t border-gray-100 bg-white">
          <form onSubmit={handleSend} className="flex items-center gap-3 max-w-2xl mx-auto w-full">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écrire un message..."
              className="flex-1 bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm outline-none focus:bg-white focus:border-black/10 transition-all shadow-inner"
            />
            <button 
              type="submit"
              className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/10"
            >
              <PaperAirplaneIcon className="w-5 h-5 -rotate-45" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] animate-in fade-in duration-500">
      <header className="p-6 bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto w-full flex items-center justify-between">
          <h1 className="text-xl font-bold uppercase tracking-widest text-black">Messages</h1>
          <button className="p-2.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-400">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="p-6 max-w-2xl mx-auto w-full space-y-4">
        {chats.map((chat) => (
          <button 
            key={chat.id} 
            onClick={() => setSelectedChat(chat)}
            className="w-full bg-white border border-gray-100 p-5 rounded-[28px] shadow-sm flex items-center gap-4 group active:scale-[0.98] transition-all text-left"
          >
            <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center font-bold text-white text-lg shrink-0 shadow-inner">
              {chat.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-sm tracking-tight text-black">{chat.name}</h3>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">{chat.time}</span>
              </div>
              <p className="text-xs text-gray-400 truncate pr-6">{chat.lastMsg}</p>
            </div>
            {chat.unread > 0 && (
              <div className="w-5 h-5 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {chat.unread}
              </div>
            )}
          </button>
        ))}
      </main>
    </div>
  );
}
