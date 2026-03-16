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
    <div className="mb-32 border-b border-brand-dark/6 pb-20 md:mb-40">
      <div className="flex flex-col gap-8 md:gap-10">
        <div className="max-w-4xl">
          {project.statusBadge?.label && (
  <span
    className={`mb-5 inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]
    ${
      project.statusBadge.variant === "featured"
        ? "bg-brand-gold/90 text-brand-dark shadow-[0_10px_25px_-15px_rgba(0,0,0,0.35)]"
        : "bg-brand-gold/90  text-brand-dark shadow-[0_10px_25px_-15px_rgba(0,0,0,0.35)]"
    }`}
  >
    {project.statusBadge.label}
  </span>
)}

          <h3 className="mb-6 text-4xl font-serif font-bold tracking-[-0.03em] text-brand-dark md:text-6xl">
            {name}
          </h3>

          {project.description &&
            (slug === "roma" ? (
              <div className="max-w-[36rem] space-y-0.5 text-[1.02rem] leading-[1.45] text-brand-dark/65 md:text-[1.12rem]">
                <p>No dia de frio, a lareira aquece a casa.</p>
                <p>No dia de sol, a churrasqueira reúne a família.</p>
                <p>No dia de festa, espaço para receber os amigos.</p>
                <p>No dia de trabalho, um lugar tranquilo para o home office.</p>
                <p>No dia de lazer, espaço para brincar e aproveitar.</p>
                <p>E até nos dias de chuva, sair de carro sem se molhar.</p>

                <div className="pt-3">
                  <div className="mb-3 h-px w-16 bg-gradient-to-r from-brand-gold via-brand-gold/40 to-transparent" />
                  <p className="font-semibold tracking-[0.01em] text-brand-dark">
                    <span className="text-brand-gold">Casa Roma.</span> Uma casa pensada para
                    todos os momentos da vida.
                  </p>
                </div>
              </div>
            ) : slug === "montebello" ? (
              <div className="max-w-[36rem] space-y-0.5 text-[1.02rem] leading-[1.45] text-brand-dark/65 md:text-[1.12rem]">
                <p>Tem momentos da vida em que a família cresce…</p>
                <p>e a casa precisa acompanhar.</p>
                <p className="pt-1">Mais espaço, mais conforto, mais momentos juntos.</p>

                <div className="pt-3">
                  <div className="mb-3 h-px w-16 bg-gradient-to-r from-brand-gold via-brand-gold/40 to-transparent" />
                  <p className="font-semibold tracking-[0.01em] text-brand-dark">
                    Foi pensando nisso que a{" "}
                    <span className="text-brand-gold">Casa Montebello</span> foi projetada e
                    construída.
                  </p>
                </div>
              </div>
            ) : (
              <p className="max-w-[36rem] text-[1.02rem] leading-[1.72] text-brand-dark/65 md:text-[1.12rem]">
                {project.description}
              </p>
            ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid items-start gap-8 lg:grid-cols-12"
        >
          <div
            className={`group relative self-start overflow-hidden rounded-[30px] border border-black/5 shadow-[0_30px_70px_-38px_rgba(0,0,0,0.42)] lg:col-span-7 ${
              isReversed ? "lg:order-2" : "lg:order-1"
            }`}
          >
            <div className="relative aspect-[16/9]">
              {canUseVideo ? (
                <>
                  <video
                    src={project.heroVideo}
                    poster={project.heroImage}
                    className="h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      onClick={() => setOpenVideo(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-gold/40 bg-white/10 backdrop-blur-md shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-brand-gold hover:bg-brand-gold/10 md:h-16 md:w-16"
                      type="button"
                      aria-label="Reproduzir vídeo"
                    >
                      <Play
                        size={20}
                        strokeWidth={1.5}
                        className="ml-[2px] text-brand-gold"
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
                  className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          </div>

          <div
            className={`flex flex-col justify-center rounded-[28px] border border-brand-dark/8 bg-[#faf8f3] p-8 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.28)] md:p-10 lg:col-span-5 ${
              isReversed ? "lg:order-1" : "lg:order-2"
            }`}
          >
            <div className="mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-dark/35">
                Diferenciais
              </p>
              <div className="mt-4 h-px w-16 bg-gradient-to-r from-brand-gold via-brand-gold/40 to-transparent" />
            </div>

            <h4 className="mb-6 text-[1.65rem] font-serif font-bold tracking-[-0.02em] text-brand-dark">
              Destaques do Projeto
            </h4>

            {Array.isArray(project.highlights) && project.highlights.length ? (
              <div className="mb-10 grid grid-cols-2 gap-3 md:gap-4">
                {project.highlights.map((item, highlightIndex) => (
                  <LuxuryHighlight
                    key={`${item.label}-${highlightIndex}`}
                    label={item.label}
                    icon={item.icon}
                  />
                ))}
              </div>
            ) : null}

            <Link to={`/${slug}`} className="inline-flex w-fit items-center gap-2 pt-2">
              <motion.span
                whileHover={{ x: 6 }}
                className="group inline-flex items-center gap-2 text-[1rem] font-semibold text-brand-dark"
              >
                <span className="text-brand-gold">
                  <ArrowRight size={17} />
                </span>
                Mais detalhes
                <ChevronRight
                  size={18}
                  className="text-brand-gold transition-transform group-hover:translate-x-1"
                />
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
  const [openConcreteVideo, setOpenConcreteVideo] = useState(false);
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
		<section id="sobre" className="bg-white py-24 md:py-32">
		  <div className="mx-auto max-w-7xl px-6">
			<div className="grid items-center gap-16 md:grid-cols-2 md:gap-24">
			  <motion.div
				initial={{ opacity: 0, x: -32 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
				className="max-w-[36rem]"
			  >
				<motion.p
				  initial={{ opacity: 0, y: 14 }}
				  whileInView={{ opacity: 1, y: 0 }}
				  viewport={{ once: true }}
				  className="mb-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-brand-gold/90"
				>
				  Sobre a Realeza
				</motion.p>

				<motion.h2
				  initial={{ opacity: 0, y: 14 }}
				  whileInView={{ opacity: 1, y: 0 }}
				  viewport={{ once: true }}
				  transition={{ delay: 0.04 }}
				  className="text-[2.15rem] font-serif font-bold leading-[1.02] tracking-[-0.03em] text-brand-dark md:text-[3.35rem]"
				>
				  Realeza Empreendimentos
				</motion.h2>

				<motion.div
				  initial={{ width: 0 }}
				  whileInView={{ width: "68px" }}
				  viewport={{ once: true }}
				  transition={{ delay: 0.08 }}
				  className="mt-7 h-px bg-gradient-to-r from-brand-gold via-brand-gold/35 to-transparent"
				/>

				<motion.p
				  initial={{ opacity: 0, y: 14 }}
				  whileInView={{ opacity: 1, y: 0 }}
				  viewport={{ once: true }}
				  transition={{ delay: 0.1 }}
				  className="mt-7 text-[1rem] leading-[1.9] text-brand-dark/62 md:text-[1.06rem]"
				>
				  Acreditamos que uma casa é muito mais do que paredes e telhado. É o lugar onde a vida acontece: onde a família cresce, onde os sonhos ganham forma e onde os momentos mais importantes são vividos.
				</motion.p>

				<div className="mt-8 space-y-6 text-[1rem] leading-[1.9] text-brand-dark/62 md:text-[1.06rem]">
				  <p>
					Cada projeto é pensado com cuidado e propósito. Desenvolvemos casas que unem{" "}
					<span className="font-medium text-brand-dark/88">
					  conforto, funcionalidade e beleza
					</span>
					, criando ambientes que acolhem a rotina da família e valorizam cada momento vivido dentro do lar.
				  </p>

				  <p>
					Utilizamos técnicas construtivas modernas, atenção aos detalhes e um design atemporal para entregar mais do que um imóvel: entregamos{" "}
					<span className="font-medium text-brand-dark/88">
					  segurança, qualidade e valorização para o futuro
					</span>
					.
				  </p>

				  <div className="pt-1">
					<p className="text-brand-dark/62">
					  Porque no final, construir uma casa não é apenas levantar uma obra.
					</p>

					<p className=" text-[1.05rem] leading-[1.8] text-brand-dark/82 md:text-[1.12rem]">
					  É criar o espaço onde{" "}
					  <span className="font-medium text-brand-gold">
						histórias serão vividas por muitos anos.
					  </span>
					</p>
				  </div>

				  <div className="pt-3">
					<div className="mb-3 h-px w-12 bg-brand-gold/35" />
					<p className="text-[0.98rem] font-medium tracking-[0.005em] text-brand-dark/88">
					  Realeza Empreendimentos — construindo lares para viver, crescer e prosperar.
					</p>
				  </div>
				</div>
			  </motion.div>

			  <motion.div
				initial={{ opacity: 0, x: 32 }}
				whileInView={{ opacity: 1, x: 0 }}
				viewport={{ once: true }}
				className="relative"
			  >
				<div className="overflow-hidden rounded-[32px] border border-black/5 shadow-[0_28px_70px_-42px_rgba(0,0,0,0.32)]">
				  <div className="relative aspect-[4/5] group">
					<video
					  src="/img/diaconcreto.mp4"
					  className="h-full w-full object-cover"
					  autoPlay
					  loop
					  muted
					  playsInline
					/>

					<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

					<div className="absolute inset-0 flex items-center justify-center">
					  <motion.button
						type="button"
						onClick={() => setOpenConcreteVideo(true)}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.96 }}
						className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-gold/40 bg-white/10 backdrop-blur-md shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] transition-all duration-300 hover:border-brand-gold hover:bg-brand-gold/10 md:h-16 md:w-16"
						aria-label="Reproduzir vídeo do dia do concreto"
					  >
						<Play
						  size={20}
						  strokeWidth={1.5}
						  className="ml-[2px] text-brand-gold"
						/>
					  </motion.button>
					</div>
				  </div>
				</div>

				<VideoModal
				  open={openConcreteVideo}
				  onClose={() => setOpenConcreteVideo(false)}
				  src="/img/diaconcreto.mp4"
				  orientation="vertical"
				/>

				<div className="absolute -bottom-6 -left-6 hidden rounded-[22px] border border-white/40 bg-white/82 px-6 py-5 shadow-[0_22px_55px_-38px_rgba(0,0,0,0.28)] backdrop-blur-xl md:block">
				  <div className="flex items-center gap-4">
					<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-gold text-brand-dark">
					  <ShieldCheck size={20} />
					</div>

					<div>
					  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-dark/35">
						Garantia de Qualidade
					  </p>
					  <p className="mt-1 text-[1.02rem] font-semibold text-brand-dark">
						Fiscalização em cada etapa
					  </p>
					</div>
				  </div>
				</div>
			  </motion.div>
			</div>
		  </div>
		</section>

      {/* Abner */}
	<section className="bg-[#faf8f4] py-24 md:py-32">
	  <div className="max-w-7xl mx-auto px-6">
		<div className="grid items-center gap-16 md:grid-cols-2 md:gap-20">
		  <motion.div
			initial={{ opacity: 0, x: -30 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			className="order-2 md:order-1"
		  >
			<div className="group relative mx-auto max-w-[26rem]">
			  <div className="overflow-hidden rounded-[34px] border border-white/70 bg-white p-3 shadow-[0_30px_70px_-38px_rgba(0,0,0,0.28)]">
				<div className="aspect-[4/5] overflow-hidden rounded-[28px]">
				  <img
					src="/img/abner.jpeg"
					alt="Abner Severo"
					className="h-full w-full object-cover grayscale-[55%] transition-all duration-700 group-hover:grayscale-0"
					referrerPolicy="no-referrer"
				  />
				</div>
			  </div>

			  <div className="absolute -top-4 -right-4 rounded-[22px] bg-brand-gold px-6 py-5 text-brand-dark shadow-[0_20px_45px_-25px_rgba(0,0,0,0.35)]">
				<p className="text-4xl font-serif font-bold leading-none">10+</p>
				<p className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em]">
				  Anos de Visão
				</p>
			  </div>

			  <div className="absolute -bottom-6 -left-6 hidden rounded-[20px] border border-brand-dark/8 bg-white/90 px-5 py-4 shadow-[0_20px_50px_-35px_rgba(0,0,0,0.3)] backdrop-blur-xl md:block">
				<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-dark/35">
				  Responsável técnico
				</p>
				<p className="mt-1 text-sm font-semibold text-brand-dark">
				  Engenharia com visão estratégica
				</p>
			  </div>
			</div>
		  </motion.div>

		  <motion.div
			initial={{ opacity: 0, x: 30 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			className="order-1 md:order-2"
		  >
			<h2 className="text-[2.2rem] font-serif font-bold leading-tight tracking-[-0.03em] text-brand-dark md:text-6xl">
			  Um profissional por trás de{" "}
			  <span className="italic">cada detalhe</span>
			</h2>

			<div className="mt-7 h-px w-16 bg-gradient-to-r from-brand-gold via-brand-gold/40 to-transparent" />

			<div className="mt-8 space-y-5 text-[1.02rem] leading-[1.8] text-brand-dark/66 md:text-[1.1rem]">
			  <p className="font-medium text-brand-dark">
				Abner Severo é o responsável pelos projetos da Realeza Empreendimentos, trazendo
				uma visão moderna e estratégica para cada construção.
			  </p>

			  <p>
				Seu compromisso vai além da obra: ele busca entregar casas que realmente façam
				sentido para a vida das pessoas, unindo estética, funcionalidade e valorização
				imobiliária.
			  </p>

			  <div className="pt-4">
				<div className="mb-3 h-px w-16 bg-gradient-to-r from-brand-gold via-brand-gold/35 to-transparent" />
				<p className="font-serif text-3xl font-bold tracking-[-0.02em] text-brand-dark">
				  Abner Severo
				</p>
				<p className="mt-1 font-medium text-brand-gold">
				  Engenheiro Civil
				</p>
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