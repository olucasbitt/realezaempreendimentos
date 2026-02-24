// src/config/projects.tsx

export type ProjectKey = "aurora" | "roma" | "montebello";

export type ProjectConfig = {
  key: ProjectKey;
  name: string;
  statusBadge?: { label: string; variant?: "featured" | "building" | "default" };
  description: string;

  instagramUrl: string;
  heroImage: string;
  heroVideo?: string;

  // Lista pronta para o "Destaques do Projeto"
  highlights: string[];

  //  Gallery  4 imagens
  gallery: { src: string; alt: string }[];

  // opcional: seed/placeholder (se quiser)
  // gallerySeed?: string;
};

export const PROJECTS: Record<ProjectKey, ProjectConfig> = {
  aurora: {
    key: "aurora",
    name: "Casa Aurora",
    statusBadge: { label: "Projeto em Destaque", variant: "featured" },
    description:
      "O ápice do conforto contemporâneo em uma residência de 109m² pensada para a vida moderna.",
    instagramUrl: "https://www.instagram.com/casa_auroraa",
    heroImage: "/img/aurora/casaaurora.jpeg",
    heroVideo: "/img/aurora/casaaurora.mp4",
    highlights: [
      "3 Quartos (1 Suíte)",
      "2 Vagas de Garagem",
      "109m² de Área",
      "Área Gourmet",
      "Design Minimalista",
      "Acabamento Premium",
    ],
    gallery: [
      { src: "/img/aurora/aurora1.jpeg", alt: "Detalhe Casa Aurora 1" },
      { src: "/img/aurora/aurora2.jpeg", alt: "Detalhe Casa Aurora 2" },
      { src: "/img/aurora/aurora3.jpeg", alt: "Detalhe Casa Aurora 3" },
      { src: "/img/aurora/aurora4.jpeg", alt: "Detalhe Casa Aurora 4" },
    ],
  },

  roma: {
    key: "roma",
    name: "Casa Roma",
    statusBadge: { label: "Em Construção", variant: "building" },
    description:
      "Um projeto moderno em fase de execução que une elegância, conforto e integração total.",
    instagramUrl: "https://www.instagram.com/casa_roma_green",
    heroImage: "/img/roma/casaroma.jpeg",
    heroVideo: undefined,
    highlights: [
      "3 Quartos (1 Suíte)",
      "Sala/Cozinha Integrada",
      "Lareira & Churrasqueira",
      "Garagem Coberta",
      "Pátio com Piscina",
      "Espaço Amplo",
    ],
    gallery: [
      { src: "/img/roma/roma1.jpeg", alt: "Detalhe Casa Roma 1" },
      { src: "/img/roma/roma2.jpeg", alt: "Detalhe Casa Roma 2" },
      { src: "/img/roma/roma3.jpeg", alt: "Detalhe Casa Roma 3" },
      { src: "/img/roma/roma4.jpeg", alt: "Detalhe Casa Roma 4" },
    ],
  },

  montebello: {
    key: "montebello",
    name: "Casa Montebello",
    statusBadge: { label: "Natureza & Sofisticação", variant: "default" },
    description:
      "Um refúgio urbano de alto padrão para quem busca tranquilidade e contato com a natureza.",
    instagramUrl: "https://www.instagram.com/casa_montebello_green",
    heroImage: "img/montebello/casamontebello.jpeg",
    heroVideo: undefined,
    highlights: [
      "Vista Panorâmica",
      "Área Gourmet",
      "Suíte Master",
      "Jardim Planejado",
      "Sustentabilidade",
      "Privacidade",
    ],
    gallery: [
      { src: "img/montebello/montebello1.jpeg", alt: "Detalhe Casa Montebello 1" },
      { src: "img/montebello/montebello2.jpeg", alt: "Detalhe Casa Montebello 2" },
      { src: "img/montebello/montebello3.jpeg", alt: "Detalhe Casa Montebello 3" },
      { src: "img/montebello/montebello4.jpeg", alt: "Detalhe Casa Montebello 4" },
    ],
  },
};