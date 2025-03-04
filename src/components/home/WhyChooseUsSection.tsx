import Image from 'next/image';

const WhyChooseUsSection = () => {
  const features = [
    'Innowacyjność',
    'Doświadczenie',
    'Wsparcie 24/7',
    'Jakość',
  ];
  return (
    <section className="relative overflow-hidden py-28 container mx-auto lg:px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
        <div className="space-y-8">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
              Dlaczego my?
            </h2>
            <div className="absolute -left-6 top-0 w-1 h-36 bg-secondary transform transition-all duration-500 hover:scale-y-110" />
          </div>

          <div className="space-y-6 text-gray-600 text-lg">
            <p>
              W Vetdesign stawiamy na{' '}
              <span className="text-secondary font-semibold">jakość</span>,{' '}
              <span className="text-secondary font-semibold">
                innowacyjność
              </span>{' '}
              i{' '}
              <span className="text-secondary font-semibold">
                indywidualne podejście
              </span>
              .
            </p>
            <p>
              Wyróżnia nas precyzja, niezawodność oraz pełne zrozumienie wyzwań,
              przed jakimi staje współczesna weterynaria.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6">
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative aspect-square md:min-h-[600px] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/test-1.png"
            fill
            alt="Why choose Vetdesign"
            className="object-cover transition-transform duration-700 hover:scale-105"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
