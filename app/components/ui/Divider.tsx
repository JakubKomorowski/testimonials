import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const Divider: FC<Props> = ({ children }) => {
  return (
    <div className="relative flex py-8 items-center">
      <div className="flex-grow border-t border-gray-300"></div>
      <div className="flex-shrink mx-4 text-gray-400">{children}</div>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default Divider;
