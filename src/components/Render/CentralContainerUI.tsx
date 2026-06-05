interface ICentralContainerUIProps {
  children: React.ReactNode;
  title?: string;
}

export const CentralContainerUI = ({ children, title }: ICentralContainerUIProps) => {
  return (
    <div className="w-full min-h-full h-full p-4">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-stretch gap-4">
        <div>{title && <h1 className="text-xl font-bold text-orange-rally">{title}</h1>}</div>
        <div className="max-h-[calc(85vh-2rem)] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
