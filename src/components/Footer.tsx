import React from "react";
import { Instagram, Facebook, MapPin, Phone, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white py-20 border-t border-brand-blue/15">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <img
              src="/img/logonv-dark.png"
              alt="Realeza Empreendimentos"
              className="w-auto h-[44px] md:h-[56px] object-contain mb-6"
            />
            <p className="text-brand-dark/60 max-w-sm mb-8 leading-relaxed">
              Excelência em construção civil e incorporação imobiliária.
              Transformando sonhos em endereços de alto padrão desde 2020.
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-brand-dark/10 flex items-center justify-center text-brand-dark hover:bg-brand-blue hover:text-white transition-all"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-brand-dark/10 flex items-center justify-center text-brand-dark hover:bg-brand-blue hover:text-white transition-all"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h5 className="font-bold uppercase tracking-widest text-xs text-brand-dark/40 mb-6">
              Contato
            </h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-brand-dark/70">
                <MapPin size={20} className="text-brand-gold shrink-0" />
                <span>Residencial Vivare, Viamão - RS</span>
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
            <h5 className="font-bold uppercase tracking-widest text-xs text-brand-dark/40 mb-6">
              Institucional
            </h5>
            <p className="text-sm text-brand-dark/70 mb-2">
              CNPJ: 37.187.998/0001-95
            </p>
            <p className="text-sm text-brand-dark/70">
              Responsável: Abner Severo
            </p>
          </div>
        </div>

        <div className="pt-12 border-t border-brand-dark/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-brand-dark/40">
            © {new Date().getFullYear()} Realeza Empreendimentos. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}