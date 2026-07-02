import Image from 'next/image';

export default function Avatar({
  name,
  gender,
  photo,
  bgColor,
}: {
  name: string;
  gender: 'male' | 'female';
  photo?: string;
  bgColor?: string;
}) {
  if (photo) {
    return (
      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-paper-2 flex-shrink-0">
        <Image src={photo} alt={name} fill className="object-cover" />
      </div>
    );
  }

  const bg = bgColor ?? (gender === 'female' ? '#c9a227' : '#0e2a38');

  return (
    <div
      className="w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center"
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" width="32" height="32" fill="none">
        <circle cx="12" cy="8" r="4" fill="#ffffff" fillOpacity="0.9" />
        <path
          d="M4 20c0-4.4 3.6-7 8-7s8 2.6 8 7"
          fill="#ffffff"
          fillOpacity="0.9"
        />
      </svg>
    </div>
  );
}
