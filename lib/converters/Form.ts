import { db } from "@/app/firebase";
import { Iform } from "@/types/Form";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  doc,
} from "firebase/firestore";

export const formConverter: FirestoreDataConverter<Iform> = {
  toFirestore: function (form: Iform): DocumentData {
    return {
      ...form,
    };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Iform {
    const data = snapshot.data(options);

    const sub: Iform = {
      id: data.id,
      title: data.title,
      logo: data.logo,
      accentColor: data.accentColor,
      collectVideo: data.collectVideo,
      collectText: data.collectText,
      collectRating: data.collectRating,
      welcomeTitle: data.welcomeTitle,
      welcomeMessage: data.welcomeMessage,
      responseTitle: data.responseTitle,
      responseQuestions: data.responseQuestions,
      customerTitle: data.customerTitle,
      customerDetails: data.customerDetails,
      thankYouTitle: data.thankYouTitle,
      thankYouText: data.thankYouText,
      createdAt: data.createdAt,
    };
    return sub;
  },
};

export const formRef = (userId: string) =>
  collection(db, "users", userId, "forms").withConverter(formConverter);
