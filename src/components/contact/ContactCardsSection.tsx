'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock, ArrowRight, Copy, Check } from 'lucide-react';

interface ContactInfo {
  // address: {
  //   street: string;
  //   city: string;
  // };
  email: {
    primary: string;
    secondary: string;
  };
  phone: {
    primary: string;
    secondary: string;
  };
  hours: {
    weekdays: string;
    weekend: string;
  };
}

export function ContactCardsSection({
  contactInfo,
}: {
  contactInfo: ContactInfo;
}) {
  const [copied, setCopied] = useState<string | null>(null);

  // Reset copy state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
  };

  const contactCards = [
    // {
    //   icon: <MapPin className="w-6 h-6" />,
    //   title: 'Odwiedź nas',
    //   description: 'Zapraszamy do naszej siedziby',
    //   details: [contactInfo.address.street, contactInfo.address.city],
    //   cta: {
    //     text: 'Zobacz na mapie',
    //     url: 'https://goo.gl/maps',
    //   },
    //   color: 'bg-blue-50 text-blue-600',
    //   hoverColor: 'group-hover:bg-blue-100',
    // },
    {
      icon: <Mail className="w-7 h-7" />,
      title: 'Napisz do nas',
      description: 'Odpowiadamy na wszystkie wiadomości',
      details: [contactInfo.email.primary, contactInfo.email.secondary],
      cta: {
        text: 'Wyślij email',
        url: `mailto:${contactInfo.email.primary}`,
      },
      color: 'bg-green-50 text-green-600',
      hoverColor: 'group-hover:bg-green-100',
      bgGradient: 'from-green-50 to-green-100/50',
      borderColor: 'border-green-200',
      shadowColor: 'shadow-green-100/50',
      accentColor: 'green-500',
      copyable: true,
      copyType: 'email',
    },
    {
      icon: <Phone className="w-7 h-7" />,
      title: 'Zadzwoń do nas',
      description: 'Jesteśmy dostępni telefonicznie',
      details: [contactInfo.phone.primary, contactInfo.phone.secondary],
      cta: {
        text: 'Zadzwoń teraz',
        url: `tel:${contactInfo.phone.primary.replace(/\s/g, '')}`,
      },
      color: 'bg-purple-50 text-purple-600',
      hoverColor: 'group-hover:bg-purple-100',
      bgGradient: 'from-purple-50 to-purple-100/50',
      borderColor: 'border-purple-200',
      shadowColor: 'shadow-purple-100/50',
      accentColor: 'purple-500',
      copyable: true,
      copyType: 'phone',
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: 'Godziny pracy',
      description: 'Kiedy jesteśmy dostępni',
      details: [contactInfo.hours.weekdays, contactInfo.hours.weekend],
      color: 'bg-amber-50 text-amber-600',
      hoverColor: 'group-hover:bg-amber-100',
      bgGradient: 'from-amber-50 to-amber-100/50',
      borderColor: 'border-amber-200',
      shadowColor: 'shadow-amber-100/50',
      accentColor: 'amber-500',
    },
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="container mx-auto px-4 -mt-20 z-20 relative">
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {contactCards.map((card, index) => (
          <motion.div
            variants={item}
            key={index}
            className={`bg-gradient-to-br ${card.bgGradient} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 border ${card.borderColor} flex flex-col group backdrop-blur-sm ${card.shadowColor} hover:-translate-y-1`}
            whileHover={{ scale: 1.02 }}
          >
            <div
              className={`${card.color} ${card.hoverColor} w-18 h-18 rounded-2xl flex items-center justify-center mb-6 transition-colors shadow-lg p-4 group-hover:scale-110 duration-300`}
            >
              {card.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-secondary transition-colors">
              {card.title}
            </h3>
            <p className="text-gray-500 mb-6 text-md">{card.description}</p>

            <div className="space-y-3 mb-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-md">
              {card.details.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0 group/detail"
                >
                  <span className="font-medium text-gray-800 group-hover/detail:text-gray-900">
                    {detail}
                  </span>

                  {/* Copy button for email and phone */}
                  {card.copyable && (
                    <button
                      onClick={() =>
                        copyToClipboard(detail, card.copyType + idx)
                      }
                      className={`text-gray-400 hover:text-${card.accentColor} p-2 rounded-full hover:bg-gray-100 transition-colors`}
                      aria-label={`Kopiuj ${detail}`}
                      title={`Kopiuj ${detail}`}
                    >
                      {copied === card.copyType + idx ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>

            {card.cta && (
              <motion.a
                href={card.cta.url}
                className={`mt-auto inline-flex items-center text-${card.accentColor} hover:text-secondary/80 font-medium text-sm group/cta bg-white py-3 px-5 rounded-full shadow-md hover:shadow-lg transition-all self-start`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {card.cta.text}
                <motion.span
                  className="ml-1 inline-flex items-center"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                >
                  <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
                </motion.span>
              </motion.a>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
