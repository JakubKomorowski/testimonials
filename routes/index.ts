export const ROUTES = {
  home: "/",
  features: "/features",
  dashboard: "/dashboard",
  pricing: "/pricing",
  blog: "/blog",
  signin: "/auth/signin",
  signup: "/auth/signup",
  verifyRequest: "/auth/verify-request",
  privacyPolicy: "/privacy-policy",
  termsAndConditions: "/terms-and-conditions",
  contact: "/contact",
  forms: "/dashboard/forms",
  collectingWidgets: "/dashboard/collecting-widgets",
  socialMedia: "/dashboard/social-media",
};

export const FOOTER_MENU_LIST = [
  { text: "Privacy policy", href: ROUTES.privacyPolicy },
  { text: "Terms & Conditions", href: ROUTES.termsAndConditions },
];

export const MENU_LIST = [
  // { text: "Pricing", href: "/pricing" },
  { text: "Contact", href: ROUTES.contact },
  { text: "Blog", href: ROUTES.blog },
];

export const DASHBOARD_OVERVIEW_MENU_LIST = [
  { text: "Overview", href: ROUTES.dashboard, icon: "eye" },
];

export const DASHBOARD_COLLECT_MENU_LIST = [
  { text: "Forms", href: ROUTES.forms, icon: "form" },
  {
    text: "Collecting widgets",
    href: ROUTES.collectingWidgets,
    icon: "collecting-widget",
  },
  { text: "Social media", href: ROUTES.socialMedia, icon: "social-media" },
];
