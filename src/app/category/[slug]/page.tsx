import { notFound } from 'next/navigation';
import { ContentService } from '@/lib/content';
import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, BarChart3, Calendar, Tag } from 'lucide-react';

// Force dynamic rendering to avoid build-time database connection issues
export const dynamic = 'force-dynamic';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await ContentService.getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} Tutorials | EasyioLabs`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const [category, tutorials] = await Promise.all([
    ContentService.getCategoryBySlug(params.slug),
    ContentService.getTutorials(params.slug, true)
  ]);

  if (!category) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className={`inline-flex p-4 rounded-full ${category.color} bg-opacity-10 mb-4`}>
              <div className={`h-8 w-8 ${category.color.replace('bg-', 'text-')}`}>
                {/* Icon placeholder - you can implement icon mapping */}
                📚
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {category.description}
            </p>
            <div className="mt-6 text-sm text-gray-500">
              {tutorials.length} tutorial{tutorials.length !== 1 ? 's' : ''} available
            </div>
          </div>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {tutorials.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tutorials yet</h3>
              <p className="text-gray-600">
                Tutorials for this category are coming soon. Check back later!
              </p>
              <Link
                href="/"
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Browse Other Categories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tutorials.map((tutorial) => (
                <Link
                  key={tutorial.id}
                  href={`/tutorial/${tutorial.slug}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  {/* Featured Image */}
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 flex items-center justify-center relative overflow-hidden">
                    {tutorial.featured_image ? (
                      <img
                        src={tutorial.featured_image}
                        alt={tutorial.title}
                        className="w-full h-full object-cover opacity-80"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span className="text-gray-600 text-sm">{category.name} Tutorial</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                        {tutorial.difficulty}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <BarChart3 className="h-3 w-3 mr-1" />
                        {tutorial.view_count} views
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {tutorial.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                      {tutorial.description}
                    </p>

                    {/* Tags */}
                    {tutorial.tags && tutorial.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tutorial.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            <Tag className="h-2 w-2 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {tutorial.tags.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{tutorial.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(tutorial.created_at)}
                      </div>
                      {tutorial.duration && (
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {tutorial.duration}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-600 mb-6">
            Join thousands of learners who are mastering electronics with our step-by-step tutorials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/electronics-101"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start with Basics
            </Link>
            <Link
              href="/"
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Browse All Categories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
