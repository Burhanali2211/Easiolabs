import { Metadata } from 'next';
import CommentsManager from '@/components/admin/CommentsManager';

export const metadata: Metadata = {
  title: 'Comments Management - Admin',
  description: 'Manage and moderate comments on EasyioLabs Electronics.',
  robots: 'noindex, nofollow',
};

export default function AdminCommentsPage() {
  return (
    <div className="space-y-6">
      <CommentsManager />
    </div>
  );
}
