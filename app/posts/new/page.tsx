"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

import {
  LOCAL_KIDS_STORAGE_KEY,
  parseLocalKidsStorageValue,
} from "@/app/_data/localKids";
import type { NewPostAudience } from "@/app/_data/localFeedPosts";
import type { NewPostType } from "@/app/_data/localFeedPosts";
import { createLocalFeedPost, saveLocalFeedPost } from "@/app/_data/localFeedPosts";
import {
  buildNewPostAudienceOptions,
  getDefaultNewPostAudience,
} from "@/app/_data/postAudiences";
import type { NewPostAudienceOption } from "@/app/_data/postAudiences";
import { PhotoIcon, PlusIcon } from "@/components/shared/icons";

const INITIAL_DESCRIPTION =
  "Pintamos con témperas esta mañana. Mateo eligió el azul para todo y se concentró un montón.";

const POST_TYPE_OPTIONS: Array<{
  type: NewPostType;
  label: string;
  selectedClassName: string;
  idleClassName: string;
}> = [
  {
    type: "food",
    label: "Comida",
    selectedClassName: "bg-[#9A7B1E] text-white",
    idleClassName: "bg-[#F4DC8E] text-[#9A7B1E]",
  },
  {
    type: "nap",
    label: "Siesta",
    selectedClassName: "bg-[#7B5FC0] text-white",
    idleClassName: "bg-[#E7DCF6] text-[#7B5FC0]",
  },
  {
    type: "activity",
    label: "Actividad",
    selectedClassName: "bg-[#2E89A6] text-white",
    idleClassName: "bg-[#C7E7F1] text-[#2E89A6]",
  },
  {
    type: "achievement",
    label: "Logro",
    selectedClassName: "bg-[#3E9B6C] text-white",
    idleClassName: "bg-[#CFEBD8] text-[#3E9B6C]",
  },
  {
    type: "mood",
    label: "Ánimo",
    selectedClassName: "bg-[#C56486] text-white",
    idleClassName: "bg-[#F9D2DE] text-[#C56486]",
  },
  {
    type: "photo",
    label: "Foto",
    selectedClassName: "bg-[#D9684A] text-white",
    idleClassName: "bg-[#FBD8CC] text-[#D9684A]",
  },
  {
    type: "announcement",
    label: "Anuncio",
    selectedClassName: "bg-[#4E72C8] text-white",
    idleClassName: "bg-[#CCD8F4] text-[#4E72C8]",
  },
];

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

function getSingleKidFromOption(option: NewPostAudienceOption) {
  return option.audience.kind === "kids" ? option.audience.kids[0] : undefined;
}

function isAudienceOptionSelected(option: NewPostAudienceOption, selectedAudience: NewPostAudience) {
  if (option.audience.kind === "room") {
    return selectedAudience.kind === "room";
  }

  if (selectedAudience.kind !== "kids") {
    return false;
  }

  const kid = getSingleKidFromOption(option);

  return Boolean(kid && selectedAudience.kids.some((selectedKid) => selectedKid.kidId === kid.kidId));
}

function AudienceChip({
  option,
  isSelected,
  onSelect,
}: {
  option: NewPostAudienceOption;
  isSelected: boolean;
  onSelect: (option: NewPostAudienceOption) => void;
}) {
  if (option.audience.kind === "room") {
    return (
      <button
        type="button"
        onClick={() => onSelect(option)}
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

  const kid = getSingleKidFromOption(option);

  if (!kid) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      className={`flex cursor-pointer items-center gap-2 rounded-full border-[1.5px] py-1.5 pr-3.5 pl-1.5 text-[14px] font-bold ${
        isSelected
          ? "border-[#3F362E] bg-[#3F362E] text-white"
          : "border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359]"
      }`}
    >
      <span
        className="flex h-[26px] w-[26px] items-center justify-center rounded-full font-fredoka text-[13px] font-semibold"
        style={{
          backgroundColor: kid.avatarBg,
          color: kid.avatarColor,
        }}
      >
        {kid.kidInitial}
      </span>
      {option.label}
    </button>
  );
}

function TypeChip({
  option,
  isSelected,
  onSelect,
}: {
  option: (typeof POST_TYPE_OPTIONS)[number];
  isSelected: boolean;
  onSelect: (type: NewPostType) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.type)}
      className={`cursor-pointer rounded-full px-4 py-2 text-[13.5px] font-extrabold ${
        isSelected ? option.selectedClassName : option.idleClassName
      }`}
    >
      {option.label}
    </button>
  );
}

