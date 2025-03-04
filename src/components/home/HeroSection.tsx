import { Button } from '@/components/ui/button';
import { ShoppingCart, Info, Truck, Shield, Clock } from 'lucide-react';
import Image from 'next/image';
import { Product } from '../products/product.type';
import Link from 'next/link';
import { createSlug } from '@/utils/strings';
interface ProductsSectionProps {
  products: Product[];
}

const heroInfoItems = [
  {
    icon: <Truck className="w-5 h-5" />,
    text: 'Darmowa dostawa',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    text: 'Gwarancja jakości',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    text: '24/7 Wsparcie',
  },
];

const HeroSection = ({ products }: ProductsSectionProps) => (
  <section className="min-h-screen relative flex items-center overflow-hidden py-28">
    <div className="absolute inset-0 w-full h-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[hsl(240_10%_3.9%/0.75)] 
        via-[hsl(240_10%_3.9%/0.7)] to-[hsl(240_10%_3.9%/0.85)]"
      />
    </div>

    <div className="container relative z-10 mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center lg:px-4">
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="bg-white/10 text-white px-4 py-1 rounded-full text-sm font-semibold inline-block backdrop-blur-sm">
              Nowość
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Nowa jakość <br />
              <span className="text-white/80">w weterynarii</span>
            </h1>

            <p className="text-white/70 text-lg max-w-xl">
              Dostarczamy nowoczesne, skuteczne i niezawodne produkty, które
              spełniają najwyższe standardy opieki weterynaryjnej.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md">
            <Link href="/produkty">
              <Button className="flex-1 bg-secondary hover:bg-secondary/90">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Produkty
              </Button>
            </Link>
            <Button
              variant="outline"
              className="flex-1 border-gray-400 text-gray-300"
            >
              <Info className="w-5 h-5 mr-2" />
              Więcej informacji
            </Button>
          </div>

          <div className="pt-8 border-t border-gray-700">
            <div className="flex flex-wrap gap-6 items-center text-gray-400">
              {heroInfoItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="grid grid-cols-2 gap-4">
              {products.slice(0, 4).map((item) => (
                <Link href={`/produkty/${createSlug(item.name)}`} key={item.id}>
                  <div
                    key={item.id}
                    className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-700/50 transition-all group"
                  >
                    <div className="aspect-square rounded-lg bg-gray-900 mb-3 overflow-hidden">
                      {item.images.length > 0 ? (
                        <Image
                          src={item.images[0].src}
                          alt={item.name || 'Product image'}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                          <p className="text-gray-400">Brak obrazka</p>
                        </div>
                      )}
                    </div>
                    <h3 className="text-gray-200 font-medium">{item.name}</h3>
                    <p className="text-gray-400">{item.price} zł</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
