"use client";
import { Tabs, Tab, Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { Iform } from "@/types/Form";
import { inputConfig } from "./FormBuilderSidebar";
import { useEffect } from "react";
import { DropzoneField } from "../molecules/DropzoneField";
import { DocumentData, getDoc } from "firebase/firestore";
interface Props {
  currentForm?: DocumentData & Iform;
  loading: boolean;
}

const FormBuilderSidebarRight = ({ currentForm, loading }: Props) => {
  const { register, setValue, watch } = useFormContext();

  // const [value, loading, error] = useDocument(
  //   auth.currentUser && doc(db, "users", auth.currentUser.uid)
  // );

  const title = watch("title", currentForm?.title);
  const accentColor = watch("accentColor", currentForm?.accentColor);

  useEffect(() => {
    setValue("title", currentForm?.title);
    setValue("logo", currentForm?.logo);
    setValue("accentColor", currentForm?.accentColor);
  }, [loading]);

  return (
    <aside className="p-4 col-start-5 row-start-2 row-span-3 border-l border-gray-300">
      <Tabs className="" radius="sm" aria-label="Options" fullWidth>
        <Tab key="settings" title="Settings">
          <div className="mt-12">
            <Input
              {...inputConfig}
              label="Form name"
              value={title}
              {...register("title")}
            />
          </div>
          <div className="mt-4">
            <DropzoneField name="logo" currentForm={currentForm} />
          </div>
        </Tab>
        <Tab key="design" title="Design">
          <div className="mt-5">
            <p className="text-sm cursor-default">Accent color</p>
            <div className="flex items-center gap-2 mt-1.5 border-solid border-2 border-gray-200 rounded-xl px-3 py-1">
              <input
                id="accentColor"
                type="color"
                value={accentColor}
                {...register("accentColor")}
              />
              <label htmlFor="accentColor" className="text-sm cursor-pointer">
                {accentColor}
              </label>
            </div>
          </div>
        </Tab>
      </Tabs>
    </aside>
  );
};

export default FormBuilderSidebarRight;
