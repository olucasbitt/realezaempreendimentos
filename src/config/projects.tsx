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
  longDescription?: string; // texto maior, “manifesto” do projeto
  specs?: { label: string; value: string }[]; // metragens, quartos, vagas, etc
  materials?: string[]; // acabamento / materiais
  differentials?: { title: string; desc: string }[]; // diferenciais do projeto
  location?: { city?: string; neighborhood?: string; mapUrl?: string };
  floorplans?: { src: string; alt: string }[]; // plantas / esquemas
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
	longDescription:
	  "Uma residência autoral onde cada linha foi desenhada para elevar a rotina. Integração de ambientes, luz natural e acabamentos premium em um conjunto pensado para valorização e bem-estar.",
	specs: [
	  { label: "Área privativa", value: "109m²" },
	  { label: "Dormitórios", value: "3 (1 suíte)" },
	  { label: "Garagem", value: "2 vagas" },
	  { label: "Estilo", value: "Contemporâneo" },
	],
	materials: ["Esquadrias em alumínio", "Porcelanato premium", "Iluminação planejada"],
	differentials: [
	  { title: "Integração inteligente", desc: "Sala e cozinha com fluidez e amplitude, ideal para receber." },
	  { title: "Gourmet de verdade", desc: "Churrasqueira e espaço projetado para experiência completa." },
	  { title: "Acabamento criterioso", desc: "Materiais e execução focados em elegância e durabilidade." },
	],
	location: {
	  city: "Viamão - RS",
	  neighborhood: "Residencial Vivare", // se quiser depois colocamos o bairro exato
	  mapUrl: "https://www.google.com/maps/search/?api=1&query=Rua+Seis+45+Viamão+RS+94410-676"
	},
	floorplans: [
	  { src: "/img/aurora/planta1.jpeg", alt: "Planta Casa Aurora" },
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
	longDescription:
	  "Um projeto contemporâneo em fase de execução que traduz elegância funcional. A Casa Roma foi concebida para integrar conforto, amplitude e lazer em um único conceito arquitetônico moderno e sofisticado.",
	specs: [
	  { label: "Área construída", value: "— m²" },
	  { label: "Dormitórios", value: "3 (1 suíte)" },
	  { label: "Garagem", value: "Coberta" },
	  { label: "Lazer", value: "Piscina & Churrasqueira" },
	],
	materials: [
	  "Esquadrias em alumínio preto",
	  "Porcelanato de alto padrão",
	  "Forro com rebaixo em gesso",
	  "Espera para climatização"
	],
	differentials: [
	  {
		title: "Integração total",
		desc: "Ambientes sociais conectados, proporcionando amplitude visual e fluidez entre sala, cozinha e área gourmet."
	  },
	  {
		title: "Lazer completo",
		desc: "Piscina integrada ao pátio e espaço gourmet projetado para momentos exclusivos."
	  },
	  {
		title: "Arquitetura contemporânea",
		desc: "Linhas modernas e volumetria marcante que garantem identidade e valorização patrimonial."
	  }
	],
	location: {
	  city: "Viamão - RS",
	  neighborhood: "Condominio Green",
	  mapUrl: "https://www.google.com/maps"
	},
	floorplans: [
	  { src: "/img/roma/planta1.jpeg", alt: "Planta Casa Roma" },
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
	longDescription:
	  "Um refúgio urbano projetado para quem valoriza natureza, privacidade e sofisticação. A Casa Montebello equilibra arquitetura moderna com integração ao entorno, criando uma experiência única de morar bem.",
	specs: [
	  { label: "Área construída", value: "— m²" },
	  { label: "Suíte Master", value: "Sim" },
	  { label: "Área Gourmet", value: "Integrada" },
	  { label: "Terreno", value: "Amplo & Privativo" },
	],
	materials: [
	  "Paisagismo planejado",
	  "Iluminação arquitetônica",
	  "Revestimentos premium",
	  "Esquadrias amplas para luz natural"
	],
	differentials: [
	  {
		title: "Conexão com a natureza",
		desc: "Grandes aberturas e integração visual com o jardim proporcionam luz natural abundante."
	  },
	  {
		title: "Privacidade absoluta",
		desc: "Projeto pensado para garantir tranquilidade e exclusividade."
	  },
	  {
		title: "Design atemporal",
		desc: "Arquitetura que combina elegância contemporânea com durabilidade estética."
	  }
	],
	location: {
	  city: "Viamão - RS",
	  neighborhood: "Condominio Green",
	  mapUrl: "https://www.google.com/maps"
	},
	floorplans: [
	  { src: "/img/montebello/planta1.jpeg", alt: "Planta Casa Montebello" },
	],
  },
};