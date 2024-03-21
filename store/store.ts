import { create } from "zustand";
import { Subscription } from "@/types/Subscription";
import { Iform } from "@/types/Form";

interface SubsctiptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}

interface FormState {
  form: Iform | null | undefined;
  setForm: (form: Iform | null) => void;
}

export const useSubscriptionStore = create<SubsctiptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));

export const useFormCreationStore = create<FormState>((set) => ({
  form: undefined,
  setForm: (form: Iform | null) => set({ form }),
}));
