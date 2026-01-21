import { Menu, MoreVertical } from 'lucide-react';

interface StatusItem {
  label: string;
  count: number;
  percentage: number;
}

interface ListingStatusProps {
  statusItems: StatusItem[];
  onManageProducts?: () => void;
}

export default function ListingStatus({ statusItems, onManageProducts }: ListingStatusProps) {
  const maxCount = Math.max(...statusItems.map(item => item.count));

  return (
    <div className="bg-white border border-gray-200 rounded">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu size={18} className="text-gray-600" />
          <h3 className="text-base font-semibold text-gray-900">Listing Status</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onManageProducts}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Manage products
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        {statusItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3 mb-3 last:mb-0">
            <div className="w-32 text-right">
              <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                {item.label}
              </span>
            </div>
            <div className="flex-1 relative">
              <div className="h-6 bg-gray-100 rounded overflow-hidden">
                {item.count > 0 && (
                  <div
                    className="h-full bg-blue-500"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                )}
              </div>
            </div>
            <div className="w-8 text-right">
              <span className="text-sm text-gray-900 font-medium">{item.count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
