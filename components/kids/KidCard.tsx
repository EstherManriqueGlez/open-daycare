import Link from "next/link";

import type { Kid } from "@/app/_data/mock";

interface KidCardProps {
  kid: Kid;
}

const BADGE_CLASSES = {
  allergy: "bg-[#FBD8CC] text-[#D9684A]",
  link: "bg-[#F9D2DE] text-[#C56486]",
};

export function KidCard({ kid }: KidCardProps) {
  return (
    <Link
      href={`/kids/${kid.id}`}
      className="flex min-w-0 items-center gap-[14px] rounded-[18px] border border-[#ECE0D0] bg-[#FFFDF9] p-4 shadow-[0_4px_14px_-12px_rgba(120,90,60,0.5)] transition duration-150 hover:-translate-y-0.5 hover:border-[#F2A78E]"
    >
      <div
        className="flex h-12 w-12 flex-none items-center justify-center rounded-full font-fredoka text-[19px] font-semibold"
        style={{ backgroundColor: kid.avatarBg, color: kid.avatarColor }}
      >
        {kid.initial}
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate font-fredoka text-[16px] font-semibold text-[#3F362E]">
          {kid.name}
        </div>
        <div className="truncate text-[13px] text-[#A89A8B]">
          {kid.ageLabel} · {kid.parentSummary}
        </div>
      </div>

      {kid.badge ? (
        <span
          className={`flex-none rounded-full px-[9px] py-[5px] text-[11px] font-extrabold ${BADGE_CLASSES[kid.badge.variant]}`}
        >
          {kid.badge.label}
        </span>
      ) : (
        <svg
          className="flex-none"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#CBB89F"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      )}
    </Link>
  );
}
