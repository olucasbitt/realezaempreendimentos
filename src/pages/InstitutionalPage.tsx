// src/pages/InstitutionalPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  MessageCircle,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Maximize2,
  Home,
  Trees,
  Sparkles,
  Play,
  ArrowRight,
  X,
} from "lucide-react";

import VideoModal from "../components/VideoModal";
import LuxuryHighlight from "../components/LuxuryHighlight";
import { PROJECTS } from "../config/projects";

// --- Config (evita WhatsApp diferente em vários lugares) ---
const WHATSAPP_NUMBER = "5551989066283";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// ✅ Ajustado para bater com src/config/projects.tsx
type ProjectConfig = {
  key?: string;
  name?: string;
  description?: string;
  statusBadge?: { label: string; variant?: "featured" | "building" | "default" };
  instagramUrl?: string;
  heroImage?: string;
  heroVideo?: string;
  highlights?: { label: string; icon: string }[];
  gallery?: { src: string; alt: string }[];
};

const toProject = (p: unknown): ProjectConfig => (p ?? {}) as ProjectConfig;

function getSafeSrc(src?: string) {
  if (!src) return "";
  return src.startsWith("/") ? src : `/${src}`;
}

// --- Components ---
const WhatsAppButton = () => {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-50"
      aria-label="Atendimento via WhatsApp"
    >
      <div
        className="
          w-12 h-12
          rounded-full
          bg-brand-dark/90 backdrop-blur-md
          border border-brand-gold/30
          flex items-center justify-center
          shadow-[0_10px_30px_-15px_rgba(0,0,0,0.6)]
          transition-all duration-300
          hover:shadow-brand-gold/30
        "
      >
        <MessageCircle size={16} className="text-brand-gold" />
      </div>
    </motion.a>
  );
};

const SectionTitle = ({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) => (
  <div className="mb-12 md:mb-20">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl font-serif font-bold mb-4 ${
        light ? "text-white" : "text-brand-dark"
      }`}
    >
      {title}
    </motion.h2>

    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-lg md:text-xl max-w-2xl ${
          light ? "text-white/70" : "text-brand-dark/60"
        }`}
      >
        {subtitle}
      </motion.p>
    )}

    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: "80px" }}
      viewport={{ once: true }}
      className="h-1 bg-brand-gold mt-6"
    />
  </div>
);

function getProjectName(p: ProjectConfig, fallback: string) {
  return p.name || fallback;
}

