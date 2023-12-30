"use client";

import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/firebase";
import { Button } from "@/components/ui/button";
import * as yup from "yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

type Inputs = {
  email: string;
};

const AddEmailButton = () => {
  const emailRef = collection(db, "emails");

  const schema = yup
    .object({
      email: yup.string().email().required("Required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const [modalOpen, setModalOpen] = useState(isSubmitSuccessful);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    addDoc(emailRef, { email: data?.email });
  };

  useEffect(() => {
    setModalOpen(isSubmitSuccessful);
  }, [isSubmitSuccessful]);

  return (
    <>
      <div>
        <form
          className=" flex flex-col items-start sm:flex-row sm:items-center gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="">
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Enter your email"
                {...register("email", { required: true })}
                className="block w-full rounded-md focus-visible:outline-none border-0 focus:ring-0 py-2 px-4 text-gray-900  ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <Button type="submit" className="font-medium py-5 px-4 m-0">
            Notify me
          </Button>
        </form>
        <p className="text-sm text-red-600 ">{errors.email?.message}</p>
      </div>
      <Dialog open={modalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thank you for joining the waiting list</DialogTitle>
            <DialogDescription>
              We will notify you when our product is ready.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              onClick={() => {
                setModalOpen(false);
                reset();
              }}
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddEmailButton;
