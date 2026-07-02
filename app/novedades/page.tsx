import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import NewsList from '@/components/sections/NewsList';
import { getNewsPageContent } from '@/lib/microsite-data';

export const metadata: Metadata = {
  title: 'Novedades',
  description: 'Blog cultural: efemérides, música, gastronomía e idioma gallego.',
};

export default function NovedadesPage() {
  return (
    <>
      <Header />
      <NewsList content={getNewsPageContent()} />
      <Footer />
    </>
  );
}
