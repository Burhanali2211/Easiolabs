'use client';

import { useState, useEffect } from 'react';
import { Star, MessageSquare, ThumbsUp } from 'lucide-react';

interface RatingStats {
  averageRating: number;
  ratingCount: number;
  ratingDistribution: { [key: number]: number };
}

interface UserRating {
  rating: number;
  review?: string;
}

interface TutorialRatingProps {
  tutorialSlug: string;
}

export default function TutorialRating({ tutorialSlug }: TutorialRatingProps) {
  const [stats, setStats] = useState<RatingStats | null>(null);
  const [userRating, setUserRating] = useState<UserRating | null>(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRatingData();
  }, [tutorialSlug]);

  const loadRatingData = async () => {
    try {
      const response = await fetch(`/api/tutorials/${tutorialSlug}/rating`);
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setUserRating(data.userRating);
        if (data.userRating) {
          setSelectedRating(data.userRating.rating);
          setReview(data.userRating.review || '');
        }
      }
    } catch (error) {
      console.error('Error loading rating data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRatingSubmit = async () => {
    if (selectedRating === 0) return;

    setSubmitting(true);
    try {
      const response = await fetch(`/api/tutorials/${tutorialSlug}/rating`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating: selectedRating,
          review: review.trim() || undefined
        })
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setUserRating(data.rating);
        setShowReviewForm(false);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to submit rating');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('Failed to submit rating');
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, size = 'h-5 w-5') => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const filled = starValue <= rating;
      
      return (
        <button
          key={i}
          type="button"
          onClick={interactive ? () => {
            setSelectedRating(starValue);
            if (!showReviewForm) setShowReviewForm(true);
          } : undefined}
          disabled={!interactive}
          className={`${size} ${
            interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'
          } ${
            filled ? 'text-yellow-400' : 'text-gray-300'
          }`}
        >
          <Star className={`${size} ${filled ? 'fill-current' : ''}`} />
        </button>
      );
    });
  };

  const renderRatingDistribution = () => {
    if (!stats || stats.ratingCount === 0) return null;

    return (
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = stats.ratingDistribution[rating] || 0;
          const percentage = stats.ratingCount > 0 ? (count / stats.ratingCount) * 100 : 0;
          
          return (
            <div key={rating} className="flex items-center text-sm">
              <span className="w-3 text-gray-600">{rating}</span>
              <Star className="h-3 w-3 text-yellow-400 fill-current mx-1" />
              <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-8 text-gray-600 text-right">{count}</span>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate this Tutorial</h3>
      
      {/* Overall Rating Display */}
      {stats && stats.ratingCount > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <div className="flex items-center mr-4">
              {renderStars(Math.round(stats.averageRating))}
              <span className="ml-2 text-lg font-medium text-gray-900">
                {stats.averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-600">
              ({stats.ratingCount} {stats.ratingCount === 1 ? 'rating' : 'ratings'})
            </span>
          </div>
          
          {/* Rating Distribution */}
          <div className="mt-4">
            {renderRatingDistribution()}
          </div>
        </div>
      )}

      {/* User Rating Section */}
      <div className="border-t pt-4">
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            {userRating ? 'Your rating:' : 'Rate this tutorial:'}
          </p>
          <div className="flex items-center">
            {renderStars(selectedRating, !userRating, 'h-6 w-6')}
            {userRating && (
              <button
                onClick={() => {
                  setShowReviewForm(true);
                  setSelectedRating(userRating.rating);
                  setReview(userRating.review || '');
                }}
                className="ml-4 text-sm text-blue-600 hover:text-blue-700"
              >
                Edit
              </button>
            )}
          </div>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add a review (optional)
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Share your thoughts about this tutorial..."
                maxLength={500}
              />
              <div className="text-xs text-gray-500 mt-1">
                {review.length}/500 characters
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRatingSubmit}
                disabled={submitting || selectedRating === 0}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Submit Rating
                  </>
                )}
              </button>
              
              <button
                onClick={() => {
                  setShowReviewForm(false);
                  if (!userRating) {
                    setSelectedRating(0);
                    setReview('');
                  }
                }}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* User's existing review */}
        {userRating && userRating.review && !showReviewForm && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <div className="flex items-center mb-2">
              <MessageSquare className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Your review:</span>
            </div>
            <p className="text-sm text-gray-600">{userRating.review}</p>
          </div>
        )}
      </div>

      {/* Helpful Tips */}
      {!userRating && (
        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Help others learn!</h4>
          <p className="text-sm text-blue-700">
            Your rating and review help other learners find the best tutorials. 
            Share what you found most helpful or what could be improved.
          </p>
        </div>
      )}
    </div>
  );
}
