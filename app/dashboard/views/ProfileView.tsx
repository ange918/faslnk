"use client";

import { 
  ArrowLeftIcon, 
  BriefcaseIcon,
  ShieldCheckIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/app/lib/utils";

interface ProfileViewProps {
  user: any;
  onBack: () => void;
}

export default function ProfileView({ user, onBack }: ProfileViewProps) {
  const isOccupied = false; // Mock status

  return (
    <div className="min-h-screen bg-white animate-in fade-in duration-500">
      <div className="relative h-48 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000')] bg-cover bg-center" />
        <button onClick={onBack} className="absolute top-6 left-6 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        <div className="flex items-end justify-between mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl border-4 border-white overflow-hidden bg-black flex items-center justify-center text-4xl font-bold text-white shadow-xl">
              {user?.prenom?.[0] || "A"}
            </div>
            <div className={cn(
              "absolute bottom-0 right-0 w-6 h-6 border-4 border-white rounded-full",
              isOccupied ? "bg-red-500" : "bg-green-500"
            )} />
          </div>
          <button className="bg-black text-white px-6 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all">
            Modifier
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{user?.prenom} {user?.nom || "Kouamé"}</h1>
            <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">
              <BriefcaseIcon className="w-4 h-4" />
              <span>{user?.role || "Styliste Senior"}</span>
              <span>•</span>
              <span className={cn(
                "px-2 py-0.5 rounded-full border",
                isOccupied ? "bg-red-50 text-red-600 border-red-100" : "bg-green-50 text-green-600 border-green-100"
              )}>
                {isOccupied ? "Occupé" : "Disponible"}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-[13px] leading-relaxed">
            Passionnée par la fusion entre luxe et afro-futurisme. Créatrice de l'identité visuelle 'Lumina'.
          </p>

          <div className="flex gap-10 py-6 border-y border-gray-100">
            <Stat label="Projets" value="12" />
            <Stat label="Abonnés" value="2.4k" />
            <Stat label="Suivis" value="430" />
          </div>
        </div>

        <div className="mt-8 pb-10">
          <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Portfolio</h3>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden relative group cursor-pointer">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-black text-[10px] font-bold uppercase tracking-widest">Collection {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string, value: string | number }) {
  return (
    <div>
      <p className="font-bold text-lg">{value}</p>
      <p className="text-gray-400 text-[9px] uppercase tracking-widest font-bold mt-0.5">{label}</p>
    </div>
  );
}
