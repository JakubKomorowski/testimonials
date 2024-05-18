"use client";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  FieldValues,
} from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import WidgetBuilderSidebarRight from "./WidgetBuilderSidebarRight";
import WidgetBuilderTopbar from "./WidgetBuilderTopbar";
import WidgetBuilderSidebar from "./WidgetBuilderSidebar";
import SpeachBubble from "./SpeachBubble";
import { CarouselComponent } from "./CaruselComponent";
import ClassicComponent from "./ClassicComponent";
import { Testimonial } from "@/types/Testimonial";
interface Props {
  id?: string;
  project: string;
}

const WidgetBuilder = ({ id, project }: Props) => {
  const router = useRouter();
  const methods = useForm();
  const selectedTestimonials = methods.watch("testimonials", []);
  const card = methods.watch("card", "classic");
  const widgetRef = collection(db, "projects", project, "widgets");
  const { toast } = useToast();
  const [widgetUpdating, setWidgetUpdating] = useState(false);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!project) return;
    const dataToAdd = {
      card: data.card,
      userId: data.testimonials[0].userId,
      testimonials: data.testimonials.map((testimonial: Testimonial) => ({
        name: testimonial.name,
        createdAt: testimonial.createdAt,
        testimonialId: testimonial.id,
        photo: testimonial.photo,
        rating: testimonial.rating,
        website: testimonial.website,
        testimonial: testimonial.testimonial,
        socialLink: testimonial.socialLink,
      })),
    };
    try {
      setWidgetUpdating(true);
      const widgetDoc = await addDoc(widgetRef, { ...dataToAdd });
      await updateDoc(widgetDoc, {
        id: widgetDoc.id,
      });
      toast({
        title: "Widget successfully created",
      });
    } catch (error) {
      toast({
        title: "Something went wrong",
      });
    }
    setWidgetUpdating(false);
  };
  return (
    <FormProvider {...methods}>
      <div className="h-screen grid grid-cols-[300px,1fr,1fr,1fr,250px] grid-rows-[65px,1fr]">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="h-screen col-span-5  grid grid-cols-[300px,1fr,1fr,1fr,250px] grid-rows-[65px,1fr]"
        >
          <WidgetBuilderSidebar />
          <WidgetBuilderSidebarRight />
          <WidgetBuilderTopbar
            project={project}
            widgetUpdating={widgetUpdating}
          />
        </form>
        <div className="col-span-3 col-start-2 row-start-2 flex justify-center mt-16">
          <div className="flex flex-col items-center ">
            {selectedTestimonials.length === 0 ? (
              <div className="mt-2">Add testimonials to see a widget</div>
            ) : (
              <>
                {card === "bubble" && (
                  <SpeachBubble data={selectedTestimonials} preview />
                )}
                {card === "slider" && (
                  <div className="px-16">
                    <CarouselComponent data={selectedTestimonials} preview />
                  </div>
                )}
                {card === "classic" && (
                  <div className="px-1">
                    <ClassicComponent data={selectedTestimonials} preview />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default WidgetBuilder;
