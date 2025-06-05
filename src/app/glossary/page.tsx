'use client';

import { useState } from 'react';
import { Search, BookOpen, Zap, CircuitBoard, Cpu, Filter } from 'lucide-react';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  relatedTerms?: string[];
  example?: string;
}

const GlossaryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const categories = [
    { id: 'all', name: 'All Terms', icon: BookOpen },
    { id: 'basics', name: 'Basic Concepts', icon: Zap },
    { id: 'components', name: 'Components', icon: CircuitBoard },
    { id: 'arduino', name: 'Arduino/Programming', icon: Cpu }
  ];

  const glossaryTerms: GlossaryTerm[] = [
    {
      id: 'voltage',
      term: 'Voltage',
      definition: 'The electrical potential difference between two points. Think of it as electrical "pressure" that pushes current through a circuit.',
      category: 'basics',
      difficulty: 'Beginner',
      example: 'A 9V battery has 9 volts of electrical pressure.',
      relatedTerms: ['Current', 'Resistance', 'Ohms Law']
    },
    {
      id: 'current',
      term: 'Current',
      definition: 'The flow of electric charge through a conductor, measured in amperes (amps). Like water flowing through a pipe.',
      category: 'basics',
      difficulty: 'Beginner',
      example: 'An LED typically uses about 20 milliamps (0.02 amps) of current.',
      relatedTerms: ['Voltage', 'Resistance', 'Ampere']
    },
    {
      id: 'resistance',
      term: 'Resistance',
      definition: 'Opposition to the flow of electric current, measured in ohms (Ω). Materials with high resistance slow down current flow.',
      category: 'basics',
      difficulty: 'Beginner',
      example: 'A 220Ω resistor limits current flow in an LED circuit.',
      relatedTerms: ['Voltage', 'Current', 'Resistor']
    },
    {
      id: 'ohms-law',
      term: 'Ohm\'s Law',
      definition: 'The fundamental relationship between voltage, current, and resistance: V = I × R. This law helps calculate unknown values in circuits.',
      category: 'basics',
      difficulty: 'Beginner',
      example: 'If you have 5V and 1000Ω resistance, current = 5V ÷ 1000Ω = 0.005A (5mA).',
      relatedTerms: ['Voltage', 'Current', 'Resistance']
    },
    {
      id: 'resistor',
      term: 'Resistor',
      definition: 'A component that provides a specific amount of resistance to limit current flow. Often used to protect other components.',
      category: 'components',
      difficulty: 'Beginner',
      example: 'A current-limiting resistor protects an LED from too much current.',
      relatedTerms: ['Resistance', 'LED', 'Color Code']
    },
    {
      id: 'led',
      term: 'LED',
      definition: 'Light Emitting Diode - a component that emits light when current flows through it. Only works in one direction.',
      category: 'components',
      difficulty: 'Beginner',
      example: 'The power indicator on your computer is likely an LED.',
      relatedTerms: ['Diode', 'Resistor', 'Polarity']
    },
    {
      id: 'capacitor',
      term: 'Capacitor',
      definition: 'A component that stores electrical energy temporarily. Like a small rechargeable battery that charges and discharges quickly.',
      category: 'components',
      difficulty: 'Intermediate',
      example: 'Capacitors smooth out power supply fluctuations in circuits.',
      relatedTerms: ['Farad', 'Voltage', 'Energy Storage']
    },
    {
      id: 'arduino',
      term: 'Arduino',
      definition: 'A microcontroller board that can be programmed to control electronic components. Perfect for beginners learning electronics.',
      category: 'arduino',
      difficulty: 'Beginner',
      example: 'Arduino Uno is the most popular board for learning electronics.',
      relatedTerms: ['Microcontroller', 'Programming', 'Digital Pin']
    },
    {
      id: 'breadboard',
      term: 'Breadboard',
      definition: 'A reusable board for building temporary electronic circuits without soldering. Has holes connected in specific patterns.',
      category: 'components',
      difficulty: 'Beginner',
      example: 'Build your first LED circuit on a breadboard before making it permanent.',
      relatedTerms: ['Prototype', 'Jumper Wire', 'Circuit']
    },
    {
      id: 'digital-pin',
      term: 'Digital Pin',
      definition: 'An Arduino pin that can be either HIGH (5V) or LOW (0V). Used to turn things on/off or read button states.',
      category: 'arduino',
      difficulty: 'Beginner',
      example: 'Pin 13 on Arduino Uno controls the built-in LED.',
      relatedTerms: ['Arduino', 'Analog Pin', 'GPIO']
    },
    {
      id: 'analog-pin',
      term: 'Analog Pin',
      definition: 'An Arduino pin that can read varying voltage levels (0-5V), not just on/off. Used for sensors that give variable readings.',
      category: 'arduino',
      difficulty: 'Intermediate',
      example: 'Read a temperature sensor value using an analog pin.',
      relatedTerms: ['Arduino', 'Digital Pin', 'ADC', 'Sensor']
    },
    {
      id: 'pwm',
      term: 'PWM',
      definition: 'Pulse Width Modulation - a technique to simulate analog output by rapidly switching digital signals on and off.',
      category: 'arduino',
      difficulty: 'Intermediate',
      example: 'Use PWM to dim an LED or control motor speed.',
      relatedTerms: ['Digital Pin', 'Analog', 'Duty Cycle']
    }
  ];

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = searchQuery === '' ||
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || term.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Electronics Glossary
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your comprehensive dictionary of electronics terms. Hover over any term in our tutorials
              to see its definition, or search here for detailed explanations.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search terms or definitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {category.name}
                  </button>
                );
              })}
            </div>

            {/* Difficulty Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedDifficulty('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedDifficulty === 'all'
                    ? 'bg-gray-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
              >
                All Levels
              </button>
              {['Beginner', 'Intermediate', 'Advanced'].map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedDifficulty === difficulty
                      ? 'bg-gray-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTerms.length} of {glossaryTerms.length} terms
          </p>
        </div>

        {/* Glossary Terms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTerms.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No terms found matching your search.</p>
              <p className="text-sm text-gray-500 mt-2">
                Try different keywords or browse all categories.
              </p>
            </div>
          ) : (
            filteredTerms.map((term) => (
              <div key={term.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{term.term}</h3>
                  <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(term.difficulty)}`}>
                    {term.difficulty}
                  </span>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  {term.definition}
                </p>

                {term.example && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 mb-4">
                    <p className="text-blue-800 text-sm">
                      <strong>Example:</strong> {term.example}
                    </p>
                  </div>
                )}

                {term.relatedTerms && term.relatedTerms.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">Related Terms:</p>
                    <div className="flex flex-wrap gap-2">
                      {term.relatedTerms.map((relatedTerm) => (
                        <span
                          key={relatedTerm}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded cursor-pointer hover:bg-gray-200 transition-colors"
                          onClick={() => setSearchQuery(relatedTerm)}
                        >
                          {relatedTerm}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Can't Find a Term?
          </h2>
          <p className="text-blue-800 mb-6">
            We're constantly adding new terms to our glossary. If you can't find what you're looking for,
            let us know and we'll add it!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Suggest a Term
            </a>
            <a
              href="/common-mistakes"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-blue-200"
            >
              Common Mistakes Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlossaryPage;
