import { ContactSection } from '@/components/contact/ContactSection';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt | Lemur',
  description: 'Skontaktuj się z nami. Jesteśmy tutaj, aby pomóc.',
};

export default async function ContactPage() {
  // Tutaj możemy pobrać dane z API/CMS jeśli są potrzebne
  const contactInfo = {
    address: {
      street: 'ul. Przykładowa 123',
      city: '00-000 Warszawa',
    },
    email: {
      primary: 'kontakt@lemur.pl',
      secondary: 'sklep@lemur.pl',
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
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary to-orange-500 bg-clip-text text-transparent mb-4">
          Skontaktuj się z nami
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Masz pytania? Jesteśmy tutaj, aby pomóc. Wyślij nam wiadomość, a
          odpowiemy najszybciej jak to możliwe.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        <ContactInfo info={contactInfo} />
        <ContactSection />
      </div>
    </div>
  );
}
