'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search, User, Bookmark, BarChart3 } from 'lucide-react';
import SearchAutocomplete from './SearchAutocomplete';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigationItems = [
    {
      title: 'Electronics 101',
      href: '/electronics-101',
      description: 'Complete beginner\'s guide to electronics'
    },
    {
      title: 'Component Guide',
      href: '/component-guide',
      description: 'Visual guide to electronic components'
    },
    {
      title: 'Arduino',
      href: '/electronics/arduino-projects',
      description: 'Arduino projects and tutorials'
    },
    {
      title: 'ESP32',
      href: '/electronics/esp32-projects',
      description: 'ESP32 IoT projects'
    },
    {
      title: 'ESP8266',
      href: '/electronics/esp8266-projects',
      description: 'ESP8266 wireless projects'
    },
    {
      title: 'Basic Electronics',
      href: '/electronics/basic-electronics',
      description: 'Fundamental electronics concepts'
    }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">EasyioLabs</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center">
                Tutorials
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-2 w-80 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    >
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/services"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Services
            </Link>

            <Link
              href="/calculators"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Calculators
            </Link>

            <Link
              href="/circuit-simulator"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Simulator
            </Link>

            <Link
              href="/arduino-playground"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Playground
            </Link>

            <Link
              href="/faq"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              FAQ
            </Link>
          </nav>

          {/* Search, User Menu and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* User Menu (Desktop) */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href="/bookmarks"
                className="text-gray-700 hover:text-blue-600 p-2 rounded-md hover:bg-gray-100"
                title="My Bookmarks"
              >
                <Bookmark className="h-5 w-5" />
              </Link>
              <Link
                href="/progress"
                className="text-gray-700 hover:text-blue-600 p-2 rounded-md hover:bg-gray-100"
                title="Learning Progress"
              >
                <BarChart3 className="h-5 w-5" />
              </Link>
              <LanguageSwitcher />
            </div>

            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
              type="button"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600 p-2"
              type="button"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-200">
            <SearchAutocomplete
              placeholder="Search tutorials, guides, and projects..."
              onSearch={(query) => {
                setIsSearchOpen(false);
                setSearchQuery('');
              }}
            />
          </div>
        )}

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.href} onClick={() => setIsMenuOpen(false)}>
                  <Link
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    {item.title}
                  </Link>
                </div>
              ))}
              <div onClick={() => setIsMenuOpen(false)}>
                <Link
                  href="/services"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  Services
                </Link>
              </div>
              <div onClick={() => setIsMenuOpen(false)}>
                <Link
                  href="/calculators"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  Calculators
                </Link>
              </div>
              <div onClick={() => setIsMenuOpen(false)}>
                <Link
                  href="/circuit-simulator"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  Circuit Simulator
                </Link>
              </div>
              <div onClick={() => setIsMenuOpen(false)}>
                <Link
                  href="/arduino-playground"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  Arduino Playground
                </Link>
              </div>
              <div onClick={() => setIsMenuOpen(false)}>
                <Link
                  href="/faq"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                >
                  FAQ
                </Link>
              </div>

              {/* User Menu (Mobile) */}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div onClick={() => setIsMenuOpen(false)}>
                  <Link
                    href="/bookmarks"
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    <Bookmark className="h-5 w-5 mr-2" />
                    My Bookmarks
                  </Link>
                </div>
                <div onClick={() => setIsMenuOpen(false)}>
                  <Link
                    href="/progress"
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                  >
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Learning Progress
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


    </header>
  );
};

export default Header;
