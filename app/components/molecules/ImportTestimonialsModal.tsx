import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Card,
  CardBody,
  Spinner,
} from "@nextui-org/react";
import { socials } from "@/app/data/socialData";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { inputConfig } from "../organisms/Forms/FormBuilderSidebar";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useProjectStore } from "@/store/store";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import { useSession } from "next-auth/react";
import { googleReview } from "@/app/actions/googleReview";
import { classNames } from "@/lib/utils";
import * as client from "dataforseo-client";
import TestimonialCard from "./Testimonials/TestimonialCard";
import { Testimonial } from "@/types/Testimonial";
import { twitterReview } from "@/app/actions/twitterReview";

type Props = {
  isOpenModal: boolean;
  onOpenChange: () => void;
  selectedSocial: string;
  setSelectedSocial: Dispatch<SetStateAction<string>>;
  onClose: () => void;
};

const ImportTestimonialsModal = ({
  isOpenModal,
  onOpenChange,
  selectedSocial,
  setSelectedSocial,
  onClose,
}: Props) => {
  const { register, handleSubmit, reset } = useForm();
  const project = useProjectStore((state) => state.project);
  const [error, setError] = useState(false);
  const [googlePlaces, setGooglePlaces] = useState<any[]>([]);
  const [googleSelectedReviews, setGoogleSelectedReviews] = useState<
    Testimonial[]
  >([]);
  const [googlePlaceId, setGooglePlaceId] = useState<string>("");
  const [googlePlaceLoading, setGooglePlaceLoading] = useState<boolean>(false);
  const [googlePlaceError, setGooglePlaceError] = useState<boolean>(false);
  const [browserLang, setBrowserLang] = useState<string | undefined>();
  const [googleReviews, setGoogleReviews] = useState<
    client.BaseBusinessDataSerpElementItem[] | undefined[] | undefined
  >();
  const { data: session } = useSession();

  useEffect(() => {
    setBrowserLang(navigator?.language);
  }, []);

  const handleFindGooglePlaces = async (id: string) => {
    setGooglePlaceLoading(true);
    setGoogleReviews([]);
    const result: client.IBusinessDataGoogleReviewsTaskGetResponseInfo =
      await googleReview(id, browserLang);

    setGooglePlaces([]);
    setGoogleReviews(result?.res.tasks?.[0]?.result?.[0]?.items);
    setGooglePlaceLoading(false);
    setGooglePlaceError(result?.res.tasks_error !== 0 ? true : false);
  };

  const handleAddGoogleTestimonials = async () => {
    if (!project) return;
    const batch = writeBatch(db);
    googleSelectedReviews.forEach((item) => {
      const data = {
        ...item,
        createdAt: new Date(),
        userId: session?.user.id,
      };
      const docRef = doc(collection(db, "projects", project, "testimonials"));
      batch.set(docRef, data);
      batch.update(docRef, {
        id: docRef.id,
      });
    });
    await batch.commit();
    onClose();
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!project) return;
    const testimonialRef = collection(db, "projects", project, "testimonials");
    const inputText = data?.[selectedSocial];
    const id = inputText.split("/").slice(-1)[0];

    if (selectedSocial === "Twitter") {
      const data = await twitterReview(id);
      if (!data) setError(true);
      if (data) {
        setError(false);
        const doc = await addDoc(testimonialRef, {
          testimonial: data?.text,
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
          body: JSON.stringify({ textQuery: inputText }),
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env
              .NEXT_PUBLIC_FIREBASE_API_KEY as string,
            "X-Goog-FieldMask":
              "places.displayName,places.formattedAddress,places.id,places.name,places.userRatingCount",
          },
        }
      );

      const data = await res.json();

      setGooglePlaces(data.places);
    }

    reset();
  };

  return (
    <Modal
      isOpen={isOpenModal}
      onOpenChange={onOpenChange}
      size="4xl"
      scrollBehavior="inside"
    >
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
              >
                <p className="text-xl mb-8">Import from {selectedSocial}</p>
                <div className="w-full mb-8">
                  <div className="flex items-end gap-2">
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
                    {selectedSocial === "Google" && (
                      <Button type="submit" color="primary">
                        Search
                      </Button>
                    )}
                  </div>

                  {error && (
                    <p className="text-destructive text-sm">
                      {selectedSocial} link is invalid
                    </p>
                  )}
                </div>
                {selectedSocial !== "Google" && (
                  <Button type="submit" color="primary">
                    Add
                  </Button>
                )}
                {selectedSocial === "Google" && (
                  <>
                    {googlePlaces.length !== 0 && (
                      <p className="mb-4">Select your business:</p>
                    )}
                    {googlePlaces?.map((place) => (
                      <Card
                        key={place.id}
                        onPress={() => setGooglePlaceId(place.id)}
                        className={classNames(
                          "mb-4",
                          place.id === googlePlaceId
                            ? "border-primary border"
                            : ""
                        )}
                        isPressable
                      >
                        <CardBody className="p-4">
                          <div className="flex justify-between gap-12 ">
                            <p className="text font-semibold flex mb-2">
                              {place?.displayName.text}
                            </p>
                            <p className="text-sm text-gray-700 whitespace-nowrap">
                              {place?.userRatingCount} reviews
                            </p>
                          </div>

                          <p className="text-sm text-gray-700">
                            {place?.formattedAddress}
                          </p>
                        </CardBody>
                      </Card>
                    ))}
                    {googlePlaces.length !== 0 && (
                      <Button
                        type="button"
                        color="primary"
                        onClick={() => handleFindGooglePlaces(googlePlaceId)}
                      >
                        {googlePlaceLoading ? (
                          <Spinner color="current" size="sm" />
                        ) : (
                          "Import testimonials"
                        )}
                      </Button>
                    )}
                    <div className="flex flex-col gap-4 pb-4">
                      {googleReviews && googleReviews?.length !== 0 && (
                        <p className="">Select testimonials to import:</p>
                      )}
                      {googleReviews
                        ? googleReviews?.map((review) => {
                            const el = {
                              testimonial: review?.review_text,
                              name: review?.profile_name,
                              rating: review?.rating.value,
                              id: review?.review_id,
                              photo: { downloadUrl: review?.profile_image_url },
                              date: {
                                seconds: Date.parse(review?.timestamp) / 1000,
                                nanoseconds: 194000000,
                              },
                              source: "google",
                            };
                            return (
                              <TestimonialCard
                                el={el}
                                preview
                                key={review?.review_id}
                                setGoogleSelectedReviews={
                                  setGoogleSelectedReviews
                                }
                                googleSelectedReviews={googleSelectedReviews}
                              />
                            );
                          })
                        : googlePlaceError && (
                            <p>Something went wrong, please try again later</p>
                          )}
                      {googleReviews && googleReviews?.length !== 0 && (
                        <Button
                          type="button"
                          color="primary"
                          onClick={() => handleAddGoogleTestimonials()}
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ImportTestimonialsModal;
