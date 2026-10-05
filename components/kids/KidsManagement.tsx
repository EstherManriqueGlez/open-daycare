"use client";

import { useSyncExternalStore } from "react";

import { LOCAL_KIDS_STORAGE_KEY, mapLocalKidToKid, parseLocalKidsStorageValue } from "@/app/_data/localKids";
import type { Kid } from "@/app/_data/mock";
import { KidsHeader } from "@/components/kids/KidsHeader";
import { KidsList } from "@/components/kids/KidsList";
import { KidsSearchBox } from "@/components/kids/KidsSearchBox";
import { KidsSectionHeader } from "@/components/kids/KidsSectionHeader";

interface KidsManagementProps {
  initialKids: Kid[];
}

function getLocalKidsSnapshot() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(LOCAL_KIDS_STORAGE_KEY) ?? "";
}

function subscribeToLocalKids(onStoreChange: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key === LOCAL_KIDS_STORAGE_KEY) {
      onStoreChange();
    }
  }

  window.addEventListener("storage", handleStorage);

  return () => window.removeEventListener("storage", handleStorage);
}

export function KidsManagement({ initialKids }: KidsManagementProps) {
  const localKidsSnapshot = useSyncExternalStore(subscribeToLocalKids, getLocalKidsSnapshot, () => "");

  const localKids = parseLocalKidsStorageValue(localKidsSnapshot).map(mapLocalKidToKid);
  const displayKids = [...localKids, ...initialKids];

  return (
    <>
      <KidsHeader />
      <KidsSearchBox />
      <KidsSectionHeader count={displayKids.length} />
      <KidsList kids={displayKids} />
    </>
  );
}
