import type { LinkedParent } from "./mock";

export const LOCAL_PARENT_INVITATIONS_STORAGE_KEY = "open-daycare:parent-invitations:v1";

export type ParentRelationship = "Mamá" | "Papá" | "Tutor/a";

export interface LocalParentInvitation {
  id: string;
  kidId: string;
  parentName: string;
  parentEmail: string;
  relationship: ParentRelationship;
  invitationCode: string;
  status: "pending";
  createdAt: string;
}

export interface LinkParentForm {
  parentName: string;
  parentEmail: string;
  relationship: ParentRelationship;
}

const INVITATION_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const PENDING_PARENT_AVATAR_BG = "#A9C7E8";

function canUseLocalStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function isParentRelationship(value: unknown): value is ParentRelationship {
  return value === "Mamá" || value === "Papá" || value === "Tutor/a";
}

function isLocalParentInvitation(value: unknown): value is LocalParentInvitation {
  if (!value || typeof value !== "object") {
    return false;
  }

  const invitation = value as Record<string, unknown>;

  return (
    typeof invitation.id === "string" &&
    typeof invitation.kidId === "string" &&
    typeof invitation.parentName === "string" &&
    typeof invitation.parentEmail === "string" &&
    isParentRelationship(invitation.relationship) &&
    typeof invitation.invitationCode === "string" &&
    invitation.status === "pending" &&
    typeof invitation.createdAt === "string"
  );
}

function createInvitationId(kidId: string, parentEmail: string) {
  const emailSlug = normalizeParentEmail(parentEmail).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "parent";

  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `parent-invitation-${kidId}-${emailSlug}-${crypto.randomUUID()}`;
  }

  return `parent-invitation-${kidId}-${emailSlug}-${Date.now()}`;
}

function getInitial(parentName: string) {
  return parentName.trim().charAt(0).toUpperCase() || "P";
}

export function normalizeParentEmail(parentEmail: string) {
  return parentEmail.trim().toLowerCase();
}

export function generateInvitationCode() {
  let code = "";

  for (let index = 0; index < 5; index += 1) {
    code += INVITATION_CODE_ALPHABET[Math.floor(Math.random() * INVITATION_CODE_ALPHABET.length)];
  }

  return code;
}

export function parseLocalParentInvitationsStorageValue(storedValue: string | null): LocalParentInvitation[] {
  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isLocalParentInvitation);
  } catch {
    return [];
  }
}

export function readLocalParentInvitations(): LocalParentInvitation[] {
  if (!canUseLocalStorage()) {
    return [];
  }

  return parseLocalParentInvitationsStorageValue(window.localStorage.getItem(LOCAL_PARENT_INVITATIONS_STORAGE_KEY));
}

export function writeLocalParentInvitations(invitations: LocalParentInvitation[]) {
  if (!canUseLocalStorage()) {
    return;
  }

  window.localStorage.setItem(LOCAL_PARENT_INVITATIONS_STORAGE_KEY, JSON.stringify(invitations));
}

export function getLocalParentInvitationsForKid(kidId: string, invitations = readLocalParentInvitations()) {
  return invitations.filter((invitation) => invitation.kidId === kidId);
}

export function hasLocalParentInvitationForEmail(kidId: string, parentEmail: string, invitations = readLocalParentInvitations()) {
  const normalizedEmail = normalizeParentEmail(parentEmail);

  return invitations.some(
    (invitation) => invitation.kidId === kidId && normalizeParentEmail(invitation.parentEmail) === normalizedEmail,
  );
}

export function createLocalParentInvitation(kidId: string, form: LinkParentForm): LocalParentInvitation {
  const parentEmail = normalizeParentEmail(form.parentEmail);
  const parentName = form.parentName.trim();

  return {
    id: createInvitationId(kidId, parentEmail),
    kidId,
    parentName,
    parentEmail,
    relationship: form.relationship,
    invitationCode: generateInvitationCode(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };
}

export function saveLocalParentInvitation(invitation: LocalParentInvitation) {
  const invitations = readLocalParentInvitations();
  writeLocalParentInvitations([invitation, ...invitations]);
}

export function mapLocalParentInvitationToLinkedParent(invitation: LocalParentInvitation): LinkedParent {
  return {
    id: invitation.id,
    name: invitation.parentName,
    initial: getInitial(invitation.parentName),
    relationshipStatus: `${invitation.relationship} · invitación enviada`,
    avatarBg: PENDING_PARENT_AVATAR_BG,
    statusLabel: "PENDIENTE",
  };
}
