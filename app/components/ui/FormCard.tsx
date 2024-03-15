"use client";
import { db } from "@/app/firebase";
import { ROUTES } from "@/routes";
import { doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { toast } from "sonner";
import { Tooltip, Button } from "@nextui-org/react";

interface Props {
  firstTwo?: boolean;
}

interface IForm {
  id: string;
  title: string;
  questions: string[];
  createdAt: any;
}

const options = {
  year: "numeric",
  month: "short",
  day: "numeric",
} as const;

const FormCard = ({ firstTwo }: Props) => {
  const { data: session } = useSession();
  const [user, loading, error] = useDocument(
    doc(db, "users", session?.user.id)
  );
  const forms = user?.data()?.forms;
  const slicedForms = forms
    ?.sort(function (a: IForm, b: IForm) {
      return b.createdAt.seconds - a.createdAt.seconds;
    })
    .slice(0, 2);
  const copyToClipBoard = (copyMe: string) => {
    try {
      navigator.clipboard.writeText(copyMe);
      toast("Copied!");
    } catch (err) {
      toast("Failed to copy!");
    }
  };
  const formmatedForms = firstTwo ? slicedForms : forms;
  return (
    <section className="bg-muted  p-6 rounded-lg w-full ">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Forms</h2>
        <div className="flex gap-2 items-center h-fit cursor-pointer">
          <p>see all </p>
          <Image
            src={`/Icons/link.svg`}
            alt="form-icon"
            width={30}
            height={30}
            className="h-7 w-7 object-contain "
          />
        </div>
      </div>
      <div className="flex gap-6 flex-col 2xl:flex-row flex-wrap ">
        {formmatedForms?.map((el: IForm) => {
          const time = new Date(el.createdAt.seconds * 1000).toLocaleString(
            "en-US",
            options
          );
          return (
            <div
              key={el.id}
              className="px-3 pt-3 pb-5  rounded-lg bg-container2 flex-1 min-w-[400px]"
            >
              <div className=" flex-1 flex">
                <Image
                  src={`/Icons/form.svg`}
                  alt="form-icon"
                  width={30}
                  height={30}
                  className="h-8 w-8 object-contain "
                />
                <div className="mt-1 pl-2 ">
                  <h3 className="text-xl font-bold">{el.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">Created: {time}</p>
                  <p className="mb-4">Responses: 1</p>
                </div>
                <div className="flex gap-2 h-fit ml-auto">
                  <Tooltip content="Edit" color="foreground">
                    <div className="cursor-pointer flex-1 shrink-0">
                      <Link href={`${ROUTES.forms}/${el.id}`}>
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
                    <div className="cursor-pointer flex-1 shrink-0">
                      <Image
                        src={`/Icons/trash.svg`}
                        alt="form-icon"
                        width={30}
                        height={30}
                        className="h-6 w-6 object-contain "
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>
              <Tooltip content="Copy" placement="top-end" color="foreground">
                <div
                  onClick={() =>
                    copyToClipBoard(
                      `https://www.trustcatcher.com${ROUTES.form}/${el.id}`
                    )
                  }
                  className="p-2 px-4 rounded-lg bg-container3 text-sm flex gap-4 items-center cursor-pointer ml-9 w-fit"
                >
                  {`trustcatcher.com${ROUTES.form}/${el.id}`}
                  <Image
                    src={`/Icons/copy.svg`}
                    alt="form-icon"
                    width={30}
                    height={30}
                    className="h-5 w-5 object-contain "
                  />
                </div>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FormCard;
