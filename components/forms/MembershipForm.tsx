'use client';

import { useRef, useState } from 'react';
import PhotoCapture from './PhotoCapture';
import type { MembershipFormContent } from '@/types/content';

const inputClass =
  'w-full rounded-btn border border-line bg-white dark:bg-[#13272F] px-4 py-3 text-sm text-ink placeholder-granite outline-none transition-colors focus:border-gold';
const labelClass = 'block text-sm font-medium text-ink mb-2';

const STEP_KEYS = ['personal', 'address', 'nationality', 'confirmation'] as const;

export default function MembershipForm({ content }: { content: MembershipFormContent }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [photoError, setPhotoError] = useState(false);
  const [step, setStep] = useState(0);
  const [spanishRegistration, setSpanishRegistration] = useState<'Sí' | 'No' | ''>('');
  const [acceptsStatutes, setAcceptsStatutes] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const stepRefs = useRef<(HTMLElement | null)[]>([]);

  // Los 4 pasos están todos montados en el DOM (ver comentario más abajo), así que
  // form.checkValidity() validaría también los campos required de pasos futuros
  // todavía no completados. Se valida solo el contenedor del paso actual.
  const goNext = () => {
    const container = stepRefs.current[step];
    if (!container) return;
    const controls = container.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      'input, select, textarea'
    );
    for (const control of controls) {
      if (!control.checkValidity()) {
        control.reportValidity();
        return;
      }
    }
    setStep((current) => Math.min(current + 1, STEP_KEYS.length - 1));
  };

  const goBack = () => setStep((current) => Math.max(current - 1, 0));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current?.checkValidity()) {
      formRef.current?.reportValidity();
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!data.photo) {
      setPhotoError(true);
      return;
    }
    setPhotoError(false);
    setStatus('loading');

    try {
      const response = await fetch('/api/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
        setSpanishRegistration('');
        setAcceptsStatutes(false);
        setStep(0);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const { fields } = content;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-10">
      <div className="flex items-center gap-3">
        {STEP_KEYS.map((key, index) => (
          <div key={key} className="flex items-center gap-2">
            <span
              className="h-[9px] rounded-full transition-all"
              style={{
                width: index === step ? '26px' : '9px',
                backgroundColor: index <= step ? '#D9B23C' : 'var(--line)',
              }}
            />
            <span className={`text-xs ${index === step ? 'text-ink font-medium' : 'text-granite'}`}>
              {content.steps[key]}
            </span>
          </div>
        ))}
      </div>

      {/* Los 4 pasos permanecen montados durante todo el wizard (hidden en vez de
          desmontarse): FormData(form) solo lee inputs presentes en el DOM al
          momento del submit, así que desmontar pasos anteriores perdería sus
          valores al enviar desde el último paso. */}
      <fieldset ref={(el) => { stepRefs.current[0] = el; }} className="space-y-6" hidden={step !== 0}>
          <legend className="font-display text-xl mb-2">{content.sections.personal}</legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="firstName">{fields.firstName}</label>
              <input className={inputClass} id="firstName" name="firstName" required />
            </div>
            <div>
              <label className={labelClass} htmlFor="lastName">{fields.lastName}</label>
              <input className={inputClass} id="lastName" name="lastName" required />
            </div>
            <div>
              <label className={labelClass} htmlFor="documentType">{fields.documentType}</label>
              <select className={inputClass} id="documentType" name="documentType" required defaultValue="">
                <option value="" disabled>—</option>
                {content.documentTypeOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="documentNumber">{fields.documentNumber}</label>
              <input className={inputClass} id="documentNumber" name="documentNumber" required />
            </div>
            <div>
              <label className={labelClass} htmlFor="maritalStatus">{fields.maritalStatus}</label>
              <select className={inputClass} id="maritalStatus" name="maritalStatus" defaultValue="">
                <option value="" disabled>—</option>
                {content.maritalStatusOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="spouseName">{fields.spouseName}</label>
              <input className={inputClass} id="spouseName" name="spouseName" />
            </div>
            <div>
              <label className={labelClass} htmlFor="children">{fields.children}</label>
              <input className={inputClass} id="children" name="children" />
            </div>
            <div>
              <label className={labelClass} htmlFor="profession">{fields.profession}</label>
              <input className={inputClass} id="profession" name="profession" />
            </div>
          </div>
      </fieldset>

      <fieldset ref={(el) => { stepRefs.current[1] = el; }} className="space-y-6" hidden={step !== 1}>
          <legend className="font-display text-xl mb-2">{content.sections.address}</legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="street">{fields.street}</label>
              <input className={inputClass} id="street" name="street" required />
            </div>
            <div>
              <label className={labelClass} htmlFor="streetNumber">{fields.streetNumber}</label>
              <input className={inputClass} id="streetNumber" name="streetNumber" />
            </div>
            <div>
              <label className={labelClass} htmlFor="floor">{fields.floor}</label>
              <input className={inputClass} id="floor" name="floor" />
            </div>
            <div>
              <label className={labelClass} htmlFor="apartment">{fields.apartment}</label>
              <input className={inputClass} id="apartment" name="apartment" />
            </div>
            <div>
              <label className={labelClass} htmlFor="locality">{fields.locality}</label>
              <input className={inputClass} id="locality" name="locality" required />
            </div>
            <div>
              <label className={labelClass} htmlFor="postalCode">{fields.postalCode}</label>
              <input className={inputClass} id="postalCode" name="postalCode" />
            </div>
            <div>
              <label className={labelClass} htmlFor="phone">{fields.phone}</label>
              <input className={inputClass} id="phone" name="phone" />
            </div>
            <div>
              <label className={labelClass} htmlFor="mobilePhone">{fields.mobilePhone}</label>
              <input className={inputClass} id="mobilePhone" name="mobilePhone" />
            </div>
            <div>
              <label className={labelClass} htmlFor="email">{fields.email}</label>
              <input className={inputClass} type="email" id="email" name="email" required />
            </div>
          </div>
      </fieldset>

      <fieldset ref={(el) => { stepRefs.current[2] = el; }} className="space-y-6" hidden={step !== 2}>
          <legend className="font-display text-xl mb-2">{content.steps.nationality}</legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="birthCountry">{fields.birthCountry}</label>
              <input className={inputClass} id="birthCountry" name="birthCountry" required />
            </div>
            <div>
              <label className={labelClass} htmlFor="birthProvince">{fields.birthProvince}</label>
              <input className={inputClass} id="birthProvince" name="birthProvince" />
            </div>
            <div>
              <label className={labelClass} htmlFor="birthConcello">{fields.birthConcello}</label>
              <input className={inputClass} id="birthConcello" name="birthConcello" />
            </div>
            <div>
              <label className={labelClass} htmlFor="birthLocality">{fields.birthLocality}</label>
              <input className={inputClass} id="birthLocality" name="birthLocality" />
            </div>
            <div>
              <label className={labelClass} htmlFor="birthDate">{fields.birthDate}</label>
              <input className={inputClass} type="date" id="birthDate" name="birthDate" required />
            </div>
            <div>
              <label className={labelClass} htmlFor="galicianOrigin">{fields.galicianOrigin}</label>
              <select className={inputClass} id="galicianOrigin" name="galicianOrigin" defaultValue="">
                <option value="" disabled>—</option>
                {content.galicianOriginOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <span className={labelClass}>{fields.spanishRegistration}</span>
              <div className="flex gap-3">
                <input type="hidden" name="spanishRegistration" value={spanishRegistration} />
                {(['Sí', 'No'] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSpanishRegistration(option)}
                    className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                      spanishRegistration === option
                        ? 'bg-atlantic text-white border-atlantic'
                        : 'border-line text-ink hover:border-atlantic'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
      </fieldset>

      <div className="space-y-10" hidden={step !== 3}>
          <fieldset className="space-y-6">
            <legend className="font-display text-xl mb-2">{content.sections.referrer}</legend>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="referrerName">{fields.referrerName}</label>
                <input className={inputClass} id="referrerName" name="referrerName" />
              </div>
              <div>
                <label className={labelClass} htmlFor="referrerMemberNumber">{fields.referrerMemberNumber}</label>
                <input className={inputClass} id="referrerMemberNumber" name="referrerMemberNumber" />
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-6">
            <PhotoCapture content={content} />
            {photoError && <p className="text-sm text-red-600 -mt-4">{content.photoRequiredMessage}</p>}
          </fieldset>

          <div className="border-t border-line pt-8">
            <label className="flex items-start gap-3 text-sm text-granite leading-6 cursor-pointer">
              <input
                type="checkbox"
                name="acceptsStatutes"
                required
                checked={acceptsStatutes}
                onChange={(e) => setAcceptsStatutes(e.target.checked)}
                className="sr-only"
              />
              <span
                className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-[4px] border flex items-center justify-center transition-colors"
                style={{
                  backgroundColor: acceptsStatutes ? '#3F6B4A' : '#fff',
                  borderColor: acceptsStatutes ? '#3F6B4A' : '#DCD6C6',
                }}
                aria-hidden="true"
              >
                {acceptsStatutes && (
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
                    <path d="M3 8.5L6.5 12L13 4.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              {content.declaration}
            </label>
          </div>
      </div>

      <div className="flex items-center gap-4 pt-4">
        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="rounded-btn border border-line px-6 py-3 text-sm font-medium text-ink hover:border-gold transition-colors"
          >
            ← Atrás
          </button>
        )}

        {step < STEP_KEYS.length - 1 && (
          <button
            type="button"
            onClick={goNext}
            className="rounded-btn bg-gold-2 text-black px-8 py-3 text-sm font-bold shadow-sm hover:bg-gold transition-colors"
          >
            Continuar →
          </button>
        )}

        {step === STEP_KEYS.length - 1 && (
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-btn bg-black text-white px-8 py-4 text-sm font-bold shadow-sm hover:bg-atlantic transition-colors disabled:opacity-60"
          >
            {status === 'loading' ? content.submitLoadingLabel : content.submitLabel}
          </button>
        )}
      </div>

      {status === 'success' && <p className="text-sm text-green">{content.successMessage}</p>}
      {status === 'error' && <p className="text-sm text-red-600">{content.errorMessage}</p>}
    </form>
  );
}
