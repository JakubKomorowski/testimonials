"use client";
import FormBuilderSidebar from "@/app/components/organisms/Forms/FormBuilderSidebar";
import FormBuilderSidebarRight from "@/app/components/organisms/Forms/FormBuilderSidebarRight";
import FormBuilderTopbar from "@/app/components/organisms/Forms/FormBuilderTopbar";
import { Tab, Tabs } from "@nextui-org/tabs";
import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/app/firebase";
import { useSession } from "next-auth/react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  FieldValues,
} from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Key, useState } from "react";
import { Iform } from "@/types/Form";
import { redirect, useRouter } from "next/navigation";
import { ROUTES } from "@/routes";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ClientForm from "@/app/components/organisms/Forms/ClientForm";
import { formData } from "@/app/data/formData";
import Loading from "../../atoms/Loading";

interface Props {
  params?: { formId: string };
  project: string;
  docRef?: DocumentReference<DocumentData, DocumentData>;
  form: DocumentData | undefined;
  formLoading?: boolean;
}

const FormBuilder = ({ params, project, form, formLoading, docRef }: Props) => {
  const { data: session } = useSession();
  if (!session || !session.user) {
    redirect(ROUTES.signin);
  }

  const router = useRouter();
  const methods = useForm();
  const allFormFields = methods.watch() as Iform;
  const formRef = collection(db, "projects", project, "forms");
  const [tabName, setTabName] = useState<Key | string>("Welcome page");
  const [formUpdating, setFormUpdating] = useState(false);
  const { toast } = useToast();

  const onSubmit: SubmitHandler<Iform | FieldValues> = async (data) => {
    if (!project) return;

    const projectRef = doc(db, "projects", project);
    const projectValue = await getDoc(projectRef).then((res) => res.data());
    const file = {
      name: data.logo.name,
      size: data.logo.size,
      type: data.logo.type,
      lastModified: data.logo.lastModified,
      preview: data.logo.preview,
      path: data.logo.path,
    };

    if (params?.formId) {
      const isImageChanged = form?.logo.name !== data.logo.name;
      const imageRef = ref(
        storage,
        `forms/${params?.formId}/${data.logo.name}`
      );
      try {
        setFormUpdating(true);
        if (isImageChanged && data.logo.name) {
          setFormUpdating(true);
          await uploadBytes(imageRef, data.logo);
        }
        const url = data.logo.name && (await getDownloadURL(imageRef));
        if (docRef) {
          await updateDoc(docRef, {
            ...form,
            ...data,
            logo: { downloadUrl: data.logo.path ? url : "", ...file },
          });
        }
        toast({
          title: "Form successfully updated",
        });
        router.push(ROUTES.forms);
      } catch (error) {
        toast({
          title: "Something went wrong",
        });
      }
    } else {
      try {
        setFormUpdating(true);
        const formDoc = await addDoc(formRef, {
          ...formData(session?.user.id),
          ...data,
          logo: file,
        });
        const imageRef = ref(storage, `forms/${formDoc.id}/${data.logo.name}`);
        if (data.logo.name) {
          setFormUpdating(true);
          await uploadBytes(imageRef, data.logo);
        }
        const url = data.logo.name && (await getDownloadURL(imageRef));
        await updateDoc(formDoc, {
          logo: { downloadUrl: data.logo.path ? url : "", ...file },
          id: formDoc.id,
        });
        await setDoc(
          projectRef,
          {
            formIds: projectValue?.formIds
              ? [...projectValue?.formIds, formDoc.id]
              : [formDoc.id],
          },
          { merge: true }
        );
        toast({
          title: "Form successfully created",
        });
        router.push(ROUTES.forms);
      } catch (error) {
        toast({
          title: "Something went wrong",
        });
      }
    }

    setFormUpdating(false);
  };

  return (
    <FormProvider {...methods}>
      {formLoading ? (
        <Loading />
      ) : (
        <div className="h-screen grid grid-cols-[300px,1fr,1fr,1fr,250px] grid-rows-[65px,1fr,1fr]">
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="h-screen col-span-5  grid grid-cols-[300px,1fr,1fr,1fr,250px] grid-rows-[65px,1fr,1fr]"
          >
            <FormBuilderSidebar
              currentForm={form as Iform}
              tabName={tabName as string}
              loading={formLoading ? formLoading : false}
            />
            <FormBuilderSidebarRight
              currentForm={form as Iform}
              loading={formLoading ? formLoading : false}
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
                    setTabName={setTabName}
                  />
                </Tab>
                <Tab key="response" title="Response page">
                  <ClientForm
                    allFormFields={allFormFields}
                    view="response"
                    selectedKey={tabName as string}
                    isPreview={true}
                    setTabName={setTabName}
                  />
                </Tab>
                <Tab key="customerDetails" title="Customer details page">
                  <ClientForm
                    allFormFields={allFormFields}
                    view="customerDetails"
                    selectedKey={tabName as string}
                    isPreview={true}
                    setTabName={setTabName}
                  />
                </Tab>
                <Tab key="thankYou" title="Thank you page">
                  <ClientForm
                    allFormFields={allFormFields}
                    view="thankYou"
                    selectedKey={tabName as string}
                    isPreview={true}
                    setTabName={setTabName}
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
