import type { Kid } from "@/app/_data/mock";
import { KidCard } from "@/components/kids/KidCard";

interface KidsListProps {
  kids: Kid[];
}

export function KidsList({ kids }: KidsListProps) {
  return (
    <div className="grid grid-cols-1 gap-[14px] md:grid-cols-2">
      {kids.map((kid) => (
        <KidCard key={kid.id} kid={kid} />
      ))}
    </div>
  );
}
