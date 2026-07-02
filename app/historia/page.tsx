import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HistoryTimeline from '@/components/sections/HistoryTimeline';
import { getHistoryContent } from '@/lib/microsite-data';

export const metadata: Metadata = {
  title: 'Historia',
  description: 'Más de un siglo de historia de las asociaciones que dieron origen al Centro.',
};

export default function HistoriaPage() {
  return (
    <>
      <Header />
      <HistoryTimeline content={getHistoryContent()} />
      <Footer />
    </>
  );
}
