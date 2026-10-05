import { notFound } from "next/navigation";

import { kids } from "@/app/_data/mock";
import { KidInfoCard } from "@/components/kids/KidInfoCard";
import { KidNotesAlert } from "@/components/kids/KidNotesAlert";
import { KidProfileActions } from "@/components/kids/KidProfileActions";
import { KidProfileHeader } from "@/components/kids/KidProfileHeader";
import { LinkedParentsCard } from "@/components/kids/LinkedParentsCard";
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
          <div className="flex flex-col gap-[26px] md:flex-row md:items-start">
            <div className="flex min-w-0 flex-1 flex-col gap-[18px]">
              <KidProfileHeader kid={kid} />
              {kid.notes ? <KidNotesAlert notes={kid.notes} /> : null}
              <KidInfoCard kid={kid} />
            </div>

            <div className="flex w-full flex-none flex-col gap-[14px] md:w-[300px]">
              <KidProfileActions />
              <LinkedParentsCard parents={kid.linkedParents} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
