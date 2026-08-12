'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import { Footer } from './Footer';

/**
 * Renders the global site chrome (Navbar + Footer) on every route EXCEPT
 * routes that ship their own self-contained chrome (e.g. /storefront).
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const selfContained = pathname?.startsWith('/storefront');

  if (selfContained) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

export default SiteChrome;
