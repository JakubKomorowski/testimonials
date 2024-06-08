import { Input } from "@nextui-org/react";
import React, { useEffect } from "react";
import { inputConfig } from "../Forms/FormBuilderSidebar";
import { useFormContext } from "react-hook-form";

type Props = {
  widgetLoading?: boolean;
  widgetName?: string;
};

const WidgetBuilderSidebarRight = ({ widgetName, widgetLoading }: Props) => {
  const { setValue, watch, register } = useFormContext();
  const name = watch("name", widgetName);
  useEffect(() => {
    setValue("name", widgetName);
  }, [widgetLoading]);
  return (
    <aside className="p-4 col-start-5 row-start-2 row-span-3 border-l border-gray-300">
      <div className="mt-12">
        <Input
          {...inputConfig}
          labelPlacement="outside"
          placeholder="Widget name"
          label="Widget name"
          value={name}
          {...register("name")}
        />
      </div>
    </aside>
  );
};

export default WidgetBuilderSidebarRight;
