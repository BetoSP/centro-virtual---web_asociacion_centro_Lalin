import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Board from '@/components/sections/Board';
import { getBoardContent } from '@/lib/microsite-data';

export const metadata: Metadata = {
  title: 'Comisión Directiva',
  description: 'Autoridades elegidas por la asamblea de socios: Comisión Directiva y Comisión Revisora de Cuentas.',
};

export default function DirectivaPage() {
  return (
    <>
      <Header />
      <Board content={getBoardContent()} />
      <Footer />
    </>
  );
}
