import type { Kid } from "./mock";

export const LOCAL_KIDS_STORAGE_KEY = "open-daycare:kids:v1";

export type LocalKidRoom = "Soles" | "Estrellas" | "Lunas";

export interface LocalKid {
  id: string;
  fullName: string;
  initial: string;
  birthDate: string;
  room: LocalKidRoom;
  allergies: string;
  medicalNotes: string;
  createdAt: string;
}

export interface NewKidForm {
  fullName: string;
  birthDate: string;
  room: LocalKidRoom | "";
  allergies: string;
  medicalNotes: string;
}

const LOCAL_KID_AVATAR = {
  avatarBg: "#F4DC8E",
  avatarColor: "#9A7B1E",
};

function canUseLocalStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function isLocalKidRoom(value: unknown): value is LocalKidRoom {
  return value === "Soles" || value === "Estrellas" || value === "Lunas";
}

function isLocalKid(value: unknown): value is LocalKid {
  if (!value || typeof value !== "object") {
    return false;
  }

  const kid = value as Record<string, unknown>;

  return (
    typeof kid.id === "string" &&
    typeof kid.fullName === "string" &&
    typeof kid.initial === "string" &&
    typeof kid.birthDate === "string" &&
    isLocalKidRoom(kid.room) &&
    typeof kid.allergies === "string" &&
    typeof kid.medicalNotes === "string" &&
    typeof kid.createdAt === "string"
  );
}

function createLocalKidId(fullName: string) {
  const slug = fullName
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "kid";

  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `local-${slug}-${crypto.randomUUID()}`;
  }

  return `local-${slug}-${Date.now()}`;
}

function getInitial(fullName: string) {
  return fullName.trim().charAt(0).toUpperCase() || "N";
}

function getAgeLabel(birthDate: string) {
  const [day, month, year] = birthDate.split("/").map(Number);
  const birth = new Date(year, month - 1, day);

  if (Number.isNaN(birth.getTime())) {
    return "Edad pendiente";
  }

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() >= birth.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  if (age <= 0) {
    return "Menor de 1 año";
  }

  return age === 1 ? "1 año" : `${age} años`;
}

function getAllergyBadge(allergies: string): Kid["badge"] {
  const firstAllergy = allergies
    .split(",")
    .map((item) => item.trim())
    .find(Boolean);

  if (!firstAllergy) {
    return undefined;
  }

  return {
    label: firstAllergy.toUpperCase(),
    variant: "allergy",
  };
}

export function readLocalKids(): LocalKid[] {
  if (!canUseLocalStorage()) {
    return [];
  }

  return parseLocalKidsStorageValue(window.localStorage.getItem(LOCAL_KIDS_STORAGE_KEY));
}

export function parseLocalKidsStorageValue(storedValue: string | null): LocalKid[] {
  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isLocalKid);
  } catch {
    return [];
  }
}

export function writeLocalKids(localKids: LocalKid[]) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(LOCAL_KIDS_STORAGE_KEY, JSON.stringify(localKids));
}

export function createLocalKid(form: NewKidForm): LocalKid {
  const fullName = form.fullName.trim();

  return {
    id: createLocalKidId(fullName),
    fullName,
    initial: getInitial(fullName),
    birthDate: form.birthDate.trim(),
    room: form.room || "Soles",
    allergies: form.allergies.trim(),
    medicalNotes: form.medicalNotes.trim(),
    createdAt: new Date().toISOString(),
  };
}

export function saveLocalKid(localKid: LocalKid) {
  const localKids = readLocalKids();
  writeLocalKids([localKid, ...localKids]);
}

export function mapLocalKidToKid(localKid: LocalKid): Kid {
  const notesText = [localKid.allergies, localKid.medicalNotes].filter(Boolean).join(". ");

  return {
    id: localKid.id,
    name: localKid.fullName,
    initial: localKid.initial,
    ageLabel: getAgeLabel(localKid.birthDate),
    room: localKid.room,
    birthDateLabel: localKid.birthDate,
    admissionLabel: "Pendiente",
    parentSummary: "sin padres vinculados",
    ...LOCAL_KID_AVATAR,
    badge: getAllergyBadge(localKid.allergies),
    notes: notesText
      ? {
          title: "Alergias y notas",
          text: notesText,
        }
      : undefined,
    linkedParents: [],
  };
}
