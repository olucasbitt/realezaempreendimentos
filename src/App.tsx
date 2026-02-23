/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X, 
  Instagram, 
  Facebook, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Maximize2, 
  Home, 
  Trees, 
  Sparkles,
  Play,
  Mountain,
  Leaf,
  Compass
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Empresa', href: '#sobre' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Diferenciais', href: '#diferenciais' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-serif font-bold tracking-tighter flex items-center gap-2">
          <span className={isScrolled ? 'text-brand-dark' : 'text-white'}>REALEZA</span>
          <span className="text-brand-gold">EMPREENDIMENTOS</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium hover:text-brand-gold transition-colors ${isScrolled ? 'text-brand-dark' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/5500000000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-brand-gold text-brand-dark px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-gold/90 transition-all shadow-lg shadow-brand-gold/20"
          >
            Falar no WhatsApp
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-brand-dark' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-brand-dark' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-brand-dark hover:text-brand-gold"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://wa.me/5500000000000" 
              className="bg-brand-green text-white text-center py-4 rounded-xl font-bold"
            >
              Falar no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/5500000000000"
    target="_blank"
    rel="noopener noreferrer"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl flex items-center justify-center group"
  >
    <MessageCircle size={32} />
    <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 whitespace-nowrap font-medium">
      Falar conosco
    </span>
  </motion.a>
);

