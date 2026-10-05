export type PostType = "achievement" | "activity" | "announcement";
export type NavIcon = "home" | "kids" | "bell" | "user";

export const POST_TYPE_LABEL: Record<PostType, string> = {
  achievement: "LOGRO",
  activity: "ACTIVIDAD",
  announcement: "ANUNCIO",
};

export interface FeedPost {
  id: string;
  authorName: string;
  authorInitial?: string;
  avatarBg: string;
  avatarColor: string;
  avatarIcon?: "megaphone";
  time: string;
  publishedByMe: boolean;
  type: PostType;
  audience: string;
  text: string;
  photoPlaceholder?: { label: string };
  hearts: number;
  comments: number;
}

export interface LinkedParent {
  id: string;
  name: string;
  initial: string;
  relationshipStatus: string;
  avatarBg: string;
  statusLabel: "ACTIVA" | "PENDIENTE";
}

export interface Kid {
  id: string;
  name: string;
  initial: string;
  ageLabel: string;
  room: string;
  birthDateLabel: string;
  admissionLabel: string;
  parentSummary: string;
  avatarBg: string;
  avatarColor: string;
  badge?: {
    label: string;
    variant: "allergy" | "link";
  };
  notes?: {
    title: string;
    text: string;
  };
  linkedParents: LinkedParent[];
}

export interface NavItem {
  label: string;
  icon: NavIcon;
  active: boolean;
}

export interface SidebarUser {
  name: string;
  role: string;
  initial: string;
}

export const sidebarUser: SidebarUser = {
  name: "Caro Giménez",
  role: "Maestra · Soles",
  initial: "C",
};

export const navItems: NavItem[] = [
  { label: "Feed", icon: "home", active: true },
  { label: "Niños", icon: "kids", active: false },
  { label: "Avisos", icon: "bell", active: false },
  { label: "Mi cuenta", icon: "user", active: false },
];

export const feedSubtitle = "12 niños · martes 17 jun";

