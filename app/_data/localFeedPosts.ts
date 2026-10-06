import type { FeedPost } from "./mock";

export const LOCAL_FEED_POSTS_STORAGE_KEY = "open-daycare:feed-posts:v1";

export type NewPostType =
  | "food"
  | "nap"
  | "activity"
  | "achievement"
  | "mood"
  | "photo"
  | "announcement";

export type NewPostAudience =
  | {
      kind: "kids";
      kids: Array<{
        kidId: string;
        kidName: string;
        kidInitial: string;
        avatarBg: string;
        avatarColor: string;
      }>;
    }
  | { kind: "room"; label: "Toda la sala" };

export interface LocalFeedPost {
  id: string;
  type: NewPostType;
  audience: NewPostAudience;
  description: string;
  hasPhotoPlaceholder: boolean;
  createdAt: string;
}

export interface NewPostForm {
  selectedAudience: NewPostAudience;
  selectedType: NewPostType;
  description: string;
}

const POST_AUTHOR_BY_TYPE: Record<
  NewPostType,
  { name: string; initial?: string; avatarBg: string; avatarColor: string }
> = {
  food: { name: "Comida", initial: "C", avatarBg: "#F4DC8E", avatarColor: "#9A7B1E" },
  nap: { name: "Siesta", initial: "S", avatarBg: "#E7DCF6", avatarColor: "#7B5FC0" },
  activity: { name: "Actividad", initial: "A", avatarBg: "#A9D9E8", avatarColor: "#1F7A93" },
  achievement: { name: "Logro", initial: "L", avatarBg: "#B9DEC4", avatarColor: "#3E8B62" },
  mood: { name: "Ánimo", initial: "A", avatarBg: "#F4B8CC", avatarColor: "#C44A7A" },
  photo: { name: "Foto", initial: "F", avatarBg: "#FBD8CC", avatarColor: "#D9684A" },
  announcement: { name: "Anuncio general", avatarBg: "#CCD8F4", avatarColor: "#4E72C8" },
};

function canUseLocalStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function isNewPostType(value: unknown): value is NewPostType {
  return (
    value === "food" ||
    value === "nap" ||
    value === "activity" ||
    value === "achievement" ||
    value === "mood" ||
    value === "photo" ||
    value === "announcement"
  );
}

function isNewPostAudience(value: unknown): value is NewPostAudience {
  if (!value || typeof value !== "object") {
    return false;
  }

  const audience = value as Record<string, unknown>;

  if (audience.kind === "room") {
    return audience.label === "Toda la sala";
  }

  return audience.kind === "kids" && Array.isArray(audience.kids) && audience.kids.every((kid) => {
    if (!kid || typeof kid !== "object") {
      return false;
    }

    const selectedKid = kid as Record<string, unknown>;

    return (
      typeof selectedKid.kidId === "string" &&
      typeof selectedKid.kidName === "string" &&
      typeof selectedKid.kidInitial === "string" &&
      typeof selectedKid.avatarBg === "string" &&
      typeof selectedKid.avatarColor === "string"
    );
  });
}

function isLocalFeedPost(value: unknown): value is LocalFeedPost {
  if (!value || typeof value !== "object") {
    return false;
  }

  const post = value as Record<string, unknown>;

  return (
    typeof post.id === "string" &&
    isNewPostType(post.type) &&
    isNewPostAudience(post.audience) &&
    typeof post.description === "string" &&
    typeof post.hasPhotoPlaceholder === "boolean" &&
    typeof post.createdAt === "string"
  );
}

function createLocalFeedPostId(type: NewPostType) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `local-post-${type}-${crypto.randomUUID()}`;
  }

  return `local-post-${type}-${Date.now()}`;
}

function getPostTime(createdAt: string) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "Ahora";
  }

  return date.toLocaleTimeString("es", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getAudienceLabel(audience: NewPostAudience) {
  if (audience.kind === "room") {
    return "Para: toda la sala";
  }

  const kidNames = audience.kids.map((kid) => kid.kidName.split(" ")[0] || kid.kidName);

  return `Para: familias de ${kidNames.join(", ")}`;
}

export function parseLocalFeedPostsStorageValue(storedValue: string | null): LocalFeedPost[] {
  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isLocalFeedPost);
  } catch {
    return [];
  }
}

export function readLocalFeedPosts(): LocalFeedPost[] {
  if (!canUseLocalStorage()) {
    return [];
  }

  return parseLocalFeedPostsStorageValue(window.localStorage.getItem(LOCAL_FEED_POSTS_STORAGE_KEY));
}

export function writeLocalFeedPosts(posts: LocalFeedPost[]) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(LOCAL_FEED_POSTS_STORAGE_KEY, JSON.stringify(posts));
}

export function createLocalFeedPost(form: NewPostForm): LocalFeedPost {
  return {
    id: createLocalFeedPostId(form.selectedType),
    type: form.selectedType,
    audience: form.selectedAudience,
    description: form.description.trim(),
    hasPhotoPlaceholder: true,
    createdAt: new Date().toISOString(),
  };
}

export function saveLocalFeedPost(post: LocalFeedPost) {
  const posts = readLocalFeedPosts();
  writeLocalFeedPosts([post, ...posts]);
}

export function sortLocalFeedPostsByNewest(posts: LocalFeedPost[]) {
  return [...posts].sort((firstPost, secondPost) => {
    return new Date(secondPost.createdAt).getTime() - new Date(firstPost.createdAt).getTime();
  });
}

export function mapLocalFeedPostToView(post: LocalFeedPost): FeedPost {
  const firstSelectedKid = post.audience.kind === "kids" ? post.audience.kids[0] : undefined;
  const author =
    firstSelectedKid
      ? {
          name: firstSelectedKid.kidName,
          initial: firstSelectedKid.kidInitial,
          avatarBg: firstSelectedKid.avatarBg,
          avatarColor: firstSelectedKid.avatarColor,
        }
      : POST_AUTHOR_BY_TYPE[post.type];

  return {
    id: post.id,
    authorName: author.name,
    authorInitial: author.initial,
    avatarBg: author.avatarBg,
    avatarColor: author.avatarColor,
    avatarIcon: post.type === "announcement" && post.audience.kind === "room" ? "megaphone" : undefined,
    time: getPostTime(post.createdAt),
    publishedByMe: true,
    type: post.type,
    audience: getAudienceLabel(post.audience),
    text: post.description,
    photoPlaceholder: post.hasPhotoPlaceholder ? { label: "Foto · publicación" } : undefined,
    hearts: 0,
    comments: 0,
  };
}

export function mapLocalFeedPostsToViews(posts = readLocalFeedPosts()) {
  return sortLocalFeedPostsByNewest(posts).map(mapLocalFeedPostToView);
}
