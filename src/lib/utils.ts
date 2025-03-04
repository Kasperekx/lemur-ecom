import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import https from 'https';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const agent = new https.Agent({
  rejectUnauthorized: false,
});

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, '');
}
