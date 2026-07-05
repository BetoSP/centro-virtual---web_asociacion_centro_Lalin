'use client';

import { useEffect, useRef, useState } from 'react';
import BackLink from '@/components/ui/BackLink';
import Eyebrow from '@/components/ui/Eyebrow';
import HistoryMilestoneCard from '@/components/sections/HistoryMilestoneCard';
import HistoryMilestoneItem from '@/components/sections/HistoryMilestoneItem';
import type { HistoryContent } from '@/types/content';

const HOVER_CLOSE_GRACE_MS = 200;

export default function HistoryTimeline({ content }: { content: HistoryContent }) {
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const hoverCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openId = pinnedId ?? hoveredId;

  useEffect(() => {
    if (!pinnedId) return;
    function handlePointerDown(event: MouseEvent) {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setPinnedId(null);
      }
    }
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [pinnedId]);

  useEffect(() => {
    return () => {
      if (hoverCloseTimeoutRef.current) clearTimeout(hoverCloseTimeoutRef.current);
    };
  }, []);

  function handleHoverStart(id: string) {
    if (hoverCloseTimeoutRef.current) {
      clearTimeout(hoverCloseTimeoutRef.current);
      hoverCloseTimeoutRef.current = null;
    }
    setHoveredId(id);
  }

  function handleHoverEnd(id: string) {
    if (hoverCloseTimeoutRef.current) clearTimeout(hoverCloseTimeoutRef.current);
    hoverCloseTimeoutRef.current = setTimeout(() => {
      setHoveredId((current) => (current === id ? null : current));
    }, HOVER_CLOSE_GRACE_MS);
  }

  return (
    <section className="py-20">
      <div className="max-w-container mx-auto px-7">
        <BackLink label="← Volver al inicio" fallbackHref="/" />
        <div className="max-w-2xl mb-14">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h1 className="font-display text-3xl md:text-4xl mb-4">{content.title}</h1>
          <p className="text-granite leading-7">{content.intro}</p>
        </div>

        <ol ref={listRef} className="relative border-l border-line pl-8 space-y-10 max-w-2xl">
          {content.milestones.map((milestone, index) => {
            const id = `${milestone.year}-${index}`;
            return (
              <HistoryMilestoneItem
                key={id}
                milestone={milestone}
                isOpen={openId === id}
                onHoverStart={() => handleHoverStart(id)}
                onHoverEnd={() => handleHoverEnd(id)}
                onTogglePin={() => setPinnedId((current) => (current === id ? null : id))}
              />
            );
          })}
        </ol>
      </div>

      <HistoryMilestoneCard
        milestone={
          openId
            ? (content.milestones.find((milestone, index) => `${milestone.year}-${index}` === openId) ?? null)
            : null
        }
        onHoverStart={() => {
          if (openId) handleHoverStart(openId);
        }}
        onHoverEnd={() => {
          if (openId) handleHoverEnd(openId);
        }}
        onClose={() => {
          setPinnedId(null);
          setHoveredId(null);
        }}
      />
    </section>
  );
}
