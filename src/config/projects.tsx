// src/config/projects.tsx
type Highlight = {
  label: string;
  icon: string;
};

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
  statusBadge: { label: "Em Construção", variant: "building" },

  description:
    "Conforto, aconchego e funcionalidade em uma residência de 123m² pensada para a nova fase da sua família.",

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
  statusBadge: { label: "Lançamento R$ 900.000,00", variant: "default" },

  description:
    "Uma residência contemporânea de 140m² projetada para quem valoriza conforto, lazer privativo e momentos em família.",

  instagramUrl: "https://www.instagram.com/casa_montebello_green",
  heroImage: "/img/montebello/casamontebello.jpeg",

  highlights: [
    { label: "140m² de área construída", icon: "ruler" },
    { label: "3 Dormitórios", icon: "bed" },
    { label: "Suíte com Sacada", icon: "suite" },
    { label: "2 Vagas Cobertas", icon: "garage" },
    { label: "Piscina com Cascata", icon: "pool" },
    { label: "Espaço Gourmet", icon: "chefhat" },
  ],

  gallery: [
    { src: "/img/montebello/montebello1.jpeg", alt: "Deck em madeira com piscina privativa" },
    { src: "/img/montebello/montebello2.jpeg", alt: "Piscina com cascata e área externa" },
    { src: "/img/montebello/montebello3.jpeg", alt: "Área gourmet integrada ao pátio" },
    { src: "/img/montebello/montebello4.jpeg", alt: "Fachada moderna da Casa Montebello" },
  ],

  longDescription:
    "A Casa Montebello foi projetada para proporcionar qualidade de vida em cada detalhe. Com 140m² de área construída, o projeto valoriza ambientes integrados, conforto e lazer privativo. A área externa conta com piscina com cascata, deck em madeira e espaço gourmet, criando o ambiente ideal para momentos de descanso ou para reunir amigos e família. Um projeto pensado para quem deseja chegar em casa e realmente aproveitar cada momento com tranquilidade, estilo e exclusividade.",

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
      desc: "Piscina com cascata, deck em madeira e um espaço perfeito para aproveitar finais de semana com família e amigos.",
    },
    {
      title: "Arquitetura contemporânea",
      desc: "Fachada moderna com iluminação em LED e detalhes em ripado que destacam a identidade do projeto.",
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
};