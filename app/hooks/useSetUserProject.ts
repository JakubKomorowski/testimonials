import { db } from "@/app/firebase";
import { useProjectStore } from "@/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { addDoc, collection, updateDoc } from "firebase/firestore";

export default function useSetUserProject() {
  const project = useProjectStore((state) => state.project);
  const setProject = useProjectStore((state) => state.setProject);
  const { data: session } = useSession();
  const [projects, loadingState, errorState] = useCollectionData(
    collection(db, "projects")
  );
  const projectRef = collection(db, "projects");
  const userProjects = projects?.filter((el) => el.userId === session?.user.id);

  useEffect(() => {
    const isProjectInStorage = userProjects?.find(
      (el) => el.id === localStorage.getItem("projectId")
    );
    if (userProjects?.length === 0) {
      const addFirsProject = async () => {
        const doc = await addDoc(projectRef, {
          userId: session?.user.id,
          name: "My First Project",
        });
        updateDoc(doc, {
          id: doc.id,
        });
        setProject(doc.id);
        localStorage.setItem("projectId", doc.id);
      };
      addFirsProject();
    }
    setProject(
      isProjectInStorage
        ? localStorage.getItem("projectId")
        : userProjects?.[0].id
    );
  }, [userProjects?.[0]?.id, loadingState]);

  return [project];
}
