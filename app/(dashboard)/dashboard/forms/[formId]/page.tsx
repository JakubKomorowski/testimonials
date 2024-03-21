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
import { Key, useEffect, useMemo, useState } from "react";
import { ICustomerDetails, IResponseQuestions, Iform } from "@/types/Form";
import { useFormCreationStore } from "@/store/store";

interface Props {
  params: { formId: string };
}

const FormBuilder = ({ params }: Props) => {
  const { data: session } = useSession();
  const methods = useForm();
  const docRef = doc(db, "users", session?.user.id);
  const [tabName, setTabName] = useState<Key | string>("Welcome page");

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) =>
      console.log(value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  // console.log(form);
  // const setForm = useFormCreationStore((state) => state.setForm);

  const [value, loading, error] = useDocument(
    doc(db, "users", session?.user.id)
  );

  const userForms = value?.data()?.forms;
  const currentForm = userForms?.find(
    (form: Iform) => form.id === params.formId
  );

  const { toast } = useToast();

  const onSubmit: SubmitHandler<Iform | FieldValues> = async (data) => {
    console.log(data);
    // const editedForms = await userForms?.map((form: Iform) => {
    //   if (form.id === params.formId) {
    //     return {
    //       ...form,
    //       title: data?.title,
    //       // logo: data?.logo,
    //       // accentColor: data?.accentColor,
    //       welcomeMessage: data?.welcomeMessage,
    //       welcomeTitle: data?.welcomeTitle,
    //       customerDetails: data?.customerDetails,
    //     };
    //   }
    //   return form;
    // });

    // if (editedForms) {
    //   updateDoc(docRef, {
    //     forms: [...editedForms],
    //   });
    //   toast({
    //     title: "Your form name was updated",
    //   });
    //   return;
    // }
    // // toast error
    // toast({
    //   title: "Something went wrong",
    // });

    // methods.reset();
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
            loading={loading}
            // selectedChecks={selectedChecks}
            // questions={questions}
            // setSelectedChecks={setSelectedChecks}
            // setQuestions={setQuestions}
          />
          <FormBuilderSidebarRight
            currentForm={currentForm}
            loading={loading}
          />
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
                <Tab key="Response page" title="Response page"></Tab>
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
