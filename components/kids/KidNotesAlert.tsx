import type { Kid } from "@/app/_data/mock";

interface KidNotesAlertProps {
  notes: NonNullable<Kid["notes"]>;
}

export function KidNotesAlert({ notes }: KidNotesAlertProps) {
  return (
    <div className="flex gap-[14px] rounded-[16px] bg-[#FBDAD6] px-[18px] py-4">
      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-[11px] bg-[#F4A8A0] text-white">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      </div>
      <div>
        <div className="mb-0.5 text-[15px] font-extrabold text-[#C5413A]">
          {notes.title}
        </div>
        <div className="text-[14.5px] leading-normal text-[#B25249]">{notes.text}</div>
      </div>
    </div>
  );
}
