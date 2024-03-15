"use client";
import { Tabs, Tab, Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import { doc } from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import { useSession } from "next-auth/react";
import { useDocument } from "react-firebase-hooks/firestore";
import Loading from "@/app/loading";
import { IForm } from "@/app/(dashboard)/dashboard/forms/[formId]/page";
interface Props {
  currentForm: IForm;
}

const FormBuilderSidebarRight = ({ currentForm }: Props) => {
  const { data: session } = useSession();
  const { register } = useFormContext();

  // getDoc(docRef).then((snapshot) => {
  //   let formSnap = snapshot.data()?.forms.find((form: IForm) => form.id === id);
  //   setFormTitle(formSnap.title);
  // });

  // const [value, loading, error] = useDocument(
  //   auth.currentUser && doc(db, "users", auth.currentUser.uid)
  // );

  const [value, loading, error] = useDocument(
    doc(db, "users", session?.user.id)
  );

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
                  variant="bordered"
                  labelPlacement="outside"
                  {...register("formName")}
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
