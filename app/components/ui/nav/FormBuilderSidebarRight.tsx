"use client";
import { Tabs, Tab, Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import Loading from "@/app/loading";
import { Iform } from "@/types/Form";
interface Props {
  currentForm: Iform;
  loading: boolean;
}

const FormBuilderSidebarRight = ({ currentForm, loading }: Props) => {
  const { register } = useFormContext();

  // getDoc(docRef).then((snapshot) => {
  //   let formSnap = snapshot.data()?.forms.find((form: IForm) => form.id === id);
  //   setFormTitle(formSnap.title);
  // });

  // const [value, loading, error] = useDocument(
  //   auth.currentUser && doc(db, "users", auth.currentUser.uid)
  // );

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
                  radius="md"
                  type="text"
                  label="Form name"
                  placeholder={currentForm?.title || "Form name"}
                  defaultValue={currentForm?.title || "Form name"}
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("title")}
                />
              </div>
            </Tab>
            <Tab key="design" title="Design">
              dsd
            </Tab>
          </Tabs>
        </>
      )}
    </aside>
  );
};

export default FormBuilderSidebarRight;
