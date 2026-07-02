'use client';

import { useRouter } from 'next/navigation';

interface BackLinkProps {
  label: string;
  fallbackHref: string;
}

export default function BackLink({ label, fallbackHref }: BackLinkProps) {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const sameOriginReferrer =
      typeof document !== 'undefined' &&
      document.referrer.length > 0 &&
      new URL(document.referrer).origin === window.location.origin;

    if (sameOriginReferrer && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <a
      href={fallbackHref}
      onClick={handleClick}
      className="text-[12.5px] font-bold text-granite hover:text-ink transition-colors mb-5 inline-block"
    >
      {label}
    </a>
  );
}
