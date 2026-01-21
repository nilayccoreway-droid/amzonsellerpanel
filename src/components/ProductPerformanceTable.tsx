import { Menu, MoreVertical, Star } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  asin: string;
  image?: string;
  listingStatus: string;
  inventory: string;
  price: string;
  nextStep: string;
}

interface ProductPerformanceTableProps {
  products: Product[];
}

export default function ProductPerformanceTable({ products }: ProductPerformanceTableProps) {
  return (
    <div className="bg-white border border-gray-200 rounded">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Menu size={18} className="text-gray-600" />
          <div>
            <h3 className="text-base font-semibold text-gray-900">Product Performance</h3>
            <p className="text-xs text-gray-500">Last 30 days</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Manage products
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-gray-200">
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm border border-gray-300 bg-blue-50 text-blue-700 rounded">
            Frequently interacted
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded">
            Top selling
          </button>
          <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 rounded">
            Favorites
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Product</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Listing status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Inventory</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Price</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className={index !== products.length - 1 ? 'border-b border-gray-100' : ''}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Star size={16} className="text-gray-400" />
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-gray-400">No image</span>
                      )}
                    </div>
                    <div>
                      <div className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.sku} · <span className="text-blue-600">{product.asin}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
                    {product.listingStatus}
                  </span>
                </td>
                
                <td className="px-4 py-3 text-sm text-gray-900">{product.inventory}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{product.price}</td>
                <td className="px-4 py-3">
                  <button className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50">
                    {product.nextStep}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
