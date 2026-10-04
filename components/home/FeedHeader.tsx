interface FeedHeaderProps {
  subtitle: string;
}

export function FeedHeader({ subtitle }: FeedHeaderProps) {
  return (
    <header className="mb-6">
      <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-[#D9583C]">
        GUARDERÍA · SALA SOLES
      </div>
      <h1 className="m-0 font-fredoka text-[30px] font-semibold text-[#3F362E]">
        Buenas, Caro
      </h1>
      <p className="mt-[5px] mb-0 text-[14.5px] text-[#94887B]">{subtitle}</p>
    </header>
  );
}
