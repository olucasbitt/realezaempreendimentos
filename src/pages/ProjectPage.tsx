import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, MapPin } from "lucide-react";

import { PROJECTS } from "../config/projects";
import LuxuryHighlight from "../components/LuxuryHighlight";
import { GalleryGrid } from "../components/GalleryGrid";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = slug ? (PROJECTS as any)[slug] : null;

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-2xl font-serif font-bold text-brand-dark">Projeto não encontrado</h1>
        <Link to="/" className="text-brand-gold font-semibold inline-block mt-6">
          Voltar para a página inicial
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* HERO do projeto (exclusivo) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={project.heroImage}
            alt={project.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-white" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-24">
          <Link to="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition">
            <ArrowLeft size={18} />
            Voltar
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-10 max-w-3xl"
          >
            {project.statusBadge?.label && (
              <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-brand-gold/25 text-brand-gold border border-brand-gold/30">
                {project.statusBadge.label}
              </span>
            )}

            <h1 className="mt-5 text-4xl md:text-6xl font-serif font-bold text-white leading-[1.05]">
              {project.name}
            </h1>

            <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed">
              {project.longDescription || project.description}
            </p>

            {/* CTA Instagram */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <motion.a
                href={project.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-full px-8 py-4 bg-brand-gold text-brand-dark font-semibold shadow-xl shadow-brand-gold/20"
              >
                Ver no Instagram
              </motion.a>

              <motion.a
                href={`https://wa.me/5551989066283`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center rounded-full px-8 py-4 bg-white/10 text-white border border-white/20 backdrop-blur-md font-semibold"
              >
                Agendar visita
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Coluna esquerda: Highlights + Diferenciais */}
          <div className="lg:col-span-7">
            {/* Highlights premium (reaproveita) */}
            <div className="mb-12">
              <p className="text-xs tracking-[0.35em] uppercase text-brand-dark/40 font-semibold">
                Características
              </p>
              <div className="mt-4 h-px w-24 bg-gradient-to-r from-brand-gold/70 via-brand-gold/20 to-transparent" />

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.highlights?.map((item: string) => (
                  <LuxuryHighlight key={item} label={item} />
                ))}
              </div>
            </div>

            {/* Diferenciais (texto mais rico) */}
            {Array.isArray(project.differentials) && project.differentials.length > 0 && (
              <div className="mt-14">
                <p className="text-xs tracking-[0.35em] uppercase text-brand-dark/40 font-semibold">
                  Diferenciais
                </p>
                <div className="mt-4 h-px w-24 bg-gradient-to-r from-brand-gold/70 via-brand-gold/20 to-transparent" />

                <div className="mt-10 space-y-6">
                  {project.differentials.map((d: any) => (
                    <div
                      key={d.title}
                      className="rounded-3xl border border-brand-dark/10 bg-white/70 backdrop-blur-md p-8 shadow-[0_14px_40px_-30px_rgba(0,0,0,0.35)]"
                    >
                      <h3 className="text-xl font-serif font-bold text-brand-dark">{d.title}</h3>
                      <p className="mt-3 text-brand-dark/65 leading-relaxed">{d.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Coluna direita: Specs + Materiais + Localização */}
          <div className="lg:col-span-5">
            {/* Specs */}
            {Array.isArray(project.specs) && project.specs.length > 0 && (
              <div className="rounded-3xl border border-brand-dark/10 bg-brand-light p-8 md:p-10 shadow-[0_18px_50px_-40px_rgba(0,0,0,0.4)]">
                <p className="text-xs tracking-[0.35em] uppercase text-brand-dark/40 font-semibold">
                  Especificações
                </p>
                <div className="mt-4 h-px w-24 bg-gradient-to-r from-brand-gold/70 via-brand-gold/20 to-transparent" />

                <div className="mt-8 space-y-4">
                  {project.specs.map((s: any) => (
                    <div key={s.label} className="flex items-center justify-between">
                      <span className="text-sm text-brand-dark/60">{s.label}</span>
                      <span className="text-sm font-semibold text-brand-dark">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Materiais */}
            {Array.isArray(project.materials) && project.materials.length > 0 && (
              <div className="mt-10 rounded-3xl border border-brand-dark/10 bg-white p-8 shadow-[0_14px_40px_-30px_rgba(0,0,0,0.35)]">
                <p className="text-xs tracking-[0.35em] uppercase text-brand-dark/40 font-semibold">
                  Acabamentos
                </p>
                <div className="mt-4 h-px w-24 bg-gradient-to-r from-brand-gold/70 via-brand-gold/20 to-transparent" />

                <ul className="mt-7 space-y-3 text-brand-dark/65">
                  {project.materials.map((m: string) => (
                    <li key={m}>• {m}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Localização */}
            {(project.location?.city || project.location?.neighborhood || project.location?.mapUrl) && (
              <div className="mt-10 rounded-3xl border border-brand-dark/10 bg-white p-8 shadow-[0_14px_40px_-30px_rgba(0,0,0,0.35)]">
                <p className="text-xs tracking-[0.35em] uppercase text-brand-dark/40 font-semibold">
                  Localização
                </p>
                <div className="mt-4 h-px w-24 bg-gradient-to-r from-brand-gold/70 via-brand-gold/20 to-transparent" />

                <div className="mt-7 flex items-start gap-3 text-brand-dark/70">
                  <MapPin size={18} className="text-brand-gold mt-0.5" />
                  <div>
                    <p className="font-semibold text-brand-dark">
                      {[project.location?.neighborhood, project.location?.city].filter(Boolean).join(" • ") || "—"}
                    </p>
                    {project.location?.mapUrl && (
                      <a
                        href={project.location.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-brand-gold font-semibold mt-2"
                      >
                        Ver no mapa
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Galeria completa */}
        <div className="mt-16 md:mt-24">
          <p className="text-xs tracking-[0.35em] uppercase text-brand-dark/40 font-semibold">
            Galeria
          </p>
          <div className="mt-4 h-px w-24 bg-gradient-to-r from-brand-gold/70 via-brand-gold/20 to-transparent" />

          <div className="mt-10">
            <GalleryGrid items={project.gallery} />
          </div>
        </div>

        {/* Plantas (se existir) */}
        {Array.isArray(project.floorplans) && project.floorplans.length > 0 && (
          <div className="mt-16 md:mt-24">
            <p className="text-xs tracking-[0.35em] uppercase text-brand-dark/40 font-semibold">
              Plantas
            </p>
            <div className="mt-4 h-px w-24 bg-gradient-to-r from-brand-gold/70 via-brand-gold/20 to-transparent" />

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.floorplans.map((p: any) => (
                <div key={p.src} className="rounded-3xl overflow-hidden border border-brand-dark/10 shadow-lg">
                  <img src={p.src} alt={p.alt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}