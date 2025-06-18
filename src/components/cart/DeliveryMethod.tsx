'use client';

import { Truck } from 'lucide-react';

interface DeliveryMethodProps {
  selected: string;
  onSelect: (method: string) => void;
}

export function DeliveryMethod({ selected, onSelect }: DeliveryMethodProps) {
  const methods = [
    {
      id: 'courier',
      name: 'Kurier DPD',
      price: 14.99,
      time: '1-2 dni robocze',
      icon: Truck,
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Wybierz metodę dostawy</h2>
      <div className="space-y-3">
        {methods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer
                      ${
                        selected === method.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200'
                      }`}
          >
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="delivery"
                value={method.id}
                checked={selected === method.id}
                onChange={(e) => onSelect(e.target.value)}
                className="text-orange-500 focus:ring-orange-500"
              />
              <div>
                <div className="flex items-center gap-2">
                  <method.icon className="w-5 h-5" />
                  <span className="font-medium">{method.name}</span>
                </div>
                <p className="text-sm text-gray-500">{method.time}</p>
              </div>
            </div>
            <span className="font-medium">
              {method.price === 0
                ? 'Za darmo'
                : `${method.price.toFixed(2)} zł`}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
