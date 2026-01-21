import { ChevronDown, MoreVertical, Menu } from 'lucide-react';

interface OrderWidgetProps {
  sellerFulfilled: {
    pending: number;
    unshipped: number;
    canceled: number;
    shipped: number;
  };
  fulfilledByAmazon: {
    pending: number;
    total: number;
    canceled: number;
  };
}

export default function OrderWidget({ sellerFulfilled, fulfilledByAmazon }: OrderWidgetProps) {
  return (
    <div className="bg-white border border-gray-200 rounded">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu size={18} className="text-gray-600" />
          <h3 className="text-base font-semibold text-gray-900">Orders</h3>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Manage orders
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50">
              Last 90 days
              <ChevronDown size={14} />
            </button>
          </div>
          <div className="relative">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50">
              <span className="text-gray-600">⇅</span>
              (1)
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Seller fulfilled</h4>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-gray-600 mb-1">Pending</div>
              <div className="text-2xl font-semibold text-blue-600">{sellerFulfilled.pending}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Unshipped</div>
              <div className="text-2xl font-semibold text-blue-600">{sellerFulfilled.unshipped}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Canceled</div>
              <div className="text-2xl font-semibold text-blue-600">{sellerFulfilled.canceled}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Shipped</div>
              <div className="text-2xl font-semibold text-blue-600">{sellerFulfilled.shipped}</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Fulfilled by Amazon</h4>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-gray-600 mb-1">Pending</div>
              <div className="text-2xl font-semibold text-blue-600">{fulfilledByAmazon.pending}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Total</div>
              <div className="text-2xl font-semibold text-blue-600">{fulfilledByAmazon.total}</div>
            </div>
            <div>
              <div className="text-xs text-gray-600 mb-1">Canceled</div>
              <div className="text-2xl font-semibold text-blue-600">{fulfilledByAmazon.canceled}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
