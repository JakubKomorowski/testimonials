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
    <div className="grid grid-cols-fluid gap-4 p-8">
      {value?.map((widget) => {
        return (
          <Card className="py-4" isPressable key={widget.id}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">My widget</h4>
              <small className="text-default-500">12 Tracks</small>
              <Tooltip content="Edit" color="foreground">
                <div className="cursor-pointer flex-1 shrink-0">
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
            </CardHeader>
            <CardBody className="overflow-visible py-2 justify-center">
              <Image
                alt="Card background"
                className="object-cover rounded-xl w-full"
                src={`/${widget.card}.png`}
              />
            </CardBody>
          </Card>
        );
      })}{" "}
    </div>
  );
};

export default WidgetGroup;
