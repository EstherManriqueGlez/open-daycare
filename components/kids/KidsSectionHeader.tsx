interface KidsSectionHeaderProps {
  count: number;
}

export function KidsSectionHeader({ count }: KidsSectionHeaderProps) {
  return (
    <div className="mb-[14px] flex items-center gap-3">
      <span className="text-[12.5px] font-extrabold tracking-[0.8px] text-[#3F362E]">
        SALA SOLES
      </span>
      <span className="text-[13px] text-[#A89A8B]">{count} niños</span>
      <span className="h-px flex-1 bg-[#E7DAC8]" />
    </div>
  );
}
