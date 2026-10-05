"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoIcon } from "@/components/shared/icons";

export default function ActivateAccountPage() {
  const [code, setCode] = useState("7K4P9");
  const [email, setEmail] = useState("lucia.fernandez@gmail.com");
  const [password, setPassword] = useState("contraseña");
  const [photoConsent, setPhotoConsent] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF4EC] p-6 lg:p-10">
      <div className="w-full max-w-[440px]">
        <div className="w-[58px] h-[58px] rounded-[18px] bg-gradient-to-br from-[#F8C3A8] to-[#F2937A] flex items-center justify-center mb-[22px] shadow-[0_12px_26px_-10px_rgba(238,129,100,.65)]">
          <LogoIcon stroke="#fff" width={30} height={30} />
        </div>

        <h1 className="font-['Fredoka'] font-semibold text-[32px] leading-[1.15] m-0 mb-2 text-[#3F362E]">
          Bienvenida a OpenDayCare
        </h1>
        <p className="m-0 mb-[26px] text-[#94887B] text-[15.5px] leading-[1.55]">
          Te invitaron a seguir el día de tu hijo. Creá tu contraseña para activar la cuenta.
        </p>

        {/* Invite card */}
        <div className="flex items-center gap-[14px] bg-white border-[1.5px] border-[#EADFD0] rounded-[16px] p-[14px_16px] mb-[22px]">
          <div className="w-[44px] h-[44px] rounded-full bg-[#A9D9E8] text-[#1F7A93] font-['Fredoka'] font-semibold text-[19px] flex items-center justify-center shrink-0">
            M
          </div>
          <div>
            <div className="text-[13px] text-[#94887B]">Te invitaron a seguir a</div>
            <div className="font-['Fredoka'] font-semibold text-[17px] text-[#3F362E]">
              Mateo · Sala Soles
            </div>
          </div>
        </div>

        <div className="text-[12px] font-bold tracking-[.7px] text-[#94887B] mb-2">
          CÓDIGO DE INVITACIÓN
        </div>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full p-[14px_16px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[18px] tracking-[3px] font-bold text-[#3F362E] mb-[18px] font-['Fredoka'] focus:outline-none focus:border-[#F2937A]"
        />

        <div className="text-[12px] font-bold tracking-[.7px] text-[#94887B] mb-2">
          EMAIL
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-[14px_16px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[#3F362E] mb-[18px] focus:outline-none focus:border-[#F2937A]"
        />

        <div className="text-[12px] font-bold tracking-[.7px] text-[#94887B] mb-2">
          CREAR CONTRASEÑA
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-[14px_16px] rounded-[14px] border-[1.5px] border-[#F2A78E] bg-white text-[15px] text-[#3F362E] mb-[18px] focus:outline-none focus:border-[#F2937A]"
        />

        {/* Photo consent checkbox label */}
        <label
          onClick={() => setPhotoConsent(!photoConsent)}
          className="flex items-start gap-3 bg-[#FBF1D6] rounded-[14px] p-[14px_16px] mb-6 cursor-pointer select-none"
        >
          <span
            className={`shrink-0 w-6 h-6 rounded-[8px] flex items-center justify-center mt-[1px] transition-colors ${
              photoConsent ? "bg-[#5FB97E]" : "bg-white border-[1.5px] border-[#EADFD0]"
            }`}
          >
            {photoConsent && (
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </span>
          <span className="text-[14px] text-[#8A7234] leading-[1.45]">
            Autorizo a la guardería a tomar y compartir fotos de mi hijo dentro de la app.
          </span>
        </label>

        <Link
          href="/"
          className="block text-center w-full p-[15px] rounded-[15px] bg-gradient-to-b from-[#F4977E] to-[#EE8164] text-white font-extrabold text-[16px] shadow-[0_10px_22px_-8px_rgba(238,129,100,.7)] hover:opacity-95 transition-opacity"
        >
          Activar mi cuenta
        </Link>

        <p className="text-center mt-[22px] mb-0 text-[#94887B] text-[14.5px]">
          ¿Ya tenés cuenta?{" "}
          <Link href="/auth/login" className="text-[#C5503A] font-extrabold hover:underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
