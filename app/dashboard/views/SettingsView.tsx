"use client";

import { 
  ArrowLeftIcon,
  BellIcon,
  ShieldCheckIcon,
  UserIcon,
  PaintBrushIcon,
  GlobeAltIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";

interface SettingsViewProps {
  onBack: () => void;
}

export default function SettingsView({ onBack }: SettingsViewProps) {
  const sections = [
    {
      title: "Compte",
      items: [
        { label: "Informations personnelles", icon: UserIcon },
        { label: "Sécurité & Mot de passe", icon: ShieldCheckIcon },
        { label: "Notifications", icon: BellIcon },
      ]
    },
    {
      title: "Préférences",
      items: [
        { label: "Apparence", icon: PaintBrushIcon },
        { label: "Langue & Région", icon: GlobeAltIcon },
      ]
    },
    {
      title: "Support",
      items: [
        { label: "Aide & FAQ", icon: QuestionMarkCircleIcon },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] animate-in fade-in duration-500">
      <header className="p-6 bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-2xl mx-auto w-full flex items-center gap-4">
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-50 rounded-full transition-colors">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold uppercase tracking-widest text-black">Paramètres</h1>
        </div>
      </header>

      <main className="p-6 max-w-2xl mx-auto w-full space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-3">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-2">{section.title}</h3>
            <div className="bg-white border border-gray-100 rounded-[32px] overflow-hidden shadow-sm">
              {section.items.map((item, i) => (
                <button 
                  key={item.label}
                  className={`w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-all ${
                    i !== section.items.length - 1 ? "border-b border-gray-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className="w-5 h-5 text-gray-400" />
                    <span className="text-[13px] font-medium text-gray-700">{item.label}</span>
                  </div>
                  <ArrowLeftIcon className="w-4 h-4 text-gray-300 rotate-180" />
                </button>
              ))}
            </div>
          </div>
        ))}
        
        <div className="text-center pt-4">
          <p className="text-[9px] text-gray-300 font-bold uppercase tracking-[0.3em]">Version 1.0.4 - FASHLINK</p>
        </div>
      </main>
    </div>
  );
}
