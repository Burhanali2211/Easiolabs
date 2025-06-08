'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import type { Tutorial } from '@/lib/types';
import TutorialEditor from '@/components/admin/TutorialEditor';
import { useEffect } from 'react';

export default function NewTutorial() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user) {
      checkAdminAccess();
    }
  }, [user, loading, router]);

  const checkAdminAccess = async () => {
    const adminStatus = await isAdmin();
    if (!adminStatus) {
      router.push('/admin/login');
    }
  };

  const handleSave = (tutorial: Tutorial) => {
    router.push('/admin/dashboard');
  };

  const handleCancel = () => {
    router.push('/admin/dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TutorialEditor onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}
