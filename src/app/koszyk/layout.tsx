import { CartSteps } from '@/components/cart/steps/CartSteps';

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CartSteps />
      {children}
    </>
  );
}
