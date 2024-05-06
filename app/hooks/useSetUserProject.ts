import { db } from "@/app/firebase";
import { useProjectStore } from "@/store/store";
import { collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function useSetUserProject() {
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

  return [project];
}
