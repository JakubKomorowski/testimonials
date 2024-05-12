import { ROUTES } from "@/routes";
import { Button, Spinner, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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

interface Props {
  project: string;
}

const WidgetBuilderTopbar = ({ project }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [value, loadingState, errorState] = useCollectionData(
    collection(db, "projects", project || "", "testimonials")
  );

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  } as const;

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
                      const time = new Date(
                        el?.createdAt?.seconds * 1000
                      ).toLocaleString("en-US", options);
                      return (
                        <div
                          key={el.id}
                          className="px-3 pt-3 pb-5  rounded-lg bg-container3 flex-1 min-w-[400px]"
                        >
                          <div className="flex">
                            <Image
                              src={`/Icons/avatar.svg`}
                              alt="form-icon"
                              width={30}
                              height={30}
                              className="h-8 w-8 object-contain ml-2"
                            />
                            <div className="mt-1 pl-4 ">
                              <p className="">{el.name}</p>
                              <p className="text-sm text-gray-500 mb-2">
                                Created: {time}
                              </p>
                              <p className="">{el.testimonial}</p>
                            </div>
                            <div className=" ml-auto shrink-0">
                              <Tooltip content="Add" color="foreground">
                                <div className="cursor-pointer">
                                  <Image
                                    src={`/Icons/plus.svg`}
                                    alt="form-icon"
                                    width={30}
                                    height={30}
                                    className="h-6 w-6 "
                                  />
                                </div>
                              </Tooltip>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className=" p-4 bg-muted flex flex-col gap-4 rounded-md flex-1">
                    <div className="text-xl">Selected testimonials</div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={onClose}>
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
