import { useApiGetQuery } from "@/config/axiosMethods";
import { SUPABASE } from "@/constants";
import { adventurePostsKeys } from "./adventurePostsKeys";

export interface IAdventurePostLikes {
  userId: string;
  createdAt: string;
}

export interface IAdventurePostComments {
  id: string;
  userId: string;
  comment: string;
  createdAt: string;
}


export interface IAdventurePostRow {
  id: string;
  author_name: string | null;
  author_role: string | null;
  content: string | null;
  video_id: string | null;
  location: string | null;
  created_at: string;
  likes: IAdventurePostLikes[];
  comments: IAdventurePostComments[];
  tags: string[] | null;
}

export const fetchAdventurePosts = async (): Promise<IAdventurePostRow[]> => {
  const { data, error } = await SUPABASE
    .from("adventure_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as IAdventurePostRow[]);
};

export const useAdventurePosts = () => {
  return useApiGetQuery(adventurePostsKeys.list(), fetchAdventurePosts);
};
