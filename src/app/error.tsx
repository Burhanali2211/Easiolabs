'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, Mail } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="bg-red-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Something went wrong!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We encountered an unexpected error. Don't worry, our team has been notified 
            and we're working to fix it. Like a short circuit, sometimes things just need 
            a quick reset!
          </p>

          {/* Error Details (Development only) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mb-8 p-4 bg-gray-100 rounded-lg text-left">
              <h3 className="font-medium text-gray-900 mb-2">Error Details:</h3>
              <p className="text-sm text-gray-700 font-mono break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-gray-500 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={reset}
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </Link>
          </div>

          {/* Help Section */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              Need Help?
            </h3>
            <p className="text-blue-800 mb-4">
              If this error persists, please let us know so we can fix it quickly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                Report Issue
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-blue-200"
              >
                View FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            Error occurred at {new Date().toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
