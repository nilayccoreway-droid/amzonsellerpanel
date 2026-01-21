import { Plus } from 'lucide-react';

interface ProductActionBarProps {
  onManageProducts: () => void;
}

export default function ProductActionBar({ onManageProducts }: ProductActionBarProps) {
  return (
    <div className="bg-white border border-gray-200 px-4 py-3 flex items-center gap-3">
      <button
        onClick={onManageProducts}
        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
      >
        Manage Products
      </button>

      <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded hover:bg-orange-600 transition-colors">
        <Plus size={16} />
        Create Product
      </button>
    </div>
  );
}
