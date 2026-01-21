import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Eye, Settings as SettingsIcon, MoreVertical } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  thumbnail?: string;
  attribute_set?: string;
  product_status?: string;
  approval_status?: string;
  type?: string;
  design_number?: string;
  created_at: string;
}

interface ProductListingPageProps {
  onBack: () => void;
  onEditProduct?: (productId: string) => void;
}

export default function ProductListingPage({ onBack, onEditProduct }: ProductListingPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, itemsPerPage]);

  async function fetchProducts() {
    try {
      setLoading(true);
      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data, error, count } = await supabase
        .from('products')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      setProducts(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const toggleProductSelection = (id: string) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedProducts(newSelected);
  };

  const toggleAllProducts = () => {
    if (selectedProducts.size === products.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(products.map(p => p.id)));
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1400px] mx-auto px-4 pt-4">
        <div className="bg-white border border-gray-200 rounded p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 pt-4">
      <div className="bg-white border border-gray-200 rounded">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              ← Back
            </button>
            <div className="relative">
              <select className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 bg-white pr-8 appearance-none cursor-pointer">
                <option>Actions</option>
                <option>Edit</option>
                <option>Delete</option>
                <option>Duplicate</option>
              </select>
            </div>
            <span className="text-sm text-gray-600">{totalCount} records found</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 text-gray-700 text-sm hover:text-gray-900 border border-gray-300 rounded">
              <Filter size={16} />
              Filters
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-gray-700 text-sm hover:text-gray-900 border border-gray-300 rounded">
              <Eye size={16} />
              Default View
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-gray-700 text-sm hover:text-gray-900 border border-gray-300 rounded">
              <SettingsIcon size={16} />
              Columns
            </button>
            <div className="flex items-center gap-2">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1.5 border border-gray-300 rounded text-sm text-gray-700 bg-white"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span className="text-sm text-gray-600">per page</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.size === products.length && products.length > 0}
                    onChange={toggleAllProducts}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Thumbnail</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Attribute Set</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Product Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Design Number</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">SKU</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Qty</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Created At</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedProducts.has(product.id)}
                      onChange={() => toggleProductSelection(product.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                      {product.thumbnail ? (
                        <img src={product.thumbnail} alt={product.name} className="w-full h-full object-cover rounded" />
                      ) : (
                        <span className="text-gray-400 text-xs">No image</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-blue-600 hover:text-blue-700 cursor-pointer max-w-xs">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.attribute_set || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-sm text-green-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {product.product_status || 'Active'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-sm text-green-700">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {product.approval_status || 'Approved'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.type || 'Simple'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.design_number || '-'}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 font-mono">
                    {product.sku}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {product.stock}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    ¥{product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(product.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-3 relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === product.id ? null : product.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <MoreVertical size={16} />
                    </button>
                    {openMenuId === product.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}
                        />
                        <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow-lg z-20">
                          <button
                            onClick={() => {
                              setOpenMenuId(null);
                              onEditProduct?.(product.id);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Edit
                          </button>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm text-gray-700">
              {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
