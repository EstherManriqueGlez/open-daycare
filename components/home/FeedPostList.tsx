"use client";

import { useSyncExternalStore } from "react";

import {
  LOCAL_FEED_POSTS_STORAGE_KEY,
  mapLocalFeedPostsToViews,
  parseLocalFeedPostsStorageValue,
} from "@/app/_data/localFeedPosts";
import type { FeedPost } from "@/app/_data/mock";
import { PostCard } from "@/components/home/PostCard";

interface FeedPostListProps {
  initialPosts: FeedPost[];
}

function getLocalFeedPostsSnapshot() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(LOCAL_FEED_POSTS_STORAGE_KEY) ?? "";
}

function subscribeToLocalFeedPosts(onStoreChange: () => void) {
  function handleStorage(event: StorageEvent) {
    if (event.key === LOCAL_FEED_POSTS_STORAGE_KEY) {
      onStoreChange();
    }
  }

  window.addEventListener("storage", handleStorage);

  return () => window.removeEventListener("storage", handleStorage);
}

export function FeedPostList({ initialPosts }: FeedPostListProps) {
  const localFeedPostsSnapshot = useSyncExternalStore(
    subscribeToLocalFeedPosts,
    getLocalFeedPostsSnapshot,
    () => "",
  );
  const localPosts = mapLocalFeedPostsToViews(
    parseLocalFeedPostsStorageValue(localFeedPostsSnapshot),
  );
  const posts = [...localPosts, ...initialPosts];

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
