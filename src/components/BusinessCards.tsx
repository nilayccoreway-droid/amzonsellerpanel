import { Check } from 'lucide-react';

interface BusinessCard {
  title: string;
  subtitle: string;
  value: string;
  isActive?: boolean;
  hasCheckmark?: boolean;
}

interface BusinessCardsProps {
  cards: BusinessCard[];
}

export default function BusinessCards({ cards }: BusinessCardsProps) {
  return (
    <div className="flex gap-0.5 overflow-x-auto">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`flex-shrink-0 bg-white hover:shadow-md transition-shadow cursor-pointer ${
            card.isActive ? 'border-t-[3px]' : 'border-t border-gray-300'
          } ${index === 0 ? 'rounded-tl' : ''} ${index === cards.length - 1 ? 'rounded-tr' : ''}`}
          style={{
            width: '160px',
            borderTopColor: card.isActive ? '#00666B' : undefined,
            borderLeft: index === 0 ? '1px solid #d1d5db' : 'none',
            borderRight: '1px solid #d1d5db',
            borderBottom: '1px solid #d1d5db'
          }}
        >
          <div className="px-3 py-2.5">
            <div className="text-xs font-semibold mb-0.5" style={{ color: '#00666B' }}>{card.title}</div>
            <div className="text-[11px] text-gray-600 mb-1.5">{card.subtitle}</div>
            <div className="flex items-center gap-1.5">
              {card.hasCheckmark && (
                <div className="flex items-center justify-center w-4 h-4 bg-green-500 rounded-full flex-shrink-0">
                  <Check size={12} className="text-white" />
                </div>
              )}
              <div className="text-xl font-semibold text-gray-900">{card.value}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
