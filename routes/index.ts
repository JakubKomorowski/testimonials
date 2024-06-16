export const ROUTES = {
  home: "/",
  features: "/features",
  dashboard: "/dashboard",
  widgets: "/dashboard/widgets",
  pricing: "/pricing",
  blog: "/blog",
  signin: "/auth/signin",
  signup: "/auth/signup",
  verifyRequest: "/auth/verify-request",
  privacyPolicy: "/privacy-policy",
  termsAndConditions: "/terms-and-conditions",
  contact: "/contact",
  form: "/form",
  forms: "/dashboard/forms",
  testimonials: "/dashboard/testimonials",
  collectingWidgets: "/dashboard/collecting-widgets",
  socialMedia: "/dashboard/social-media",
  addForm: "/dashboard/add-form",
  addWidget: "/dashboard/add-widget",
};

export const FOOTER_MENU_LIST = [
  { text: "Privacy policy", href: ROUTES.privacyPolicy },
  { text: "Terms & Conditions", href: ROUTES.termsAndConditions },
];

export const MENU_LIST = [
  { text: "Contact", href: ROUTES.contact },
  { text: "Blog", href: ROUTES.blog },
];

export const MENU_LIST_MOBILE = [
  { text: "Home", href: ROUTES.home },
  { text: "Contact", href: ROUTES.contact },
  { text: "Blog", href: ROUTES.blog },
];

export const DASHBOARD_OVERVIEW_MENU_LIST = [
  { text: "Overview", href: ROUTES.dashboard, icon: "eye" },
  { text: "Your widgets", href: ROUTES.widgets, icon: "widget" },
  { text: "Testimonials", href: ROUTES.testimonials, icon: "chat" },
];

export const DASHBOARD_COLLECT_MENU_LIST = [
  { text: "Forms", href: ROUTES.forms, icon: "form" },
  {
    text: "Collecting widgets",
    href: ROUTES.collectingWidgets,
    icon: "collecting-widget",
  },
  // { text: "Social media", href: ROUTES.socialMedia, icon: "social-media" },
];
