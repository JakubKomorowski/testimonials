export const ROUTES = {
  home: "/",
  features: "/features",
  dashboard: "/dashboard",
  pricing: "/pricing",
  blog: "/blog",
  signin: "/auth/signin",
  signup: "/auth/signin",
  verifyRequest: "/auth/verify-request",
  privacyPolicy: "/privacy-policy",
  termsAndConditions: "/terms-and-conditions",
  contact: "/contact",
};

export const FOOTER_MENU_LIST = [
  { text: "Privacy policy", href: ROUTES.privacyPolicy },
  { text: "Terms & Conditions", href: ROUTES.termsAndConditions },
  { text: "Contact", href: ROUTES.contact },
];

export const MENU_LIST = [
  { text: "Pricing", href: "/pricing" },
  { text: "Blog", href: "/blog" },
];
