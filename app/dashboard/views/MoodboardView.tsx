"use client";

import { 
  PhotoIcon, 
  PlusIcon,
  ArrowLeftIcon,
  RectangleStackIcon
} from "@heroicons/react/24/outline";

interface MoodboardViewProps {
  onBack: () => void;
}

export default function MoodboardView({ onBack }: MoodboardViewProps) {
  const boards = [
    { id: 1, title: "Lumina S/S 26", items: 12, date: "12 Mars 2025" },
    { id: 2, title: "Heritage Deep", items: 8, date: "05 Mars 2025" },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] animate-in fade-in duration-500">
      <header className="p-6 bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold uppercase tracking-widest text-black">Moodboard</h1>
          </div>
          <button className="p-2.5 bg-black text-white rounded-2xl shadow-lg active:scale-95 transition-all">
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="p-6 max-w-2xl mx-auto w-full space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {boards.map((board) => (
            <div key={board.id} className="bg-white border border-gray-100 p-6 rounded-[32px] shadow-sm group hover:border-black/5 transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                  <RectangleStackIcon className="w-6 h-6 text-gray-300" />
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-tight">{board.title}</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{board.items} Éléments • {board.date}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="aspect-square bg-gray-50 rounded-xl border border-gray-100 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/5" />
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 py-3.5 bg-gray-50 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all border border-gray-100/50">
                Ouvrir le Moodboard ➡
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