export const kids: Kid[] = [
  {
    id: "mateo-fernandez",
    name: "Mateo Fernández",
    initial: "M",
    ageLabel: "3 años",
    room: "Soles",
    birthDateLabel: "12 mar 2022",
    admissionLabel: "feb 2025",
    parentSummary: "2 padres vinculados",
    avatarBg: "#A9D9E8",
    avatarColor: "#1F7A93",
    badge: { label: "MANÍ", variant: "allergy" },
    notes: {
      title: "Alergias y notas",
      text: "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    },
    linkedParents: [
      {
        id: "lucia-fernandez",
        name: "Lucía Fernández",
        initial: "L",
        relationshipStatus: "Mamá · activa",
        avatarBg: "#C9B6E8",
        statusLabel: "ACTIVA",
      },
      {
        id: "diego-fernandez",
        name: "Diego Fernández",
        initial: "D",
        relationshipStatus: "Papá · invitación enviada",
        avatarBg: "#A9C7E8",
        statusLabel: "PENDIENTE",
      },
    ],
  },
  {
    id: "sofia-mendez",
    name: "Sofía Méndez",
    initial: "S",
    ageLabel: "2 años",
    room: "Soles",
    birthDateLabel: "8 ago 2023",
    admissionLabel: "mar 2025",
    parentSummary: "1 padre vinculado",
    avatarBg: "#F4B8CC",
    avatarColor: "#C44A7A",
    linkedParents: [
      {
        id: "mariana-mendez",
        name: "Mariana Méndez",
        initial: "M",
        relationshipStatus: "Mamá · activa",
        avatarBg: "#C9B6E8",
        statusLabel: "ACTIVA",
      },
    ],
  },
  {
    id: "benjamin-ruiz",
    name: "Benjamín Ruiz",
    initial: "B",
    ageLabel: "3 años",
    room: "Soles",
    birthDateLabel: "4 ene 2022",
    admissionLabel: "feb 2025",
    parentSummary: "2 padres vinculados",
    avatarBg: "#B9DEC4",
    avatarColor: "#3E8B62",
    linkedParents: [
      {
        id: "paula-ruiz",
        name: "Paula Ruiz",
        initial: "P",
        relationshipStatus: "Mamá · activa",
        avatarBg: "#F4B8CC",
        statusLabel: "ACTIVA",
      },
      {
        id: "nicolas-ruiz",
        name: "Nicolás Ruiz",
        initial: "N",
        relationshipStatus: "Papá · activa",
        avatarBg: "#A9C7E8",
        statusLabel: "ACTIVA",
      },
    ],
  },
  {
    id: "valentina-soto",
    name: "Valentina Soto",
    initial: "V",
    ageLabel: "2 años",
    room: "Soles",
    birthDateLabel: "21 nov 2023",
    admissionLabel: "abr 2025",
    parentSummary: "sin padres vinculados",
    avatarBg: "#F4DC8E",
    avatarColor: "#9A7B1E",
    badge: { label: "VINCULAR", variant: "link" },
    linkedParents: [],
  },
  {
    id: "tomas-diaz",
    name: "Tomás Díaz",
    initial: "T",
    ageLabel: "3 años",
    room: "Soles",
    birthDateLabel: "30 may 2022",
    admissionLabel: "ene 2025",
    parentSummary: "1 padre vinculado",
    avatarBg: "#C9B6E8",
    avatarColor: "#7B5FC0",
    badge: { label: "LACTOSA", variant: "allergy" },
    notes: {
      title: "Alergias y notas",
      text: "Intolerancia a la lactosa. Evitar lácteos en colaciones y almuerzos.",
    },
    linkedParents: [
      {
        id: "camila-diaz",
        name: "Camila Díaz",
        initial: "C",
        relationshipStatus: "Mamá · activa",
        avatarBg: "#C9B6E8",
        statusLabel: "ACTIVA",
      },
    ],
  },
  {
    id: "emma-castro",
    name: "Emma Castro",
    initial: "E",
    ageLabel: "2 años",
    room: "Soles",
    birthDateLabel: "17 sep 2023",
    admissionLabel: "mar 2025",
    parentSummary: "1 padre vinculado",
    avatarBg: "#F4B8CC",
    avatarColor: "#C44A7A",
    linkedParents: [
      {
        id: "rocio-castro",
        name: "Rocío Castro",
        initial: "R",
        relationshipStatus: "Mamá · activa",
        avatarBg: "#F4B8CC",
        statusLabel: "ACTIVA",
      },
    ],
  },
  {
    id: "lucas-romero",
    name: "Lucas Romero",
    initial: "L",
    ageLabel: "3 años",
    room: "Soles",
    birthDateLabel: "2 abr 2022",
    admissionLabel: "feb 2025",
    parentSummary: "1 padre vinculado",
    avatarBg: "#A9D9E8",
    avatarColor: "#1F7A93",
    linkedParents: [
      {
        id: "andrea-romero",
        name: "Andrea Romero",
        initial: "A",
        relationshipStatus: "Mamá · activa",
        avatarBg: "#A9C7E8",
        statusLabel: "ACTIVA",
      },
    ],
  },
  {
    id: "olivia-vega",
    name: "Olivia Vega",
    initial: "O",
    ageLabel: "2 años",
    room: "Soles",
    birthDateLabel: "15 dic 2023",
    admissionLabel: "abr 2025",
    parentSummary: "1 padre vinculado",
    avatarBg: "#B9DEC4",
    avatarColor: "#3E8B62",
    linkedParents: [
      {
        id: "julia-vega",
        name: "Julia Vega",
        initial: "J",
        relationshipStatus: "Mamá · activa",
        avatarBg: "#B9DEC4",
        statusLabel: "ACTIVA",
      },
    ],
  },
];

export const feedPosts: FeedPost[] = [
  {
    id: "post-1",
    authorName: "Mateo",
    authorInitial: "M",
    avatarBg: "#A9D9E8",
    avatarColor: "#1F7A93",
    time: "14:20",
    publishedByMe: true,
    type: "achievement",
    audience: "Para: familia de Mateo",
    text: "¡Usó el orinal solito por primera vez! Estaba feliz de contárselo a todos. Un gran paso.",
    hearts: 3,
    comments: 1,
  },
  {
    id: "post-2",
    authorName: "Mateo",
    authorInitial: "M",
    avatarBg: "#A9D9E8",
    avatarColor: "#1F7A93",
    time: "09:40",
    publishedByMe: true,
    type: "activity",
    audience: "Para: familia de Mateo",
    text: "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón mezclando colores.",
    photoPlaceholder: { label: "Foto · pintando con témperas" },
    hearts: 5,
    comments: 2,
  },
  {
    id: "post-3",
    authorName: "Anuncio general",
    avatarBg: "#CCD8F4",
    avatarColor: "#4E72C8",
    avatarIcon: "megaphone",
    time: "07:50",
    publishedByMe: true,
    type: "announcement",
    audience: "Para: toda la sala",
    text: "El viernes salimos al parque por la mañana. Recuerden mandar gorra y una botellita de agua.",
    hearts: 8,
    comments: 0,
  },
];
