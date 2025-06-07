'use client';

import Link from 'next/link';
import { Home, Search, BookOpen, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const popularPages = [
    {
      title: 'Arduino Projects',
      description: 'Explore Arduino tutorials and projects',
      href: '/electronics/arduino-projects',
      icon: BookOpen
    },
    {
      title: 'ESP32 Projects',
      description: 'Learn ESP32 development and IoT',
      href: '/electronics/esp32-projects',
      icon: BookOpen
    },
    {
      title: 'Basic Electronics',
      description: 'Start with electronics fundamentals',
      href: '/electronics/basic-electronics',
      icon: BookOpen
    },
    {
      title: 'FAQ',
      description: 'Find answers to common questions',
      href: '/faq',
      icon: Search
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="relative">
              <div className="text-9xl font-bold text-gray-200 select-none">404</div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-blue-100 rounded-full p-6">
                  <Search className="h-12 w-12 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Oops! The page you're looking for seems to have wandered off into the digital void.
            Don't worry, even the best circuits sometimes have loose connections!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>
          </div>

          {/* Popular Pages */}
          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Popular Pages
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {popularPages.map((page) => {
                const Icon = page.icon;
                return (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="group bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all duration-200"
                  >
                    <div className="flex items-start">
                      <div className="bg-blue-50 rounded-lg p-2 mr-4">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {page.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {page.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              Still can't find what you're looking for?
            </h3>
            <p className="text-blue-800 mb-4">
              Try using our search feature or browse our tutorials by category.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/#search"
                className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <Search className="h-4 w-4 mr-2" />
                Search Tutorials
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-blue-200"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            If you believe this is an error, please{' '}
            <Link href="/contact" className="text-blue-600 hover:text-blue-700">
              let us know
            </Link>{' '}
            and we'll fix it right away!
          </p>
        </div>
      </div>
    </div>
  );
}
