"use client";

import { useState } from "react";
import { 
  ArrowLeftIcon,
  PlusIcon,
  UserIcon,
  ArchiveBoxIcon
} from "@heroicons/react/24/outline";

export default function MeasurementsPage() {
  const [selectedClient, setSelectedClient] = useState("");
  const [formData, setFormData] = useState({
    poitrine: "",
    taille: "",
    hanches: "",
    epaules: "",
    bras: "",
    pantalon: "",
  });

  const clients = ["Marie Dupont", "Jean Laurent", "Sarah Mensah", "Nouveau client +"];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mesures enregistrées localement !");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white p-6 border-b border-black/5 flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">Gestion des mesures</h1>
      </header>

      <main className="p-6 max-w-md mx-auto space-y-8">
        {/* Client Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sélectionner un client</label>
          <div className="grid grid-cols-2 gap-3">
            {clients.map((client) => (
              <button
                key={client}
                onClick={() => setSelectedClient(client)}
                className={`p-4 rounded-2xl text-left border-2 transition-all ${
                  selectedClient === client 
                    ? "border-black bg-black text-white" 
                    : "border-transparent bg-white shadow-sm"
                }`}
              >
                <p className="text-sm font-bold leading-tight">{client}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Measurements Form */}
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 shadow-sm border border-black/5 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <ArchiveBoxIcon className="w-5 h-5 text-gold" />
            <h3 className="font-bold">Nouvelles mesures</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <MeasureInput label="Tour de poitrine" unit="cm" />
            <MeasureInput label="Tour de taille" unit="cm" />
            <MeasureInput label="Tour de hanches" unit="cm" />
            <MeasureInput label="Épaules" unit="cm" />
            <MeasureInput label="Longueur bras" unit="cm" />
            <MeasureInput label="Longueur pantalon" unit="cm" />
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl active:scale-95 transition-all mt-4"
          >
            Enregistrer les mesures
          </button>
        </form>
      </main>
    </div>
  );
}

function MeasureInput({ label, unit }: { label: string, unit: string }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-bold text-gray-400 uppercase">{label}</label>
      <div className="relative">
        <input 
          type="number"
          placeholder="0"
          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-3 py-3 text-sm focus:border-gold/50 outline-none pr-8"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-400 font-bold">{unit}</span>
      </div>
    </div>
  );
}
