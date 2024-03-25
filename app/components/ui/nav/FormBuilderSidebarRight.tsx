"use client";
import { Tabs, Tab, Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import Loading from "@/app/loading";
import { Iform } from "@/types/Form";
import { inputConfig } from "./FormBuilderSidebar";
import { useEffect } from "react";
interface Props {
  currentForm: Iform;
  loading: boolean;
}

const FormBuilderSidebarRight = ({ currentForm, loading }: Props) => {
  const { register, setValue, watch } = useFormContext();

  // getDoc(docRef).then((snapshot) => {
  //   let formSnap = snapshot.data()?.forms.find((form: IForm) => form.id === id);
  //   setFormTitle(formSnap.title);
  // });

  // const [value, loading, error] = useDocument(
  //   auth.currentUser && doc(db, "users", auth.currentUser.uid)
  // );

  const title = currentForm?.title && watch("title", currentForm?.title);
  const accentColor =
    currentForm?.accentColor && watch("accentColor", currentForm?.accentColor);

  useEffect(() => {
    setValue("title", currentForm?.welcomeTitle);
  }, [loading]);

  return (
    <aside className="p-4 row-start-2 row-span-3 border-l border-gray-300">
      {loading ? (
        <Loading />
      ) : (
        <>
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
                  <label
                    htmlFor="accentColor"
                    className="text-sm cursor-pointer"
                  >
                    {accentColor}
                  </label>
                </div>
              </div>
            </Tab>
          </Tabs>
        </>
      )}
    </aside>
  );
};

export default FormBuilderSidebarRight;
