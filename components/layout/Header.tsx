'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getMainNav, getSiteConfig } from '@/lib/microsite-data';
import PortalStrip from '@/components/layout/PortalStrip';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainNav = getMainNav();
  const siteConfig = getSiteConfig();

  return (
    <>
      <PortalStrip content={siteConfig.portalStrip} />

      <div className="bg-header-dark py-1 px-4" />

      <header className="sticky top-0 z-50 bg-[rgba(250,247,240,0.85)] backdrop-blur-[10px] shadow-sm">
        <div className="max-w-container mx-auto px-7 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-4 flex-shrink-0">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={60}
              height={60}
              className="rounded-full"
            />
            <span className="font-display font-semibold text-[22px] text-ink leading-tight">
              {siteConfig.name}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {mainNav.map((item) =>
              item.label === 'Ingresar' ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[12.5px] font-bold text-ink border-[1.5px] border-ink rounded-full px-4 py-[7px] bg-atlantic/10"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-ink transition-colors hover:text-green"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
            aria-expanded={mobileMenuOpen}
            type="button"
          >
            <span className="block w-6 h-px bg-ink" />
            <span className="block w-6 h-px bg-ink" />
            <span className="block w-6 h-px bg-ink" />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-line px-7 py-5">
            <ul className="flex flex-col gap-4">
              {mainNav.map((item) =>
                item.label === 'Ingresar' ? (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="inline-block text-sm font-bold text-ink border-[1.5px] border-ink rounded-full px-4 py-[7px] bg-atlantic/10"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-ink block" onClick={() => setMobileMenuOpen(false)}>
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
