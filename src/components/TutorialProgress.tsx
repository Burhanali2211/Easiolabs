'use client';

import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, Circle, Clock, Trophy, BarChart3 } from 'lucide-react';
import { debounce } from '@/lib/utils';
import { ClientAnalytics } from '@/lib/client-analytics';

interface TutorialProgressProps {
  tutorialSlug: string;
  className?: string;
}

interface ProgressData {
  progress_percentage: number;
  completed: boolean;
  last_accessed: string | null;
}

const TutorialProgress = ({ tutorialSlug, className = '' }: TutorialProgressProps) => {
  const [progress, setProgress] = useState<ProgressData>({
    progress_percentage: 0,
    completed: false,
    last_accessed: null
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchProgress();
  }, [tutorialSlug]);

  const fetchProgress = async () => {
    try {
      const response = await fetch(`/api/tutorials/${tutorialSlug}/progress`);
      if (response.ok) {
        const data = await response.json();
        setProgress(data.progress);
      }
    } catch (error) {
      console.error('Error fetching progress:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced function to update progress
  const debouncedUpdateProgress = useCallback(
    debounce(async (progressPercentage: number, completed: boolean) => {
      try {
        setUpdating(true);
        const response = await fetch(`/api/tutorials/${tutorialSlug}/progress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            progress_percentage: progressPercentage,
            completed: completed,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setProgress(data.progress);

          // Track analytics event
          ClientAnalytics.trackEvent('tutorial_progress', {
            tutorial_slug: tutorialSlug,
            progress_percentage: progressPercentage,
            completed: completed
          });
        }
      } catch (error) {
        console.error('Error updating progress:', error);
      } finally {
        setUpdating(false);
      }
    }, 1000),
    [tutorialSlug]
  );

  // Function to update progress based on scroll position
  const updateProgressFromScroll = useCallback(() => {
    if (loading || updating) return;

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Calculate how far the user has scrolled through the content
    let scrollPercentage = Math.min(
      100,
      Math.round((scrollPosition / (documentHeight - windowHeight)) * 100)
    );

    // Only update if the new percentage is higher than the current one
    if (scrollPercentage > progress.progress_percentage) {
      const completed = scrollPercentage >= 90; // Consider completed if 90% scrolled
      debouncedUpdateProgress(scrollPercentage, completed);
    }
  }, [loading, updating, progress.progress_percentage, debouncedUpdateProgress]);

  // Set up scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', updateProgressFromScroll);
    return () => {
      window.removeEventListener('scroll', updateProgressFromScroll);
    };
  }, [updateProgressFromScroll]);

  // Function to manually mark as complete
  const markAsComplete = async () => {
    if (updating) return;
    debouncedUpdateProgress(100, true);
  };

  if (loading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className="w-5 h-5 rounded-full bg-gray-200 animate-pulse"></div>
        <span className="text-sm text-gray-400">Loading progress...</span>
      </div>
    );
  }

  // Format the last accessed date
  const formatLastAccessed = () => {
    if (!progress.last_accessed) return 'Never';

    const date = new Date(progress.last_accessed);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Progress indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {progress.completed ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5 text-gray-300" />
          )}
          <span className="font-medium">
            {progress.completed ? 'Completed' : 'In Progress'}
          </span>
        </div>
        <span className="text-sm text-gray-500">
          {progress.progress_percentage}% complete
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${progress.completed ? 'bg-green-500' : 'bg-blue-500'}`}
          style={{ width: `${progress.progress_percentage}%` }}
        ></div>
      </div>

      {/* Last accessed */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <Clock className="w-4 h-4" />
        <span>Last accessed: {formatLastAccessed()}</span>
      </div>

      {/* Complete button (only show if not already completed) */}
      {!progress.completed && (
        <button
          onClick={markAsComplete}
          disabled={updating}
          className="mt-2 flex items-center space-x-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-md transition-colors"
        >
          <Trophy className="w-4 h-4" />
          <span>{updating ? 'Updating...' : 'Mark as Complete'}</span>
        </button>
      )}

      {/* View statistics button (if completed) */}
      {progress.completed && (
        <button
          onClick={() => window.location.href = `/progress?tutorial=${tutorialSlug}`}
          className="mt-2 flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors"
        >
          <BarChart3 className="w-4 h-4" />
          <span>View Your Progress</span>
        </button>
      )}
    </div>
  );
};

export default TutorialProgress;
