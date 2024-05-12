"use client";
import { Tab, Tabs } from "@nextui-org/tabs";
import {
  DocumentData,
  DocumentReference,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/app/firebase";
import { useSession } from "next-auth/react";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  FieldValues,
} from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Key, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { ROUTES } from "@/routes";
import Loading from "@/app/components/atoms/loading";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import WidgetBuilderSidebarRight from "./WidgetBuilderSidebarRight";
import WidgetBuilderTopbar from "./WidgetBuilderTopbar";
import WidgetBuilderSidebar from "./WidgetBuilderSidebar";
interface Props {
  id: string;
  project: string;
}

const WidgetBuilder = ({ id, project }: Props) => {
  const { data: session } = useSession();
  if (!session || !session.user) {
    redirect(ROUTES.signin);
  }
  const router = useRouter();
  const methods = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {};
  return (
    <FormProvider {...methods}>
      <div className="h-screen grid grid-cols-[300px,1fr,1fr,1fr,250px] grid-rows-[65px,1fr]">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="h-screen col-span-5  grid grid-cols-[300px,1fr,1fr,1fr,250px] grid-rows-[65px,1fr]"
        >
          <WidgetBuilderSidebar />
          <WidgetBuilderSidebarRight />
          <WidgetBuilderTopbar project={project} />
        </form>
        <div className="col-span-3 col-start-2 row-start-2 flex justify-center">
          <div className="mt-2">widget preview</div>
        </div>
      </div>
    </FormProvider>
  );
};

export default WidgetBuilder;
