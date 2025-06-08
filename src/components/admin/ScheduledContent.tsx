'use client';

import { useState, useEffect } from 'react';
import { Calendar, Clock, Play, Pause, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

interface ScheduledItem {
  id: string;
  content_type: string;
  content_id: string;
  action: 'publish' | 'unpublish' | 'delete';
  scheduled_for: string;
  executed: boolean;
  content_title: string;
  created_at: string;
}

interface ScheduledContentProps {
  className?: string;
}

const ScheduledContent = ({ className = '' }: ScheduledContentProps) => {
  const [scheduledItems, setScheduledItems] = useState<ScheduledItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [executing, setExecuting] = useState(false);
  const [canceling, setCanceling] = useState<string | null>(null);

  useEffect(() => {
    fetchScheduledContent();
    
    // Set up polling to refresh scheduled content
    const interval = setInterval(fetchScheduledContent, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchScheduledContent = async () => {
    try {
      const response = await fetch('/api/admin/scheduled-content', {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setScheduledItems(data.scheduled);
      }
    } catch (error) {
      console.error('Error fetching scheduled content:', error);
    } finally {
      setLoading(false);
    }
  };

  const executeScheduled = async () => {
    setExecuting(true);
    try {
      const response = await fetch('/api/admin/scheduled-content/execute', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Executed ${data.executed} scheduled items`);
        fetchScheduledContent();
      }
    } catch (error) {
      console.error('Error executing scheduled content:', error);
      alert('Failed to execute scheduled content');
    } finally {
      setExecuting(false);
    }
  };

  const cancelScheduled = async (itemId: string) => {
    if (!confirm('Are you sure you want to cancel this scheduled action?')) {
      return;
    }

    setCanceling(itemId);
    try {
      const response = await fetch(`/api/admin/scheduled-content/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        setScheduledItems(prev => prev.filter(item => item.id !== itemId));
      }
    } catch (error) {
      console.error('Error canceling scheduled content:', error);
    } finally {
      setCanceling(null);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'publish':
        return <Play className="w-4 h-4 text-green-600" />;
      case 'unpublish':
        return <Pause className="w-4 h-4 text-orange-600" />;
      case 'delete':
        return <Trash2 className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'publish':
        return 'bg-green-100 text-green-800';
      case 'unpublish':
        return 'bg-orange-100 text-orange-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (scheduledFor: string) => {
    return new Date(scheduledFor) < new Date();
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Scheduled Content ({scheduledItems.length})
        </h3>
        
        <button
          onClick={executeScheduled}
          disabled={executing || scheduledItems.length === 0}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {executing ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <CheckCircle className="w-4 h-4" />
          )}
          <span>Execute Due Items</span>
        </button>
      </div>

      {scheduledItems.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-600">No scheduled content</p>
        </div>
      ) : (
        <div className="space-y-3">
          {scheduledItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getActionIcon(item.action)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">
                          {item.content_title || `${item.content_type} ${item.content_id}`}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(item.action)}`}>
                          {item.action}
                        </span>
                        {isOverdue(item.scheduled_for) && (
                          <span className="flex items-center text-red-600 text-xs">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Overdue
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>
                            Scheduled for {new Date(item.scheduled_for).toLocaleString()}
                          </span>
                        </div>
                        <span>•</span>
                        <span>Created {formatRelativeTime(item.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => cancelScheduled(item.id)}
                    disabled={canceling === item.id}
                    className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    {canceling === item.id ? (
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    <span>Cancel</span>
                  </button>
                </div>

                {/* Progress indicator */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {isOverdue(item.scheduled_for) 
                        ? 'Ready to execute' 
                        : `Executes in ${formatRelativeTime(item.scheduled_for)}`
                      }
                    </span>
                    <span className="capitalize">{item.content_type}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScheduledContent;
