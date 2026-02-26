import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

export default function VideoModal({
  open,
  onClose,
  src,
  poster,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  poster?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Fechar"
          />

          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="relative w-full max-w-4xl rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center hover:bg-white/15 transition"
              aria-label="Fechar modal"
            >
              <X className="text-white" size={18} />
            </button>

            <div className="aspect-video">
              <video
                src={src}
                poster={poster}
                className="w-full h-full object-cover"
                controls
                autoPlay
                playsInline
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}