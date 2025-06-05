import Link from 'next/link';
import { ArrowRight, ArrowLeft, Lightbulb, Zap, AlertTriangle, CheckCircle, Download, Code, Cpu, Wifi, Play } from 'lucide-react';

const ArduinoIntroductionPage = () => {
  const arduinoBasics = [
    {
      concept: 'What is Arduino?',
      description: 'A microcontroller board with built-in USB, power management, and I/O pins',
      analogy: 'Think of it as a tiny computer that never sleeps and can control real-world devices',
      keyPoints: [
        'Microcontroller: ATmega328P (brain of the system)',
        'Digital pins: 14 pins for on/off signals (0V or 5V)',
        'Analog pins: 6 pins for reading variable voltages',
        'Power: Can be powered by USB or external supply',
        'Programming: Uses simplified C++ language'
      ]
    },
    {
      concept: 'Arduino IDE Setup',
      description: 'Free software for writing and uploading code to Arduino',
      analogy: 'Like Microsoft Word, but for writing instructions for your Arduino',
      keyPoints: [
        'Download from arduino.cc (Windows, Mac, Linux)',
        'Install USB drivers for your Arduino board',
        'Select correct board type (Arduino Uno)',
        'Choose correct COM port',
        'Test with built-in "Blink" example'
      ]
    },
    {
      concept: 'Basic Programming Structure',
      description: 'Every Arduino program has two main functions',
      analogy: 'Like a recipe: setup() prepares ingredients, loop() repeats cooking steps',
      keyPoints: [
        'setup(): Runs once when Arduino starts',
        'loop(): Runs continuously forever',
        'Variables: Store numbers and text',
        'Functions: Reusable blocks of code',
        'Comments: Notes to explain your code'
      ]
    }
  ];

  const digitalIO = [
    {
      function: 'digitalWrite()',
      purpose: 'Turn digital pins ON (HIGH) or OFF (LOW)',
      syntax: 'digitalWrite(pin, value)',
      example: 'digitalWrite(13, HIGH); // Turn on LED',
      uses: ['Control LEDs', 'Drive relays', 'Send signals', 'Control motors']
    },
    {
      function: 'digitalRead()',
      purpose: 'Read the state of digital pins (HIGH or LOW)',
      syntax: 'digitalRead(pin)',
      example: 'int buttonState = digitalRead(2);',
      uses: ['Read buttons', 'Read switches', 'Read sensors', 'Detect signals']
    },
    {
      function: 'pinMode()',
      purpose: 'Set pin as INPUT or OUTPUT',
      syntax: 'pinMode(pin, mode)',
      example: 'pinMode(13, OUTPUT); // LED pin',
      uses: ['Configure LED pins', 'Set button pins', 'Setup sensor pins', 'Initialize I/O']
    }
  ];

  const analogIO = [
    {
      function: 'analogRead()',
      purpose: 'Read analog voltage (0-5V) as number (0-1023)',
      syntax: 'analogRead(pin)',
      example: 'int sensorValue = analogRead(A0);',
      uses: ['Read sensors', 'Read potentiometers', 'Measure voltage', 'Read analog signals'],
      note: 'Only works on A0-A5 pins'
    },
    {
      function: 'analogWrite() - PWM',
      purpose: 'Output variable voltage using Pulse Width Modulation',
      syntax: 'analogWrite(pin, value)',
      example: 'analogWrite(9, 128); // 50% brightness',
      uses: ['Control LED brightness', 'Control motor speed', 'Generate audio tones', 'Servo control'],
      note: 'Only works on pins with ~ symbol (3, 5, 6, 9, 10, 11)'
    }
  ];

  const practicalProjects = [
    {
      name: 'Blinking LED',
      difficulty: 'Beginner',
      components: ['Arduino Uno', 'LED', '220Ω Resistor', 'Breadboard', 'Jumper wires'],
      description: 'Make an LED blink on and off automatically',
      learningGoals: ['Basic programming', 'digitalWrite()', 'delay() function', 'Circuit building'],
      code: `void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
  delay(1000);
}`,
      buildTime: '15 minutes'
    },
    {
      name: 'Button-Controlled LED',
      difficulty: 'Beginner',
      components: ['Arduino Uno', 'LED', 'Push button', '220Ω Resistor', '10kΩ Resistor', 'Breadboard'],
      description: 'Turn LED on/off with button press',
      learningGoals: ['Digital input', 'digitalRead()', 'if statements', 'Pull-up resistors'],
      code: `void setup() {
  pinMode(13, OUTPUT);
  pinMode(2, INPUT_PULLUP);
}

void loop() {
  if (digitalRead(2) == LOW) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
}`,
      buildTime: '20 minutes'
    },
    {
      name: 'Light Sensor Night Light',
      difficulty: 'Intermediate',
      components: ['Arduino Uno', 'LDR', 'LED', '220Ω Resistor', '10kΩ Resistor', 'Breadboard'],
      description: 'LED automatically turns on when it gets dark',
      learningGoals: ['Analog input', 'analogRead()', 'Sensor interfacing', 'Threshold detection'],
      code: `void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int lightLevel = analogRead(A0);
  Serial.println(lightLevel);
  
  if (lightLevel < 300) {
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
  delay(100);
}`,
      buildTime: '25 minutes'
    },
    {
      name: 'PWM LED Dimmer',
      difficulty: 'Intermediate',
      components: ['Arduino Uno', 'LED', '220Ω Resistor', 'Potentiometer', 'Breadboard'],
      description: 'Control LED brightness with potentiometer',
      learningGoals: ['PWM output', 'analogWrite()', 'map() function', 'Variable control'],
      code: `void setup() {
  // No setup needed for analog pins
}

void loop() {
  int potValue = analogRead(A0);
  int brightness = map(potValue, 0, 1023, 0, 255);
  analogWrite(9, brightness);
  delay(10);
}`,
      buildTime: '20 minutes'
    }
  ];

  const programmingConcepts = [
    {
      concept: 'Variables',
      description: 'Store values that can change',
      examples: ['int ledPin = 13;', 'float temperature = 25.5;', 'bool buttonPressed = false;'],
      uses: 'Store sensor readings, pin numbers, states'
    },
    {
      concept: 'If Statements',
      description: 'Make decisions based on conditions',
      examples: ['if (temperature > 30) { fan_on(); }', 'if (buttonPressed) { led_on(); }'],
      uses: 'Control flow, respond to sensors, make decisions'
    },
    {
      concept: 'Loops',
      description: 'Repeat actions multiple times',
      examples: ['for (int i = 0; i < 10; i++) { blink(); }', 'while (sensor < 100) { wait(); }'],
      uses: 'Repeat patterns, scan inputs, create delays'
    },
    {
      concept: 'Functions',
      description: 'Reusable blocks of code',
      examples: ['void blinkLED() { ... }', 'int readSensor() { return analogRead(A0); }'],
      uses: 'Organize code, avoid repetition, create libraries'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">Electronics 101</span>
            <span className="text-sm text-gray-600">Lesson 10 of 10</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Arduino Introduction
          </h1>
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
            <span className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-1" />
              60 min read
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Intermediate</span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Master Arduino programming and bring all your electronics knowledge together. Learn to control
            LEDs, read sensors, and build intelligent projects with this powerful microcontroller platform.
          </p>
        </header>

        {/* Learning Objectives */}
        <section className="mb-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">🎯 What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
              <ul className="space-y-2">
                <li>• Arduino setup and programming environment</li>
                <li>• Digital I/O for controlling LEDs and reading buttons</li>
                <li>• Analog I/O for sensors and PWM control</li>
              </ul>
              <ul className="space-y-2">
                <li>• Basic programming concepts and syntax</li>
                <li>• Building complete Arduino projects</li>
                <li>• Recreating previous circuits with intelligent control</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Arduino Basics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <Cpu className="inline h-6 w-6 mr-2" />
            Arduino Fundamentals
          </h2>

          <div className="space-y-8">
            {arduinoBasics.map((basic, index) => (
              <div key={basic.concept} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{basic.concept}</h3>
                </div>

                <p className="text-gray-700 mb-4">{basic.description}</p>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <h4 className="font-bold text-blue-900 mb-2">💡 Think of it like...</h4>
                  <p className="text-blue-800 text-sm">{basic.analogy}</p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Key Points:</h4>
                  <ul className="text-gray-700 space-y-1">
                    {basic.keyPoints.map((point, i) => (
                      <li key={i}>• {point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Digital I/O */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Digital Input/Output</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {digitalIO.map((func, index) => (
              <div key={func.function} className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-green-900 mb-3">{func.function}</h3>
                <p className="text-green-800 text-sm mb-4">{func.purpose}</p>

                <div className="mb-4">
                  <h4 className="font-bold text-green-900 mb-2 text-sm">Syntax:</h4>
                  <code className="bg-white p-2 rounded text-xs font-mono block">{func.syntax}</code>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-green-900 mb-2 text-sm">Example:</h4>
                  <code className="bg-white p-2 rounded text-xs font-mono block">{func.example}</code>
                </div>

                <div>
                  <h4 className="font-bold text-green-900 mb-2 text-sm">Uses:</h4>
                  <ul className="text-green-800 space-y-1 text-xs">
                    {func.uses.map((use, i) => (
                      <li key={i}>• {use}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Analog I/O */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Analog Input/Output & PWM</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {analogIO.map((func, index) => (
              <div key={func.function} className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-orange-900 mb-3">{func.function}</h3>
                <p className="text-orange-800 text-sm mb-4">{func.purpose}</p>

                <div className="mb-4">
                  <h4 className="font-bold text-orange-900 mb-2 text-sm">Syntax:</h4>
                  <code className="bg-white p-2 rounded text-xs font-mono block">{func.syntax}</code>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-orange-900 mb-2 text-sm">Example:</h4>
                  <code className="bg-white p-2 rounded text-xs font-mono block">{func.example}</code>
                </div>

                <div className="mb-4">
                  <h4 className="font-bold text-orange-900 mb-2 text-sm">Uses:</h4>
                  <ul className="text-orange-800 space-y-1 text-xs">
                    {func.uses.map((use, i) => (
                      <li key={i}>• {use}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <h4 className="font-bold text-yellow-900 mb-1 text-xs">📌 Important Note</h4>
                  <p className="text-yellow-800 text-xs">{func.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Programming Concepts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            <Code className="inline h-6 w-6 mr-2" />
            Essential Programming Concepts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {programmingConcepts.map((concept, index) => (
              <div key={concept.concept} className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-purple-900 mb-3">{concept.concept}</h3>
                <p className="text-purple-800 text-sm mb-4">{concept.description}</p>

                <div className="mb-4">
                  <h4 className="font-bold text-purple-900 mb-2 text-sm">Examples:</h4>
                  <div className="space-y-2">
                    {concept.examples.map((example, i) => (
                      <code key={i} className="bg-white p-2 rounded text-xs font-mono block">{example}</code>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded p-3">
                  <h4 className="font-bold text-blue-900 mb-1 text-xs">🎯 When to use:</h4>
                  <p className="text-blue-800 text-xs">{concept.uses}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Projects */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hands-On Arduino Projects</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practicalProjects.map((project, index) => (
              <div key={project.name} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${project.difficulty === 'Beginner'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
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

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Sample Code:</h4>
                  <pre className="bg-gray-100 p-3 rounded text-xs font-mono overflow-x-auto">
                    <code>{project.code}</code>
                  </pre>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center">
                    <Play className="h-4 w-4 mr-1" />
                    Build time: {project.buildTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Arduino IDE Setup Guide */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Arduino IDE Setup Guide</h2>
              <p className="text-gray-600 mb-6">
                Get started with Arduino programming by downloading and setting up the development environment.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">1</div>
                  <div className="text-sm text-gray-600">Download IDE</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">2</div>
                  <div className="text-sm text-gray-600">Install Drivers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">3</div>
                  <div className="text-sm text-gray-600">Select Board</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">4</div>
                  <div className="text-sm text-gray-600">Upload Code</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://www.arduino.cc/en/software"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Arduino IDE
                </a>
                <Link
                  href="/arduino-setup-guide"
                  className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-blue-200"
                >
                  <Code className="h-5 w-5 mr-2" />
                  Setup Guide
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Troubleshooting Arduino */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Arduino Troubleshooting</h2>

          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3">❌ Code won't upload</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Check these first:</h4>
                  <ul className="text-red-800 space-y-1 text-sm">
                    <li>• Correct board selected (Tools → Board)</li>
                    <li>• Correct port selected (Tools → Port)</li>
                    <li>• USB cable connected properly</li>
                    <li>• Arduino IDE has permission to access port</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h4 className="font-bold text-green-900 mb-2">🛡️ Prevention</h4>
                  <p className="text-green-800 text-sm">Always verify board and port settings before uploading</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3">❌ Circuit not working as expected</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Debug systematically:</h4>
                  <ul className="text-red-800 space-y-1 text-sm">
                    <li>• Use Serial.println() to debug values</li>
                    <li>• Check all physical connections</li>
                    <li>• Verify component orientations (LED polarity)</li>
                    <li>• Test components individually</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h4 className="font-bold text-green-900 mb-2">🛡️ Prevention</h4>
                  <p className="text-green-800 text-sm">Build circuits step by step, testing each addition</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3">❌ Compilation errors</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Common syntax issues:</h4>
                  <ul className="text-red-800 space-y-1 text-sm">
                    <li>• Missing semicolons (;) at end of statements</li>
                    <li>• Mismatched parentheses or braces</li>
                    <li>• Undefined variables or functions</li>
                    <li>• Case sensitivity (digitalWrite vs digitalwrite)</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h4 className="font-bold text-green-900 mb-2">🛡️ Prevention</h4>
                  <p className="text-green-800 text-sm">Use IDE auto-formatting and start with working examples</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Exercises */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice Exercises</h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">🏋️ Build These Arduino Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
              <div>
                <h4 className="font-bold mb-2">Beginner Projects:</h4>
                <ol className="space-y-1 text-sm">
                  <li>1. Blinking LED with variable timing</li>
                  <li>2. Button-controlled LED with debouncing</li>
                  <li>3. Potentiometer-controlled LED brightness</li>
                  <li>4. Light sensor automatic night light</li>
                </ol>
              </div>
              <div>
                <h4 className="font-bold mb-2">Advanced Projects:</h4>
                <ol className="space-y-1 text-sm">
                  <li>1. Temperature monitoring with serial output</li>
                  <li>2. Multi-sensor security system</li>
                  <li>3. PWM motor speed control</li>
                  <li>4. Arduino-controlled buzzer music player</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Course Completion */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎉 Congratulations!</h2>

          <p className="text-gray-700 mb-6">
            You've completed the entire Electronics 101 course! You've journeyed from basic electrical concepts
            to building intelligent Arduino-controlled circuits. You now have the foundation to tackle more
            advanced electronics projects and continue learning.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h4 className="font-bold text-green-900 mb-3">✅ Your Complete Journey</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800">
              <ul className="space-y-1 text-sm">
                <li>• Mastered basic electronics concepts</li>
                <li>• Built LED, motor, and buzzer circuits</li>
                <li>• Learned about sensors and logic gates</li>
                <li>• Integrated multiple components</li>
                <li>• Developed troubleshooting skills</li>
              </ul>
              <ul className="space-y-1 text-sm">
                <li>• Learned Arduino programming</li>
                <li>• Mastered digital and analog I/O</li>
                <li>• Built intelligent responsive circuits</li>
                <li>• Created complete projects from scratch</li>
                <li>• Ready for advanced electronics!</li>
              </ul>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <h4 className="font-bold text-purple-900 mb-4">🚀 What's Next?</h4>
            <p className="text-purple-800 mb-4">
              Continue your electronics journey with more advanced topics like PCB design, wireless communication,
              IoT projects, and embedded systems programming. The foundation you've built here will serve you well!
            </p>
            <div className="text-purple-800 text-sm">
              <strong>Recommended next steps:</strong> Explore Arduino libraries, learn about I2C/SPI communication,
              try wireless modules (WiFi, Bluetooth), and start designing your own PCBs.
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <Link
            href="/electronics-101/advanced-components"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4 sm:mb-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous: Advanced Components
          </Link>

          <Link
            href="/electronics-101"
            className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Course Complete!
          </Link>
        </div>
      </article>
    </div>
  );
};

export default ArduinoIntroductionPage;
