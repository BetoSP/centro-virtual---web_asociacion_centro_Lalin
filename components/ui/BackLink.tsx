import Link from 'next/link';

interface BackLinkProps {
  label: string;
  fallbackHref: string;
}

export default function BackLink({ label, fallbackHref }: BackLinkProps) {
  return (
    <Link
      href={fallbackHref}
      className="text-[12.5px] font-bold text-granite hover:text-ink transition-colors mb-5 inline-block"
    >
      {label}
    </Link>
  );
}
