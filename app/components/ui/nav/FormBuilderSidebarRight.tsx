"use client";
import { Button } from "@/components/ui/button";
import { Tabs, Tab, Input } from "@nextui-org/react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { setDoc, updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { auth, db } from "@/app/firebase";
import { useSession } from "next-auth/react";
import { useDocument } from "react-firebase-hooks/firestore";

type Inputs = {
  formName: string;
};

interface Props {
  id: string;
}

interface IForm {
  id: string;
  title: string;
  questions: string[];
  createdAt: string;
}

const FormBuilderSidebarRight = ({ id }: Props) => {
  const methods = useForm<Inputs>();
  const { data: session } = useSession();

  const {
    formState: { isSubmitting, errors },
    handleSubmit,
    reset,
    register,
  } = methods;
  const { toast } = useToast();
  const docRef = doc(db, "users", session?.user.id);

  const [value, loading, error] = useDocument(
    auth.currentUser && doc(db, "users", auth.currentUser.uid)
  );

  const userForms = value?.data()?.forms;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const editedForms = await userForms?.map((form: IForm) => {
      if (form.id === id) {
        return {
          ...form,
          title: data?.formName,
        };
      }
      return form;
    });

    if (data) {
      updateDoc(docRef, {
        forms: [...editedForms],
      });
      toast({
        title: "Your form name was updated",
      });
      return;
    }
    // toast error
    toast({
      title: "Something went wrong",
    });
  };
  return (
    <aside className="p-4 row-start-2 row-span-3 border-l border-gray-300">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs className="" radius="sm" aria-label="Options" fullWidth>
          <Tab key="settings" title="Settings">
            <div className="mt-12">
              <Input
                radius="md"
                type="text"
                label="Form name"
                placeholder="Enter form name"
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
        <div className="px-1">
          <Button
            className="w-full rounded-medium bg-buttonDark text-white hover:bg-buttonDarkHover"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </aside>
  );
};

export default FormBuilderSidebarRight;
