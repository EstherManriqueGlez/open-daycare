"use client";

import Link from "next/link";

export default function NewKidPage() {
  return (
    <main className="min-h-screen bg-[#F6ECDF] px-6 py-10 text-[#3F362E] sm:px-8">
      <section className="mx-auto w-full max-w-[520px] overflow-hidden rounded-[24px] border border-[#ECE0D0] bg-[#FBF4EC] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)]">
        <header className="flex items-center justify-between border-b border-[#ECE0D0] px-[26px] py-5">
          <Link href="/kids" className="text-[15px] font-bold text-[#94887B]">
            Cancelar
          </Link>

          <h1 className="font-fredoka text-[18px] leading-none font-semibold text-[#3F362E]">
            Agregar niño
          </h1>

          <button type="button" className="text-[15px] font-extrabold text-[#D9583C]">
            Guardar
          </button>
        </header>

        <div className="px-[26px] py-6">
          <div className="mb-[18px]">
            <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
              NOMBRE COMPLETO
            </label>
            <input
              disabled
              placeholder="Ej. Martina López"
              className="w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] disabled:opacity-100"
            />
          </div>

          <div className="mb-[18px] flex flex-col gap-[14px] min-[520px]:flex-row">
            <div className="flex-1">
              <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
                FECHA DE NACIMIENTO
              </label>
              <input
                disabled
                placeholder="dd/mm/aaaa"
                className="w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] disabled:opacity-100"
              />
            </div>

            <div className="flex-1">
              <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
                SALA
              </label>
              <div className="flex items-center gap-2 rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] font-bold text-[#3F362E]">
                Soles
                <span className="flex-1" />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#B0A290"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-[18px]">
            <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
              ALERGIAS (ETIQUETAS)
            </label>
            <input
              disabled
              placeholder="Ej. Maní, Lactosa"
              className="w-full rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] disabled:opacity-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
              NOTAS MÉDICAS
            </label>
            <textarea
              disabled
              placeholder="Indicaciones, medicación, contactos..."
              className="min-h-[90px] w-full resize-y rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white px-4 py-[13px] text-[15px] leading-normal text-[#3F362E] placeholder:text-[#B6A99B] disabled:opacity-100"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
