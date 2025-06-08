'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { ContentClientService } from '@/lib/content-client';
import type { Tutorial, Category } from '@/lib/types';
import {
  BookOpen,
  FileText,
  Users,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  LogOut,
  Image as ImageIcon,
  MessageSquare
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, loading, signOut, isAdmin } = useAuth();
  const router = useRouter();
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState({
    totalTutorials: 0,
    publishedTutorials: 0,
    totalViews: 0,
    totalCategories: 0
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user) {
      checkAdminAccess();
      loadDashboardData();
    }
  }, [user, loading, router]);

  const checkAdminAccess = async () => {
    const adminStatus = await isAdmin();
    if (!adminStatus) {
      await signOut();
      router.push('/admin/login');
    }
  };

  const loadDashboardData = async () => {
    try {
      const [tutorialsData, categoriesData] = await Promise.all([
        ContentClientService.getTutorials(undefined, false), // Get all tutorials including unpublished
        ContentClientService.getCategories()
      ]);

      setTutorials(tutorialsData);
      setCategories(categoriesData);

      // Calculate stats
      const totalViews = tutorialsData.reduce((sum, tutorial) => sum + tutorial.view_count, 0);
      const publishedCount = tutorialsData.filter(t => t.published).length;

      setStats({
        totalTutorials: tutorialsData.length,
        publishedTutorials: publishedCount,
        totalViews,
        totalCategories: categoriesData.length
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
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
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-blue-600 flex items-center"
              >
                <Eye className="h-5 w-5 mr-2" />
                View Site
              </Link>
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-red-600 flex items-center"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tutorials</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTutorials}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">{stats.publishedTutorials}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCategories}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Link
            href="/admin/tutorials/new"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center">
              <Plus className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">New Tutorial</h3>
                <p className="text-gray-600">Create a new tutorial or guide</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/categories"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-green-600 group-hover:text-green-700" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Manage Categories</h3>
                <p className="text-gray-600">Organize content categories</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/comments"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-indigo-600 group-hover:text-indigo-700" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Manage Comments</h3>
                <p className="text-gray-600">Moderate user comments</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/pages"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-600 group-hover:text-purple-700" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Manage Pages</h3>
                <p className="text-gray-600">Edit static pages</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/media"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center">
              <ImageIcon className="h-8 w-8 text-orange-600 group-hover:text-orange-700" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Media Library</h3>
                <p className="text-gray-600">Manage images and files</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/analytics"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow group"
          >
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-pink-600 group-hover:text-pink-700" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
                <p className="text-gray-600">View site performance</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Tutorials */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Recent Tutorials</h2>
              <Link
                href="/admin/tutorials"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {tutorials.slice(0, 5).map((tutorial) => (
              <div key={tutorial.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">{tutorial.title}</h3>
                  <p className="text-sm text-gray-600">
                    {tutorial.category?.name} • {tutorial.view_count} views
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${tutorial.published
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {tutorial.published ? 'Published' : 'Draft'}
                  </span>
                  <Link
                    href={`/admin/tutorials/${tutorial.id}/edit`}
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
