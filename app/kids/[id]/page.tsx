import { notFound } from "next/navigation";

import { kids } from "@/app/_data/mock";
import { MobileNav } from "@/components/shared/MobileNav";
import { Sidebar } from "@/components/shared/Sidebar";

export default async function KidProfilePage({ params }: PageProps<"/kids/[id]">) {
  const { id } = await params;
  const kid = kids.find((item) => item.id === id);

  if (!kid) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-[#F6ECDF]">
      <Sidebar />
      <MobileNav />

      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[820px] px-5 pt-20 pb-20 md:px-10 md:pt-[34px]">
          <h1 className="font-fredoka text-[30px] leading-none font-semibold text-[#3F362E]">
            {kid.name}
          </h1>
        </div>
      </main>
    </div>
  );
}
