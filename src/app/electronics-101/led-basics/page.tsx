import Link from 'next/link';
import { ArrowRight, ArrowLeft, Lightbulb, Zap, AlertTriangle, CheckCircle, Eye, Settings, Wrench } from 'lucide-react';

const LEDBasicsPage = () => {
  const ledTypes = [
    {
      type: 'Standard LED',
      colors: ['Red', 'Green', 'Blue', 'Yellow', 'White'],
      voltage: '1.8V - 3.3V',
      current: '20mA',
      uses: ['Indicators', 'Basic lighting', 'Status displays'],
      beginnerTip: 'Red LEDs have the lowest voltage drop (1.8V) - great for beginners'
    },
    {
      type: 'High-Brightness LED',
      colors: ['White', 'Blue', 'RGB'],
      voltage: '3.0V - 3.6V',
      current: '20mA - 350mA',
      uses: ['Flashlights', 'Room lighting', 'Photography'],
      beginnerTip: 'Need heat sinks for high-power versions'
    },
    {
      type: 'RGB LED',
      colors: ['Red+Green+Blue combined'],
      voltage: '2.0V - 3.6V per color',
      current: '20mA per color',
      uses: ['Color displays', 'Mood lighting', 'Art projects'],
      beginnerTip: 'Common cathode easier for beginners than common anode'
    }
  ];

  const circuitVariations = [
    {
      name: 'Single LED Circuit',
      components: ['9V Battery', '330Ω Resistor', 'LED', 'Switch'],
      description: 'Basic LED circuit with on/off control',
      difficulty: 'Beginner',
      buildTime: '10 minutes',
      learningGoals: ['Basic circuit building', 'Switch operation', 'Current limiting']
    },
    {
      name: 'Multiple LEDs in Series',
      components: ['9V Battery', '180Ω Resistor', '3x LEDs', 'Switch'],
      description: 'Chain LEDs together for higher voltage use',
      difficulty: 'Beginner',
      buildTime: '15 minutes',
      learningGoals: ['Voltage division', 'Series circuits', 'Resistor calculation']
    },
    {
      name: 'Multiple LEDs in Parallel',
      components: ['9V Battery', '3x 330Ω Resistors', '3x LEDs', 'Switch'],
      description: 'Independent LED control with shared power',
      difficulty: 'Intermediate',
      buildTime: '20 minutes',
      learningGoals: ['Parallel circuits', 'Current distribution', 'Independent control']
    },
    {
      name: 'LED Brightness Control',
      components: ['9V Battery', '1kΩ Potentiometer', 'LED', 'Switch'],
      description: 'Variable brightness using a potentiometer',
      difficulty: 'Intermediate',
      buildTime: '25 minutes',
      learningGoals: ['Variable resistance', 'Analog control', 'Potentiometer wiring']
    }
  ];

  const troubleshootingGuide = [
    {
      problem: 'LED doesn\'t light up',
      causes: ['Wrong polarity', 'Blown LED', 'Loose connections', 'Dead battery'],
      solutions: ['Check LED orientation (long leg = positive)', 'Test LED with known good circuit', 'Verify all connections', 'Check battery voltage'],
      prevention: 'Always check polarity before powering on'
    },
    {
      problem: 'LED is very dim',
      causes: ['Resistor too large', 'Low battery', 'Poor connections'],
      solutions: ['Use smaller resistor value', 'Replace battery', 'Clean and tighten connections'],
      prevention: 'Calculate proper resistor value using Ohm\'s Law'
    },
    {
      problem: 'LED burns out quickly',
      causes: ['No current limiting resistor', 'Resistor too small', 'Voltage too high'],
      solutions: ['Always use appropriate resistor', 'Recalculate resistor value', 'Check power supply voltage'],
      prevention: 'Never connect LED directly to power source'
    },
    {
      problem: 'LED flickers',
      causes: ['Loose connections', 'Intermittent switch', 'Poor breadboard contact'],
      solutions: ['Check all wire connections', 'Replace switch', 'Use different breadboard holes'],
      prevention: 'Make solid connections and avoid damaged components'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">Electronics 101</span>
            <span className="text-sm text-gray-600">Lesson 6 of 10</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            LED Basics & Advanced Circuits
          </h1>
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
            <span className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-1" />
              40 min read
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Beginner</span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Master LED circuits from basic single-LED setups to advanced multi-LED configurations.
            Learn troubleshooting techniques, explore different LED types, and build confidence
            with hands-on circuit variations.
          </p>
        </header>

        {/* Learning Objectives */}
        <section className="mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">🎯 What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
              <ul className="space-y-2">
                <li>• Different types of LEDs and their characteristics</li>
                <li>• Building multiple LED circuits (series & parallel)</li>
                <li>• LED brightness control techniques</li>
              </ul>
              <ul className="space-y-2">
                <li>• Comprehensive troubleshooting methods</li>
                <li>• Safety considerations for LED circuits</li>
                <li>• Interactive circuit simulator practice</li>
              </ul>
            </div>
          </div>
        </section>

        {/* LED Types Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding LED Types</h2>

          <div className="space-y-6">
            {ledTypes.map((led, index) => (
              <div key={led.type} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{led.type}</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Specifications:</h4>
                    <ul className="text-gray-700 space-y-1 mb-4">
                      <li><strong>Colors:</strong> {led.colors.join(', ')}</li>
                      <li><strong>Voltage:</strong> {led.voltage}</li>
                      <li><strong>Current:</strong> {led.current}</li>
                    </ul>

                    <h4 className="font-bold text-gray-900 mb-2">Common Uses:</h4>
                    <ul className="text-gray-700 space-y-1">
                      {led.uses.map((use, i) => (
                        <li key={i}>• {use}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                    <h4 className="font-bold text-yellow-900 mb-2">💡 Beginner Tip</h4>
                    <p className="text-yellow-800 text-sm">{led.beginnerTip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Circuit Variations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Circuit Variations to Build</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {circuitVariations.map((circuit, index) => (
              <div key={circuit.name} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{circuit.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${circuit.difficulty === 'Beginner'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {circuit.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{circuit.description}</p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Components needed:</h4>
                  <div className="flex flex-wrap gap-1">
                    {circuit.components.map((component, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {component}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Learning Goals:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {circuit.learningGoals.map((goal, i) => (
                      <li key={i}>• {goal}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center">
                    <Settings className="h-4 w-4 mr-1" />
                    Build time: {circuit.buildTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Circuit Simulator */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive Circuit Simulator</h2>
              <p className="text-gray-600 mb-6">
                Practice building LED circuits in our safe, virtual environment before working with real components.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">4</div>
                  <div className="text-sm text-gray-600">Circuit Examples</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">∞</div>
                  <div className="text-sm text-gray-600">Practice Attempts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">100%</div>
                  <div className="text-sm text-gray-600">Safe Learning</div>
                </div>
              </div>
              <Link
                href="/circuit-simulator?tutorial=led-basics"
                className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                <Eye className="h-5 w-5 mr-2" />
                Open Circuit Simulator
              </Link>
            </div>
          </div>
        </section>

        {/* Troubleshooting Guide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <Wrench className="inline h-6 w-6 mr-2" />
            Troubleshooting LED Circuits
          </h2>

          <div className="space-y-6">
            {troubleshootingGuide.map((issue, index) => (
              <div key={issue.problem} className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-red-900 mb-3">
                  ❌ Problem: {issue.problem}
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-red-900 mb-2">Possible Causes:</h4>
                    <ul className="text-red-800 space-y-1 mb-4">
                      {issue.causes.map((cause, i) => (
                        <li key={i}>• {cause}</li>
                      ))}
                    </ul>

                    <h4 className="font-bold text-red-900 mb-2">Solutions:</h4>
                    <ul className="text-red-800 space-y-1">
                      {issue.solutions.map((solution, i) => (
                        <li key={i}>• {solution}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded p-4">
                    <h4 className="font-bold text-green-900 mb-2">🛡️ Prevention</h4>
                    <p className="text-green-800 text-sm">{issue.prevention}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Considerations */}
        <section className="mb-12">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-orange-900 mb-4">
              <AlertTriangle className="inline h-5 w-5 mr-2" />
              Safety Considerations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-orange-800">
              <div>
                <h3 className="font-bold mb-2">Always Remember:</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Never connect LEDs directly to power without resistors</li>
                  <li>• Check polarity before connecting power</li>
                  <li>• Use appropriate resistor values for your voltage</li>
                  <li>• Start with higher resistance values when experimenting</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2">High-Power LEDs:</h3>
                <ul className="space-y-1 text-sm">
                  <li>• May require heat sinks for cooling</li>
                  <li>• Can get very hot during operation</li>
                  <li>• Use proper current limiting circuits</li>
                  <li>• Consider eye safety with bright LEDs</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Exercises */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Exercises</h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">🏋️ Build These Circuits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
              <div>
                <h4 className="font-bold mb-2">Beginner Challenges:</h4>
                <ol className="space-y-1 text-sm">
                  <li>1. Build a single LED circuit with a switch</li>
                  <li>2. Create a two-LED series circuit</li>
                  <li>3. Make LEDs blink using a manual switch</li>
                  <li>4. Build a parallel LED circuit</li>
                </ol>
              </div>
              <div>
                <h4 className="font-bold mb-2">Advanced Challenges:</h4>
                <ol className="space-y-1 text-sm">
                  <li>1. Create variable brightness control</li>
                  <li>2. Build an RGB LED color mixer</li>
                  <li>3. Design a LED "traffic light" sequence</li>
                  <li>4. Make a LED brightness indicator</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* What's Next */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>

          <p className="text-gray-700 mb-6">
            Excellent work! You've mastered LED circuits from basic to advanced configurations.
            You now understand different LED types, can troubleshoot common problems, and have
            hands-on experience with multiple circuit variations.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-green-900 mb-3">✅ What You Accomplished</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800">
              <ul className="space-y-1 text-sm">
                <li>• Learned about different LED types and specifications</li>
                <li>• Built series and parallel LED circuits</li>
                <li>• Mastered LED brightness control techniques</li>
              </ul>
              <ul className="space-y-1 text-sm">
                <li>• Developed troubleshooting skills</li>
                <li>• Practiced safety considerations</li>
                <li>• Gained confidence with circuit variations</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h4 className="font-bold text-purple-900 mb-4">🚀 Ready for More Power?</h4>
            <p className="text-purple-800 mb-4">
              In our next lesson, we'll explore DC motors - components that convert electrical
              energy into mechanical motion. You'll learn about motor control, direction switching,
              and protection circuits.
            </p>
            <div className="text-purple-800 text-sm">
              <strong>Coming up:</strong> Motor specifications, power requirements, H-bridge circuits,
              and safety considerations for working with motors.
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <Link
            href="/electronics-101/first-led-circuit"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4 sm:mb-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous: Your First LED Circuit
          </Link>

          <Link
            href="/electronics-101/dc-motor-control"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Next: DC Motor Control
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </article>
    </div>
  );
};

export default LEDBasicsPage;
