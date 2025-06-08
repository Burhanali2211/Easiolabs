'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BarChart3, Trophy, Clock, BookOpen, TrendingUp, CheckCircle, Circle } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

interface ProgressStats {
  totalTutorials: number;
  completedTutorials: number;
  inProgressTutorials: number;
  averageProgress: number;
}

interface ProgressItem {
  id: string;
  tutorial_id: string;
  progress_percentage: number;
  completed: boolean;
  last_accessed: string;
  tutorial: {
    id: string;
    title: string;
    slug: string;
    featured_image?: string;
    difficulty: string;
    duration: string;
    category?: {
      name: string;
      color: string;
    };
  };
}

interface ProgressDashboardProps {
  className?: string;
}

const ProgressDashboard = ({ className = '' }: ProgressDashboardProps) => {
  const [stats, setStats] = useState<ProgressStats>({
    totalTutorials: 0,
    completedTutorials: 0,
    inProgressTutorials: 0,
    averageProgress: 0
  });
  const [progressItems, setProgressItems] = useState<ProgressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      const response = await fetch('/api/progress');
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setProgressItems(data.progress);
      }
    } catch (error) {
      console.error('Error fetching progress data:', error);
    } finally {
      setLoading(false);
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

  const getProgressColor = (percentage: number, completed: boolean) => {
    if (completed) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    if (percentage >= 25) return 'bg-orange-500';
    return 'bg-gray-300';
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        {/* Stats skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-8 mb-3"></div>
              <div className="h-6 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          ))}
        </div>
        
        {/* Progress items skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-12 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (progressItems.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <BarChart3 className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No progress yet</h3>
        <p className="text-gray-600 mb-6">
          Start reading tutorials to track your learning progress.
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
    <div className={`space-y-6 ${className}`}>
      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalTutorials}</p>
              <p className="text-sm text-gray-600">Total Started</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Trophy className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.completedTutorials}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-orange-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgressTutorials}</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-gray-900">{Math.round(stats.averageProgress)}%</p>
              <p className="text-sm text-gray-600">Avg Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Your Learning Progress
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {progressItems.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                {/* Thumbnail */}
                <div className="flex-shrink-0">
                  {item.tutorial.featured_image ? (
                    <img
                      src={item.tutorial.featured_image}
                      alt={item.tutorial.title}
                      className="w-16 h-12 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Link
                        href={`/tutorial/${item.tutorial.slug}`}
                        className="block group"
                      >
                        <h4 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {item.tutorial.title}
                        </h4>
                      </Link>

                      {/* Meta info */}
                      <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                        {item.tutorial.category && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.tutorial.category.color || 'bg-blue-100 text-blue-800'}`}>
                            {item.tutorial.category.name}
                          </span>
                        )}
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.tutorial.difficulty)}`}>
                          {item.tutorial.difficulty}
                        </span>

                        {item.tutorial.duration && (
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{item.tutorial.duration}</span>
                          </div>
                        )}
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">
                            {item.completed ? 'Completed!' : `${item.progress_percentage}% Complete`}
                          </span>
                          <div className="flex items-center text-xs text-gray-500">
                            {item.completed ? (
                              <CheckCircle className="w-3 h-3 text-green-600 mr-1" />
                            ) : (
                              <Circle className="w-3 h-3 mr-1" />
                            )}
                            <span>Last read {formatRelativeTime(item.last_accessed)}</span>
                          </div>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(item.progress_percentage, item.completed)}`}
                            style={{ width: `${item.progress_percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Continue button */}
                    <Link
                      href={`/tutorial/${item.tutorial.slug}`}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      {item.completed ? 'Review' : 'Continue'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;
