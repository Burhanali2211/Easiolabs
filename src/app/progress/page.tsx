import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressDashboard from '@/components/ProgressDashboard';
import { BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Learning Progress - EasyioLabs Electronics',
  description: 'Track your learning progress and see completed tutorials on EasyioLabs Electronics.',
  robots: 'noindex, nofollow', // Private page
};

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Learning Progress</h1>
          </div>
          <p className="text-lg text-gray-600">
            Track your learning journey and see how much you've accomplished.
          </p>
        </div>

        {/* Progress Dashboard */}
        <ProgressDashboard />
      </main>

      <Footer />
    </div>
  );
}
