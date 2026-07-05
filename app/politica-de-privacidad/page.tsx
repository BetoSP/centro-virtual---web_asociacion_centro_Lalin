import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BackLink from '@/components/ui/BackLink';
import Eyebrow from '@/components/ui/Eyebrow';
import { getPrivacyPolicyContent } from '@/lib/microsite-data';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Cómo tratamos los datos personales que recopilamos a través de este sitio.',
};

export default function PoliticaDePrivacidadPage() {
  const content = getPrivacyPolicyContent();

  return (
    <>
      <Header />
      <section className="py-20">
        <div className="max-w-container mx-auto px-7">
          <BackLink label="← Volver al inicio" fallbackHref="/" />
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="font-display text-3xl md:text-4xl mb-2 mt-4">{content.title}</h1>
          <p className="text-sm text-granite mb-10">{content.lastUpdated}</p>
          <p className="text-granite leading-7 mb-12 max-w-3xl">{content.intro}</p>

          <div className="space-y-10 max-w-3xl">
            {content.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-xl mb-3">{section.heading}</h2>
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-granite leading-7 mb-3 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
