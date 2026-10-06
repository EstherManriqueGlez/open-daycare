"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

import { findMockKidById } from "@/app/_data/kidResolver";
import { LOCAL_KIDS_STORAGE_KEY, mapLocalKidToKid, parseLocalKidsStorageValue } from "@/app/_data/localKids";
import {
  createLocalParentInvitation,
  generateInvitationCode,
  hasLocalParentInvitationForEmail,
  LOCAL_PARENT_INVITATIONS_STORAGE_KEY,
  normalizeParentEmail,
  parseLocalParentInvitationsStorageValue,
  saveLocalParentInvitation,
} from "@/app/_data/localParentInvitations";
import type { LinkParentForm, ParentRelationship } from "@/app/_data/localParentInvitations";

const RELATIONSHIP_OPTIONS: ParentRelationship[] = ["Mamá", "Papá", "Tutor/a"];
const BASIC_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM: LinkParentForm = {
  parentName: "",
  parentEmail: "",
  relationship: "Mamá",
};

type FormErrors = Partial<Record<keyof LinkParentForm | "form", string>>;

function getParamValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function getLocalKidsSnapshot() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(LOCAL_KIDS_STORAGE_KEY) ?? "";
}

function subscribeToLocalKids(onStoreChange: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key === LOCAL_KIDS_STORAGE_KEY) {
      onStoreChange();
    }
  }

  window.addEventListener("storage", handleStorage);

  return () => window.removeEventListener("storage", handleStorage);
}

function getLocalParentInvitationsSnapshot() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(LOCAL_PARENT_INVITATIONS_STORAGE_KEY) ?? "";
}

function subscribeToLocalParentInvitations(onStoreChange: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key === LOCAL_PARENT_INVITATIONS_STORAGE_KEY) {
      onStoreChange();
    }
  }

  window.addEventListener("storage", handleStorage);

  return () => window.removeEventListener("storage", handleStorage);
}

function getFieldClassName(hasError: boolean) {
  return `w-full rounded-[14px] border-[1.5px] bg-white px-4 py-[13px] text-[15px] text-[#3F362E] placeholder:text-[#B6A99B] focus:outline-none ${
    hasError ? "border-[#D9583C] focus:border-[#D9583C]" : "border-[#EADFD0] focus:border-[#F2937A]"
  }`;
}

function hasLinkedParentForEmail(parentEmail: string, linkedParents: NonNullable<ReturnType<typeof findMockKidById>>["linkedParents"]) {
  const normalizedEmail = normalizeParentEmail(parentEmail);

  return linkedParents.some(
    (parent) => parent.parentEmail && normalizeParentEmail(parent.parentEmail) === normalizedEmail,
  );
}

