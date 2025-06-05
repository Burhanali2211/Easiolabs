import Link from 'next/link';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Lightbulb, 
  Zap,
  Eye,
  Shield,
  ArrowRight
} from 'lucide-react';

const CommonMistakesPage = () => {
  const mistakes = [
    {
      id: 1,
      category: 'Circuit Building',
      title: 'Forgetting Current-Limiting Resistors',
      description: 'Connecting LEDs directly to power without a resistor',
      consequence: 'Burns out the LED instantly',
      solution: 'Always use a resistor (typically 220Ω-1kΩ) in series with LEDs',
      prevention: 'Remember: LEDs need current limiting, not voltage limiting',
      difficulty: 'Beginner',
      icon: Zap
    },
    {
      id: 2,
      category: 'Circuit Building',
      title: 'Incorrect LED Polarity',
      description: 'Connecting LED backwards (cathode to positive, anode to negative)',
      consequence: 'LED doesn\'t light up, may be damaged',
      solution: 'Longer leg = positive (anode), shorter leg = negative (cathode)',
      prevention: 'Always check LED polarity before connecting power',
      difficulty: 'Beginner',
      icon: Eye
    },
    {
      id: 3,
      category: 'Power Supply',
      title: 'Wrong Voltage Levels',
      description: 'Using 12V when component needs 5V, or vice versa',
      consequence: 'Component damage, circuit malfunction, or fire risk',
      solution: 'Always check component datasheets for voltage requirements',
      prevention: 'Double-check voltage ratings before connecting power',
      difficulty: 'Beginner',
      icon: Shield
    },
    {
      id: 4,
      category: 'Breadboard',
      title: 'Poor Breadboard Connections',
      description: 'Wires not fully inserted, using damaged breadboard holes',
      consequence: 'Intermittent connections, circuit works sometimes',
      solution: 'Push wires firmly, use fresh breadboard sections',
      prevention: 'Test connections with multimeter, wiggle wires gently',
      difficulty: 'Beginner',
      icon: AlertTriangle
    },
    {
      id: 5,
      category: 'Arduino',
      title: 'Forgetting pinMode() Declaration',
      description: 'Using digital pins without setting them as INPUT or OUTPUT',
      consequence: 'Pins don\'t work as expected, random behavior',
      solution: 'Always use pinMode(pin, OUTPUT) or pinMode(pin, INPUT) in setup()',
      prevention: 'Make pinMode() the first thing you write for each pin',
      difficulty: 'Beginner',
      icon: CheckCircle
    },
    {
      id: 6,
      category: 'Arduino',
      title: 'Infinite Serial.print() Loops',
      description: 'Printing to serial monitor too fast without delays',
      consequence: 'Serial monitor floods with text, hard to read',
      solution: 'Add delay() after Serial.print() or use millis() for timing',
      prevention: 'Always include reasonable delays in your code',
      difficulty: 'Beginner',
      icon: XCircle
    },
    {
      id: 7,
      category: 'Safety',
      title: 'Working on Live Circuits',
      description: 'Making changes while power is connected',
      consequence: 'Short circuits, component damage, potential injury',
      solution: 'Always disconnect power before making circuit changes',
      prevention: 'Make it a habit: power off, change circuit, power on, test',
      difficulty: 'Beginner',
      icon: Shield
    },
    {
      id: 8,
      category: 'Components',
      title: 'Mixing Up Resistor Color Codes',
      description: 'Reading resistor bands in wrong direction or misidentifying colors',
      consequence: 'Wrong resistance value, circuit doesn\'t work properly',
      solution: 'Use online resistor calculator, measure with multimeter',
      prevention: 'Always verify resistor values before using them',
      difficulty: 'Beginner',
      icon: Eye
    }
  ];

  const tips = [
    {
      title: 'Start Simple',
      description: 'Begin with basic circuits like blinking LEDs before attempting complex projects.',
      icon: Lightbulb
    },
    {
      title: 'Test Incrementally',
      description: 'Add one component at a time and test. Don\'t build the entire circuit at once.',
      icon: CheckCircle
    },
    {
      title: 'Keep a Multimeter Handy',
      description: 'Use it to check voltages, continuity, and component values.',
      icon: Zap
    },
    {
      title: 'Document Your Work',
      description: 'Take photos of working circuits and keep notes about what you learned.',
      icon: Eye
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Circuit Building': return 'bg-blue-100 text-blue-800';
      case 'Arduino': return 'bg-purple-100 text-purple-800';
      case 'Power Supply': return 'bg-red-100 text-red-800';
      case 'Breadboard': return 'bg-green-100 text-green-800';
      case 'Safety': return 'bg-orange-100 text-orange-800';
      case 'Components': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="h-10 w-10 text-orange-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Common Beginner Mistakes
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn from the most common mistakes beginners make in electronics. 
              Avoid these pitfalls and save time, money, and frustration!
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Why This Guide Matters
          </h2>
          <p className="text-blue-800 mb-4">
            Every electronics expert has made these mistakes. The difference is learning from them quickly! 
            This guide shows you the most common beginner mistakes and how to avoid them.
          </p>
          <p className="text-blue-800">
            <strong>Remember:</strong> Making mistakes is part of learning. The key is to make them safely 
            and learn from each one.
          </p>
        </div>

        {/* Common Mistakes */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Top Beginner Mistakes
          </h2>
          
          <div className="space-y-8">
            {mistakes.map((mistake) => {
              const Icon = mistake.icon;
              return (
                <div key={mistake.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-red-100 rounded-lg p-2 mr-4">
                          <Icon className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{mistake.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 text-xs rounded ${getCategoryColor(mistake.category)}`}>
                              {mistake.category}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(mistake.difficulty)}`}>
                              {mistake.difficulty}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                        <h4 className="font-bold text-red-900 mb-2">❌ The Mistake</h4>
                        <p className="text-red-800 text-sm">{mistake.description}</p>
                      </div>

                      <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                        <h4 className="font-bold text-orange-900 mb-2">⚠️ What Happens</h4>
                        <p className="text-orange-800 text-sm">{mistake.consequence}</p>
                      </div>

                      <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                        <h4 className="font-bold text-green-900 mb-2">✅ The Fix</h4>
                        <p className="text-green-800 text-sm">{mistake.solution}</p>
                      </div>
                    </div>

                    <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-bold text-blue-900 mb-2">💡 Prevention Tip</h4>
                      <p className="text-blue-800 text-sm">{mistake.prevention}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Best Practices for Beginners
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tips.map((tip) => {
              const Icon = tip.icon;
              return (
                <div key={tip.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-lg p-2 mr-4 flex-shrink-0">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{tip.title}</h3>
                      <p className="text-gray-700">{tip.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Emergency Guide */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-red-900 mb-6">
            🚨 What to Do When Things Go Wrong
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-red-900 mb-3">If You Smell Burning:</h3>
              <ol className="text-red-800 space-y-1 text-sm">
                <li>1. Immediately disconnect power</li>
                <li>2. Don't touch any components</li>
                <li>3. Let everything cool down</li>
                <li>4. Check for damaged components</li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-bold text-red-900 mb-3">If Circuit Doesn't Work:</h3>
              <ol className="text-red-800 space-y-1 text-sm">
                <li>1. Check all connections</li>
                <li>2. Verify component orientations</li>
                <li>3. Test with multimeter</li>
                <li>4. Start with simpler version</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Build Safely?
          </h2>
          <p className="text-gray-600 mb-8">
            Now that you know what to avoid, start building with confidence!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/electronics-101"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Electronics 101
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/glossary"
              className="inline-flex items-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Browse Glossary
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonMistakesPage;
