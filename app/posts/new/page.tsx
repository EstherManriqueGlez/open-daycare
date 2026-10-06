"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";

import {
  LOCAL_KIDS_STORAGE_KEY,
  parseLocalKidsStorageValue,
} from "@/app/_data/localKids";
import type { NewPostAudience } from "@/app/_data/localFeedPosts";
import {
  buildNewPostAudienceOptions,
  getDefaultNewPostAudience,
} from "@/app/_data/postAudiences";
import type { NewPostAudienceOption } from "@/app/_data/postAudiences";

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

function isSameAudience(firstAudience: NewPostAudience, secondAudience: NewPostAudience) {
  if (firstAudience.kind !== secondAudience.kind) {
    return false;
  }

  if (firstAudience.kind === "room" && secondAudience.kind === "room") {
    return firstAudience.label === secondAudience.label;
  }

  if (firstAudience.kind === "kid" && secondAudience.kind === "kid") {
    return firstAudience.kidId === secondAudience.kidId;
  }

  return false;
}

function AudienceChip({
  option,
  isSelected,
  onSelect,
}: {
  option: NewPostAudienceOption;
  isSelected: boolean;
  onSelect: (audience: NewPostAudience) => void;
}) {
  if (option.audience.kind === "room") {
    return (
      <button
        type="button"
        onClick={() => onSelect(option.audience)}
        className={`cursor-pointer rounded-full border-[1.5px] px-4 py-1.5 text-[14px] font-bold ${
          isSelected
            ? "border-[#3F362E] bg-[#3F362E] text-white"
            : "border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359]"
        }`}
      >
        {option.label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(option.audience)}
      className={`flex cursor-pointer items-center gap-2 rounded-full border-[1.5px] py-1.5 pr-3.5 pl-1.5 text-[14px] font-bold ${
        isSelected
          ? "border-[#3F362E] bg-[#3F362E] text-white"
          : "border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359]"
      }`}
    >
      <span
        className="flex h-[26px] w-[26px] items-center justify-center rounded-full font-fredoka text-[13px] font-semibold"
        style={{
          backgroundColor: option.audience.avatarBg,
          color: option.audience.avatarColor,
        }}
      >
        {option.audience.kidInitial}
      </span>
      {option.label}
    </button>
  );
}

export default function NewPostPage() {
  const localKidsSnapshot = useSyncExternalStore(subscribeToLocalKids, getLocalKidsSnapshot, () => "");
  const audienceOptions = buildNewPostAudienceOptions(parseLocalKidsStorageValue(localKidsSnapshot));
  const [selectedAudience, setSelectedAudience] = useState<NewPostAudience>(() =>
    getDefaultNewPostAudience(audienceOptions),
  );

  return (
    <main className="flex min-h-screen items-start justify-center bg-[#F6ECDF] px-4 py-8 sm:px-6 sm:py-10">
      <section className="w-full max-w-[580px] overflow-hidden rounded-[24px] border border-[#ECE0D0] bg-[#FBF4EC] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)]">
        <header className="flex items-center justify-between border-b border-[#ECE0D0] px-[26px] py-5">
          <Link href="/" className="text-[15px] font-bold text-[#94887B]">
            Cancelar
          </Link>
          <h1 className="font-fredoka text-[18px] font-semibold text-[#3F362E]">
            Nueva publicación
          </h1>
          <button type="button" className="text-[15px] font-extrabold text-[#D9583C]">
            Publicar
          </button>
        </header>

        <div className="px-[26px] py-6">
          <div className="mb-2.5 text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
            PARA
          </div>
          <div className="mb-[22px] flex flex-wrap gap-[9px]">
            {audienceOptions.map((option) => (
              <AudienceChip
                key={option.id}
                option={option}
                isSelected={isSameAudience(option.audience, selectedAudience)}
                onSelect={setSelectedAudience}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
