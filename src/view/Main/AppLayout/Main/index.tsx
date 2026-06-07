import type { ReactNode } from "react";

export const Main = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full h-full">
      <div>{children}</div>
    </main>
  );
};