function ProjectGalleryPreview({
  project,
  slug,
  name,
}: {
  project: ProjectConfig;
  slug: string;
  name: string;
}) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const gallery = Array.isArray(project.gallery) ? project.gallery : [];
  const previewItems = gallery.slice(0, 4);
  const extraCount = Math.max(gallery.length - 4, 0);

  const closeViewer = () => setSelectedImage(null);

  const goPrev = () => {
    if (selectedImage === null || gallery.length <= 1) return;
    setSelectedImage((selectedImage - 1 + gallery.length) % gallery.length);
  };

  const goNext = () => {
    if (selectedImage === null || gallery.length <= 1) return;
    setSelectedImage((selectedImage + 1) % gallery.length);
  };

  useEffect(() => {
    if (selectedImage === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeViewer();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage, gallery.length]);

  if (!gallery.length) return null;

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

  const openAt = (index: number) => setSelectedImage(index);

  return (
    <>
      <div className="mt-2">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {previewItems.map((img, i) => {
            const isLastVisible = i === 3 && extraCount > 0;

            return (
              <motion.button
                type="button"
                key={`${slug}-preview-${i}-${img.src}`}
                onClick={() => openAt(i)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg group relative text-left"
              >
                <img
                  src={getSafeSrc(img.src)}
                  alt={img.alt || `Detalhe ${name} ${i + 1}`}
                  className="block w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {isLastVisible && (
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center">
                    <div className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-white font-semibold">
                      +{extraCount} fotos
                    </div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && gallery[selectedImage] && (
          <motion.div
            className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeViewer}
          >
            <button
              type="button"
              onClick={closeViewer}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 rounded-full bg-white/10 hover:bg-white/20 text-white p-3 transition"
              aria-label="Fechar galeria"
            >
              <X size={24} />
            </button>

            {gallery.length > 1 && (
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
                key={selectedImage}
                src={getSafeSrc(gallery[selectedImage].src)}
                alt={gallery[selectedImage].alt}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="max-h-[84vh] max-w-full object-contain rounded-2xl shadow-2xl"
                referrerPolicy="no-referrer"
              />

              <p className="absolute bottom-16 left-1/2 -translate-x-1/2 text-white text-sm md:text-base bg-black/45 backdrop-blur-md px-4 py-2 rounded-full max-w-[85vw] text-center">
                {gallery[selectedImage].alt || `Detalhe ${name} ${selectedImage + 1}`}
              </p>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 text-white text-sm px-4 py-2 backdrop-blur-md">
                {selectedImage + 1} / {gallery.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectSection({
  project,
  slug,
  index,
}: {
  project: ProjectConfig;
  slug: string;
  index: number;
}) {
  const [openVideo, setOpenVideo] = useState(false);

  const name = getProjectName(project, slug);
  const isAurora = slug.toLowerCase() === "aurora";
  const canUseVideo = isAurora && !!project.heroVideo;
  const isReversed = index % 2 !== 0;

  return (
    <div className="mb-40 pb-20 border-b border-brand-dark/5">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            {project.statusBadge?.label ? (
              <span
                className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block
                ${
                  project.statusBadge.variant === "featured"
                    ? "bg-brand-gold text-brand-dark shadow-sm"
                    : project.statusBadge.variant === "building"
                    ? "bg-brand-gold/10 text-brand-gold"
                    : "bg-brand-dark/5 text-brand-dark/40"
                }`}
              >
                {project.statusBadge.label}
              </span>
            ) : null}

            <h3 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark">
              {name}
            </h3>
          </div>

          {project.description && (
            <p className="text-brand-dark/60 max-w-md text-lg">
              {project.description}
            </p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-12 gap-8 items-start"
        >
          {/* IMAGEM */}
          <div
            className={`lg:col-span-7 relative group overflow-hidden rounded-3xl shadow-2xl self-start ${
              isReversed ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div className="aspect-[16/9] relative">
              {canUseVideo ? (
                <>
                  <video
                    src={project.heroVideo}
                    poster={project.heroImage}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      onClick={() => setOpenVideo(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="
                        w-14 h-14 md:w-16 md:h-16
                        rounded-full
                        backdrop-blur-md
                        bg-white/10
                        border border-brand-gold/40
                        flex items-center justify-center
                        shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)]
                        transition-all duration-300
                        hover:bg-brand-gold/10
                        hover:border-brand-gold
                      "
                      type="button"
                      aria-label="Reproduzir vídeo"
                    >
                      <Play
                        size={20}
                        strokeWidth={1.5}
                        className="text-brand-gold ml-[2px]"
                      />
                    </motion.button>
                  </div>

                  {project.heroVideo && (
                    <VideoModal
                      open={openVideo}
                      onClose={() => setOpenVideo(false)}
                      src={project.heroVideo}
                      poster={project.heroImage}
                    />
                  )}
                </>
              ) : (
                <img
                  src={getSafeSrc(project.heroImage || `/img/${slug}/casa${slug}.jpeg`)}
                  alt={name}
                  className="block w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          </div>

          {/* TEXTO */}
          <div
            className={`lg:col-span-5 flex flex-col justify-center p-8 md:p-12 bg-brand-light rounded-3xl ${
              isReversed ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <h4 className="text-2xl font-serif font-bold mb-6 text-brand-dark">
              Destaques do Projeto
            </h4>

            {Array.isArray(project.highlights) && project.highlights.length ? (
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-10">
                {project.highlights.map((item, highlightIndex) => (
                  <LuxuryHighlight
                    key={`${item.label}-${highlightIndex}`}
                    label={item.label}
                    icon={item.icon}
                  />
                ))}
              </div>
            ) : null}

            <Link to={`/${slug}`} className="inline-block">
              <motion.span
                whileHover={{ x: 10 }}
                className="flex items-center gap-2 text-brand-gold font-bold text-lg group"
              >
                <ArrowRight size={18} />
                Mais detalhes
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </motion.span>
            </Link>
          </div>
        </motion.div>

        <ProjectGalleryPreview project={project} slug={slug} name={name} />
      </div>
    </div>
  );
}

// --- Page ---
export default function InstitutionalPage() {
  const projectsOrdered = useMemo(() => {
    const order = ["aurora", "roma", "montebello"] as const;

    return order
      .map((k) => ({ slug: k, project: toProject((PROJECTS as any)[k]) }))
      .filter(
        (x) => x.project && (x.project.name || x.project.heroImage || x.project.heroVideo)
      );
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <WhatsAppButton />

      {/* Hero */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 md:pt-40 pb-20"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="/img/aurora/casaaurora.jpeg"
            alt="Residência Exclusiva de Alto Padrão"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/80 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <span className="block text-xs tracking-[0.4em] text-white/40 uppercase mb-4">
              Residências Exclusivas
            </span>

            <span className="inline-block px-5 py-2 bg-brand-gold/20 backdrop-blur-md border border-brand-gold/30 rounded-full text-xs font-semibold tracking-[0.25em] uppercase mb-8 text-brand-gold">
              Arquitetura & Sofisticação
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-[1.1]">
              Mais do que uma casa,
              <br />
              <span className="italic text-brand-gold">uma experiência de viver</span>
            </h1>

            <p className="text-base sm:text-lg md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              Projetos autorais que unem design contemporâneo, conforto absoluto e valorização
              patrimonial.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="group w-full sm:w-auto bg-brand-gold text-brand-dark px-12 py-5 rounded-full text-lg font-semibold flex items-center justify-center gap-3 shadow-2xl shadow-brand-gold/40 hover:shadow-brand-gold/60 transition-all duration-300 hover:-translate-y-1"
              >
                <MessageCircle size={22} />
                Agendar visita exclusiva
              </motion.a>

              <motion.a
                href="#projetos"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-12 py-5 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
              >
                Explorar projetos
              </motion.a>
            </div>

            <p className="mt-10 text-sm font-medium text-white/60 flex items-center justify-center gap-2 tracking-wide">
              <Sparkles size={16} className="text-brand-gold" />
              Disponibilidade limitada para este semestre
            </p>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionTitle
                title="Autoridade em Construção"
                subtitle="A Realeza Empreendimentos nasceu com o propósito de entregar mais do que casas: entregar qualidade de vida."
              />
              <div className="space-y-6 text-lg text-brand-dark/70 leading-relaxed">
                <p>
                  Fundada em 20 de maio de 2020, nossa trajetória é marcada pela busca incessante
                  pela excelência. Cada projeto é desenvolvido com foco total em conforto,
                  funcionalidade e valorização imobiliária.
                </p>
                <p>
                  Garantimos um investimento seguro para o seu futuro e um lar completo para a sua
                  família, unindo técnicas construtivas modernas a um design atemporal.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                <video
                  src="/img/diaconcreto.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>

              <div className="absolute -bottom-10 -left-10 bg-white/80 backdrop-blur-md border border-white/20 shadow-xl p-8 rounded-2xl hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-dark">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-tighter text-brand-dark/40">
                      Garantia de Qualidade
                    </p>
                    <p className="text-xl font-serif font-bold">100% Seguro</p>
                  </div>
                </div>
                <p className="text-sm text-brand-dark/60 max-w-[200px]">
                  Processos rigorosos de fiscalização em cada etapa da obra.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Abner */}
      <section className="py-24 md:py-32 bg-brand-light">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="relative group">
                <div className="aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl">
                  <img
                    src="/img/abner.jpeg"
                    alt="Abner Severo"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -top-4 -right-4 bg-brand-gold text-brand-dark p-6 rounded-2xl shadow-xl">
                  <p className="text-4xl font-serif font-bold">10+</p>
                  <p className="text-xs font-bold uppercase tracking-widest">Anos de Visão</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <span className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-4 block">
                Engenheiro Civil
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-brand-dark">
                Um profissional por trás de <span className="italic">cada detalhe</span>
              </h2>
              <div className="space-y-6 text-lg text-brand-dark/70 leading-relaxed">
                <p className="font-medium text-brand-dark">
                  Abner Severo é o responsável pelos projetos da Realeza Empreendimentos, trazendo
                  uma visão moderna e estratégica para cada construção.
                </p>
                <p>
                  Seu compromisso vai além da obra: ele busca entregar casas que realmente façam
                  sentido para a vida das pessoas, unindo estética, funcionalidade e valorização
                  imobiliária.
                </p>
                <div className="pt-8">
                  <p className="font-serif text-3xl font-bold text-brand-dark">Abner Severo</p>
                  <p className="text-brand-gold font-medium">Engenheiro Civil</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projetos */}
      <section id="projetos" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle
            title="Nossos Projetos"
            subtitle="Explore residências projetadas para oferecer o máximo em sofisticação e bem-estar."
          />

          {projectsOrdered.map(({ slug, project }, index) => (
            <ProjectSection key={slug} slug={slug} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* Diferenciais */}
      <section
        id="diferenciais"
        className="py-24 md:py-32 bg-brand-dark text-white overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-green/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionTitle
            title="Por que escolher a Realeza?"
            subtitle="Nosso compromisso é com a entrega impecável e a satisfação total de quem confia o seu sonho em nossas mãos."
            light
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Maximize2 size={32} />,
                title: "Arquitetura Moderna",
                desc: "Projetos exclusivos com linhas contemporâneas e estética refinada.",
              },
              {
                icon: <ShieldCheck size={32} />,
                title: "Alto Padrão",
                desc: "Materiais de primeira linha e acabamento rigoroso em cada detalhe.",
              },
              {
                icon: <Trees size={32} />,
                title: "Foco em Valorização",
                desc: "Projetos estrategicamente pensados para garantir retorno financeiro.",
              },
              {
                icon: <Home size={32} />,
                title: "Funcionalidade",
                desc: "Ambientes inteligentes que facilitam a rotina e promovem o bem-estar.",
              },
              {
                icon: <MessageCircle size={32} />,
                title: "Transparência",
                desc: "Atendimento direto com os responsáveis e clareza em todas as etapas.",
              },
              {
                icon: <CheckCircle2 size={32} />,
                title: "Entrega Pontual",
                desc: "Respeito rigoroso aos prazos estabelecidos em contrato.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="w-16 h-16 bg-brand-gold/20 rounded-2xl flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h4 className="text-xl font-serif font-bold mb-4">{item.title}</h4>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/img/montebello/casamontebello.jpeg"
            alt="Fundo CTA"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-dark/80" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-7xl font-serif font-bold mb-8 leading-tight">
              Sua nova casa está mais próxima do que você imagina
            </h2>
            <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto">
              Fale agora com nossa equipe e descubra o projeto ideal para transformar sua vida.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-brand-gold text-brand-dark px-12 py-6 rounded-full text-xl font-bold flex items-center justify-center gap-3 shadow-2xl shadow-brand-gold/40"
              >
                <MessageCircle size={28} />
                Falar no WhatsApp
              </motion.a>

              <motion.a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-white text-brand-dark px-12 py-6 rounded-full text-xl font-bold flex items-center justify-center gap-3 shadow-2xl"
              >
                <Calendar size={28} />
                Agendar Visita
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};