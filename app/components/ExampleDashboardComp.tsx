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
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useProjectStore, useSubscriptionStore } from "@/store/store";
import ManageAccountButton from "./atoms/ManageAccountButton";
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
import { formData } from "../data/formData";

const ExampleDashboardComp = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: session } = useSession();
  const [loadingState, setLoadingState] = useState(false);
  const project = useProjectStore((state) => state.project);
  const [value, loading, error] = useDocument(
    doc(db, "users", session?.user.id)
  );

  // const [projectValue, loadingHere, errorHere] = useDocument(
  //   doc(db, "projects", project)
  // );

  const handleAddFormId = async (id: string) => {
    if (!project) return;

    const projectRef = doc(db, "projects", project);
    const projectValue = await getDoc(projectRef).then((res) => res.data());

    const formRef = collection(db, "projects", project, "forms");

    const formDoc = await addDoc(formRef, {
      ...formData(session?.user.id),
    });
    await updateDoc(formDoc, {
      id: formDoc.id,
    });
    await setDoc(
      projectRef,
      {
        formIds: projectValue?.formIds
          ? [...projectValue?.formIds, formDoc.id]
          : [formDoc.id],
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
