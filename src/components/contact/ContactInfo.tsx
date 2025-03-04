import { Building2, Mail, Phone, Clock } from 'lucide-react';

interface ContactInfoProps {
  info: {
    address: {
      street: string;
      city: string;
    };
    email: {
      primary: string;
      secondary: string;
    };
    phone: {
      primary: string;
      secondary: string;
    };
    hours: {
      weekdays: string;
      weekend: string;
    };
  };
}

export function ContactInfo({ info }: ContactInfoProps) {
  return (
    <div className="lg:col-span-1 grid grid-cols-1 gap-6 content-start h-full">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow h-[120px]">
        <div className="flex items-center gap-4 h-full">
          <div className="bg-purple-100 p-3 rounded-lg shrink-0">
            <Building2 className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Adres</h3>
            <p className="text-gray-600">{info.address.street}</p>
            <p className="text-gray-600">{info.address.city}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow h-[120px]">
        <div className="flex items-center gap-4 h-full">
          <div className="bg-blue-100 p-3 rounded-lg shrink-0">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Email</h3>
            <p className="text-gray-600">{info.email.primary}</p>
            <p className="text-gray-600">{info.email.secondary}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow h-[120px]">
        <div className="flex items-center gap-4 h-full">
          <div className="bg-green-100 p-3 rounded-lg shrink-0">
            <Phone className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Telefon</h3>
            <p className="text-gray-600">{info.phone.primary}</p>
            <p className="text-gray-600">{info.phone.secondary}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow h-[120px]">
        <div className="flex items-center gap-4 h-full">
          <div className="bg-orange-100 p-3 rounded-lg shrink-0">
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Godziny otwarcia</h3>
            <p className="text-gray-600">{info.hours.weekdays}</p>
            <p className="text-gray-600">{info.hours.weekend}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
