"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createLocalKid, saveLocalKid } from "@/app/_data/localKids";
import type { NewKidForm } from "@/app/_data/localKids";

const INITIAL_FORM: NewKidForm = {
  fullName: "",
  birthDate: "",
  room: "Soles",
  allergies: "",
  medicalNotes: "",
};

const ROOM_OPTIONS = ["Soles", "Estrellas", "Lunas"] as const;
const DATE_FORMAT_PATTERN = /^\d{2}\/\d{2}\/\d{4}$/;

type FormErrors = Partial<Record<keyof NewKidForm, string>>;

function getFieldClassName(hasError: boolean) {
  return `w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none ${
    hasError ? "border-[#D9583C] focus:border-[#D9583C]" : "border-[#EADFD0] focus:border-[#F2937A]"
  }`;
}

export default function NewKidPage() {
  const router = useRouter();
  const [form, setForm] = useState<NewKidForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const hasErrors = Object.values(errors).some(Boolean);

  function updateField(field: keyof NewKidForm, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));
  }

  function validateForm() {
    const nextErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Ingresa el nombre completo.";
    }

    if (!form.birthDate.trim()) {
      nextErrors.birthDate = "Ingresa la fecha de nacimiento.";
    } else if (!DATE_FORMAT_PATTERN.test(form.birthDate.trim())) {
      nextErrors.birthDate = "Usa el formato dd/mm/aaaa.";
    }

    if (!form.room) {
      nextErrors.room = "Selecciona una sala.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    saveLocalKid(createLocalKid(form));
    router.push("/kids");
  }

  return (
    <main className="min-h-screen bg-[#F6ECDF] px-4 py-6 text-[#3F362E] sm:px-8 sm:py-10">
      <section className="mx-auto w-full max-w-[520px] overflow-hidden rounded-[24px] border border-[#ECE0D0] bg-[#FBF4EC] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)]">
        <header className="flex items-center justify-between gap-3 border-b border-[#ECE0D0] px-5 py-5 min-[420px]:px-[26px]">
          <Link href="/kids" className="whitespace-nowrap text-[15px] font-bold text-[#94887B]">
            Cancelar
          </Link>

          <h1 className="min-w-0 text-center font-fredoka text-[18px] leading-none font-semibold text-[#3F362E]">
            Agregar niño
          </h1>

          <button type="submit" form="newKidForm" className="whitespace-nowrap text-[15px] font-extrabold text-[#D9583C]">
            Guardar
          </button>
        </header>

        <form id="newKidForm" className="px-5 py-6 min-[420px]:px-[26px]" noValidate onSubmit={handleSubmit}>
          {hasErrors ? (
            <div
              role="alert"
              className="mb-[18px] rounded-[14px] border border-[#F4B5A6] bg-[#FDE3DC] px-4 py-3 text-[13px] font-bold text-[#B94734]"
            >
              Revisa los campos marcados antes de guardar.
            </div>
          ) : null}

          <div className="mb-[18px]">
            <label htmlFor="fullName" className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
              NOMBRE COMPLETO
            </label>
            <input
              id="fullName"
              name="fullName"
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              placeholder="Ej. Martina López"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullNameError" : undefined}
              className={getFieldClassName(Boolean(errors.fullName))}
            />
            {errors.fullName ? (
              <p id="fullNameError" className="mt-2 text-[12px] font-bold text-[#D9583C]">
                {errors.fullName}
              </p>
            ) : null}
          </div>

          <div className="mb-[18px] flex flex-col gap-[14px] min-[520px]:flex-row">
            <div className="min-w-0 flex-1">
              <label htmlFor="birthDate" className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
                FECHA DE NACIMIENTO
              </label>
              <input
                id="birthDate"
                name="birthDate"
                value={form.birthDate}
                onChange={(event) => updateField("birthDate", event.target.value)}
                inputMode="numeric"
                placeholder="dd/mm/aaaa"
                aria-invalid={Boolean(errors.birthDate)}
                aria-describedby={errors.birthDate ? "birthDateError" : undefined}
                className={getFieldClassName(Boolean(errors.birthDate))}
              />
              {errors.birthDate ? (
                <p id="birthDateError" className="mt-2 text-[12px] font-bold text-[#D9583C]">
                  {errors.birthDate}
                </p>
              ) : null}
            </div>

            <div className="min-w-0 flex-1">
              <label htmlFor="room" className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
                SALA
              </label>
              <select
                id="room"
                name="room"
                value={form.room}
                onChange={(event) => updateField("room", event.target.value)}
                aria-invalid={Boolean(errors.room)}
                aria-describedby={errors.room ? "roomError" : undefined}
                className={`${getFieldClassName(Boolean(errors.room))} appearance-none bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%20stroke%3D%22%23B0A290%22%20stroke-width%3D%222.2%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:16px_16px] bg-[right_18px_center] bg-no-repeat pr-12 font-bold`}
              >
                {ROOM_OPTIONS.map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
              {errors.room ? (
                <p id="roomError" className="mt-2 text-[12px] font-bold text-[#D9583C]">
                  {errors.room}
                </p>
              ) : null}
            </div>
          </div>

          <div className="mb-[18px]">
            <label htmlFor="allergies" className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
              ALERGIAS (ETIQUETAS)
            </label>
            <input
              id="allergies"
              name="allergies"
              value={form.allergies}
              onChange={(event) => updateField("allergies", event.target.value)}
              placeholder="Ej. Maní, Lactosa"
              className={getFieldClassName(false)}
            />
          </div>

          <div>
            <label htmlFor="medicalNotes" className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
              NOTAS MÉDICAS
            </label>
            <textarea
              id="medicalNotes"
              name="medicalNotes"
              value={form.medicalNotes}
              onChange={(event) => updateField("medicalNotes", event.target.value)}
              placeholder="Indicaciones, medicación, contactos..."
              className={`${getFieldClassName(false)} min-h-[90px] resize-y leading-normal`}
            />
          </div>
        </form>
      </section>
    </main>
  );
}
