import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SalesDataPoint {
  date: string;
  amount: number;
}

interface SalesAnalyticsProps {
  salesData: SalesDataPoint[];
}

type TimeFilter = 'today' | '7days' | '30days' | 'custom';

export default function SalesAnalytics({ salesData }: SalesAnalyticsProps) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('7days');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const totalSales = salesData.reduce((sum, point) => sum + point.amount, 0);
  const maxValue = Math.max(...salesData.map(d => d.amount), 1);

  const filterOptions = [
    { value: 'today' as TimeFilter, label: 'Today' },
    { value: '7days' as TimeFilter, label: '7 Days' },
    { value: '30days' as TimeFilter, label: '30 Days' },
    { value: 'custom' as TimeFilter, label: 'Custom' },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded mb-4">
      <div className="border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Sales</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">Updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-3">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50"
            >
              {filterOptions.find(opt => opt.value === timeFilter)?.label}
              <ChevronDown size={14} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 min-w-[120px]">
                {filterOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setTimeFilter(option.value);
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-xs text-blue-700 mb-1">Product sales</div>
            <div className="text-2xl font-bold text-blue-900">¥{totalSales.toLocaleString()}</div>
            <div className="text-xs text-blue-600 mt-1">+12.5% from last week</div>
          </div>
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div className="text-xs text-green-700 mb-1">Units ordered</div>
            <div className="text-2xl font-bold text-green-900">{salesData.length * 15}</div>
            <div className="text-xs text-green-600 mt-1">+8.2% from last week</div>
          </div>
        </div>

        <div className="relative" style={{ height: '280px' }}>
          <div className="absolute inset-0 flex items-end justify-between gap-2 pb-8">
            {salesData.map((point, index) => {
              const height = (point.amount / maxValue) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center justify-end group">
                  <div
                    className="w-full rounded-t transition-all relative hover:opacity-80"
                    style={{
                      height: `${height}%`,
                      minHeight: '4px',
                      background: 'linear-gradient(to top, #00666B, #00999F)'
                    }}
                  >
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      <div className="font-semibold">¥{point.amount.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-300">{point.date}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300" />
          <div className="absolute left-0 top-0 bottom-8 w-px bg-gray-300" />
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-gray-500 pt-2">
            {salesData.map((point, index) => (
              <div key={index} className="flex-1 text-center font-medium">
                {point.date}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-[#00666B] to-[#00999F]" />
              <span>Sales Revenue</span>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
