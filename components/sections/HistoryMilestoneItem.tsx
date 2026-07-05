'use client';

import type { HistoryMilestone } from '@/types/content';

interface HistoryMilestoneItemProps {
  milestone: HistoryMilestone;
  isOpen: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onTogglePin: () => void;
}

export default function HistoryMilestoneItem({
  milestone,
  isOpen,
  onHoverStart,
  onHoverEnd,
  onTogglePin,
}: HistoryMilestoneItemProps) {
  const triggerHoverProps = {
    onMouseEnter: onHoverStart,
    onMouseLeave: onHoverEnd,
  };

  return (
    <li className="relative">
      <button
        type="button"
        onClick={onTogglePin}
        aria-expanded={isOpen}
        aria-label={`Ver detalle de ${milestone.title}`}
        {...triggerHoverProps}
        className={
          (milestone.accent
            ? 'absolute -left-[calc(2rem+7px)] top-0.5 w-3.5 h-3.5 bg-gold-2'
            : 'absolute -left-[calc(2rem+5px)] top-1 w-2.5 h-2.5 bg-gold') +
          ' rounded-full transition-all duration-300 ease-out cursor-pointer' +
          (isOpen ? ' scale-[1.35] shadow-[0_0_14px_4px_rgba(217,178,60,0.55)]' : '')
        }
      />
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold mb-2">
        {milestone.year}
      </p>
      <h2 className="font-display text-xl mb-2">
        <button
          type="button"
          onClick={onTogglePin}
          aria-expanded={isOpen}
          {...triggerHoverProps}
          className="text-left hover:text-terracotta transition-colors cursor-pointer"
        >
          {milestone.title}
        </button>
      </h2>
    </li>
  );
}
