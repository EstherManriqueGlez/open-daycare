"use client";

import Link from "next/link";
import { useState } from "react";

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
  const [form, setForm] = useState<NewKidForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

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
    validateForm();
  }

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

          <button type="submit" form="newKidForm" className="text-[15px] font-extrabold text-[#D9583C]">
            Guardar
          </button>
        </header>

        <form id="newKidForm" className="px-[26px] py-6" noValidate onSubmit={handleSubmit}>
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
            <div className="flex-1">
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

            <div className="flex-1">
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
                className={`${getFieldClassName(Boolean(errors.room))} font-bold`}
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
