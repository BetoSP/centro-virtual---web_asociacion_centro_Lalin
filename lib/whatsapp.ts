export function whatsappHref(rawNumber: string): string | null {
  const digits = rawNumber.replace(/[^0-9]/g, '');
  return digits.length > 0 ? `https://wa.me/${digits}` : null;
}
