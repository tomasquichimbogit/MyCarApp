export const adventurePostsKeys = {
  init: ["adventure-posts"] as const,
  list: () => [...adventurePostsKeys.init, "list"] as const,
};