'use client';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, ShoppingCart, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setActiveCard] = useState(0);
  const [, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Advanced parallax and transforms
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Auto-rotating cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Function to scroll to products section
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Function to scroll to about section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about-section');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <section
        ref={containerRef}
        className="relative min-h-screen overflow-hidden text-white"
        onMouseEnter={() => setIsHovering(false)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Background Image with Parallax - Much Brighter */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          }}
        >
          <div className="relative w-full h-[120vh]">
            <Image
              src="/products-bg.jpg"
              alt="Veterinary professional examining a golden retriever in modern clinic"
              fill
              sizes="100vw"
              priority
              className="object-cover object-center"
              quality={95}
            />
            {/* Much lighter overlay for brightness */}
            <div className="absolute inset-0 bg-black/30" />
            {/* Gradient overlays - lighter */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/30 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
            {/* Secondary color accent overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-transparent to-secondary/10 mix-blend-overlay" />
          </div>
        </motion.div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-20 pointer-events-none">
          {/* Floating Particles */}
          {[
            { x: 150, y: 100, animateX: 300, animateY: 200 },
            { x: 800, y: 300, animateX: 950, animateY: 450 },
            { x: 400, y: 150, animateX: 550, animateY: 300 },
            { x: 1200, y: 400, animateX: 1350, animateY: 550 },
            { x: 200, y: 600, animateX: 350, animateY: 750 },
            { x: 1000, y: 200, animateX: 1150, animateY: 350 },
            { x: 600, y: 500, animateX: 750, animateY: 650 },
            { x: 300, y: 800, animateX: 450, animateY: 950 },
            { x: 1400, y: 300, animateX: 1550, animateY: 450 },
            { x: 100, y: 400, animateX: 250, animateY: 550 },
            { x: 900, y: 700, animateX: 1050, animateY: 850 },
            { x: 500, y: 50, animateX: 650, animateY: 200 },
          ].map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-secondary/60 rounded-full shadow-lg"
              initial={{
                x: particle.x,
                y: particle.y,
              }}
              animate={{
                x: particle.animateX,
                y: particle.animateY,
              }}
              transition={{
                duration: 12 + i * 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: i * 1.5,
              }}
            />
          ))}

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-20 h-20 border-2 border-secondary/30 rounded-full"
            animate={{
              rotate: 360,
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <motion.div
            className="absolute bottom-1/3 left-1/5 w-16 h-16 border-2 border-blue-400/30 rounded-lg"
            animate={{
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Additional floating geometric shapes */}
          <motion.div
            className="absolute top-1/2 left-1/6 w-3 h-3 bg-secondary/50 rounded-full"
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Centered Main Content */}
        <motion.div
          className="container mx-auto px-4 h-screen relative z-30 flex items-center justify-center"
          style={{ opacity }}
        >
          <div className="max-w-6xl mx-auto text-center">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-secondary/40 bg-white/10 backdrop-blur-lg mb-8"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-3 h-3 bg-secondary rounded-full"
              />
              <span className="text-secondary font-medium text-lg">
                Sprzęt Weterynaryjny Premium
              </span>
            </motion.div>

            {/* Main Heading - Centered */}
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-none mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-white"
              >
                VetDesign
              </motion.span>
              <motion.span
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="block"
              >
                <span className="text-white">Nowa </span>
                <span className="bg-gradient-to-r from-secondary via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  jakość
                </span>
              </motion.span>
              <motion.span
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="block text-white/95"
              >
                w Weterynarii
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto mb-8"
            >
              Dostarczamy nowoczesne, skuteczne i niezawodne produkty, które
              spełniają najwyższe standardy opieki weterynaryjnej.
            </motion.p>

            {/* Centered Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
            >
              {[
                { value: 15, label: 'Lat doświadczenia', suffix: '+' },
                { value: 500, label: 'Zadowolonych klinik', suffix: '+' },
                { value: 100, label: 'Polskie produkty', suffix: '%' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 100,
                    delay: 1.4 + index * 0.1,
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="text-4xl font-bold text-secondary mb-2">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <div className="text-white/80 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Centered CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <Link href="/produkty">
                  <Button
                    size="lg"
                    className="h-16 px-10 bg-secondary hover:bg-secondary/90 text-black font-bold rounded-2xl shadow-2xl transition-all duration-300 group flex items-center gap-4 border-0 relative overflow-hidden text-lg"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <ShoppingCart className="w-6 h-6 relative z-10 text-white" />
                    <span className="relative z-10 text-white">
                      Odkryj produkty
                    </span>
                    <ArrowRight className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:translate-x-1 text-white" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToAbout}
                  className="h-16 px-10 rounded-2xl border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300 font-bold group flex items-center gap-4 text-lg bg-transparent backdrop-blur-lg cursor-pointer"
                >
                  <Info className="w-5 h-5 text-white" />
                  <span className="text-white">O nas</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-white" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Centered Feature Cards */}
            {/* <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-center group cursor-pointer"
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    rotateY: 5,
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onClick={() => setActiveCard(index)}
                >
                  <motion.div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-xl`}
                    animate={{
                      rotate: activeCard === index ? 360 : 0,
                    }}
                    transition={{
                      rotate: { duration: 2, ease: 'easeInOut' },
                    }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div> */}
          </div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          style={{ y: y3 }}
          onClick={scrollToProducts}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="w-8 h-14 border-2 border-secondary/70 rounded-full flex justify-center backdrop-blur-lg bg-white/10 hover:border-secondary transition-colors duration-300"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-2 h-6 bg-gradient-to-b from-secondary to-orange-400 rounded-full mt-2"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
