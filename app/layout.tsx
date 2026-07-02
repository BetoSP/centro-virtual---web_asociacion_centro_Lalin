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
      <body className="min-h-screen flex flex-col bg-paper text-ink antialiased" suppressHydrationWarning>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
