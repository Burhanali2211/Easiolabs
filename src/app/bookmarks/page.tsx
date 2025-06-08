import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookmarksList from '@/components/BookmarksList';
import { Bookmark } from 'lucide-react';

export const metadata: Metadata = {
  title: 'My Bookmarks - EasyioLabs Electronics',
  description: 'View and manage your bookmarked tutorials on EasyioLabs Electronics.',
  robots: 'noindex, nofollow', // Private page
};

export default function BookmarksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Bookmark className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">My Bookmarks</h1>
          </div>
          <p className="text-lg text-gray-600">
            Keep track of your favorite tutorials and read them later.
          </p>
        </div>

        {/* Bookmarks List */}
        <BookmarksList />
      </main>

      <Footer />
    </div>
  );
}
