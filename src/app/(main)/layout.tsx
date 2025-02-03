import { ReactNode } from "react";

import Shell from "@/components/Shell";

const Main = ({ children }: { children: ReactNode }) => {
  return <Shell>{children}</Shell>;
};

export default Main;
