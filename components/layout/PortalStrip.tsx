import Image from 'next/image';
import type { PortalStripContent } from '@/types/content';

export default function PortalStrip({ content }: { content: PortalStripContent }) {
  return (
    <div className="bg-portal-blue flex items-center justify-end gap-2 px-5 py-1">
      <Image src={content.icon} alt="" width={14} height={14} className="rounded-full bg-white object-cover" />
      <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-white/85">
        {content.text}
      </span>
    </div>
  );
}
