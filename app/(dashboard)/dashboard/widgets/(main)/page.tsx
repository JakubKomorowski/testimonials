"use client";

import WidgetGroup from "@/app/components/molecules/Widgets/WidgetGroup";
import { useProjectStore } from "@/store/store";

const Widgets = () => {
  const project = useProjectStore((state) => state.project);
  return <WidgetGroup project={project} preview />;
};

export default Widgets;
