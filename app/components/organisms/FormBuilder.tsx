"use client";
import FormBuilderSidebar from "@/app/components/organisms/FormBuilderSidebar";
import FormBuilderSidebarRight from "@/app/components/organisms/FormBuilderSidebarRight";
import FormBuilderTopbar from "@/app/components/organisms/FormBuilderTopbar";
import { Tab, Tabs } from "@nextui-org/tabs";
import { updateDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { db, storage } from "@/app/firebase";
import { useSession } from "next-auth/react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  FieldValues,
} from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Key, useEffect, useState } from "react";
import { Iform } from "@/types/Form";
import { redirect } from "next/navigation";
import { ROUTES } from "@/routes";
import Loading from "@/app/loading";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ClientForm from "@/app/components/organisms/ClientForm";

interface Props {
  params: { formId: string };
  project: string;
}

const FormBuilder = ({ params, project }: Props) => {
  const { data: session } = useSession();
  if (!session || !session.user) {
    redirect(ROUTES.signin);
  }

  const methods = useForm();
  const allFormFields = methods.watch() as Iform;
  const docRef = doc(db, "projects", project, "forms", params.formId);
  const [tabName, setTabName] = useState<Key | string>("Welcome page");
  const [formUpdating, setFormUpdating] = useState(false);
  const [form, formLoading, formError] = useDocumentData(
    doc(db, "projects", project, "forms", params.formId)
  );
  const { toast } = useToast();

  const onSubmit: SubmitHandler<Iform | FieldValues> = async (data) => {
    const file = {
      name: data.logo.name,
      size: data.logo.size,
      type: data.logo.type,
      lastModified: data.logo.lastModified,
      preview: data.logo.preview,
      path: data.logo.path,
    };
    const isImageChanged = form?.logo.name !== data.logo.name;
    const imageRef = ref(storage, `forms/${params.formId}/${data.logo.name}`);

    try {
      setFormUpdating(true);
      if (isImageChanged && data.logo.name) {
        setFormUpdating(true);
        await uploadBytes(imageRef, data.logo);
      }
      const url = data.logo.name && (await getDownloadURL(imageRef));
      await updateDoc(docRef, {
        ...form,
        ...data,
        logo: { downloadUrl: data.logo.path ? url : "", ...file },
      });
      toast({
        title: "Form successfully updated",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
      });
    }
    setFormUpdating(false);
  };

  return (
    <FormProvider {...methods}>
      {formLoading ? (
        <Loading />
      ) : (
        <div className="h-screen grid grid-cols-[300px,1fr,1fr,1fr,250px] grid-rows-[60px,1fr,1fr]">
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="h-screen col-span-5  grid grid-cols-[300px,1fr,1fr,1fr,250px] grid-rows-[60px,1fr,1fr]"
          >
            <FormBuilderSidebar
              currentForm={form as Iform}
              tabName={tabName as string}
              loading={formLoading}
            />
            <FormBuilderSidebarRight
              currentForm={form as Iform}
              loading={formLoading}
            />
            <FormBuilderTopbar loading={formUpdating} />
          </form>

          <div className="col-span-3 col-start-2 row-start-2 flex justify-center">
            <div className="mt-2">
              <Tabs
                className=""
                variant="underlined"
                aria-label="Tabs variants"
                selectedKey={tabName as string}
                onSelectionChange={setTabName}
              >
                <Tab key="welcome" title="Welcome page">
                  <ClientForm
                    allFormFields={allFormFields}
                    view="welcome"
                    selectedKey={tabName as string}
                    isPreview={true}
                  />
                </Tab>
                <Tab key="response" title="Response page">
                  <ClientForm
                    allFormFields={allFormFields}
                    view="response"
                    selectedKey={tabName as string}
                    isPreview={true}
                  />
                </Tab>
                <Tab key="customerDetails" title="Customer details page">
                  <ClientForm
                    allFormFields={allFormFields}
                    view="customerDetails"
                    selectedKey={tabName as string}
                    isPreview={true}
                  />
                </Tab>
                <Tab key="thankYou" title="Thank you page">
                  <ClientForm
                    allFormFields={allFormFields}
                    view="thankYou"
                    selectedKey={tabName as string}
                    isPreview={true}
                  />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </FormProvider>
  );
};

export default FormBuilder;
