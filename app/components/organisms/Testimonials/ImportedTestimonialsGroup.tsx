import * as client from "dataforseo-client";
import { Testimonial } from "@/types/Testimonial";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import TestimonialCard from "../../molecules/Testimonials/TestimonialCard";

interface Props {
  reviews: client.BaseBusinessDataSerpElementItem[] | undefined[] | undefined;
  selectedReviews?: Testimonial[];
  setSelectedReviews?: Dispatch<SetStateAction<Testimonial[]>>;
  placeError?: boolean;
  handleAddTestimonials: () => void;
  source: string;
}

const ImportedTestimonialsGroup = ({
  reviews,
  selectedReviews,
  setSelectedReviews,
  placeError,
  handleAddTestimonials,
  source,
}: Props) => {
  return (
    <div className="flex flex-col gap-4 pb-4">
      {reviews && reviews?.length !== 0 && (
        <p className="">Select testimonials to import:</p>
      )}
      {reviews
        ? reviews?.map((review) => {
            const el = {
              testimonial: review?.review_text,
              name: review?.user_profile?.name,
              rating: review?.rating?.value || "0",
              id: review?.url?.split("/").slice(-1)[0],
              TestimonialId: review?.url?.split("/").slice(-1)[0],
              photo: {
                downloadUrl: review?.user_profile?.image_url,
              },
              date: {
                seconds: Date.parse(review?.timestamp) / 1000,
                nanoseconds: 194000000,
              },
              source: source,
            };
            const amazonReview = {
              testimonial: review?.body,
              name: review?.author_title,
              rating: review?.rating,
              id: review?.id,
              testimonialId: review?.id,
              photo: {
                downloadUrl: review?.author_profile_img?.includes("default")
                  ? ""
                  : review?.author_profile_img,
              },
              date: {
                seconds: review?.review_timestamp,
                nanoseconds: 194000000,
              },
              source: source,
            };
            return (
              <TestimonialCard
                el={source === "Amazon" ? amazonReview : el}
                preview
                key={review?.url}
                setSelectedReviews={setSelectedReviews}
                selectedReviews={selectedReviews}
              />
            );
          })
        : placeError && <p>Something went wrong, please try again later</p>}
      {reviews && reviews?.length !== 0 && (
        <div className="sticky bottom-0 bg-white py-4">
          <Button
            className="w-full"
            type="button"
            color="primary"
            isDisabled={selectedReviews?.length === 0}
            onClick={() => handleAddTestimonials()}
          >
            Import {selectedReviews?.length}{" "}
            {selectedReviews?.length === 1 ? "testimonial" : "testimonials"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImportedTestimonialsGroup;
