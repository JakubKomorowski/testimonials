import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Box = ({ children }: Props) => {
  return (
    <div className="bg-secondary-foreground rounded-lg my-8 mx-[-30px] md:mx-[-40px] p-12 shadow-[0px_4px_0px_0px_#161925_inset]">
      <p className="text-xl font-semibold">{children}</p>
    </div>
  );
};

export default Box;
