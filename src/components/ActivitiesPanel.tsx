import { Bell, AlertCircle, Info, ChevronRight } from 'lucide-react';

interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'alert' | 'notification' | 'update';
  is_read: boolean;
  created_at: string;
}

interface ActivitiesPanelProps {
  activities: Activity[];
}

function ActivityIcon({ type }: { type: Activity['type'] }) {
  const iconProps = { size: 16, className: 'flex-shrink-0' };

  switch (type) {
    case 'alert':
      return <AlertCircle {...iconProps} className="text-orange-500" />;
    case 'notification':
      return <Bell {...iconProps} className="text-blue-500" />;
    case 'update':
      return <Info {...iconProps} className="text-green-500" />;
  }
}

export default function ActivitiesPanel({ activities }: ActivitiesPanelProps) {
  return (
    <div className="bg-white border border-gray-200 rounded">
      <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">Notification</h2>
        <button className="text-sm font-medium" style={{ color: '#00666B' }}>
          View all Notification
        </button>
      </div>

      {activities.length === 0 ? (
        <div className="px-4 py-8 text-center text-sm text-gray-500">
          No activities found
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                !activity.is_read ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <ActivityIcon type={activity.type} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">
                        {new Date(activity.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className={`text-sm ${!activity.is_read ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                        {activity.title}
                      </div>
                      {activity.description && (
                        <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {activity.description}
                        </div>
                      )}
                    </div>
                    <ChevronRight size={16} className="text-gray-400 flex-shrink-0 mt-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
