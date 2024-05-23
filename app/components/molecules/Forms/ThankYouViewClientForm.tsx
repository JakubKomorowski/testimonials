import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  title: string;
  text: string;
  isPreview?: boolean;
};

const ThankYouViewClientForm = ({ text, title, isPreview }: Props) => {
  return (
    <div className="flex  flex-col items-center">
      {title && <p className="mt-8 font-semibold text-xl">{title}</p>}
      {text && <p className="mt-8 ">{text}</p>}
    </div>
  );
};

export default ThankYouViewClientForm;
