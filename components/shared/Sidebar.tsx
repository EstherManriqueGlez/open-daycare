import type { ComponentType, SVGProps } from "react";

import { navItems, sidebarUser } from "@/app/_data/mock";
import type { NavIcon, NavItem } from "@/app/_data/mock";
import {
  BellIcon,
  HomeIcon,
  KidsIcon,
  LogoIcon,
  LogoutIcon,
  PlusIcon,
  UserIcon,
} from "@/components/shared/icons";

const NAV_ICONS: Record<NavIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  home: HomeIcon,
  kids: KidsIcon,
  bell: BellIcon,
  user: UserIcon,
};

function NavLink({ item }: { item: NavItem }) {
  const Icon = NAV_ICONS[item.icon];

  return (
    <a
      aria-disabled="true"
      className={`flex items-center gap-3 rounded-[12px] px-3 py-[11px] text-[14.5px] ${
        item.active
          ? "bg-[#FBE3D8] font-extrabold text-[#D9583C]"
          : "font-semibold text-[#6E6359]"
      }`}
    >
      <Icon />
      <span>{item.label}</span>
    </a>
  );
}

export function SidebarContent() {
  return (
    <>
      <a
        aria-disabled="true"
        className="flex items-center gap-[11px] px-2 pb-[22px] pt-1"
      >
        <div className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[12px] bg-linear-155 from-[#F8C3A8] to-[#F2937A] text-white">
          <LogoIcon />
        </div>
        <div>
          <div className="font-fredoka text-[17px] leading-none font-semibold text-[#3F362E]">
            OpenDayCare
          </div>
          <div className="mt-0.5 text-[11.5px] text-[#A89A8B]">Sala Soles</div>
        </div>
      </a>

      <a
        aria-disabled="true"
        className="mb-[18px] flex w-full items-center justify-center gap-2 rounded-[14px] bg-linear-180 from-[#F4977E] to-[#EE8164] px-3 py-3 text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(238,129,100,0.75)]"
      >
        <PlusIcon />
        Nueva publicación
      </a>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => (
          <NavLink key={item.label} item={item} />
        ))}
      </nav>

      <div className="mt-[10px] border-t border-[#ECE0D0] pt-[14px]">
        <div className="flex items-center gap-[11px] px-2 py-1.5">
          <div className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full bg-[#F2937A] font-fredoka text-[16px] font-semibold text-white">
            {sidebarUser.initial}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[14px] font-extrabold text-[#3F362E]">
              {sidebarUser.name}
            </div>
            <div className="truncate text-[12px] text-[#A89A8B]">
              {sidebarUser.role}
            </div>
          </div>
          <a
            aria-disabled="true"
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
            className="flex h-8 w-8 flex-none items-center justify-center rounded-[10px] bg-[#F6ECDF] text-[#94887B]"
          >
            <LogoutIcon />
          </a>
        </div>
      </div>
    </>
  );
}

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[248px] flex-none flex-col border-r border-[#ECE0D0] bg-[#FFFDF9] px-4 py-6 md:flex">
      <SidebarContent />
    </aside>
  );
}
