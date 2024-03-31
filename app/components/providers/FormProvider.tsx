"use client";
import { auth } from "@/app/firebase";
import { formRef } from "@/lib/converters/Form";
import { useFormCreationStore } from "@/store/store";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();
  const setForm = useFormCreationStore((state) => state.setForm);
  useEffect(() => {
    if (!session) return;
    return onSnapshot(
      formRef(session.user.id),
      (snapshot) => {
        if (snapshot.empty) {
          setForm(null);
          return;
        } else {
          setForm(snapshot.docs[0].data());
        }
      },
      (error) => {
        console.log("Error getting document:", error);
      }
    );
  }, [session, setForm, auth]);

  return <>{children}</>;
};

export default FormProvider;
