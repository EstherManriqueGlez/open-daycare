import { feedPosts, feedSubtitle } from "@/app/_data/mock";
import { Composer } from "@/components/home/Composer";
import { FeedDivider } from "@/components/home/FeedDivider";
import { FeedHeader } from "@/components/home/FeedHeader";
import { PostCard } from "@/components/home/PostCard";
import { MobileNav } from "@/components/shared/MobileNav";
import { Sidebar } from "@/components/shared/Sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-[#F6ECDF]">
      <Sidebar />
      <MobileNav />

      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[760px] px-5 pt-20 pb-20 md:px-10 md:pt-[34px]">
          <FeedHeader subtitle={feedSubtitle} />
          <Composer />
          <FeedDivider />

          <div className="flex flex-col gap-4">
            {feedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
