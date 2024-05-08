"use client";

import WidgetBuilder from "@/app/components/organisms/WidgetBuilder";
import { db } from "@/app/firebase";
import { useProjectStore } from "@/store/store";
import { collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

interface Props {
  params: { id: string };
}

const WidgetBuilderPage = ({ params }: Props) => {
  const project = useProjectStore((state) => state.project);
  const { data: session } = useSession();
  const [projects, loadingState, errorState] = useCollectionData(
    collection(db, "projects")
  );
  const setProject = useProjectStore((state) => state.setProject);
  const userProjects = projects?.filter((el) => el.userId === session?.user.id);

  useEffect(() => {
    setProject(localStorage.getItem("projectId") || userProjects?.[0].id);
  }, [userProjects?.[0]?.id]);

  return project ? <WidgetBuilder id={params.id} project={project} /> : null;
};

export default WidgetBuilderPage;
