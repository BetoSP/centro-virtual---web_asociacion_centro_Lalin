import Eyebrow from '@/components/ui/Eyebrow';
import BackLink from '@/components/ui/BackLink';
import type { ComarcaNewsContent } from '@/types/content';

export default function ComarcaNews({ content }: { content: ComarcaNewsContent }) {
  return (
    <section id="comarca">
      <div className="max-w-container mx-auto px-7 py-20 border-t border-line">
        <BackLink label="← Volver al inicio" fallbackHref="#inicio" />
        <div className="max-w-2xl mb-12">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl">{content.title}</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {content.items.map((item) => (
            <div
              key={item.municipality}
              className="bg-white dark:bg-[#13272F] rounded-card-lg border-l-4 border-green p-6 shadow-card"
            >
              <h3 className="font-display text-lg mb-2">{item.municipality}</h3>
              <p className="text-sm text-granite leading-6">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
