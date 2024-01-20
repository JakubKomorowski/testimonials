"use server";
import { Resend } from "resend";
import ContactFormEmail, {
  ContactFormEmailProps,
} from "../emails/contact-form-email";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function sendEmail(data: ContactFormEmailProps) {
  const { name, email, message } = data;
  try {
    const data = await resend.emails.send({
      from: "hello@trustcatcher.com",
      to: "absurdmasakra@gmail.com",
      subject: "Contact form submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      react: ContactFormEmail({ name, email, message }),
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
