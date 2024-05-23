import React from "react";
import SpeachBubble from "../WidgetTemplates/SpeachBubble";
import { CarouselComponent } from "../WidgetTemplates/CaruselComponent";
import ClassicComponent from "../WidgetTemplates/ClassicComponent";
import { Testimonial } from "@/types/Testimonial";

type Props = {
  card: string;
  preview?: boolean;
  data: Testimonial[];
};

const ClientWidget = ({ card, preview, data }: Props) => {
  return (
    <section className="max-w-full">
      {card === "bubble" && <SpeachBubble data={data} preview={preview} />}
      {card === "slider" && (
        <div className="px-16">
          <CarouselComponent data={data} preview={preview} />
        </div>
      )}
      {card === "classic" && (
        <div className="px-1">
          <ClassicComponent data={data} preview={preview} />
        </div>
      )}
    </section>
  );
};

export default ClientWidget;
