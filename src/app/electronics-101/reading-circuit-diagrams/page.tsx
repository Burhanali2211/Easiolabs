import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, Eye, Zap, Battery, Lightbulb, RotateCcw, AlertTriangle, CheckCircle, Target, Settings, BookOpen, Clock, Play, Search } from 'lucide-react';
import KnowledgeCheck from '@/components/KnowledgeCheck';

const ReadingCircuitDiagramsPage = () => {
  const schematicSymbols = [
    {
      name: 'Battery',
      symbol: '🔋',
      description: 'Provides electrical power to make everything work',
      schematic: 'Two parallel lines - long line (+) and short line (-)',
      realWorld: 'AA batteries, 9V batteries, phone batteries',
      tip: 'The long line is always positive (+), the short line is always negative (-)',
      analogy: 'Like a water pump that creates pressure to push water through pipes - batteries create voltage to push electricity through wires',
      commonValues: ['1.5V (AA battery)', '9V (rectangular battery)', '3.7V (phone battery)', '12V (car battery)'],
      safetyNote: 'Always connect positive to positive, negative to negative - mixing them up can damage your circuit!',
      beginnerTip: 'Start with AA batteries (1.5V) - they\'re safe and perfect for learning',
      image: '/images/components/battery-symbol.svg'
    },
    {
      name: 'Resistor',
      symbol: '⚡',
      description: 'Controls how much electricity can flow through - like a traffic controller for electrons',
      schematic: 'Zigzag line (US) or rectangle (Europe) - both mean the same thing',
      realWorld: 'Small tube-shaped components with colorful stripes (like tiny candy canes!)',
      tip: 'The colored bands are like a secret code that tells you the resistance value',
      analogy: 'Like putting your thumb over a garden hose - the more you press, the less water flows. Resistors do the same thing with electricity!',
      commonValues: ['220Ω (red-red-brown) - perfect for LEDs', '1kΩ (brown-black-red) - good for general use', '10kΩ (brown-black-orange) - great for sensors'],
      safetyNote: 'No polarity - you can connect them either way around, they work the same!',
      beginnerTip: 'Start with 220Ω, 1kΩ, and 10kΩ resistors - these three will handle most beginner projects',
      image: '/images/components/resistor-symbol.svg'
    },
    {
      name: 'LED',
      symbol: '💡',
      description: 'Light Emitting Diode - a tiny light that only works when connected the right way',
      schematic: 'Triangle with arrows pointing out (showing light coming out)',
      realWorld: 'Small colored lights with two legs - one longer than the other',
      tip: 'The longer leg is positive (+), shorter leg is negative (-) - remember "Long = +"',
      analogy: 'Like a one-way door that glows when electricity passes through the right direction',
      commonValues: ['Red: 1.8V (easiest to use)', 'Blue: 3.2V (needs more voltage)', 'White: 3.3V (very bright)', 'Green: 2.0V (common)'],
      safetyNote: 'ALWAYS use a resistor with LEDs or they will burn out instantly!',
      beginnerTip: 'Start with red LEDs - they need the least voltage and are very forgiving',
      image: '/images/components/led-symbol.svg'
    },
    {
      name: 'Switch',
      symbol: '🔘',
      description: 'The on/off controller - decides when electricity can flow through your circuit',
      schematic: 'A gap that can be closed (like a drawbridge)',
      realWorld: 'Push buttons, toggle switches, even the power button on your phone!',
      tip: 'Open switch = circuit OFF (no electricity flows), Closed switch = circuit ON (electricity flows)',
      analogy: 'Like a drawbridge over a river - when it\'s up (open), cars can\'t cross. When it\'s down (closed), traffic flows!',
      commonValues: ['Push button (press to connect)', 'Toggle switch (flip to stay on/off)', 'Slide switch (slide to change)'],
      safetyNote: 'Switches are very safe - they just make or break connections',
      beginnerTip: 'Start with simple push buttons - they\'re easy to use and understand',
      image: '/images/components/switch-symbol.svg'
    },
    {
      name: 'Wire',
      symbol: '➖',
      description: 'The highways for electricity - they carry electrical current from one component to another',
      schematic: 'Simple straight lines connecting components',
      realWorld: 'Colorful jumper wires, breadboard connections, the wires inside electronic devices',
      tip: 'Dots (•) show where wires connect. Lines crossing WITHOUT dots are NOT connected!',
      analogy: 'Like roads that cars travel on - electricity travels through wires to get from place to place',
      commonValues: ['Jumper wires (perfect for breadboards)', 'Solid core wire (22 AWG)', 'Stranded wire (flexible)'],
      safetyNote: 'Wires are very safe in low-voltage circuits like we\'ll be building',
      beginnerTip: 'Use different colored wires to keep track of connections - red for positive, black for negative',
      image: '/images/components/wire-symbol.svg'
    },
    {
      name: 'Ground',
      symbol: '⏚',
      description: 'The "home base" for electricity - where all current returns to complete the circuit',
      schematic: 'Three horizontal lines getting smaller (like an upside-down pyramid)',
      realWorld: 'Usually the negative (-) terminal of your battery or power supply',
      tip: 'All ground symbols in a circuit are connected together, even if you don\'t see wires between them',
      analogy: 'Like sea level for measuring height - ground is the "zero level" for measuring voltage',
      commonValues: ['0V reference point', 'Negative battery terminal', 'Common connection point'],
      safetyNote: 'Ground is safe - it\'s just the return path for electricity',
      beginnerTip: 'Think of ground as where electricity "goes home" after doing its job in the circuit',
      image: '/images/components/ground-symbol.svg'
    },
    {
      name: 'Capacitor',
      symbol: '⚡',
      description: 'An electrical "storage tank" that can store and release electricity very quickly',
      schematic: 'Two parallel lines (like two plates facing each other)',
      realWorld: 'Small cylindrical cans or flat disc-shaped components',
      tip: 'Some capacitors have + and - sides (polarized), others can be connected either way',
      analogy: 'Like a rechargeable battery that charges and discharges super fast, or a water balloon that fills and empties quickly',
      commonValues: ['100μF (large storage)', '10μF (medium storage)', '0.1μF (small storage)'],
      safetyNote: 'Polarized capacitors (with + and - markings) must be connected correctly or they can be damaged',
      beginnerTip: 'We won\'t use capacitors in our first few projects - they\'re for more advanced circuits',
      image: '/images/components/capacitor-symbol.svg'
    }
  ];

  const circuitExamples = [
    {
      name: 'Simple LED Circuit',
      description: 'Basic LED with current-limiting resistor',
      components: ['Battery (9V)', 'Resistor (220Ω)', 'LED (Red)', 'Wires'],
      explanation: 'Battery provides power, resistor limits current to protect LED',
      safety: 'Always use a resistor with LEDs to prevent damage'
    },
    {
      name: 'LED with Switch',
      description: 'Controllable LED circuit',
      components: ['Battery (9V)', 'Switch', 'Resistor (330Ω)', 'LED (Blue)', 'Wires'],
      explanation: 'Switch controls when current flows through the circuit',
      safety: 'Switch can be placed anywhere in the circuit'
    }
  ];

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

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
                <div className="flex items-center mb-3">
                  <Eye className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-bold text-blue-900">Why Use Symbols?</h3>
                </div>
                <p className="text-blue-800">
                  Symbols make circuits easier to understand and draw. A battery symbol is much
                  simpler to draw than a realistic battery, and it's the same in every country!
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2>Common Schematic Symbols</h2>

              <p>
                Let's learn the most important symbols you'll see in basic circuits. Don't worry
                about memorizing them all at once - you'll learn them naturally as you build circuits.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-8">
                {schematicSymbols.map((symbol, index) => (
                  <div key={symbol.name} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start mb-4">
                      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <span className="text-3xl mr-4">{symbol.symbol}</span>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{symbol.name}</h4>
                            <p className="text-gray-600 text-sm">{symbol.description}</p>
                          </div>
                        </div>

                        {/* Component Images */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="text-center">
                            <div className="bg-gray-100 rounded-lg p-3 mb-2">
                              <Image
                                src={`/images/components/${symbol.name.toLowerCase().replace(' ', '-')}-symbol.svg`}
                                alt={`${symbol.name} schematic symbol`}
                                width={80}
                                height={60}
                                className="mx-auto"
                              />
                            </div>
                            <div className="text-xs text-gray-600">Schematic Symbol</div>
                          </div>
                          <div className="text-center">
                            <div className="bg-gray-100 rounded-lg p-3 mb-2">
                              <Image
                                src={`/images/components/${symbol.name.toLowerCase().replace(' ', '-')}-real.jpg`}
                                alt={`Real ${symbol.name} component`}
                                width={80}
                                height={60}
                                className="mx-auto rounded"
                              />
                            </div>
                            <div className="text-xs text-gray-600">Real Component</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Schematic:</span>
                        <span className="text-gray-600 ml-2">{symbol.schematic}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Real world:</span>
                        <span className="text-gray-600 ml-2">{symbol.realWorld}</span>
                      </div>

                      <div className="bg-blue-50 border-l-4 border-blue-500 p-3">
                        <span className="font-medium text-blue-800">💡 Think of it like:</span>
                        <p className="text-blue-700 text-sm mt-1">{symbol.analogy}</p>
                      </div>

                      <div>
                        <span className="font-medium text-gray-700">Common values:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {symbol.commonValues.map((value, i) => (
                            <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              {value}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                        <span className="font-medium text-yellow-800">💡 Quick Tip:</span>
                        <span className="text-yellow-700 ml-2">{symbol.tip}</span>
                      </div>

                      {symbol.beginnerTip && (
                        <div className="bg-green-50 border border-green-200 rounded p-2">
                          <span className="font-medium text-green-800">🎯 Beginner Tip:</span>
                          <span className="text-green-700 ml-2">{symbol.beginnerTip}</span>
                        </div>
                      )}

                      <div className="bg-red-50 border border-red-200 rounded p-2">
                        <span className="font-medium text-red-800">⚠️ Safety:</span>
                        <span className="text-red-700 ml-2">{symbol.safetyNote}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2>Reading Circuit Flow</h2>

              <p>
                Electricity flows in a complete loop called a circuit. In a schematic, you can
                trace this path with your finger, following the lines from the positive terminal
                of the battery, through all the components, and back to the negative terminal.
              </p>

              {/* Interactive Circuit Flow Diagram */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 my-8">
                <div className="text-center mb-6">
                  <h4 className="font-bold text-gray-900 mb-4">Interactive Circuit Flow Tracing</h4>
                  <div className="bg-white rounded-lg p-8 inline-block border-2 border-dashed border-gray-300">
                    <div className="relative">
                      {/* Circuit Diagram with Real Symbols */}
                      <svg width="400" height="200" viewBox="0 0 400 200" className="mx-auto">
                        {/* Battery */}
                        <g transform="translate(50, 90)">
                          <line x1="0" y1="0" x2="0" y2="20" stroke="#333" strokeWidth="3" />
                          <line x1="0" y1="-10" x2="0" y2="10" stroke="#333" strokeWidth="6" />
                          <text x="-15" y="-20" fontSize="12" fill="#333">+</text>
                          <text x="-15" y="35" fontSize="12" fill="#333">9V</text>
                        </g>

                        {/* Connecting Wire 1 */}
                        <line x1="50" y1="80" x2="120" y2="80" stroke="#e74c3c" strokeWidth="2" markerEnd="url(#arrowhead)" />

                        {/* Resistor */}
                        <g transform="translate(120, 80)">
                          <path d="M0,0 L10,-5 L20,5 L30,-5 L40,5 L50,0" stroke="#333" strokeWidth="2" fill="none" />
                          <text x="15" y="-15" fontSize="10" fill="#333">220Ω</text>
                        </g>

                        {/* Connecting Wire 2 */}
                        <line x1="170" y1="80" x2="240" y2="80" stroke="#e74c3c" strokeWidth="2" markerEnd="url(#arrowhead)" />

                        {/* LED */}
                        <g transform="translate(240, 80)">
                          <polygon points="0,0 15,-8 15,8" stroke="#333" strokeWidth="2" fill="none" />
                          <line x1="15" y1="-8" x2="15" y2="8" stroke="#333" strokeWidth="2" />
                          <path d="M10,-12 L18,-4 M14,-12 L22,-4" stroke="#333" strokeWidth="1" markerEnd="url(#arrowhead-small)" />
                          <text x="-5" y="-15" fontSize="10" fill="#333">LED</text>
                        </g>

                        {/* Connecting Wire 3 */}
                        <line x1="255" y1="80" x2="255" y2="120" stroke="#3498db" strokeWidth="2" />
                        <line x1="255" y1="120" x2="50" y2="120" stroke="#3498db" strokeWidth="2" />
                        <line x1="50" y1="120" x2="50" y2="110" stroke="#3498db" strokeWidth="2" markerEnd="url(#arrowhead)" />

                        {/* Ground Symbol */}
                        <g transform="translate(45, 110)">
                          <line x1="0" y1="0" x2="0" y2="5" stroke="#333" strokeWidth="2" />
                          <line x1="-8" y1="5" x2="8" y2="5" stroke="#333" strokeWidth="2" />
                          <line x1="-5" y1="8" x2="5" y2="8" stroke="#333" strokeWidth="2" />
                          <line x1="-2" y1="11" x2="2" y2="11" stroke="#333" strokeWidth="2" />
                        </g>

                        {/* Arrow markers */}
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#e74c3c" />
                          </marker>
                          <marker id="arrowhead-small" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                            <polygon points="0 0, 6 2, 0 4" fill="#333" />
                          </marker>
                        </defs>

                        {/* Current Flow Labels */}
                        <text x="85" y="75" fontSize="10" fill="#e74c3c" fontWeight="bold">Current Flow →</text>
                        <text x="200" y="75" fontSize="10" fill="#e74c3c" fontWeight="bold">→</text>
                        <text x="150" y="140" fontSize="10" fill="#3498db" fontWeight="bold">← Return Path</text>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h5 className="font-bold text-red-900 mb-3">🔴 Current Path (Red)</h5>
                    <ul className="text-red-800 space-y-1 text-sm">
                      <li>• Starts at battery positive (+)</li>
                      <li>• Flows through the resistor</li>
                      <li>• Powers the LED (creates light)</li>
                      <li>• Continues to ground connection</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-bold text-blue-900 mb-3">🔵 Return Path (Blue)</h5>
                    <ul className="text-blue-800 space-y-1 text-sm">
                      <li>• Current returns through ground wire</li>
                      <li>• Completes the circuit loop</li>
                      <li>• Returns to battery negative (-)</li>
                      <li>• Circuit is now complete!</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
                <h4 className="font-bold text-green-900 mb-3">🔄 Circuit Flow Rules</h4>
                <ul className="text-green-800 space-y-2">
                  <li>• Current flows from positive (+) to negative (-)</li>
                  <li>• All components must be in a complete loop</li>
                  <li>• Breaks in the circuit stop current flow</li>
                  <li>• Multiple paths create parallel circuits</li>
                  <li>• Follow the path with your finger to trace current flow</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2>Example Circuits</h2>

              <p>
                Let's look at some simple circuits and understand what each component does.
              </p>

              <div className="space-y-8 my-8">
                {circuitExamples.map((circuit, index) => (
                  <div key={circuit.name} className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-3">{circuit.name}</h4>
                    <p className="text-gray-600 mb-4">{circuit.description}</p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Circuit Diagram */}
                      <div className="lg:col-span-1">
                        <h5 className="font-medium text-gray-700 mb-3">Circuit Diagram:</h5>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          {index === 0 ? (
                            // Simple LED Circuit
                            <svg width="200" height="120" viewBox="0 0 200 120" className="mx-auto">
                              {/* Battery */}
                              <g transform="translate(20, 50)">
                                <line x1="0" y1="0" x2="0" y2="20" stroke="#333" strokeWidth="2" />
                                <line x1="0" y1="-5" x2="0" y2="5" stroke="#333" strokeWidth="4" />
                                <text x="-10" y="-10" fontSize="8" fill="#333">+</text>
                              </g>

                              {/* Wire to Resistor */}
                              <line x1="20" y1="45" x2="60" y2="45" stroke="#333" strokeWidth="1" />

                              {/* Resistor */}
                              <g transform="translate(60, 45)">
                                <path d="M0,0 L5,-3 L10,3 L15,-3 L20,3 L25,0" stroke="#333" strokeWidth="1" fill="none" />
                                <text x="8" y="-8" fontSize="6" fill="#333">220Ω</text>
                              </g>

                              {/* Wire to LED */}
                              <line x1="85" y1="45" x2="120" y2="45" stroke="#333" strokeWidth="1" />

                              {/* LED */}
                              <g transform="translate(120, 45)">
                                <polygon points="0,0 10,-5 10,5" stroke="#333" strokeWidth="1" fill="none" />
                                <line x1="10" y1="-5" x2="10" y2="5" stroke="#333" strokeWidth="1" />
                                <text x="-5" y="-8" fontSize="6" fill="#333">LED</text>
                              </g>

                              {/* Return wire */}
                              <line x1="130" y1="45" x2="130" y2="75" stroke="#333" strokeWidth="1" />
                              <line x1="130" y1="75" x2="20" y2="75" stroke="#333" strokeWidth="1" />
                              <line x1="20" y1="75" x2="20" y2="70" stroke="#333" strokeWidth="1" />
                            </svg>
                          ) : (
                            // LED with Switch Circuit
                            <svg width="200" height="120" viewBox="0 0 200 120" className="mx-auto">
                              {/* Battery */}
                              <g transform="translate(20, 50)">
                                <line x1="0" y1="0" x2="0" y2="20" stroke="#333" strokeWidth="2" />
                                <line x1="0" y1="-5" x2="0" y2="5" stroke="#333" strokeWidth="4" />
                                <text x="-10" y="-10" fontSize="8" fill="#333">+</text>
                              </g>

                              {/* Wire to Switch */}
                              <line x1="20" y1="45" x2="50" y2="45" stroke="#333" strokeWidth="1" />

                              {/* Switch */}
                              <g transform="translate(50, 45)">
                                <circle cx="0" cy="0" r="2" fill="#333" />
                                <circle cx="20" cy="0" r="2" fill="#333" />
                                <line x1="0" y1="0" x2="15" y2="-8" stroke="#333" strokeWidth="1" />
                                <text x="5" y="-12" fontSize="6" fill="#333">SW</text>
                              </g>

                              {/* Wire to Resistor */}
                              <line x1="70" y1="45" x2="90" y2="45" stroke="#333" strokeWidth="1" />

                              {/* Resistor */}
                              <g transform="translate(90, 45)">
                                <path d="M0,0 L5,-3 L10,3 L15,-3 L20,3 L25,0" stroke="#333" strokeWidth="1" fill="none" />
                                <text x="8" y="-8" fontSize="6" fill="#333">330Ω</text>
                              </g>

                              {/* Wire to LED */}
                              <line x1="115" y1="45" x2="140" y2="45" stroke="#333" strokeWidth="1" />

                              {/* LED */}
                              <g transform="translate(140, 45)">
                                <polygon points="0,0 10,-5 10,5" stroke="#333" strokeWidth="1" fill="none" />
                                <line x1="10" y1="-5" x2="10" y2="5" stroke="#333" strokeWidth="1" />
                                <text x="-5" y="-8" fontSize="6" fill="#333">LED</text>
                              </g>

                              {/* Return wire */}
                              <line x1="150" y1="45" x2="150" y2="75" stroke="#333" strokeWidth="1" />
                              <line x1="150" y1="75" x2="20" y2="75" stroke="#333" strokeWidth="1" />
                              <line x1="20" y1="75" x2="20" y2="70" stroke="#333" strokeWidth="1" />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Components and Explanation */}
                      <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">Components:</h5>
                            <ul className="text-gray-600 space-y-1">
                              {circuit.components.map((component, index) => (
                                <li key={index}>• {component}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-medium text-gray-700 mb-2">How it works:</h5>
                            <p className="text-gray-600 text-sm">{circuit.explanation}</p>

                            <div className="bg-red-50 border border-red-200 rounded p-3 mt-3">
                              <span className="font-medium text-red-800">⚠️ Safety:</span>
                              <span className="text-red-700 ml-2 text-sm">{circuit.safety}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2>Common Mistakes to Avoid</h2>

              <p>
                Even experienced engineers make these mistakes! Learning to spot them early will save you
                lots of troubleshooting time.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                {/* Mistake 1: Incomplete Circuit */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="font-bold text-red-900 mb-3">❌ Incomplete Circuit</h4>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <svg width="150" height="80" viewBox="0 0 150 80" className="mx-auto">
                      {/* Battery */}
                      <g transform="translate(20, 30)">
                        <line x1="0" y1="0" x2="0" y2="20" stroke="#333" strokeWidth="2" />
                        <line x1="0" y1="-5" x2="0" y2="5" stroke="#333" strokeWidth="4" />
                        <text x="-10" y="-10" fontSize="8" fill="#333">+</text>
                      </g>

                      {/* Wire to LED */}
                      <line x1="20" y1="25" x2="80" y2="25" stroke="#333" strokeWidth="1" />

                      {/* LED */}
                      <g transform="translate(80, 25)">
                        <polygon points="0,0 10,-5 10,5" stroke="#333" strokeWidth="1" fill="none" />
                        <line x1="10" y1="-5" x2="10" y2="5" stroke="#333" strokeWidth="1" />
                      </g>

                      {/* Missing return path - shown with X */}
                      <text x="60" y="60" fontSize="20" fill="#e74c3c">✗</text>
                      <text x="45" y="75" fontSize="8" fill="#e74c3c">No return path!</text>
                    </svg>
                  </div>
                  <p className="text-red-800 text-sm">
                    <strong>Problem:</strong> Current has no way to return to the battery negative terminal.
                  </p>
                  <p className="text-red-800 text-sm">
                    <strong>Fix:</strong> Always complete the circuit with a return path to ground.
                  </p>
                </div>

                {/* Mistake 2: Wrong LED Polarity */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="font-bold text-red-900 mb-3">❌ Wrong LED Polarity</h4>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <svg width="150" height="80" viewBox="0 0 150 80" className="mx-auto">
                      {/* Battery */}
                      <g transform="translate(20, 30)">
                        <line x1="0" y1="0" x2="0" y2="20" stroke="#333" strokeWidth="2" />
                        <line x1="0" y1="-5" x2="0" y2="5" stroke="#333" strokeWidth="4" />
                        <text x="-10" y="-10" fontSize="8" fill="#333">+</text>
                      </g>

                      {/* Wire to LED */}
                      <line x1="20" y1="25" x2="80" y2="25" stroke="#333" strokeWidth="1" />

                      {/* LED - Wrong way around */}
                      <g transform="translate(80, 25)">
                        <polygon points="10,0 0,-5 0,5" stroke="#e74c3c" strokeWidth="2" fill="none" />
                        <line x1="0" y1="-5" x2="0" y2="5" stroke="#e74c3c" strokeWidth="2" />
                        <text x="-5" y="15" fontSize="8" fill="#e74c3c">Wrong way!</text>
                      </g>

                      {/* Return wire */}
                      <line x1="80" y1="25" x2="80" y2="50" stroke="#333" strokeWidth="1" />
                      <line x1="80" y1="50" x2="20" y2="50" stroke="#333" strokeWidth="1" />
                      <line x1="20" y1="50" x2="20" y2="50" stroke="#333" strokeWidth="1" />
                    </svg>
                  </div>
                  <p className="text-red-800 text-sm">
                    <strong>Problem:</strong> LED is connected backwards - it won't light up.
                  </p>
                  <p className="text-red-800 text-sm">
                    <strong>Fix:</strong> Triangle points in direction of current flow (+ to -).
                  </p>
                </div>

                {/* Mistake 3: Missing Resistor */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="font-bold text-red-900 mb-3">❌ Missing Resistor</h4>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <svg width="150" height="80" viewBox="0 0 150 80" className="mx-auto">
                      {/* Battery */}
                      <g transform="translate(20, 30)">
                        <line x1="0" y1="0" x2="0" y2="20" stroke="#333" strokeWidth="2" />
                        <line x1="0" y1="-5" x2="0" y2="5" stroke="#333" strokeWidth="4" />
                        <text x="-10" y="-10" fontSize="8" fill="#333">+</text>
                      </g>

                      {/* Direct wire to LED - DANGEROUS */}
                      <line x1="20" y1="25" x2="80" y2="25" stroke="#e74c3c" strokeWidth="3" />

                      {/* LED */}
                      <g transform="translate(80, 25)">
                        <polygon points="0,0 10,-5 10,5" stroke="#333" strokeWidth="1" fill="none" />
                        <line x1="10" y1="-5" x2="10" y2="5" stroke="#333" strokeWidth="1" />
                        <text x="-5" y="15" fontSize="8" fill="#e74c3c">Will burn out!</text>
                      </g>

                      {/* Return wire */}
                      <line x1="90" y1="25" x2="90" y2="50" stroke="#333" strokeWidth="1" />
                      <line x1="90" y1="50" x2="20" y2="50" stroke="#333" strokeWidth="1" />
                      <line x1="20" y1="50" x2="20" y2="50" stroke="#333" strokeWidth="1" />

                      {/* Warning symbol */}
                      <text x="50" y="15" fontSize="12" fill="#e74c3c">⚠️</text>
                    </svg>
                  </div>
                  <p className="text-red-800 text-sm">
                    <strong>Problem:</strong> Too much current will instantly destroy the LED.
                  </p>
                  <p className="text-red-800 text-sm">
                    <strong>Fix:</strong> Always include a current-limiting resistor with LEDs.
                  </p>
                </div>

                {/* Mistake 4: Connection Confusion */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="font-bold text-red-900 mb-3">❌ Connection Confusion</h4>
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <svg width="150" height="80" viewBox="0 0 150 80" className="mx-auto">
                      {/* Two crossing wires - no connection */}
                      <line x1="20" y1="20" x2="80" y2="60" stroke="#333" strokeWidth="2" />
                      <line x1="20" y1="60" x2="80" y2="20" stroke="#333" strokeWidth="2" />
                      <text x="45" y="15" fontSize="8" fill="#e74c3c">No dot = No connection</text>

                      {/* Proper connection with dot */}
                      <line x1="100" y1="20" x2="140" y2="60" stroke="#333" strokeWidth="2" />
                      <line x1="100" y1="60" x2="140" y2="20" stroke="#333" strokeWidth="2" />
                      <circle cx="120" cy="40" r="3" fill="#333" />
                      <text x="105" y="15" fontSize="8" fill="#22c55e">Dot = Connected</text>
                    </svg>
                  </div>
                  <p className="text-red-800 text-sm">
                    <strong>Problem:</strong> Assuming crossing lines are connected.
                  </p>
                  <p className="text-red-800 text-sm">
                    <strong>Fix:</strong> Look for dots (•) to show actual connections.
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-8">
                <h4 className="font-bold text-yellow-900 mb-4">💡 Pro Tips for Reading Schematics</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-800">
                  <ul className="space-y-2 text-sm">
                    <li>• Always trace the complete current path</li>
                    <li>• Check component polarity (+ and - markings)</li>
                    <li>• Look for dots at wire intersections</li>
                    <li>• Verify all components have proper values</li>
                  </ul>
                  <ul className="space-y-2 text-sm">
                    <li>• Start from the power source (+)</li>
                    <li>• Follow the path through each component</li>
                    <li>• End at the power source (-) or ground</li>
                    <li>• If you can't trace a complete path, something's wrong!</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2>Interactive Practice: Identify the Components</h2>

              <p>
                Let's practice identifying components in a simple circuit diagram. Look at this
                LED circuit and see if you can identify each component and understand how it works.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 my-8">
                <div className="text-center mb-6">
                  <h4 className="font-bold text-gray-900 mb-4">Simple LED Circuit Diagram</h4>
                  <div className="bg-white rounded-lg p-6 inline-block border-2 border-dashed border-gray-300">
                    <div className="flex items-center justify-center space-x-8">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🔋</div>
                        <div className="text-sm font-medium">9V Battery</div>
                        <div className="text-xs text-gray-600">Power Source</div>
                      </div>
                      <div className="text-2xl text-gray-400">—</div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">⚡</div>
                        <div className="text-sm font-medium">220Ω Resistor</div>
                        <div className="text-xs text-gray-600">Current Limiter</div>
                      </div>
                      <div className="text-2xl text-gray-400">—</div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">💡</div>
                        <div className="text-sm font-medium">Red LED</div>
                        <div className="text-xs text-gray-600">Light Output</div>
                      </div>
                      <div className="text-2xl text-gray-400">—</div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">⏚</div>
                        <div className="text-sm font-medium">Ground</div>
                        <div className="text-xs text-gray-600">Return Path</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-bold text-blue-900 mb-3">🔍 What's Happening?</h5>
                    <ul className="text-blue-800 space-y-2 text-sm">
                      <li>• Battery provides 9V of electrical pressure</li>
                      <li>• Current flows from + to - through the circuit</li>
                      <li>• Resistor limits current to protect the LED</li>
                      <li>• LED converts electrical energy to light</li>
                      <li>• Ground completes the circuit back to battery</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-bold text-green-900 mb-3">🎯 Key Learning Points</h5>
                    <ul className="text-green-800 space-y-2 text-sm">
                      <li>• Every component has a specific symbol</li>
                      <li>• Lines show how components connect</li>
                      <li>• Current must have a complete path</li>
                      <li>• Each component has a specific job</li>
                      <li>• Safety components (resistors) are essential</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 my-8">
                <h4 className="font-bold text-purple-900 mb-4">🎯 Try This at Home</h4>
                <p className="text-purple-800 mb-4">
                  Look at electronic devices around you and try to imagine what their circuit
                  diagrams might look like. A flashlight, for example, has a battery, switch,
                  and light bulb all connected in a simple loop.
                </p>
                <div className="bg-purple-100 rounded-lg p-4">
                  <p className="text-purple-800 text-sm">
                    <strong>Challenge:</strong> Can you draw a simple circuit diagram for a flashlight?
                    It needs a battery, switch, light bulb, and wires connecting them all together!
                  </p>
                </div>
              </div>
            </section>

            {/* Knowledge Check */}
            <KnowledgeCheck
              title="Test Your Understanding"
              questions={[
                {
                  id: "1",
                  question: "In a battery symbol, which line represents the positive terminal?",
                  options: [
                    "The short line",
                    "The long line",
                    "Both lines are the same",
                    "It doesn't matter"
                  ],
                  correctAnswer: 1,
                  explanation: "In a battery symbol, the long line always represents the positive (+) terminal, and the short line represents the negative (-) terminal."
                },
                {
                  id: "2",
                  question: "What does a dot on a schematic diagram indicate?",
                  options: [
                    "A component is broken",
                    "Wires are connected at that point",
                    "The circuit is turned off",
                    "A measurement point"
                  ],
                  correctAnswer: 1,
                  explanation: "A dot (junction dot) on a schematic indicates that wires are electrically connected at that point. Without a dot, crossing lines are not connected."
                },
                {
                  id: "3",
                  question: "Why do LEDs need current-limiting resistors in circuits?",
                  options: [
                    "To make them brighter",
                    "To change their color",
                    "To prevent damage from too much current",
                    "To make them blink"
                  ],
                  correctAnswer: 2,
                  explanation: "LEDs need current-limiting resistors to prevent damage. Without a resistor, too much current would flow through the LED and burn it out."
                },
                {
                  id: "4",
                  question: "In which direction does conventional current flow in a circuit?",
                  options: [
                    "From negative to positive",
                    "From positive to negative",
                    "In both directions",
                    "It depends on the component"
                  ],
                  correctAnswer: 1,
                  explanation: "Conventional current flows from positive (+) to negative (-) terminal of the power source, creating a complete loop through the circuit."
                },
                {
                  id: "5",
                  question: "What is the main purpose of using schematic symbols instead of realistic drawings?",
                  options: [
                    "They look more professional",
                    "They are easier and faster to draw",
                    "They are universally understood and simplify complex circuits",
                    "They save ink when printing"
                  ],
                  correctAnswer: 2,
                  explanation: "Schematic symbols are universally understood worldwide and make complex circuits much easier to read and understand than realistic drawings would."
                }
              ]}
            />

            <section className="mb-12">
              <h2>What's Next?</h2>

              <p>
                Excellent work! You now know how to read basic circuit diagrams and understand
                the symbols used in electronics. In the next lesson, we'll learn how to use a
                breadboard to actually build these circuits.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
                <h4 className="font-bold text-green-900 mb-3">✅ What You Accomplished</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800">
                  <ul className="space-y-1 text-sm">
                    <li>• Learned to read 7 essential schematic symbols</li>
                    <li>• Understanding circuit flow and current direction</li>
                    <li>• Identifying component connections and polarity</li>
                    <li>• Recognizing safety considerations in diagrams</li>
                  </ul>
                  <ul className="space-y-1 text-sm">
                    <li>• Understanding real-world component relationships</li>
                    <li>• Common values and specifications for components</li>
                    <li>• Troubleshooting connection problems</li>
                    <li>• Building confidence with circuit interpretation</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h4 className="font-bold text-purple-900 mb-4">🚀 Ready to Build?</h4>
                <p className="text-purple-800 mb-4">
                  Now that you can read circuit diagrams, it's time to learn how to build them!
                  In our next lesson, we'll explore breadboards - the foundation for building
                  and testing electronic circuits safely.
                </p>
                <div className="text-purple-800 text-sm">
                  <strong>Coming up:</strong> Breadboard layout, making connections, avoiding
                  common mistakes, and building your first real circuit.
                </div>
              </div>
            </section>
          </div>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-200">
            <Link
              href="/electronics-101/essential-components"
              className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4 sm:mb-0"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back: Essential Components
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
};

export default ReadingCircuitDiagramsPage;
