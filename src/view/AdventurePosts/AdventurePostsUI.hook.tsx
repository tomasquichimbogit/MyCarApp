import { useAdventurePosts, type IAdventurePostRow } from "@/services/adventure-posts/adventurePosts.services";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const LOCATION_QUERY_KEY = "location";
const DEFAULT_LOCATION = "Ecuador";
const locationOptions = ["Ecuador", "Otros países"] as const;

export type AdventureLocation = (typeof locationOptions)[number];

const isValidLocation = (value: string | null): value is AdventureLocation =>
  !!value && locationOptions.includes(value as AdventureLocation);

export interface IUseAdventurePostsUIHook {
  posts: IAdventurePostRow[];
  isLoading: boolean;
  isError: boolean;
  locationOptions: AdventureLocation[];
  selectedLocation: AdventureLocation;
  setSelectedLocation: (location: AdventureLocation) => void;
}

export const useAdventurePostsUIHook = (): IUseAdventurePostsUIHook => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: posts = [], isLoading, isError } = useAdventurePosts();

  const selectedLocation = useMemo(() => {
    const fromUrl = searchParams.get(LOCATION_QUERY_KEY);
    return isValidLocation(fromUrl) ? fromUrl : DEFAULT_LOCATION;
  }, [searchParams]);

  const setSelectedLocation = useCallback(
    (location: AdventureLocation) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (location === DEFAULT_LOCATION) {
            next.delete(LOCATION_QUERY_KEY);
          } else {
            next.set(LOCATION_QUERY_KEY, location);
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  const filteredPostsByLocation = useMemo(() => {
    if (selectedLocation === "Otros países") {
      return posts.filter((post) => post.location !== "Ecuador");
    }
    return posts.filter((post) => post.location === selectedLocation);
  }, [posts, selectedLocation]);

  return {
    posts: filteredPostsByLocation,
    isLoading,
    isError,
    locationOptions: [...locationOptions],
    selectedLocation,
    setSelectedLocation,
  };
};
