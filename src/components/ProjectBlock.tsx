// src/components/ProjectBlock.tsx
import React from "react";
import { motion } from "motion/react";
import { CheckCircle2, ChevronRight, Instagram, Play } from "lucide-react";
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
  return (
    <div className={`${withDivider ? "mb-40 pb-20 border-b border-brand-dark/5" : "mb-20"}`}>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            {project.statusBadge?.label && (
              <span
                className={`${badgeClasses(project.statusBadge.variant)} px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block`}
              >
                {project.statusBadge.label}
              </span>
            )}
            <h3 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark">
              {project.name}
            </h3>
          </div>

          <p className="text-brand-dark/60 max-w-md text-lg">{project.description}</p>
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
                    src={project.heroVideo}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-20 h-20 bg-brand-gold text-brand-dark rounded-full flex items-center justify-center shadow-2xl"
                      type="button"
                      aria-label="Play"
                    >
                      <Play fill="currentColor" size={32} className="ml-1" />
                    </motion.button>
                  </div>
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
            <h4 className="text-2xl font-serif font-bold mb-6 text-brand-dark">
              Destaques do Projeto
            </h4>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {project.highlights.map((item) => (
                <li key={item} className="flex items-center gap-3 text-brand-dark/80 font-medium text-sm">
                  <CheckCircle2 className="text-brand-gold" size={18} />
                  {item}
                </li>
              ))}
            </ul>

            <motion.a
              href={project.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 10 }}
              className="flex items-center gap-2 text-brand-gold font-bold text-lg group"
            >
              <Instagram size={18} />
              Mais detalhes
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </motion.div>

        {/* ✅ Gallery vem 100% do config */}
        <GalleryGrid items={project.gallery} />
      </div>
    </div>
  );
}