export default function LinkParentPage() {
  const router = useRouter();
  const params = useParams<{ id?: string | string[] }>();
  const kidId = getParamValue(params.id);
  const localKidsSnapshot = useSyncExternalStore(subscribeToLocalKids, getLocalKidsSnapshot, () => "");
  const localParentInvitationsSnapshot = useSyncExternalStore(
    subscribeToLocalParentInvitations,
    getLocalParentInvitationsSnapshot,
    () => "",
  );
  const [form, setForm] = useState<LinkParentForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [invitationCode] = useState(generateInvitationCode);

  const mockKid = findMockKidById(kidId);
  const localKid = parseLocalKidsStorageValue(localKidsSnapshot).find((item) => item.id === kidId);
  const kid = mockKid ?? (localKid ? mapLocalKidToKid(localKid) : undefined);
  const localParentInvitations = parseLocalParentInvitationsStorageValue(localParentInvitationsSnapshot);
  const hasErrors = Object.values(errors).some(Boolean);

  function updateField(field: keyof LinkParentForm, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
      form: undefined,
    }));
  }

  function validateForm() {
    const nextErrors: FormErrors = {};
    const parentName = form.parentName.trim();
    const parentEmail = form.parentEmail.trim();

    if (!kid) {
      nextErrors.form = "No pudimos encontrar este niño.";
    }

    if (!parentName) {
      nextErrors.parentName = "Ingresa el nombre del padre o madre.";
    }

    if (!parentEmail) {
      nextErrors.parentEmail = "Ingresa el email.";
    } else if (!BASIC_EMAIL_PATTERN.test(parentEmail)) {
      nextErrors.parentEmail = "Ingresa un email válido.";
    } else if (kid && hasLinkedParentForEmail(parentEmail, kid.linkedParents)) {
      nextErrors.parentEmail = "Ya existe un padre vinculado con este email.";
    } else if (hasLocalParentInvitationForEmail(kidId, parentEmail, localParentInvitations)) {
      nextErrors.parentEmail = "Ya existe una invitación pendiente para este email.";
    }

    if (!form.relationship) {
      nextErrors.relationship = "Selecciona un parentesco.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    saveLocalParentInvitation(createLocalParentInvitation(kidId, form, invitationCode));
    router.push(profileHref);
  }

  const profileHref = kidId ? `/kids/${kidId}` : "/kids";

  return (
    <main className="flex min-h-screen items-start justify-center bg-[#F6ECDF] px-4 py-6 text-[#3F362E] sm:px-6 sm:py-10">
      <section className="w-full max-w-[480px] overflow-hidden rounded-[24px] border border-[#ECE0D0] bg-[#FBF4EC] shadow-[0_20px_50px_-24px_rgba(63,54,46,0.35)]">
        <header className="flex items-center justify-between gap-4 border-b border-[#ECE0D0] px-5 py-5 min-[420px]:px-[26px]">
          <div className="min-w-0">
            <h1 className="font-fredoka text-[18px] leading-tight font-semibold text-[#3F362E]">
              Vincular padre
            </h1>
            <p className="mt-0.5 truncate text-[13px] text-[#A89A8B]">
              {kid ? `a ${kid.name}` : "a niño"}
            </p>
          </div>

          <Link
            href={profileHref}
            aria-label="Cerrar"
            className="flex h-[34px] w-[34px] flex-none items-center justify-center rounded-[10px] bg-[#F0E6D8] text-[#94887B] transition hover:bg-[#E8D9C8]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </Link>
        </header>

        <form className="px-5 py-[22px] min-[420px]:px-[26px]" noValidate onSubmit={handleSubmit}>
          {hasErrors ? (
            <div
              role="alert"
              className="mb-[18px] rounded-[14px] border border-[#F4B5A6] bg-[#FDE3DC] px-4 py-3 text-[13px] font-bold text-[#B94734]"
            >
              {errors.form ?? "Revisa los campos marcados antes de enviar."}
            </div>
          ) : null}

          <div className="mb-5 flex gap-[11px] rounded-[14px] bg-[#E3ECFB] px-4 py-[13px]">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4E72C8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="mt-px flex-none"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            <p className="text-[13.5px] leading-[1.45] text-[#3F5694]">
              Le enviaremos un correo con un código para que active su cuenta. Solo verá el feed de {kid?.name.split(" ")[0] ?? "este niño"}.
            </p>
          </div>

          <div className="mb-[18px]">
            <label htmlFor="parentName" className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
              NOMBRE DEL PADRE/MADRE
            </label>
            <input
              id="parentName"
              name="parentName"
              value={form.parentName}
              onChange={(event) => updateField("parentName", event.target.value)}
              placeholder="Ej. Diego Fernández"
              aria-invalid={Boolean(errors.parentName)}
              aria-describedby={errors.parentName ? "parentNameError" : undefined}
              className={getFieldClassName(Boolean(errors.parentName))}
            />
            {errors.parentName ? (
              <p id="parentNameError" className="mt-2 text-[12px] font-bold text-[#D9583C]">
                {errors.parentName}
              </p>
            ) : null}
          </div>

          <div className="mb-[18px]">
            <label htmlFor="parentEmail" className="mb-2 block text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
              EMAIL
            </label>
            <input
              id="parentEmail"
              name="parentEmail"
              type="email"
              value={form.parentEmail}
              onChange={(event) => updateField("parentEmail", event.target.value)}
              placeholder="correo@ejemplo.com"
              aria-invalid={Boolean(errors.parentEmail)}
              aria-describedby={errors.parentEmail ? "parentEmailError" : undefined}
              className={getFieldClassName(Boolean(errors.parentEmail))}
            />
            {errors.parentEmail ? (
              <p id="parentEmailError" className="mt-2 text-[12px] font-bold text-[#D9583C]">
                {errors.parentEmail}
              </p>
            ) : null}
          </div>

          <fieldset className="mb-5">
            <legend className="mb-2.5 text-[12px] font-extrabold tracking-[0.7px] text-[#94887B]">
              PARENTESCO
            </legend>
            <div className="flex gap-[9px]">
              {RELATIONSHIP_OPTIONS.map((relationship) => {
                const isSelected = form.relationship === relationship;

                return (
                  <button
                    key={relationship}
                    type="button"
                    onClick={() => updateField("relationship", relationship)}
                    aria-pressed={isSelected}
                    className={`flex-1 rounded-full border-[1.5px] px-2 py-[11px] text-[14px] font-extrabold transition ${
                      isSelected
                        ? "border-[#9FB8EC] bg-[#CCD8F4] text-[#4E72C8]"
                        : "border-[#ECE0D0] bg-[#FFFDF9] text-[#6E6359] hover:border-[#D8CBBA]"
                    }`}
                  >
                    {relationship}
                  </button>
                );
              })}
            </div>
            {errors.relationship ? (
              <p className="mt-2 text-[12px] font-bold text-[#D9583C]">{errors.relationship}</p>
            ) : null}
          </fieldset>

          <div className="mb-5 rounded-[16px] border-[1.5px] border-dashed border-[#E6D08A] bg-[#FBF1D6] p-[18px] text-center">
            <div className="mb-2 text-[12px] font-extrabold tracking-[0.7px] text-[#A88526]">
              CÓDIGO DE INVITACIÓN
            </div>
            <div
              suppressHydrationWarning
              className="font-fredoka text-[30px] leading-tight font-semibold tracking-[5px] text-[#8A7234] min-[380px]:text-[34px] min-[380px]:tracking-[7px]"
            >
              {invitationCode}
            </div>
            <div className="mt-1.5 text-[13px] text-[#A88526]">Vence en 7 días</div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-gradient-to-b from-[#F4977E] to-[#EE8164] p-3.5 text-[15.5px] font-extrabold text-white shadow-[0_10px_22px_-8px_rgba(238,129,100,0.7)] transition hover:brightness-[1.02]"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m22 2-7 20-4-9-9-4z" />
              <path d="M22 2 11 13" />
            </svg>
            Enviar invitación
          </button>
        </form>
      </section>
    </main>
  );
}
