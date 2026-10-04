import { PhotoIcon } from "@/components/shared/icons";

interface PhotoPlaceholderProps {
  label: string;
}

export function PhotoPlaceholder({ label }: PhotoPlaceholderProps) {
  return (
    <a
      href="#"
      className="mt-[14px] flex h-[200px] flex-col items-center justify-center gap-2 rounded-[16px] border-[1.5px] border-dashed border-[#DBCDBA] bg-[#F4ECE1] text-[#B0A290]"
    >
      <PhotoIcon />
      <span className="text-[13.5px]">{label}</span>
    </a>
  );
}
