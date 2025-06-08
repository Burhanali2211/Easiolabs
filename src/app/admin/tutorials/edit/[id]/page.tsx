'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { ContentClientService } from '@/lib/content-client';
import type { Tutorial } from '@/lib/types';
import TutorialEditor from '@/components/admin/TutorialEditor';

interface Props {
  params: {
    id: string;
  };
}

export default function EditTutorial({ params }: Props) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [loadingTutorial, setLoadingTutorial] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user) {
      checkAdminAccess();
      loadTutorial();
    }
  }, [user, loading, router, params.id]);

  const checkAdminAccess = async () => {
    const adminStatus = await isAdmin();
    if (!adminStatus) {
      router.push('/admin/login');
    }
  };

  const loadTutorial = async () => {
    try {
      const tutorialData = await ContentClientService.getTutorialById(params.id);
      if (!tutorialData) {
        router.push('/admin/tutorials');
        return;
      }
      setTutorial(tutorialData);
    } catch (error) {
      console.error('Error loading tutorial:', error);
      router.push('/admin/tutorials');
    } finally {
      setLoadingTutorial(false);
    }
  };

  const handleSave = (savedTutorial: Tutorial) => {
    router.push('/admin/tutorials');
  };

  const handleCancel = () => {
    router.push('/admin/tutorials');
  };

  if (loading || loadingTutorial) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">Tutorial not found</div>
      </div>
    );
  }

  return (
    <TutorialEditor
      tutorial={tutorial}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
