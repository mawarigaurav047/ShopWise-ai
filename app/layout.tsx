import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ShopProvider } from '../context/ShopContext';
import Navbar from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: 'ShopWise AI — Smart Electronics & Appliances',
    template: '%s | ShopWise AI',
  },
  description:
    'India\'s most intelligent electronics store. Shop with AI-powered product matching, side-by-side comparisons, and real explainability data.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} scroll-smooth`}>
        <body className="font-sans bg-zinc-50 text-zinc-900 antialiased min-h-screen flex flex-col">
          <ShopProvider>
            <Navbar />
            <main className="flex-1 min-h-screen">{children}</main>
            <Footer />
          </ShopProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
