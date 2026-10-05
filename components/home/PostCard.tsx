import { POST_TYPE_LABEL } from "@/app/_data/mock";
import type { FeedPost, PostType } from "@/app/_data/mock";
import {
  CommentIcon,
  HeartIcon,
  MegaphoneIcon,
} from "@/components/shared/icons";
import { PhotoPlaceholder } from "@/components/home/PhotoPlaceholder";

const BADGE_STYLES: Record<
  PostType,
  { background: string; foreground: string }
> = {
  achievement: { background: "#CFEBD8", foreground: "#3E9B6C" },
  activity: { background: "#C7E7F1", foreground: "#2E89A6" },
  announcement: { background: "#CCD8F4", foreground: "#4E72C8" },
};

interface PostCardProps {
  post: FeedPost;
}

function PostAvatar({ post }: PostCardProps) {
  return (
    <div
      className="flex h-11 w-11 flex-none items-center justify-center rounded-full font-fredoka text-[17px] font-semibold"
      style={{ backgroundColor: post.avatarBg, color: post.avatarColor }}
    >
      {post.avatarIcon === "megaphone" ? <MegaphoneIcon /> : post.authorInitial}
    </div>
  );
}

function PostBadge({ type }: { type: PostType }) {
  const style = BADGE_STYLES[type];

  return (
    <div
      className="flex items-center gap-[7px] rounded-full px-3 py-1.5"
      style={{ backgroundColor: style.background }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: style.foreground }}
      />
      <span
        className="text-[12px] font-extrabold tracking-[0.5px]"
        style={{ color: style.foreground }}
      >
        {POST_TYPE_LABEL[type]}
      </span>
    </div>
  );
}

export function PostCard({ post }: PostCardProps) {
  const byline = post.publishedByMe ? `${post.time} · publicado por vos` : post.time;

  return (
    <article className="rounded-[20px] border border-[#ECE0D0] bg-[#FFFDF9] px-[22px] py-5 shadow-[0_4px_16px_-12px_rgba(120,90,60,0.5)]">
      <div className="mb-[14px] flex items-center gap-3">
        <PostAvatar post={post} />

        <div className="flex-1">
          <div className="font-fredoka text-[16.5px] font-semibold text-[#3F362E]">
            {post.authorName}
          </div>
          <div className="text-[12.5px] text-[#A89A8B]">{byline}</div>
        </div>

        <PostBadge type={post.type} />
      </div>

      <div className="mb-2.5 text-[12.5px] text-[#A89A8B]">{post.audience}</div>
      <p className="m-0 text-[15.5px] leading-[1.55] text-[#4A4038]">
        {post.text}
      </p>

      {post.photoPlaceholder ? (
        <PhotoPlaceholder label={post.photoPlaceholder.label} />
      ) : null}

      <footer className="mt-4 flex items-center gap-[18px] border-t border-[#F0E6D8] pt-[14px]">
        <span className="flex items-center gap-[7px] text-[14px] font-bold text-[#E0654A]">
          <HeartIcon />
          {post.hearts}
        </span>
        <button
          type="button"
          disabled
          className="flex items-center gap-[7px] text-[14px] font-bold text-[#94887B]"
        >
          <CommentIcon />
          {post.comments}
        </button>
        <span className="flex-1" />
        <button
          type="button"
          disabled
          className="text-[14px] font-extrabold text-[#C5503A]"
        >
          Editar
        </button>
      </footer>
    </article>
  );
}
