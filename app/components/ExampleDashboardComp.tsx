"use client";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useSubscriptionStore } from "@/store/store";
import ManageAccountButton from "./ManageAccountButton";
import { auth } from "../firebase";
import { doc, getDoc, getDocs } from "firebase/firestore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Spinner } from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";

const ExampleDashboardComp = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loadingState, setLoadingState] = useState(false);
  const subscription = useSubscriptionStore((state) => state.subscription);
  const docRef = doc(db, "users", session?.user.id);

  const formRef = doc(db, "forms", "iZxoSu3v3hO09IfNlrMe");

  // getDoc(docRef).then((snapshot) => {
  //   console.log(snapshot.data());
  // });

  const [formIds] = useDocument(doc(db, "forms", "iZxoSu3v3hO09IfNlrMe"));

  const [value, loading, error] = useDocument(
    auth.currentUser && doc(db, "users", auth.currentUser.uid)
  );

  const userForms = value?.data()?.forms;
  const globalFormIds = formIds?.data()?.ids;

  const handleAddFormId = (id: string) => {
    setDoc(
      docRef,
      {
        forms: [
          ...(userForms || ""),
          {
            id: id,
            title: "Title",
            logo: "",
            accentColor: "#D2DE32",
            collectVideo: true,
            collectText: true,
            collectRating: true,
            welcomeTitle: "Your opinion matters!",
            welcomeMessage:
              "Hey there! 👋 We hope you're loving our [product/service] as much as we loved creating it for you. If you've got a moment, we'd be thrilled to hear your thoughts.",
            responseTitle: "We'd love to hear from you",
            responseQuestions: ["what do you like", "would you recommend"],
            customerTitle: "Almost finished",
            customerDetails: [
              {
                name: "Email address",
                enabled: true,
                required: false,
              },
              {
                name: "Photo",
                enabled: true,
                required: true,
              },
              {
                name: "Your website",
                enabled: true,
                required: false,
              },
              {
                name: "Social link",
                enabled: true,
                required: false,
              },
            ],
            thankYouTitle: "Thank you",
            thankYouText:
              "Thank you for your trust in us and for taking the time to help us improve and grow.",
            createdAt: new Date(),
          },
        ],
      },
      { merge: true }
    );
    setDoc(
      formRef,
      {
        ids: [...(globalFormIds || ""), id],
      },
      { merge: true }
    );
  };

  useEffect(() => {
    setModalOpen(false);
    if (
      !auth.currentUser?.emailVerified ||
      !session?.user?.image?.includes("google")
    ) {
      setModalOpen(true);
    }
  }, [auth.currentUser?.emailVerified]);

  const createCheckoutSession = async () => {
    if (!session?.user.id) return;
    setLoadingState(true);
    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: "price_1OJ2GOCMozraStksHq2ZmoZ8",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
        setLoadingState(false);
      }
      if (url) {
        // We have a Stripe Checkout URL, let's redirect.
        window.location.assign(url);
        setLoadingState(false);
      }
    });
  };
  return (
    <>
      {loading || !auth.currentUser ? (
        <div className=" w-full flex justify-center h-[calc(100vh-80px)]">
          <Spinner color="primary" />
        </div>
      ) : (
        <div>
          {auth.currentUser?.emailVerified ||
          session?.user?.image?.includes("google") ? (
            <>
              <button
                onClick={() => {
                  createCheckoutSession();
                }}
              >
                {loadingState ? "loading" : "checkout"}
              </button>

              <ManageAccountButton />
              <Button onClick={() => handleAddFormId(nanoid(10))}>
                create form
              </Button>
            </>
          ) : (
            <Dialog open={modalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Please verify your email</DialogTitle>
                  <DialogDescription>
                    Your email is not verified.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start"></DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
    </>
  );
};

export default ExampleDashboardComp;
