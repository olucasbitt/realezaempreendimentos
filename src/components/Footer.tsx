import React from "react";
import { Instagram, Facebook, MapPin, Phone, MessageCircle, Mail } from "lucide-react";

const WHATSAPP = "https://wa.me/5551989066283";
const INSTAGRAM = "https://www.instagram.com/realeza.empreendimentos/";
const FACEBOOK = "#";

export default function Footer() {
  return (
    <footer className="bg-white py-16 border-t border-brand-blue/15">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-12 mb-12">

          {/* MARCA */}
          <div className="md:col-span-2">
            <img
              src="/img/logonv-dark.png"
              alt="Realeza Empreendimentos"
              className="w-auto h-[48px] md:h-[56px] object-contain mb-6"
            />

            <p className="text-brand-dark/60 max-w-md leading-relaxed mb-8">
              A Realeza Empreendimentos desenvolve residências com arquitetura
              contemporânea, alto padrão construtivo e foco em valorização
              imobiliária. Projetos pensados para quem busca viver com conforto,
              segurança e qualidade de vida.
            </p>

            <div className="flex items-center gap-4">

              {/* Instagram */}
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Realeza"
                className="w-10 h-10 rounded-full border border-brand-dark/10 flex items-center justify-center text-brand-dark 
                           hover:bg-gradient-to-br hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 
                           hover:text-white hover:scale-110 transition-all duration-300"
              >
                <Instagram size={20} />
              </a>

              {/* WhatsApp */}
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Realeza"
                className="w-10 h-10 rounded-full border border-brand-dark/10 flex items-center justify-center text-brand-dark 
                           hover:bg-green-500 hover:text-white hover:scale-110 transition-all duration-300"
              >
                <MessageCircle size={20} />
              </a>

            </div>
          </div>

          {/* CONTATO */}
          <div>
            <h5 className="font-bold uppercase tracking-widest text-xs text-brand-dark/40 mb-6">
              Contato
            </h5>

            <ul className="space-y-4">

              <li className="flex items-start gap-3 text-brand-dark/70">
                <MapPin size={20} className="text-brand-gold shrink-0" />
                <span>
                  Residencial Vivare<br />
                  Viamão - RS
                </span>
              </li>

              <li className="flex items-center gap-3 text-brand-dark/70">
                <Phone size={20} className="text-brand-gold shrink-0" />
                <a
                  href="tel:+5551989066283"
                  className="hover:text-brand-gold transition-colors"
                >
                  (51) 98906-6283
                </a>
              </li>

            </ul>
          </div>

          {/* NAVEGAÇÃO */}
          <div>
            <h5 className="font-bold uppercase tracking-widest text-xs text-brand-dark/40 mb-6">
              Projetos
            </h5>

            <ul className="space-y-3 text-brand-dark/70">

              <li>
                <a href="/aurora" className="hover:text-brand-gold transition-colors">
                  Casa Aurora
                </a>
              </li>

              <li>
                <a href="/roma" className="hover:text-brand-gold transition-colors">
                  Casa Roma
                </a>
              </li>

              <li>
                <a href="/montebello" className="hover:text-brand-gold transition-colors">
                  Casa Montebello
                </a>
              </li>

              <li>
                <a href="/isabela" className="hover:text-brand-gold transition-colors">
                  Casa Isabela
                </a>
              </li>

              <li>
                <a href="#sobre" className="hover:text-brand-gold transition-colors">
                  Sobre a empresa
                </a>
              </li>

            </ul>
          </div>

        </div>

        {/* COPYRIGHT + CTA */}
        <div className="pt-8 border-t border-brand-dark/5 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-sm text-brand-dark/40 text-center md:text-left">
            © {new Date().getFullYear()} Realeza Empreendimentos. Todos os direitos reservados.
          </p>

         

        </div>

      </div>
    </footer>
  );
}