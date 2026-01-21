import { CheckCircle } from 'lucide-react';

export type TabType = 'my-business' | 'products' | 'orders' | 'payments' | 'report' | 'photoshoot';

interface Tab {
  id: TabType;
  title: string;
  subtitle: string;
  value: string;
  hasCheckmark?: boolean;
}

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  tabs: Tab[];
}

export default function TabNavigation({ activeTab, onTabChange, tabs }: TabNavigationProps) {
  return (
    <div className="bg-gray-100 px-4 py-3">
      <div className="flex gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 px-6 py-4 text-left transition-all ${
              activeTab === tab.id
                ? 'bg-white shadow-sm border-x border-b border-gray-200 border-t-[3px] border-t-blue-600 rounded-tl-[15px] rounded-tr-[15px]'
                : 'bg-gray-50 border border-gray-200 rounded-tl-[15px] rounded-tr-[15px] hover:bg-white hover:shadow-sm hover:border-t-[3px] hover:border-t-blue-600 hover:border-x hover:border-b hover:border-gray-200'
            }`}
          >
            <div className="text-sm font-semibold text-blue-600 mb-1">{tab.title}</div>
            <div className="text-xs text-gray-600 mb-1.5">{tab.subtitle}</div>
            <div className="flex items-center gap-1">
              {tab.hasCheckmark && (
                <CheckCircle size={14} className="text-green-600 fill-green-600" />
              )}
              <span className={`text-base font-bold ${tab.value === '--' ? 'text-gray-400' : 'text-gray-900'}`}>
                {tab.value}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
