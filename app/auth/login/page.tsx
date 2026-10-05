"use client";

import { useState } from "react";
import Link from "next/link";
import { LogoIcon } from "@/components/shared/icons";

export default function LoginPage() {
  const [email, setEmail] = useState("caro@opendaycare.com");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] bg-[#FBF4EC]">
      {/* Left decorative panel */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#F6A98E] via-[#F2937A] to-[#EC7E62] flex flex-col justify-between p-10 lg:p-[56px_60px] text-white">
        <div className="absolute w-[420px] h-[420px] rounded-full bg-white/12 -top-[140px] -right-[120px] pointer-events-none" />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-white/10 -bottom-[110px] -left-[80px] pointer-events-none" />
        
        <div className="flex items-center gap-[13px] relative z-10">
          <div className="w-[46px] h-[46px] rounded-[14px] bg-white/22 flex items-center justify-center">
            <LogoIcon stroke="#fff" width={26} height={26} />
          </div>
          <span className="font-['Fredoka'] font-semibold text-[21px] tracking-[.5px]">OpenDayCare</span>
        </div>

        <div className="relative z-10 my-10 lg:my-0">
          <h1 className="font-['Fredoka'] font-semibold text-[36px] lg:text-[42px] leading-[1.12] m-0 mb-[18px]">
            El día de cada niño,<br />compartido con su familia.
          </h1>
          <p className="text-[17px] leading-[1.6] m-0 max-w-[430px] text-white/92">
            Publicá momentos, gestioná las salas y mantené a las familias cerca, desde un solo lugar.
          </p>
        </div>

        <div className="relative z-10 text-[14px] text-white/90">
          🌿 Guardería Sala Soles
        </div>
      </div>

      {/* Right login form panel */}
      <div className="flex items-center justify-center p-6 lg:p-10">
        <div className="w-full max-w-[392px]">
          <h2 className="font-['Fredoka'] font-semibold text-[30px] m-0 mb-[6px] text-[#3F362E]">
            Iniciar sesión
          </h2>
          <p className="m-0 mb-7 text-[#94887B] text-[15px]">
            Ingresá para ver el día de hoy.
          </p>

          <div className="text-[12px] font-bold tracking-[.7px] text-[#94887B] mb-[9px]">
            EMAIL
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-[14px_16px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[#3F362E] mb-[18px] focus:outline-none focus:border-[#F2937A]"
          />

          <div className="text-[12px] font-bold tracking-[.7px] text-[#94887B] mb-[9px]">
            CONTRASEÑA
          </div>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-[14px_16px] rounded-[14px] border-[1.5px] border-[#EADFD0] bg-white text-[15px] text-[#3F362E] mb-[10px] focus:outline-none focus:border-[#F2937A]"
          />

          <div className="text-right mb-5">
            <span className="text-[#C5503A] text-[13.5px] font-bold cursor-pointer hover:underline">
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          <Link
            href="/"
            className="block text-center w-full p-[15px] rounded-[15px] bg-gradient-to-b from-[#F4977E] to-[#EE8164] text-white font-extrabold text-[16px] cursor-pointer shadow-[0_10px_22px_-8px_rgba(238,129,100,.7)] hover:opacity-95 transition-opacity"
          >
            Iniciar sesión
          </Link>

          <p className="text-center mt-6 mb-0 text-[#94887B] text-[14.5px]">
            ¿Te invitó la guardería?{" "}
            <Link href="/auth/activate-account" className="text-[#C5503A] font-extrabold hover:underline">
              Activá tu cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
