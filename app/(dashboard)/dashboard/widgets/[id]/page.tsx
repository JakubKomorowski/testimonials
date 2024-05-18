"use client";
import WidgetBuilder from "@/app/components/organisms/WidgetBuilder";
import useSetUserProject from "@/app/hooks/useSetUserProject";

interface Props {
  params: { id: string };
}

const WidgetBuilderPage = ({ params }: Props) => {
  const [project] = useSetUserProject();
  return project ? <WidgetBuilder id={params.id} project={project} /> : null;
};

export default WidgetBuilderPage;
