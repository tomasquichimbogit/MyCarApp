import { useQuery } from "@tanstack/react-query";
import { SUPABASE } from "@/constants";
import type { IAdventurePost } from "@/view/AdventurePosts/interfaces";
import { adventurePostsKeys } from "./adventurePostsKeys";

interface IAdventurePostLikes {
  userId: string;
  createdAt: string;
}

interface IAdventurePostComments {
  id: string;
  userId: string;
  comment: string;
  createdAt: string;
}


interface IAdventurePostRow {
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

const mapAdventurePost = (row: IAdventurePostRow): IAdventurePost => ({
  id: row.id,
  author: {
    name: row.author_name ?? "Anónimo",
    role: row.author_role ?? undefined,
  },
  content: row.content ?? "",
  videoId: row.video_id ?? "",
  location: row.location ?? undefined,
  createdAt: row.created_at,
  likes: row.likes.length,
  comments: row.comments.length,
  tags: row.tags ?? undefined,
});

export const fetchAdventurePosts = async (): Promise<IAdventurePost[]> => {
  const { data, error } = await SUPABASE
    .from("adventure_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data as IAdventurePostRow[]).map(mapAdventurePost);
};

export const useAdventurePosts = () => {
  return useQuery({
    queryKey: adventurePostsKeys.list(),
    queryFn: fetchAdventurePosts,
  });
};
