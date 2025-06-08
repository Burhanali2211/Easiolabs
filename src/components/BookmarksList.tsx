'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, Clock, Eye, Star, BookOpen, Trash2 } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';
import type { Tutorial } from '@/lib/types';

interface BookmarksListProps {
  className?: string;
}

interface BookmarkedTutorial extends Tutorial {
  bookmarked_at: string;
  average_rating?: number;
  rating_count?: number;
}

const BookmarksList = ({ className = '' }: BookmarksListProps) => {
  const [bookmarks, setBookmarks] = useState<BookmarkedTutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState<string | null>(null);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/bookmarks');
      if (response.ok) {
        const data = await response.json();
        setBookmarks(data.bookmarks);
      }
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async (tutorialSlug: string) => {
    setRemoving(tutorialSlug);
    try {
      const response = await fetch(`/api/tutorials/${tutorialSlug}/bookmark`, {
        method: 'POST',
      });

      if (response.ok) {
        // Remove from local state
        setBookmarks(prev => prev.filter(bookmark => bookmark.slug !== tutorialSlug));
      }
    } catch (error) {
      console.error('Error removing bookmark:', error);
    } finally {
      setRemoving(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-24 h-16 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <Bookmark className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks yet</h3>
        <p className="text-gray-600 mb-6">
          Start bookmarking tutorials to keep track of your favorites and read them later.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Browse Tutorials
        </Link>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Bookmark className="w-6 h-6 mr-2" />
          My Bookmarks ({bookmarks.length})
        </h2>
      </div>

      {bookmarks.map((tutorial) => (
        <div key={tutorial.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="p-6">
            <div className="flex items-start space-x-4">
              {/* Thumbnail */}
              <div className="flex-shrink-0">
                {tutorial.featured_image ? (
                  <img
                    src={tutorial.featured_image}
                    alt={tutorial.title}
                    className="w-24 h-16 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-24 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link
                      href={`/tutorial/${tutorial.slug}`}
                      className="block group"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {tutorial.title}
                      </h3>
                    </Link>
                    
                    {tutorial.description && (
                      <p className="text-gray-600 mt-1 line-clamp-2">
                        {tutorial.description}
                      </p>
                    )}

                    {/* Meta information */}
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                      {tutorial.category && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${tutorial.category.color || 'bg-blue-100 text-blue-800'}`}>
                          {tutorial.category.name}
                        </span>
                      )}
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                        {tutorial.difficulty}
                      </span>

                      {tutorial.duration && (
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{tutorial.duration}</span>
                        </div>
                      )}

                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        <span>{tutorial.view_count} views</span>
                      </div>

                      {tutorial.average_rating && tutorial.rating_count && tutorial.rating_count > 0 && (
                        <div className="flex items-center">
                          <Star className="w-3 h-3 mr-1 text-yellow-400" />
                          <span>{tutorial.average_rating.toFixed(1)} ({tutorial.rating_count})</span>
                        </div>
                      )}
                    </div>

                    {/* Bookmark date */}
                    <div className="flex items-center mt-2 text-xs text-gray-400">
                      <Bookmark className="w-3 h-3 mr-1" />
                      <span>Bookmarked {formatRelativeTime(tutorial.bookmarked_at)}</span>
                    </div>
                  </div>

                  {/* Remove bookmark button */}
                  <button
                    onClick={() => removeBookmark(tutorial.slug)}
                    disabled={removing === tutorial.slug}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Remove bookmark"
                  >
                    {removing === tutorial.slug ? (
                      <div className="w-4 h-4 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <Link
                href={`/tutorial/${tutorial.slug}`}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Read Tutorial
              </Link>

              <div className="text-sm text-gray-500">
                Added on {new Date(tutorial.bookmarked_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarksList;
