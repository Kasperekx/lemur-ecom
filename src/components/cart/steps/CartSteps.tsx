'use client';

import { useCartStore } from '@/store/cartStore';
import { usePathname } from 'next/navigation';
import { ProgressBar, StepItem } from './StepItem';

export const steps = [
  { path: '/koszyk', label: 'Koszyk' },
  { path: '/koszyk/adres', label: 'Dane' },
  { path: '/koszyk/platnosc', label: 'Płatność' },
  { path: '/koszyk/potwierdzenie', label: 'Potwierdzenie' },
] as const;

export function CartSteps() {
  const currentPath = usePathname();
  const currentStepIndex = steps.findIndex((step) => step.path === currentPath);
  const cartItems = useCartStore((state) => state.getTotalItems());

  return (
    <>
      {cartItems > 0 && (
        <div className="w-full bg-white border-b">
          <div className="container mx-auto px-3 sm:px-4 py-4">
            <div className="relative">
              <ProgressBar
                currentStepIndex={currentStepIndex}
                totalSteps={steps.length}
              />

              <div className="relative flex justify-between">
                {steps.map((step, index) => (
                  <StepItem
                    key={step.label}
                    step={step}
                    index={index}
                    isCompleted={index < currentStepIndex}
                    isCurrent={index === currentStepIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
