import React, { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

type VideoModalProps = {
  open: boolean;
  onClose: () => void;
  src: string;
  poster?: string;
  orientation?: "horizontal" | "vertical";
};

export default function VideoModal({
  open,
  onClose,
  src,
  poster,
  orientation = "horizontal",
}: VideoModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-50 rounded-full bg-white/10 hover:bg-white/20 text-white p-3 transition"
            aria-label="Fechar vídeo"
          >
            <X size={24} />
          </button>

          <div
            className={`relative w-full ${
              orientation === "vertical" ? "max-w-md md:max-w-lg" : "max-w-5xl"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={src}
              poster={poster}
              className="max-h-[85vh] w-full h-auto object-contain rounded-2xl bg-black shadow-2xl"
              controls
              autoPlay
              playsInline
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}