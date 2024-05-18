"use client";
import WidgetBuilder from "@/app/components/organisms/WidgetBuilder";
import useSetUserProject from "@/app/hooks/useSetUserProject";
import { ROUTES } from "@/routes";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const AddWidget = () => {
  const { data: session } = useSession();
  if (!session || !session.user) {
    redirect(ROUTES.signin);
  }
  const [project] = useSetUserProject();
  return project ? <WidgetBuilder project={project} /> : null;
};

export default AddWidget;
