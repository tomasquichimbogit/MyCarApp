import { useAdventurePosts, type IAdventurePostRow } from "@/services/adventure-posts/adventurePosts.services";

export interface IUseAdventurePostsUIHook {
  posts: IAdventurePostRow[];
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
