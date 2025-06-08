'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, BookOpen, Tag, Folder, Clock } from 'lucide-react';

interface Suggestion {
  text: string;
  url: string;
  type: 'tutorial' | 'tag' | 'category';
}

interface SearchAutocompleteProps {
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
}

export default function SearchAutocomplete({
  placeholder = "Search tutorials, guides, and projects...",
  className = "",
  onSearch
}: SearchAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    }
  }, []);

  // Debounced search suggestions
  const debouncedGetSuggestions = useCallback(
    debounce(async (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(searchQuery)}`);
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.suggestions || []);
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    if (query.trim()) {
      debouncedGetSuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query, debouncedGetSuggestions]);

  const saveRecentSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSearch = (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;
    
    saveRecentSearch(searchQuery);
    setShowSuggestions(false);
    
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    saveRecentSearch(suggestion.text);
    setShowSuggestions(false);
    router.push(suggestion.url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    const totalSuggestions = suggestions.length + (recentSearches.length > 0 && !query.trim() ? recentSearches.length : 0);

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % totalSuggestions);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? totalSuggestions - 1 : prev - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          if (!query.trim() && selectedIndex < recentSearches.length) {
            // Recent search selected
            handleSearch(recentSearches[selectedIndex]);
          } else if (selectedIndex < suggestions.length) {
            // Suggestion selected
            handleSuggestionClick(suggestions[selectedIndex]);
          }
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'tutorial':
        return <BookOpen className="h-4 w-4" />;
      case 'tag':
        return <Tag className="h-4 w-4" />;
      case 'category':
        return <Folder className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = (e: React.FocusEvent) => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      if (!suggestionsRef.current?.contains(document.activeElement)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    }, 150);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto"
        >
          {/* Recent Searches */}
          {!query.trim() && recentSearches.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-3 py-2 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={search}
                  onClick={() => handleSearch(search)}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center ${
                    selectedIndex === index ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  <Search className="h-4 w-4 mr-3 text-gray-400" />
                  {search}
                </button>
              ))}
            </div>
          )}

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              {!query.trim() || recentSearches.length === 0 ? null : (
                <div className="text-xs font-medium text-gray-500 px-3 py-2">
                  Suggestions
                </div>
              )}
              {suggestions.map((suggestion, index) => {
                const adjustedIndex = !query.trim() ? index + recentSearches.length : index;
                return (
                  <button
                    key={`${suggestion.type}-${suggestion.text}`}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center ${
                      selectedIndex === adjustedIndex ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <span className="mr-3 text-gray-400">
                      {getIconForType(suggestion.type)}
                    </span>
                    <span className="flex-1">{suggestion.text}</span>
                    <span className="text-xs text-gray-400 capitalize ml-2">
                      {suggestion.type}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* No Results */}
          {query.trim() && suggestions.length === 0 && !loading && (
            <div className="p-4 text-center text-gray-500">
              <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No suggestions found</p>
              <button
                onClick={() => handleSearch()}
                className="text-blue-600 hover:text-blue-700 text-sm mt-1"
              >
                Search for "{query}"
              </button>
            </div>
          )}

          {/* Search All */}
          {query.trim() && suggestions.length > 0 && (
            <div className="border-t border-gray-100 p-2">
              <button
                onClick={() => handleSearch()}
                className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 flex items-center text-blue-600"
              >
                <Search className="h-4 w-4 mr-3" />
                Search for "{query}"
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
