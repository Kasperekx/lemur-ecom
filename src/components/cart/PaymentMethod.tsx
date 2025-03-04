'use client';

import { CreditCard, Wallet } from 'lucide-react';

interface PaymentMethodProps {
  selected: string;
  onSelect: (method: string) => void;
}

export function PaymentMethod({ selected, onSelect }: PaymentMethodProps) {
  const methods = [
    {
      id: 'card',
      name: 'Karta płatnicza',
      description: 'Visa, Mastercard, etc.',
      icon: CreditCard,
    },
    {
      id: 'blik',
      name: 'BLIK',
      description: 'Szybka płatność BLIK',
      icon: Wallet,
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Wybierz metodę płatności</h2>
      <div className="space-y-3">
        {methods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center p-4 rounded-lg border cursor-pointer
                      ${
                        selected === method.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200'
                      }`}
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={selected === method.id}
              onChange={(e) => onSelect(e.target.value)}
              className="text-orange-500 focus:ring-orange-500"
            />
            <div className="ml-4">
              <div className="flex items-center gap-2">
                <method.icon className="w-5 h-5" />
                <span className="font-medium">{method.name}</span>
              </div>
              <p className="text-sm text-gray-500">{method.description}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
