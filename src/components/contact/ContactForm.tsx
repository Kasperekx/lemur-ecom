'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { WPProduct } from '@/types/wordpress';
import { useSearchParams } from 'next/navigation';

interface ContactFormProps {
  products: WPProduct[];
}

const formSchema = z.object({
  email: z.string().email('Nieprawidłowy adres email'),
  subject: z.string().min(2, 'Temat jest wymagany'),
  product: z.string().min(1, 'Wybierz produkt'),
  message: z.string().min(10, 'Wiadomość musi mieć minimum 10 znaków'),
});

export function ContactForm({ products }: ContactFormProps) {
  const { toast } = useToast();
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  const [selectedProductText, setSelectedProductText] =
    useState<string>('Wybierz produkt');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: '',
    },
  });

  // Ustaw wybrany produkt na podstawie parametru URL przy ładowaniu komponentu
  useEffect(() => {
    const productSlug = searchParams.get('product');
    if (productSlug) {
      // Szukamy produktu po slugu zamiast po ID
      const selectedProduct = products.find((p) => p.slug === productSlug);
      if (selectedProduct) {
        setValue('product', String(selectedProduct.id));
        setValue('subject', `Zapytanie o produkt: ${selectedProduct.name}`);
        setValue(
          'message',
          `Chciałbym uzyskać więcej informacji o produkcie: ${selectedProduct.name}.`
        );
        setSelectedProductText(selectedProduct.name);

        // Przewinięcie do formularza kontaktowego
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
          setTimeout(() => {
            contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300);
        }
      }
    }
  }, [searchParams, setValue, products]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();

      formData.append('_wpcf7', '109');
      formData.append('_wpcf7_version', '5.7.7');
      formData.append('_wpcf7_locale', 'pl_PL');
      formData.append('_wpcf7_unit_tag', `wpcf7-f65-p1-o1`);
      formData.append('_wpcf7_container_post', '0');

      formData.append('your-email', data.email);
      formData.append('your-subject', data.subject);
      formData.append('your-product', data.product);
      formData.append('your-message', data.message);

      const response = await fetch(
        `https://vetdesign.cfolks.pl/wp-json/contact-form-7/v1/contact-forms/65/feedback/`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();
      console.log('Response:', result);

      if (result.status === 'mail_sent') {
        setSuccess(true);
        toast({
          variant: 'success',
          title: '✅ Wiadomość wysłana!',
          description:
            'Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe.',
          duration: 5000,
        });
        reset();

        // Reset success state after 3 seconds
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        throw new Error(result.message || 'Wystąpił błąd podczas wysyłania');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: '❌ Błąd wysyłania',
        description:
          error instanceof Error
            ? error.message
            : 'Nie udało się wysłać wiadomości. Spróbuj ponownie później.',
        duration: 5000,
      });
    }
  };

  // Obserwujemy wartość pola product
  const selectedProduct = watch('product');

  // Aktualizuj nazwę wybranego produktu
  useEffect(() => {
    if (selectedProduct === 'wszystkie') {
      setSelectedProductText('Wszystkie produkty');
    } else if (selectedProduct) {
      const product = products.find((p) => String(p.id) === selectedProduct);
      if (product) {
        setSelectedProductText(product.name);
      }
    } else {
      setSelectedProductText('Wybierz produkt');
    }
  }, [selectedProduct, products]);

  // Znajdź wybrany produkt
  const productDetails = selectedProduct
    ? products.find((p) => String(p.id) === selectedProduct)
    : null;

  return (
    <AnimatePresence>
      {success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Dziękujemy za wiadomość!
          </h3>
          <p className="text-gray-600 mb-6">
            Odpowiemy najszybciej jak to możliwe.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="text-secondary hover:text-secondary/80 font-medium"
          >
            Wyślij kolejną wiadomość
          </button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1 pl-1">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="Twój adres email"
                  {...register('email')}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all shadow-sm hover:border-gray-300"
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-red-500 mt-1 pl-1"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="space-y-2">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1 pl-1">
                  Temat
                </label>
                <Input
                  placeholder="Temat wiadomości"
                  {...register('subject')}
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all shadow-sm hover:border-gray-300"
                />
                <AnimatePresence>
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-red-500 mt-1 pl-1"
                    >
                      {errors.subject.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="space-y-2">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1 pl-1">
                  Produkt
                </label>
                <Select
                  onValueChange={(value) => {
                    setValue('product', value);
                    // Aktualizuj temat i wiadomość po wybraniu nowego produktu
                    const newSelectedProduct = products.find(
                      (p) => String(p.id) === value
                    );
                    if (newSelectedProduct) {
                      setValue(
                        'subject',
                        `Zapytanie o produkt: ${newSelectedProduct.name}`
                      );
                      setValue(
                        'message',
                        `Chciałbym uzyskać więcej informacji o produkcie: ${newSelectedProduct.name}.`
                      );
                      setSelectedProductText(newSelectedProduct.name);
                    } else if (value === 'wszystkie') {
                      setSelectedProductText('Wszystkie produkty');
                    }
                  }}
                  value={selectedProduct}
                  defaultValue={selectedProduct || ''}
                >
                  <SelectTrigger className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary/30 focus:border-secondary shadow-sm hover:border-gray-300 text-left h-[50px]">
                    <div className="truncate">{selectedProductText}</div>
                    <ChevronDown className="w-4 h-4 opacity-50" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wszystkie" className="cursor-pointer">
                      Wszystkie produkty
                    </SelectItem>
                    {products.map((product) => (
                      <SelectItem
                        key={product.id}
                        value={String(product.id)}
                        className="cursor-pointer"
                      >
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <AnimatePresence>
                  {errors.product && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-red-500 mt-1 pl-1"
                    >
                      {errors.product.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Wyświetl dodatkowe informacje o produkcie, jeśli jest wybrany */}
            {productDetails && selectedProduct !== 'wszystkie' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-gray-50 rounded-xl border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  {productDetails.images && productDetails.images[0] && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-white flex-shrink-0">
                      <img
                        src={productDetails.images[0].src}
                        alt={productDetails.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {productDetails.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {productDetails.short_description ? (
                        <span
                          dangerouslySetInnerHTML={{
                            __html:
                              productDetails.short_description.substring(
                                0,
                                100
                              ) +
                              (productDetails.short_description.length > 100
                                ? '...'
                                : ''),
                          }}
                        />
                      ) : (
                        'Brak krótkiego opisu'
                      )}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="space-y-2">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <label className="block text-sm font-medium text-gray-700 mb-1 pl-1">
                  Wiadomość
                </label>
                <Textarea
                  placeholder="Twoja wiadomość..."
                  className="w-full p-3 border border-gray-200 rounded-xl min-h-[180px] focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-all shadow-sm hover:border-gray-300"
                  {...register('message')}
                />
                <AnimatePresence>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm text-red-500 mt-1 pl-1"
                    >
                      {errors.message.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90 text-white py-6 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-secondary/20 transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Wysyłanie...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Wyślij wiadomość</span>
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
