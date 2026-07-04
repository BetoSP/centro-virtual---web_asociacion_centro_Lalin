'use client';

import { useId } from 'react';
import type { SocialLink } from '@/types/content';

function InstagramIcon({ gradientId }: { gradientId: string }) {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FEDA75" />
          <stop offset="30%" stopColor="#FA7E1E" />
          <stop offset="60%" stopColor="#D62976" />
          <stop offset="85%" stopColor="#962FBF" />
          <stop offset="100%" stopColor="#4F5BD5" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" fill={`url(#${gradientId})`} />
      <rect x="6.3" y="6.3" width="11.4" height="11.4" rx="4" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.6" />
      <circle cx="17.1" cy="6.9" r="0.9" fill="#fff" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <circle cx="12" cy="12" r="10" fill="#1877F2" />
      <path
        d="M13.5 21v-8.2h2.75l.41-3.2H13.5V7.5c0-.93.26-1.56 1.6-1.56h1.7V3.14C16.5 3.1 15.53 3 14.4 3c-2.36 0-3.98 1.44-3.98 4.08v2.52H7.66v3.2h2.76V21h3.08Z"
        fill="#fff"
      />
    </svg>
  );
}

function TiktokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M16.5 3c.3 1.9 1.5 3.3 3.5 3.5v2.6c-1.3 0-2.5-.4-3.5-1.1v6.4c0 3-2.4 5.3-5.3 5.3S5.9 17.4 5.9 14.4c0-2.8 2.1-5.1 4.9-5.3v2.7c-1.3.2-2.3 1.3-2.3 2.6 0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7V3h2.6Z" />
    </svg>
  );
}

export default function SocialIcons({
  socials,
  className = '',
}: {
  socials: SocialLink[];
  className?: string;
}) {
  const gradientId = useId();

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socials.map((social) => {
        const isPending = social.href.startsWith('[PENDIENTE');
        let icon: React.ReactNode = social.label;
        if (social.label === 'Instagram') icon = <InstagramIcon gradientId={`ig-gradient-${gradientId}-${social.label}`} />;
        else if (social.label === 'Facebook') icon = <FacebookIcon />;
        else if (social.label === 'TikTok') icon = <TiktokIcon />;

        return (
          <a
            key={social.label}
            href={isPending ? '#' : social.href}
            target={isPending ? undefined : '_blank'}
            rel={isPending ? undefined : 'noopener noreferrer'}
            aria-label={social.label}
            title={isPending ? `${social.label} (${social.href})` : social.label}
            className="transition-opacity hover:opacity-80"
          >
            {icon}
          </a>
        );
      })}
    </div>
  );
}
