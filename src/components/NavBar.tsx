import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type NavLink = { name: string; href: string };

type NavbarProps = {
  whatsappLink: string;
  // logo padrão (usado na home)
  logoSrc?: string;
  // logo para páginas internas (fundo branco)
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Em páginas internas, sempre navbar "sólido" (fundo claro + texto escuro)
  const solid = !isHome || isScrolled;

  const links = useMemo(() => {
    // Na home mantém âncoras
    if (isHome) return navLinks;

    // Em páginas internas, não faz sentido âncora.
    // Mantém só um "Voltar" e um atalho para WhatsApp.
    return [{ name: 'Voltar', href: '/' }] as NavLink[];
  }, [isHome, navLinks]);

  const logoToUse = solid ? logoSrcOnLight : logoSrc;

  const linkClassDesktop = solid
    ? 'text-sm font-medium text-brand-dark/70 hover:text-brand-dark transition-colors'
    : 'text-sm font-medium text-white/90 hover:text-brand-gold transition-colors';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          solid
            ? 'bg-white/90 backdrop-blur-xl py-2 border-b border-black/5 shadow-sm'
            : 'bg-transparent py-3'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center min-h-[64px] md:min-h-[80px]">
        {/* ✅ Home usa âncora #home | Interno usa Link para "/" */}
        {isHome ? (
          <a href="#home" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <img
              src={logoToUse}
              alt={logoAlt}
              className={`w-auto object-contain transition-all duration-300 ${
                solid ? 'h-[60px] md:h-[72px]' : 'h-[72px] md:h-[96px]'
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
          {links.map((link) =>
            link.href.startsWith('#') ? (
              <a key={link.name} href={link.href} className={linkClassDesktop}>
                {link.name}
              </a>
            ) : (
              <Link key={link.name} to={link.href} className={linkClassDesktop}>
                {link.name}
              </Link>
            ),
          )}

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-brand-gold text-brand-dark px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-gold/90 transition-all shadow-lg shadow-brand-gold/20"
          >
            Fale conosco
          </a>
        </div>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen((v) => !v)} aria-label="Abrir menu">
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
            className="absolute top-full left-0 w-full bg-white shadow-xl py-8 px-6 flex flex-col gap-6 md:hidden"
          >
            {links.map((link) =>
              link.href.startsWith('#') ? (
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
              ),
            )}

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