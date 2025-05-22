'use client';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Cpu,
  Microscope,
  Stethoscope,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef } from 'react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const textChildVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Feature icon positions with orbital animation paths
  const featurePositions = [
    {
      Icon: Microscope,
      label: 'Precyzja',
      initialPosition: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2',
      animate: {
        x: [0, -15, 0, 15, 0],
        y: [0, 10, 20, 10, 0],
        transition: {
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      },
    },
    {
      Icon: Cpu,
      label: 'Innowacja',
      initialPosition: 'top-1/2 right-0 translate-x-1/3 -translate-y-1/2',
      animate: {
        x: [0, 10, 0, -10, 0],
        y: [0, 15, 0, -15, 0],
        transition: {
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        },
      },
    },
    {
      Icon: Stethoscope,
      label: 'Opieka',
      initialPosition: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3',
      animate: {
        x: [0, 20, 0, -20, 0],
        y: [0, -10, -5, -10, 0],
        transition: {
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        },
      },
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative flex items-center justify-center overflow-hidden py-24 md:py-32 lg:py-64"
    >
      {/* Modern background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-secondary/5 to-white/80"></div>

        {/* Mesh gradient effect */}
        <div className="absolute inset-0 opacity-20 mix-blend-multiply">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-50 to-transparent rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-3/4 h-1/2 bg-gradient-to-tl from-secondary/30 to-transparent rounded-full filter blur-3xl"></div>
        </div>

        {/* Modern dot pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            maskImage:
              'radial-gradient(circle, rgba(0,0,0,1) 30%, transparent 80%)',
          }}
        ></div>

        {/* Animated abstract elements */}
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 bg-blue-200/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 15, 0],
            scale: [1, 1.05, 1],
            transition: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-20 w-96 h-96 bg-secondary/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, -15, 0],
            scale: [1, 1.05, 1],
            transition: { duration: 15, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      </div>

      {/* Content container with improved spacing */}
      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          {/* Text content - now taking 3/5 of the space on larger screens */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="md:col-span-3 text-left md:pr-8"
          >
            <motion.div variants={textChildVariants} className="mb-2">
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-secondary/10 text-secondary mb-6">
                Innowacyjna Diagnostyka
              </span>
            </motion.div>

            <motion.h1
              variants={textChildVariants}
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6"
            >
             Nowa jakość w{' '} 
              <span className="bg-gradient-to-r from-secondary to-blue-500 bg-clip-text text-transparent">
              Weterynarii
              </span>{' '}
            </motion.h1>

            <motion.p
              variants={textChildVariants}
              className="text-lg text-gray-600 leading-relaxed mb-8"
            >
              Łączymy precyzję laboratoryjną z najnowszą technologią, aby
              zapewnić Twoim pacjentom najlepszą opiekę i diagnozę na miarę XXI
              wieku.
            </motion.p>

            <motion.div
              variants={textChildVariants}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Link href="/produkty" passHref>
                <Button
                  size="lg"
                  className="h-12 px-8 bg-secondary hover:bg-secondary/90 text-white rounded-md shadow-lg transition-all duration-300 group flex items-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Odkryj produkty</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/o-nas" passHref>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 rounded-md bg-white/80 backdrop-blur-sm border-gray-200 text-gray-700 hover:border-gray-400 hover:bg-white hover:text-gray-900 transition-all duration-300"
                >
                  Dowiedz się więcej
                </Button>
              </Link>
            </motion.div>

            {/* Statistics section - new addition */}
            <motion.div
              variants={textChildVariants}
              className="grid grid-cols-3 gap-4 mt-8 border-t border-gray-100 pt-8"
            >
              {[
                { value: '98%', label: 'Dokładność' }, // ustalenie odpowiednich statystyk
                { value: '24h', label: 'Szybki czas realizacji' },
                { value: '2000+', label: 'Zadowolonych klinik' },
              ].map((stat) => (
                <div key={stat.label} className="text-left">
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual content - taking 2/5 of the space */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="md:col-span-2 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              {/* Main feature visual - modern blob with icon arrangement */}
              <div className="relative aspect-square rounded-full bg-gradient-to-br from-white to-gray-50 p-12 shadow-xl shadow-secondary/5 border border-gray-100 flex items-center justify-center">
                <motion.div
                  className="absolute inset-2 rounded-full overflow-hidden"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(243,244,246,0.4))',
                  }}
                />

                {/* Animated floating icons around the blob */}
                {featurePositions.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    className={`absolute ${feature.initialPosition} flex flex-col items-center z-10`}
                    custom={index}
                    initial="hidden"
                    animate={['visible', feature.animate]}
                    variants={featureVariants}
                  >
                    <motion.div
                      className="w-16 h-16 mb-2 rounded-full bg-white flex items-center justify-center shadow-lg border border-gray-100"
                      whileHover={{ scale: 1.1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <feature.Icon className="w-7 h-7 text-secondary" />
                    </motion.div>
                    <span className="text-sm font-medium bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                      {feature.label}
                    </span>
                  </motion.div>
                ))}

                {/* Central image - larger now */}
                <div className="relative z-10 w-64 h-64 rounded-full overflow-hidden shadow-lg border-2 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=400&auto=format&fit=crop"
                    alt="Veterinary science"
                    fill
                    sizes="(max-width: 768px) 160px, 256px"
                    priority
                    className="object-cover"
                    style={{
                      objectPosition: 'center',
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-transparent mix-blend-overlay"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
