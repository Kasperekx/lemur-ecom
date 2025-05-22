'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight, Award, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const AboutSection = () => {
  const features = [
    {
      name: 'Innowacyjne produkty',
      icon: CheckCircle,
      description:
        'Nasze produkty są zaprojektowane z myślą o nowoczesnej weterynarii, łącząc technologię z pasją do zwierząt',
    },
    {
      name: 'Współpraca z Ekspertami',
      icon: CheckCircle,
      description:
        'Nasze rozwiązania są tworzone we współpracy z doświadczonymi lekarzami weterynarii',
    },
    {
      name: 'Najwyższa Jakość',
      icon: CheckCircle,
      description:
        'Dbamy o najwyższą jakość naszych produktów i usług, zapewniając niezawodność',
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.6,
        ease: [0.12, 0.93, 0.42, 1],
      },
    }),
  };

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-secondary/5"></div>

        {/* Subtle patterns */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(0,0,0,0.2) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        ></div>

        {/* Decorative gradients */}
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 to-transparent rounded-full filter blur-3xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.05, 1],
            transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        <motion.div
          className="absolute -bottom-40 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-secondary/10 to-transparent rounded-full filter blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, -20, 0],
            scale: [1, 1.03, 1],
            transition: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="lg:grid lg:grid-cols-12 lg:gap-x-16 lg:items-center"
        >
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <motion.div variants={itemVariants} className="space-y-4">
              <span className="inline-block text-secondary bg-secondary/10 px-3 py-1 rounded-full text-xs font-medium">
                Poznaj nas bliżej
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                <span className="bg-gradient-to-r from-secondary to-blue-500 bg-clip-text text-transparent">
                  Przyszłość weterynarii{' '}
                </span>
                zaczyna się tutaj
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Vetdesign to nie tylko firma - to wizja przyszłości weterynarii.
              Laczymy technologie z głęboką pasją do opieki nad zwierzętami.
              Nasze innowacyjne rozwiązania są tworzone z myślą o lekarzach
              weterynarii, aby wspierać ich w codziennej pracy i podnosić jakość
              opieki nad zwierzętami.
            </motion.p>

            <motion.div variants={itemVariants} className="space-y-6 pt-2">
              {features.map((feature) => (
                <motion.div
                  key={feature.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  className="flex items-start gap-4 justify-center lg:justify-start bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start"
            >
              <Link href="/produkty">
                <Button
                  size="lg"
                  className="h-12 px-8 bg-secondary hover:bg-secondary/90 text-white rounded-md shadow-lg transition-all duration-300 group flex items-center gap-2"
                >
                  Nasze Produkty
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="mt-16 lg:mt-0 lg:col-span-6 relative">
            <div className="relative">
              {/* Image container with decorative elements */}
              <motion.div
                variants={itemVariants}
                className="relative z-10 rounded-2xl shadow-2xl overflow-hidden aspect-[4/3]"
              >
                <Image
                  src="https://plus.unsplash.com/premium_photo-1661942274165-00cc8d55a93f?q=80&w=2069&auto=format&fit=crop"
                  fill
                  alt="Mikroskop w laboratorium symbolizujący zaawansowaną technologię weterynaryjną"
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 90vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent mix-blend-multiply"></div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20">
                  <div className="absolute top-0 right-0 w-full h-full bg-white/20 backdrop-blur-sm transform rotate-45 translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </motion.div>

              {/* Stats cards overlaid on the image */}
              <div className="absolute z-20 -bottom-6 -left-6 flex gap-4">
                {[
                  {
                    value: '10+',
                    label: 'Lat doświadczenia',
                    icon: Clock,
                    delay: 0,
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    custom={index}
                    variants={statsVariants}
                    className="bg-white rounded-lg shadow-lg p-4 flex items-center gap-3 border border-gray-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
