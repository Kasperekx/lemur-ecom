import { Metadata } from 'next';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactCardsSection } from '@/components/contact/ContactCardsSection';
import { ContactFormSection } from '@/components/contact/ContactFormSection';
import { getProducts } from '@/lib/getWordpressData';

export const metadata: Metadata = {
  title: 'Kontakt | Lemur',
  description: 'Skontaktuj się z nami. Jesteśmy tutaj, aby pomóc.',
};

export default async function ContactPage() {
  // Pobieranie produktów z WooCommerce
  const products = await getProducts();

  // Contact info can be fetched server-side
  const contactInfo = {
    // address: {
    //   street: 'ul. Przykładowa 123',
    //   city: '00-000 Warszawa',
    // },
    email: {
      primary: 'biuro@vetdesign.pl',
      secondary: 'kontakt@vetdesign.pl',
    },
    phone: {
      primary: '+48 123 456 789',
      secondary: '+48 987 654 321',
    },
    hours: {
      weekdays: 'Pon-Pt: 9:00 - 17:00',
      weekend: 'Sob: 10:00 - 14:00',
    },
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section - Client Component */}
      <ContactHero />

      {/* Contact Cards - Client Component */}
      <ContactCardsSection contactInfo={contactInfo} />

      {/* Main Content Section - Client Component */}
      <ContactFormSection contactInfo={contactInfo} products={products} />

      {/* Map Section - Client Component */}
    </div>
  );
}