const SectionTitle = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
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
      className="h-1 bg-brand-green mt-6"
    />
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <WhatsAppButton />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/img/casaaurora.jpeg" 
            alt="Casa Moderna de Alto Padrão" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          > 
			 
            <span className="inline-block px-4 py-1.5 bg-brand-gold/20 backdrop-blur-sm border border-brand-gold/30 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-6 text-brand-gold">
              Exclusividade & Alto Padrão
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 leading-[1.1] text-balance">
              Mais do que uma casa,<br />
              <span className="italic text-brand-gold">um novo padrão de vida</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 text-balance">
              Projetos modernos, funcionais e prontos para valorizar seu futuro. Viva onde o design encontra o conforto.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a 
                href="https://wa.me/5500000000000"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-brand-gold text-brand-dark px-10 py-5 rounded-full text-lg font-bold flex items-center justify-center gap-2 shadow-2xl shadow-brand-gold/40"
              >
                <MessageCircle size={24} />
                Falar no WhatsApp
              </motion.a>
              <motion.a 
                href="#projetos"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white/20 transition-all"
              >
                Ver projetos
              </motion.a>
            </div>
            
            <p className="mt-8 text-sm font-medium text-white/60 flex items-center justify-center gap-2">
              <Sparkles size={16} className="text-brand-gold" />
              Poucas unidades disponíveis para este semestre
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Sobre a Empresa */}
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
                  Fundada em 20 de maio de 2020, nossa trajetória é marcada pela busca incessante pela excelência. Cada projeto é desenvolvido com foco total em conforto, funcionalidade e valorização imobiliária.
                </p>
                <p>
                  Garantimos um investimento seguro para o seu futuro e um lar completo para a sua família, unindo técnicas construtivas modernas a um design atemporal.
                </p>
                <div className="pt-6 flex flex-col gap-2">
                  <span className="text-sm font-bold text-brand-dark/40 uppercase tracking-widest">Identificação Fiscal</span>
                  <span className="text-xl font-serif font-bold text-brand-dark">CNPJ: 37.187.998/0001-95</span>
                </div>
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
				src="img/diaconcreto.mp4"
				className="w-full h-full object-cover"
				autoPlay
				loop
				muted
				playsInline
			  />
			</div>
              <div className="absolute -bottom-10 -left-10 glass-card p-8 rounded-2xl hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-dark">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold uppercase tracking-tighter text-brand-dark/40">Garantia de Qualidade</p>
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

      {/* Abner Severo Section */}
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
                    src="img/abner.jpeg" 
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
                  Abner Severo é o responsável pelos projetos da Realeza Empreendimentos, trazendo uma visão moderna e estratégica para cada construção.
                </p>
                <p>
                  Seu compromisso vai além da obra: ele busca entregar casas que realmente façam sentido para a vida das pessoas, unindo estética, funcionalidade e valorização imobiliária.
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

      {/* Projetos Section */}
      <section id="projetos" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <SectionTitle 
            title="Nossos Projetos" 
            subtitle="Explore residências projetadas para oferecer o máximo em sofisticação e bem-estar."
          />

          {/* Casa Aurora - Destaque */}
          <div className="mb-40 pb-20 border-b border-brand-dark/5">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                  <span className="bg-brand-gold text-brand-dark px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block shadow-sm">Projeto em Destaque</span>
                  <h3 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark">Casa Aurora</h3>
                </div>
                <p className="text-brand-dark/60 max-w-md text-lg">
                  O ápice do conforto contemporâneo em uma residência de 109m² pensada para a vida moderna.
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
                   <video
					  src="img/casaaurora.mp4"
					  className="w-full h-full object-cover"
					  autoPlay
					  loop
					  muted
					/>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-20 h-20 bg-brand-gold text-brand-dark rounded-full flex items-center justify-center shadow-2xl"
                      >
                        <Play fill="currentColor" size={32} className="ml-1" />
                      </motion.button>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-5 flex flex-col justify-center p-8 md:p-12 bg-brand-light rounded-3xl">
                  <h4 className="text-2xl font-serif font-bold mb-6 text-brand-dark">Destaques do Projeto</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {[
                      '3 Quartos (1 Suíte)',
                      '2 Vagas de Garagem',
                      '109m² de Área',
                      'Área Gourmet',
                      'Design Minimalista',
                      'Acabamento Premium'
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-brand-dark/80 font-medium text-sm">
                        <CheckCircle2 className="text-brand-gold" size={18} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <motion.a 
                    href="https://wa.me/5500000000000"
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-2 text-brand-gold font-bold text-lg group"
                  >
                    Solicitar Detalhes
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-square rounded-2xl overflow-hidden shadow-lg group"
                  >
                    <img 
                      src={`img/aurora${i}.jpeg`} 
                      alt={`Detalhe Casa Aurora ${i}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Casa Roma */}
          <div className="mb-40 pb-20 border-b border-brand-dark/5">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                  <span className="bg-brand-gold/10 text-brand-gold px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">Em Construção</span>
                  <h3 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark">Casa Roma</h3>
                </div>
                <p className="text-brand-dark/60 max-w-md text-lg">
                  Um projeto moderno em fase de execução que une elegância, conforto e integração total.
                </p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-12 gap-8 items-stretch"
              >
                <div className="lg:col-span-5 flex flex-col justify-center p-8 md:p-12 bg-brand-light rounded-3xl order-2 lg:order-1">
                  <h4 className="text-2xl font-serif font-bold mb-6 text-brand-dark">Ficha Técnica</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 mb-10">
                    {[
                      { icon: <Home size={18} />, text: '3 Quartos (1 Suíte)' },
                      { icon: <Sparkles size={18} />, text: 'Sala/Cozinha Integrada' },
                      { icon: <ShieldCheck size={18} />, text: 'Lareira & Churrasqueira' },
                      { icon: <Maximize2 size={18} />, text: 'Garagem Coberta' },
                      { icon: <Trees size={18} />, text: 'Pátio com Piscina' },
                      { icon: <CheckCircle2 size={18} />, text: 'Espaço Amplo' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm font-bold text-brand-dark/60">
                        <span className="text-brand-gold">{item.icon}</span>
                        {item.text}
                      </div>
                    ))}
                  </div>
                  <motion.a 
                    href="https://wa.me/5500000000000"
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-2 text-brand-gold font-bold text-lg group"
                  >
                    Acompanhar Obra
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </div>

                <div className="lg:col-span-7 relative group overflow-hidden rounded-3xl shadow-2xl order-1 lg:order-2">
                  <div className="aspect-[16/9] relative">
                    <img 
                      src="img/casaroma.jpeg" 
                      alt="Casa Roma Perspectiva" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-square rounded-2xl overflow-hidden shadow-lg group"
                  >
                    <img 
                      src={`https://picsum.photos/seed/roma-gallery-${i}/600/600`} 
                      alt={`Detalhe Casa Roma ${i}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Casa Montebello */}
          <div className="mb-20">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                  <span className="bg-brand-dark/5 text-brand-dark/40 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">Natureza & Sofisticação</span>
                  <h3 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark">Casa Montebello</h3>
                </div>
                <p className="text-brand-dark/60 max-w-md text-lg">
                  Um refúgio urbano de alto padrão para quem busca tranquilidade e contato com a natureza.
                </p>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid lg:grid-cols-12 gap-8 items-stretch"
              >
                <div className="lg:col-span-7 relative group overflow-hidden rounded-3xl shadow-2xl">
                  <div className="aspect-[16/9] relative">
                    <img 
                      src="img/casamontebello.jpeg" 
                      alt="Casa Montebello Fachada" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col justify-center p-8 md:p-12 bg-brand-light rounded-3xl">
                  <h4 className="text-2xl font-serif font-bold mb-6 text-brand-dark">Diferenciais Exclusivos</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {[
                      { icon: <Mountain size={18} />, text: 'Vista Panorâmica' },
                      { icon: <Sparkles size={18} />, text: 'Área Gourmet' },
                      { icon: <Home size={18} />, text: 'Suíte Master' },
                      { icon: <Trees size={18} />, text: 'Jardim Planejado' },
                      { icon: <Leaf size={18} />, text: 'Sustentabilidade' },
                      { icon: <ShieldCheck size={18} />, text: 'Privacidade' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm font-bold text-brand-dark/60">
                        <span className="text-brand-gold">{item.icon}</span>
                        {item.text}
                      </div>
                    ))}
                  </div>
                  <motion.a 
                    href="https://wa.me/5500000000000"
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-2 text-brand-gold font-bold text-lg group"
                  >
                    Conhecer Projeto
                    <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </motion.div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-square rounded-2xl overflow-hidden shadow-lg group"
                  >
                    <img 
                      src={`https://picsum.photos/seed/montebello-gallery-${i}/600/600`} 
                      alt={`Detalhe Casa Montebello ${i}`} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section id="diferenciais" className="py-24 md:py-32 bg-brand-dark text-white overflow-hidden relative">
        {/* Decorative Elements */}
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
                title: 'Arquitetura Moderna',
                desc: 'Projetos exclusivos com linhas contemporâneas e estética refinada.'
              },
              {
                icon: <ShieldCheck size={32} />,
                title: 'Alto Padrão',
                desc: 'Materiais de primeira linha e acabamento rigoroso em cada detalhe.'
              },
              {
                icon: <Trees size={32} />,
                title: 'Foco em Valorização',
                desc: 'Projetos estrategicamente pensados para garantir retorno financeiro.'
              },
              {
                icon: <Home size={32} />,
                title: 'Funcionalidade',
                desc: 'Ambientes inteligentes que facilitam a rotina e promovem o bem-estar.'
              },
              {
                icon: <MessageCircle size={32} />,
                title: 'Transparência',
                desc: 'Atendimento direto com os responsáveis e clareza em todas as etapas.'
              },
              {
                icon: <CheckCircle2 size={32} />,
                title: 'Entrega Pontual',
                desc: 'Respeito rigoroso aos prazos estabelecidos em contrato.'
              }
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

      {/* Final CTA */}
      <section className="py-24 md:py-40 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/cta-bg/1920/1080?blur=2" 
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
                href="https://wa.me/5500000000000"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-brand-gold text-brand-dark px-12 py-6 rounded-full text-xl font-bold flex items-center justify-center gap-3 shadow-2xl shadow-brand-gold/40"
              >
                <MessageCircle size={28} />
                Falar no WhatsApp
              </motion.a>
              <motion.a 
                href="https://wa.me/5500000000000"
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

      {/* Footer */}
      <footer className="bg-white py-20 border-t border-brand-dark/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <a href="#home" className="text-3xl font-serif font-bold tracking-tighter flex items-center gap-2 mb-6">
                <span className="text-brand-dark">REALEZA</span>
                <span className="text-brand-gold">EMPREENDIMENTOS</span>
              </a>
              <p className="text-brand-dark/60 max-w-sm mb-8 leading-relaxed">
                Excelência em construção civil e incorporação imobiliária. Transformando sonhos em endereços de alto padrão desde 2020.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-brand-dark/10 flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-brand-dark/10 flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-all">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h5 className="font-bold uppercase tracking-widest text-xs text-brand-dark/40 mb-6">Contato</h5>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-brand-dark/70">
                  <MapPin size={20} className="text-brand-gold shrink-0" />
                  <span>Rua xxx, Viamão - RS</span>
                </li>
                <li className="flex items-center gap-3 text-brand-dark/70">
                  <Phone size={20} className="text-brand-gold shrink-0" />
                  <span>(51) 999999-9999</span>
                </li>
                <li className="flex items-center gap-3 text-brand-dark/70">
                  <MessageCircle size={20} className="text-brand-gold shrink-0" />
                  <span>contato@realeza.com.br</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold uppercase tracking-widest text-xs text-brand-dark/40 mb-6">Institucional</h5>
              <p className="text-sm text-brand-dark/70 mb-2">CNPJ: 37.187.998/0001-95</p>
              <p className="text-sm text-brand-dark/70">Responsável: Abner Severo</p>
            </div>
          </div>
          
          <div className="pt-12 border-t border-brand-dark/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-brand-dark/40">
              © {new Date().getFullYear()} Realeza Empreendimentos. Todos os direitos reservados.
            </p>
            <div className="flex gap-8 text-sm font-bold text-brand-dark/40 uppercase tracking-tighter">
              <a href="#" className="hover:text-brand-gold transition-colors">Privacidade</a>
              <a href="#" className="hover:text-brand-gold transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
