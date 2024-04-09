import { create } from "zustand";
import { Subscription } from "@/types/Subscription";
import { Iform } from "@/types/Form";

interface SubsctiptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

interface FormState {
  formView: string;
  setFormView: (formView: string) => void;
}

export const useSubscriptionStore = create<SubsctiptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));

export const useFormViewStore = create<FormState>((set) => ({
  formView: "welcome",
  setFormView: (formView: string) => set({ formView }),
}));