export default function NewPostPage() {
  const router = useRouter();
  const localKidsSnapshot = useSyncExternalStore(subscribeToLocalKids, getLocalKidsSnapshot, () => "");
  const audienceOptions = buildNewPostAudienceOptions(parseLocalKidsStorageValue(localKidsSnapshot));
  const [selectedAudience, setSelectedAudience] = useState<NewPostAudience>(() =>
    getDefaultNewPostAudience(audienceOptions),
  );
  const [selectedType, setSelectedType] = useState<NewPostType>("food");
  const [description, setDescription] = useState(INITIAL_DESCRIPTION);
  const [error, setError] = useState("");

  function handleSelectAudience(option: NewPostAudienceOption) {
    setError("");

    if (option.audience.kind === "room") {
      setSelectedAudience(option.audience);
      return;
    }

    const kid = getSingleKidFromOption(option);

    if (!kid) {
      return;
    }

    setSelectedAudience((currentAudience) => {
      if (currentAudience.kind === "room") {
        return { kind: "kids", kids: [kid] };
      }

      const isAlreadySelected = currentAudience.kids.some((selectedKid) => selectedKid.kidId === kid.kidId);

      return {
        kind: "kids",
        kids: isAlreadySelected
          ? currentAudience.kids.filter((selectedKid) => selectedKid.kidId !== kid.kidId)
          : [...currentAudience.kids, kid],
      };
    });
  }

  function handlePublish() {
    if (!selectedType) {
      setError("Seleccioná un tipo de publicación.");
      return;
    }

    if (!description.trim()) {
      setError("Escribí una descripción antes de publicar.");
      return;
    }

    if (selectedAudience.kind === "kids" && selectedAudience.kids.length === 0) {
      setError("Seleccioná al menos un niño o toda la sala.");
      return;
    }

    saveLocalFeedPost(
      createLocalFeedPost({
        selectedAudience,
        selectedType,
        description,
      }),
    );
    router.push("/");
  }

  return (
    <main className="flex min-h-screen items-start justify-center bg-[#F6ECDF] px-4 py-6 sm:px-6 sm:py-10">
      <section className="w-full max-w-[580px] overflow-hidden rounded-[24px] border border-[#ECE0D0] bg-[#FBF4EC] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)]">
        <header className="flex items-center justify-between gap-3 border-b border-[#ECE0D0] px-5 py-5 sm:px-[26px]">
          <Link href="/" className="flex-none text-[15px] font-bold text-[#94887B]">
            Cancelar
          </Link>
          <h1 className="min-w-0 text-center font-fredoka text-[18px] font-semibold text-[#3F362E]">
            Nueva publicación
          </h1>
          <button
            type="button"
            onClick={handlePublish}
            className="flex-none text-[15px] font-extrabold text-[#D9583C]"
          >
            Publicar
          </button>
        </header>

        <div className="px-5 py-6 sm:px-[26px]">
          <div className="mb-2.5 text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
            PARA
          </div>
          <div className="mb-[22px] flex flex-wrap gap-[9px]">
            {audienceOptions.map((option) => (
              <AudienceChip
                key={option.id}
                option={option}
                isSelected={isAudienceOptionSelected(option, selectedAudience)}
                onSelect={handleSelectAudience}
              />
            ))}
          </div>

          <div className="mb-2.5 text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
            TIPO
          </div>
          <div className="mb-[22px] flex flex-wrap gap-[9px]">
            {POST_TYPE_OPTIONS.map((option) => (
              <TypeChip
                key={option.type}
                option={option}
                isSelected={option.type === selectedType}
                onSelect={setSelectedType}
              />
            ))}
          </div>

          <label
            htmlFor="post-description"
            className="mb-2.5 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]"
          >
            DESCRIPCIÓN
          </label>
          <textarea
            id="post-description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              setError("");
            }}
            placeholder="Contá cómo le fue hoy…"
            className="mb-[22px] min-h-[120px] w-full resize-y rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-3.5 text-[15px] leading-[1.5] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none"
          />

          {error ? (
            <div className="-mt-3 mb-[22px] rounded-[12px] border border-[#F2B7A6] bg-[#FBE3D8] px-3.5 py-2.5 text-[13.5px] font-bold text-[#C5503A]">
              {error}
            </div>
          ) : null}

          <div className="mb-2.5 text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
            FOTOS
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="flex h-24 w-24 items-center justify-center rounded-[14px] border border-[#ECE0D0] bg-[#F4ECE1] text-[#CBB89F]">
              <PhotoIcon width="26" height="26" />
            </div>
            <button
              type="button"
              className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-[14px] border-[1.5px] border-dashed border-[#DBCDBA] bg-[#F4ECE1] text-[#B0A290]"
            >
              <PlusIcon width="22" height="22" className="text-[#C5503A]" />
              <span className="text-[12px]">Agregar</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
