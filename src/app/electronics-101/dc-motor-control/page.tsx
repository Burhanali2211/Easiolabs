import Link from 'next/link';
import { ArrowRight, ArrowLeft, Lightbulb, Zap, AlertTriangle, CheckCircle, Settings, RotateCw, Battery, Shield, Target } from 'lucide-react';
import KnowledgeCheck from '@/components/KnowledgeCheck';

const DCMotorControlPage = () => {
  const motorTypes = [
    {
      type: 'Small DC Motor',
      voltage: '3V - 6V',
      current: '100mA - 500mA',
      torque: 'Low',
      speed: 'High (3000-15000 RPM)',
      uses: ['Fans', 'Small robots', 'Toys', 'Vibration motors'],
      beginnerTip: 'Perfect for learning - low voltage and current make them safe'
    },
    {
      type: 'Gear Motor',
      voltage: '6V - 12V',
      current: '200mA - 1A',
      torque: 'High',
      speed: 'Low (10-300 RPM)',
      uses: ['Robot wheels', 'Conveyor belts', 'Precise positioning'],
      beginnerTip: 'Built-in gearbox trades speed for torque - great for moving things'
    },
    {
      type: 'Servo Motor',
      voltage: '4.8V - 6V',
      current: '500mA - 2A',
      torque: 'Medium-High',
      speed: 'Controlled position',
      uses: ['Robot arms', 'Camera pan/tilt', 'RC vehicles'],
      beginnerTip: 'Has built-in position control - just tell it where to go'
    }
  ];

  const basicCircuits = [
    {
      name: 'Simple Motor Circuit',
      components: ['6V Battery Pack', 'Small DC Motor', 'Switch', 'Wires'],
      description: 'Basic on/off motor control',
      difficulty: 'Beginner',
      buildTime: '10 minutes',
      learningGoals: ['Motor operation', 'Power switching', 'Basic control'],
      safetyNote: 'Always check motor voltage rating before connecting'
    },
    {
      name: 'Motor with Protection Diode',
      components: ['6V Battery', 'DC Motor', 'Switch', '1N4007 Diode', 'Wires'],
      description: 'Protect circuit from motor back-EMF',
      difficulty: 'Beginner',
      buildTime: '15 minutes',
      learningGoals: ['Back-EMF protection', 'Diode placement', 'Circuit protection'],
      safetyNote: 'Diode prevents voltage spikes that can damage other components'
    },
    {
      name: 'Speed Control with Potentiometer',
      components: ['6V Battery', 'DC Motor', '1kΩ Potentiometer', 'Transistor', 'Resistor'],
      description: 'Variable speed control using analog components',
      difficulty: 'Intermediate',
      buildTime: '25 minutes',
      learningGoals: ['Analog speed control', 'Transistor switching', 'Variable resistance'],
      safetyNote: 'Transistor may get warm - ensure proper heat dissipation'
    },
    {
      name: 'Direction Control (H-Bridge)',
      components: ['6V Battery', 'DC Motor', '4x Switches', '4x Diodes', 'Wires'],
      description: 'Control motor direction with manual H-bridge',
      difficulty: 'Intermediate',
      buildTime: '30 minutes',
      learningGoals: ['H-bridge concept', 'Direction control', 'Switch coordination'],
      safetyNote: 'Never close opposite switches simultaneously - will short circuit!'
    }
  ];

  const powerConsiderations = [
    {
      aspect: 'Voltage Requirements',
      description: 'Motors need specific voltage ranges to operate properly',
      tips: ['Check motor nameplate for voltage rating', 'Too low voltage = weak performance', 'Too high voltage = motor damage'],
      calculation: 'Always match supply voltage to motor rating ±10%'
    },
    {
      aspect: 'Current Draw',
      description: 'Motors draw significant current, especially when starting',
      tips: ['Stall current can be 5-10x running current', 'Use appropriate wire gauge', 'Consider fuse protection'],
      calculation: 'Power = Voltage × Current (P = V × I)'
    },
    {
      aspect: 'Battery Selection',
      description: 'Choose batteries that can supply adequate current',
      tips: ['AA batteries: ~1-2A max', '9V batteries: ~500mA max', 'Rechargeable packs: higher current capability'],
      calculation: 'Battery life = Capacity (mAh) ÷ Current draw (mA)'
    }
  ];

  const safetyGuidelines = [
    {
      category: 'Electrical Safety',
      rules: [
        'Always disconnect power before making connections',
        'Check polarity - motors can be damaged by reverse voltage',
        'Use appropriate fuses or circuit breakers',
        'Ensure all connections are secure'
      ]
    },
    {
      category: 'Mechanical Safety',
      rules: [
        'Secure motors to prevent movement during operation',
        'Keep fingers away from rotating parts',
        'Use guards or shields for exposed rotating elements',
        'Be aware of pinch points and sharp edges'
      ]
    },
    {
      category: 'Component Protection',
      rules: [
        'Always use protection diodes with inductive loads',
        'Never exceed motor voltage or current ratings',
        'Allow adequate cooling for high-power applications',
        'Use proper gauge wire for current requirements'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">Electronics 101</span>
            <span className="text-sm text-gray-600">Lesson 7 of 10</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            DC Motor Control
          </h1>
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
            <span className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-1" />
              45 min read
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Beginner</span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Learn to connect and control DC motors safely. Master power requirements, direction control,
            speed regulation, and protection circuits. Build confidence with hands-on motor control projects.
          </p>
        </header>

        {/* Learning Objectives */}
        <section className="mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              🎯 What You'll Learn
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
              <ul className="space-y-2">
                <li>• DC motor types, specifications, and selection</li>
                <li>• Power requirements and battery selection</li>
                <li>• Basic motor control circuits and switching</li>
                <li>• Protection circuits and back-EMF prevention</li>
              </ul>
              <ul className="space-y-2">
                <li>• H-bridge direction control principles</li>
                <li>• Speed control techniques and PWM basics</li>
                <li>• Safety considerations and troubleshooting</li>
                <li>• Building confidence with motor projects</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Motor Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Understanding DC Motor Types</h2>

          <div className="space-y-6">
            {motorTypes.map((motor, index) => (
              <div key={motor.type} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{motor.type}</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Specifications:</h4>
                    <ul className="text-gray-700 space-y-1 mb-4">
                      <li><strong>Voltage:</strong> {motor.voltage}</li>
                      <li><strong>Current:</strong> {motor.current}</li>
                      <li><strong>Torque:</strong> {motor.torque}</li>
                      <li><strong>Speed:</strong> {motor.speed}</li>
                    </ul>

                    <h4 className="font-bold text-gray-900 mb-2">Common Uses:</h4>
                    <ul className="text-gray-700 space-y-1">
                      {motor.uses.map((use, i) => (
                        <li key={i}>• {use}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <h4 className="font-bold text-green-900 mb-2">💡 Beginner Tip</h4>
                    <p className="text-green-800 text-sm">{motor.beginnerTip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Power Considerations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <Battery className="inline h-6 w-6 mr-2" />
            Power Requirements & Battery Selection
          </h2>

          <div className="space-y-6">
            {powerConsiderations.map((consideration, index) => (
              <div key={consideration.aspect} className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-yellow-900 mb-3">{consideration.aspect}</h3>
                <p className="text-yellow-800 mb-4">{consideration.description}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-yellow-900 mb-2">Key Points:</h4>
                    <ul className="text-yellow-800 space-y-1">
                      {consideration.tips.map((tip, i) => (
                        <li key={i}>• {tip}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded p-4">
                    <h4 className="font-bold text-blue-900 mb-2">📐 Calculation</h4>
                    <p className="text-blue-800 text-sm font-mono">{consideration.calculation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Basic Circuits */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Motor Control Circuits to Build</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {basicCircuits.map((circuit, index) => (
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

                <div className="bg-orange-50 border border-orange-200 rounded p-3 mb-4">
                  <h4 className="font-bold text-orange-900 mb-1 text-sm">⚠️ Safety Note</h4>
                  <p className="text-orange-800 text-xs">{circuit.safetyNote}</p>
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

        {/* Safety Guidelines */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <Shield className="inline h-6 w-6 mr-2" />
            Safety Guidelines
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {safetyGuidelines.map((guideline, index) => (
              <div key={guideline.category} className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-red-900 mb-4">{guideline.category}</h3>
                <ul className="text-red-800 space-y-2">
                  {guideline.rules.map((rule, i) => (
                    <li key={i} className="text-sm">• {rule}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* H-Bridge Concept */}
        <section className="mb-12">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              <RotateCw className="inline h-6 w-6 mr-2" />
              Understanding H-Bridge Direction Control
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-purple-900 mb-4">What is an H-Bridge?</h3>
                <p className="text-purple-800 mb-4">
                  An H-bridge is a circuit that allows you to control both the direction and speed of a DC motor.
                  It's called an "H-bridge" because the circuit diagram looks like the letter "H".
                </p>

                <h4 className="font-bold text-purple-900 mb-2">How it works:</h4>
                <ul className="text-purple-800 space-y-1 text-sm">
                  <li>• Four switches control current flow direction</li>
                  <li>• Closing switches 1&4: motor spins clockwise</li>
                  <li>• Closing switches 2&3: motor spins counter-clockwise</li>
                  <li>• Never close opposite switches simultaneously!</li>
                </ul>
              </div>

              <div className="bg-white border border-purple-200 rounded p-6">
                <h4 className="font-bold text-purple-900 mb-4">H-Bridge Switch States</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <span className="font-medium">Switches 1&4 ON:</span>
                    <span className="text-green-700">Clockwise ↻</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                    <span className="font-medium">Switches 2&3 ON:</span>
                    <span className="text-blue-700">Counter-clockwise ↺</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="font-medium">All switches OFF:</span>
                    <span className="text-gray-700">Motor stops</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                    <span className="font-medium">Opposite switches ON:</span>
                    <span className="text-red-700">⚠️ SHORT CIRCUIT!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Circuit Simulator */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Interactive Motor Control Simulator</h2>
              <p className="text-gray-600 mb-6">
                Practice building motor control circuits safely before working with real motors and power supplies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">4</div>
                  <div className="text-sm text-gray-600">Circuit Types</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">H-Bridge</div>
                  <div className="text-sm text-gray-600">Direction Control</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">Safe</div>
                  <div className="text-sm text-gray-600">Virtual Testing</div>
                </div>
              </div>
              <Link
                href="/circuit-simulator?tutorial=dc-motor-control"
                className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <RotateCw className="h-5 w-5 mr-2" />
                Open Motor Simulator
              </Link>
            </div>
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting Motor Circuits</h2>

          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3">❌ Motor doesn't run</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Check:</h4>
                  <ul className="text-red-800 space-y-1 text-sm">
                    <li>• Battery voltage and connections</li>
                    <li>• Motor connections and polarity</li>
                    <li>• Switch operation</li>
                    <li>• Fuse or circuit breaker</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h4 className="font-bold text-green-900 mb-2">🛡️ Prevention</h4>
                  <p className="text-green-800 text-sm">Test with multimeter before connecting motor</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3">❌ Motor runs slowly or weakly</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Possible causes:</h4>
                  <ul className="text-red-800 space-y-1 text-sm">
                    <li>• Low battery voltage</li>
                    <li>• High resistance connections</li>
                    <li>• Motor overload or binding</li>
                    <li>• Insufficient current capacity</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h4 className="font-bold text-green-900 mb-2">🛡️ Prevention</h4>
                  <p className="text-green-800 text-sm">Use proper wire gauge and fresh batteries</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3">❌ Circuit components getting hot</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Immediate actions:</h4>
                  <ul className="text-red-800 space-y-1 text-sm">
                    <li>• Disconnect power immediately</li>
                    <li>• Check for short circuits</li>
                    <li>• Verify current ratings</li>
                    <li>• Inspect all connections</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h4 className="font-bold text-green-900 mb-2">🛡️ Prevention</h4>
                  <p className="text-green-800 text-sm">Use components rated for motor current + 50% safety margin</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Exercises */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Exercises</h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">🏋️ Build These Motor Circuits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
              <div>
                <h4 className="font-bold mb-2">Beginner Projects:</h4>
                <ol className="space-y-1 text-sm">
                  <li>1. Simple motor on/off control</li>
                  <li>2. Motor with protection diode</li>
                  <li>3. Two-speed motor control</li>
                  <li>4. Motor with LED indicator</li>
                </ol>
              </div>
              <div>
                <h4 className="font-bold mb-2">Advanced Projects:</h4>
                <ol className="space-y-1 text-sm">
                  <li>1. Variable speed control</li>
                  <li>2. Manual H-bridge direction control</li>
                  <li>3. Motor with current sensing</li>
                  <li>4. Automatic motor reversal timer</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Knowledge Check */}
        <KnowledgeCheck
          title="Test Your Understanding"
          questions={[
            {
              id: "1",
              question: "What is the main difference between a gear motor and a regular DC motor?",
              options: [
                "Gear motors use AC power instead of DC",
                "Gear motors have built-in gearboxes that trade speed for torque",
                "Gear motors are always more expensive",
                "Gear motors only work in one direction"
              ],
              correctAnswer: 1,
              explanation: "Gear motors have built-in gearboxes that reduce speed while increasing torque, making them ideal for applications that need more force but less speed."
            },
            {
              id: "2",
              question: "Why do motors need protection diodes?",
              options: [
                "To make them spin faster",
                "To change their direction",
                "To protect against back-EMF voltage spikes when the motor stops",
                "To reduce power consumption"
              ],
              correctAnswer: 2,
              explanation: "When a motor stops, it generates back-EMF (electromotive force) that can create voltage spikes. Protection diodes prevent these spikes from damaging other circuit components."
            },
            {
              id: "3",
              question: "In an H-bridge circuit, what happens if you close opposite switches simultaneously?",
              options: [
                "The motor spins faster",
                "The motor changes direction",
                "You create a short circuit that can damage components",
                "Nothing happens"
              ],
              correctAnswer: 2,
              explanation: "Closing opposite switches in an H-bridge creates a direct short circuit from positive to negative power, which can damage the switches, power supply, and other components."
            },
            {
              id: "4",
              question: "What should you check first if a motor runs slowly or weakly?",
              options: [
                "Replace the motor immediately",
                "Check battery voltage and connections",
                "Add more motors in parallel",
                "Increase the supply voltage beyond motor rating"
              ],
              correctAnswer: 1,
              explanation: "Low battery voltage or poor connections are the most common causes of weak motor performance. Always check power supply and connections before replacing components."
            },
            {
              id: "5",
              question: "Which type of motor is best for beginners learning electronics?",
              options: [
                "High-power industrial motors",
                "Small DC motors (3V-6V, low current)",
                "AC motors",
                "Stepper motors"
              ],
              correctAnswer: 1,
              explanation: "Small DC motors with low voltage and current requirements are safest for beginners, easier to control, and less likely to cause damage if mistakes are made."
            }
          ]}
        />

        {/* What's Next */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h2>

          <p className="text-gray-700 mb-6">
            Congratulations! You've learned the fundamentals of DC motor control, from basic on/off circuits
            to advanced direction control with H-bridges. You understand power requirements, safety considerations,
            and troubleshooting techniques.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-green-900 mb-3">✅ What You Accomplished</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800">
              <ul className="space-y-1 text-sm">
                <li>• Learned about different DC motor types and specifications</li>
                <li>• Mastered power requirements and battery selection</li>
                <li>• Built basic motor control circuits with protection</li>
                <li>• Understanding H-bridge direction control principles</li>
              </ul>
              <ul className="space-y-1 text-sm">
                <li>• Practiced safety guidelines and protection circuits</li>
                <li>• Developed motor troubleshooting skills</li>
                <li>• Learned about speed control techniques</li>
                <li>• Built confidence with motor control projects</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h4 className="font-bold text-purple-900 mb-4">🔊 Ready to Make Some Noise?</h4>
            <p className="text-purple-800 mb-4">
              In our next lesson, we'll explore buzzers and sound generation. You'll learn about different
              types of buzzers, create audio circuits, and even generate musical tones!
            </p>
            <div className="text-purple-800 text-sm">
              <strong>Coming up:</strong> Active vs passive buzzers, tone generation, volume control,
              and creating simple musical circuits.
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <Link
            href="/electronics-101/led-basics"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4 sm:mb-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous: LED Basics
          </Link>

          <Link
            href="/electronics-101/buzzer-sound"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Next: Buzzer and Sound
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </article>
    </div>
  );
};

export default DCMotorControlPage;
