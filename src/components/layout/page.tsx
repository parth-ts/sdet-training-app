import { PropsWithChildren } from "react";

type PageLayoutProps = PropsWithChildren;

export const PageLayout = ({ children }: PageLayoutProps) => {
  return <div className="max-w-screen-lg mx-auto my-6">{children}</div>;
};
