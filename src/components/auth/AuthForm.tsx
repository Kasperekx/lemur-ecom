import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, DefaultValues, Path } from 'react-hook-form';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useToast } from '@/hooks/use-toast';
interface AuthFormProps<T extends z.ZodObject<z.ZodRawShape>> {
  formSchema: T;
  onSubmit: (
    values: z.infer<T>
  ) => Promise<{ success: boolean; error?: string }>;
  fields: {
    name: Path<z.infer<T>>;
    label: string;
    type?: string;
    placeholder?: string;
  }[];
  submitText: string;
  loadingText: string;
  redirectPath?: string;
  successMessage?: string;
}

export function AuthForm<T extends z.ZodObject<z.ZodRawShape>>({
  formSchema,
  onSubmit,
  fields,
  submitText,
  loadingText,
  redirectPath,
}: AuthFormProps<T>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(formSchema),
    defaultValues: fields.reduce((acc, field) => {
      return { ...acc, [field.name]: '' };
    }, {} as DefaultValues<z.infer<T>>),
  });

  async function handleSubmit(values: z.infer<T>) {
    try {
      setLoading(true);
      setError('');

      const result = await onSubmit(values);

      if (result.success) {
        toast({
          variant: 'success',
          title: '✅ Zalogowano pomyślnie!',
          description: 'Przekierowanie do strony głównej...',
          duration: 2000,
        });

        if (redirectPath) {
          setTimeout(() => {
            router.push(redirectPath);
          }, 1500);
        }
      } else {
        setError(result.error || 'Wystąpił błąd');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-6">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertDescription>{error.replace(/<[^>]*>/g, '')}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {fields.map((field) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: fieldProps }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <Input
                      type={field.type || 'text'}
                      placeholder={field.placeholder}
                      {...fieldProps}
                    />
                    </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? loadingText : submitText}
          </Button>
        </form>
      </Form>
    </>
  );
}
