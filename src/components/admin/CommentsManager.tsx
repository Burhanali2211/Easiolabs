'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageSquare, Check, X, Eye, Clock, User, ExternalLink, Trash2 } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';
import type { Comment } from '@/lib/types';

interface CommentsManagerProps {
  className?: string;
}

const CommentsManager = ({ className = '' }: CommentsManagerProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('pending');
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, [filter]);

  const fetchComments = async () => {
    try {
      const params = new URLSearchParams();
      if (filter === 'pending') params.append('approved', 'false');
      if (filter === 'approved') params.append('approved', 'true');

      const response = await fetch(`/api/admin/comments?${params.toString()}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveComment = async (commentId: string) => {
    setProcessing(commentId);
    try {
      const response = await fetch(`/api/admin/comments/${commentId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'approve' }),
        credentials: 'include',
      });

      if (response.ok) {
        // Update local state
        setComments(prev => prev.map(comment => 
          comment.id === commentId 
            ? { ...comment, approved: true }
            : comment
        ));
        
        // If we're viewing pending comments, remove it from the list
        if (filter === 'pending') {
          setComments(prev => prev.filter(comment => comment.id !== commentId));
        }
      }
    } catch (error) {
      console.error('Error approving comment:', error);
    } finally {
      setProcessing(null);
    }
  };

  const deleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment? This action cannot be undone.')) {
      return;
    }

    setProcessing(commentId);
    try {
      const response = await fetch(`/api/admin/comments/${commentId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        // Remove from local state
        setComments(prev => prev.filter(comment => comment.id !== commentId));
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    } finally {
      setProcessing(null);
    }
  };

  const getFilteredComments = () => {
    switch (filter) {
      case 'pending':
        return comments.filter(comment => !comment.approved);
      case 'approved':
        return comments.filter(comment => comment.approved);
      default:
        return comments;
    }
  };

  const filteredComments = getFilteredComments();

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <MessageSquare className="w-6 h-6 mr-2" />
          Comments Management
        </h2>
        
        {/* Filter buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'pending'
                ? 'bg-orange-100 text-orange-800 border border-orange-200'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Pending ({comments.filter(c => !c.approved).length})
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'approved'
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Approved ({comments.filter(c => c.approved).length})
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-100 text-blue-800 border border-blue-200'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            All ({comments.length})
          </button>
        </div>
      </div>

      {/* Comments List */}
      {filteredComments.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <MessageSquare className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {filter === 'all' ? '' : filter} comments
          </h3>
          <p className="text-gray-600">
            {filter === 'pending' 
              ? 'All comments have been reviewed.'
              : filter === 'approved'
              ? 'No approved comments yet.'
              : 'No comments have been submitted yet.'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg shadow">
              <div className="p-6">
                {/* Comment Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{comment.author_name}</h4>
                      <p className="text-sm text-gray-600">{comment.author_email}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatRelativeTime(comment.created_at)}</span>
                        {comment.parent_id && (
                          <>
                            <span>•</span>
                            <span>Reply to comment</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    comment.approved 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {comment.approved ? 'Approved' : 'Pending'}
                  </div>
                </div>

                {/* Tutorial info */}
                {comment.tutorial_title && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Tutorial: {comment.tutorial_title}
                        </p>
                        {comment.reply_count && comment.reply_count > 0 && (
                          <p className="text-xs text-gray-600 mt-1">
                            {comment.reply_count} {comment.reply_count === 1 ? 'reply' : 'replies'}
                          </p>
                        )}
                      </div>
                      {comment.tutorial_slug && (
                        <Link
                          href={`/tutorial/${comment.tutorial_slug}`}
                          target="_blank"
                          className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View
                        </Link>
                      )}
                    </div>
                  </div>
                )}

                {/* Comment content */}
                <div className="mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    {!comment.approved && (
                      <button
                        onClick={() => approveComment(comment.id)}
                        disabled={processing === comment.id}
                        className="flex items-center space-x-1 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                      >
                        {processing === comment.id ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                        <span>Approve</span>
                      </button>
                    )}
                    
                    <button
                      onClick={() => deleteComment(comment.id)}
                      disabled={processing === comment.id}
                      className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
                    >
                      {processing === comment.id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      <span>Delete</span>
                    </button>
                  </div>

                  {comment.tutorial_slug && (
                    <Link
                      href={`/tutorial/${comment.tutorial_slug}#comments`}
                      target="_blank"
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View on site</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsManager;
