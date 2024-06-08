import { db } from "@/app/firebase";
import { collection } from "firebase/firestore";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Card, CardHeader, CardBody, Image, Tooltip } from "@nextui-org/react";
import { DocumentData } from "firebase-admin/firestore";
import Link from "next/link";
import { ROUTES } from "@/routes";

type Props = { project: string };

const WidgetGroup = ({ project }: Props) => {
  const [value, loading, error] = useCollectionData(
    collection(db, "projects", project, "widgets")
  );
  return (
    <section className="p-6 rounded-large w-full">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Widgets</h2>
        <div className="flex gap-2 items-center h-fit cursor-pointer">
          <Tooltip content="See all" color="foreground">
            <Link
              href={ROUTES.widgets}
              className="flex gap-2 items-center h-fit cursor-pointer"
            >
              <Image
                src={`/Icons/link.svg`}
                alt="link-icon"
                width={30}
                height={30}
                className="h-7 w-7 object-contain "
              />
            </Link>
          </Tooltip>
          <Tooltip content="Add widget" color="foreground">
            <Link href={ROUTES.addWidget}>
              <Image
                src={`/Icons/plus.svg`}
                alt="plus-icon"
                width={30}
                height={30}
                className="h-7 w-7 object-contain "
              />
            </Link>
          </Tooltip>
        </div>
      </div>
      <div className="grid grid-cols-fluidLarge gap-4 ">
        {value?.map((widget) => {
          return (
            <div
              className="py-4 bg-container3 rounded-large px-4"
              key={widget.id}
            >
              <div className="pb-0 pt-2 flex-col items-start">
                <div className="flex justify-between">
                  <h4 className="font-bold text-large">
                    {widget.name || "Widget name"}
                  </h4>
                  <Tooltip content="Edit" color="foreground">
                    <div className="cursor-pointer w-fit">
                      <Link href={`${ROUTES.widgets}/${widget.id}`}>
                        <Image
                          src={`/Icons/edit.svg`}
                          alt="form-icon"
                          width={30}
                          height={30}
                          className="h-6 w-6 object-contain "
                        />
                      </Link>
                    </div>
                  </Tooltip>
                </div>

                <small className="text-default-500">12 Tracks</small>
              </div>
              <div className="overflow-visible py-2 justify-center">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl w-full"
                  src={`/${widget.card}.png`}
                />
              </div>
            </div>
          );
        })}{" "}
      </div>
    </section>
  );
};

export default WidgetGroup;
