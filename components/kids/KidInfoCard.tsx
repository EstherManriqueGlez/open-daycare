import type { Kid } from "@/app/_data/mock";

interface KidInfoCardProps {
  kid: Kid;
}

export function KidInfoCard({ kid }: KidInfoCardProps) {
  const rows = [
    { label: "Fecha de nacimiento", value: kid.birthDateLabel },
    { label: "Sala", value: kid.room },
    { label: "Ingreso", value: kid.admissionLabel },
  ];

  return (
    <div className="overflow-hidden rounded-[16px] border border-[#ECE0D0] bg-[#FFFDF9]">
      {rows.map((row, index) => (
        <div
          key={row.label}
          className={`flex justify-between gap-4 px-[18px] py-[15px] text-[14.5px] ${
            index < rows.length - 1 ? "border-b border-[#F0E6D8]" : ""
          }`}
        >
          <span className="text-[#94887B]">{row.label}</span>
          <span className="font-extrabold text-[#3F362E]">{row.value}</span>
        </div>
      ))}
    </div>
  );
}
