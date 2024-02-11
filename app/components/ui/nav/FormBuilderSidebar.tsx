import React from "react";
import Logo from "../Logo";

const FormBuilderSidebar = () => {
  return (
    <aside className=" p-4  px-6 border-r border-gray-300 row-span-4 col-start-1 row-start-1">
      <div className="mb-12">
        <Logo />
      </div>
      <div className="mb-8"></div>
    </aside>
  );
};

export default FormBuilderSidebar;
