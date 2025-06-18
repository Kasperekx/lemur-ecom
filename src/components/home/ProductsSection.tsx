'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import { WPProduct } from '@/types/wordpress';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProductsSectionProps {
  products: WPProduct[];
}

const ProductsSection = ({ products }: ProductsSectionProps) => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemAnimation = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      id="products-section"
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50/50 to-secondary/5"></div>

        {/* Multiple layered patterns */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(0,0,0,0.2) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        ></div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        ></div>

        {/* Decorative gradients - enhanced */}
        <motion.div
          className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-gradient-to-br from-secondary/15 to-blue-400/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
            transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        <motion.div
          className="absolute -left-32 bottom-0 w-72 h-72 rounded-full bg-gradient-to-tr from-blue-400/15 to-secondary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
            transition: {
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            },
          }}
        />

        {/* Additional floating elements */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-gradient-to-br from-yellow-300/10 to-orange-300/10 blur-2xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
            scale: [1, 1.05, 1],
            transition: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
          }}
        />

        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-20 left-1/4 w-4 h-4 bg-secondary/20 rounded-full"
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute top-1/2 right-1/5 w-6 h-6 border-2 border-blue-400/30 rounded-lg rotate-45"
          animate={{
            rotate: [45, 405, 45],
            y: [0, -20, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/6 w-3 h-3 bg-gradient-to-br from-secondary/40 to-blue-400/40 rounded-full"
          animate={{
            x: [0, 25, 0],
            y: [0, -15, 0],
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.9, 0.5],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        {/* Large decorative circles */}
        <motion.div
          className="absolute top-1/4 left-0 w-32 h-32 border border-secondary/10 rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-0 w-24 h-24 border border-blue-400/10 rounded-full"
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, -180, -360],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
            delay: 0.5,
          }}
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-secondary/40 rounded-full"
            style={{
              left: `${20 + i * 10}%`,
              top: `${30 + i * 8}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Animated mesh gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 90%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
            `,
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Subtle wave pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(59, 130, 246, 0.1) 10px,
                rgba(59, 130, 246, 0.1) 11px
              )
            `,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-20">
        {/* Enhanced Section Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeIn}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <span className="inline-flex items-center gap-2 text-secondary bg-secondary/10 px-4 py-1.5 rounded-full text-xs font-medium mb-6 backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              Oferta Produktowa
            </span>

            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-secondary to-blue-500 bg-clip-text text-transparent">
                Zaawansowane rozwiązania{' '}
              </span>
              dla weterynarii
            </h2>
          </motion.div>

          <motion.p
            className="text-lg text-gray-600 leading-relaxed mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Odkryj nasze innowacyjne produkty zaprojektowane z myślą o
            nowoczesnej praktyce weterynaryjnej. Każde rozwiązanie łączy w sobie
            najwyższą jakość z funkcjonalnością.
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {products.slice(0, 6).map((product) => (
            <motion.div
              key={product.id}
              variants={itemAnimation}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 relative backdrop-blur-sm isolate cursor-pointer"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <Link
                href={`/produkty/${product.slug}`}
                className="block absolute inset-0 z-10"
                aria-label={`View ${product.name} details`}
              >
                <span className="sr-only">View {product.name}</span>
              </Link>

              {/* Enhanced Card Top Accent */}
              <div className="absolute h-1 top-0 left-0 right-0 bg-gradient-to-r from-secondary/60 via-blue-400/80 to-secondary/60 z-0"></div>

              <div className="aspect-[4/3] relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                {product.images && product.images.length > 0 && (
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt || product.name}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:saturate-110"
                  />
                )}

                {/* Enhanced image overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-blue-400/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Price tag - Enhanced */}
                {product.price && (
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-semibold text-gray-900 shadow-lg border border-gray-100 transition-all duration-300 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary group-hover:shadow-xl z-0">
                    {product.price} zł
                  </div>
                )}
              </div>

              <div className="p-6 relative">
                {/* Enhanced decorative accent */}
                <div className="absolute -left-1 top-6 w-3 h-12 bg-gradient-to-b from-secondary/30 to-blue-400/30 rounded-r-full"></div>

                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-secondary transition-colors duration-200">
                  {product.name}
                </h3>

                <div
                  className="text-gray-600 line-clamp-2 mb-6 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: product.short_description || '',
                  }}
                />

                <div className="pt-3 border-t border-gray-100">
                  <div className="inline-flex items-center text-secondary font-semibold text-sm gap-2 group-hover:gap-3 transition-all relative z-0">
                    <span className="relative">
                      Dowiedz się więcej
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>

              {/* Enhanced bottom accent with animation */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-blue-400 to-secondary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced View All Button */}
        <motion.div
          className="flex justify-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/produkty">
            <Button
              variant="outline"
              size="lg"
              className="gap-3 group/btn relative overflow-hidden px-8 py-4 border-2 border-secondary/30 hover:border-secondary hover:text-secondary transition-all duration-300 rounded-2xl font-semibold"
            >
              <span className="relative z-10">Zobacz wszystkie produkty</span>
              <span className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-blue-400/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></span>
              <ExternalLink className="h-5 w-5 relative z-10 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
            </Button>
          </Link>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 50 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-gray-100"
        >
          {/* Enhanced CTA Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-secondary/5"></div>
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/10 to-blue-400/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-400/10 to-secondary/10 rounded-full blur-xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Potrzebujesz{' '}
                <span className="bg-gradient-to-r from-secondary to-blue-500 bg-clip-text text-transparent">
                  więcej informacji?
                </span>
              </h3>
              <p className="text-gray-600 md:text-lg leading-relaxed">
                Nasz zespół ekspertów jest gotowy odpowiedzieć na wszystkie
                pytania i pomóc w wyborze odpowiednich rozwiązań
              </p>
            </div>
            <Link href="/kontakt">
              <Button
                size="lg"
                className="bg-gradient-to-r from-secondary to-blue-500 hover:from-secondary/90 hover:to-blue-500/90 text-white shrink-0 px-8 h-16 overflow-hidden group/cta relative rounded-2xl font-semibold shadow-xl"
              >
                <span className="relative z-10">Skontaktuj się z nami</span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/cta:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
