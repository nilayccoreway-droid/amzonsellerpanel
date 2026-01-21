import { ChevronDown, ChevronRight } from 'lucide-react';

interface Order {
  id: string;
  order_number: string;
  order_date: string;
  customer_name: string;
  total_amount: number;
  status: string;
  products?: string[];
}

interface OrdersTableProps {
  orders: Order[];
}

function StatusBadge({ status }: { status: string }) {
  const getStatusStyles = () => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${getStatusStyles()}`}>
      {status}
    </span>
  );
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded">
      <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">Orders</h2>
        <button className="text-sm font-medium" style={{ color: '#00666B' }}>
          Manage orders
        </button>
      </div>

      <div className="border-b border-gray-200 px-4 py-2 flex items-center gap-3">
        <button className="flex items-center gap-1 px-3 py-1 text-sm border border-gray-300 rounded bg-white hover:bg-gray-50">
          Last 90 days
          <ChevronDown size={14} />
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-gray-500">
          No orders found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Order #</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Date</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Customer</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Total</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-600"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium" style={{ color: '#00666B' }}>
                    {order.order_number}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {new Date(order.order_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {order.customer_name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                    ¥{order.total_amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button className="text-gray-400 hover:text-gray-600">
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="border-t border-gray-200 px-4 py-3 text-center">
        <button className="text-sm font-medium" style={{ color: '#00666B' }}>
          View all orders
        </button>
      </div>
    </div>
  );
}
