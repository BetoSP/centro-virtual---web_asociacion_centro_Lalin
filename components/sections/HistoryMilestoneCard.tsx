'use client';

import { useEffect, useState } from 'react';
import type { HistoryMilestone } from '@/types/content';

const DESCRIPTION_PREVIEW_LIMIT = 250;

interface HistoryMilestoneCardProps {
  milestone: HistoryMilestone | null;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClose: () => void;
}

export default function HistoryMilestoneCard({
  milestone,
  onHoverStart,
  onHoverEnd,
  onClose,
}: HistoryMilestoneCardProps) {
  const isOpen = milestone !== null;
  const [expanded, setExpanded] = useState(false);
  const [lastMilestone, setLastMilestone] = useState<HistoryMilestone | null>(null);

  useEffect(() => {
    if (milestone) {
      setLastMilestone(milestone);
      setExpanded(false);
    }
  }, [milestone]);

  const isLongDescription = (lastMilestone?.description.length ?? 0) > DESCRIPTION_PREVIEW_LIMIT;
  const displayedDescription =
    lastMilestone && isLongDescription && !expanded
      ? `${lastMilestone.description.slice(0, DESCRIPTION_PREVIEW_LIMIT).trimEnd()}…`
      : lastMilestone?.description;

  return (
    <div
      aria-hidden={!isOpen}
      onClick={onClose}
      className={
        'fixed inset-0 z-50 flex items-center justify-center px-6 bg-ink/55 backdrop-blur-sm transition-opacity duration-300 ease-out' +
        (isOpen ? ' opacity-100 pointer-events-auto' : ' opacity-0 pointer-events-none')
      }
    >
      <div
        onClick={(event) => event.stopPropagation()}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        className={
          'w-full max-w-md max-h-[80vh] overflow-y-auto rounded-card-lg bg-paper-warm border-2 border-gold-2 shadow-card-lg px-7 py-8 transition-all duration-300 ease-out' +
          (isOpen ? ' opacity-100 scale-100 translate-y-0' : ' opacity-0 scale-95 translate-y-3')
        }
      >
        {lastMilestone && (
          <>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-gold mb-2">
              {lastMilestone.year}
            </p>
            <h3 className="font-display text-2xl mb-4 text-atlantic">{lastMilestone.title}</h3>
            <p className="text-granite leading-7">{displayedDescription}</p>
            {isOpen && isLongDescription && !expanded && (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="mt-3 text-sm font-bold text-atlantic hover:text-terracotta transition-colors cursor-pointer"
              >
                Leer más →
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
