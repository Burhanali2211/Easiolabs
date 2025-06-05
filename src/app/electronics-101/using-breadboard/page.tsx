import Link from 'next/link';
import { ArrowRight, ArrowLeft, Clock, Target, CheckCircle } from 'lucide-react';

const UsingBreadboardPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">Electronics 101</span>
            <span className="text-sm text-gray-600">Lesson 4 of 10</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Using a Breadboard
          </h1>
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              30 min read
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Beginner</span>
            <span className="flex items-center">
              <Target className="h-4 w-4 mr-1" />
              Lesson 4 of 10
            </span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Get ready for the most exciting part of electronics - building real circuits! A breadboard
            is like a magical construction playground where you can bring circuit diagrams to life
            without any soldering. Think of it as electronic LEGO blocks!
          </p>

          {/* What You'll Learn */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              What You'll Learn
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="text-blue-800 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  How breadboards work and why they're amazing
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Understanding the secret connection patterns
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Step-by-step circuit building like a pro
                </li>
              </ul>
              <ul className="text-blue-800 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Avoiding the most common beginner mistakes
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Organizing wires like a professional engineer
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Building your first real working circuit!
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="tutorial-content">
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2>What is a Breadboard?</h2>
              <p>
                A breadboard is like a temporary construction site for electronic circuits. It lets you
                connect components together without soldering, making it perfect for learning,
                experimenting, and prototyping circuits.
              </p>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg my-8">
                <div className="flex items-center mb-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-lg font-bold text-green-900">Why Use a Breadboard?</h3>
                </div>
                <ul className="text-green-800 space-y-1">
                  <li>• No soldering required - perfect for beginners</li>
                  <li>• Reusable - components can be removed and reused</li>
                  <li>• Quick to build and modify circuits</li>
                  <li>• Safe for learning and experimenting</li>
                </ul>
              </div>
            </section>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <Link
            href="/electronics-101/reading-circuit-diagrams"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4 sm:mb-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back: Reading Circuit Diagrams
          </Link>

          <Link
            href="/electronics-101/first-led-circuit"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Next: Your First LED Circuit
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </article>
    </div>
  );
};

export default UsingBreadboardPage;
