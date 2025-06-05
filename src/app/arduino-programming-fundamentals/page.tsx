'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Play,
  Square,
  RotateCcw,
  Code,
  Lightbulb,
  Cpu,
  Zap,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Trophy,
  Target,
  BookOpen,
  Brain,
  Puzzle,
  Star,
  AlertTriangle,
  Coffee,
  Utensils,
  Package,
  Repeat,
  GitBranch,
  Settings
} from 'lucide-react';

const ArduinoProgrammingFundamentalsPage = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [code, setCode] = useState(`// Your First Arduino Program
// Let's make an LED blink!

void setup() {
  // This runs once when Arduino starts
  pinMode(13, OUTPUT);  // Set pin 13 as output
  Serial.begin(9600);   // Start communication
  Serial.println("Hello, Arduino World!");
}

void loop() {
  // This repeats forever
  digitalWrite(13, HIGH);  // Turn LED on
  delay(1000);            // Wait 1 second
  digitalWrite(13, LOW);   // Turn LED off
  delay(1000);            // Wait 1 second
}`);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [ledState, setLedState] = useState(false);

  const programmingAnalogies = [
    {
      concept: 'What is Programming?',
      analogy: '🍳 Cooking Recipe',
      description: 'Programming is like writing a detailed recipe for a robot chef',
      explanation: 'Just like a recipe tells you step-by-step how to make a cake, programming tells the Arduino exactly what to do, when to do it, and how to do it.',
      examples: [
        'Recipe: "Preheat oven to 350°F" → Code: "Set LED brightness to maximum"',
        'Recipe: "Mix ingredients for 2 minutes" → Code: "Blink LED for 2 seconds"',
        'Recipe: "If batter is too thick, add milk" → Code: "If button pressed, turn on LED"'
      ],
      interactive: true
    },
    {
      concept: 'Variables',
      analogy: '📦 Storage Containers',
      description: 'Variables are like labeled containers that store information',
      explanation: 'Imagine you have different containers in your kitchen - one for sugar, one for flour, one for salt. Variables work the same way - they store different types of information with labels.',
      examples: [
        'Container labeled "Sugar" holds sweet stuff → Variable "ledPin" holds pin number 13',
        'Container labeled "Timer" holds cooking time → Variable "delayTime" holds 1000 milliseconds',
        'Container labeled "Temperature" holds heat level → Variable "sensorValue" holds sensor reading'
      ],
      interactive: true
    },
    {
      concept: 'Functions',
      analogy: '🔧 Magic Tools',
      description: 'Functions are like specialized tools that do specific jobs',
      explanation: 'Think of functions as magic tools in your toolbox. Each tool has a specific job - a hammer for nails, a screwdriver for screws. Functions work the same way!',
      examples: [
        'Hammer tool → digitalWrite() function turns things on/off',
        'Measuring tape → analogRead() function measures sensor values',
        'Timer → delay() function waits for a specific time'
      ],
      interactive: true
    },
    {
      concept: 'Loops',
      analogy: '🔄 Washing Machine Cycle',
      description: 'Loops repeat actions automatically, like a washing machine cycle',
      explanation: 'A washing machine repeats the same cycle: wash, rinse, spin, repeat. Loops in programming work exactly the same way - they repeat instructions over and over.',
      examples: [
        'Washing machine: wash → rinse → spin → repeat',
        'Arduino loop: turn LED on → wait → turn LED off → wait → repeat',
        'Daily routine: wake up → eat → work → sleep → repeat'
      ],
      interactive: true
    },
    {
      concept: 'Conditions (If Statements)',
      analogy: '🚦 Traffic Light Logic',
      description: 'Conditions make decisions based on what\'s happening, like traffic lights',
      explanation: 'Traffic lights make decisions: IF cars are coming from the north, THEN turn the light green for them. Programming conditions work the same way!',
      examples: [
        'IF it\'s raining, THEN take an umbrella → IF button pressed, THEN turn on LED',
        'IF you\'re hungry, THEN eat food → IF sensor detects motion, THEN sound alarm',
        'IF it\'s dark, THEN turn on lights → IF temperature is high, THEN turn on fan'
      ],
      interactive: true
    }
  ];

  const interactiveChallenges = [
    {
      id: 1,
      title: 'Recipe Challenge',
      description: 'Write a "recipe" for making toast in programming style',
      difficulty: 'Easy',
      points: 10,
      solution: 'Step 1: Get bread, Step 2: Put in toaster, Step 3: Set timer, Step 4: Wait, Step 5: Remove toast'
    },
    {
      id: 2,
      title: 'Variable Container',
      description: 'Name 3 variables you\'d need for a smart alarm clock',
      difficulty: 'Easy',
      points: 15,
      solution: 'alarmTime, currentTime, isAlarmOn'
    },
    {
      id: 3,
      title: 'Function Factory',
      description: 'Design a function that checks if it\'s time to water plants',
      difficulty: 'Medium',
      points: 20,
      solution: 'checkWateringTime() - checks soil moisture and last watering time'
    },
    {
      id: 4,
      title: 'Loop Logic',
      description: 'Create a loop for a robot vacuum cleaner',
      difficulty: 'Medium',
      points: 25,
      solution: 'while(battery > 20%) { clean room, avoid obstacles, return to charge }'
    },
    {
      id: 5,
      title: 'Condition Creator',
      description: 'Write conditions for a smart home security system',
      difficulty: 'Hard',
      points: 30,
      solution: 'IF motion detected AND time is night AND owner not home THEN sound alarm'
    }
  ];

  const arduinoBasics = [
    {
      title: 'Arduino Hardware',
      description: 'Meet your new electronic brain',
      content: 'The Arduino is like a tiny computer that never sleeps. It has pins (like arms) to connect to LEDs, sensors, and motors. Think of it as the brain that controls everything in your project.',
      image: '/images/arduino-uno-labeled.jpg',
      keyPoints: [
        'Digital pins (0-13): For on/off signals like switches',
        'Analog pins (A0-A5): For reading sensors like temperature',
        'Power pins: To give energy to your components',
        'USB port: To connect to your computer and upload code'
      ]
    },
    {
      title: 'Programming Environment',
      description: 'Where the magic happens',
      content: 'The Arduino IDE is like Microsoft Word, but for writing instructions for your Arduino. It has a text area where you write code, and buttons to send that code to your Arduino.',
      image: '/images/arduino-ide-interface.jpg',
      keyPoints: [
        'Code editor: Where you write your instructions',
        'Verify button: Checks your code for mistakes',
        'Upload button: Sends code to your Arduino',
        'Serial monitor: Shows messages from your Arduino'
      ]
    }
  ];

  const startSimulation = () => {
    setIsRunning(true);
    setOutput([]);
    simulateArduino();
  };

  const stopSimulation = () => {
    setIsRunning(false);
    setLedState(false);
  };

  const simulateArduino = () => {
    const lines = code.split('\n');
    let lineIndex = 0;
    let loopStartIndex = -1;
    let setupComplete = false;

    lines.forEach((line, index) => {
      if (line.includes('void loop()')) {
        loopStartIndex = index;
      }
    });

    const simulate = () => {
      if (!isRunning) return;

      const line = lines[lineIndex]?.trim();
      if (!line || line.startsWith('//')) {
        lineIndex++;
        if (lineIndex >= lines.length) {
          if (loopStartIndex >= 0 && setupComplete) {
            lineIndex = loopStartIndex + 1;
          } else {
            setIsRunning(false);
            return;
          }
        }
        setTimeout(simulate, 100);
        return;
      }

      if (line.includes('Serial.println')) {
        const message = line.match(/"([^"]*)"/)?.[1] || 'Output';
        setOutput(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
      } else if (line.includes('digitalWrite') && line.includes('13')) {
        if (line.includes('HIGH')) {
          setLedState(true);
          setOutput(prev => [...prev, `${new Date().toLocaleTimeString()}: LED turned ON`]);
        } else if (line.includes('LOW')) {
          setLedState(false);
          setOutput(prev => [...prev, `${new Date().toLocaleTimeString()}: LED turned OFF`]);
        }
      } else if (line.includes('delay(')) {
        const delayMatch = line.match(/delay\((\d+)\)/);
        if (delayMatch) {
          const delayTime = parseInt(delayMatch[1]);
          setTimeout(simulate, Math.min(delayTime / 2, 1000));
          lineIndex++;
          return;
        }
      } else if (line.includes('void setup()')) {
        setOutput(prev => [...prev, `${new Date().toLocaleTimeString()}: Arduino starting up...`]);
      } else if (line.includes('void loop()')) {
        if (!setupComplete) {
          setupComplete = true;
          setOutput(prev => [...prev, `${new Date().toLocaleTimeString()}: Setup complete, starting main program`]);
        }
      }

      lineIndex++;
      if (lineIndex >= lines.length) {
        if (loopStartIndex >= 0 && setupComplete) {
          lineIndex = loopStartIndex + 1;
        } else {
          setIsRunning(false);
          return;
        }
      }

      setTimeout(simulate, 300);
    };

    simulate();
  };

  const completeChallenge = (challengeId: number) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);
    }
  };

  const totalPoints = completedChallenges.reduce((total, challengeId) => {
    const challenge = interactiveChallenges.find(c => c.id === challengeId);
    return total + (challenge?.points || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">Arduino Programming Fundamentals</span>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Points: {totalPoints}</span>
              <span className="text-sm text-gray-600">Challenges: {completedChallenges.length}/{interactiveChallenges.length}</span>
            </div>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(completedChallenges.length / interactiveChallenges.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Brain className="h-10 w-10 text-purple-600" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Arduino Programming Made Fun! 🚀
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Learn programming through fun analogies, interactive challenges, and hands-on Arduino projects.
            No boring theory - just engaging, practical learning!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentSection(1)}
              className="bg-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Start Your Journey
            </button>
            <Link
              href="/arduino-playground"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-purple-200"
            >
              Try Code Playground
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Objectives */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
              <Target className="h-6 w-6 mr-2" />
              🎯 What You'll Master Today
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-green-600" />
                  <span>Understand what programming really is (using fun analogies!)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-green-600" />
                  <span>Master variables, functions, loops, and conditions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-green-600" />
                  <span>Write your first Arduino program step-by-step</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-green-600" />
                  <span>Complete interactive challenges and earn points</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-green-600" />
                  <span>Test your code with our Arduino simulator</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 mr-2 mt-0.5 text-green-600" />
                  <span>Build confidence to tackle real Arduino projects</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Programming Analogies Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Programming Concepts Made Simple
            </h2>
            <p className="text-lg text-gray-600">
              Let's understand programming through everyday analogies that make perfect sense!
            </p>
          </div>

          <div className="space-y-8">
            {programmingAnalogies.map((analogy, index) => (
              <div key={analogy.concept} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{analogy.concept}</h3>
                    <p className="text-lg text-purple-600 font-medium">{analogy.analogy}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 text-lg leading-relaxed">{analogy.explanation}</p>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-purple-500 p-6 mb-6">
                  <h4 className="font-bold text-purple-900 mb-3 flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2" />
                    Real-World Examples
                  </h4>
                  <div className="space-y-2">
                    {analogy.examples.map((example, i) => (
                      <p key={i} className="text-purple-800 text-sm">{example}</p>
                    ))}
                  </div>
                </div>

                {analogy.interactive && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center text-yellow-800">
                      <Puzzle className="h-5 w-5 mr-2" />
                      <span className="font-medium">Try the interactive challenge below to test your understanding!</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Challenges */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Trophy className="h-8 w-8 mr-3 text-yellow-500" />
              Interactive Challenges
            </h2>
            <p className="text-lg text-gray-600">
              Test your understanding and earn points! Complete challenges to unlock achievements.
            </p>
            <div className="mt-4 flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{totalPoints}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{completedChallenges.length}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{interactiveChallenges.length - completedChallenges.length}</div>
                <div className="text-sm text-gray-600">Remaining</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interactiveChallenges.map((challenge) => (
              <div key={challenge.id} className={`border rounded-lg p-6 transition-all ${completedChallenges.includes(challenge.id)
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-gray-200 hover:border-purple-300'
                }`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{challenge.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                      {challenge.difficulty}
                    </span>
                    <span className="text-purple-600 font-bold">{challenge.points} pts</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{challenge.description}</p>

                {completedChallenges.includes(challenge.id) ? (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span className="font-medium">Challenge Completed!</span>
                  </div>
                ) : (
                  <button
                    onClick={() => completeChallenge(challenge.id)}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Complete Challenge
                  </button>
                )}

                {completedChallenges.includes(challenge.id) && (
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-1">Sample Solution:</h4>
                    <p className="text-green-800 text-sm">{challenge.solution}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Arduino Hardware Guide */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Cpu className="h-8 w-8 mr-3 text-blue-500" />
              Meet Your Arduino
            </h2>
            <p className="text-lg text-gray-600">
              Let's get familiar with the Arduino hardware before we start programming!
            </p>
          </div>

          <div className="space-y-8">
            {arduinoBasics.map((basic, index) => (
              <div key={basic.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{basic.title}</h3>
                    <p className="text-lg text-gray-600 mb-4">{basic.description}</p>
                    <p className="text-gray-700 mb-6 leading-relaxed">{basic.content}</p>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-bold text-blue-900 mb-3">Key Components:</h4>
                      <ul className="space-y-2">
                        {basic.keyPoints.map((point, i) => (
                          <li key={i} className="flex items-start text-blue-800 text-sm">
                            <Zap className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="bg-gray-100 rounded-lg p-6 w-full max-w-sm">
                      <div className="bg-white rounded border-2 border-dashed border-gray-300 h-48 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <Cpu className="h-12 w-12 mx-auto mb-2" />
                          <p className="text-sm">Arduino Hardware Image</p>
                          <p className="text-xs">{basic.image}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Arduino Playground */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <Code className="h-8 w-8 mr-3 text-green-500" />
              Your First Arduino Program
            </h2>
            <p className="text-lg text-gray-600">
              Let's write and test your first Arduino program! Watch the LED blink in our simulator.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Code Editor */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Arduino Code Editor</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={startSimulation}
                    disabled={isRunning}
                    className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Run
                  </button>
                  <button
                    onClick={stopSimulation}
                    disabled={!isRunning}
                    className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Stop
                  </button>
                </div>
              </div>

              <div className="relative">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-96 p-4 font-mono text-sm border-none resize-none focus:outline-none"
                  style={{
                    backgroundColor: '#1e1e1e',
                    color: '#d4d4d4',
                    lineHeight: '1.5'
                  }}
                  placeholder="Write your Arduino code here..."
                />
                {isRunning && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                    Running...
                  </div>
                )}
              </div>
            </div>

            {/* Arduino Simulator */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Arduino Simulator</h3>
              </div>

              <div className="p-6">
                {/* Virtual Arduino Board */}
                <div className="bg-green-600 rounded-lg p-6 mb-6 relative">
                  <div className="text-white text-center mb-4">
                    <h4 className="font-bold">Arduino Uno</h4>
                  </div>

                  {/* LED Indicator */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-6 h-6 rounded-full border-2 border-white transition-all duration-300 ${ledState ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : 'bg-gray-400'
                      }`}>
                      {ledState && (
                        <div className="w-full h-full rounded-full bg-yellow-300 animate-pulse"></div>
                      )}
                    </div>
                    <p className="text-white text-xs mt-1 text-center">LED 13</p>
                  </div>

                  {/* Pin Labels */}
                  <div className="grid grid-cols-2 gap-4 text-white text-xs">
                    <div>
                      <p className="font-bold mb-2">Digital Pins</p>
                      <div className="space-y-1">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(pin => (
                          <div key={pin} className={`p-1 rounded ${pin === 13 && ledState ? 'bg-yellow-500' : 'bg-green-700'}`}>
                            Pin {pin}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold mb-2">Analog Pins</p>
                      <div className="space-y-1">
                        {['A0', 'A1', 'A2', 'A3', 'A4', 'A5'].map(pin => (
                          <div key={pin} className="p-1 rounded bg-green-700">
                            {pin}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Serial Monitor */}
                <div className="bg-gray-900 rounded-lg p-4 h-32 overflow-y-auto">
                  <div className="text-green-400 font-mono text-xs">
                    <div className="text-gray-400 mb-2">Serial Monitor:</div>
                    {output.length === 0 ? (
                      <div className="text-gray-500">Click "Run" to see output...</div>
                    ) : (
                      output.map((line, index) => (
                        <div key={index} className="mb-1">{line}</div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Code Explanation */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">🧠 Understanding Your First Program</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
              <div>
                <h4 className="font-bold mb-2">setup() function:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Runs only once when Arduino starts</li>
                  <li>• Sets up pin 13 as an output (for LED)</li>
                  <li>• Starts serial communication</li>
                  <li>• Like preparing ingredients before cooking</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-2">loop() function:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Runs continuously forever</li>
                  <li>• Turns LED on, waits, turns LED off, waits</li>
                  <li>• Repeats this cycle endlessly</li>
                  <li>• Like a washing machine cycle that never stops</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting Guide */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 mr-3 text-orange-500" />
              Common Mistakes & Solutions
            </h2>
            <p className="text-lg text-gray-600">
              Don't worry - everyone makes these mistakes when starting! Here's how to fix them.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                "My code won't upload!"
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Check these first:</h4>
                  <ul className="text-red-800 space-y-1 text-sm">
                    <li>• Is your Arduino connected via USB?</li>
                    <li>• Did you select the right board (Arduino Uno)?</li>
                    <li>• Did you select the right port?</li>
                    <li>• Are there any syntax errors in your code?</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h4 className="font-bold text-green-900 mb-2">💡 Pro Tip</h4>
                  <p className="text-green-800 text-sm">Always check the error message at the bottom of the Arduino IDE - it usually tells you exactly what's wrong!</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                "My LED isn't blinking!"
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Debug steps:</h4>
                  <ul className="text-red-800 space-y-1 text-sm">
                    <li>• Check if LED is connected to pin 13</li>
                    <li>• Make sure LED polarity is correct (long leg to +)</li>
                    <li>• Verify your code uploaded successfully</li>
                    <li>• Try the built-in LED first (no wiring needed)</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h4 className="font-bold text-green-900 mb-2">💡 Pro Tip</h4>
                  <p className="text-green-800 text-sm">Arduino Uno has a built-in LED on pin 13. Start with that before adding external components!</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                "I get compilation errors!"
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-red-900 mb-2">Common syntax issues:</h4>
                  <ul className="text-red-800 space-y-1 text-sm">
                    <li>• Missing semicolons (;) at end of lines</li>
                    <li>• Mismatched parentheses or braces</li>
                    <li>• Typos in function names (digitalWrite vs digitalwrite)</li>
                    <li>• Missing quotes around text</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded p-4">
                  <h4 className="font-bold text-green-900 mb-2">💡 Pro Tip</h4>
                  <p className="text-green-800 text-sm">Use the Arduino IDE's auto-format feature (Ctrl+T) to help spot formatting issues!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Exercises */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              <BookOpen className="h-8 w-8 mr-3 text-blue-500" />
              Practice Exercises
            </h2>
            <p className="text-lg text-gray-600">
              Ready to test your skills? Try these fun programming challenges!
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-6">🏋️ Programming Challenges</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-blue-900 mb-4">Beginner Challenges:</h4>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <h5 className="font-medium text-gray-900 mb-2">1. SOS Signal</h5>
                    <p className="text-gray-600 text-sm mb-2">Make your LED blink the SOS pattern: 3 short, 3 long, 3 short blinks</p>
                    <span className="text-green-600 text-xs">Hint: Use different delay times!</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <h5 className="font-medium text-gray-900 mb-2">2. Heartbeat LED</h5>
                    <p className="text-gray-600 text-sm mb-2">Create a heartbeat pattern: quick double blink, pause, repeat</p>
                    <span className="text-green-600 text-xs">Hint: Two quick blinks with a longer pause</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <h5 className="font-medium text-gray-900 mb-2">3. Traffic Light</h5>
                    <p className="text-gray-600 text-sm mb-2">Simulate a traffic light sequence with different timing</p>
                    <span className="text-green-600 text-xs">Hint: Green (5s), Yellow (2s), Red (5s)</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-4">Advanced Challenges:</h4>
                <div className="space-y-3">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <h5 className="font-medium text-gray-900 mb-2">4. Morse Code Name</h5>
                    <p className="text-gray-600 text-sm mb-2">Blink your name in Morse code using the LED</p>
                    <span className="text-green-600 text-xs">Hint: Look up Morse code patterns online</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <h5 className="font-medium text-gray-900 mb-2">5. Random Blinker</h5>
                    <p className="text-gray-600 text-sm mb-2">Make the LED blink at random intervals</p>
                    <span className="text-green-600 text-xs">Hint: Use random() function</span>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <h5 className="font-medium text-gray-900 mb-2">6. Binary Counter</h5>
                    <p className="text-gray-600 text-sm mb-2">Count from 0 to 15 in binary using the LED</p>
                    <span className="text-green-600 text-xs">Hint: Use for loops and bit operations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Congratulations & Next Steps */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <Trophy className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 Congratulations, Programmer!
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            You've just learned the fundamentals of Arduino programming! You now understand variables, functions,
            loops, conditions, and have written your first working Arduino program.
          </p>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🚀 What You've Accomplished</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <ul className="space-y-2">
                <li className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Mastered programming analogies and concepts</span>
                </li>
                <li className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Understood Arduino hardware and software</span>
                </li>
                <li className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Written and tested your first Arduino program</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Completed interactive programming challenges</span>
                </li>
                <li className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Learned troubleshooting and debugging skills</span>
                </li>
                <li className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Built confidence for real Arduino projects</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/electronics-101/arduino-introduction"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Continue to Advanced Arduino
            </Link>
            <Link
              href="/arduino-playground"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-blue-200"
            >
              Practice in Playground
            </Link>
            <Link
              href="/electronics-101"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Back to Electronics 101
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArduinoProgrammingFundamentalsPage;
