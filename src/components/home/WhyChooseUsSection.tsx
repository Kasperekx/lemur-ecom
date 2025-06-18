'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  LightBulbIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const WhyChooseUsSection = () => {
  const [activeCard, setActiveCard] = useState(0);

  const reasons = [
    {
      title: 'Produkcja w Polsce',
      description:
        'Projektujemy i produkujemy pozycjonery, maty weterynaryjne i akcesoria w naszych zakładach w Polsce',
      icon: LightBulbIcon,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
      features: [
        'Pozycjonery chirurgiczne',
        'Maty weterynaryjne',
        'Akcesoria stołów',
      ],
    },
    {
      title: 'Materiały Premium',
      description:
        'Używamy tylko najwyższej jakości materiałów odpornych na dezynfekcję i wielokrotne użycie',
      icon: ShieldCheckIcon,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      features: [
        'Materiały medyczne',
        'Odporne na dezynfekcję',
        'Długa żywotność',
      ],
    },
    {
      title: 'Doświadczenie Praktyczne',
      description:
        'Współpracujemy z lekarzami weterynarii, tworząc produkty dopasowane do realnych potrzeb',
      icon: AcademicCapIcon,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-teal-50',
      features: [
        'Konsultacje z weterynarzami',
        'Testy w praktyce',
        'Dostosowanie do potrzeb',
      ],
    },
  ];

  const testimonials = [
    {
      quote:
        'VetDesign zrewolucjonizował naszą praktykę. Sprzęt jest niezawodny i intuicyjny.',
      author: 'Dr. Anna Kowalska',
      role: 'Kierownik Kliniki Weterynarii',
      image:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
    },
    {
      quote:
        'Jakość produktów VetDesign znacząco poprawiła nasze możliwości diagnostyczne.',
      author: 'Dr. Piotr Nowak',
      role: 'Specjalista Kardiologii',
      image:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Header */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/10 to-blue-500/10 px-4 py-2 rounded-full mb-6"
          >
            <SparklesIcon className="h-5 w-5 text-secondary" />
            <span className="text-secondary font-medium">
              Dlaczego jesteśmy liderami
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-secondary via-blue-500 to-purple-500 bg-clip-text text-transparent">
              VetDesign
            </span>
            <br />
            <span className="text-gray-900">to przyszłość</span>
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Łączymy dekady doświadczenia z najnowszymi technologiami, tworząc
            rozwiązania, które zmieniają oblicze weterynarii.
          </p>
        </motion.div>

        {/* Interactive Reasons Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onMouseEnter={() => setActiveCard(index)}
              className={`
                relative p-8 rounded-3xl cursor-pointer transition-all duration-500
                ${
                  activeCard === index
                    ? reason.bgColor + ' scale-105 shadow-2xl'
                    : 'bg-white shadow-lg hover:shadow-xl'
                }
                border border-gray-100 group
              `}
            >
              {/* Animated background gradient */}
              <motion.div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${reason.color} opacity-0 transition-opacity duration-500`}
                animate={{ opacity: activeCard === index ? 0.1 : 0 }}
              />

              {/* Icon with animation */}
              <motion.div
                className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${reason.color} mb-6`}
                animate={{
                  scale: activeCard === index ? 1.1 : 1,
                  rotate: activeCard === index ? 5 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <reason.icon className="h-8 w-8 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {reason.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {reason.description}
              </p>

              {/* Features list with animations */}
              <div className="space-y-3">
                {reason.features.map((feature, idx) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircleIcon className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Hover arrow */}
              <motion.div
                className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ x: activeCard === index ? 5 : 0 }}
              >
                <ArrowRightIcon className="h-6 w-6 text-secondary" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Co mówią o nas{' '}
              <span className="bg-gradient-to-r from-secondary to-blue-500 bg-clip-text text-transparent">
                eksperci
              </span>
            </h3>
            <p className="text-gray-600">Opinie specjalistów z całego świata</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
