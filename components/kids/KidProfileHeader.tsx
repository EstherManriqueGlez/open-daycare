import Link from "next/link";

import type { Kid } from "@/app/_data/mock";

interface KidProfileHeaderProps {
  kid: Kid;
}

export function KidProfileHeader({ kid }: KidProfileHeaderProps) {
  return (
    <>
      <Link
        href="/kids"
        className="mb-5 flex items-center gap-[7px] text-[14px] font-bold text-[#94887B]"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Volver a Niños
      </Link>

      <div className="flex flex-wrap items-center gap-[18px]">
        <div
          className="flex h-[84px] w-[84px] flex-none items-center justify-center rounded-full font-fredoka text-[34px] font-semibold"
          style={{ backgroundColor: kid.avatarBg, color: kid.avatarColor }}
        >
          {kid.initial}
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="m-0 truncate font-fredoka text-[28px] leading-tight font-semibold text-[#3F362E]">
            {kid.name}
          </h1>
          <p className="mt-[3px] text-[15px] text-[#94887B]">
            {kid.ageLabel} · Sala {kid.room}
          </p>
        </div>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="cursor-not-allowed rounded-[12px] border-[1.5px] border-[#ECE0D0] bg-[#FFFDF9] px-4 py-[9px] text-[14px] font-bold text-[#6E6359] opacity-70 max-[420px]:w-full"
        >
          Editar
        </button>
      </div>
    </>
  );
}
