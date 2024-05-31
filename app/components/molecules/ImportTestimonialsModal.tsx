import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { socials } from "@/app/data/socialData";
import { Dispatch, SetStateAction, useState } from "react";
import { inputConfig } from "../organisms/Forms/FormBuilderSidebar";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useProjectStore } from "@/store/store";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useSession } from "next-auth/react";
import { googleReview } from "@/app/actions/googleReview";

type Props = {
  isOpenModal: boolean;
  onOpenChange: () => void;
  selectedSocial: string;
  setSelectedSocial: Dispatch<SetStateAction<string>>;
};

const ImportTestimonialsModal = ({
  isOpenModal,
  onOpenChange,
  selectedSocial,
  setSelectedSocial,
}: Props) => {
  const { register, handleSubmit, reset } = useForm();
  const project = useProjectStore((state) => state.project);
  const [error, setError] = useState(false);
  const { data: session } = useSession();

  // const browserLang = navigator.geolocation.getCurrentPosition((pos) =>
  //   console.log(pos)
  // );
  // console.log(browserLang);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!project) return;
    const testimonialRef = collection(db, "projects", project, "testimonials");
    const newData = data?.[selectedSocial];
    const id = newData.split("/").slice(-1)[0];

    if (selectedSocial === "Twitter") {
      const response = await fetch(`api/twitter?id=${id}`);
      const json = await response.json();
      const { data } = json;
      if (!data) setError(true);
      if (data) {
        setError(false);
        const doc = await addDoc(testimonialRef, {
          testimonial: data.text,
          name: data.user.name,
          email: "",
          source: "twitter",
          photo: { downloadUrl: data.user.profile_image_url_https },
          formId: id,
          userId: session?.user.id,
          createdAt: new Date(),
        });
        updateDoc(doc, {
          id: doc.id,
        });
      }
    }

    if (selectedSocial === "Google") {
      const res = await fetch(
        "https://places.googleapis.com/v1/places:searchText",
        {
          method: "POST",
          body: JSON.stringify({ textQuery: newData }),
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env
              .NEXT_PUBLIC_FIREBASE_API_KEY as string,
            "X-Goog-FieldMask":
              "places.displayName,places.formattedAddress,places.id,places.name,places.photos",
          },
        }
      );
      const data = await res.json();

      const result = await googleReview(data.places[0].id);
      console.log(result);
    }

    reset();
  };

  return (
    <Modal isOpen={isOpenModal} onOpenChange={onOpenChange} size="4xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Import testimonials
            </ModalHeader>
            <ModalBody className="flex flex-row pb-8">
              <div className="flex border-r-1 border-gray-300 pr-4 w-fit">
                <ul>
                  {socials.map((item) => {
                    return (
                      <li key={item.title}>
                        <button
                          onClick={() => setSelectedSocial(item.title)}
                          className="flex gap-4 items-center rounded-2xl px-5 py-3 hover:bg-gray-100 w-fit cursor-pointer mb-2"
                        >
                          {<item.icon />}
                          <p>{item.title}</p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <form
                className="ml-4 flex-1 mr-4"
                onSubmit={handleSubmit(onSubmit)}
                // action={googleReview}
              >
                <p className="text-xl mb-12">Import from {selectedSocial}</p>
                <div className="w-full mb-4">
                  {selectedSocial &&
                    socials
                      .filter((el) => el.title === selectedSocial)
                      .map((item) => (
                        <Input
                          key={item.title}
                          {...inputConfig}
                          placeholder={item.exampleUrl}
                          label={item.label}
                          {...register(selectedSocial)}
                        />
                      ))}
                  {error && (
                    <p className="text-destructive text-sm">
                      {selectedSocial} link is invalid
                    </p>
                  )}
                </div>
                <Button type="submit" color="primary">
                  Add
                </Button>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ImportTestimonialsModal;
