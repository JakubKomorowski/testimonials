"use client";
import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  FieldValues,
} from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import WidgetBuilderSidebarRight from "./WidgetBuilderSidebarRight";
import WidgetBuilderTopbar from "./WidgetBuilderTopbar";
import WidgetBuilderSidebar from "./WidgetBuilderSidebar";
import { Testimonial } from "@/types/Testimonial";
import { Spinner } from "@nextui-org/react";
import { Widget } from "@/types/Widget";
import ClientWidget from "./ClientWidget";
import { useDocumentData } from "react-firebase-hooks/firestore";
interface Props {
  id?: string;
  project: string;
  docRef?: DocumentReference<DocumentData, DocumentData>;
  widget?: DocumentData | Widget;
  widgetLoading?: boolean;
}

const WidgetBuilder = ({
  id,
  project,
  widget,
  widgetLoading,
  docRef,
}: Props) => {
  const router = useRouter();
  const currentId = useSearchParams().get("id");
  const methods = useForm();
  const selectedTestimonials = methods.watch(
    "testimonials",
    []
  ) as Testimonial[];
  const card = methods.watch("card", "classic");
  const widgetRef = collection(db, "projects", project, "widgets");
  const { toast } = useToast();
  const [widgetUpdating, setWidgetUpdating] = useState(false);

  const currentDocRef =
    project && currentId
      ? doc(db, "projects", project, "widgets", currentId)
      : undefined;

  const [currentWidgetValue, currentWidgetLoading, currentWidgetError] =
    useDocumentData(
      project && currentId
        ? doc(db, "projects", project, "widgets", currentId)
        : null
    );

  useEffect(() => {
    methods.setValue("card", "classic");
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!project) return;
    if (
      !data.testimonials &&
      !currentWidgetValue?.testimonials &&
      !selectedTestimonials
    ) {
      toast({
        title: "You need to add at least one testimonial",
      });
      return;
    }

    const dataToAdd: Widget = {
      card: data.card,
      name: data.name,
      userId: data.testimonials[0].userId,
      createdAt: new Date(),
      testimonials: data.testimonials.map((testimonial: Testimonial) => ({
        createdAt: testimonial.createdAt,
        name: testimonial.name,
        id: testimonial.id,
        photo: testimonial.photo,
        rating: testimonial.rating || 0,
        website: testimonial.website || "",
        testimonial: testimonial.testimonial,
        socialLink: testimonial.socialLink || "",
      })),
    };

    if ((id && docRef) || (currentId && currentDocRef)) {
      try {
        setWidgetUpdating(true);
        await updateDoc(currentDocRef ? currentDocRef : docRef!, {
          ...(widget || currentWidgetValue),
          card: data.card,
          name: data.name,
          createdAt: widget?.createdAt || currentWidgetValue?.createdAt,
          testimonials: data.testimonials.map((testimonial: Testimonial) => ({
            createdAt: testimonial.createdAt,
            name: testimonial.name,
            id: testimonial.id,
            photo: testimonial.photo,
            rating: testimonial.rating || 0,
            website: testimonial.website || "",
            testimonial: testimonial.testimonial,
            socialLink: testimonial.socialLink || "",
          })),
        });
        toast({
          title: "Widget successfully updated",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Something went wrong",
        });
      }
    } else {
      try {
        setWidgetUpdating(true);
        const widgetDoc = await addDoc(widgetRef, { ...dataToAdd });
        await updateDoc(widgetDoc, {
          id: widgetDoc.id,
        });
        router.push(`?id=${widgetDoc.id}`);
        toast({
          title: "Widget successfully created",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Something went wrong",
        });
      }
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
          <WidgetBuilderSidebar
            widgetLoading={widgetLoading || currentWidgetLoading}
            widgetCard={widget?.card || currentWidgetValue?.card}
          />
          <WidgetBuilderSidebarRight
            widgetLoading={widgetLoading || currentWidgetLoading}
            widgetName={widget?.name || currentWidgetValue?.name}
          />
          <WidgetBuilderTopbar
            project={project}
            widgetUpdating={widgetUpdating}
            widgetTestimonials={
              widget?.testimonials || currentWidgetValue?.testimonials
            }
            widgetLoading={widgetLoading}
          />
        </form>
        <div className="col-span-3 col-start-2 row-start-2 flex justify-center mt-16">
          <div className="flex flex-col items-center max-w-full">
            {!selectedTestimonials?.length &&
            !widget?.testimonials &&
            !currentWidgetValue?.testimonials ? (
              widgetLoading ? (
                <Spinner color="primary" />
              ) : (
                <div className="mt-2">Add testimonials to see a widget</div>
              )
            ) : (
              <ClientWidget
                preview
                card={card}
                data={
                  selectedTestimonials.length === 0
                    ? widget?.testimonials || currentWidgetValue?.testimonials
                    : selectedTestimonials
                }
              />
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default WidgetBuilder;
