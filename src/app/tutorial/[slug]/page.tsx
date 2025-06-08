import { notFound } from 'next/navigation';
import { ContentService } from '@/lib/content';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, BarChart3, Calendar, Tag } from 'lucide-react';
import TutorialComments from '@/components/TutorialComments';
import BookmarkButton from '@/components/BookmarkButton';
import TutorialProgress from '@/components/TutorialProgress';
import TutorialRating from '@/components/TutorialRating';

// Force dynamic rendering to avoid build-time database connection issues
export const dynamic = 'force-dynamic';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tutorial = await ContentService.getTutorialBySlug(params.slug);

  if (!tutorial) {
    return {
      title: 'Tutorial Not Found',
    };
  }

  return {
    title: `${tutorial.title} | EasyioLabs`,
    description: tutorial.description,
    keywords: tutorial.tags?.join(', '),
    openGraph: {
      title: tutorial.title,
      description: tutorial.description,
      images: tutorial.featured_image ? [tutorial.featured_image] : [],
    },
  };
}

export default async function TutorialPage({ params }: Props) {
  const tutorial = await ContentService.getTutorialBySlug(params.slug);

  if (!tutorial || !tutorial.published) {
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
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span className="mx-2">→</span>
            {tutorial.category && (
              <>
                <Link
                  href={`/category/${tutorial.category.slug}`}
                  className="hover:text-blue-600"
                >
                  {tutorial.category.name}
                </Link>
                <span className="mx-2">→</span>
              </>
            )}
            <span className="text-gray-900">{tutorial.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {tutorial.title}
          </h1>

          {/* Meta Information and Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(tutorial.created_at)}
              </div>

              {tutorial.duration && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {tutorial.duration}
                </div>
              )}

              <div className="flex items-center">
                <BarChart3 className="h-4 w-4 mr-1" />
                {tutorial.view_count} views
              </div>

              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                {tutorial.difficulty}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <BookmarkButton tutorialSlug={tutorial.slug} />
            </div>
          </div>

          {/* Tags */}
          {tutorial.tags && tutorial.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tutorial.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Featured Image */}
          {tutorial.featured_image && (
            <div className="aspect-video bg-gradient-to-br from-blue-500 to-green-600 rounded-lg mb-8 flex items-center justify-center overflow-hidden">
              <img
                src={tutorial.featured_image}
                alt={tutorial.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient background if image fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-white text-lg absolute">
                {tutorial.title}
              </span>
            </div>
          )}

          {/* Description */}
          {tutorial.description && (
            <div className="text-lg text-gray-700 leading-relaxed mb-8">
              {tutorial.description}
            </div>
          )}
        </header>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-gray-100"
          dangerouslySetInnerHTML={{ __html: tutorial.content }}
        />

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              By {tutorial.author} • Last updated {formatDate(tutorial.updated_at)}
            </div>

            <Link
              href={tutorial.category ? `/category/${tutorial.category.slug}` : '/'}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to {tutorial.category?.name || 'Tutorials'}
            </Link>
          </div>
        </footer>
      </article>

      {/* Interactive Components */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Progress Tracking */}
          <TutorialProgress tutorialSlug={tutorial.slug} />

          {/* Rating System */}
          <TutorialRating tutorialSlug={tutorial.slug} />
        </div>

        {/* Comments Section */}
        <div id="comments">
          <TutorialComments tutorialSlug={tutorial.slug} />
        </div>
      </div>

      {/* Related Tutorials */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            More {tutorial.category?.name} Tutorials
          </h2>
          <div className="text-gray-600">
            <Link
              href={tutorial.category ? `/category/${tutorial.category.slug}` : '/'}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View all {tutorial.category?.name} tutorials →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
