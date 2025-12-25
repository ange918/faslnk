"use client";

import { useState, useEffect } from "react";
import { 
  ArrowLeftIcon,
  PlusIcon,
  UserIcon,
  ArchiveBoxIcon,
  MagnifyingGlassIcon,
  EllipsisVerticalIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/app/lib/utils";

interface MeasurementsViewProps {
  onBack: () => void;
}

export default function MeasurementsView({ onBack }: MeasurementsViewProps) {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("fashlink_clients");
    if (saved) {
      setClients(JSON.parse(saved));
    } else {
      setClients([]);
      localStorage.setItem("fashlink_clients", JSON.stringify([]));
    }
  }, []);

  const handleSaveClient = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newClient = {
      id: Date.now(),
      name: formData.get("name"),
      phone: formData.get("phone"),
      height: formData.get("height"),
      bust: formData.get("bust"),
      waist: formData.get("waist"),
      hips: formData.get("hips"),
    };
    const updated = [newClient, ...clients];
    setClients(updated);
    localStorage.setItem("fashlink_clients", JSON.stringify(updated));
    setIsAdding(false);
  };

  if (isAdding || selectedClient) {
    const clientData = selectedClient ? clients.find(c => c.name === selectedClient) : null;
    return (
      <div className="min-h-screen bg-white animate-in fade-in slide-in-from-right-4 duration-500">
        <header className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-20">
          <button onClick={() => { setIsAdding(false); setSelectedClient(null); }} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="text-[10px] font-bold uppercase tracking-[0.2em]">{isAdding ? "Nouveau client" : "Fiche client"}</h1>
          <div className="w-9" />
        </header>
        
        <form onSubmit={handleSaveClient} className="p-8 space-y-10 max-w-2xl mx-auto w-full">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <UserIcon className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-base tracking-tight">Informations générales</h3>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <Input name="name" label="Nom complet" defaultValue={clientData?.name} required />
              <Input name="phone" label="Téléphone" defaultValue={clientData?.phone} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <ArchiveBoxIcon className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-base tracking-tight">Prise de mesures</h3>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <MeasureInput name="height" label="Taille" unit="cm" defaultValue={clientData?.height} />
              <MeasureInput name="bust" label="Poitrine" unit="cm" defaultValue={clientData?.bust} />
              <MeasureInput name="waist" label="Taille (tour)" unit="cm" defaultValue={clientData?.waist} />
              <MeasureInput name="hips" label="Hanches" unit="cm" defaultValue={clientData?.hips} />
              <MeasureInput label="Épaules" unit="cm" />
              <MeasureInput label="Bras" unit="cm" />
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all">
              {isAdding ? "Enregistrer le client" : "Mettre à jour les mesures"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] animate-in fade-in duration-500">
      <header className="p-6 bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto w-full flex items-center justify-between">
          <h1 className="text-xl font-bold uppercase tracking-widest">Clients</h1>
          <button onClick={() => setIsAdding(true)} className="p-2.5 bg-black text-white rounded-2xl shadow-lg active:scale-95 transition-all">
            <PlusIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="p-6 max-w-2xl mx-auto w-full space-y-6">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
          <input 
            type="text" 
            placeholder="Rechercher un client..." 
            className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black/10 transition-all text-sm shadow-sm"
          />
        </div>

        {clients.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-200 rounded-[40px] p-20 text-center flex flex-col items-center justify-center">
             <div className="w-16 h-16 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 border border-gray-100">
               <UserIcon className="w-8 h-8 text-gray-200" />
             </div>
             <h3 className="font-bold text-gray-400 uppercase tracking-widest text-xs">Aucun client enregistré</h3>
             <p className="text-gray-300 text-[11px] mt-2 font-medium">Commencez par ajouter votre premier client.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {clients.map((client) => (
              <div key={client.id} className="bg-white border border-gray-100 p-6 rounded-[32px] shadow-sm group hover:border-black/5 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center font-bold text-gray-300 border border-gray-100 text-sm">
                      {client.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-base tracking-tight">{client.name}</h3>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{client.phone}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-300">
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <MeasureCard label="Taille" value={`${client.height}cm`} />
                  <MeasureCard label="Poitrine" value={`${client.bust}cm`} />
                </div>

                <button 
                  onClick={() => setSelectedClient(client.name)}
                  className="w-full mt-4 py-3.5 bg-gray-50 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all border border-gray-100/50"
                >
                  Accéder au dossier ➡
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function MeasureCard({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100/50">
      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-1">{label}</p>
      <p className="text-sm font-bold text-black">{value}</p>
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
      <input
        {...props}
        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-black/10 transition-all text-sm"
      />
    </div>
  );
}

function MeasureInput({ label, unit, ...props }: { label: string, unit: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative">
        <input 
          {...props}
          type="number"
          placeholder="0"
          className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-sm focus:border-black/10 focus:bg-white outline-none pr-12 font-bold"
        />
        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[9px] text-gray-300 font-bold uppercase">{unit}</span>
      </div>
    </div>
  );
}
