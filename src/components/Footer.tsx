import Link from 'next/link';
import { IoMdMail } from 'react-icons/io';
import { MdLocalPhone } from 'react-icons/md';
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import { getProducts } from '@/lib/getWordpressData';
import { Product } from './products/product.type';

const FooterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-semibold text-white">{title}</h2>
    {children}
  </div>
);

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-gray-300 hover:text-white transition-colors duration-200"
  >
    {children}
  </Link>
);

const ContactItem = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) => (
  <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-200">
    <div className="text-secondary">{icon}</div>
    <span>{text}</span>
  </div>
);

const Footer = async () => {
  const products = await getProducts();

  const quickLinks = [
    { name: 'O nas', href: '/about' },
    { name: 'Kontakt', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Polityka prywatności', href: '/privacy' },
  ];

  return (
    <footer className="bg-primary mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-8">
            <Link href="/" className="block">
              <h2 className="text-3xl font-bold text-white">Vetdesign</h2>
            </Link>

            <div className="space-y-4">
              <p className="text-gray-300">
                Masz pytania?{' '}
                <Link
                  href="/kontakt"
                  className="text-secondary font-semibold hover:text-secondary/80 transition-colors"
                >
                  Skontaktuj się
                </Link>
              </p>

              <div className="space-y-3">
                <ContactItem
                  icon={<IoMdMail size={24} />}
                  text="biuro@vetdesign.pl"
                />
                <ContactItem
                  icon={<MdLocalPhone size={24} />}
                  text="733 502 506"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <h3 className="text-xl font-medium text-white mb-4">
                Znajdziesz nas na:
              </h3>
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="text-secondary hover:text-secondary/80 transition-colors"
                >
                  <FaFacebookSquare size={24} />
                </Link>
                <Link
                  href="#"
                  className="text-secondary hover:text-secondary/80 transition-colors"
                >
                  <FaInstagram size={24} />
                </Link>
              </div>
            </div>
          </div>

          <FooterSection title="Produkty">
            <nav className="space-y-3">
              {products.map((product: Product) => (
                <div key={product.id}>
                  <FooterLink href="#">{product.name}</FooterLink>
                </div>
              ))}
            </nav>
          </FooterSection>

          <FooterSection title="Szybkie linki">
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <div key={link.href}>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </div>
              ))}
            </nav>
          </FooterSection>

          <FooterSection title="Newsletter">
            <div className="space-y-4">
              <p className="text-gray-300">
                Bądź na bieżąco z nowościami i promocjami
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Twój email"
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-secondary text-white"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors duration-200"
                >
                  Zapisz się
                </button>
              </form>
            </div>
          </FooterSection>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <span>
              Copyright © 2024 Vetdesign. Wszystkie prawa zastrzeżone.
            </span>
            <div className="flex gap-6">
              <FooterLink href="/privacy">Polityka prywatności</FooterLink>
              <FooterLink href="/terms">Regulamin</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
