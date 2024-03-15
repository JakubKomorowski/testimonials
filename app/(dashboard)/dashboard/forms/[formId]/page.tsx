"use client";
import FormBuilderSidebar from "@/app/components/ui/nav/FormBuilderSidebar";
import FormBuilderSidebarRight from "@/app/components/ui/nav/FormBuilderSidebarRight";
import FormBuilderTopbar from "@/app/components/ui/nav/FormBuilderTopbar";
import { Tab, Tabs } from "@nextui-org/react";
import { updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useSession } from "next-auth/react";
import { useDocument } from "react-firebase-hooks/firestore";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  FieldValues,
} from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Key, useState } from "react";

interface Props {
  params: { formId: string };
}

export interface IForm {
  id: string;
  title: string;
  questions: string[];
  createdAt: string;
}

const FormBuilder = ({ params }: Props) => {
  const { data: session } = useSession();
  const methods = useForm();
  const docRef = doc(db, "users", session?.user.id);
  const [tabName, setTabName] = useState<Key | string>("Welcome page");

  const [value, loading, error] = useDocument(
    doc(db, "users", session?.user.id)
  );

  const userForms = value?.data()?.forms;
  const currentForm = userForms?.find(
    (form: IForm) => form.id === params.formId
  );

  const { toast } = useToast();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const editedForms = await userForms?.map((form: IForm) => {
      if (form.id === params.formId) {
        return {
          ...form,
          title: data?.formName,
        };
      }
      return form;
    });

    if (data.formName && editedForms) {
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

    methods.reset();
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="h-screen grid grid-cols-[300px,1fr,1fr,1fr,250px] grid-rows-[60px,1fr,1fr,1fr]"
        >
          <FormBuilderSidebar
            currentForm={currentForm}
            tabName={tabName as string}
          />
          <FormBuilderSidebarRight currentForm={currentForm} />
          <FormBuilderTopbar />
          <div className="col-span-3 col-start-2 row-start-2 flex justify-center">
            <div className="mt-2">
              <Tabs
                className=""
                variant="underlined"
                aria-label="Tabs variants"
                selectedKey={tabName as string}
                onSelectionChange={setTabName}
              >
                <Tab key="Welcome page" title="Welcome page">
                  <div className="rounded-[30px]  w-[420px] h-[500px] mx-auto shadow-[0px_4px_50px_0px_#00000025] mt-28 flex justify-center">
                    <div className="rounded-full bg-slate-400 w-24 h-24 mt-[-48px]"></div>
                  </div>
                </Tab>
                <Tab key="Response page" title="Response page">
                  <button onClick={() => setTabName("Response page")}>
                    click
                  </button>
                </Tab>
                <Tab
                  key="Customer details page"
                  title="Customer details page"
                ></Tab>
                <Tab key="Thank you page" title="Thank you page"></Tab>
              </Tabs>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default FormBuilder;
