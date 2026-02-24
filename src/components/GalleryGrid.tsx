import React from "react";
import { motion } from "motion/react";

type GalleryItem = { src: string; alt: string };

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  if (!items?.length) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.slice(0, 4).map((img, i) => {
        const safeSrc = img.src.startsWith("/") ? img.src : `/${img.src}`;

        return (
          <motion.div
            key={safeSrc}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i + 1) * 0.1 }}
            className="aspect-square rounded-2xl overflow-hidden shadow-lg group"
          >
            <img
              src={safeSrc}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
              onError={() => console.error("❌ Falhou galeria:", safeSrc)}
            />
          </motion.div>
        );
      })}
    </div>
  );
}