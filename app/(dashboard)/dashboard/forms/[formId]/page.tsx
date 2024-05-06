"use client";
import FormBuilder from "@/app/components/organisms/FormBuilder";
import { db } from "@/app/firebase";
import useSetUserProject from "@/app/hooks/useSetUserProject";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
interface Props {
  params: { formId: string };
}

const FormBuilderPage = ({ params }: Props) => {
  const [project] = useSetUserProject();
  const docRef = doc(db, "projects", project as string, "forms", params.formId);
  const [form, formLoading, formError] = useDocumentData(
    doc(db, "projects", project as string, "forms", params?.formId || "")
  );
  return project ? (
    <FormBuilder
      params={params}
      project={project}
      docRef={docRef}
      form={form}
      formLoading={formLoading}
    />
  ) : null;
};

export default FormBuilderPage;
