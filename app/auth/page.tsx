"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/app/lib/utils";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(false);
  const [step, setStep] = useState(1);
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

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col justify-center max-w-md mx-auto">
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-2">
          {isLogin ? "Bon retour," : "Bienvenue,"}
        </h2>
        <p className="text-gray-400">
          {isLogin 
            ? "Connectez-vous pour continuer." 
            : "Créez votre identité créative."}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isLogin ? (
          <motion.form
            key="login"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <Input label="Email" type="email" placeholder="votre@email.com" />
            <Input label="Mot de passe" type="password" placeholder="••••••••" />
            <div className="text-right">
              <button type="button" className="text-xs text-gold hover:underline">
                Mot de passe oublié ?
              </button>
            </div>
            <Button className="bg-white text-black hover:bg-gray-200">Se connecter</Button>
          </motion.form>
        ) : (
          <motion.div
            key="signup"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {step === 1 ? (
              <form onSubmit={handleNextStep} className="space-y-4">
                <Input label="Nom" placeholder="Nom" />
                <Input label="Prénom" placeholder="Prénom" />
                <Input label="Email" type="email" placeholder="votre@email.com" />
                <Input label="Mot de passe" type="password" placeholder="••••••••" />
                <Button type="submit" className="bg-gold text-black hover:bg-dark-gold transition-colors">
                  S'inscrire
                </Button>
              </form>
            ) : (
              <form className="space-y-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex items-center text-sm text-gray-400 mb-4 hover:text-white"
                >
                  <ChevronLeftIcon className="w-4 h-4 mr-1" /> Retour
                </button>
                <Input label="Date de naissance" type="date" />
                <p className="text-[10px] text-gray-500 italic">
                  * Vous devez avoir entre 18 et 69 ans.
                </p>
                <Button className="bg-gold text-black">Créer mon compte</Button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 space-y-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-2 text-gray-500">Ou</span>
          </div>
        </div>

        <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-white/20 rounded-xl hover:bg-white/5 transition-all">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continuer avec Google
        </button>

        <p className="text-center text-sm text-gray-400">
          {isLogin ? "Pas encore de compte ?" : "Vous avez déjà un compte ?"} {" "}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setStep(1);
            }}
            className="text-white font-semibold hover:underline"
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
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</label>
      <input
        {...props}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all text-sm"
      />
    </div>
  );
}

function Button({ children, className, ...props }: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest transition-all active:scale-[0.98]",
        className
      )}
    >
      {children}
    </button>
  );
}
