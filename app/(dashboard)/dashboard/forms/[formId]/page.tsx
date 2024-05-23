"use client";
import FormBuilder from "@/app/components/organisms/Forms/FormBuilder";
import { db } from "@/app/firebase";
import useSetUserProject from "@/app/hooks/useSetUserProject";
import { collection, doc } from "firebase/firestore";
import { notFound } from "next/navigation";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
interface Props {
  params: { formId: string };
}

const FormBuilderPage = ({ params }: Props) => {
  const [project] = useSetUserProject();
  const [formValue, formLoading, formError] = useDocumentData(
    project ? doc(db, "projects", project, "forms", params.formId) : null
  );

  const docRef = project
    ? doc(db, "projects", project, "forms", params.formId)
    : undefined;

  const [value, loading, error] = useCollectionData(
    project ? collection(db, "projects", project, "forms") : null
  );
  const formExist = value?.find((el) => el.id === params.formId);
  const forms = value?.map((el) => el.id);
  if (!loading) {
    if (formExist == undefined && forms) {
      notFound();
    }
  }

  return project ? (
    <FormBuilder
      params={params}
      project={project}
      docRef={docRef}
      form={formValue}
      formLoading={formLoading}
    />
  ) : null;
};

export default FormBuilderPage;
