"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import AuthScreen from "./auth/page";
import DashboardPage from "./dashboard/page";
import { useAuth } from "./context/AuthContext";

export default function RootPage() {
  const { user, hasSeenSplash, setHasSeenSplash } = useAuth();
  const [showSplash, setShowSplash] = useState(!hasSeenSplash);
  const [phase, setPhase] = useState<"center" | "top-left">("center");

  useEffect(() => {
    if (!hasSeenSplash) {
      const timer = setTimeout(() => {
        setPhase("top-left");
      }, 3000);

      const endTimer = setTimeout(() => {
        setShowSplash(false);
        setHasSeenSplash(true);
      }, 4000);

      return () => {
        clearTimeout(timer);
        clearTimeout(endTimer);
      };
    }
  }, [hasSeenSplash, setHasSeenSplash]);

  if (user) {
    return <DashboardPage />;
  }

  if (showSplash && !hasSeenSplash) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            phase === "center"
              ? { opacity: 1, scale: 1, top: "50%", left: "50%", x: "-50%", y: "-50%", position: "absolute" as const }
              : { 
                  top: "2rem", 
                  left: "2rem", 
                  x: "0%", 
                  y: "0%", 
                  scale: 0.6,
                  position: "absolute" as const
                }
          }
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl font-bold tracking-[0.3em] text-white">FASHLINK</h1>
          <AnimatePresence>
            {phase === "center" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="text-center mt-4"
              >
                <p className="text-gray-400 tracking-widest text-sm uppercase">
                  Define your creative identity.
                </p>
                <p className="text-gray-500 tracking-widest text-xs uppercase mt-1">
                  Build with AI.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  }

  return <AuthScreen />;
}
