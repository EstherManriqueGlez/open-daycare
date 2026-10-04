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
