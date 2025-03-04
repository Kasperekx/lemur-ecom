import Image from 'next/image';
import { Button } from '@/components/ui/button';

const AboutSection = () => (
  <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-32">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 overflow-hidden rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] bg-white relative">
        <div className="absolute top-0 left-0 w-64 h-64 bg-secondary/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full translate-x-1/2 translate-y-1/2" />

        <div className="relative aspect-square md:aspect-auto md:min-h-[600px] group">
          <Image
            src="/test-1.png"
            fill
            alt="About Vetdesign"
            className="object-cover transition-all duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-8 md:p-5 flex flex-col gap-8 relative z-10">
          <div className="inline-block">
            <span className="text-sm uppercase tracking-wider text-secondary font-medium">
              Poznaj nas bliżej
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mt-2">
              Kim jesteśmy?
              <span className="block w-24 h-1 bg-secondary mt-4 transition-all duration-300 hover:w-36" />
            </h2>
          </div>

          <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
            <p>
              Vetdesign to firma zrodzona z{' '}
              <span className="text-primary font-medium">
                pasji do weterynarii
              </span>{' '}
              i innowacyjnych rozwiązań. Od lat dostarczamy unikalne produkty,
              które wspierają{' '}
              <span className="text-secondary font-medium">
                lekarzy weterynarii
              </span>{' '}
              w codziennej pracy.
            </p>
            <p>
              Stawiamy na nowoczesne technologie, wysoką jakość i indywidualne
              podejście do potrzeb naszych klientów.
            </p>
          </div>

          <Button className="self-start mt-4 px-8 py-6 text-lg hover:scale-105 transition-transform duration-300">
            Dowiedz się więcej
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
