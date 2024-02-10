"use client";
import { db } from "@/app/firebase";
import { Textarea } from "@nextui-org/react";
import { doc, getDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React from "react";
import { useDocument } from "react-firebase-hooks/firestore";

interface Props {
  params: { formId: string };
}

interface IForm {
  id: string;
  title: string;
  questions: string[];
  createdAt: string;
}

const SingleForm = ({ params }: Props) => {
  const { data: session } = useSession();
  const [user] = useDocument(doc(db, "users", session?.user.id));
  const form = user
    ?.data()
    ?.forms?.find((el: IForm) => el.id === params.formId) as IForm;
  return (
    <div>
      <h2>{form?.title}</h2>
      <Textarea placeholder="Enter your description" className="max-w-xs" />
    </div>
  );
};

export default SingleForm;
