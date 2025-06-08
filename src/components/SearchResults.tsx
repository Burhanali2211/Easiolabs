'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { ContentClientService } from '@/lib/content-client';
import type { Tutorial } from '@/lib/types';

interface SearchResultsProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
}

const SearchResults = ({ isOpen, onClose, searchQuery }: SearchResultsProps) => {
  const [results, setResults] = useState<Tutorial[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsLoading(true);

      // Search with debounce
      const timer = setTimeout(async () => {
        try {
          const searchResults = await ContentClientService.searchTutorials(searchQuery);
          setResults(searchResults);
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-96 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-lg font-medium text-gray-900">
              Search Results
              {searchQuery && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  for "{searchQuery}"
                </span>
              )}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Searching...</p>
            </div>
          ) : searchQuery.length <= 2 ? (
            <div className="p-8 text-center text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Type at least 3 characters to search</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No results found for "{searchQuery}"</p>
              <p className="text-sm mt-2">Try different keywords</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="block p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => {
                    onClose();
                    window.location.href = `/tutorial/${result.slug}`;
                  }}
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-1">
                        {result.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {result.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          {result.category?.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {result.view_count} views
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-500 text-center">
              Found {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
