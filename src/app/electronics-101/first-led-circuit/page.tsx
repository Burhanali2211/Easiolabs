import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, Lightbulb, Zap, AlertTriangle, CheckCircle, Calculator, Target, Settings, Eye, Wrench, Clock, Play } from 'lucide-react';
import KnowledgeCheck from '@/components/KnowledgeCheck';

const FirstLEDCircuitPage = () => {
  const requiredComponents = [
    { name: '9V Battery', purpose: 'Power source', specs: '9 volts DC' },
    { name: 'LED', purpose: 'Light output', specs: 'Any color (red recommended for beginners)' },
    { name: 'Resistor', purpose: 'Current limiting', specs: '220Ω to 1kΩ (higher = dimmer)' },
    { name: 'Breadboard', purpose: 'Circuit building', specs: 'Half-size or full-size' },
    { name: 'Jumper Wires', purpose: 'Connections', specs: 'Various colors' },
    { name: 'Battery Connector', purpose: 'Power connection', specs: '9V battery snap connector' }
  ];

  const buildingSteps = [
    {
      step: 1,
      title: 'Identify LED Polarity',
      description: 'Find the positive (anode) and negative (cathode) legs of your LED',
      details: 'Longer leg = positive (+), Shorter leg = negative (-)',
      safety: 'LEDs only work in one direction - polarity matters!'
    },
    {
      step: 2,
      title: 'Place the LED',
      description: 'Insert LED into breadboard with legs in different rows',
      details: 'Put positive leg in row 10, negative leg in row 12 (example)',
      safety: 'Push gently - LED legs can break if forced'
    },
    {
      step: 3,
      title: 'Add the Resistor',
      description: 'Connect resistor between positive power rail and LED positive leg',
      details: 'One end to red power rail, other end to same row as LED positive',
      safety: 'Resistors have no polarity - either direction works'
    },
    {
      step: 4,
      title: 'Connect Ground',
      description: 'Connect LED negative leg to negative power rail',
      details: 'Use a jumper wire from LED negative row to blue power rail',
      safety: 'This completes the circuit path back to battery'
    },
    {
      step: 5,
      title: 'Connect Battery',
      description: 'Connect battery positive to red rail, negative to blue rail',
      details: 'Red wire to red rail, black wire to blue rail',
      safety: 'Double-check polarity before connecting!'
    }
  ];

  const troubleshooting = [
    {
      problem: 'LED doesn\'t light up',
      causes: ['Wrong polarity', 'Loose connections', 'Dead battery', 'Broken LED'],
      solutions: ['Flip LED around', 'Check all connections', 'Test battery voltage', 'Try different LED']
    },
    {
      problem: 'LED is very dim',
      causes: ['Resistor too large', 'Low battery', 'Poor connections'],
      solutions: ['Use smaller resistor (220Ω)', 'Replace battery', 'Ensure firm connections']
    },
    {
      problem: 'LED burns out immediately',
      causes: ['No resistor', 'Wrong resistor value', 'Too much voltage'],
      solutions: ['Always use current-limiting resistor', 'Use 220Ω or higher', 'Check voltage levels']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">Electronics 101</span>
            <span className="text-sm text-gray-600">Lesson 5 of 10</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Your First LED Circuit
          </h1>
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              35 min read
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Beginner</span>
            <span className="flex items-center">
              <Target className="h-4 w-4 mr-1" />
              Lesson 5 of 10
            </span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            🎉 This is it - the moment you've been building up to! You're about to create your very first
            working electronic circuit. When that LED lights up, you'll officially be an electronics maker!
            Let's build something amazing together.
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
                  How to identify LED polarity like a pro
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Why resistors are LEDs' best friends
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Using Ohm's Law to calculate perfect resistor values
                </li>
              </ul>
              <ul className="text-blue-800 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Step-by-step circuit building techniques
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Troubleshooting when things don't work
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Building your first real working circuit!
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="tutorial-content">

          <div className="prose prose-lg max-w-none">

            <section className="mb-12">
              <h2>Why Start with an LED Circuit?</h2>

              <p>
                An LED circuit is the perfect first project because it's simple, safe, and gives you
                immediate visual feedback when it works. Plus, you'll learn fundamental concepts
                like current limiting and Ohm's Law that apply to all electronics.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg my-8">
                <div className="flex items-center mb-3">
                  <Lightbulb className="h-6 w-6 text-yellow-600 mr-2" />
                  <h3 className="text-lg font-bold text-yellow-900">What You'll Learn</h3>
                </div>
                <ul className="text-yellow-800 space-y-1">
                  <li>• How to identify LED polarity (positive and negative)</li>
                  <li>• Why resistors are essential for LED circuits</li>
                  <li>• How to calculate the right resistor value</li>
                  <li>• Practical application of Ohm's Law</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2>Components You'll Need</h2>

              <p>
                Before we start building, let's gather all the components. Most of these items
                come in basic electronics starter kits.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                {requiredComponents.map((component) => (
                  <div key={component.name} className="bg-white border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold text-gray-900 mb-2">{component.name}</h4>
                    <div className="text-sm space-y-1">
                      <div>
                        <span className="font-medium text-gray-700">Purpose:</span>
                        <span className="text-gray-600 ml-2">{component.purpose}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Specs:</span>
                        <span className="text-gray-600 ml-2">{component.specs}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2>Understanding LED Basics</h2>

              <p>
                Before building, it's important to understand how LEDs work and why they need
                special care.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-bold text-blue-900 mb-3">💡 LED Facts</h4>
                  <ul className="text-blue-800 space-y-2 text-sm">
                    <li>• LED = Light Emitting Diode</li>
                    <li>• Only allows current in one direction</li>
                    <li>• Forward voltage: ~2V (red), ~3V (blue/white)</li>
                    <li>• Typical current: 10-20 milliamps</li>
                    <li>• Very efficient - little heat, long life</li>
                  </ul>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <h4 className="font-bold text-red-900 mb-3">⚠️ Why Resistors Are Essential</h4>
                  <ul className="text-red-800 space-y-2 text-sm">
                    <li>• LEDs have very low resistance</li>
                    <li>• Without a resistor, too much current flows</li>
                    <li>• Excess current burns out the LED instantly</li>
                    <li>• Resistor limits current to safe levels</li>
                    <li>• Always use a current-limiting resistor!</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2>Your Circuit Diagram</h2>

              <p>
                Before we start building, let's look at what we're creating. This is your first real
                circuit diagram - and soon it will be a real, working circuit!
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 my-8">
                <div className="text-center mb-6">
                  <h4 className="font-bold text-gray-900 mb-4">LED Circuit Diagram</h4>
                  <div className="bg-white rounded-lg p-6 inline-block border-2 border-dashed border-gray-300">
                    <div className="flex items-center justify-center space-x-8">
                      <div className="text-center">
                        <div className="text-4xl mb-2">🔋</div>
                        <div className="text-sm font-medium">9V Battery</div>
                        <div className="text-xs text-gray-600">Power Source</div>
                        <div className="text-xs text-green-600 font-medium">+9V</div>
                      </div>
                      <div className="text-2xl text-red-500">—</div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">⚡</div>
                        <div className="text-sm font-medium">220Ω Resistor</div>
                        <div className="text-xs text-gray-600">Current Limiter</div>
                        <div className="text-xs text-blue-600 font-medium">Protects LED</div>
                      </div>
                      <div className="text-2xl text-red-500">—</div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">💡</div>
                        <div className="text-sm font-medium">Red LED</div>
                        <div className="text-xs text-gray-600">Light Output</div>
                        <div className="text-xs text-yellow-600 font-medium">Long leg = +</div>
                      </div>
                      <div className="text-2xl text-blue-500">—</div>
                      <div className="text-center">
                        <div className="text-4xl mb-2">⏚</div>
                        <div className="text-sm font-medium">Ground</div>
                        <div className="text-xs text-gray-600">Return Path</div>
                        <div className="text-xs text-blue-600 font-medium">Back to -</div>
                      </div>
                    </div>

                    <div className="mt-6 text-center">
                      <div className="text-sm text-gray-600 mb-2">Current Flow Direction</div>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-red-500">+</span>
                        <span className="text-xs">→</span>
                        <span className="text-blue-600">Resistor</span>
                        <span className="text-xs">→</span>
                        <span className="text-yellow-600">LED</span>
                        <span className="text-xs">→</span>
                        <span className="text-blue-500">-</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-bold text-green-900 mb-3">✅ What Makes This Work</h5>
                    <ul className="text-green-800 space-y-2 text-sm">
                      <li>• Battery provides electrical pressure (9V)</li>
                      <li>• Resistor limits current to safe levels</li>
                      <li>• LED converts electricity to light</li>
                      <li>• Complete path allows current to flow</li>
                      <li>• Ground completes the circuit</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-bold text-blue-900 mb-3">🔍 Key Components</h5>
                    <ul className="text-blue-800 space-y-2 text-sm">
                      <li>• <strong>9V Battery:</strong> Provides power</li>
                      <li>• <strong>220Ω Resistor:</strong> Protects LED</li>
                      <li>• <strong>Red LED:</strong> Creates light</li>
                      <li>• <strong>Wires:</strong> Connect everything</li>
                      <li>• <strong>Breadboard:</strong> Holds it all together</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2>Building Your Circuit</h2>

              <p>
                Now for the exciting part - let's build this circuit step by step! Take your time,
                double-check each connection, and don't worry if it doesn't work the first time.
                Even experienced engineers make mistakes!
              </p>

              <div className="space-y-8 my-8">
                {buildingSteps.map((step, index) => (
                  <div key={step.step} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Step Instructions */}
                      <div>
                        <div className="flex items-start mb-4">
                          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                            {step.step}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                            <p className="text-gray-600 mb-3">{step.description}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="bg-gray-50 border border-gray-200 rounded p-3">
                            <span className="font-medium text-gray-700">Details:</span>
                            <span className="text-gray-600 ml-2">{step.details}</span>
                          </div>

                          <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                            <span className="font-medium text-yellow-800">⚠️ Safety:</span>
                            <span className="text-yellow-700 ml-2">{step.safety}</span>
                          </div>
                        </div>
                      </div>

                      {/* Visual Guide */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-3">Visual Guide</h5>

                        {/* Step-specific visual content */}
                        {index === 0 && (
                          // Step 1: Gather Components
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="text-center">
                                <Image
                                  src="/images/tutorial/breadboard-empty.jpg"
                                  alt="Empty breadboard ready for circuit building"
                                  width={120}
                                  height={80}
                                  className="mx-auto rounded border"
                                />
                                <div className="text-xs text-gray-600 mt-1">Clean breadboard</div>
                              </div>
                              <div className="text-center">
                                <Image
                                  src="/images/tutorial/components-laid-out.jpg"
                                  alt="Components laid out: LED, resistor, wires, battery"
                                  width={120}
                                  height={80}
                                  className="mx-auto rounded border"
                                />
                                <div className="text-xs text-gray-600 mt-1">Components ready</div>
                              </div>
                            </div>
                            <div className="bg-white rounded p-3 text-center">
                              <div className="text-sm text-gray-600">✅ Checklist</div>
                              <div className="text-xs text-gray-500 mt-1">
                                Breadboard • LED • 220Ω Resistor • Jumper wires • 9V battery
                              </div>
                            </div>
                          </div>
                        )}

                        {index === 1 && (
                          // Step 2: Connect Power Rails
                          <div className="space-y-3">
                            <div className="text-center">
                              <Image
                                src="/images/tutorial/power-rails-connected.jpg"
                                alt="Battery connected to breadboard power rails"
                                width={200}
                                height={120}
                                className="mx-auto rounded border"
                              />
                              <div className="text-xs text-gray-600 mt-1">Power rails connected</div>
                            </div>
                            <div className="bg-white rounded p-3">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-red-600">Red wire → + rail</span>
                                <span className="text-blue-600">Black wire → - rail</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {index === 2 && (
                          // Step 3: Place Resistor
                          <div className="space-y-3">
                            <div className="text-center">
                              <Image
                                src="/images/tutorial/resistor-placement.jpg"
                                alt="220 ohm resistor placed on breadboard"
                                width={200}
                                height={120}
                                className="mx-auto rounded border"
                              />
                              <div className="text-xs text-gray-600 mt-1">Resistor in position</div>
                            </div>
                            <div className="bg-white rounded p-3 text-center">
                              <div className="text-xs text-gray-600">Color bands: Red-Red-Brown</div>
                              <div className="text-xs text-gray-500">= 220Ω</div>
                            </div>
                          </div>
                        )}

                        {index === 3 && (
                          // Step 4: Place LED
                          <div className="space-y-3">
                            <div className="text-center">
                              <Image
                                src="/images/tutorial/led-placement.jpg"
                                alt="LED placed with correct polarity on breadboard"
                                width={200}
                                height={120}
                                className="mx-auto rounded border"
                              />
                              <div className="text-xs text-gray-600 mt-1">LED with correct polarity</div>
                            </div>
                            <div className="bg-white rounded p-3">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-green-600">Long leg = +</span>
                                <span className="text-gray-600">Short leg = -</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {index === 4 && (
                          // Step 5: Complete Circuit
                          <div className="space-y-3">
                            <div className="text-center">
                              <Image
                                src="/images/tutorial/complete-circuit.jpg"
                                alt="Complete LED circuit with all connections"
                                width={200}
                                height={120}
                                className="mx-auto rounded border"
                              />
                              <div className="text-xs text-gray-600 mt-1">Complete circuit</div>
                            </div>
                            <div className="bg-green-50 rounded p-3 text-center">
                              <div className="text-sm text-green-800 font-medium">🎉 Success!</div>
                              <div className="text-xs text-green-600">LED should be glowing</div>
                            </div>
                          </div>
                        )}

                        {index === 5 && (
                          // Step 6: Test Circuit
                          <div className="space-y-3">
                            <div className="text-center">
                              <Image
                                src="/images/tutorial/led-glowing.jpg"
                                alt="LED circuit working with bright red light"
                                width={200}
                                height={120}
                                className="mx-auto rounded border"
                              />
                              <div className="text-xs text-gray-600 mt-1">Working circuit!</div>
                            </div>
                            <div className="bg-yellow-50 rounded p-3 text-center">
                              <div className="text-sm text-yellow-800">Not working?</div>
                              <div className="text-xs text-yellow-600">Check troubleshooting section below</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2>Understanding the Math (Ohm's Law)</h2>

              <p>
                Let's understand why we chose a 220Ω resistor and how to calculate the right value
                for different situations.
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
                <h4 className="font-bold text-blue-900 mb-4">🧮 Ohm's Law in Action</h4>
                <div className="space-y-4 text-blue-800">
                  <div>
                    <strong>The Formula:</strong> R = (Vs - Vf) / I
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <strong>R</strong> = Resistor value (Ohms)
                    </div>
                    <div>
                      <strong>Vs</strong> = Supply voltage (9V)
                    </div>
                    <div>
                      <strong>Vf</strong> = LED forward voltage (2V)
                    </div>
                  </div>
                  <div>
                    <strong>I</strong> = Desired current (0.02A = 20mA)
                  </div>
                  <div className="bg-white border border-blue-300 rounded p-3 mt-4">
                    <strong>Example:</strong> R = (9V - 2V) / 0.02A = 7V / 0.02A = 350Ω<br />
                    <em>We use 220Ω (closest standard value) for a brighter LED</em>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
                <h4 className="font-bold text-green-900 mb-3">🎯 Quick Reference</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800 text-sm">
                  <div>
                    <strong>For 9V battery + Red LED:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• 220Ω = Bright</li>
                      <li>• 470Ω = Medium</li>
                      <li>• 1kΩ = Dim</li>
                    </ul>
                  </div>
                  <div>
                    <strong>For 5V supply + Red LED:</strong>
                    <ul className="mt-2 space-y-1">
                      <li>• 150Ω = Bright</li>
                      <li>• 220Ω = Medium</li>
                      <li>• 470Ω = Dim</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2>Troubleshooting</h2>

              <p>
                Don't worry if your circuit doesn't work the first time! Here are the most common
                problems and their solutions.
              </p>

              <div className="space-y-6 my-8">
                {troubleshooting.map((issue, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h4 className="font-bold text-red-900 mb-4">❌ {issue.problem}</h4>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Problem Visual */}
                      <div className="bg-white rounded-lg p-4">
                        <h5 className="font-medium text-gray-900 mb-3">What It Looks Like</h5>
                        <div className="text-center">
                          {index === 0 && (
                            // LED doesn't light up
                            <div className="space-y-2">
                              <Image
                                src="/images/troubleshooting/led-not-working.jpg"
                                alt="LED circuit that is not lighting up"
                                width={150}
                                height={100}
                                className="mx-auto rounded border"
                              />
                              <div className="text-xs text-gray-600">Dark LED - no light</div>
                            </div>
                          )}
                          {index === 1 && (
                            // LED very dim
                            <div className="space-y-2">
                              <Image
                                src="/images/troubleshooting/led-dim.jpg"
                                alt="LED circuit with very dim light output"
                                width={150}
                                height={100}
                                className="mx-auto rounded border"
                              />
                              <div className="text-xs text-gray-600">Very dim light</div>
                            </div>
                          )}
                          {index === 2 && (
                            // LED burned out
                            <div className="space-y-2">
                              <Image
                                src="/images/troubleshooting/led-burned.jpg"
                                alt="Burned out LED with visible damage"
                                width={150}
                                height={100}
                                className="mx-auto rounded border"
                              />
                              <div className="text-xs text-gray-600">Damaged LED</div>
                            </div>
                          )}
                          {index === 3 && (
                            // Battery dead
                            <div className="space-y-2">
                              <Image
                                src="/images/troubleshooting/battery-dead.jpg"
                                alt="Multimeter showing low battery voltage"
                                width={150}
                                height={100}
                                className="mx-auto rounded border"
                              />
                              <div className="text-xs text-gray-600">Low battery voltage</div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Causes and Solutions */}
                      <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-red-800 mb-2">Possible Causes:</h5>
                            <ul className="text-red-700 text-sm space-y-1">
                              {issue.causes.map((cause, i) => (
                                <li key={i}>• {cause}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-red-800 mb-2">Solutions:</h5>
                            <ul className="text-red-700 text-sm space-y-1">
                              {issue.solutions.map((solution, i) => (
                                <li key={i}>• {solution}</li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Quick Fix */}
                        <div className="bg-green-50 border border-green-200 rounded p-3 mt-4">
                          <h6 className="font-medium text-green-800 mb-1">🔧 Quick Fix:</h6>
                          <p className="text-green-700 text-sm">
                            {index === 0 && "Try flipping the LED around - this fixes 80% of non-working LEDs!"}
                            {index === 1 && "Check your resistor value - you might have grabbed a 10kΩ instead of 220Ω."}
                            {index === 2 && "Replace the LED and always use a current-limiting resistor next time."}
                            {index === 3 && "Test battery voltage with a multimeter - should read close to 9V."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Troubleshooting Flowchart */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
                <h4 className="font-bold text-blue-900 mb-4">🔍 Troubleshooting Flowchart</h4>
                <div className="bg-white rounded-lg p-4">
                  <div className="text-center space-y-4">
                    <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-3 inline-block">
                      <strong>LED not working?</strong>
                    </div>
                    <div className="text-gray-400">↓</div>
                    <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 inline-block">
                      <strong>Step 1:</strong> Check LED polarity (flip it around)
                    </div>
                    <div className="text-gray-400">↓</div>
                    <div className="bg-green-100 border border-green-300 rounded-lg p-3 inline-block">
                      <strong>Step 2:</strong> Verify all connections are secure
                    </div>
                    <div className="text-gray-400">↓</div>
                    <div className="bg-purple-100 border border-purple-300 rounded-lg p-3 inline-block">
                      <strong>Step 3:</strong> Test battery voltage (should be ~9V)
                    </div>
                    <div className="text-gray-400">↓</div>
                    <div className="bg-orange-100 border border-orange-300 rounded-lg p-3 inline-block">
                      <strong>Step 4:</strong> Check resistor value (220Ω = red-red-brown)
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2>Experiment and Learn More</h2>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 my-8">
                <h4 className="font-bold text-purple-900 mb-4">🔬 Try These Experiments</h4>
                <div className="space-y-3 text-purple-800">
                  <div>
                    <strong>1. Change the resistor:</strong> Try 470Ω, 1kΩ, 2.2kΩ - notice how brightness changes
                  </div>
                  <div>
                    <strong>2. Try different LED colors:</strong> Blue and white LEDs need higher voltage
                  </div>
                  <div>
                    <strong>3. Add a switch:</strong> Control when the LED turns on and off
                  </div>
                  <div>
                    <strong>4. Multiple LEDs:</strong> Connect several LEDs in parallel (each needs its own resistor)
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
                  question: "How can you identify the positive leg of an LED?",
                  options: [
                    "It's always on the left side",
                    "The longer leg is positive (anode)",
                    "The shorter leg is positive",
                    "LEDs don't have polarity"
                  ],
                  correctAnswer: 1,
                  explanation: "The longer leg of an LED is the positive terminal (anode), and the shorter leg is the negative terminal (cathode). LEDs only work when connected with correct polarity."
                },
                {
                  id: "2",
                  question: "Why do LEDs need current-limiting resistors?",
                  options: [
                    "To make them brighter",
                    "To change their color",
                    "To prevent damage from excessive current",
                    "To make them last longer"
                  ],
                  correctAnswer: 2,
                  explanation: "LEDs have very low resistance and will draw too much current without a resistor, causing them to burn out instantly. The resistor limits current to safe levels."
                },
                {
                  id: "3",
                  question: "Using Ohm's Law, what resistor value would you need for a red LED (2V forward voltage) with a 9V battery to get 20mA current?",
                  options: [
                    "100Ω",
                    "220Ω",
                    "350Ω",
                    "1000Ω"
                  ],
                  correctAnswer: 2,
                  explanation: "Using R = (Vs - Vf) / I = (9V - 2V) / 0.02A = 7V / 0.02A = 350Ω. This is the calculated value; 330Ω would be the closest standard resistor value."
                },
                {
                  id: "4",
                  question: "What should you do first if your LED circuit doesn't light up?",
                  options: [
                    "Replace the battery immediately",
                    "Check if the LED is connected with correct polarity",
                    "Use a smaller resistor",
                    "Add more LEDs to the circuit"
                  ],
                  correctAnswer: 1,
                  explanation: "The most common reason an LED doesn't light up is incorrect polarity. Try flipping the LED around first, as this is the easiest fix to check."
                },
                {
                  id: "5",
                  question: "What happens if you use a much larger resistor (like 10kΩ) with your LED?",
                  options: [
                    "The LED will burn out",
                    "The LED will be very dim or not light up",
                    "The LED will be brighter",
                    "Nothing will change"
                  ],
                  correctAnswer: 1,
                  explanation: "A larger resistor limits more current, so the LED will be very dim or may not light up at all. The LED won't be damaged, but it won't work effectively."
                }
              ]}
            />

            <section className="mb-12">
              <h2>What's Next?</h2>

              <p>
                Congratulations! You've built your first electronic circuit and learned fundamental
                concepts that apply to all electronics. In the next lesson, we'll explore more advanced
                LED circuits and techniques.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
                <h4 className="font-bold text-green-900 mb-3">✅ What You Accomplished</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-800">
                  <ul className="space-y-1 text-sm">
                    <li>• Built your first working electronic circuit</li>
                    <li>• Learned LED polarity identification</li>
                    <li>• Understanding current limiting principles</li>
                    <li>• Applied Ohm's Law for resistor calculations</li>
                  </ul>
                  <ul className="space-y-1 text-sm">
                    <li>• Mastered step-by-step building techniques</li>
                    <li>• Developed troubleshooting skills</li>
                    <li>• Practiced safety procedures</li>
                    <li>• Gained confidence with hands-on electronics</li>
                  </ul>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h4 className="font-bold text-purple-900 mb-4">🚀 Ready for More Advanced Circuits?</h4>
                <p className="text-purple-800 mb-4">
                  Now that you've mastered the basics, it's time to explore more complex LED circuits!
                  In our next lesson, we'll learn about different LED types, multiple LED configurations,
                  and advanced control techniques.
                </p>
                <div className="text-purple-800 text-sm">
                  <strong>Coming up:</strong> LED types and characteristics, series and parallel circuits,
                  brightness control, troubleshooting advanced problems, and building confidence with
                  more complex projects.
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <Link
            href="/electronics-101/using-breadboard"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4 sm:mb-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back: Using a Breadboard
          </Link>

          <Link
            href="/electronics-101/led-basics"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Next: LED Basics & Advanced Circuits
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </article>
    </div>
  );
};

export default FirstLEDCircuitPage;
