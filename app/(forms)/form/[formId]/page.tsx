import ClientForm from "@/app/components/organisms/Forms/ClientForm";
import { db } from "@/app/firebase";
import { Iform } from "@/types/Form";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { notFound } from "next/navigation";

interface Props {
  params: { formId: string };
}
export async function generateStaticParams() {
  const projects = await getDocs(collection(db, "projects"));
  const projectMap = await Promise.all(
    projects.docs.map(async (project) => {
      const formsData = await getDocs(
        collection(db, "projects", project.id, "forms")
      );
      return formsData;
    })
  );

  const formIds = projectMap.map((el) =>
    el.docs.map((project) => ({
      formId: project.data()["id"] || "404",
    }))
  );

  return formIds.flat();
}

const SingleForm = async ({ params }: Props) => {
  const projects = await getDocs(collection(db, "projects"));
  const projectIds = await Promise.all(
    projects.docs.map((project) => project.id)
  );
  const docRefs = projectIds.map((el) =>
    doc(db, "projects", el, "forms", params.formId)
  );

  const docSnaps = await Promise.all(
    docRefs.map((el) => getDoc(el).then((res) => res.data()))
  );

  const form = docSnaps.find((el) => el != undefined);
  if (!form) notFound();

  const formattedForm = {
    ...form,
    createdAt: form?.nanoseconds,
  };

  return (
    <div className="h-lvh flex items-center">
      <ClientForm allFormFields={formattedForm as Iform} id={params.formId} />
    </div>
  );
};

export default SingleForm;
