import ClientWidget from "@/app/components/organisms/Widgets/ClientWidget";
import { db } from "@/app/firebase";
import { Widget } from "@/types/Widget";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}
export async function generateStaticParams() {
  const projects = await getDocs(collection(db, "projects"));
  const projectMap = await Promise.all(
    projects.docs.map(async (project) => {
      const widgetsData = await getDocs(
        collection(db, "projects", project.id, "widgets")
      );
      return widgetsData;
    })
  );

  const ids = projectMap.map((el) =>
    el.docs.map((project) => ({
      id: project.data()["id"] || "404",
    }))
  );

  return ids.flat();
}

const SingleWidget = async ({ params }: Props) => {
  const projects = await getDocs(collection(db, "projects"));
  const projectIds = await Promise.all(
    projects.docs.map((project) => project.id)
  );
  const docRefs = projectIds.map((el) =>
    doc(db, "projects", el, "widgets", params.id)
  );

  const docSnaps = await Promise.all(
    docRefs.map((el) => getDoc(el).then((res) => res.data()))
  );

  const widget = docSnaps.find((el) => el != undefined) as Widget;
  if (!widget) notFound();

  return (
    <div className="flex justify-center py-10">
      <ClientWidget card={widget.card} data={widget.testimonials} />
    </div>
  );
};

export default SingleWidget;
