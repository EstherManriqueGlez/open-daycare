import { mapLocalKidToKid, readLocalKids } from "./localKids";
import { kids } from "./mock";
import type { Kid } from "./mock";

export function findMockKidById(id: string) {
  return kids.find((kid) => kid.id === id);
}

export function findLocalKidById(id: string) {
  return readLocalKids().find((kid) => kid.id === id);
}

export function resolveKidById(id: string): Kid | undefined {
  const mockKid = findMockKidById(id);

  if (mockKid) {
    return mockKid;
  }

  const localKid = findLocalKidById(id);

  return localKid ? mapLocalKidToKid(localKid) : undefined;
}

export function isLocalKidId(id: string) {
  return id.startsWith("local-");
}
