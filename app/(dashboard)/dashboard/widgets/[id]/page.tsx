"use client";
import WidgetBuilder from "@/app/components/organisms/Widgets/WidgetBuilder";
import { db } from "@/app/firebase";
import useSetUserProject from "@/app/hooks/useSetUserProject";
import { collection, doc } from "firebase/firestore";
import { notFound } from "next/navigation";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";

interface Props {
  params: { id: string };
}

const WidgetBuilderPage = ({ params }: Props) => {
  const [project] = useSetUserProject();
  const [widgetValue, widgetLoading, widgetError] = useDocumentData(
    project ? doc(db, "projects", project, "widgets", params.id) : null
  );

  const docRef = project
    ? doc(db, "projects", project, "widgets", params.id)
    : undefined;

  const [value, loading, error] = useCollectionData(
    project ? collection(db, "projects", project, "widgets") : null
  );
  const widgetExist = value?.find((el) => el.id === params.id);
  const widgets = value?.map((el) => el.id);
  if (!loading) {
    if (widgetExist == undefined && widgets) {
      notFound();
    }
  }

  return project ? (
    <WidgetBuilder
      id={params.id}
      project={project}
      docRef={docRef}
      widget={widgetValue}
      widgetLoading={widgetLoading}
    />
  ) : null;
};

export default WidgetBuilderPage;
