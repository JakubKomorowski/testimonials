"use client";
import { Iform } from "@/types/Form";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import WelcomeViewClientForm from "../../molecules/Forms/WelcomeViewClientForm";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import ResponseViewClientForm from "../../molecules/Forms/ResponseViewClientForm";
import { useFormViewStore } from "@/store/store";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomerDetailsViewClientForm from "../../molecules/Forms/CustomerDetailsViewClientForm";
import { Button as NextButton } from "@nextui-org/button";
import ThankYouViewClientForm from "../../molecules/Forms/ThankYouViewClientForm";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db, storage } from "@/app/firebase";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Loading from "../../atoms/Loading";

interface Props {
  allFormFields: Iform;
  view?: "welcome" | "response" | "customerDetails" | "thankYou";
  selectedKey?: string;
  isPreview?: boolean;
  id?: string;
}

interface FileWithPath extends File {
  readonly path?: string;
  readonly preview?: string;
}
interface Inputs {
  testimonial: string;
  name: string;
  email?: string;
  website?: string;
  socialLink?: string;
  photo?: FileWithPath;
  rating?: number;
}

const ClientForm = ({
  allFormFields,
  view,
  selectedKey,
  isPreview,
  id,
}: Props) => {
  const isEmailRequired = !!allFormFields?.customerDetails?.find(
    (item) => item.name === "Email address" && item.required
  );
  const isWebsiteRequired = !!allFormFields?.customerDetails?.find(
    (item) => item.name === "Your website" && item.required
  );
  const isSocialLinkRequired = !!allFormFields?.customerDetails?.find(
    (item) => item.name === "Social link" && item.required
  );
  const isPhotoRequired = !!allFormFields?.customerDetails?.find(
    (item) => item.name === "Photo" && item.required
  );

  const testimonialFormSchema = yup
    .object({
      testimonial: yup.string().required("Please write a testimonial"),
      rating: allFormFields?.rating?.required
        ? yup.number().required("Field required")
        : yup.number(),
      name: yup.string().required("Field required"),
      email: isEmailRequired
        ? yup.string().email().required("Field required")
        : yup.string().email(),
      website: isWebsiteRequired
        ? yup.string().url().required("Field required")
        : yup.string().url(),
      socialLink: isSocialLinkRequired
        ? yup.string().required("Field required")
        : yup.string(),
      photo: isPhotoRequired
        ? yup
            .mixed<File>()
            .test(
              "required",
              "You need to provide an image",
              (photo?: File) => {
                // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
                if (photo?.name && isPhotoRequired) return true;
                return false;
              }
            )
        : yup.mixed<File>(),
    })
    .required();

  const [formUpdating, setFormUpdating] = useState(false);
  const { data: session } = useSession();
  const [value, loadingState, errorState] = useCollectionData(
    collection(db, "projects")
  );

  const projectId = value?.find((project) =>
    project?.formIds?.includes(id)
  )?.id;

  const methods = useForm<Inputs>({
    resolver: yupResolver(testimonialFormSchema),
    mode: "onChange",
  });
  const setFormView = useFormViewStore((state) => state.setFormView);
  const formView = useFormViewStore((state) => state.formView);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const testimonialRef = collection(
      db,
      "projects",
      projectId,
      "testimonials"
    );

    try {
      setFormUpdating(true);
      if (data.photo && data.photo.name) {
        const file = {
          name: data.photo.name,
          size: data.photo.size,
          type: data.photo.type,
          lastModified: data.photo.lastModified,
          preview: data.photo.preview,
          path: data.photo.path,
        };
        const imageRef = ref(storage, `testimonials/${id}/${data.photo?.name}`);
        await uploadBytes(imageRef, data.photo);
        const url = data.photo.name && (await getDownloadURL(imageRef));
        const doc = await addDoc(testimonialRef, {
          ...data,
          photo: { downloadUrl: data.photo.path ? url : "", ...file },
          formId: id,
          userId: session?.user.id,
          createdAt: new Date(),
        });
        updateDoc(doc, {
          id: doc.id,
        });
      } else {
        const doc = await addDoc(testimonialRef, {
          ...data,
          photo: { downloadUrl: "" },
          formId: id,
          userId: session?.user.id,
          createdAt: new Date(),
          source: "form",
        });
        updateDoc(doc, {
          id: doc.id,
        });
      }
      !isPreview ? setFormView("thankYou") : null;
    } catch (error) {
      console.log(error);
    }
    setFormUpdating(false);
  };

  const views = ["welcome", "response", "customerDetails", "thankYou"];
  const indexOfView = views.indexOf(formView ? formView : views[0]);

  useEffect(() => {
    view && setFormView(view);
  }, [selectedKey]);
  return (
    <>
      {formUpdating ? (
        <Loading />
      ) : (
        <div className="rounded-[30px] px-12 w-[420px] pt-4 pb-12 mx-auto shadow-[0px_4px_50px_0px_#00000025] my-8 flex  flex-col items-center">
          <div className="flex w-full ">
            {formView !== "welcome" && formView !== "thankYou" && (
              <NextButton
                isIconOnly
                color={undefined}
                variant="ghost"
                aria-label="Back"
                size="sm"
                onClick={() =>
                  !isPreview ? setFormView(views[indexOfView - 1]) : null
                }
                type="button"
              >
                <Image
                  src={`/Icons/back.svg`}
                  alt="form-icon"
                  width={20}
                  height={20}
                  className="ml-[-2px] "
                />
              </NextButton>
            )}

            {(allFormFields?.logo?.preview ||
              allFormFields?.logo?.downloadUrl) && (
              <div className="w-full h-8 flex justify-end ">
                <Image
                  src={
                    allFormFields.logo.downloadUrl
                      ? allFormFields.logo.downloadUrl
                      : allFormFields.logo.preview
                  }
                  width={100}
                  height={20}
                  alt="logo"
                  style={{ width: "auto", height: "100%" }}
                />
              </div>
            )}
          </div>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
              {formView === "welcome" && (
                <WelcomeViewClientForm
                  title={allFormFields.welcomeTitle}
                  message={allFormFields.welcomeMessage}
                  isPreview={isPreview}
                />
              )}
              {formView === "response" && (
                <ResponseViewClientForm
                  title={allFormFields.responseTitle}
                  questions={allFormFields.responseQuestions}
                  rating={allFormFields.rating}
                  isPreview={isPreview}
                />
              )}
              {formView === "customerDetails" && (
                <CustomerDetailsViewClientForm
                  title={allFormFields.customerTitle}
                  customerDetails={allFormFields.customerDetails}
                  isPreview={isPreview}
                />
              )}
              {formView === "thankYou" && (
                <ThankYouViewClientForm
                  title={allFormFields.thankYouTitle}
                  text={allFormFields.thankYouText}
                  isPreview={isPreview}
                />
              )}
            </form>
          </FormProvider>
        </div>
      )}
    </>
  );
};

export default ClientForm;
