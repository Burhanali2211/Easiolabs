import Link from 'next/link';
import { ArrowRight, ArrowLeft, Lightbulb, Zap, AlertTriangle, CheckCircle, Volume2, Music, Settings, Waves } from 'lucide-react';

const BuzzerSoundPage = () => {
  const buzzerTypes = [
    {
      type: 'Active Buzzer',
      description: 'Has built-in oscillator circuit - just apply voltage',
      voltage: '3V - 12V',
      frequency: 'Fixed (usually 2-4 kHz)',
      control: 'On/Off only',
      sound: 'Continuous tone',
      uses: ['Alarms', 'Notifications', 'Simple alerts'],
      beginnerTip: 'Easiest to use - just connect power and it beeps!',
      pros: ['Simple to use', 'No external components needed', 'Consistent sound'],
      cons: ['Fixed frequency', 'No tone control', 'Limited musical capability']
    },
    {
      type: 'Passive Buzzer',
      description: 'Requires external signal to generate sound',
      voltage: '3V - 12V',
      frequency: 'Variable (20Hz - 20kHz)',
      control: 'Frequency and duty cycle',
      sound: 'Any tone you program',
      uses: ['Musical tones', 'Variable alarms', 'Sound effects'],
      beginnerTip: 'More complex but much more versatile for music and effects',
      pros: ['Variable frequency', 'Musical capability', 'Sound effects possible'],
      cons: ['Needs signal generator', 'More complex circuits', 'Requires programming']
    }
  ];

  const basicCircuits = [
    {
      name: 'Simple Active Buzzer',
      components: ['9V Battery', 'Active Buzzer', 'Switch', 'Wires'],
      description: 'Basic buzzer alarm circuit',
      difficulty: 'Beginner',
      buildTime: '5 minutes',
      learningGoals: ['Buzzer operation', 'Simple switching', 'Audio output'],
      sound: 'Continuous beep when switch is pressed'
    },
    {
      name: 'Passive Buzzer with 555 Timer',
      components: ['9V Battery', 'Passive Buzzer', '555 Timer IC', 'Resistors', 'Capacitor'],
      description: 'Generate tones using 555 timer circuit',
      difficulty: 'Intermediate',
      buildTime: '20 minutes',
      learningGoals: ['555 timer operation', 'Frequency generation', 'Tone control'],
      sound: 'Adjustable tone frequency'
    },
    {
      name: 'Volume Control Circuit',
      components: ['6V Battery', 'Active Buzzer', 'Potentiometer', 'Transistor', 'Resistor'],
      description: 'Control buzzer volume with potentiometer',
      difficulty: 'Intermediate',
      buildTime: '15 minutes',
      learningGoals: ['Volume control', 'Transistor switching', 'Analog control'],
      sound: 'Variable volume beeping'
    },
    {
      name: 'Musical Note Generator',
      components: ['6V Battery', 'Passive Buzzer', 'Push Buttons', 'Resistors', 'Capacitors'],
      description: 'Create different musical notes with button presses',
      difficulty: 'Advanced',
      buildTime: '30 minutes',
      learningGoals: ['Musical frequencies', 'Multiple inputs', 'Note generation'],
      sound: 'Different musical notes (C, D, E, F, G, A, B)'
    }
  ];

  const musicalNotes = [
    { note: 'C4', frequency: '261.63 Hz', description: 'Middle C - reference note' },
    { note: 'D4', frequency: '293.66 Hz', description: 'One tone above C' },
    { note: 'E4', frequency: '329.63 Hz', description: 'Major third above C' },
    { note: 'F4', frequency: '349.23 Hz', description: 'Perfect fourth above C' },
    { note: 'G4', frequency: '392.00 Hz', description: 'Perfect fifth above C' },
    { note: 'A4', frequency: '440.00 Hz', description: 'Concert pitch reference' },
    { note: 'B4', frequency: '493.88 Hz', description: 'Major seventh above C' },
    { note: 'C5', frequency: '523.25 Hz', description: 'Octave above middle C' }
  ];

  const volumeControlMethods = [
    {
      method: 'Resistor in Series',
      description: 'Simple volume reduction using fixed resistor',
      components: ['Resistor (100Ω - 1kΩ)'],
      pros: ['Very simple', 'No additional components'],
      cons: ['Fixed volume only', 'Not very efficient'],
      bestFor: 'Quick volume reduction'
    },
    {
      method: 'Potentiometer Control',
      description: 'Variable volume control with potentiometer',
      components: ['Potentiometer (1kΩ)', 'Transistor (optional)'],
      pros: ['Variable control', 'User adjustable'],
      cons: ['More complex', 'May need amplification'],
      bestFor: 'User-controlled volume'
    },
    {
      method: 'PWM Control',
      description: 'Digital volume control using pulse width modulation',
      components: ['Microcontroller', 'PWM signal'],
      pros: ['Precise control', 'Digital interface'],
      cons: ['Requires programming', 'More complex'],
      bestFor: 'Arduino/microcontroller projects'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">Electronics 101</span>
            <span className="text-sm text-gray-600">Lesson 8 of 10</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Buzzer and Sound
          </h1>
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
            <span className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-1" />
              35 min read
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Beginner</span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Create audio circuits with buzzers and sound generation. Learn the difference between active
            and passive buzzers, build tone generators, control volume, and even create simple musical circuits.
          </p>
        </header>

        {/* Learning Objectives */}
        <section className="mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">🎯 What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
              <ul className="space-y-2">
                <li>• Active vs passive buzzer differences</li>
                <li>• Basic buzzer circuits and connections</li>
                <li>• Tone generation and frequency control</li>
              </ul>
              <ul className="space-y-2">
                <li>• Volume control methods</li>
                <li>• Musical note frequencies</li>
                <li>• Sound effect creation techniques</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Buzzer Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding Buzzer Types</h2>

          <div className="space-y-8">
            {buzzerTypes.map((buzzer, index) => (
              <div key={buzzer.type} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{buzzer.type}</h3>
                </div>

                <p className="text-gray-700 mb-6">{buzzer.description}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Specifications:</h4>
                    <ul className="text-gray-700 space-y-1 mb-4">
                      <li><strong>Voltage:</strong> {buzzer.voltage}</li>
                      <li><strong>Frequency:</strong> {buzzer.frequency}</li>
                      <li><strong>Control:</strong> {buzzer.control}</li>
                      <li><strong>Sound:</strong> {buzzer.sound}</li>
                    </ul>

                    <h4 className="font-bold text-gray-900 mb-2">Common Uses:</h4>
                    <ul className="text-gray-700 space-y-1">
                      {buzzer.uses.map((use, i) => (
                        <li key={i}>• {use}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4">
                    <h4 className="font-bold text-orange-900 mb-2">💡 Beginner Tip</h4>
                    <p className="text-orange-800 text-sm mb-3">{buzzer.beginnerTip}</p>

                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <h5 className="font-medium text-orange-900 mb-1">Pros:</h5>
                        <ul className="text-orange-800 text-xs space-y-1">
                          {buzzer.pros.map((pro, i) => (
                            <li key={i}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-orange-900 mb-1">Cons:</h5>
                        <ul className="text-orange-800 text-xs space-y-1">
                          {buzzer.cons.map((con, i) => (
                            <li key={i}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Musical Notes Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <Music className="inline h-6 w-6 mr-2" />
            Musical Notes & Frequencies
          </h2>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-purple-900 mb-4">Understanding Musical Frequencies</h3>
            <p className="text-purple-800 mb-4">
              Musical notes correspond to specific frequencies. By generating these frequencies with a passive buzzer,
              you can create recognizable musical tones. Here are the frequencies for a complete octave:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {musicalNotes.map((note, index) => (
                <div key={note.note} className="bg-white border border-purple-200 rounded p-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-900">{note.note}</div>
                    <div className="text-sm font-mono text-purple-700">{note.frequency}</div>
                    <div className="text-xs text-purple-600 mt-1">{note.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Basic Circuits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sound Circuits to Build</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {basicCircuits.map((circuit, index) => (
              <div key={circuit.name} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{circuit.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${circuit.difficulty === 'Beginner'
                    ? 'bg-green-100 text-green-800'
                    : circuit.difficulty === 'Intermediate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
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

                <div className="bg-green-50 border border-green-200 rounded p-3 mb-4">
                  <h4 className="font-bold text-green-900 mb-1 text-sm">🔊 Sound Output</h4>
                  <p className="text-green-800 text-xs">{circuit.sound}</p>
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

        {/* Volume Control Methods */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <Volume2 className="inline h-6 w-6 mr-2" />
            Volume Control Methods
          </h2>

          <div className="space-y-6">
            {volumeControlMethods.map((method, index) => (
              <div key={method.method} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-yellow-900 mb-3">{method.method}</h3>
                <p className="text-yellow-800 mb-4">{method.description}</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold text-yellow-900 mb-2">Components:</h4>
                    <ul className="text-yellow-800 space-y-1 text-sm">
                      {method.components.map((component, i) => (
                        <li key={i}>• {component}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-yellow-900 mb-2">Pros:</h4>
                    <ul className="text-yellow-800 space-y-1 text-sm">
                      {method.pros.map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-yellow-900 mb-2">Cons:</h4>
                    <ul className="text-yellow-800 space-y-1 text-sm">
                      {method.cons.map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
                  <h4 className="font-bold text-blue-900 mb-1 text-sm">🎯 Best For</h4>
                  <p className="text-blue-800 text-sm">{method.bestFor}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Sound Simulator */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-8">
            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Waves className="h-8 w-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive Sound Generator</h2>
              <p className="text-gray-600 mb-6">
                Experiment with different buzzer circuits and hear the sounds they make before building them physically.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">8</div>
                  <div className="text-sm text-gray-600">Musical Notes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">4</div>
                  <div className="text-sm text-gray-600">Circuit Types</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">∞</div>
                  <div className="text-sm text-gray-600">Sound Effects</div>
                </div>
              </div>
              <Link
                href="/circuit-simulator?tutorial=buzzer-sound"
                className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                <Volume2 className="h-5 w-5 mr-2" />
                Open Sound Simulator
              </Link>
            </div>
          </div>
        </section>

        {/* Safety and Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Safety & Troubleshooting</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-orange-900 mb-4">
                <AlertTriangle className="inline h-5 w-5 mr-2" />
                Safety Considerations
              </h3>
              <ul className="text-orange-800 space-y-2 text-sm">
                <li>• Buzzers can be quite loud - protect your hearing</li>
                <li>• Check polarity on polarized buzzers</li>
                <li>• Don't exceed maximum voltage ratings</li>
                <li>• Be considerate of others when testing</li>
                <li>• Use current limiting resistors when needed</li>
                <li>• Avoid continuous operation at high volumes</li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-4">Common Problems</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium text-red-900">No sound from buzzer:</h4>
                  <ul className="text-red-800 space-y-1 text-xs">
                    <li>• Check power connections</li>
                    <li>• Verify buzzer polarity</li>
                    <li>• Test with known good buzzer</li>
                    <li>• Check if passive buzzer needs signal</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-900">Sound too quiet:</h4>
                  <ul className="text-red-800 space-y-1 text-xs">
                    <li>• Increase supply voltage (within limits)</li>
                    <li>• Remove or reduce series resistance</li>
                    <li>• Check for loose connections</li>
                    <li>• Verify buzzer specifications</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-900">Wrong frequency/pitch:</h4>
                  <ul className="text-red-800 space-y-1 text-xs">
                    <li>• Adjust timing components (R, C)</li>
                    <li>• Check oscillator circuit</li>
                    <li>• Verify component values</li>
                    <li>• Use frequency counter to measure</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Exercises */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Exercises</h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">🏋️ Build These Sound Circuits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
              <div>
                <h4 className="font-bold mb-2">Beginner Projects:</h4>
                <ol className="space-y-1 text-sm">
                  <li>1. Simple buzzer alarm</li>
                  <li>2. Buzzer with LED indicator</li>
                  <li>3. Two-tone alarm system</li>
                  <li>4. Volume control buzzer</li>
                </ol>
              </div>
              <div>
                <h4 className="font-bold mb-2">Advanced Projects:</h4>
                <ol className="space-y-1 text-sm">
                  <li>1. Musical keyboard (8 notes)</li>
                  <li>2. Siren sound effect generator</li>
                  <li>3. Morse code buzzer</li>
                  <li>4. Multi-tone doorbell</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* What's Next */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>

          <p className="text-gray-700 mb-6">
            Great work! You've learned about different types of buzzers, created audio circuits, and even
            explored musical note generation. You now understand the difference between active and passive
            buzzers and can control volume and frequency.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-green-900 mb-3">✅ What You Accomplished</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800">
              <ul className="space-y-1 text-sm">
                <li>• Learned active vs passive buzzer differences</li>
                <li>• Built basic and advanced sound circuits</li>
                <li>• Mastered volume control techniques</li>
              </ul>
              <ul className="space-y-1 text-sm">
                <li>• Understood musical note frequencies</li>
                <li>• Created tone generators and sound effects</li>
                <li>• Practiced audio circuit troubleshooting</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h4 className="font-bold text-purple-900 mb-4">🔬 Ready for Advanced Components?</h4>
            <p className="text-purple-800 mb-4">
              In our next lesson, we'll explore advanced components like sensors, timing circuits, and
              logic gates. You'll learn to integrate multiple components and create more sophisticated circuits.
            </p>
            <div className="text-purple-800 text-sm">
              <strong>Coming up:</strong> Light sensors, temperature sensors, timing circuits, logic gates,
              and multi-component integration techniques.
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <Link
            href="/electronics-101/dc-motor-control"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4 sm:mb-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous: DC Motor Control
          </Link>

          <Link
            href="/electronics-101/advanced-components"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Next: Advanced Components
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </article>
    </div>
  );
};

export default BuzzerSoundPage;
