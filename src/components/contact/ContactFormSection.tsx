'use client';
import { ContactForm } from '@/components/contact/ContactForm';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, CheckCircle2, Clock } from 'lucide-react';
import Image from 'next/image';
import { WPProduct } from '@/types/wordpress';
import { Suspense } from 'react';

interface ContactInfo {
  phone: {
    primary: string;
  };
}

interface ContactFormSectionProps {
  contactInfo: ContactInfo;
  products: WPProduct[];
}

// Loading component for Suspense fallback
function ContactFormFallback() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-28"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-200 rounded w-32"></div>
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
      <div className="h-12 bg-gray-200 rounded"></div>
    </div>
  );
}

export function ContactFormSection({
  contactInfo,
  products,
}: ContactFormSectionProps) {
  return (
    <div className="container mx-auto px-4 py-24 relative" id="contact-form">
      {/* Decorative elements */}
      <div className="absolute top-32 -right-64 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-32 -left-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 max-w-7xl mx-auto"
      >
        <div className="grid lg:grid-cols-5">
          <div className="lg:col-span-2 bg-gradient-to-br from-secondary via-secondary/95 to-orange-500 relative p-10 text-white">
            {/* Pattern Background */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-orange-400/20 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <span className="inline-block py-1 px-3 bg-white/20 text-white text-sm rounded-full mb-4 backdrop-blur-sm">
                  Skontaktuj się z nami
                </span>
                <h2 className="text-3xl font-bold mb-6">
                  Jesteśmy dumni z obsługi klienta
                </h2>
                <p className="mb-10 text-white/90 text-lg leading-relaxed">
                  Nasz zespół jest gotowy do udzielenia odpowiedzi na wszystkie
                  Twoje pytania. Wyślij nam wiadomość, a odpowiemy najszybciej
                  jak to możliwe.
                </p>
              </motion.div>

              <motion.div
                className="space-y-8 mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <motion.div
                  className="flex items-start gap-5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm shadow-lg">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-xl mb-2">Masz pytanie?</h3>
                    <p className="text-white/90">
                      Nasz zespół odpowie na nie w ciągu 24 godzin w dni
                      robocze.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm shadow-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-xl mb-2">
                      Potrzebujesz natychmiastowej pomocy?
                    </h3>
                    <p className="text-white/90">
                      Zadzwoń pod numer {contactInfo.phone.primary} w godzinach
                      pracy.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-5"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-xl mb-2">Godziny pracy</h3>
                    <p className="text-white/90">
                      Pon-Pt: 9:00 - 17:00
                      <br />
                      Sob: 10:00 - 14:00
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="mt-12 pt-10 border-t border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-white/70" />
                  <p className="text-white font-medium">Zaufali nam</p>
                </div>
                <div className="flex -space-x-3">
                  <div className="w-12 h-12 rounded-full border-2 border-white/40 overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                      alt="Klient"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white/40 overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                      alt="Klient"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-white/40 overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
                      alt="Klient"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full border-2 border-white/40 flex items-center justify-center">
                    <span className="text-white font-medium text-sm">+5</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-3 p-8 lg:p-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Wyślij wiadomość
              </h2>
              <p className="text-gray-600 mb-8">
                Wypełnij formularz poniżej, a my skontaktujemy się z Tobą tak
                szybko, jak to możliwe.
              </p>

              {/* Using the existing ContactForm component wrapped in Suspense */}
              <div className="form-container">
                <Suspense fallback={<ContactFormFallback />}>
                  <ContactForm products={products} />
                </Suspense>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
