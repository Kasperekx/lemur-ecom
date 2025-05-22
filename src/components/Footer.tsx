import Link from 'next/link';
import { IoMdMail } from 'react-icons/io';
import { MdLocalPhone, MdLocationOn } from 'react-icons/md';
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaArrowRight,
} from 'react-icons/fa';
import { getProducts } from '@/lib/getWordpressData';
import { Product } from './products/product.type';
import { createSlug } from '@/utils/strings';

const FooterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-5">
    <h2 className="text-lg font-semibold text-gray-800 relative inline-block">
      {title}
      <span className="absolute left-0 -bottom-1 w-1/2 h-0.5 bg-secondary"></span>
    </h2>
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
    className="text-gray-600 hover:text-secondary transition-colors duration-200 group flex items-center"
  >
    <span className="relative overflow-hidden">
      <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-200">
        {children}
      </span>
    </span>
  </Link>
);

const ContactItem = ({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href?: string;
}) => {
  const content = (
    <div className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors duration-200 group">
      <div className="text-secondary bg-secondary/5 p-2 rounded-full group-hover:bg-secondary/10 transition-colors">
        {icon}
      </div>
      <span>{text}</span>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};

const SocialLink = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <Link
    href={href}
    className="w-10 h-10 flex items-center justify-center bg-gray-100 text-gray-600 hover:bg-secondary hover:text-white rounded-full transition-all duration-300 transform hover:-translate-y-1"
  >
    {icon}
  </Link>
);

const Footer = async () => {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 5);

  const quickLinks = [
    { name: 'O nas', href: '/about' },
    { name: 'Kontakt', href: '/kontakt' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Blog', href: '/blog' },
    { name: 'Polityka prywatności', href: '/privacy' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white mt-auto border-t border-gray-200">
      <div className="relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-0 w-40 h-40 bg-secondary/5 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute bottom-0 right-10 w-60 h-60 bg-secondary/5 rounded-full translate-y-1/2"></div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8">
            <div className="lg:col-span-4 space-y-8">
              <div>
                <Link href="/" className="inline-block">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">V</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      Vetdesign
                    </h2>
                  </div>
                </Link>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Dostarczamy nowoczesne, skuteczne i niezawodne produkty, które
                  spełniają najwyższe standardy opieki weterynaryjnej.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-gray-800 font-medium">Kontakt z nami</h3>
                <div className="space-y-3">
                  <ContactItem
                    icon={<IoMdMail size={18} />}
                    text="biuro@vetdesign.pl"
                    href="mailto:biuro@vetdesign.pl"
                  />
                  <ContactItem
                    icon={<MdLocalPhone size={18} />}
                    text="733 502 506"
                    href="tel:733502506"
                  />
                  <ContactItem
                    icon={<MdLocationOn size={18} />}
                    text="Warszawa, Polska"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-gray-800 font-medium mb-4">
                  Znajdziesz nas na:
                </h3>
                <div className="flex items-center gap-3">
                  <SocialLink
                    href="#facebook"
                    icon={<FaFacebookSquare size={18} />}
                  />
                  <SocialLink
                    href="#instagram"
                    icon={<FaInstagram size={18} />}
                  />
                  <SocialLink href="#twitter" icon={<FaTwitter size={18} />} />
                  <SocialLink
                    href="#linkedin"
                    icon={<FaLinkedin size={18} />}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <FooterSection title="Produkty">
                <nav className="space-y-2.5">
                  {featuredProducts.map((product: Product) => (
                    <div key={product.id}>
                      <FooterLink
                        href={`/produkty/${createSlug(product.name)}`}
                      >
                        {product.name}
                      </FooterLink>
                    </div>
                  ))}
                  <div className="pt-2">
                    <Link
                      href="/produkty"
                      className="inline-flex items-center gap-1 text-secondary font-medium hover:underline"
                    >
                      Wszystkie produkty
                      <FaArrowRight size={12} />
                    </Link>
                  </div>
                </nav>
              </FooterSection>
            </div>

            <div className="lg:col-span-2">
              <FooterSection title="Szybkie linki">
                <nav className="space-y-2.5">
                  {quickLinks.map((link) => (
                    <div key={link.href}>
                      <FooterLink href={link.href}>{link.name}</FooterLink>
                    </div>
                  ))}
                </nav>
              </FooterSection>
            </div>

            <div className="lg:col-span-3">
              <FooterSection title="Newsletter">
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Zapisz się, aby otrzymywać informacje o najnowszych
                    produktach i promocjach.
                  </p>
                  <form className="space-y-3">
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="Twój email"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/30 text-gray-800 pr-12"
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center hover:bg-secondary/90 transition-colors"
                      >
                        <FaArrowRight size={14} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500  ">
                      Wysyłamy tylko wartościowe treści. Możesz zrezygnować w
                      każdej chwili.
                    </p>
                  </form>
                </div>
              </FooterSection>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-gray-500 text-sm">
                Copyright © {new Date().getFullYear()} Vetdesign. Wszystkie
                prawa zastrzeżone.
              </span>
              <div className="flex gap-6 text-sm text-gray-500">
                <FooterLink href="/privacy">Polityka prywatności</FooterLink>
                <FooterLink href="/terms">Regulamin</FooterLink>
                <FooterLink href="/cookies">Cookies</FooterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
