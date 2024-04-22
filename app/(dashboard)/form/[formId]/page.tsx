import ClientForm from "@/app/components/organisms/ClientForm";
import { db } from "@/app/firebase";
import { Iform } from "@/types/Form";
import { Textarea } from "@nextui-org/react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { notFound } from "next/navigation";

interface Props {
  params: { formId: string };
}
export async function generateStaticParams() {
  const forms = await getDocs(collection(db, "forms"));
  return forms.docs.map((form) => ({ formId: form.data()["id"] }));
}

const SingleForm = async ({ params }: Props) => {
  const docRef = doc(db, "forms", params.formId);
  const docSnap = await getDoc(docRef);
  const form = docSnap?.data();
  if (!form) notFound();

  const formattedForm = {
    ...form,
    createdAt: form.nanoseconds,
  };

  return (
    <div className="h-lvh flex items-center">
      <ClientForm allFormFields={formattedForm as Iform} id={params.formId} />
    </div>
  );
};

export default SingleForm;
