'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ContentClientService } from '@/lib/content-client';
import type { Tutorial, Category } from '@/lib/types';
import {
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Clock,
  Eye,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';

interface SearchResult {
  tutorials: Tutorial[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  filters: {
    query: string;
    category?: string;
    difficulty?: string;
    tags: string[];
    sortBy: string;
    sortOrder: string;
  };
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  // Search form state
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState(searchParams.get('difficulty') || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags')?.split(',').filter(Boolean) || []
  );
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'relevance');
  const [sortOrder, setSortOrder] = useState(searchParams.get('sortOrder') || 'desc');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1'));

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'date', label: 'Date' },
    { value: 'views', label: 'Views' },
    { value: 'title', label: 'Title' }
  ];

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    performSearch();
  }, [searchParams]);

  const loadCategories = async () => {
    try {
      const data = await ContentClientService.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const performSearch = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      
      const query = searchParams.get('q') || '';
      const category = searchParams.get('category') || '';
      const difficulty = searchParams.get('difficulty') || '';
      const tags = searchParams.get('tags') || '';
      const sort = searchParams.get('sortBy') || 'relevance';
      const order = searchParams.get('sortOrder') || 'desc';
      const page = searchParams.get('page') || '1';

      if (query) params.set('q', query);
      if (category) params.set('category', category);
      if (difficulty) params.set('difficulty', difficulty);
      if (tags) params.set('tags', tags);
      params.set('sortBy', sort);
      params.set('sortOrder', order);
      params.set('page', page);

      const response = await fetch(`/api/search?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResult(data);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  const updateSearchParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset to page 1 when filters change
    if (Object.keys(updates).some(key => key !== 'page')) {
      params.set('page', '1');
    }

    router.push(`/search?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams({
      q: searchQuery,
      category: selectedCategory || null,
      difficulty: selectedDifficulty || null,
      tags: selectedTags.length > 0 ? selectedTags.join(',') : null,
      sortBy,
      sortOrder
    });
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedDifficulty('');
    setSelectedTags([]);
    setSortBy('relevance');
    setSortOrder('desc');
    updateSearchParams({
      category: null,
      difficulty: null,
      tags: null,
      sortBy: 'relevance',
      sortOrder: 'desc'
    });
  };

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ page: page.toString() });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Search Tutorials</h1>
          <p className="text-gray-600 mt-2">
            Find electronics tutorials, guides, and projects
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Form */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tutorials, projects, guides..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Search
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t pt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                      Difficulty
                    </label>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">All Levels</option>
                      {difficulties.map((difficulty) => (
                        <option key={difficulty} value={difficulty}>
                          {difficulty}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sort By
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        {sortOrder === 'asc' ? <SortAsc className="h-5 w-5" /> : <SortDesc className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-gray-800"
                  >
                    Clear all filters
                  </button>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">View:</span>
                    <button
                      type="button"
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Search Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Searching...</div>
          </div>
        ) : searchResult ? (
          <div>
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {searchResult.pagination.total} results
                  {searchResult.filters.query && ` for "${searchResult.filters.query}"`}
                </h2>
                <p className="text-gray-600">
                  Page {searchResult.pagination.page} of {searchResult.pagination.totalPages}
                </p>
              </div>
            </div>

            {/* Results Grid/List */}
            {searchResult.tutorials.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {searchResult.tutorials.map((tutorial) => (
                  <div
                    key={tutorial.id}
                    className={`bg-white rounded-lg shadow hover:shadow-lg transition-shadow ${
                      viewMode === 'list' ? 'flex p-4' : 'overflow-hidden'
                    }`}
                  >
                    {viewMode === 'grid' ? (
                      <>
                        {tutorial.featured_image && (
                          <div className="h-48 bg-gray-200">
                            <img
                              src={tutorial.featured_image}
                              alt={tutorial.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center mb-2">
                            {tutorial.category && (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tutorial.category.color} bg-opacity-10`}>
                                {tutorial.category.name}
                              </span>
                            )}
                            <span className="ml-auto text-xs text-gray-500">{tutorial.difficulty}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            <Link href={`/tutorial/${tutorial.slug}`} className="hover:text-blue-600">
                              {tutorial.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {tutorial.description}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(tutorial.created_at).toLocaleDateString()}
                            <Eye className="h-4 w-4 ml-4 mr-1" />
                            {tutorial.view_count} views
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {tutorial.featured_image && (
                          <div className="w-32 h-24 bg-gray-200 rounded mr-4 flex-shrink-0">
                            <img
                              src={tutorial.featured_image}
                              alt={tutorial.title}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {tutorial.category && (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tutorial.category.color} bg-opacity-10`}>
                                {tutorial.category.name}
                              </span>
                            )}
                            <span className="ml-auto text-xs text-gray-500">{tutorial.difficulty}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            <Link href={`/tutorial/${tutorial.slug}`} className="hover:text-blue-600">
                              {tutorial.title}
                            </Link>
                          </h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                            {tutorial.description}
                          </p>
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {new Date(tutorial.created_at).toLocaleDateString()}
                            <Eye className="h-4 w-4 ml-4 mr-1" />
                            {tutorial.view_count} views
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tutorials found</h3>
                <p className="text-gray-600">Try adjusting your search terms or filters</p>
              </div>
            )}

            {/* Pagination */}
            {searchResult.pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <button
                  onClick={() => handlePageChange(searchResult.pagination.page - 1)}
                  disabled={!searchResult.pagination.hasPrev}
                  className="p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                {Array.from({ length: searchResult.pagination.totalPages }, (_, i) => i + 1)
                  .filter(page => 
                    page === 1 || 
                    page === searchResult.pagination.totalPages || 
                    Math.abs(page - searchResult.pagination.page) <= 2
                  )
                  .map((page, index, array) => (
                    <div key={page} className="flex items-center">
                      {index > 0 && array[index - 1] !== page - 1 && (
                        <span className="px-2 text-gray-500">...</span>
                      )}
                      <button
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-2 rounded ${
                          page === searchResult.pagination.page
                            ? 'bg-blue-600 text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    </div>
                  ))}
                
                <button
                  onClick={() => handlePageChange(searchResult.pagination.page + 1)}
                  disabled={!searchResult.pagination.hasNext}
                  className="p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start your search</h3>
            <p className="text-gray-600">Enter keywords to find tutorials and guides</p>
          </div>
        )}
      </div>
    </div>
  );
}
