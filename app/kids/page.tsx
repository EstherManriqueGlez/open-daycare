import { kids } from "@/app/_data/mock";
import { KidsManagement } from "@/components/kids/KidsManagement";
import { MobileNav } from "@/components/shared/MobileNav";
import { Sidebar } from "@/components/shared/Sidebar";

export default function KidsPage() {
  return (
    <div className="flex min-h-screen bg-[#F6ECDF]">
      <Sidebar />
      <MobileNav />

      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[880px] px-5 pt-20 pb-20 md:px-10 md:pt-[34px]">
          <KidsManagement initialKids={kids} />
        </div>
      </main>
    </div>
  );
}
