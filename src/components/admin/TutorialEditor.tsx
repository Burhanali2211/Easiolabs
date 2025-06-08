'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ContentClientService } from '@/lib/content-client';
import type { Tutorial, Category } from '@/lib/types';
import { Save, Eye, ArrowLeft, Upload, Image as ImageIcon } from 'lucide-react';
import MediaManager from './MediaManager';
import EnhancedEditor from './EnhancedEditor';

interface TutorialEditorProps {
  tutorial?: Tutorial;
  onSave: (tutorial: Tutorial) => void;
  onCancel: () => void;
}

interface FormData {
  title: string;
  slug: string;
  description: string;
  content: string;
  category_id: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  tags: string;
  published: boolean;
  featured_image?: string;
}

export default function TutorialEditor({ tutorial, onSave, onCancel }: TutorialEditorProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [content, setContent] = useState(tutorial?.content || '');
  const [loading, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);
  const [showMediaManager, setShowMediaManager] = useState(false);
  const [mediaManagerTarget, setMediaManagerTarget] = useState<'featured' | 'content'>('featured');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      title: tutorial?.title || '',
      slug: tutorial?.slug || '',
      description: tutorial?.description || '',
      content: tutorial?.content || '',
      category_id: tutorial?.category_id || '',
      difficulty: tutorial?.difficulty || 'Beginner',
      duration: tutorial?.duration || '',
      tags: tutorial?.tags?.join(', ') || '',
      published: tutorial?.published || false,
      featured_image: tutorial?.featured_image || ''
    }
  });

  const watchTitle = watch('title');

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    // Auto-generate slug from title
    if (watchTitle && !tutorial) {
      const slug = ContentClientService.generateSlug(watchTitle);
      setValue('slug', slug);
    }
  }, [watchTitle, setValue, tutorial]);

  const loadCategories = async () => {
    const categoriesData = await ContentClientService.getCategories();
    setCategories(categoriesData);
  };

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    try {
      const tutorialData = {
        ...data,
        content,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      let savedTutorial;
      if (tutorial) {
        savedTutorial = await ContentClientService.updateTutorial(tutorial.id, tutorialData);
      } else {
        savedTutorial = await ContentClientService.createTutorial(tutorialData);
      }

      if (savedTutorial) {
        onSave(savedTutorial);
      }
    } catch (error) {
      console.error('Error saving tutorial:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleMediaSelect = (url: string) => {
    if (mediaManagerTarget === 'featured') {
      setValue('featured_image', url);
    } else {
      // Insert image into content at cursor position
      const imageHtml = `<img src="${url}" alt="Tutorial image" style="max-width: 100%; height: auto;" />`;
      setContent(prev => prev + imageHtml);
    }
    setShowMediaManager(false);
  };

  const openMediaManager = (target: 'featured' | 'content') => {
    setMediaManagerTarget(target);
    setShowMediaManager(true);
  };

  // Remove the old quill modules since we're using EnhancedEditor

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={onCancel}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {tutorial ? 'Edit Tutorial' : 'Create New Tutorial'}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setPreview(!preview)}
            className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            <Eye className="h-4 w-4 mr-2" />
            {preview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter tutorial title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug *
              </label>
              <input
                {...register('slug', { required: 'Slug is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="tutorial-slug"
              />
              {errors.slug && (
                <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the tutorial"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <EnhancedEditor
                value={content}
                onChange={setContent}
                onImageInsert={() => openMediaManager('content')}
                placeholder="Start writing your tutorial content..."
                height="500px"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    {...register('category_id', { required: 'Category is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.category_id && (
                    <p className="mt-1 text-sm text-red-600">{errors.category_id.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty
                  </label>
                  <select
                    {...register('difficulty')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    {...register('duration')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 30 minutes"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>
                  <input
                    {...register('tags')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Arduino, ESP32, IoT (comma separated)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image
                  </label>
                  <div className="space-y-2">
                    <input
                      {...register('featured_image')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                    <button
                      type="button"
                      onClick={() => openMediaManager('featured')}
                      className="w-full flex items-center justify-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose from Media Library
                    </button>
                    {watch('featured_image') && (
                      <div className="mt-2">
                        <img
                          src={watch('featured_image')}
                          alt="Featured image preview"
                          className="w-full h-32 object-cover rounded-md border"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    {...register('published')}
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">
                    Published
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : 'Save Tutorial'}
            </button>
          </div>
        </div>
      </form>

      {/* Media Manager Modal */}
      <MediaManager
        isOpen={showMediaManager}
        onClose={() => setShowMediaManager(false)}
        onSelect={handleMediaSelect}
      />
    </div>
  );
}
