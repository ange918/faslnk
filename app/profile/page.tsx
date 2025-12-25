"use client";

import { useState } from "react";
import { 
  ArrowLeftIcon, 
  MapPinIcon, 
  BriefcaseIcon,
  CheckCircleIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/app/lib/utils";

export default function ProfilePage() {
  const [user] = useState({
    name: "Ange Kouamé",
    role: "Styliste",
    bio: "Passionnée par le fusion entre luxe et afro-futurisme. Créatrice de l'identité visuelle 'Lumina'.",
    status: "Disponible", // or "Occupé"
    isOccupied: false,
    stats: {
      projects: 12,
      followers: "2.4k",
      following: 430
    }
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Profile Header */}
      <div className="relative h-48 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000')] bg-cover bg-center" />
        <button className="absolute top-6 left-6 p-2 bg-white/10 backdrop-blur-md rounded-full text-white">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="px-6 -mt-12 relative z-10">
        <div className="flex items-end justify-between mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl border-4 border-white overflow-hidden bg-gold flex items-center justify-center text-4xl font-bold text-black">
              A
            </div>
            <div className={cn(
              "absolute bottom-0 right-0 w-6 h-6 border-4 border-white rounded-full",
              user.isOccupied ? "bg-red-500" : "bg-green-500"
            )} />
          </div>
          <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg active:scale-95 transition-transform">
            Modifier
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
              <BriefcaseIcon className="w-4 h-4" />
              <span>{user.role}</span>
              <span>•</span>
              <span className={cn(
                "font-bold uppercase text-[10px] px-2 py-0.5 rounded-full",
                user.isOccupied ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
              )}>
                {user.isOccupied ? "Occupé" : "Disponible"}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed">
            {user.bio}
          </p>

          <div className="flex gap-6 py-4 border-y border-gray-100">
            <Stat label="Projets" value={user.stats.projects} />
            <Stat label="Abonnés" value={user.stats.followers} />
            <Stat label="Suivis" value={user.stats.following} />
          </div>
        </div>

        {/* Gallery Grid Mock */}
        <div className="mt-8">
          <h3 className="font-bold mb-4">Portfolio</h3>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[3/4] bg-gray-100 rounded-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-bold">Collection {i}</p>
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
      <p className="text-gray-400 text-xs uppercase tracking-wider">{label}</p>
    </div>
  );
}
