'use client';

import { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { ClientAnalytics } from '@/lib/client-analytics';

interface BookmarkButtonProps {
  tutorialSlug: string;
  className?: string;
  showText?: boolean;
}

const BookmarkButton = ({ tutorialSlug, className = '', showText = true }: BookmarkButtonProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    checkBookmarkStatus();
  }, [tutorialSlug]);

  const checkBookmarkStatus = async () => {
    try {
      const response = await fetch(`/api/tutorials/${tutorialSlug}/bookmark`);
      if (response.ok) {
        const data = await response.json();
        setIsBookmarked(data.bookmarked);
      }
    } catch (error) {
      console.error('Error checking bookmark status:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async () => {
    if (updating) return;

    setUpdating(true);
    try {
      const response = await fetch(`/api/tutorials/${tutorialSlug}/bookmark`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setIsBookmarked(data.bookmarked);

        // Track analytics event
        ClientAnalytics.trackEvent('tutorial_bookmark', {
          tutorial_slug: tutorialSlug,
          action: data.bookmarked ? 'add' : 'remove'
        });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <button
        className={`inline-flex items-center text-gray-400 ${className}`}
        disabled
      >
        <Bookmark className="w-5 h-5 mr-1" />
        {showText && <span>Bookmark</span>}
      </button>
    );
  }

  return (
    <button
      onClick={toggleBookmark}
      className={`inline-flex items-center transition-colors duration-200 ${isBookmarked ? 'text-yellow-500 hover:text-yellow-600' : 'text-gray-500 hover:text-gray-700'} ${className}`}
      disabled={updating}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {isBookmarked ? (
        <>
          <BookmarkCheck className="w-5 h-5 mr-1" />
          {showText && <span>Bookmarked</span>}
        </>
      ) : (
        <>
          <Bookmark className="w-5 h-5 mr-1" />
          {showText && <span>Bookmark</span>}
        </>
      )}
    </button>
  );
};

export default BookmarkButton;
