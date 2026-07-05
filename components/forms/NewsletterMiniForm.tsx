'use client';

import { useId, useState } from 'react';
import Link from 'next/link';
import { getPrivacyPolicyContent } from '@/lib/microsite-data';

interface NewsletterMiniFormContent {
  emailLabel: string;
  emailPlaceholder: string;
  submitLabel: string;
  submitLoadingLabel: string;
  successMessage: string;
  errorMessage: string;
  privacyNotice: string;
}

export default function NewsletterMiniForm({
  content,
  className = '',
  dark = true,
}: {
  content: NewsletterMiniFormContent;
  className?: string;
  dark?: boolean;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const inputId = useId();
  const privacyPolicyTitle = getPrivacyPolicyContent().title;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <label htmlFor={inputId} className="sr-only">
          {content.emailLabel}
        </label>
        <input
          id={inputId}
          type="email"
          placeholder={content.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 min-w-0 rounded-btn border border-transparent bg-white dark:bg-[#13272F] px-4 py-3 text-sm text-ink placeholder-granite outline-none transition-colors focus:border-gold"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-full bg-gold-2 text-ink px-6 py-3 text-sm font-bold shadow-sm hover:bg-gold transition-colors disabled:opacity-60 dark:bg-[#F6F4EE] dark:text-gold-2"
        >
          {status === 'loading' ? content.submitLoadingLabel : content.submitLabel}
        </button>
      </form>
      {status === 'success' && (
        <p className={`text-sm mt-3 ${dark ? 'text-white' : 'text-ink'}`}>{content.successMessage}</p>
      )}
      {status === 'error' && <p className="text-sm text-gold mt-3">{content.errorMessage}</p>}
      <p className={`text-xs mt-3 ${dark ? 'text-white/50' : 'text-granite'}`}>
        {content.privacyNotice.split(privacyPolicyTitle)[0]}
        <Link href="/politica-de-privacidad" className="underline hover:text-gold">
          {privacyPolicyTitle}
        </Link>
        {content.privacyNotice.split(privacyPolicyTitle)[1]}
      </p>
    </div>
  );
}
