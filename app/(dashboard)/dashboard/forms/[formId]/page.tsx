"use client";
import FormBuilder from "@/app/components/organisms/FormBuilder";
import { db } from "@/app/firebase";
import { useProjectStore } from "@/store/store";
import { collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface Props {
  params: { formId: string };
}

const FormBuilderPage = ({ params }: Props) => {
  const project = useProjectStore((state) => state.project);
  console.log(project);
  const { data: session } = useSession();
  const [projects, loadingState, errorState] = useCollectionData(
    collection(db, "projects")
  );
  const userProjects = projects?.filter((el) => el.userId === session?.user.id);
  const setProject = useProjectStore((state) => state.setProject);

  useEffect(() => {
    setProject(localStorage.getItem("projectId") || userProjects?.[0].id);
  }, [userProjects?.[0]?.id]);

  return project ? <FormBuilder params={params} project={project} /> : null;
};

export default FormBuilderPage;
