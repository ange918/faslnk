"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import AuthScreen from "./auth/page";

export default function SplashScreen() {
  const [phase, setPhase] = useState<"center" | "top-left" | "auth">("center");

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("top-left");
    }, 2500);

    const authTimer = setTimeout(() => {
      setPhase("auth");
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(authTimer);
    };
  }, []);

  if (phase === "auth") {
    return <AuthScreen />;
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          phase === "center"
            ? { opacity: 1, scale: 1 }
            : { 
                top: "2rem", 
                left: "2rem", 
                x: "-50%", 
                y: "-50%", 
                scale: 0.6,
                position: "absolute" as const
              }
        }
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <h1 className="text-4xl font-bold tracking-[0.2em] text-white">FASHLINK</h1>
        {phase === "center" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-gray-400 mt-4 tracking-widest text-sm uppercase"
          >
            Define your creative identity.
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
