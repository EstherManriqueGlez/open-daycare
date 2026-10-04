"use client";

import { useState } from "react";

import { CloseIcon, MenuIcon } from "@/components/shared/icons";
import { SidebarContent } from "@/components/shared/Sidebar";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Abrir navegación"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-[14px] border border-[#ECE0D0] bg-[#FFFDF9] text-[#3F362E] shadow-[0_8px_24px_-18px_rgba(63,54,46,0.65)]"
      >
        <MenuIcon />
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-40">
          <button
            type="button"
            aria-label="Cerrar navegación"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-[#3F362E]/35"
          />

          <aside className="relative flex h-full w-[82vw] max-w-[300px] flex-col border-r border-[#ECE0D0] bg-[#FFFDF9] px-4 py-6 shadow-[18px_0_40px_-30px_rgba(63,54,46,0.75)]">
            <button
              type="button"
              aria-label="Cerrar navegación"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-[12px] bg-[#F6ECDF] text-[#6E6359]"
            >
              <CloseIcon />
            </button>

            <SidebarContent />
          </aside>
        </div>
      ) : null}
    </div>
  );
}
