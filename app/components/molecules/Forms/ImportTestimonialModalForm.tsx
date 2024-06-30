import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Button, Input, Spinner, Textarea } from "@nextui-org/react";
import { inputConfig } from "../../organisms/Forms/FormBuilderSidebar";
import { DropzoneField } from "../DropzoneField";
import Image from "next/image";
import { Tooltip } from "@nextui-org/tooltip";
import { FileWithPath } from "react-dropzone";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useSetUserProject from "@/app/hooks/useSetUserProject";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db, storage } from "@/app/firebase";
import RatingComponent from "../../atoms/RatingComponent";
import { useToast } from "@/components/ui/use-toast";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSession } from "next-auth/react";

type Props = {};

interface Inputs {
  testimonial: string;
  name: string;
  email?: string;
  website?: string;
  socialLink?: string;
  photo?: FileWithPath | any;
  rating?: number;
  workTitle?: string;
}

const ImportTestimonialModalTestimonial = (props: Props) => {
  const [project] = useSetUserProject();
  const [testimonialUpdating, setTestimonialUpdating] = useState(false);
  const { toast } = useToast();
  const { data: session } = useSession();
  const testimonialFormSchema = yup
    .object({
      testimonial: yup.string().required("Field required"),
      rating: yup.number(),
      name: yup.string().required("Field required"),
      email: yup.string().email(),
      website: yup.string().url(),
      socialLink: yup.string(),
      photo: yup.mixed<File>(),
    })
    .required();

  const methods = useForm<Inputs>({
    resolver: yupResolver(testimonialFormSchema),
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const photoValue = watch("photo");

  const ratingValue = watch("rating", 0);
  const handleRating = (rate: number) => {
    setValue("rating", rate);
  };

  const handleDeletePhoto = () => {
    setValue("photo", {
      path: "",
      preview: "",
      name: "",
      downloadUrl: "",
      size: 0,
      type: "image/jpeg",
      lastModified: 0,
    });
  };

  const data = [
    {
      id: "workTitle" as keyof Inputs,
      name: "Work title",
      placeholder: "Sales Manager",
    },
    {
      id: "email" as keyof Inputs,
      name: "Email address",
      placeholder: "johnsmith@email.com",
    },
    {
      id: "socialLink" as keyof Inputs,
      name: "Social link",
      placeholder: "instagram.com/john_smith",
    },
  ];

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!project) return;

    const testimonialRef = collection(db, "projects", project, "testimonials");
    console.log(data);
    if (data.photo && data.photo.name) {
      const file = {
        name: data.photo.name,
        size: data.photo.size,
        type: data.photo.type,
        lastModified: data.photo.lastModified,
        preview: data.photo.preview,
        path: data.photo.path,
      };
      try {
        setTestimonialUpdating(true);

        const testimonialDoc = await addDoc(testimonialRef, {
          ...data,
          createdAt: new Date(),
          photo: { downloadUrl: "", ...file },
          userId: session?.user.id,
        });

        const imageRef = ref(
          storage,
          `testimonials/${testimonialDoc.id}/${data.photo.name}`
        );
        console.log(imageRef);

        await uploadBytes(imageRef, data.photo);
        const url = await getDownloadURL(imageRef);

        console.log(url);

        await updateDoc(testimonialDoc, {
          photo: { downloadUrl: url, ...file },
          id: testimonialDoc.id,
          source: "Import testimonial form",
        });

        toast({
          title: "Testimonial successfully created",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Something went wrong",
        });
      }
    } else {
      try {
        setTestimonialUpdating(true);
        const testimonialDoc = await addDoc(testimonialRef, {
          ...data,
          createdAt: new Date(),
          source: "Import testimonial form",
        });
        await updateDoc(testimonialDoc, {
          id: testimonialDoc.id,
        });
        toast({
          title: "Testimonial successfully created",
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Something went wrong",
        });
      }
    }

    setTestimonialUpdating(false);

    reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-4 px-8  rounded-xl m-8 mt-0 h-fit pt-6 shadow-[0px_1px_6px_1px_rgba(96,97,112,0.16)]"
      >
        <p className="text-xl mb-2">Text testimonial</p>
        <div className="flex w-full flex-col">
          <Input
            {...inputConfig}
            label="Name"
            type="name"
            autoComplete="name"
            placeholder="John Smith"
            {...register("name", { required: true })}
            fullWidth
          />
          {errors.name && (
            <p className="text-xs text-red-600 pt-1">
              {errors.name.message as string}
            </p>
          )}
        </div>

        <div>
          {photoValue?.preview ? (
            <div>
              <p className="text-sm cursor-default mb-2">Photo</p>
              <Avatar>
                <AvatarImage src={photoValue.preview} alt="Photo image" />
              </Avatar>
              {photoValue?.name && (
                <div className="flex p-2 gap-2">
                  <p className="text-sm truncate">{photoValue.name}</p>

                  <Tooltip content="Delete" color="foreground">
                    <button
                      onClick={handleDeletePhoto}
                      className="focus:outline-none "
                      type="button"
                    >
                      <Image
                        src="/Icons/trash.svg"
                        width={18}
                        height={18}
                        alt="delete"
                        className="cursor-pointer"
                      />
                    </button>
                  </Tooltip>
                </div>
              )}
            </div>
          ) : (
            <DropzoneField name="photo" label="Photo" />
          )}
        </div>

        <div>
          <p className="text-sm cursor-default mb-2">Rating</p>
          <RatingComponent
            rating={ratingValue}
            size={25}
            handleRating={handleRating}
          />
        </div>

        <div className="w-full ">
          <Textarea
            id="testimonial"
            label="Testimonial"
            variant="bordered"
            minRows={6}
            defaultValue=""
            labelPlacement="outside"
            {...register("testimonial", { required: true })}
          />
        </div>

        <div className="flex flex-col w-full gap-4">
          {data.map((item) => (
            <div key={item.id}>
              <Input
                {...inputConfig}
                label={item.name}
                autoComplete={item.id}
                placeholder={item.placeholder}
                {...register(item.id)}
                fullWidth
              />
              {errors[item.id] && (
                <p className="text-xs text-red-600 pt-1">
                  {errors[item.id]!.message as string}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="w-full my-4 pb-4">
          <Button color="primary" type="submit" className="w-full">
            {testimonialUpdating ? (
              <Spinner color="current" size="sm" />
            ) : (
              "Save testimonial"
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ImportTestimonialModalTestimonial;
