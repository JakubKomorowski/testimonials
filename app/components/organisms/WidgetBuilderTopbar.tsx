import { ROUTES } from "@/routes";
import { Button, Spinner, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
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
import DashboardTestimonialCard from "../atoms/DashboardTestimonialCard";

interface Props {
  project: string;
}

const WidgetBuilderTopbar = ({ project }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [choosenTestimonials, setChoosenTestimonials] = useState<string[]>([]);
  const [value, loadingState, errorState] = useCollectionData(
    collection(db, "projects", project || "", "testimonials")
  );
  const { setValue, watch } = useFormContext();
  const selectedTestimonialsId = watch("testimonials", []);
  const selectedTestimonials = value?.filter((el) => {
    return choosenTestimonials.some((f: string) => {
      return f === el.id;
    });
  });

  return (
    <>
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
            <Button type="submit" color="secondary" className="text-white">
              {false ? <Spinner color="current" size="sm" /> : "Save"}
            </Button>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
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
                <div className="flex gap-4">
                  <div className="p-4 flex-1 bg-muted flex flex-col gap-4 rounded-md">
                    <div className="text-xl  ">All testimonials</div>
                    {value?.map((el: DocumentData) => {
                      return (
                        <DashboardTestimonialCard
                          key={el.id}
                          el={el}
                          plus
                          selectedTestimonialsId={choosenTestimonials}
                          setChoosenTestimonials={setChoosenTestimonials}
                        />
                      );
                    })}
                  </div>
                  <div className=" p-4 bg-muted flex flex-col gap-4 rounded-md flex-1">
                    <div className="text-xl">Selected testimonials</div>
                    {selectedTestimonials?.map((el: DocumentData) => {
                      return (
                        <DashboardTestimonialCard
                          key={el.id}
                          el={el}
                          minus
                          selectedTestimonialsId={choosenTestimonials}
                          setChoosenTestimonials={setChoosenTestimonials}
                        />
                      );
                    })}
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => {
                    onClose();
                    setValue("testimonials", choosenTestimonials);
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default WidgetBuilderTopbar;
