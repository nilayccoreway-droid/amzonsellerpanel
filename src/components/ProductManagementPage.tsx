import { useState } from 'react';
import { ChevronDown, Settings, FileText } from 'lucide-react';
import ListingStatus from './ListingStatus';
import ProductPerformanceTable from './ProductPerformanceTable';
import ProductListingPage from './ProductListingPage';
import ProductEditPage from './ProductEditPage';

interface ProductManagementPageProps {
  onBack: () => void;
}

export default function ProductManagementPage({ onBack }: ProductManagementPageProps) {
  const [showProductListing, setShowProductListing] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const listingStatusItems = [
    { label: 'Active', count: 2, percentage: 100 },
    { label: 'Inactive', count: 0, percentage: 0 },
    { label: 'Out of stock', count: 0, percentage: 0 },
    { label: 'Listing removed', count: 0, percentage: 0 },
    { label: 'Approval required', count: 0, percentage: 0 },
  ];

  const products = [
    {
      id: '1',
      name: 'Coral Platinum Ring',
      sku: 'FA-TF7N-PW5X',
      asin: '',
      listingStatus: 'Active',
      sales: '-',
      pageViews: '-',
      inventory: '1',
      price: '¥577,500.00',
      nextStep: 'Edit',
    },
    {
      id: '2',
      name: 'Alexandrite Ring',
      sku: '7N-1LSZ-WS5Z',
      asin: '',
      listingStatus: 'Active',
      sales: '-',
      pageViews: '-',
      inventory: '1',
      price: '¥550,000.00',
      nextStep: 'Edit',
    },
  ];

  if (editingProductId) {
    return (
      <ProductEditPage
        productId={editingProductId}
        onBack={() => setEditingProductId(null)}
      />
    );
  }

  if (showProductListing) {
    return (
      <ProductListingPage
        onBack={() => setShowProductListing(false)}
        onEditProduct={(productId) => setEditingProductId(productId)}
      />
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 pt-4">
      <div className="bg-white border border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
            >
              Manage products
              <ChevronDown size={16} />
            </button>
          </div>

          <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded hover:bg-gray-50 transition-colors">
            Create products
          </button>
        </div>

        <div className="flex items-center gap-3">

        </div>
      </div>

      <div className="mt-4">
        <ListingStatus
          statusItems={listingStatusItems}
          onManageProducts={() => setShowProductListing(true)}
        />
      </div>

      <div className="mt-4 mb-4">
        <ProductPerformanceTable products={products} />
      </div>
    </div>
  );
}
