'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export function ContactHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative py-40 md:py-52 overflow-hidden"
    >
      {/* Background image with parallax and overlay */}
      <motion.div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ scale, y }}
      >
        <Image
          src="https://images.unsplash.com/photo-1550853024-fae8cd4be47f?q=80&w=2067&auto=format&fit=crop"
          alt="Lemur background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 to-primary/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>

        {/* Abstract pattern overlay */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="smallGrid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="white"
                  stroke-width="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      ></motion.div>
      <motion.div
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 0.5,
        }}
      ></motion.div>

      {/* Main content */}
      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ opacity }}
      >
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block px-5 py-2 bg-white/20 backdrop-blur-md text-white text-sm font-medium rounded-full mb-8 shadow-xl border border-white/20"
          >
            Jesteśmy tutaj dla Ciebie
          </motion.div>

          <div className="flex flex-col items-center justify-center space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold mb-2 text-white tracking-tight"
            >
              <div className="overflow-hidden py-1">
                <motion.span
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="inline-block"
                >
                  Skontaktuj się
                </motion.span>
              </div>
              <div className="overflow-hidden py-1">
                <motion.span
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="inline-block relative"
                >
                  <span className="relative">
                    z nami
                    <span className="absolute -bottom-3 left-0 w-full h-1.5 bg-orange-400 rounded-full"></span>
                  </span>
                </motion.span>
              </div>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-white/90 text-xl max-w-2xl mx-auto my-10 leading-relaxed"
          >
            Masz pytania? Jesteśmy tutaj, aby pomóc. Wyślij nam wiadomość, a
            odpowiemy najszybciej jak to możliwe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <motion.a
              href="#contact-form"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-secondary rounded-full font-medium hover:bg-gray-100 transition-colors shadow-2xl hover:shadow-orange-500/20 transform"
            >
              Napisz do nas
            </motion.a>
            <motion.a
              href="tel:+48123456789"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent text-white rounded-full font-medium border-2 border-white/30 hover:border-white/80 transition-colors backdrop-blur-sm shadow-xl"
            >
              Zadzwoń teraz
            </motion.a>
          </motion.div>

          {/* Decorative circles */}
          <div className="flex justify-center mt-16 space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                className="w-2 h-2 bg-white rounded-full"
              ></motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Wave divider with animation */}
      {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg
          className="relative block w-full h-24"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            fill="#ffffff"
            opacity=".8"
          ></path>
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            fill="#ffffff"
            opacity=".5"
          ></path>
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            fill="#ffffff"
          ></path>
        </svg>
      </div> */}
    </motion.div>
  );
}
