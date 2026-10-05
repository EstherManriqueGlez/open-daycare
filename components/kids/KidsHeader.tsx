import { PlusIcon } from "@/components/shared/icons";

export function KidsHeader() {
  return (
    <div className="mb-[22px] flex items-end justify-between gap-4">
      <div>
        <div className="mb-1 text-[12.5px] font-extrabold tracking-[0.8px] text-[#D9583C]">
          GESTIÓN
        </div>
        <h1 className="m-0 font-fredoka text-[30px] leading-none font-semibold text-[#3F362E]">
          Niños
        </h1>
      </div>

      <button
        type="button"
        disabled
        aria-disabled="true"
        className="flex items-center gap-2 rounded-[14px] bg-linear-180 from-[#F4977E] to-[#EE8164] px-[18px] py-[11px] text-[14.5px] font-extrabold text-white opacity-70 shadow-[0_8px_18px_-8px_rgba(238,129,100,0.7)]"
      >
        <PlusIcon />
        Agregar niño
      </button>
    </div>
  );
}
