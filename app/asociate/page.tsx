import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackLink from '@/components/ui/BackLink';
import Eyebrow from '@/components/ui/Eyebrow';
import MembershipForm from '@/components/forms/MembershipForm';
import { getMembershipFormContent } from '@/lib/microsite-data';

export const metadata: Metadata = {
  title: 'Asociate',
  description: 'Solicitud de ingreso como socio del Centro.',
};

export default function AsociatePage() {
  const membershipFormContent = getMembershipFormContent();

  return (
    <>
      <Header />
      <section className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-7">
          <BackLink label="← Volver al inicio" fallbackHref="/" />
          <Eyebrow>{membershipFormContent.eyebrow}</Eyebrow>
          <h1 className="font-display text-3xl md:text-4xl mb-4">{membershipFormContent.title}</h1>
          <p className="text-granite leading-7 mb-12">{membershipFormContent.description}</p>
          <MembershipForm content={membershipFormContent} />
        </div>
      </section>
      <Footer />
    </>
  );
}
