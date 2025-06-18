'use client';

import { ContactForm } from './ContactForm';
import { WPProduct } from '@/types/wordpress';

interface ContactSectionProps {
  products: WPProduct[];
}

export function ContactSection({ products }: ContactSectionProps) {
  return (
    <div className="lg:col-span-2 grid grid-cols-1 gap-8 content-start">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-2xl font-semibold mb-6">Wyślij wiadomość</h2>
        <ContactForm products={products} />
      </div>

      <div className="rounded-xl overflow-hidden h-[300px] shadow-sm border border-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.3888877589543!2d21.017299776191377!3d52.23235605624794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc8c92692e49%3A0xc2e97552d5c5092f!2sPa%C5%82ac%20Kultury%20i%20Nauki!5e0!3m2!1spl!2spl!4v1709641160317!5m2!1spl!2spl"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
