"use client";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

const ExampleDashboardComp = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [users, loading, error] = useCollection(query(collection(db, "users")));
  const { data: session } = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loadingState, setLoadingState] = useState(false);
  const subscription = useSubscriptionStore((state) => state.subscription);
  if (auth.currentUser && auth.currentUser.emailVerified) {
    const docRef = doc(db, "users", auth.currentUser.uid);
    getDoc(docRef).then((snapshot) => {
      console.log(snapshot);
    });
  }

  useEffect(() => {
    setModalOpen(false);
    if (!auth.currentUser?.emailVerified) {
      setModalOpen(true);
    }
  }, [auth.currentUser?.emailVerified]);

  console.log(auth.currentUser);

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
      {loading ? (
        <div className=" w-full flex justify-center h-[calc(100vh-80px)]">
          <Spinner color="primary" />
        </div>
      ) : (
        <div>
          {auth.currentUser?.emailVerified ? (
            <>
              <button
                onClick={() => {
                  createCheckoutSession();
                }}
              >
                {loadingState ? "loading" : "checkout"}
              </button>

              <ManageAccountButton />
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
