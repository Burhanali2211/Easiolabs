import Link from 'next/link';
import { ArrowRight, ArrowLeft, Lightbulb, Zap, AlertTriangle, CheckCircle, Eye, Thermometer, Clock, Cpu, Sun } from 'lucide-react';

const AdvancedComponentsPage = () => {
  const sensorTypes = [
    {
      type: 'Light Sensor (LDR)',
      fullName: 'Light Dependent Resistor',
      description: 'Resistance changes with light intensity',
      voltage: '3V - 12V',
      output: 'Variable resistance (1kΩ - 1MΩ)',
      applications: ['Automatic lighting', 'Day/night detection', 'Light meters', 'Solar trackers'],
      workingPrinciple: 'Resistance decreases as light intensity increases',
      beginnerTip: 'Great first sensor - easy to use with simple voltage divider circuit',
      circuitExample: 'Voltage divider with fixed resistor to convert resistance to voltage'
    },
    {
      type: 'Temperature Sensor (Thermistor)',
      fullName: 'Thermal Resistor',
      description: 'Resistance changes with temperature',
      voltage: '3V - 12V',
      output: 'Variable resistance',
      applications: ['Temperature monitoring', 'Thermostat control', 'Fire detection', 'Weather stations'],
      workingPrinciple: 'NTC: resistance decreases as temperature increases',
      beginnerTip: 'Use NTC type for most projects - more predictable response',
      circuitExample: 'Voltage divider circuit with reference resistor'
    },
    {
      type: 'Motion Sensor (PIR)',
      fullName: 'Passive Infrared Sensor',
      description: 'Detects infrared radiation from moving objects',
      voltage: '5V - 12V',
      output: 'Digital HIGH/LOW signal',
      applications: ['Security systems', 'Automatic lights', 'Occupancy detection', 'Energy saving'],
      workingPrinciple: 'Detects changes in infrared radiation patterns',
      beginnerTip: 'Has built-in processing - just gives simple on/off output',
      circuitExample: 'Direct connection to digital input with pull-up resistor'
    },
    {
      type: 'Ultrasonic Sensor (HC-SR04)',
      fullName: 'Ultrasonic Distance Sensor',
      description: 'Measures distance using ultrasonic waves',
      voltage: '5V',
      output: 'Digital pulse width (time-based)',
      applications: ['Distance measurement', 'Object detection', 'Parking sensors', 'Robotics'],
      workingPrinciple: 'Measures time for ultrasonic pulse to return',
      beginnerTip: 'Requires timing measurement - easier with microcontroller',
      circuitExample: 'Trigger and echo pins with timing circuit'
    }
  ];

  const timingCircuits = [
    {
      name: '555 Timer - Astable Mode',
      description: 'Generates continuous square wave pulses',
      components: ['555 Timer IC', '2x Resistors', '1x Capacitor'],
      frequency: 'Adjustable (0.1Hz - 1MHz)',
      applications: ['LED flasher', 'Clock generator', 'Tone generator', 'PWM signals'],
      formula: 'f = 1.44 / ((R1 + 2×R2) × C)',
      beginnerTip: 'Start with R1=1kΩ, R2=10kΩ, C=10µF for ~7Hz'
    },
    {
      name: '555 Timer - Monostable Mode',
      description: 'Generates single pulse when triggered',
      components: ['555 Timer IC', '1x Resistor', '1x Capacitor', 'Trigger input'],
      frequency: 'Single pulse duration',
      applications: ['Delay circuits', 'Pulse stretching', 'Debouncing', 'One-shot triggers'],
      formula: 'T = 1.1 × R × C',
      beginnerTip: 'Use for creating precise delays - great for timing applications'
    },
    {
      name: 'RC Delay Circuit',
      description: 'Simple delay using resistor and capacitor',
      components: ['Resistor', 'Capacitor', 'Optional: Schmitt trigger'],
      frequency: 'Single time constant',
      applications: ['Power-on delays', 'Reset circuits', 'Simple timers', 'Soft start circuits'],
      formula: 'τ = R × C (63% charge time)',
      beginnerTip: 'Simplest timing circuit - good for understanding RC behavior'
    }
  ];

  const logicGates = [
    {
      gate: 'AND Gate',
      symbol: '&',
      description: 'Output HIGH only when ALL inputs are HIGH',
      truthTable: [
        { inputs: '0 0', output: '0' },
        { inputs: '0 1', output: '0' },
        { inputs: '1 0', output: '0' },
        { inputs: '1 1', output: '1' }
      ],
      applications: ['Safety interlocks', 'Multiple condition checking', 'Enable signals'],
      example: 'Door opens only when key is inserted AND button is pressed'
    },
    {
      gate: 'OR Gate',
      symbol: '≥1',
      description: 'Output HIGH when ANY input is HIGH',
      truthTable: [
        { inputs: '0 0', output: '0' },
        { inputs: '0 1', output: '1' },
        { inputs: '1 0', output: '1' },
        { inputs: '1 1', output: '1' }
      ],
      applications: ['Multiple trigger sources', 'Alarm systems', 'Alternative inputs'],
      example: 'Alarm sounds when door opens OR window opens'
    },
    {
      gate: 'NOT Gate',
      symbol: '1',
      description: 'Output is opposite of input (inverter)',
      truthTable: [
        { inputs: '0', output: '1' },
        { inputs: '1', output: '0' }
      ],
      applications: ['Signal inversion', 'Active-low conversion', 'Logic level shifting'],
      example: 'LED turns OFF when button is pressed'
    }
  ];

  const integrationProjects = [
    {
      name: 'Smart Night Light',
      components: ['LDR', 'LED', 'Transistor', 'Resistors', 'Battery'],
      description: 'Automatically turns on LED when it gets dark',
      difficulty: 'Beginner',
      buildTime: '20 minutes',
      learningGoals: ['Sensor integration', 'Automatic control', 'Threshold detection'],
      operation: 'LDR resistance increases in darkness, triggering LED through transistor'
    },
    {
      name: 'Temperature Alarm',
      components: ['Thermistor', 'Buzzer', 'Comparator IC', 'Resistors', 'Potentiometer'],
      description: 'Sounds alarm when temperature exceeds set threshold',
      difficulty: 'Intermediate',
      buildTime: '30 minutes',
      learningGoals: ['Temperature sensing', 'Threshold comparison', 'Alarm systems'],
      operation: 'Comparator triggers buzzer when thermistor voltage exceeds reference'
    },
    {
      name: 'Motion-Activated Timer Light',
      components: ['PIR sensor', 'LED', '555 Timer', 'Transistor', 'Capacitor', 'Resistors'],
      description: 'Light turns on for set time when motion is detected',
      difficulty: 'Intermediate',
      buildTime: '35 minutes',
      learningGoals: ['Motion detection', 'Timer circuits', 'Component integration'],
      operation: 'PIR triggers 555 timer which controls LED for predetermined duration'
    },
    {
      name: 'Multi-Sensor Security System',
      components: ['PIR sensor', 'LDR', 'Buzzer', 'LEDs', 'Logic gates', 'Resistors'],
      description: 'Alarm system with multiple sensors and logic conditions',
      difficulty: 'Advanced',
      buildTime: '45 minutes',
      learningGoals: ['Logic gate implementation', 'Multiple sensors', 'System design'],
      operation: 'Combines motion and light sensors with logic gates for smart detection'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">Electronics 101</span>
            <span className="text-sm text-gray-600">Lesson 9 of 10</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '90%' }}></div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Advanced Components
          </h1>
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
            <span className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-1" />
              50 min read
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Intermediate</span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Explore sensors, timing circuits, and logic gates. Learn to integrate multiple components
            and create sophisticated circuits that respond to their environment and make decisions.
          </p>
        </header>

        {/* Learning Objectives */}
        <section className="mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">🎯 What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
              <ul className="space-y-2">
                <li>• Different sensor types and applications</li>
                <li>• Timing circuits with 555 timer and RC networks</li>
                <li>• Basic logic gates and truth tables</li>
              </ul>
              <ul className="space-y-2">
                <li>• Multi-component circuit integration</li>
                <li>• Sensor signal conditioning</li>
                <li>• Building intelligent responsive circuits</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Sensors Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <Eye className="inline h-6 w-6 mr-2" />
            Understanding Sensors
          </h2>

          <div className="space-y-8">
            {sensorTypes.map((sensor, index) => (
              <div key={sensor.type} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{sensor.type}</h3>
                    <p className="text-sm text-gray-600">{sensor.fullName}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{sensor.description}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Specifications:</h4>
                    <ul className="text-gray-700 space-y-1 mb-4">
                      <li><strong>Voltage:</strong> {sensor.voltage}</li>
                      <li><strong>Output:</strong> {sensor.output}</li>
                    </ul>

                    <h4 className="font-bold text-gray-900 mb-2">How it works:</h4>
                    <p className="text-gray-700 text-sm mb-4">{sensor.workingPrinciple}</p>

                    <h4 className="font-bold text-gray-900 mb-2">Applications:</h4>
                    <ul className="text-gray-700 space-y-1">
                      {sensor.applications.map((app, i) => (
                        <li key={i}>• {app}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-4">
                      <h4 className="font-bold text-indigo-900 mb-2">💡 Beginner Tip</h4>
                      <p className="text-indigo-800 text-sm">{sensor.beginnerTip}</p>
                    </div>

                    <div className="bg-white border border-indigo-200 rounded p-4">
                      <h4 className="font-bold text-indigo-900 mb-2">🔧 Circuit Example</h4>
                      <p className="text-indigo-800 text-sm">{sensor.circuitExample}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timing Circuits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <Clock className="inline h-6 w-6 mr-2" />
            Timing Circuits
          </h2>

          <div className="space-y-6">
            {timingCircuits.map((circuit, index) => (
              <div key={circuit.name} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-yellow-900 mb-3">{circuit.name}</h3>
                <p className="text-yellow-800 mb-4">{circuit.description}</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-bold text-yellow-900 mb-2">Components:</h4>
                    <ul className="text-yellow-800 space-y-1 text-sm">
                      {circuit.components.map((component, i) => (
                        <li key={i}>• {component}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-yellow-900 mb-2">Applications:</h4>
                    <ul className="text-yellow-800 space-y-1 text-sm">
                      {circuit.applications.map((app, i) => (
                        <li key={i}>• {app}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-yellow-900 mb-2">Formula:</h4>
                    <p className="text-yellow-800 text-sm font-mono bg-white p-2 rounded border">
                      {circuit.formula}
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded p-3 mt-4">
                  <h4 className="font-bold text-green-900 mb-1 text-sm">💡 Beginner Tip</h4>
                  <p className="text-green-800 text-sm">{circuit.beginnerTip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Logic Gates */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <Cpu className="inline h-6 w-6 mr-2" />
            Basic Logic Gates
          </h2>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-bold text-purple-900 mb-4">Understanding Digital Logic</h3>
            <p className="text-purple-800 mb-4">
              Logic gates are the building blocks of digital circuits. They make decisions based on input conditions,
              outputting either HIGH (1) or LOW (0). Think of them as electronic switches that follow specific rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {logicGates.map((gate, index) => (
              <div key={gate.gate} className="bg-white border border-purple-200 rounded-lg p-6">
                <div className="text-center mb-4">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 font-bold text-lg">{gate.symbol}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{gate.gate}</h3>
                </div>

                <p className="text-gray-700 text-sm mb-4">{gate.description}</p>

                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">Truth Table:</h4>
                  <div className="bg-gray-50 rounded p-3">
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="font-bold">Input</div>
                      <div className="font-bold">Output</div>
                      {gate.truthTable.map((row, i) => (
                        <React.Fragment key={i}>
                          <div>{row.inputs}</div>
                          <div>{row.output}</div>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">Applications:</h4>
                  <ul className="text-gray-700 space-y-1 text-xs">
                    {gate.applications.map((app, i) => (
                      <li key={i}>• {app}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <h4 className="font-bold text-blue-900 mb-1 text-xs">Example:</h4>
                  <p className="text-blue-800 text-xs">{gate.example}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Integration Projects */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Multi-Component Integration Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrationProjects.map((project, index) => (
              <div key={project.name} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${project.difficulty === 'Beginner'
                    ? 'bg-green-100 text-green-800'
                    : project.difficulty === 'Intermediate'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                    }`}>
                    {project.difficulty}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Components needed:</h4>
                  <div className="flex flex-wrap gap-1">
                    {project.components.map((component, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {component}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Learning Goals:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {project.learningGoals.map((goal, i) => (
                      <li key={i}>• {goal}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded p-3 mb-4">
                  <h4 className="font-bold text-green-900 mb-1 text-sm">⚙️ How it works</h4>
                  <p className="text-green-800 text-xs">{project.operation}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Build time: {project.buildTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Component Simulator */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Advanced Component Simulator</h2>
              <p className="text-gray-600 mb-6">
                Experiment with sensors, timing circuits, and logic gates in a safe virtual environment
                before building complex multi-component circuits.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">4</div>
                  <div className="text-sm text-gray-600">Sensor Types</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">3</div>
                  <div className="text-sm text-gray-600">Logic Gates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">555</div>
                  <div className="text-sm text-gray-600">Timer Circuits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">4</div>
                  <div className="text-sm text-gray-600">Integration Projects</div>
                </div>
              </div>
              <Link
                href="/circuit-simulator?tutorial=advanced-components"
                className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                <Cpu className="h-5 w-5 mr-2" />
                Open Advanced Simulator
              </Link>
            </div>
          </div>
        </section>

        {/* Troubleshooting Advanced Circuits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting Advanced Circuits</h2>

          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3">❌ Sensor not responding</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Check these first:</h4>
                  <ul className="text-red-800 space-y-1 text-sm">
                    <li>• Power supply voltage and connections</li>
                    <li>• Sensor orientation and positioning</li>
                    <li>• Signal conditioning circuit</li>
                    <li>• Environmental conditions (light, temperature)</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h4 className="font-bold text-green-900 mb-2">🛡️ Prevention</h4>
                  <p className="text-green-800 text-sm">Test sensors individually before integration</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3">❌ Timing circuit not working</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Common issues:</h4>
                  <ul className="text-red-800 space-y-1 text-sm">
                    <li>• Incorrect component values (R, C)</li>
                    <li>• Faulty 555 timer IC</li>
                    <li>• Wrong pin connections</li>
                    <li>• Inadequate power supply decoupling</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h4 className="font-bold text-green-900 mb-2">🛡️ Prevention</h4>
                  <p className="text-green-800 text-sm">Double-check pin diagrams and use bypass capacitors</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3">❌ Logic gates giving wrong output</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Verify systematically:</h4>
                  <ul className="text-red-800 space-y-1 text-sm">
                    <li>• Input signal levels (HIGH/LOW)</li>
                    <li>• Truth table expectations</li>
                    <li>• Power supply to logic IC</li>
                    <li>• Floating inputs (use pull-up/down resistors)</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h4 className="font-bold text-green-900 mb-2">🛡️ Prevention</h4>
                  <p className="text-green-800 text-sm">Always tie unused inputs to known logic levels</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Exercises */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Exercises</h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">🏋️ Build These Advanced Circuits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
              <div>
                <h4 className="font-bold mb-2">Sensor Projects:</h4>
                <ol className="space-y-1 text-sm">
                  <li>1. Light-controlled LED (LDR + transistor)</li>
                  <li>2. Temperature alarm system</li>
                  <li>3. Motion-activated light</li>
                  <li>4. Distance measurement display</li>
                </ol>
              </div>
              <div>
                <h4 className="font-bold mb-2">Logic & Timing Projects:</h4>
                <ol className="space-y-1 text-sm">
                  <li>1. 555 timer LED flasher</li>
                  <li>2. AND gate security system</li>
                  <li>3. OR gate alarm with multiple triggers</li>
                  <li>4. Multi-sensor smart system</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* What's Next */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>

          <p className="text-gray-700 mb-6">
            Outstanding! You've mastered advanced components including sensors, timing circuits, and logic gates.
            You can now build sophisticated circuits that respond to their environment and make intelligent decisions.
            You're ready for the final step in your electronics journey.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-green-900 mb-3">✅ What You Accomplished</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800">
              <ul className="space-y-1 text-sm">
                <li>• Learned about 4 different sensor types</li>
                <li>• Mastered 555 timer and RC timing circuits</li>
                <li>• Understood basic logic gates and truth tables</li>
              </ul>
              <ul className="space-y-1 text-sm">
                <li>• Built multi-component integration projects</li>
                <li>• Developed advanced troubleshooting skills</li>
                <li>• Created intelligent responsive circuits</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h4 className="font-bold text-purple-900 mb-4">🚀 Ready for Arduino?</h4>
            <p className="text-purple-800 mb-4">
              In our final lesson, we'll bring everything together with Arduino - a powerful microcontroller
              that can control all the components you've learned about. You'll learn programming basics,
              digital and analog I/O, and build complete projects.
            </p>
            <div className="text-purple-800 text-sm">
              <strong>Coming up:</strong> Arduino setup, programming environment, digital I/O, analog reading,
              PWM control, and recreating all your previous circuits with intelligent control.
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <Link
            href="/electronics-101/buzzer-sound"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4 sm:mb-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous: Buzzer and Sound
          </Link>

          <Link
            href="/electronics-101/arduino-introduction"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Next: Arduino Introduction
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </article>
    </div>
  );
};

export default AdvancedComponentsPage;
