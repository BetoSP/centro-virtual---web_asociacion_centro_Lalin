export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface PortalStripContent {
  icon: string;
  text: string;
}

export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  tagline: string;
  logo: string;
  email: string;
  infoEmail: string;
  whatsapp: string;
  address: string;
  foundingYear: number | null;
  socials: SocialLink[];
  portalStrip: PortalStripContent;
}

export interface HeroSlide {
  image: string;
  imageAlt: string;
  captionEyebrow: string;
  caption: string;
}

export interface HeroContent {
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  quickLinks: { label: string; href: string }[];
  slides: HeroSlide[];
}

export interface AboutFeature {
  title: string;
  description: string;
}

export interface AboutContent {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  features: AboutFeature[];
  image: string;
  imageAlt: string;
  imageCaption: string;
}

export type ActivityType = 'danza' | 'gaita' | 'idioma' | 'gastronomia' | 'charla' | 'otro';
export type ActivityKind = 'actividad' | 'evento';

export interface ActivityPreview {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  date: string;
  dateLabel?: string;
  href: string;
  type: ActivityType;
  kind?: ActivityKind;
}

export interface ActivitiesContent {
  eyebrow: string;
  title: string;
  viewAllLabel: string;
  viewAllHref: string;
  items: ActivityPreview[];
}

export interface ActivitiesPageContent {
  eyebrow: string;
  title: string;
  description: string;
  filterAllLabel: string;
  typeLabels: Record<ActivityType, string>;
  items: ActivityPreview[];
}

export interface NewsPreview {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
  img?: string;
}

export interface NewsContent {
  eyebrow: string;
  title: string;
  description: string;
  items: NewsPreview[];
}

export interface NewsPageContent {
  eyebrow: string;
  title: string;
  description: string;
  items: NewsPreview[];
}

export interface HistoryMilestone {
  year: string;
  title: string;
  description: string;
  accent?: boolean;
}

export interface HistoryContent {
  eyebrow: string;
  title: string;
  intro: string;
  milestones: HistoryMilestone[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface GalleryContent {
  eyebrow: string;
  title: string;
  description: string;
  images: GalleryImage[];
}

export interface JoinUsContent {
  eyebrow: string;
  title: string;
  description: string;
  benefits: string[];
  formEyebrow: string;
  formTitle: string;
  formDescription: string;
  emailLabel: string;
  emailPlaceholder: string;
  submitLabel: string;
  submitLoadingLabel: string;
  successMessage: string;
  errorMessage: string;
}

export interface ContactContent {
  eyebrow: string;
  title: string;
  description: string;
  sideTitle: string;
  sideDescription: string;
  emailLabel: string;
  whatsappLabel: string;
  addressLabel: string;
}

export interface ContactPageContent extends ContactContent {
  mapEmbedSrc: string;
  form: {
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitLabel: string;
    submitLoadingLabel: string;
    successMessage: string;
    errorMessage: string;
  };
}

export interface BoardMember {
  role: string;
  name: string;
  term: string;
  gender: 'male' | 'female';
  photo?: string;
  bio?: string;
}

export interface BoardContent {
  eyebrow: string;
  title: string;
  directivaSubtitle: string;
  revisorsTitle: string;
  revisoraSubtitle: string;
  members: BoardMember[];
}

export interface MembershipFormContent {
  eyebrow: string;
  title: string;
  description: string;
  sections: {
    personal: string;
    address: string;
    referrer: string;
  };
  steps: {
    personal: string;
    address: string;
    nationality: string;
    confirmation: string;
  };
  fields: {
    firstName: string;
    lastName: string;
    documentType: string;
    documentNumber: string;
    birthDate: string;
    birthCountry: string;
    birthProvince: string;
    birthConcello: string;
    birthLocality: string;
    galicianOrigin: string;
    spanishRegistration: string;
    maritalStatus: string;
    spouseName: string;
    children: string;
    profession: string;
    street: string;
    streetNumber: string;
    floor: string;
    apartment: string;
    locality: string;
    postalCode: string;
    phone: string;
    mobilePhone: string;
    email: string;
    referrerName: string;
    referrerMemberNumber: string;
    photo: string;
  };
  photoHint: string;
  photoCameraLabel: string;
  photoCaptureLabel: string;
  photoRetakeLabel: string;
  photoRequiredMessage: string;
  photoCameraErrorMessage: string;
  documentTypeOptions: string[];
  maritalStatusOptions: string[];
  galicianOriginOptions: string[];
  declaration: string;
  submitLabel: string;
  submitLoadingLabel: string;
  successMessage: string;
  errorMessage: string;
  confirmEmailSentMessage: string;
  confirmWhatsappLabel: string;
  confirmWhatsappMessageTemplate: string;
}

export interface FeaturedMilestoneContent {
  year: string;
  eyebrow: string;
  title: string;
  paragraph: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface ComarcaNewsItem {
  municipality: string;
  text: string;
}

export interface ComarcaNewsContent {
  eyebrow: string;
  title: string;
  items: ComarcaNewsItem[];
}

export interface BoardTeaserContent {
  eyebrow: string;
  title: string;
  text: string;
  photo: string;
  linkLabel: string;
  linkHref: string;
}

export interface HomeContent {
  hero: HeroContent;
  about: AboutContent;
  featuredMilestone: FeaturedMilestoneContent;
  activities: ActivitiesContent;
  comarcaNews: ComarcaNewsContent;
  news: NewsContent;
  joinUs: JoinUsContent;
  boardTeaser: BoardTeaserContent;
  board: BoardContent;
  contact: ContactContent;
}
