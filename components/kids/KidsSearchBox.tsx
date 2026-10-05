export function KidsSearchBox() {
  return (
    <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-[#ECE0D0] bg-[#FFFDF9] px-4 py-3">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#B0A290"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="search"
        placeholder="Buscar niño..."
        disabled
        aria-label="Buscar niño"
        className="min-w-0 flex-1 border-0 bg-transparent text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] disabled:opacity-100"
      />
    </div>
  );
}
