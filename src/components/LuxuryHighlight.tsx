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
  Flame,
  Laptop,
  Waves,
  ChefHat,
  Shirt,
  Building2,
  Sofa,
  DoorOpen
} from "lucide-react";

const ICONS: Record<string, any> = {
  bed: BedDouble,
  suite: BedDouble,
  garage: Car,
  ruler: Ruler,
  kitchen: UtensilsCrossed,
  chefhat: ChefHat,
  bath: Bath,
  garden: Trees,
  security: ShieldCheck,
  sun: Sun,
  location: MapPin,
  premium: Gem,
  design: Sparkles,
  flame: Flame,
  laptop: Laptop,
  pool: Waves,
  laundry: Shirt,
  balcony: Building2,
  living: Sofa,
  patio: DoorOpen
};

export default function LuxuryHighlight({
  label,
  icon
}: {
  label: string;
  icon: string;
}) {
  const Icon = ICONS[icon] || Home;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group relative"
    >
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-brand-gold/25 via-brand-gold/10 to-transparent opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex items-center gap-3 rounded-2xl border border-brand-dark/10 bg-white/70 backdrop-blur-md px-3 py-2 md:px-4 md:py-3 shadow-[0_14px_40px_-24px_rgba(0,0,0,0.35)]">
        <div className="relative grid place-items-center w-9 h-9 md:w-11 md:h-11 rounded-2xl bg-gradient-to-b from-brand-gold/25 to-brand-gold/5 border border-brand-gold/20">
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