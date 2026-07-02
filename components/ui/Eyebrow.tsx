interface EyebrowProps {
  children: string;
  light?: boolean;
  center?: boolean;
}

export default function Eyebrow({ children, light = false, center = false }: EyebrowProps) {
  return (
    <div
      className={`font-mono text-[11px] uppercase tracking-[0.28em] inline-flex items-center gap-3 mb-4 ${
        light ? 'text-paper/80' : 'text-granite'
      } ${center ? 'justify-center w-full' : ''}`}
    >
      <span className="block w-6 h-px bg-gold" />
      {children}
    </div>
  );
}
