import '@/lib/ssl-config';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getWordpressMenuItems } from '@/lib/getWordpressData';
import { lato } from '../lib/fonts';
import { Toaster } from '@/components/ui/toaster';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = await getWordpressMenuItems();
  return (
    <html lang="pl" className={`${lato.variable}`}>
      <body className="font-lato flex min-h-screen flex-col">
        <Navbar navItems={navItems} />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
