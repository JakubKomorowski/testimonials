import { nanoid } from "nanoid";
export const formData = (id: string) => ({
  userId: id,
  id: "",
  title: "Title",
  logo: {
    name: "",
    size: 0,
    type: "",
    lastModified: 0,
    preview: "",
    path: "",
    downloadUrl: "",
  },
  accentColor: "#D2DE32",
  collectVideo: true,
  collectText: true,
  rating: {
    enabled: true,
    required: true,
  },
  welcomeTitle: "Your opinion matters!",
  welcomeMessage:
    "Hey there! 👋 We hope you're loving our [product/service] as much as we loved creating it for you. If you've got a moment, we'd be thrilled to hear your thoughts.",
  responseTitle: "We'd love to hear from you",
  responseQuestions: [
    {
      question: "how do you?",
      id: nanoid(6),
    },
    {
      question: "what do you?",
      id: nanoid(6),
    },
  ],
  customerTitle: "Almost finished",
  customerDetails: [
    {
      id: "email",
      name: "Email address",
      placeholder: "johnsmith@email.com",
      enabled: true,
      required: false,
    },
    {
      id: "photo",
      name: "Photo",
      placeholder: "Your photo",
      enabled: true,
      required: true,
    },
    {
      id: "website",
      name: "Your website",
      placeholder: "https://www.example.com",
      enabled: true,
      required: false,
    },
    {
      id: "socialLink",
      name: "Social link",
      placeholder: "instagram.com/john_smith",
      enabled: true,
      required: false,
    },
  ],
  thankYouTitle: "Thank you",
  thankYouText:
    "Thank you for your trust in us and for taking the time to help us improve and grow.",
  createdAt: new Date(),
});
