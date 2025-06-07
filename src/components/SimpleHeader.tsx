'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';

const SimpleHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">EasyioLabs</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/electronics-101" className="text-gray-700 hover:text-blue-600">
              Electronics 101
            </Link>
            <Link href="/arduino-programming-fundamentals" className="text-gray-700 hover:text-blue-600">
              Arduino Programming
            </Link>
            <Link href="/calculators" className="text-gray-700 hover:text-blue-600">
              Calculators
            </Link>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={handleSearchClick}
              className="text-gray-700 hover:text-blue-600 p-2"
              type="button"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={handleMenuClick}
              className="md:hidden text-gray-700 hover:text-blue-600 p-2"
              type="button"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/electronics-101"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Electronics 101
              </Link>
              <Link
                href="/arduino-programming-fundamentals"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Arduino Programming
              </Link>
              <Link
                href="/calculators"
                className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Calculators
              </Link>
            </div>
          </div>
        )}

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tutorials, guides, and more..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default SimpleHeader;
