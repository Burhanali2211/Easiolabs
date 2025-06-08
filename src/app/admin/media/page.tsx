'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import MediaManager from '@/components/admin/MediaManager';
import { ArrowLeft, Image as ImageIcon, Upload, HardDrive } from 'lucide-react';

export default function MediaAdmin() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalSize: '0 MB'
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user) {
      checkAdminAccess();
      loadStats();
    }
  }, [user, loading, router]);

  const checkAdminAccess = async () => {
    const adminStatus = await isAdmin();
    if (!adminStatus) {
      router.push('/admin/login');
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('/api/admin/upload', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setStats({
          totalFiles: data.files?.length || 0,
          totalSize: '0 MB' // You could calculate this from file sizes
        });
      }
    } catch (error) {
      console.error('Error loading stats:', error);
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
                <h1 className="text-3xl font-bold text-gray-900">Media Library</h1>
                <p className="text-gray-600">Manage your images and files</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ImageIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Files</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalFiles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <HardDrive className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Storage Used</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSize}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Upload className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upload Limit</p>
                <p className="text-2xl font-bold text-gray-900">10 MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Media Manager */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">File Manager</h2>
            <div className="border rounded-lg overflow-hidden" style={{ height: '600px' }}>
              <div className="h-full">
                <MediaManager
                  isOpen={true}
                  onClose={() => { }}
                  allowMultiple={true}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-4">Media Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">Supported Formats</h4>
              <ul className="space-y-1">
                <li>• JPEG (.jpg, .jpeg)</li>
                <li>• PNG (.png)</li>
                <li>• WebP (.webp)</li>
                <li>• GIF (.gif)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Optimization</h4>
              <ul className="space-y-1">
                <li>• Images are automatically resized to max 1920x1080</li>
                <li>• Converted to WebP format for better performance</li>
                <li>• Thumbnails generated automatically</li>
                <li>• Quality optimized to 85% for best balance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-green-900 mb-4">Best Practices</h3>
          <div className="text-sm text-green-800 space-y-2">
            <p>• Use descriptive filenames for better organization</p>
            <p>• Upload high-quality images - they'll be optimized automatically</p>
            <p>• For tutorial images, aim for 16:9 aspect ratio when possible</p>
            <p>• Consider using featured images that represent your tutorial content well</p>
            <p>• Delete unused files regularly to keep your media library organized</p>
          </div>
        </div>
      </div>
    </div>
  );
}
