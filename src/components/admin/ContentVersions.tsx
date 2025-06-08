'use client';

import { useState, useEffect } from 'react';
import { History, RotateCcw, Eye, User, Clock, FileText } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

interface ContentVersion {
  id: string;
  content_type: string;
  content_id: string;
  version_number: number;
  title: string;
  content: string;
  metadata: any;
  created_by: string;
  created_by_email: string;
  created_at: string;
}

interface ContentVersionsProps {
  contentType: string;
  contentId: string;
  className?: string;
}

const ContentVersions = ({ contentType, contentId, className = '' }: ContentVersionsProps) => {
  const [versions, setVersions] = useState<ContentVersion[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState<ContentVersion | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [restoring, setRestoring] = useState<string | null>(null);

  useEffect(() => {
    fetchVersions();
  }, [contentId]);

  const fetchVersions = async () => {
    try {
      const response = await fetch(`/api/admin/content/${contentId}/versions`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setVersions(data.versions);
      }
    } catch (error) {
      console.error('Error fetching versions:', error);
    } finally {
      setLoading(false);
    }
  };

  const restoreVersion = async (versionId: string, versionNumber: number) => {
    if (!confirm(`Are you sure you want to restore version ${versionNumber}? This will overwrite the current content.`)) {
      return;
    }

    setRestoring(versionId);
    try {
      const response = await fetch(`/api/admin/content/${contentId}/versions/${versionNumber}/restore`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        alert('Version restored successfully!');
        // Refresh versions to show the new current version
        fetchVersions();
      } else {
        const data = await response.json();
        alert(`Failed to restore version: ${data.error}`);
      }
    } catch (error) {
      console.error('Error restoring version:', error);
      alert('Failed to restore version');
    } finally {
      setRestoring(null);
    }
  };

  const previewVersion = (version: ContentVersion) => {
    setSelectedVersion(version);
    setShowPreview(true);
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center mb-4">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <History className="w-5 h-5 mr-2" />
          Version History ({versions.length})
        </h3>
      </div>

      {versions.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg shadow">
          <History className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-600">No version history available</p>
        </div>
      ) : (
        <div className="space-y-3">
          {versions.map((version, index) => (
            <div key={version.id} className="bg-white rounded-lg shadow">
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-900">
                          Version {version.version_number}
                          {index === 0 && (
                            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              Current
                            </span>
                          )}
                        </h4>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <div className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          <span>{version.created_by_email}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{formatRelativeTime(version.created_at)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => previewVersion(version)}
                      className="flex items-center space-x-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                    
                    {index !== 0 && (
                      <button
                        onClick={() => restoreVersion(version.id, version.version_number)}
                        disabled={restoring === version.id}
                        className="flex items-center space-x-1 px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 transition-colors"
                      >
                        {restoring === version.id ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <RotateCcw className="w-4 h-4" />
                        )}
                        <span>Restore</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Version details */}
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <h5 className="font-medium text-gray-900 mb-1">{version.title}</h5>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {version.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selectedVersion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Preview Version {selectedVersion.version_number}
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedVersion.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>Version {selectedVersion.version_number}</span>
                  <span>•</span>
                  <span>By {selectedVersion.created_by_email}</span>
                  <span>•</span>
                  <span>{formatRelativeTime(selectedVersion.created_at)}</span>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: selectedVersion.content }} />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-6 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Content length: {selectedVersion.content.length} characters
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Close
                </button>
                {versions.findIndex(v => v.id === selectedVersion.id) !== 0 && (
                  <button
                    onClick={() => {
                      setShowPreview(false);
                      restoreVersion(selectedVersion.id, selectedVersion.version_number);
                    }}
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                  >
                    Restore This Version
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentVersions;
