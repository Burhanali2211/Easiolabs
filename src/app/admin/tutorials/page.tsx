'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';
import { ContentClientService } from '@/lib/content-client';
import type { Tutorial, Category } from '@/lib/types';
import {
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Eye,
  EyeOff,
  Search,
  Filter,
  BookOpen,
  Calendar,
  BarChart3
} from 'lucide-react';

export default function TutorialsAdmin() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user) {
      checkAdminAccess();
      loadData();
    }
  }, [user, loading, router]);

  useEffect(() => {
    filterTutorials();
  }, [tutorials, searchTerm, selectedCategory, statusFilter]);

  const checkAdminAccess = async () => {
    const adminStatus = await isAdmin();
    if (!adminStatus) {
      router.push('/admin/login');
    }
  };

  const loadData = async () => {
    try {
      const [tutorialsData, categoriesData] = await Promise.all([
        ContentClientService.getTutorials(undefined, false), // Get all tutorials including unpublished
        ContentClientService.getCategories()
      ]);
      
      setTutorials(tutorialsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const filterTutorials = () => {
    let filtered = tutorials;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(tutorial =>
        tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutorial.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(tutorial => tutorial.category_id === selectedCategory);
    }

    // Status filter
    if (statusFilter === 'published') {
      filtered = filtered.filter(tutorial => tutorial.published);
    } else if (statusFilter === 'draft') {
      filtered = filtered.filter(tutorial => !tutorial.published);
    }

    setFilteredTutorials(filtered);
  };

  const handleDelete = async (tutorial: Tutorial) => {
    if (!confirm(`Are you sure you want to delete "${tutorial.title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await ContentClientService.deleteTutorial(tutorial.id);
      await loadData();
    } catch (error) {
      console.error('Error deleting tutorial:', error);
      alert('Error deleting tutorial.');
    }
  };

  const togglePublished = async (tutorial: Tutorial) => {
    try {
      await ContentClientService.updateTutorial(tutorial.id, {
        published: !tutorial.published
      });
      await loadData();
    } catch (error) {
      console.error('Error updating tutorial:', error);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-lg">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="mr-4 text-gray-600 hover:text-blue-600"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Manage Tutorials</h1>
                <p className="text-gray-600">Create and edit tutorial content</p>
              </div>
            </div>
            <Link
              href="/admin/tutorials/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Tutorial
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tutorials..."
                  className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setStatusFilter('all');
                }}
                className="w-full px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Tutorials</p>
                <p className="text-2xl font-bold text-gray-900">{tutorials.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tutorials.filter(t => t.published).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tutorials.reduce((sum, t) => sum + t.view_count, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tutorials List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Tutorials ({filteredTutorials.length})
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredTutorials.map((tutorial) => {
              const category = categories.find(c => c.id === tutorial.category_id);
              
              return (
                <div key={tutorial.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="mr-4">
                      <BookOpen className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{tutorial.title}</h3>
                      <p className="text-sm text-gray-600">
                        {category?.name} • {tutorial.difficulty} • {tutorial.view_count} views
                      </p>
                      {tutorial.description && (
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {tutorial.description}
                        </p>
                      )}
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-xs text-gray-500">
                          <Calendar className="h-3 w-3 inline mr-1" />
                          {new Date(tutorial.created_at).toLocaleDateString()}
                        </span>
                        {tutorial.tags && tutorial.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {tutorial.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {tag}
                              </span>
                            ))}
                            {tutorial.tags.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{tutorial.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center mr-4">
                      <button
                        onClick={() => togglePublished(tutorial)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tutorial.published
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {tutorial.published ? (
                          <>
                            <Eye className="h-3 w-3 mr-1" />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3 mr-1" />
                            Draft
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/admin/tutorials/edit/${tutorial.id}`}
                      className="text-blue-600 hover:text-blue-700 p-2"
                    >
                      <Edit className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(tutorial)}
                      className="text-red-600 hover:text-red-700 p-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
