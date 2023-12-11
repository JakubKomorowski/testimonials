"use client";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as NProgress from "nprogress";
import { useSession } from "next-auth/react";
import { useSubscriptionStore } from "@/store/store";
import ManageAccountButton from "./ManageAccountButton";
import { auth } from "../firebase";
import { doc, getDoc, getDocs } from "firebase/firestore";

const ExampleDashboardComp = () => {
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

  // useEffect(() => {
  //   NProgress.done();
  // }, [pathname, searchParams]);

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
  // console.log(auth.currentUser);
  return (
    <div>
      <button
        onClick={() => {
          createCheckoutSession();
        }}
      >
        {loadingState ? "loading" : "checkout"}
      </button>

      <ManageAccountButton />
    </div>
  );
};

export default ExampleDashboardComp;
