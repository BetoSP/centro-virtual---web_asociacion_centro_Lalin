import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ActivitiesList from '@/components/sections/ActivitiesList';
import { getActivitiesPageContent, getNewsItems } from '@/lib/microsite-data';

export const metadata: Metadata = {
  title: 'Actividades',
  description: 'Agenda de actividades culturales, gastronómicas y educativas del Centro.',
};

export default function ActividadesPage() {
  return (
    <>
      <Header />
      <ActivitiesList content={getActivitiesPageContent()} newsItems={getNewsItems()} />
      <Footer />
    </>
  );
}
