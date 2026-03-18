import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { PROJECTS } from '../config/projects';

type NavLink = { name: string; href: string };

type NavbarProps = {
  whatsappLink: string;
  logoSrc?: string;
  logoSrcOnLight?: string;
  logoAlt?: string;
  navLinks?: NavLink[];
};

export default function Navbar({
  whatsappLink,
  logoSrc = '/img/logonv-light.png',
  logoSrcOnLight = '/img/logonv-dark.png',
  logoAlt = 'Realeza Empreendimentos',
  navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Empresa', href: '#sobre' },
    { name: 'Projetos', href: '#projetos' },
    { name: 'Diferenciais', href: '#diferenciais' },
  ],
}: NavbarProps) {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const solid = !isHome || isScrolled;

  const links = useMemo(() => {
    if (isHome) return navLinks;
    return [{ name: 'Voltar', href: '/' }] as NavLink[];
  }, [isHome, navLinks]);

  const projectLinks = useMemo(
    () =>
      Object.values(PROJECTS).map((project) => ({
        name: project.name,
        href: `/${project.key}`,
      })),
    [],
  );

  const logoToUse = solid ? logoSrcOnLight : logoSrc;

  const linkClassDesktop = solid
    ? 'text-sm font-medium text-brand-dark/70 hover:text-brand-dark transition-colors'
    : 'text-sm font-medium text-white/90 hover:text-brand-gold transition-colors';

  const dropdownClass = solid
    ? 'bg-white border border-black/5 shadow-xl'
    : 'bg-white/95 backdrop-blur-xl border border-white/20 shadow-xl';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        solid
          ? 'bg-white/90 backdrop-blur-xl py-1.5 border-b border-black/5 shadow-sm'
          : 'bg-transparent py-1.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center min-h-[52px] md:min-h-[64px]">
        {isHome ? (
          <a href="#home" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <img
              src={logoToUse}
              alt={logoAlt}
              className={`w-auto object-contain transition-all duration-300 ${
                solid ? 'h-[44px] md:h-[54px]' : 'h-[54px] md:h-[68px]'
              }`}
            />
          </a>
        ) : (
          <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <img
              src={logoToUse}
              alt={logoAlt}
              className={`w-auto object-contain transition-all duration-300 ${
                solid ? 'h-[60px] md:h-[72px]' : 'h-[72px] md:h-[96px]'
              }`}
            />
          </Link>
        )}

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            if (link.name === 'Projetos' && isHome) {
              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setIsProjectsOpen(true)}
                  onMouseLeave={() => setIsProjectsOpen(false)}
                >
                  <button
                    type="button"
                    className={`flex items-center gap-1 ${linkClassDesktop}`}
                  >
                    Projetos
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-200 ${
                        isProjectsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isProjectsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[240px] rounded-2xl p-3 ${dropdownClass}`}
                      >
                        <div className="flex flex-col">
                          <a
                            href="#projetos"
                            className="px-4 py-2.5 rounded-xl text-sm text-brand-dark/80 hover:bg-brand-gold/10 hover:text-brand-dark transition"
                          >
                            Ver todos
                          </a>

                          <div className="my-2 h-px bg-black/5" />

                          {projectLinks.map((project) => (
                            <Link
                              key={project.href}
                              to={project.href}
                              className="px-4 py-2.5 rounded-xl text-sm text-brand-dark/80 hover:bg-brand-gold/10 hover:text-brand-dark transition"
                            >
                              {project.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return link.href.startsWith('#') ? (
              <a key={link.name} href={link.href} className={linkClassDesktop}>
                {link.name}
              </a>
            ) : (
              <Link key={link.name} to={link.href} className={linkClassDesktop}>
                {link.name}
              </Link>
            );
          })}

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gold text-brand-dark px-5 py-2 rounded-full text-sm font-semibold"
          >
            Fale conosco
          </a>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          aria-label="Abrir menu"
        >
          {isMobileMenuOpen ? (
            <X className={solid ? 'text-brand-dark' : 'text-white'} />
          ) : (
            <Menu className={solid ? 'text-brand-dark' : 'text-white'} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col gap-4 md:hidden"
          >
            {links.map((link) => {
              if (link.name === 'Projetos' && isHome) {
                return (
                  <div key={link.name} className="flex flex-col">
                    <button
                      type="button"
                      onClick={() => setIsMobileProjectsOpen((v) => !v)}
                      className="flex items-center justify-between text-lg font-medium text-brand-dark hover:text-brand-gold"
                    >
                      Projetos
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${
                          isMobileProjectsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isMobileProjectsOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden pl-4 pt-3 flex flex-col gap-3"
                        >
                          <a
                            href="#projetos"
                            onClick={() => {
                              setIsMobileProjectsOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            className="text-base text-brand-dark/80 hover:text-brand-gold"
                          >
                            Ver todos
                          </a>

                          {projectLinks.map((project) => (
                            <Link
                              key={project.href}
                              to={project.href}
                              onClick={() => {
                                setIsMobileProjectsOpen(false);
                                setIsMobileMenuOpen(false);
                              }}
                              className="text-base text-brand-dark/80 hover:text-brand-gold"
                            >
                              {project.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return link.href.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-brand-dark hover:text-brand-gold"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-brand-dark hover:text-brand-gold"
                >
                  {link.name}
                </Link>
              );
            })}

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-gold text-white text-center py-4 rounded-xl font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Falar no WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}