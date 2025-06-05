import Link from 'next/link';
import { ArrowRight, Clock, Target, CheckCircle } from 'lucide-react';

export default function ReadingCircuitDiagramsPage() {


  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">Electronics 101</span>
            <span className="text-sm text-gray-600">Lesson 3 of 10</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Reading Circuit Diagrams
          </h1>
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              20 min read
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Beginner</span>
            <span className="flex items-center">
              <Target className="h-4 w-4 mr-1" />
              Lesson 3 of 10
            </span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Welcome to the world of circuit diagrams! Think of these as "maps" that show you exactly
            how to connect electronic components. Just like learning to read a map helps you navigate
            a city, learning to read circuit diagrams will help you build amazing electronic projects!
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
                  How to read 7 essential schematic symbols like a pro
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Tracing current flow through circuit diagrams
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Understanding component polarity and connections
                </li>
              </ul>
              <ul className="text-blue-800 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Avoiding common beginner mistakes
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Connecting real components to schematic symbols
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Building confidence with circuit interpretation
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="tutorial-content">
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2>What is a Circuit Diagram?</h2>
              <p>
                A circuit diagram (also called a schematic) is like a map that shows how electronic
                components are connected together. Instead of drawing realistic pictures of components,
                we use simple symbols that are understood by electronics enthusiasts worldwide.
              </p>
            </section>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-12 border-t border-gray-200">
          <Link
            href="/electronics-101/basic-components"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
            Previous: Basic Components
          </Link>
          <Link
            href="/electronics-101/using-breadboard"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Next: Using a Breadboard
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </article>
    </div>
  );
}
