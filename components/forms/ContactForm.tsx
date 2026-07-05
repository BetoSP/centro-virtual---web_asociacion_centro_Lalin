'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ContactPageContent } from '@/types/content';
import { getPrivacyPolicyContent } from '@/lib/microsite-data';

const inputClass =
  'w-full rounded-md border border-line bg-white dark:bg-[#13272F] px-4 py-3 text-sm text-ink placeholder-granite outline-none transition-colors focus:border-gold';
const labelClass = 'block text-sm font-medium text-ink mb-2';

export default function ContactForm({ content }: { content: ContactPageContent }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [acceptsPrivacyPolicy, setAcceptsPrivacyPolicy] = useState(false);
  const privacyPolicyTitle = getPrivacyPolicyContent().title;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatus('success');
        form.reset();
        setAcceptsPrivacyPolicy(false);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className={labelClass} htmlFor="name">{content.form.nameLabel}</label>
        <input className={inputClass} id="name" name="name" required />
      </div>
      <div>
        <label className={labelClass} htmlFor="email">{content.form.emailLabel}</label>
        <input className={inputClass} type="email" id="email" name="email" required />
      </div>
      <div>
        <label className={labelClass} htmlFor="message">{content.form.messageLabel}</label>
        <textarea className={inputClass} id="message" name="message" rows={5} required />
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm text-granite leading-6 cursor-pointer">
          <input
            type="checkbox"
            name="acceptsPrivacyPolicy"
            required
            checked={acceptsPrivacyPolicy}
            onChange={(e) => setAcceptsPrivacyPolicy(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded-[4px] border-line accent-atlantic"
          />
          <span>
            {content.form.privacyConsentLabel.split(privacyPolicyTitle)[0]}
            <Link href="/politica-de-privacidad" className="underline hover:text-atlantic dark:hover:text-[var(--ink)]">
              {privacyPolicyTitle}
            </Link>
            {content.form.privacyConsentLabel.split(privacyPolicyTitle)[1]}
          </span>
        </label>
      </div>
      <div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-md bg-black text-white px-8 py-4 text-sm font-bold shadow-sm hover:bg-atlantic transition-colors disabled:opacity-60"
        >
          {status === 'loading' ? content.form.submitLoadingLabel : content.form.submitLabel}
        </button>
        {status === 'success' && <p className="text-sm text-green mt-4">{content.form.successMessage}</p>}
        {status === 'error' && <p className="text-sm text-red-600 mt-4">{content.form.errorMessage}</p>}
      </div>
    </form>
  );
}
