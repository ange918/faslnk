"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/lib/utils";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import DashboardPage from "../dashboard/page";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    dob: "",
  });

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <DashboardPage userFirstName={formData.prenom || "Ange"} />;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col pt-24 max-w-md mx-auto">
      {/* Logo Positioned Top Left */}
      <div className="fixed top-8 left-8">
        <h1 className="text-2xl font-bold tracking-[0.3em] text-white">FASHLINK</h1>
      </div>

      <div className="mt-12 mb-10">
        <h2 className="text-3xl font-bold mb-3 tracking-tight">
          {isLogin ? "Bon retour," : "Bienvenue,"}
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          {isLogin 
            ? "Connectez-vous pour continuer." 
            : "Define your creative identity. Build with AI."}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.form
            key="login"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleFinalSubmit}
            className="space-y-5"
          >
            <Input label="Email" type="email" placeholder="votre@email.com" required />
            <Input label="Mot de passe" type="password" placeholder="••••••••" required />
            <div className="text-right">
              <button type="button" className="text-xs text-gray-500 hover:text-white transition-colors">
                Mot de passe oublié ?
              </button>
            </div>
            <Button className="bg-white text-black hover:bg-gray-200 mt-2">Se connecter</Button>
          </motion.form>
        ) : (
          <motion.div
            key="signup"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {step === 1 ? (
              <form onSubmit={handleNextStep} className="space-y-5">
                <Input label="Nom" placeholder="Nom" required onChange={(e) => setFormData({...formData, nom: e.target.value})} />
                <Input label="Prénom" placeholder="Prénom" required onChange={(e) => setFormData({...formData, prenom: e.target.value})} />
                <Input label="Email" type="email" placeholder="votre@email.com" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <Input label="Mot de passe" type="password" placeholder="••••••••" required />
                <Button type="submit" className="bg-white text-black hover:bg-gray-200 mt-2">
                  S'inscrire
                </Button>
              </form>
            ) : (
              <form onSubmit={handleFinalSubmit} className="space-y-5">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center text-xs text-gray-500 mb-6 hover:text-white transition-colors uppercase tracking-widest"
                >
                  <ChevronLeftIcon className="w-3 h-3 mr-1" /> Retour
                </button>
                <Input label="Date de naissance" type="date" required onChange={(e) => setFormData({...formData, dob: e.target.value})} />
                <p className="text-[10px] text-gray-500 italic px-1">
                  * Vous devez avoir entre 18 et 69 ans pour utiliser FASHLINK.
                </p>
                <Button type="submit" className="bg-white text-black hover:bg-gray-200 mt-4">
                  Créer mon compte
                </Button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-auto pt-10 space-y-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
            <span className="bg-black px-4 text-gray-500">Ou</span>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-3 px-4 py-4 border border-white/10 rounded-2xl hover:bg-white/5 transition-all text-sm font-medium">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12.48 10.92v3.28h7.84c-.24 1.84-1.44 3.44-3.44 4.44l3.12 2.32c1.92-1.76 3-4.4 3-7.52 0-.64-.08-1.2-.24-1.76H12.48z" />
            <path fill="#4285F4" d="M12.48 10.92V10.92l.08-.08V10.92z" />
            <path fill="#FBBC05" d="M6.64 14.72c-.24-.72-.36-1.48-.36-2.28s.12-1.56.36-2.28V7.32H2.52C1.64 9 1.16 10.88 1.16 12.88s.48 3.88 1.36 5.56l2.84-2.2z" />
            <path fill="#34A853" d="M12.48 24c3.44 0 6.32-1.12 8.44-3.04l-3.12-2.32c-1.12.76-2.56 1.2-4.16 1.2-3.36 0-6.24-2.24-7.28-5.28l-2.84 2.2C5.52 21.28 8.72 24 12.48 24z" />
            <path fill="#4285F4" d="M12.48 4.48c1.84 0 3.52.64 4.88 1.92l3.6-3.6C18.8 1.04 15.92 0 12.48 0 8.72 0 5.52 2.72 3.68 7.32l2.84 2.2c1.04-3.04 3.92-5.28 7.28-5.28z" />
          </svg>
          Continuer avec Google
        </button>

        <p className="text-center text-sm text-gray-500">
          {isLogin ? "Pas encore de compte ?" : "Vous avez déjà un compte ?"} {" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setStep(1);
            }}
            className="text-white font-bold hover:underline ml-1"
          >
            {isLogin ? "Inscrivez-vous" : "Connectez-vous"}
          </button>
        </p>
      </div>
    </div>
  );
}

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">{label}</label>
      <input
        {...props}
        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all text-sm placeholder:text-gray-700"
      />
    </div>
  );
}

function Button({ children, className, ...props }: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-[0.15em] transition-all active:scale-[0.98] shadow-lg",
        className
      )}
    >
      {children}
    </button>
  );
}
