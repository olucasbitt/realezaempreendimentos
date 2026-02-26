// src/components/ProjectBlock.tsx
import React from "react";
import { motion } from "motion/react";
import { Play, Instagram } from "lucide-react";

import LuxuryHighlight from "./LuxuryHighlight";
import type { ProjectConfig } from "../config/projects";
import { GalleryGrid } from "./GalleryGrid";

function badgeClasses(variant?: "featured" | "building" | "default") {
  if (variant === "featured") return "bg-brand-gold text-brand-dark shadow-sm";
  if (variant === "building") return "bg-brand-gold/10 text-brand-gold";
  return "bg-brand-dark/5 text-brand-dark/40";
}

export function ProjectBlock({
  project,
  withDivider = true,
}: {
  project: ProjectConfig;
  withDivider?: boolean;
}) {
  // ✅ precisa estar dentro do componente (hooks não podem ficar fora)
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(true); // autoPlay começa tocando
  const [hasInteracted, setHasInteracted] = React.useState(false); // controla mute/unmute

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;

    setHasInteracted(true);

    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };

  return (
    <div
      className={`${
        withDivider ? "mb-40 pb-20 border-b border-brand-dark/5" : "mb-20"
      }`}
    >
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            {project.statusBadge?.label && (
              <span
                className={`${badgeClasses(
                  project.statusBadge.variant
                )} px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block`}
              >
                {project.statusBadge.label}
              </span>
            )}
            <h3 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark">
              {project.name}
            </h3>
          </div>

          <p className="text-brand-dark/60 max-w-md text-lg">
            {project.description}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-12 gap-8 items-stretch"
        >
          <div className="lg:col-span-7 relative group overflow-hidden rounded-3xl shadow-2xl bg-brand-dark">
            <div className="aspect-[16/9] relative">
              {project.heroVideo ? (
                <>
                  <video
                    ref={videoRef}
                    src={project.heroVideo}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted={!hasInteracted} // ✅ começa mudo e libera som após interação
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  {/* ✅ área clicável para pausar/retomar */}
                  <button
                    type="button"
                    aria-label="Alternar reprodução"
                    className="absolute inset-0"
                    onClick={toggleVideo}
                  />

                  {/* ✅ overlay só aparece quando estiver pausado */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        className="pointer-events-auto w-16 h-16 md:w-20 md:h-20 bg-brand-gold text-brand-dark rounded-full flex items-center justify-center shadow-2xl"
                        type="button"
                        aria-label="Play"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHasInteracted(true);
                          videoRef.current?.play();
                        }}
                      >
                        <Play fill="currentColor" size={30} className="ml-1" />
                      </motion.button>
                    </div>
                  )}
                </>
              ) : (
                <img
                  src={project.heroImage}
                  alt={`${project.name} Destaque`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center p-8 md:p-12 bg-brand-light rounded-3xl">
            <div className="mb-6">
              <p className="text-xs tracking-[0.35em] uppercase text-brand-dark/40 font-semibold">
                Características
              </p>
              <div className="mt-4 h-px w-24 bg-gradient-to-r from-brand-gold/70 via-brand-gold/20 to-transparent" />
            </div>

            {/* ✅ 2 colunas já no mobile (menos lista longa) */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 mb-10">
              {project.highlights.map((item) => (
                <LuxuryHighlight key={item} label={item} />
              ))}
            </div>

            <motion.a
              href={project.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 rounded-full px-7 py-3 bg-brand-dark text-white font-semibold shadow-lg shadow-black/10 hover:shadow-xl transition-all"
            >
              Ver mais
              <Instagram size={18} className="opacity-90" />
            </motion.a>
          </div>
        </motion.div>

        <GalleryGrid items={project.gallery} />
      </div>
    </div>
  );
}