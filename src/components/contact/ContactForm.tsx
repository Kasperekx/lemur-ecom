'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  email: z.string().email('Nieprawidłowy adres email'),
  subject: z.string().min(2, 'Temat jest wymagany'),
  message: z.string().min(10, 'Wiadomość musi mieć minimum 10 znaków'),
});

export function ContactForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();

      formData.append('_wpcf7', '109');
      formData.append('_wpcf7_version', '5.7.7');
      formData.append('_wpcf7_locale', 'pl_PL');
      formData.append('_wpcf7_unit_tag', `wpcf7-f109-p1-o1`);
      formData.append('_wpcf7_container_post', '0');

      formData.append('your-email', data.email);
      formData.append('your-subject', data.subject);
      formData.append('your-message', data.message);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/109/feedback/`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();
      console.log('Response:', result);

      if (result.status === 'mail_sent') {
        toast({
          variant: 'success',
          title: '✅ Wiadomość wysłana!',
          description:
            'Dziękujemy za kontakt. Odpowiemy najszybciej jak to możliwe.',
          duration: 5000,
        });
        reset();
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            {...register('email')}
            className="w-full p-3 border rounded-md"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            placeholder="Temat"
            {...register('subject')}
            className="w-full p-3 border rounded-md"
          />
          {errors.subject && (
            <p className="text-sm text-red-500">{errors.subject.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Textarea
            placeholder="Twoja wiadomość"
            className="w-full p-3 border rounded-md min-h-[150px]"
            {...register('message')}
          />
          {errors.message && (
            <p className="text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-secondary hover:bg-primary/90 text-white py-6 rounded-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
        </Button>
      </form>
    </div>
  );
}
