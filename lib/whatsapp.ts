export function whatsappHref(rawNumber: string, text?: string): string | null {
  const digits = rawNumber.replace(/[^0-9]/g, '');
  if (digits.length === 0) return null;
  return text ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}` : `https://wa.me/${digits}`;
}
