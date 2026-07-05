import type { Metadata } from "next";
import { Fraunces, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import { getSiteConfig } from "@/lib/microsite-data";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlex = IBM_Plex_Mono({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const siteConfig = getSiteConfig();
const metaTitle = `${siteConfig.shortName} | ${siteConfig.tagline}`;
const metaDescription =
  "Centro Lalín, Agolada y Silleda: institución cultural gallega fundada en 1982 en Buenos Aires.";
// [PENDIENTE: dominio real — hoy se usa NEXT_PUBLIC_SITE_URL o un placeholder hasta contratar]
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://centro-lalin-agolada-silleda.example";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: metaTitle,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: metaDescription,
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    type: "website",
  },
};

// schema.org/Organization (PROJECT_SPEC.md §3, "SEO básico: metatags, sitemap,
// datos estructurados de organización") — solo campos con datos reales ya
// cargados en content/site.config.ts, sin inventar dirección estructurada
// (calle/ciudad/CP) que no existe como tal en el contenido.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  description: siteConfig.description,
  url: baseUrl,
  logo: new URL(siteConfig.logo, baseUrl).toString(),
  email: siteConfig.email,
  telephone: siteConfig.whatsapp,
  address: siteConfig.address,
  ...(siteConfig.foundingYear ? { foundingDate: String(siteConfig.foundingYear) } : {}),
  sameAs: siteConfig.socials
    .filter((social) => !social.href.startsWith("[PENDIENTE"))
    .map((social) => social.href),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${workSans.variable} ${ibmPlex.variable} scroll-smooth`}
    >
      <body className="lalin-theme min-h-screen bg-paper-2 text-ink antialiased" suppressHydrationWarning>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <div className="max-w-container mx-auto min-h-screen flex flex-col bg-paper">
          {children}
        </div>
        <WhatsAppButton />
      </body>
    </html>
  );
}
