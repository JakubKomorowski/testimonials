"use client";

import WidgetGroup from "@/app/components/molecules/Widgets/WidgetGroup";
import { useProjectStore } from "@/store/store";

const Widgets = () => {
  const project = useProjectStore((state) => state.project);
  return project ? <WidgetGroup project={project} /> : null;
};

export default Widgets;
