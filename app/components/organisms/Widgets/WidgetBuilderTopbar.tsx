import { ROUTES } from "@/routes";
import { Button, Spinner, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "@/app/firebase";
import { DocumentData } from "firebase-admin/firestore";
import { useFormContext } from "react-hook-form";
import TestimonialCard from "../../molecules/Widgets/TestimonialCard";
import { Testimonial } from "@/types/Testimonial";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "@hello-pangea/dnd";

interface Props {
  project: string;
  widgetUpdating: boolean;
  widgetTestimonials?: Testimonial[];
  widgetLoading?: boolean;
}

const WidgetBuilderTopbar = ({
  project,
  widgetUpdating,
  widgetTestimonials,
  widgetLoading,
}: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [choosenTestimonials, setChoosenTestimonials] = useState<Testimonial[]>(
    []
  );
  const [value, loadingState, errorState] = useCollectionData(
    collection(db, "projects", project, "testimonials")
  );
  const { setValue, watch } = useFormContext();
  const selectedTestimonials = watch("testimonials", []);
  const [state, setState] = useState(false);
  const [testimonials, setTestimonials] = useState<DocumentData | undefined>(
    value ? [...value] : []
  );

  const toRemove = new Set(widgetTestimonials?.map((el) => el?.id));
  const difference = value?.filter((x: DocumentData) => !toRemove.has(x.id));

  useEffect(() => {
    setTestimonials(difference);
  }, [value]);

  useEffect(() => {
    onClose();
  }, [state]);

  useEffect(() => {
    setChoosenTestimonials(widgetTestimonials || []);
    setValue("testimonials", widgetTestimonials);
  }, [widgetTestimonials]);

  function onDragEnd(result: DropResult) {
    if (!result.destination) return;
    const { source, destination } = result;
    const startIndex = source.index;
    const endIndex = destination?.index;
    const tempTestimonials = [...(testimonials as Testimonial[])];
    const [removed] = tempTestimonials?.splice(startIndex, 1);
    const choosenTempTestimonials = [...(choosenTestimonials as Testimonial[])];
    const [choosenRemoved] = choosenTempTestimonials?.splice(startIndex, 1);

    if (
      source.droppableId === "testimonials" &&
      destination.droppableId === "choosenTestimonials"
    ) {
      setTestimonials((items: Testimonial[]) => {
        const testimonials = [...items];
        testimonials.splice(startIndex, 1);
        return testimonials;
      });
      setChoosenTestimonials((items: Testimonial[]) => {
        const tempChoosenTestimonials = [...items];
        tempChoosenTestimonials?.splice(endIndex as number, 0, removed);
        return tempChoosenTestimonials;
      });
    }

    if (
      source.droppableId === "choosenTestimonials" &&
      destination.droppableId === "testimonials"
    ) {
      setTestimonials((items: Testimonial[]) => {
        const testimonials = [...items];
        testimonials?.splice(endIndex as number, 0, choosenRemoved);
        return testimonials;
      });
      setChoosenTestimonials((items: Testimonial[]) => {
        const tempChoosenTestimonials = [...items];
        tempChoosenTestimonials.splice(startIndex, 1);
        return tempChoosenTestimonials;
      });
    }

    if (
      source.droppableId === "choosenTestimonials" &&
      destination.droppableId === "choosenTestimonials"
    ) {
      setChoosenTestimonials((items: Testimonial[]) => {
        const testimonials = [...items];
        const [removed] = testimonials.splice(startIndex, 1);
        testimonials.splice(endIndex as number, 0, removed);
        return testimonials;
      });
    }
    if (
      source.droppableId === "testimonials" &&
      destination.droppableId === "testimonials"
    ) {
      setTestimonials((items: Testimonial[]) => {
        const testimonials = [...items];
        const [removed] = testimonials.splice(startIndex, 1);
        testimonials.splice(endIndex as number, 0, removed);
        return testimonials;
      });
    }
  }

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <div className=" px-3 border-gray-300 border-b h-full flex justify-between items-center col-start-2  col-span-4 row-start-1">
        <Tooltip content="Go to widgets" placement="right">
          <Link href={ROUTES.widgets}>
            <Image
              src={`/Icons/arrowLeft.svg`}
              alt="form-icon"
              width={30}
              height={30}
              className="h-5 w-5  mr-2"
            />
          </Link>
        </Tooltip>
        <div className="flex justify-end ">
          <div className="px-1">
            <Button onClick={onOpen} color="primary">
              <Image
                src={`/Icons/plus.svg`}
                alt="form-icon"
                width={30}
                height={30}
                className="h-5 w-5"
              />
              Add testimonials
            </Button>
          </div>
          <div className="px-1">
            <Button
              type="submit"
              disabled={widgetUpdating}
              color="secondary"
              className="text-white"
            >
              {widgetUpdating ? <Spinner color="current" size="sm" /> : "Save"}
            </Button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
        size="5xl"
        onClose={() => {
          setChoosenTestimonials(selectedTestimonials);
        }}
        className="h-[80vh]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <p className="">Add Testimonials</p>
                <p className="text-sm font-normal">
                  Pick the testimonials to show on your widget
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="flex gap-4 ">
                  <div className="p-4 bg-muted flex flex-col rounded-md flex-1">
                    <Droppable droppableId="testimonials" key="testimonials">
                      {(provided) => (
                        <div
                          className=" flex-1 flex flex-col   "
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          <div className="text-xl mb-4">All testimonials</div>
                          {testimonials?.map(
                            (el: Testimonial | DocumentData, i: number) => {
                              return (
                                <Draggable
                                  key={el.id}
                                  draggableId={el.id}
                                  index={i}
                                >
                                  {(provided, snapshot) => (
                                    <TestimonialCard
                                      innerRef={provided.innerRef}
                                      provided={provided}
                                      key={el.id}
                                      el={el as Testimonial}
                                      plus
                                      selectedTestimonials={choosenTestimonials}
                                      setChoosenTestimonials={
                                        setChoosenTestimonials
                                      }
                                      setTestimonials={setTestimonials}
                                      testimonials={testimonials}
                                    />
                                  )}
                                </Draggable>
                              );
                            }
                          )}
                          {provided?.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                  <div className="p-4 bg-muted flex flex-col rounded-md flex-1">
                    <div className="text-xl mb-4">Selected testimonials</div>
                    <Droppable
                      droppableId="choosenTestimonials"
                      key="choosenTestimonials"
                    >
                      {(provided) => (
                        <div
                          className=" flex flex-col flex-1"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {choosenTestimonials?.map((el: Testimonial, i) => {
                            return (
                              <Draggable
                                key={el.id}
                                draggableId={el.id}
                                index={i}
                              >
                                {(provided, snapshot) => (
                                  <TestimonialCard
                                    innerRef={provided.innerRef}
                                    provided={provided}
                                    key={el.id}
                                    el={el}
                                    minus
                                    selectedTestimonials={choosenTestimonials}
                                    setChoosenTestimonials={
                                      setChoosenTestimonials
                                    }
                                    setTestimonials={setTestimonials}
                                    testimonials={testimonials}
                                  />
                                )}
                              </Draggable>
                            );
                          })}
                          {provided?.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    setValue("testimonials", choosenTestimonials);
                    setState(!state);
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </DragDropContext>
  );
};

export default WidgetBuilderTopbar;
