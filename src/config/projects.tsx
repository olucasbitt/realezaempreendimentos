// src/config/projects.tsx
type Highlight = {
  label: string;
  icon: string;
};

export type ProjectKey = "aurora" | "roma" | "montebello" | "isabela";

export type ProjectConfig = {
  key: ProjectKey;
  name: string;
  statusBadge?: { label: string; variant?: "featured" | "building" | "default" };
  description: string;

  instagramUrl: string;
  heroImage: string;
  heroVideo?: string;

  // Lista pronta para o "Destaques do Projeto"
 highlights: Highlight[];

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
	  { label: "3 Quartos (1 Suíte)", icon: "bed" },
	  { label: "2 Vagas de Garagem", icon: "garage" },
	  { label: "109m² de Área", icon: "ruler" },
	  { label: "Área Gourmet", icon: "kitchen" },
	  { label: "Design Minimalista", icon: "design" },
	  { label: "Acabamento Premium", icon: "premium" },
	],
    gallery: [
      { src: "/img/aurora/aurora1.jpeg", alt: "Área Gourmet" },
      { src: "/img/aurora/aurora2.jpeg", alt: "Cozinha" },
      { src: "/img/aurora/aurora3.jpeg", alt: "Sala e Cozinha" },
      { src: "/img/aurora/aurora4.jpeg", alt: "Banheiro Suite" },
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
  statusBadge: { label: "Em Lançamento", variant: "building" },

  description:
    "No dia de frio, a lareira aquece a casa. No dia de sol, a churrasqueira reúne a família. No dia de festa, espaço para receber os amigos. No dia de trabalho, um lugar tranquilo para o home office. No dia de lazer, espaço para brincar e aproveitar. E até nos dias de chuva, sair de carro sem se molhar. Casa Roma. Uma casa pensada para todos os momentos da vida.",

  instagramUrl: "https://www.instagram.com/casa_roma_green",

  heroImage: "/img/roma/casaroma.jpeg",

  highlights: [
	  { label: "123m² de área construída", icon: "ruler" },
	  { label: "3 Dormitórios", icon: "bed" },
	  { label: "Suíte com Sacada", icon: "suite" },
	  { label: "Lareira", icon: "flame" },
	  { label: "Espaço Kids / Home Office", icon: "laptop" },
	  { label: "Churrasqueira", icon: "chefhat" }
	],

  gallery: [
	{ src: "/img/roma/casaroma.jpeg", alt: "Fachada moderna" },
	{ src: "/img/roma/roma10.jpeg", alt: "Ambiente moderno e integrado" },
	{ src: "/img/roma/roma1.jpeg", alt: "Cozinha moderna integrada com ilha central e mesa de jantar" },
	{ src: "/img/roma/roma4.jpeg", alt: "Área gourmet com churrasqueira" },
	{ src: "/img/roma/roma2.jpeg", alt: "Ambiente integrado com cozinha, jantar e sala de estar" },
	{ src: "/img/roma/roma3.jpeg", alt: "Ambiente integrado com cozinha, jantar e sala de estar" },	
	{ src: "/img/roma/roma5.jpeg", alt: "Sala de jantar moderna" },
	{ src: "/img/roma/roma6.jpeg", alt: "Sala de jantar moderna" },
	{ src: "/img/roma/roma7.jpeg", alt: "Vista do ambiente integrado" },
	{ src: "/img/roma/roma8.jpeg", alt: "Sala de estar aconchegante com lareira" },
	{ src: "/img/roma/roma9.jpeg", alt: "Sala de estar aconchegante com lareira" }
	
,
	
	
  ],

  longDescription:
    "A Casa Roma foi projetada para a família que sente que a casa atual já ficou pequena e quer dar o próximo passo. Com 123m² de área construída, o projeto combina conforto, funcionalidade e ambientes integrados. A lareira cria um clima acolhedor nos dias frios, enquanto a churrasqueira e o pátio convidam para momentos especiais com amigos e família.",

  specs: [
    { label: "Área construída", value: "123m²" },
    { label: "Dormitórios", value: "3" },
    { label: "Suíte", value: "1 com sacada" },
    { label: "Garagem", value: "1 vaga coberta" },
  ],

  materials: [
    "Esquadrias em alumínio",
    "Porcelanato de alto padrão",
    "Forro com rebaixo em gesso",
    "Infraestrutura para climatização"
  ],

  differentials: [
    {
      title: "Espaço versátil",
      desc: "Ambiente extra ideal para sala kids, cinema ou home office."
    },
    {
      title: "Conforto no inverno",
      desc: "Lareira integrada à sala trazendo aconchego para os dias frios."
    },
    {
      title: "Integração social",
      desc: "Sala, cozinha e churrasqueira conectadas para convivência e praticidade."
    }
  ],

  location: {
		  city: "Viamão - RS",
		  neighborhood: "Green Parque Jardim",
		  mapUrl: "https://www.google.com/maps/search/?api=1&query=Green+Parque+Jardim+Viamao+RS"
		},

  floorplans: [
    { src: "/img/roma/planta1.jpeg", alt: "Planta Térreo" },
	{ src: "/img/roma/planta2.jpeg", alt: "Planta Segundo Andar" },
  ],
},

  montebello: {
  key: "montebello",
  name: "Casa Montebello",
  statusBadge: { label: "Em Lançamento", variant: "default" },

  description:
    "Uma residência contemporânea de 140m² projetada para quem valoriza conforto, lazer privativo e momentos em família.",

  instagramUrl: "https://www.instagram.com/casa_montebello_green",
  heroImage: "/img/montebello/casamontebello.jpeg",

  highlights: [
    { label: "140m² de área construída", icon: "ruler" },
    { label: "3 Dormitórios", icon: "bed" },
    { label: "Suíte com Sacada", icon: "suite" },
    { label: "2 Vagas Cobertas", icon: "garage" },
        { label: "Espaço Gourmet", icon: "chefhat" },
  ],

  gallery: [
    { src: "/img/montebello/montebello1.jpeg", alt: "Deck em madeira com piscina privativa" },
    { src: "/img/montebello/montebello2.jpeg", alt: "Piscina com cascata e área externa" },
    { src: "/img/montebello/montebello3.jpeg", alt: "Área gourmet integrada ao pátio" },
    { src: "/img/montebello/montebello4.jpeg", alt: "Fachada moderna da Casa Montebello" },
  ],

  longDescription:
    "A Casa Montebello foi projetada para proporcionar qualidade de vida em cada detalhe. Com 140m² de área construída, o projeto valoriza ambientes integrados, conforto e lazer privativo. A área externa conta com amplo patio e espaço gourmet, criando o ambiente ideal para momentos de descanso ou para reunir amigos e família. Um projeto pensado para quem deseja chegar em casa e realmente aproveitar cada momento com tranquilidade, estilo e exclusividade.",

  specs: [
    { label: "Área construída", value: "140m²" },
    { label: "Dormitórios", value: "3" },
    { label: "Suíte", value: "1 com sacada" },
    { label: "Garagem", value: "2 vagas cobertas" },
  ],

  materials: [
    "Deck em madeira na área externa",
    "Iluminação arquitetônica em LED",
    "Revestimentos de alto padrão",
    "Esquadrias amplas para maior iluminação natural",
  ],

  differentials: [
    {
      title: "Área de lazer privativa",
      desc: "Com amplo pátio é um espaço perfeito para aproveitar finais de semana com família e amigos.",
    },
    {
      title: "Arquitetura contemporânea",
      desc: "Fachada moderna com iluminação em LED e detalhes em Brise que destacam a identidade do projeto.",
    },
    {
      title: "Ambientes integrados",
      desc: "Sala, cozinha e área gourmet conectadas para proporcionar amplitude e convivência no dia a dia.",
    },
  ],

  location: {
    city: "Viamão - RS",
    neighborhood: "Green Parque Jardim",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Green+Parque+Jardim+Viamao+RS",
  },

  floorplans: [
    { src: "/img/montebello/planta1.jpeg", alt: "Planta térreo Casa Montebello" },
    { src: "/img/montebello/planta2.jpeg", alt: "Planta pavimento superior Casa Montebello" },
  ],
},
	isabela: {
  key: "isabela",
  name: "Casa Isabela",
  statusBadge: { label: "Em Lançamento", variant: "default" },

  description:
    "Uma residência de 116m² projetada para unir conforto, funcionalidade e momentos especiais em família, com ambientes integrados e excelente área social.",

  instagramUrl: "https://www.instagram.com/",
  heroImage: "/img/isabela/casaisabela.jpeg",

  highlights: [
    { label: "116m² de área construída", icon: "ruler" },
    { label: "3 Quartos (1 suíte)", icon: "bed" },
    { label: "Garagem coberta", icon: "garage" },
    { label: "Sala e cozinha integradas", icon: "kitchen" },
    { label: "Lareira", icon: "flame" },
    { label: "Área gourmet com churrasqueira", icon: "chefhat" },
  ],

  gallery: [
  //  { src: "/img/isabela/isabela1.jpeg", alt: "Fachada da Casa Isabela" },
    //{ src: "/img/isabela/isabela2.jpeg", alt: "Sala e cozinha integradas" },
    //{ src: "/img/isabela/isabela3.jpeg", alt: "Área gourmet com churrasqueira" },
    //{ src: "/img/isabela/isabela4.jpeg", alt: "Pátio amplo da Casa Isabela" },
  ],

  longDescription:
    "A Casa Isabela foi pensada para quem busca viver com conforto e praticidade sem abrir mão de um projeto moderno e acolhedor. Com 116m² de área construída, integra sala e cozinha para ampliar a convivência no dia a dia, conta com lareira para os dias frios, churrasqueira e área gourmet para receber bem, além de lavanderia independente, pátio amplo e garagem coberta. Um projeto completo no Residencial Vivare, ideal para famílias que valorizam qualidade de vida e bons momentos em casa.",

  specs: [
    { label: "Área construída", value: "116m²" },
    { label: "Dormitórios", value: "3" },
    { label: "Suíte", value: "1" },
    { label: "Garagem", value: "Coberta" },
  ],

  materials: [
    "Esquadrias em alumínio",
    "Porcelanato de alto padrão",
    "Acabamentos modernos",
    "Ambientes integrados com excelente iluminação natural",
  ],

  differentials: [
    {
      title: "Integração e aconchego",
      desc: "Sala e cozinha integradas com lareira, criando um ambiente perfeito para o convívio em família.",
    },
    {
      title: "Área social completa",
      desc: "Churrasqueira e área gourmet planejadas para aproveitar momentos especiais com amigos e familiares.",
    },
    {
      title: "Mais conforto no dia a dia",
      desc: "Lavanderia independente, pátio amplo e garagem coberta trazem praticidade e funcionalidade para a rotina.",
    },
  ],

  location: {
    city: "Viamão - RS",
    neighborhood: "Residencial Vivare",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Residencial+Vivare+Viamao+RS",
  },

  floorplans: [
  //  { src: "/img/isabela/planta1.jpeg", alt: "Planta Casa Isabela" },
  ],
}
};