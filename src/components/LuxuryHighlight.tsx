import React from "react";
import { motion } from "motion/react";
import {
  BedDouble,
  Car,
  Ruler,
  UtensilsCrossed,
  Bath,
  Trees,
  ShieldCheck,
  Sun,
  MapPin,
  Gem,
  Sparkles,
  Home,
  Instagram
} from "lucide-react";

function resolveHighlightIcon(label: string) {
  const t = label.toLowerCase();

  if (t.includes("quarto") || t.includes("suíte") || t.includes("suite")) return BedDouble;
  if (t.includes("vaga") || t.includes("garagem")) return Car;
  if (t.includes("m²") || t.includes("m2") || t.includes("área") || t.includes("area")) return Ruler;
  if (t.includes("gourmet") || t.includes("churr") || t.includes("cozinha")) return UtensilsCrossed;
  if (t.includes("banh") || t.includes("lavabo")) return Bath;
  if (t.includes("jard") || t.includes("verde") || t.includes("paisag")) return Trees;
  if (t.includes("seg") || t.includes("garantia")) return ShieldCheck;
  if (t.includes("sol") || t.includes("ilum") || t.includes("luz")) return Sun;
  if (t.includes("local") || t.includes("bairro") || t.includes("mapa")) return MapPin;
  if (t.includes("premium") || t.includes("alto padrão") || t.includes("alto padrao") || t.includes("acab")) return Gem;
  if (t.includes("design") || t.includes("minimal")) return Sparkles;

  return Home;
}

export default function LuxuryHighlight({ label }: { label: string }) {
  const Icon = resolveHighlightIcon(label);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group relative"
    >
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-gold/25 via-brand-gold/10 to-transparent opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-center gap-3 rounded-2xl border border-brand-dark/10 bg-white/70 backdrop-blur-md px-4 py-3 shadow-[0_14px_40px_-24px_rgba(0,0,0,0.35)]">
        <div className="relative grid place-items-center w-11 h-11 rounded-2xl bg-gradient-to-b from-brand-gold/25 to-brand-gold/5 border border-brand-gold/20">
          <Icon className="text-brand-gold" size={18} strokeWidth={1.75} />
          <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]" />
        </div>

        <span className="text-sm font-semibold tracking-wide text-brand-dark/80">
          {label}
        </span>

        <div className="ml-auto h-8 w-px bg-gradient-to-b from-transparent via-brand-dark/10 to-transparent" />
      </div>
    </motion.div>
  );
}