import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  MessageCircle,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Instagram,
  ShieldCheck,
  Maximize2,
  Home,
  Trees,
  Sparkles,
  Play,
} from 'lucide-react';
import LuxuryHighlight from "../components/LuxuryHighlight";
 
import { PROJECTS } from '../config/projects';

// --- Config (evita WhatsApp diferente em vários lugares) ---
const WHATSAPP_NUMBER = '5551989066283';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

// ✅ Ajustado para bater com src/config/projects.tsx
type ProjectConfig = {
  key?: string; // "aurora" | "roma" | "montebello"
  name?: string;
  description?: string;

  statusBadge?: { label: string; variant?: 'featured' | 'building' | 'default' };

  instagramUrl?: string;

  heroImage?: string;
  heroVideo?: string; // somente aurora

  highlights?: string[];

  // ✅ no config: gallery é array de { src, alt }
  gallery?: { src: string; alt: string }[];
};

const toProject = (p: unknown): ProjectConfig => (p ?? {}) as ProjectConfig;

// --- Components ---
const WhatsAppButton = () => (
  <motion.a
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
    aria-label="Falar no WhatsApp"
  >
    <MessageCircle size={32} />
    <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 whitespace-nowrap font-medium">
      Falar conosco
    </span>
  </motion.a>
);

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
      className={`text-3xl md:text-5xl font-serif font-bold mb-4 ${light ? 'text-white' : 'text-brand-dark'}`}
    >
      {title}
    </motion.h2>

    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-lg md:text-xl max-w-2xl ${light ? 'text-white/70' : 'text-brand-dark/60'}`}
      >
        {subtitle}
      </motion.p>
    )}

    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: '80px' }}
      viewport={{ once: true }}
      className="h-1 bg-brand-gold mt-6"
    />
  </div>
);

function getProjectName(p: ProjectConfig, fallback: string) {
  return p.name || fallback;
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
  const name = getProjectName(project, slug);

  const isAurora = slug.toLowerCase() === 'aurora';
  const canUseVideo = isAurora && !!project.heroVideo; // ✅ somente Aurora usa vídeo
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
                  project.statusBadge.variant === 'featured'
                    ? 'bg-brand-gold text-brand-dark shadow-sm'
                    : project.statusBadge.variant === 'building'
                      ? 'bg-brand-gold/10 text-brand-gold'
                      : 'bg-brand-dark/5 text-brand-dark/40'
                }`}
              >
                {project.statusBadge.label}
              </span>
            ) : null}

            <h3 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark">{name}</h3>
          </div>

          {project.description && <p className="text-brand-dark/60 max-w-md text-lg">{project.description}</p>}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* IMAGEM */}
          <div
            className={`lg:col-span-7 relative group overflow-hidden rounded-3xl shadow-2xl bg-brand-dark ${
              isReversed ? 'lg:order-2' : 'lg:order-1'
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
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-20 h-20 bg-brand-gold text-brand-dark rounded-full flex items-center justify-center shadow-2xl"
                      type="button"
                      aria-label="Vídeo"
                    >
                      <Play fill="currentColor" size={32} className="ml-1" />
                    </motion.button>
                  </div>
                </>
              ) : (
                <img
                  src={project.heroImage || `/img/${slug}/casa${slug}.jpeg`}
                  alt={name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          </div>

          {/* TEXTO */}
          <div
            className={`lg:col-span-5 flex flex-col justify-center p-8 md:p-12 bg-brand-light rounded-3xl ${
              isReversed ? 'lg:order-1' : 'lg:order-2'
            }`}
          >
            <h4 className="text-2xl font-serif font-bold mb-6 text-brand-dark">Destaques do Projeto</h4>

            {Array.isArray(project.highlights) && project.highlights.length ? (
			  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
				{project.highlights.map((item) => (
				  <LuxuryHighlight key={item} label={item} />
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

        {Array.isArray(project.gallery) && project.gallery.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.gallery.slice(0, 4).map((img, i) => (
              <motion.div
                key={`${slug}-g-${i}-${img.src}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="aspect-square rounded-2xl overflow-hidden shadow-lg group"
              >
                <img
                  src={img.src}
                  alt={img.alt || `Detalhe ${name} ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- Page ---
export default function InstitutionalPage() {
  const projectsOrdered = useMemo(() => {
    const order = ['aurora', 'roma', 'montebello'] as const;
    return order
      .map((k) => ({ slug: k, project: toProject((PROJECTS as any)[k]) }))
      .filter((x) => x.project && (x.project.name || x.project.heroImage || x.project.heroVideo));
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
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <span className="block text-xs tracking-[0.4em] text-white/40 uppercase mb-4">Residências Exclusivas</span>

            <span className="inline-block px-5 py-2 bg-brand-gold/20 backdrop-blur-md border border-brand-gold/30 rounded-full text-xs font-semibold tracking-[0.25em] uppercase mb-8 text-brand-gold">
              Arquitetura & Sofisticação
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-[1.1]">
              Mais do que uma casa,
              <br />
              <span className="italic text-brand-gold">uma experiência de viver</span>
            </h1>

            <p className="text-base sm:text-lg md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed">
              Projetos autorais que unem design contemporâneo, conforto absoluto e valorização patrimonial.
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
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionTitle
                title="Autoridade em Construção"
                subtitle="A Realeza Empreendimentos nasceu com o propósito de entregar mais do que casas: entregar qualidade de vida."
              />
              <div className="space-y-6 text-lg text-brand-dark/70 leading-relaxed">
                <p>
                  Fundada em 20 de maio de 2020, nossa trajetória é marcada pela busca incessante pela excelência. Cada
                  projeto é desenvolvido com foco total em conforto, funcionalidade e valorização imobiliária.
                </p>
                <p>
                  Garantimos um investimento seguro para o seu futuro e um lar completo para a sua família, unindo
                  técnicas construtivas modernas a um design atemporal.
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
                <video src="/img/diaconcreto.mp4" className="w-full h-full object-cover" autoPlay loop muted playsInline />
              </div>

              <div className="absolute -bottom-10 -left-10 bg-white/80 backdrop-blur-md border border-white/20 shadow-xl p-8 rounded-2xl hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-dark">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-tighter text-brand-dark/40">Garantia de Qualidade</p>
                    <p className="text-xl font-serif font-bold">100% Seguro</p>
                  </div>
                </div>
                <p className="text-sm text-brand-dark/60 max-w-[200px]">Processos rigorosos de fiscalização em cada etapa da obra.</p>
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
              <span className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-4 block">Engenheiro Civil</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-brand-dark">
                Um profissional por trás de <span className="italic">cada detalhe</span>
              </h2>
              <div className="space-y-6 text-lg text-brand-dark/70 leading-relaxed">
                <p className="font-medium text-brand-dark">
                  Abner Severo é o responsável pelos projetos da Realeza Empreendimentos, trazendo uma visão moderna e
                  estratégica para cada construção.
                </p>
                <p>
                  Seu compromisso vai além da obra: ele busca entregar casas que realmente façam sentido para a vida das
                  pessoas, unindo estética, funcionalidade e valorização imobiliária.
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
      <section id="diferenciais" className="py-24 md:py-32 bg-brand-dark text-white overflow-hidden relative">
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
              { icon: <Maximize2 size={32} />, title: 'Arquitetura Moderna', desc: 'Projetos exclusivos com linhas contemporâneas e estética refinada.' },
              { icon: <ShieldCheck size={32} />, title: 'Alto Padrão', desc: 'Materiais de primeira linha e acabamento rigoroso em cada detalhe.' },
              { icon: <Trees size={32} />, title: 'Foco em Valorização', desc: 'Projetos estrategicamente pensados para garantir retorno financeiro.' },
              { icon: <Home size={32} />, title: 'Funcionalidade', desc: 'Ambientes inteligentes que facilitam a rotina e promovem o bem-estar.' },
              { icon: <MessageCircle size={32} />, title: 'Transparência', desc: 'Atendimento direto com os responsáveis e clareza em todas as etapas.' },
              { icon: <CheckCircle2 size={32} />, title: 'Entrega Pontual', desc: 'Respeito rigoroso aos prazos estabelecidos em contrato.' },
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
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
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
}