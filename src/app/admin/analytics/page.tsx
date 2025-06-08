import { Metadata } from 'next';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

export const metadata: Metadata = {
  title: 'Analytics - Admin',
  description: 'View website analytics and performance metrics.',
  robots: 'noindex, nofollow',
};

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <AnalyticsDashboard />
    </div>
  );
}
