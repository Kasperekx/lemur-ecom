'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  SparklesIcon,
  AcademicCapIcon,
  PhoneIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/outline';
import { useRef } from 'react';

const WhyChooseUsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const features = [
    {
      name: 'Innowacyjna Technologia',
      icon: SparklesIcon,
      description:
        'Projektujemy sprzęt wykorzystując najnowsze rozwiązania technologiczne',
      color: 'from-purple-500/20 to-blue-500/20',
    },
    {
      name: 'Precyzja Wykonania',
      icon: AcademicCapIcon,
      description:
        'Każdy element jest tworzony z najwyższą dbałością o szczegóły',
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      name: 'Serwis Techniczny',
      icon: PhoneIcon,
      description: 'Zapewniamy kompleksowe wsparcie techniczne i szybki serwis',
      color: 'from-cyan-500/20 to-teal-500/20',
    },
    {
      name: 'Certyfikowana Jakość',
      icon: CheckBadgeIcon,
      description: 'Spełniamy najwyższe standardy bezpieczeństwa i jakości',
      color: 'from-teal-500/20 to-green-500/20',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-20 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,#f0f0f0_12%,transparent_12.5%,transparent_87%,#f0f0f0_87.5%,#f0f0f0_100%)] bg-[length:16px_16px]" />
      </div>

      <motion.div style={{ y, opacity }} className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="text-secondary font-medium px-4 py-2 rounded-full bg-secondary/10 mb-4 inline-block">
              Lider w produkcji sprzętu weterynaryjnego
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Dlaczego <span className="text-secondary">Vetdesign?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-gray-600 text-lg"
          >
            Projektujemy i produkujemy najwyższej jakości sprzęt weterynaryjny,
            łącząc innowacyjne technologie z głębokim zrozumieniem potrzeb
            współczesnej medycyny weterynaryjnej.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                rotateX: 5,
              }}
              className={`
                relative p-6 rounded-2xl
                backdrop-blur-xl bg-white/60
                shadow-[0_8px_30px_rgb(0,0,0,0.06)]
                border border-white/20
                overflow-hidden
                group
              `}
            >
              <div
                className={`
                absolute inset-0 opacity-0 group-hover:opacity-100
                bg-gradient-to-br ${feature.color}
                transition-opacity duration-500
              `}
              />

              <div className="relative z-10">
                <feature.icon className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.name}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Updated Bottom Image Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 relative h-[400px] rounded-3xl overflow-hidden"
        >
          <Image
            src="/test-1.png"
            fill
            alt="Vetdesign manufacturing"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <h3 className="text-3xl font-bold mb-2">Zaawansowana Produkcja</h3>
            <p className="max-w-lg">
              Wykorzystujemy najnowocześniejsze linie produkcyjne i
              rygorystyczne procedury kontroli jakości
            </p>
          </div>
        </motion.div>

        {/* New Section: Manufacturing Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { number: '1000+', label: 'Wyprodukowanych urządzeń' },
            { number: '50+', label: 'Krajów dystrybucji' },
            { number: '15+', label: 'Lat doświadczenia' },
            { number: '99.9%', label: 'Niezawodności' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-secondary mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WhyChooseUsSection;
