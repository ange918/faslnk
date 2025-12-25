"use client";

import { useState } from "react";
import { 
  ArrowLeftIcon,
  PlusIcon,
  UserIcon,
  ArchiveBoxIcon,
  PhoneIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/app/lib/utils";

export default function MeasurementsPage() {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const clients = [
    { id: 1, name: "Marie K.", phone: "07 08 09 10 11", height: "170cm", bust: "92" },
    { id: 2, name: "Jean L.", phone: "06 05 04 03 02", height: "185cm", bust: "105" },
  ];

  if (isAdding || selectedClient) {
    return (
      <div className="min-h-screen bg-white animate-in fade-in slide-in-from-right-4 duration-500">
        <header className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20">
          <button onClick={() => { setIsAdding(false); setSelectedClient(null); }} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="text-sm font-bold uppercase tracking-[0.2em]">{isAdding ? "Ajouter un client" : "Détails client"}</h1>
          <div className="w-9" />
        </header>
        
        <form className="p-8 space-y-8 max-w-2xl mx-auto w-full">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <UserIcon className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-lg">Informations générales</h3>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <Input label="Nom complet" placeholder="Ex: Marie Kouamé" />
              <Input label="Téléphone" placeholder="Ex: 07 00 00 00 00" />
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-3 mb-4">
              <ArchiveBoxIcon className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-lg">Mensurations</h3>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <MeasureInput label="Taille" unit="cm" />
              <MeasureInput label="Poitrine" unit="cm" />
              <MeasureInput label="Tour de taille" unit="cm" />
              <MeasureInput label="Hanches" unit="cm" />
              <MeasureInput label="Épaules" unit="cm" />
              <MeasureInput label="Longueur bras" unit="cm" />
            </div>
          </div>

          <div className="pt-6">
            <button type="button" onClick={() => { setIsAdding(false); setSelectedClient(null); }} className="w-full bg-black text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all">
              {isAdding ? "Créer le profil" : "Mettre à jour"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="p-6 bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto w-full flex items-center justify-between">
          <h1 className="text-xl font-bold uppercase tracking-widest">Mes Clients</h1>
          <button onClick={() => setIsAdding(true)} className="p-2 bg-black text-white rounded-xl shadow-lg active:scale-95 transition-all">
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="p-6 max-w-2xl mx-auto w-full space-y-6">
        <div className="relative group">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
          <input 
            type="text" 
            placeholder="Rechercher un client..." 
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-black/5 transition-all text-sm"
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
          {clients.map((client) => (
            <div key={client.id} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:border-black/10 transition-all group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center font-bold text-gray-400 border border-gray-100">
                    {client.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{client.name}</h3>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                      <PhoneIcon className="w-3 h-3" />
                      {client.phone}
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                  <EllipsisVerticalIcon className="w-5 h-5 text-gray-400" />
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Taille</p>
                  <p className="text-sm font-bold">{client.height}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">Poitrine</p>
                  <p className="text-sm font-bold">{client.bust}cm</p>
                </div>
              </div>

              <button 
                onClick={() => setSelectedClient(client.name)}
                className="w-full mt-4 py-3 bg-white border border-gray-200 rounded-xl text-[10px] font-bold uppercase tracking-widest group-hover:bg-black group-hover:text-white group-hover:border-black transition-all"
              >
                Voir détails & mesures ➡
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">{label}</label>
      <input
        {...props}
        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-black/20 transition-all text-sm"
      />
    </div>
  );
}

function MeasureInput({ label, unit }: { label: string, unit: string }) {
  return (
    <div className="space-y-1">
      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative">
        <input 
          type="number"
          placeholder="0"
          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm focus:border-black/20 focus:bg-white outline-none pr-10 font-bold"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] text-gray-400 font-bold uppercase">{unit}</span>
      </div>
    </div>
  );
}
