import { useState } from 'react';
import { ChevronDown, Mail, HelpCircle, User } from 'lucide-react';

type MenuItem = 'dashboard' | 'orders' | 'products' | 'payments' | 'reports';

interface HeaderProps {
  activeMenu: MenuItem;
  onMenuChange: (menu: MenuItem) => void;
  onManageProducts?: () => void;
}

export default function Header({ activeMenu, onMenuChange, onManageProducts }: HeaderProps) {
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const menuItems: { id: MenuItem; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'orders', label: 'Orders' },
    { id: 'products', label: 'Products' },
    { id: 'payments', label: 'Payments' },
    { id: 'reports', label: 'Reports' }
  ];

  const manageMenuItems = [
    {
      category: 'Products',
      items: [
        'Manage products',
        'Bulk Price',
        'Bulk Qty',
        'Import/export Product',
        'Feedbacks'
      ]
    },
    {
      category: 'Orders',
      items: [
        'Manage Order',
        'Manage Return'
      ]
    },
    {
      category: 'Payments',
      items: [
        'Manage Payments',
        'Manage Credit Card'
      ]
    },
    {
      category: 'Marketing',
      items: [
        'Manage Advertisement',
        'Promotion',
        'Report'
      ]
    },
    {
      category: 'PhotoShoot',
      items: [
        'Manage Photoshoot'
      ]
    },
    {
      category: 'Users',
      items: [
        'Sub Account'
      ]
    },
    {
      category: 'Others',
      items: [
        'Manage seller membership',
        'Scoring',
        'Manage Request for Quote'
      ]
    }
  ];

  return (
    <header className="bg-[#232f3e] text-white border-b border-gray-700">
      <div className="px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="text-xl font-bold">Zuuro</div>
            <div className="text-sm text-gray-300">N Collections</div>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <div className="relative">
              <button
                onClick={() => {
                  setIsManageOpen(!isManageOpen);
                  setIsCreateOpen(false);
                }}
                className="flex items-center gap-1 text-sm hover:text-gray-300"
              >
                <div className="w-5 h-5 flex items-center justify-center border border-gray-400 rounded">
                  <span className="text-xs">≡</span>
                </div>
                Manage
                <ChevronDown size={14} />
              </button>

              {isManageOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsManageOpen(false)}
                  />
                  <div className="absolute top-full right-0 mt-2 bg-white text-gray-900 rounded shadow-lg z-20 w-64 max-h-[80vh] overflow-y-auto">
                    {manageMenuItems.map((section, idx) => (
                      <div key={idx} className="border-b border-gray-200 last:border-b-0">
                        <div className="px-4 py-2 bg-gray-50 font-semibold text-sm">
                          {section.category}
                        </div>
                        {section.items.map((item, itemIdx) => (
                          <button
                            key={itemIdx}
                            onClick={() => {
                              if (item === 'Manage products' && onManageProducts) {
                                onManageProducts();
                              }
                              setIsManageOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                            {item}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setIsCreateOpen(!isCreateOpen);
                  setIsManageOpen(false);
                }}
                className="flex items-center gap-1 text-sm hover:text-gray-300"
              >
                + Create
                <ChevronDown size={14} />
              </button>

              {isCreateOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsCreateOpen(false)}
                  />
                  <div className="absolute top-full right-0 mt-2 bg-white text-gray-900 rounded shadow-lg z-20 w-48">
                    <button
                      onClick={() => setIsCreateOpen(false)}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Create Product
                    </button>
                    <button
                      onClick={() => setIsCreateOpen(false)}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Create Order
                    </button>
                  </div>
                </>
              )}
            </div>

            <button className="hover:text-gray-300">
              <Mail size={20} />
            </button>
            <button className="hover:text-gray-300">
              <HelpCircle size={20} />
            </button>
            <button className="hover:text-gray-300">
              <User size={20} />
            </button>
          </div>
        </div>

        <div className="flex items-center h-10 border-t border-gray-700 hidden" >
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'products' && onManageProducts) {
                  onManageProducts();
                } else {
                  onMenuChange(item.id);
                }
              }}
              className={`px-4 h-full text-sm hover:bg-gray-700 transition-colors ${
                activeMenu === item.id ? 'bg-gray-700 font-medium' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
