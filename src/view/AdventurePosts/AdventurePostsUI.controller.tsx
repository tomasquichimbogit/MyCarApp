import { AdventurePostsUIView } from "./AdventurePostsUI.view";
import { useAdventurePostsUIHook } from "./AdventurePostsUI.hook";

export const AdventurePostsUI = () => {
  const hook = useAdventurePostsUIHook();
  return <AdventurePostsUIView {...hook} />;
};
