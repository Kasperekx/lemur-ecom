'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';
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
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(#3b82f6 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px',
          }}
        ></div>
        <motion.div
          className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-blue-100/30 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
            transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        <motion.div
          className="absolute -left-32 bottom-0 w-72 h-72 rounded-full bg-secondary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            transition: {
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            },
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-20"
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
          >
            <span className="inline-block px-4 py-1.5 text-xs font-medium rounded-full bg-secondary/10 text-secondary mb-6 backdrop-blur-sm">
              Oferta Produktowa
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Zaawansowane rozwiązania dla weterynarii
          </motion.h2>

          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Odkryj nasze innowacyjne produkty zaprojektowane z myślą o
            nowoczesnej praktyce weterynaryjnej
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
              className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 relative backdrop-blur-sm isolate cursor-pointer"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <Link
                href={`/produkty/${product.slug}`}
                className="block absolute inset-0 z-10"
                aria-label={`View ${product.name} details`}
              >
                <span className="sr-only">View {product.name}</span>
              </Link>

              {/* Card Top Accent */}
              <div className="absolute h-1 top-0 left-0 right-0 bg-gradient-to-r from-secondary/40 via-blue-400/60 to-secondary/40 z-0"></div>

              <div className="aspect-[4/3] relative bg-gray-50 overflow-hidden">
                {product.images && product.images.length > 0 && (
                  <Image
                    src={product.images[0].src}
                    alt={product.images[0].alt || product.name}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:saturate-110"
                  />
                )}

                {/* Image overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-secondary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Price tag - Assuming there's a price in the product data */}
                {product.price && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-medium text-gray-900 shadow-sm border border-gray-100 transition-all duration-300 group-hover:bg-secondary group-hover:text-white group-hover:border-secondary z-0">
                    {product.price} zł
                  </div>
                )}
              </div>

              <div className="p-6 relative">
                {/* Decorative accent */}
                <div className="absolute -left-1 top-6 w-2 h-8 bg-secondary/20 rounded-r-full"></div>

                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-secondary transition-colors duration-200">
                  {product.name}
                </h3>

                <div
                  className="text-gray-600 line-clamp-2 mb-5 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: product.short_description || '',
                  }}
                />

                <div className="pt-2 border-t border-gray-100">
                  <div className="inline-flex items-center text-secondary font-medium text-sm gap-1.5 group-hover:gap-3 transition-all relative z-0">
                    <span className="relative">
                      Dowiedz się więcej
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
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
              className="gap-2 group/btn relative overflow-hidden px-8 border-gray-300 hover:border-secondary hover:text-secondary transition-colors"
            >
              <span className="relative z-10">Zobacz wszystkie produkty</span>
              <span className="absolute inset-0 bg-secondary/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></span>
              <ExternalLink className="h-4 w-4 relative z-10 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring', stiffness: 50 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-4xl mx-auto rounded-2xl p-8 md:p-10 shadow-xl relative overflow-hidden border border-gray-100"
        >
          {/* CTA Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-secondary/5"></div>
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
                Potrzebujesz więcej informacji?
              </h3>
              <p className="text-gray-600 md:text-lg">
                Nasz zespół ekspertów jest gotowy odpowiedzieć na wszystkie
                pytania
              </p>
            </div>
            <Link href="/kontakt">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-white shrink-0 px-8 h-14 overflow-hidden group/cta relative"
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
