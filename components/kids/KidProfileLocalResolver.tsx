"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { LOCAL_KIDS_STORAGE_KEY, mapLocalKidToKid, parseLocalKidsStorageValue } from "@/app/_data/localKids";
import { KidInfoCard } from "@/components/kids/KidInfoCard";
import { KidNotesAlert } from "@/components/kids/KidNotesAlert";
import { KidProfileActions } from "@/components/kids/KidProfileActions";
import { KidProfileHeader } from "@/components/kids/KidProfileHeader";
import { LinkedParentsCard } from "@/components/kids/LinkedParentsCard";

interface KidProfileLocalResolverProps {
  id: string;
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

export function KidProfileLocalResolver({ id }: KidProfileLocalResolverProps) {
  const localKidsSnapshot = useSyncExternalStore(subscribeToLocalKids, getLocalKidsSnapshot, () => "");

  const localKid = parseLocalKidsStorageValue(localKidsSnapshot).find((kid) => kid.id === id);

  if (!localKid) {
    return (
      <div className="rounded-[18px] border border-[#ECE0D0] bg-[#FFFDF9] p-6 text-center shadow-[0_12px_32px_-24px_rgba(63,54,46,0.35)]">
        <h1 className="font-fredoka text-[25px] font-semibold text-[#3F362E]">
          Niño no encontrado
        </h1>
        <p className="mx-auto mt-2 max-w-[360px] text-[14.5px] leading-normal text-[#94887B]">
          Este registro local no existe en este navegador o fue eliminado del almacenamiento local.
        </p>
        <Link
          href="/kids"
          className="mt-5 inline-flex rounded-[13px] bg-[#D9583C] px-5 py-3 text-[14px] font-extrabold text-white"
        >
          Volver a Niños
        </Link>
      </div>
    );
  }

  const kid = mapLocalKidToKid(localKid);

  return (
    <div className="flex flex-col gap-[26px] lg:flex-row lg:items-start">
      <div className="flex min-w-0 flex-1 flex-col gap-[18px]">
        <KidProfileHeader kid={kid} />
        {kid.notes ? <KidNotesAlert notes={kid.notes} /> : null}
        <KidInfoCard kid={kid} />
      </div>

      <div className="flex w-full flex-none flex-col gap-[14px] lg:w-[300px]">
        <KidProfileActions />
        <LinkedParentsCard kidId={kid.id} parents={kid.linkedParents} />
      </div>
    </div>
  );
}
