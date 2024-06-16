import { db } from "@/app/firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  Tooltip,
  Spinner,
} from "@nextui-org/react";
import { DocumentData } from "firebase-admin/firestore";
import Link from "next/link";
import { ROUTES } from "@/routes";
import Loading from "../../atoms/Loading";

type Props = { project?: string | null; preview?: boolean };

const WidgetGroup = ({ project, preview }: Props) => {
  const [value, loading, error] = useCollectionData(
    project ? collection(db, "projects", project, "widgets") : null
  );

  const handleDeleteWidget = async (id: string) => {
    if (!project) return;
    const docRef = doc(db, "projects", project, "widgets", id);
    await deleteDoc(docRef);
  };

  console.log(loading);
  return (
    <section className="p-6 rounded-large w-full">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Widgets</h2>

        <div className="flex gap-2 items-center h-fit cursor-pointer">
          {!preview && (
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
          )}

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
      {!loading ? (
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
                    <div className="flex items-center gap-2">
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
                      <Tooltip content="Delete" color="foreground">
                        <button
                          onClick={() => handleDeleteWidget(widget.id)}
                          className="cursor-pointer flex-1 shrink-0"
                        >
                          <Image
                            src={`/Icons/trash.svg`}
                            alt="form-icon"
                            width={30}
                            height={30}
                            className="h-6 w-6 object-contain "
                          />
                        </button>
                      </Tooltip>
                    </div>
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
          })}
        </div>
      ) : (
        <div className="w-full flex justify-center h-[calc(100vh-180px)]">
          <Spinner color="primary" />
        </div>
      )}
    </section>
  );
};

export default WidgetGroup;
