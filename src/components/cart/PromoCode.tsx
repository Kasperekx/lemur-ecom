interface PromoCodeProps {
  code: string;
  onCodeChange: (code: string) => void;
}

export function PromoCode({ code, onCodeChange }: PromoCodeProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Kod promocyjny</h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="Wpisz kod"
          className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg font-medium transition-colors">
          Zastosuj
        </button>
      </div>
    </div>
  );
}
