'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  X, 
  Trash2, 
  Copy, 
  Image as ImageIcon,
  Grid,
  List,
  Search,
  Filter,
  Download
} from 'lucide-react';

interface MediaFile {
  filename: string;
  url: string;
  thumbnail: string;
}

interface MediaManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (url: string) => void;
  allowMultiple?: boolean;
}

export default function MediaManager({ 
  isOpen, 
  onClose, 
  onSelect, 
  allowMultiple = false 
}: MediaManagerProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      loadFiles();
    }
  }, [isOpen]);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/upload', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
      }
    } catch (error) {
      console.error('Error loading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (fileList: FileList) => {
    setUploading(true);
    
    try {
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('maxWidth', '1920');
        formData.append('maxHeight', '1080');
        formData.append('quality', '85');
        formData.append('format', 'webp');

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          credentials: 'include',
          body: formData
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Upload failed');
        }
      }
      
      await loadFiles();
    } catch (error) {
      console.error('Upload error:', error);
      alert(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileSelect = (url: string) => {
    if (allowMultiple) {
      setSelectedFiles(prev => 
        prev.includes(url) 
          ? prev.filter(f => f !== url)
          : [...prev, url]
      );
    } else {
      setSelectedFiles([url]);
      if (onSelect) {
        onSelect(url);
        onClose();
      }
    }
  };

  const handleDeleteFile = async (filename: string) => {
    if (!confirm('Are you sure you want to delete this file?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/upload?filename=${filename}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        await loadFiles();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    // You could add a toast notification here
  };

  const filteredFiles = files.filter(file =>
    file.filename.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-5/6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Media Manager</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload Files'}
            </button>
            
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search files..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {/* Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`m-4 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">
              Drag and drop files here, or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                browse to upload
              </button>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Supports: JPEG, PNG, WebP, GIF (max 10MB)
            </p>
          </div>

          {/* Files Grid/List */}
          <div className="p-4 overflow-y-auto" style={{ height: 'calc(100% - 200px)' }}>
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-gray-500">Loading files...</div>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-gray-500">No files found</div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredFiles.map((file) => (
                  <div
                    key={file.filename}
                    className={`relative group border rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedFiles.includes(file.url)
                        ? 'ring-2 ring-blue-500 border-blue-500'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleFileSelect(file.url)}
                  >
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      <img
                        src={file.thumbnail}
                        alt={file.filename}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = file.url;
                        }}
                      />
                    </div>
                    
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            copyToClipboard(file.url);
                          }}
                          className="p-2 bg-white rounded-full text-gray-700 hover:text-blue-600"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFile(file.filename);
                          }}
                          className="p-2 bg-white rounded-full text-gray-700 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <p className="text-xs text-gray-600 truncate">{file.filename}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredFiles.map((file) => (
                  <div
                    key={file.filename}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedFiles.includes(file.url)
                        ? 'ring-2 ring-blue-500 border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleFileSelect(file.url)}
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                      <img
                        src={file.thumbnail}
                        alt={file.filename}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                        }}
                      />
                      <ImageIcon className="h-6 w-6 text-gray-400 hidden" />
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{file.filename}</p>
                      <p className="text-sm text-gray-500">{file.url}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(file.url);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteFile(file.filename);
                        }}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        {allowMultiple && selectedFiles.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {selectedFiles.length} file(s) selected
              </p>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedFiles([])}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Clear Selection
                </button>
                <button
                  onClick={() => {
                    if (onSelect && selectedFiles.length > 0) {
                      onSelect(selectedFiles[0]); // For now, just select the first one
                      onClose();
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Use Selected
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              handleFileUpload(e.target.files);
            }
          }}
          className="hidden"
        />
      </div>
    </div>
  );
}
