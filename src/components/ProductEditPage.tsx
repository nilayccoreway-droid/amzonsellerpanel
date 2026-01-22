import { useEffect, useState } from 'react';
import { Home, User, Save } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: string;
  thumbnail?: string;
  attribute_set?: string;
  product_status?: string;
  approval_status?: string;
  type?: string;
  design_number?: string;
  created_at: string;
  updated_at: string;
}

interface ProductEditPageProps {
  productId: string;
  onBack: () => void;
}

export default function ProductEditPage({ productId, onBack }: ProductEditPageProps) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    attribute_set: 'Ring',
    product_status: 'Enabled',
    type: 'Simple',
    design_number: '',
    stock: 0,
    price: 0,
    status: 'active',
    metal_weight: '',
    metal_purity: '',
    metal_type: '',
    description: '',
    short_description: '',
  });

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  async function fetchProduct() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProduct(data);
        setFormData({
          name: data.name || '',
          sku: data.sku || '',
          attribute_set: data.attribute_set || 'Ring',
          product_status: data.product_status || 'Enabled',
          type: data.type || 'Simple',
          design_number: data.design_number || '',
          stock: data.stock || 0,
          price: data.price || 0,
          status: data.status || 'active',
          metal_weight: '',
          metal_purity: '',
          metal_type: '',
          description: '',
          short_description: '',
        });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('products')
        .update({
          name: formData.name,
          sku: formData.sku,
          attribute_set: formData.attribute_set,
          product_status: formData.product_status,
          type: formData.type,
          design_number: formData.design_number,
          stock: formData.stock,
          price: formData.price,
          status: formData.status,
          updated_at: new Date().toISOString(),
        })
        .eq('id', productId);

      if (error) throw error;

      alert('Product updated successfully!');
      onBack();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-[1800px] mx-auto px-4 pt-4">
        <div className="bg-white border border-gray-200 rounded p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1800px] mx-auto px-4 pt-4">
        <div className="bg-white border border-gray-200 rounded p-8 text-center">
          <p className="text-gray-600">Product not found</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Home size={16} />
          <span>/</span>
          <User size={16} />
          <span>My Collection</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50"
          >
            Back
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Marketplace Edit Product
        </h1>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded">
            <div className="bg-gray-700 text-white px-4 py-3 font-medium">
              Edit Product
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attribute Set <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.attribute_set}
                    onChange={(e) => setFormData({ ...formData, attribute_set: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Ring">Ring</option>
                    <option value="Necklace">Necklace</option>
                    <option value="Bracelet">Bracelet</option>
                    <option value="Earring">Earring</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.product_status}
                    onChange={(e) => setFormData({ ...formData, product_status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Enabled">Enabled</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Simple">Simple</option>
                    <option value="Configurable">Configurable</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Design Number
                  </label>
                  <input
                    type="text"
                    value={formData.design_number}
                    onChange={(e) => setFormData({ ...formData, design_number: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded">
            <div className="bg-gray-700 text-white px-4 py-3 font-medium">
              Stock Availability
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    In Stock
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">In Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded">
            <div className="bg-gray-700 text-white px-4 py-3 font-medium">
              Price(₹)
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">¥</span>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Amount: ¥{formData.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Conversion Rate: ¥{(formData.price * 1.05).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </label>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>Site Commission (0%): ¥0.00</p>
                    <p>Max Commission: ¥{(formData.price * 0.05).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded">
            <div className="bg-gray-700 text-white px-4 py-3 font-medium">
              B-Credits
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dot Reward Point
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded">
                    <option>No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Show Reward For Quote Button
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded">
                    <option>No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded">
            <div className="bg-gray-700 text-white px-4 py-3 font-medium">
              Metal Info
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metal Weight (gms)
                  </label>
                  <input
                    type="text"
                    value={formData.metal_weight}
                    onChange={(e) => setFormData({ ...formData, metal_weight: e.target.value })}
                    placeholder="16.13"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum guaranteed weight of metal
                  </label>
                  <input
                    type="text"
                    placeholder="Platinum"
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metal Purity
                  </label>
                  <select
                    value={formData.metal_purity}
                    onChange={(e) => setFormData({ ...formData, metal_purity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="">Select an option</option>
                    <option value="24K">24K</option>
                    <option value="22K">22K</option>
                    <option value="18K">18K</option>
                    <option value="14K">14K</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metal Type
                  </label>
                  <select
                    value={formData.metal_type}
                    onChange={(e) => setFormData({ ...formData, metal_type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="">Select an option</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                    <option value="Platinum">Platinum</option>
                    <option value="Rose Gold">Rose Gold</option>
                    <option value="White Gold">White Gold</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded">
            <div className="bg-gray-700 text-white px-4 py-3 font-medium">
              Product Characteristics
            </div>
            <div className="p-6">
              <div className="text-sm text-gray-700 space-y-2">
                <p className="font-medium">Important Note:</p>
                <p className="text-gray-600">
                  Igi, clarity and colour and Description of the product listed here will be generated automatically.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded">
            <div className="bg-gray-700 text-white px-4 py-3 font-medium">
              Product Description
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Generally Description (Required) <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product description..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <textarea
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter short description..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
