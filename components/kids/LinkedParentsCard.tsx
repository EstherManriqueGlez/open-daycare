import type { Kid, LinkedParent } from "@/app/_data/mock";

interface LinkedParentsCardProps {
  parents: Kid["linkedParents"];
}

const STATUS_CLASSES: Record<LinkedParent["statusLabel"], string> = {
  ACTIVA: "bg-[#CFEBD8] text-[#3E9B6C]",
  PENDIENTE: "bg-[#F7E7A6] text-[#9A7B1E]",
};

export function LinkedParentsCard({ parents }: LinkedParentsCardProps) {
  return (
    <div className="rounded-[16px] border border-[#ECE0D0] bg-[#FFFDF9] px-[18px] py-4">
      <div className="mb-[14px] text-[12.5px] font-extrabold tracking-[0.8px] text-[#8A7C6D]">
        PADRES VINCULADOS
      </div>
      <div className="flex flex-col gap-[14px]">
        {parents.map((parent) => (
          <div key={parent.id} className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 flex-none items-center justify-center rounded-full font-fredoka text-[16px] font-semibold text-white"
              style={{ backgroundColor: parent.avatarBg }}
            >
              {parent.initial}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[14.5px] font-extrabold text-[#3F362E]">
                {parent.name}
              </div>
              <div className="truncate text-[12.5px] text-[#A89A8B]">
                {parent.relationshipStatus}
              </div>
            </div>
            <span
              className={`flex-none rounded-full px-[9px] py-1 text-[10.5px] font-extrabold ${STATUS_CLASSES[parent.statusLabel]}`}
            >
              {parent.statusLabel}
            </span>
          </div>
        ))}

        <button
          type="button"
          disabled
          aria-disabled="true"
          className="flex items-center gap-3 pt-2 text-left opacity-70"
        >
          <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border-[1.5px] border-dashed border-[#D8CBBA] text-[#B0A290]">
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
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          <span className="text-[14.5px] font-extrabold text-[#C5503A]">
            Vincular otro padre
          </span>
        </button>
      </div>
    </div>
  );
}
