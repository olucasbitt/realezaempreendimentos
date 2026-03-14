import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryItem = { src: string; alt: string };

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  if (!items?.length) return null;

  const openImage = (index: number) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);

  const goPrev = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
  };

  const goNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % items.length);
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeImage();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;

    const distance = touchStartX - touchEndX;

    if (distance > minSwipeDistance) {
      goNext();
    } else if (distance < -minSwipeDistance) {
      goPrev();
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((img, i) => {
          const safeSrc = img.src.startsWith("/") ? img.src : `/${img.src}`;

          return (
            <motion.button
              type="button"
              key={`${safeSrc}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.08 }}
              onClick={() => openImage(i)}
              className="aspect-square rounded-2xl overflow-hidden shadow-lg group cursor-pointer text-left"
            >
              <img
                src={safeSrc}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
                onError={() => console.error("❌ Falhou galeria:", safeSrc)}
              />
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
          >
            <button
              type="button"
              onClick={closeImage}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 rounded-full bg-white/10 hover:bg-white/20 text-white p-3 transition"
              aria-label="Fechar imagem"
            >
              <X size={24} />
            </button>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-3 md:left-6 z-50 rounded-full bg-white/10 hover:bg-white/20 text-white p-3 transition"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft size={28} />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-3 md:right-6 z-50 rounded-full bg-white/10 hover:bg-white/20 text-white p-3 transition"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <div
              className="relative max-w-6xl w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <motion.img
                key={selectedIndex}
                src={
                  items[selectedIndex].src.startsWith("/")
                    ? items[selectedIndex].src
                    : `/${items[selectedIndex].src}`
                }
                alt={items[selectedIndex].alt}
				
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="max-h-[88vh] max-w-full object-contain rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
			  <p className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white text-sm md:text-base bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
					{items[selectedIndex].alt}
			  </p>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 text-white text-sm px-4 py-2 backdrop-blur-md">
                {selectedIndex + 1} / {items.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}