import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Gallery from '@/components/sections/Gallery';
import { getGalleryContent } from '@/lib/microsite-data';

export const metadata: Metadata = {
  title: 'Galería',
  description: 'Fotos de las actividades y espacios del Centro.',
};

export default function GaleriaPage() {
  return (
    <>
      <Header />
      <Gallery content={getGalleryContent()} />
      <Footer />
    </>
  );
}
