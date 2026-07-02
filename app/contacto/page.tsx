import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactPage from '@/components/sections/ContactPage';
import { getContactPageContent } from '@/lib/microsite-data';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Escribinos, encontranos en el mapa o mandanos un mensaje.',
};

export default function ContactoPage() {
  return (
    <>
      <Header />
      <ContactPage content={getContactPageContent()} />
      <Footer />
    </>
  );
}
