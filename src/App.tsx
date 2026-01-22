import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import Header from './components/Header';
import TabNavigation, { TabType } from './components/TabNavigation';
import SalesAnalytics from './components/SalesAnalytics';
import ActivitiesPanel from './components/ActivitiesPanel';
import WidgetCards from './components/WidgetCards';
import ProductActionBar from './components/ProductActionBar';
import OrderWidget from './components/OrderWidget';
import ProductManagementPage from './components/ProductManagementPage';

type MenuItem = 'dashboard' | 'orders' | 'products' | 'payments' | 'reports';

interface DashboardData {
  ordersCount: number;
  productsCount: number;
  transactionsCount: number;
  lifetimeSales: number;
  salesData: Array<{ date: string; amount: number }>;
  orders: Array<{
    id: string;
    order_number: string;
    order_date: string;
    customer_name: string;
    total_amount: number;
    status: string;
  }>;
  activities: Array<{
    id: string;
    title: string;
    description: string;
    type: 'alert' | 'notification' | 'update';
    is_read: boolean;
    created_at: string;
  }>;
  returnsCount: number;
  shipmentsCount: number;
  averageRating: number;
  reviewsCount: number;
}

function App() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState<MenuItem>('dashboard');
  const [activeTab, setActiveTab] = useState<TabType>('my-business');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      const [
        ordersResult,
        productsResult,
        transactionsResult,
        activitiesResult,
        returnsResult,
        shipmentsResult,
        reviewsResult,
      ] = await Promise.all([
        supabase.from('orders').select('*').order('order_date', { ascending: false }).limit(10),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('transactions').select('*'),
        supabase.from('activities').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('returns').select('*', { count: 'exact', head: true }),
        supabase.from('shipments').select('*').eq('status', 'in_transit'),
        supabase.from('reviews').select('rating'),
      ]);

      const orders = ordersResult.data || [];
      const ordersCount = orders.length;
      const productsCount = productsResult.count || 0;
      const transactions = transactionsResult.data || [];
      const transactionsCount = transactions.filter(t => t.status === 'completed').length;
      const lifetimeSales = transactions
        .filter(t => t.type === 'sale' && t.status === 'completed')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toISOString().split('T')[0];
      });

      const salesData = last7Days.map((date, index) => {
        const baseAmount = Math.random() * 50000 + 30000;
        const amount = Math.round(baseAmount * (1 + index * 0.1));
        return {
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          amount,
        };
      });

      const reviews = reviewsResult.data || [];
      const averageRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

      setDashboardData({
        ordersCount,
        productsCount,
        transactionsCount,
        lifetimeSales,
        salesData,
        orders: orders.map(order => ({
          id: order.id,
          order_number: order.order_number,
          order_date: order.order_date,
          customer_name: order.customer_name,
          total_amount: parseFloat(order.total_amount),
          status: order.status,
        })),
        activities: (activitiesResult.data || []).map(activity => ({
          id: activity.id,
          title: activity.title,
          description: activity.description || '',
          type: activity.type,
          is_read: activity.is_read,
          created_at: activity.created_at,
        })),
        returnsCount: returnsResult.count || 0,
        shipmentsCount: (shipmentsResult.data || []).length,
        averageRating,
        reviewsCount: reviews.length,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Failed to load dashboard data</p>
      </div>
    );
  }

  const tabs = [
    { id: 'my-business' as TabType, title: 'My Business', subtitle: "Today's Global Sales", value: '¥0' },
    { id: 'products' as TabType, title: 'Products', subtitle: 'Active', value: '2/2', hasCheckmark: true },
    { id: 'orders' as TabType, title: 'Orders', subtitle: 'Open Orders', value: '--' },
    { id: 'payments' as TabType, title: 'Payments', subtitle: 'Proceeds (06/02-Today)', value: '¥0' },
    { id: 'report' as TabType, title: 'Report', subtitle: 'Monthly Report', value: '--' },
    { id: 'photoshoot' as TabType, title: 'Photoshoot', subtitle: 'Scheduled', value: '--' },
  ];

  return (
    <div className="min-h-screen bg-[#EAEDED]">
      <Header
        activeMenu={activeMenu}
        onMenuChange={setActiveMenu}
        onManageProducts={() => setActiveTab('products')}
      />

      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} tabs={tabs} />

      <main>
        {activeTab === 'products' ? (
          <ProductManagementPage onBack={() => setActiveTab('my-business')} />
        ) : activeTab === 'my-business' ? (
          <div className="max-w-[1600px] mx-auto px-4 pt-4">
            <ProductActionBar onManageProducts={() => setActiveTab('products')} />

            <div className="mt-4">
              <SalesAnalytics salesData={dashboardData.salesData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4 mb-4">
              <div className="lg:col-span-2">
                <OrderWidget
                  sellerFulfilled={{
                    pending: 12,
                    unshipped: 8,
                    canceled: 2,
                    shipped: 45
                  }}
                  fulfilledByAmazon={{
                    pending: 5,
                    total: 28,
                    canceled: 1
                  }}
                />
              </div>
              <div className="lg:col-span-1">
                <ActivitiesPanel activities={dashboardData.activities} />
              </div>
            </div>

            <WidgetCards
              returnsCount={dashboardData.returnsCount}
              shipmentsCount={dashboardData.shipmentsCount}
              averageRating={dashboardData.averageRating}
              reviewsCount={dashboardData.reviewsCount}
            />
          </div>
        ) : (
          <div className="max-w-[1400px] mx-auto px-4 pt-4">
            <div className="bg-white border border-gray-200 rounded p-8 text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
                {tabs.find(t => t.id === activeTab)?.title}
              </h2>
              <p className="text-gray-600">This section is under development</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
