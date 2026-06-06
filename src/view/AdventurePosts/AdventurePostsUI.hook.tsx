import { useAdventurePosts } from "@/services/adventure-posts/adventurePosts.services";
import type { IAdventurePost } from "./interfaces";

export interface IUseAdventurePostsUIHook {
  posts: IAdventurePost[];
  isLoading: boolean;
  isError: boolean;
}

export const useAdventurePostsUIHook = (): IUseAdventurePostsUIHook => {
  const { data: posts = [], isLoading, isError } = useAdventurePosts();

  return {
    posts,
    isLoading,
    isError,
  };
};
