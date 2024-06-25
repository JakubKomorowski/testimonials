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
import { Testimonial } from "@/types/Testimonial";
import { twitterReview } from "@/app/actions/twitterReview";
import { trustpilotReview } from "@/app/actions/trustpilotReview";
import { tripadvisorReview } from "@/app/actions/tripadvisorReview";
import { amazonReview } from "@/app/actions/amazonReview";
import ImportedTestimonialsGroup from "../organisms/Testimonials/ImportedTestimonialsGroup";
import { facebookReview } from "@/app/actions/facebookReview";

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
  const [selectedReviews, setSelectedReviews] = useState<Testimonial[]>([]);
  const [googlePlaceId, setGooglePlaceId] = useState<string>("");
  const [reviewLoading, setReviewLoading] = useState<boolean>(false);
  const [browserLang, setBrowserLang] = useState<string | undefined>();
  const [googleReviews, setGoogleReviews] = useState<
    client.IBaseBusinessDataSerpElementItem[] | undefined[] | undefined
  >();
  const [tripadvisorReviews, setTripadvisorReviews] = useState<
    client.IBaseBusinessDataSerpElementItem[] | undefined[] | undefined
  >();
  const [trustpilotReviews, setTrustpilotReviews] = useState<
    client.IBaseBusinessDataSerpElementItem[] | undefined[] | undefined
  >();
  const [amazonReviews, setAmazonReviews] = useState<
    client.IBaseBusinessDataSerpElementItem[] | undefined[] | undefined
  >();
  const [facebookReviews, setFacebookReviews] = useState<
    client.IBaseBusinessDataSerpElementItem[] | undefined[] | undefined
  >();
  const [placeError, setPlaceError] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    setBrowserLang(navigator?.language);
  }, []);
  useEffect(() => {
    setSelectedSocial("");
  }, [onClose]);

  const handleFindGooglePlaces = async (id: string) => {
    setPlaceError(false);
    setReviewLoading(true);
    setGoogleReviews([]);
    const result: client.IBusinessDataGoogleReviewsTaskGetResponseInfo =
      await googleReview(id, browserLang);
    setSelectedReviews([]);
    setGooglePlaces([]);
    setGoogleReviews(result?.res.tasks?.[0]?.result?.[0]?.items);
    setReviewLoading(false);
    setPlaceError(result?.res.tasks_error !== 0 ? true : false);
  };

  const handleAddTestimonials = async () => {
    if (!project) return;
    const batch = writeBatch(db);
    selectedReviews.forEach((item) => {
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
    setGoogleReviews([]);
    setTripadvisorReviews([]);
    setTrustpilotReviews([]);
    setAmazonReviews([]);
    setFacebookReviews([]);
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

    if (selectedSocial === "Trustpilot") {
      setPlaceError(false);
      setReviewLoading(true);
      setTrustpilotReviews([]);
      const result: client.IBusinessDataTrustpilotReviewsTaskGetResponseInfo =
        await trustpilotReview(id);
      setSelectedReviews([]);
      setTrustpilotReviews(result?.res.tasks?.[0]?.result?.[0]?.items);
      setPlaceError(result?.res.tasks_error !== 0 ? true : false);
      setReviewLoading(false);
    }

    if (selectedSocial === "Tripadvisor") {
      setPlaceError(false);
      setReviewLoading(true);
      setTripadvisorReviews([]);
      const result: client.IBusinessDataTripadvisorReviewsTaskGetResponseInfo =
        await tripadvisorReview(id);
      setSelectedReviews([]);
      setTripadvisorReviews(result?.res.tasks?.[0]?.result?.[0]?.items);
      setPlaceError(result?.res.tasks_error !== 0 ? true : false);
      setReviewLoading(false);
    }

    if (selectedSocial === "Amazon") {
      setPlaceError(false);
      setReviewLoading(true);
      setAmazonReviews([]);
      const result = await amazonReview(inputText);
      setSelectedReviews([]);
      setAmazonReviews(result?.res?.data[0]);
      setPlaceError(
        result?.res?.status !== "Success" || result?.res?.error === true
          ? true
          : false
      );
      setReviewLoading(false);
    }

    if (selectedSocial === "Facebook") {
      setPlaceError(false);
      setReviewLoading(true);
      setFacebookReviews([]);
      const result = await facebookReview(inputText);
      console.log(result);
      setSelectedReviews([]);
      setFacebookReviews(result?.res?.data[0]);
      setPlaceError(
        result?.res?.status !== "Success" ||
          result?.res?.error === true ||
          result?.res?.data[0][0].review_id === "__NO_REVIEWS_FOUND__"
          ? true
          : false
      );
      setReviewLoading(false);
    }

    reset();
  };

  const twoStep = selectedSocial !== "Twitter";
  const buttonSpinner =
    selectedSocial !== "Twitter" && selectedSocial !== "Google";

  return (
    <Modal
      isOpen={isOpenModal}
      onOpenChange={onOpenChange}
      size="5xl"
      scrollBehavior="inside"
      className="pb-0"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Import testimonials
            </ModalHeader>
            <ModalBody className="flex flex-row pb-0">
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
                    {twoStep && (
                      <Button type="submit" color="primary">
                        {buttonSpinner && reviewLoading ? (
                          <Spinner color="current" size="sm" />
                        ) : (
                          "Search"
                        )}
                      </Button>
                    )}
                  </div>

                  {error && (
                    <p className="text-destructive text-sm">
                      {selectedSocial} link is invalid
                    </p>
                  )}
                </div>
                {!twoStep && (
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
                        {reviewLoading ? (
                          <Spinner color="current" size="sm" />
                        ) : (
                          "Import testimonials"
                        )}
                      </Button>
                    )}

                    <ImportedTestimonialsGroup
                      reviews={googleReviews}
                      setSelectedReviews={setSelectedReviews}
                      selectedReviews={selectedReviews}
                      placeError={placeError}
                      handleAddTestimonials={handleAddTestimonials}
                      source={selectedSocial}
                    />
                  </>
                )}
                {selectedSocial === "Trustpilot" && (
                  <ImportedTestimonialsGroup
                    reviews={trustpilotReviews}
                    setSelectedReviews={setSelectedReviews}
                    selectedReviews={selectedReviews}
                    placeError={placeError}
                    handleAddTestimonials={handleAddTestimonials}
                    source={selectedSocial}
                  />
                )}
                {selectedSocial === "Tripadvisor" && (
                  <ImportedTestimonialsGroup
                    reviews={tripadvisorReviews}
                    setSelectedReviews={setSelectedReviews}
                    selectedReviews={selectedReviews}
                    placeError={placeError}
                    handleAddTestimonials={handleAddTestimonials}
                    source={selectedSocial}
                  />
                )}
                {selectedSocial === "Amazon" && (
                  <ImportedTestimonialsGroup
                    reviews={amazonReviews}
                    setSelectedReviews={setSelectedReviews}
                    selectedReviews={selectedReviews}
                    placeError={placeError}
                    handleAddTestimonials={handleAddTestimonials}
                    source={selectedSocial}
                  />
                )}
                {selectedSocial === "Facebook" && (
                  <ImportedTestimonialsGroup
                    reviews={facebookReviews}
                    setSelectedReviews={setSelectedReviews}
                    selectedReviews={selectedReviews}
                    placeError={placeError}
                    handleAddTestimonials={handleAddTestimonials}
                    source={selectedSocial}
                  />
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
