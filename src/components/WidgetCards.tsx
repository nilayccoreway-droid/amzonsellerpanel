import { RotateCcw, Truck, Star } from 'lucide-react';

interface WidgetCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
}

function WidgetCard({ title, value, subtitle, icon }: WidgetCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded overflow-hidden">
      <div className="bg-[#3a3a3a] text-white px-4 py-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <div className="opacity-80">
          {icon}
        </div>
      </div>
      <div className="bg-gray-50 p-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 mb-2">{value}</div>
          {subtitle && (
            <p className="text-sm text-gray-600">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

interface WidgetCardsProps {
  returnsCount: number;
  shipmentsCount: number;
  averageRating: number;
  reviewsCount: number;
}

export default function WidgetCards({ returnsCount, shipmentsCount, averageRating, reviewsCount }: WidgetCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <WidgetCard
        title="Returns"
        value={returnsCount}
        subtitle="Pending return requests"
        icon={<RotateCcw size={20} />}
      />
      <WidgetCard
        title="Shipments"
        value={shipmentsCount}
        subtitle="In transit"
        icon={<Truck size={20} />}
      />
      <WidgetCard
        title="Reviews & Ratings"
        value={averageRating.toFixed(1)}
        subtitle={`${reviewsCount} total reviews`}
        icon={<Star size={20} />}
      />
    </div>
  );
}
