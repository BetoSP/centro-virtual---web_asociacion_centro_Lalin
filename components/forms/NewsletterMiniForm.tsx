'use client';

import { useState } from 'react';

interface NewsletterMiniFormContent {
  emailLabel: string;
  emailPlaceholder: string;
  submitLabel: string;
  submitLoadingLabel: string;
  successMessage: string;
  errorMessage: string;
}

export default function NewsletterMiniForm({
  content,
  className = '',
}: {
  content: NewsletterMiniFormContent;
  className?: string;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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
        <label htmlFor="newsletter-email" className="sr-only">
          {content.emailLabel}
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder={content.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 rounded-btn border border-transparent bg-white px-4 py-3 text-sm text-ink placeholder-granite outline-none transition-colors focus:border-gold"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-btn bg-gold-2 text-black px-6 py-3 text-sm font-bold shadow-sm hover:bg-white transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? content.submitLoadingLabel : content.submitLabel}
        </button>
      </form>
      {status === 'success' && <p className="text-sm text-white mt-3">{content.successMessage}</p>}
      {status === 'error' && <p className="text-sm text-gold mt-3">{content.errorMessage}</p>}
    </div>
  );
}
