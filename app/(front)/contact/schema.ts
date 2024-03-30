import * as yup from "yup";

export const contactFormSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email().required("Email is required"),
    message: yup.string().required("Message is required"),
  })
  .required();
