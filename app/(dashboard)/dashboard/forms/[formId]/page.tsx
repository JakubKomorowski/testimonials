"use client";
import FormBuilder from "@/app/components/organisms/FormBuilder";
import { db } from "@/app/firebase";
import useSetUserProject from "@/app/hooks/useSetUserProject";
import { useProjectStore } from "@/store/store";
import { DocumentData } from "firebase-admin/firestore";
import {
  DocumentReference,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
interface Props {
  params: { formId: string };
}

const FormBuilderPage = ({ params }: Props) => {
  const [project] = useSetUserProject();

  // const project = useProjectStore((state) => state.project);
  // const setProject = useProjectStore((state) => state.setProject);
  // const { data: session } = useSession();
  // const [projects, loadingState, errorState] = useCollectionData(
  //   collection(db, "projects")
  // );
  // const userProjects = projects?.filter((el) => el.userId === session?.user.id);
  const [data, setData] = useState<DocumentData[]>();
  // const [docRef, setDocRef] =
  //   useState<DocumentReference<DocumentData, DocumentData>>();
  const [form, setForm] = useState<DocumentData | undefined>();
  // const [formLoading, setFormLoading] = useState<boolean>();
  const [projectState, setProjectState] = useState<boolean>();

  // useEffect(() => {
  //   setProject(localStorage.getItem("projectId") || userProjects?.[0].id);
  // }, [loadingState]);

  // useEffect(() => {
  //   if (!project) return;
  //   (async () => {
  //     const docRef = doc(
  //       db,
  //       "projects",
  //       project as string,
  //       "forms",
  //       params.formId
  //     );

  //     const formRef = collection(db, "projects", project, "forms");
  //     const form = await getDoc(docRef).then((res) => res.data());
  //     const snap = await getDocs(formRef).then((res) => res.docs);
  //     const newData = snap.map((doc) => {
  //       return doc.data();
  //     });

  //     setForm(form);
  //     // setDocRef(docRef);
  //     setData(newData);
  //   })();
  // }, [project]);

  const [formValue, formLoading, formError] = useDocumentData(
    project ? doc(db, "projects", project, "forms", params?.formId || "") : null
  );

  const docRef = project
    ? doc(db, "projects", project as string, "forms", params.formId)
    : undefined;

  const [value, loading, error] = useCollectionData(
    project ? collection(db, "projects", project as string, "forms") : null
  );
  const formExist = value?.find((el) => el.id === params.formId);
  const forms = value?.map((el) => el.id);
  if (!loading) {
    if (formExist == undefined && forms) {
      notFound();
    }
  }
  console.log({ formExist, project, forms });

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
