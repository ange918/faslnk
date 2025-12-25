"use client";

import { 
  ArrowLeftIcon, 
  BriefcaseIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  CameraIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/app/lib/utils";
import { useState, useEffect } from "react";

interface ProfileViewProps {
  user: any;
  onBack: () => void;
}

export default function ProfileView({ user, onBack }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: user?.nom || "",
    prenom: user?.prenom || "",
    bio: user?.bio || "Passionné par la fusion entre luxe et afro-futurisme. Créatrice de l'identité visuelle 'Lumina'.",
    photo: null as string | null
  });

  const [lastLastNameChange, setLastLastNameChange] = useState<number>(0);
  const daysSinceLastChange = Math.floor((Date.now() - lastLastNameChange) / (1000 * 60 * 60 * 24));
  const canChangeLastName = daysSinceLastChange >= 20;

  useEffect(() => {
    const saved = localStorage.getItem(`fashlink_profile_${user?.id}`);
    if (saved) {
      const data = JSON.parse(saved);
      setFormData(prev => ({ ...prev, ...data }));
      if (data.lastLastNameChange) setLastLastNameChange(data.lastLastNameChange);
    }
  }, [user?.id]);

  const handleSave = () => {
    const updatedData: any = { ...formData };
    if (formData.nom !== user?.nom) {
      if (!canChangeLastName) {
        alert(`Vous ne pouvez changer votre nom que tous les 20 jours. Encore ${20 - daysSinceLastChange} jours à attendre.`);
        return;
      }
      updatedData.lastLastNameChange = Date.now();
      setLastLastNameChange(Date.now());
    }
    
    localStorage.setItem(`fashlink_profile_${user?.id}`, JSON.stringify(updatedData));
    setIsEditing(false);
  };

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
          <div className="relative group">
            <div className="w-24 h-24 rounded-3xl border-4 border-white overflow-hidden bg-black flex items-center justify-center text-4xl font-bold text-white shadow-xl">
              {formData.prenom?.[0] || "A"}
            </div>
            {isEditing && (
              <button className="absolute inset-0 bg-black/40 flex items-center justify-center text-white rounded-3xl">
                <CameraIcon className="w-6 h-6" />
              </button>
            )}
          </div>
          <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="bg-black text-white px-6 py-2.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all"
          >
            {isEditing ? "Enregistrer" : "Modifier"}
          </button>
        </div>

        <div className="space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Prénom</label>
                  <input 
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm"
                    value={formData.prenom}
                    onChange={e => setFormData({...formData, prenom: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nom</label>
                  <input 
                    className={cn(
                      "w-full border rounded-xl px-4 py-3 text-sm",
                      canChangeLastName ? "bg-gray-50 border-gray-100" : "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                    )}
                    value={formData.nom}
                    disabled={!canChangeLastName}
                    onChange={e => setFormData({...formData, nom: e.target.value})}
                  />
                  {!canChangeLastName && (
                    <p className="text-[8px] text-red-400 font-bold uppercase tracking-wider mt-1">Délai : {20 - daysSinceLastChange}j restants</p>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bio</label>
                <textarea 
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm min-h-[100px]"
                  value={formData.bio}
                  onChange={e => setFormData({...formData, bio: e.target.value})}
                />
              </div>
            </div>
          ) : (
            <>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">{formData.prenom} {formData.nom}</h1>
                <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                  <BriefcaseIcon className="w-4 h-4" />
                  <span>{user?.role || "Styliste Senior"}</span>
                </div>
              </div>
              <p className="text-gray-600 text-[13px] leading-relaxed">
                {formData.bio}
              </p>
            </>
          )}

          <div className="flex gap-10 py-6 border-y border-gray-100">
            <Stat label="Projets" value="0" />
            <Stat label="Abonnés" value="0" />
            <Stat label="Suivis" value="0" />
          </div>
        </div>

        <div className="mt-8 pb-10">
          <h3 className="font-bold text-sm uppercase tracking-widest mb-6">Portfolio</h3>
          <div className="bg-gray-50 border border-dashed border-gray-200 rounded-[32px] p-12 text-center">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Aucun projet dans le portfolio</p>
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
