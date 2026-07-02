'use client';

import { useState } from 'react';
import type { ContactPageContent } from '@/types/content';

const inputClass =
  'w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-ink placeholder-granite outline-none transition-colors focus:border-gold';
const labelClass = 'block text-sm font-medium text-ink mb-2';

export default function ContactForm({ content }: { content: ContactPageContent }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
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
        e.currentTarget.reset();
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
