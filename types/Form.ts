export interface Iform {
  id: string;
  title: string;
  logo: string;
  accentColor: string;
  collectVideo: boolean;
  collectText: boolean;
  collectRating: boolean;
  welcomeTitle: string;
  welcomeMessage: string;
  responseTitle: string;
  responseQuestions: IResponseQuestions[];
  customerTitle: string;
  customerDetails: ICustomerDetails[];
  thankYouTitle: string;
  thankYouText: string;
  createdAt: string;
}

export interface ICustomerDetails {
  name: string;
  enabled: boolean;
  required: boolean;
}

export interface IResponseQuestions {
  question: string;
  id: string;
}