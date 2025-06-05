import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, Lightbulb, Zap, Battery, AlertCircle, Clock, Target, CheckCircle } from 'lucide-react';
import LessonProgress from '@/components/LessonProgress';
import KnowledgeCheck from '@/components/KnowledgeCheck';

const WhatIsElectronicsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">Electronics 101</span>
            <span className="text-sm text-gray-600">Lesson 1 of 6</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '16.67%' }}></div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Tracking */}
        <LessonProgress
          lessonId="what-is-electronics"
          totalLessons={10}
          currentLesson={1}
          estimatedTime="15 min"
        />
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            What is Electronics?
          </h1>
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              15 min read
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Beginner</span>
            <span className="flex items-center">
              <Target className="h-4 w-4 mr-1" />
              Lesson 1 of 10
            </span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Welcome to your electronics journey! Let's start with the absolute basics and understand
            what electronics is all about. Don't worry if you've never touched a circuit before –
            we'll explain everything step by step.
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
                  The difference between electricity and electronics
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Understanding voltage, current, and resistance
                </li>
              </ul>
              <ul className="text-blue-800 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Ohm's Law and why it matters
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-600" />
                  Real-world applications of electronics
                </li>
              </ul>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="tutorial-content">
          <section className="mb-12">
            <h2>Electronics vs. Electricity: What's the Difference?</h2>

            <p>
              Many people use "electronics" and "electricity" interchangeably, but they're actually different!
              Think of it this way:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg">
                <div className="flex items-center mb-3">
                  <Zap className="h-6 w-6 text-yellow-600 mr-2" />
                  <h3 className="text-lg font-bold text-yellow-900">Electricity</h3>
                </div>
                <p className="text-yellow-800">
                  The flow of electric charge through materials. Like water flowing through pipes,
                  electricity flows through wires to power things like light bulbs and motors.
                </p>
                <div className="mt-3 text-sm text-yellow-700">
                  <strong>Examples:</strong> House wiring, power lines, electric motors
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                <div className="flex items-center mb-3">
                  <Battery className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-bold text-blue-900">Electronics</h3>
                </div>
                <p className="text-blue-800">
                  The control and manipulation of electricity using special components. Electronics
                  can process information, make decisions, and control other devices.
                </p>
                <div className="mt-3 text-sm text-blue-700">
                  <strong>Examples:</strong> Smartphones, computers, Arduino, sensors
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
              <div className="flex items-start">
                <Lightbulb className="h-6 w-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-green-900 mb-2">Simple Analogy</h4>
                  <p className="text-green-800">
                    Think of electricity like water in pipes, and electronics like the smart valves,
                    sensors, and controllers that decide when and how much water flows where.
                    Electronics is the "brain" that controls electricity!
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2>The Three Fundamental Concepts</h2>

            <p>
              Every electronic circuit is built on three basic concepts. Understanding these is like
              learning the alphabet before reading – they're essential!
            </p>

            <div className="space-y-8 my-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">V</span>
                  Voltage (Volts)
                </h3>
                <p className="text-gray-700 mb-4">
                  <strong>What it is:</strong> The electrical "pressure" that pushes electrons through a circuit.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Real-world analogy:</strong> Like water pressure in a hose. Higher pressure = more force.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Common voltages:</strong> AA battery (1.5V), USB (5V), Car battery (12V), House outlet (120V/240V)
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">I</span>
                  Current (Amperes/Amps)
                </h3>
                <p className="text-gray-700 mb-4">
                  <strong>What it is:</strong> The amount of electrical charge flowing through a circuit per second.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Real-world analogy:</strong> Like the amount of water flowing through a pipe per minute.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Common currents:</strong> LED (20mA), Arduino (40mA), Phone charger (1-2A), Microwave (10A)
                  </p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">R</span>
                  Resistance (Ohms)
                </h3>
                <p className="text-gray-700 mb-4">
                  <strong>What it is:</strong> How much a material opposes the flow of electrical current.
                </p>
                <p className="text-gray-700 mb-4">
                  <strong>Real-world analogy:</strong> Like a narrow section in a water pipe that slows down the flow.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Examples:</strong> Copper wire (very low), Resistors (controlled amount), Rubber (very high)
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2>Ohm's Law: The Golden Rule</h2>

            <p>
              There's one simple equation that connects voltage, current, and resistance. It's called
              <strong> Ohm's Law</strong>, and it's the most important formula in electronics:
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 my-8 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">V = I × R</div>
              <p className="text-blue-800 text-lg mb-6">
                Voltage = Current × Resistance
              </p>

              {/* Ohm's Law Triangle */}
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/circuits/ohms-law-triangle.svg"
                  alt="Ohm's Law Triangle"
                  width={300}
                  height={250}
                  className="max-w-full h-auto"
                />
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 my-8">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-yellow-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-yellow-900 mb-2">Don't Worry About Math!</h4>
                  <p className="text-yellow-800">
                    You don't need to be a math genius. We'll show you simple examples and even provide
                    calculators to help you. The important thing is understanding the relationship:
                    if one thing changes, the others change too!
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2>Why Learn Electronics?</h2>

            <p>
              Electronics is everywhere around us, and understanding it opens up amazing possibilities:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900">🏠 Smart Home Projects</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Automatic lights that turn on when you enter</li>
                  <li>• Temperature monitoring systems</li>
                  <li>• Smart garden watering systems</li>
                  <li>• Security cameras and alarms</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-900">🤖 Fun Projects</h4>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>• Build robots that follow lines</li>
                  <li>• Create LED light shows</li>
                  <li>• Make musical instruments</li>
                  <li>• Design custom game controllers</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Knowledge Check */}
          <KnowledgeCheck
            title="Test Your Understanding"
            questions={[
              {
                id: "1",
                question: "What is the main difference between electricity and electronics?",
                options: [
                  "There is no difference - they are the same thing",
                  "Electricity is the flow of charge, electronics controls and manipulates electricity",
                  "Electronics is more dangerous than electricity",
                  "Electricity only works with batteries"
                ],
                correctAnswer: 1,
                explanation: "Electronics involves controlling and manipulating electrical current to process information and make decisions, while electricity is simply the flow of electrical charge."
              },
              {
                id: "2",
                question: "According to Ohm's Law, if voltage increases and resistance stays the same, what happens to current?",
                options: [
                  "Current decreases",
                  "Current stays the same",
                  "Current increases",
                  "Current becomes zero"
                ],
                correctAnswer: 2,
                explanation: "According to Ohm's Law (V = I × R), if voltage increases and resistance remains constant, current must increase proportionally."
              },
              {
                id: "3",
                question: "Which of these is measured in Volts?",
                options: [
                  "Current",
                  "Resistance",
                  "Voltage",
                  "Power"
                ],
                correctAnswer: 2,
                explanation: "Voltage is measured in Volts (V). Current is measured in Amperes, Resistance in Ohms, and Power in Watts."
              }
            ]}
          />

          <section className="mb-12">
            <h2>What's Next?</h2>

            <p>
              Great job completing your first lesson! You now understand the basic concepts that
              make all electronics work. In the next lesson, we'll look at the actual components
              you'll use to build circuits.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
              <h4 className="font-bold text-green-900 mb-3">✅ What You Learned</h4>
              <ul className="text-green-800 space-y-1">
                <li>• The difference between electricity and electronics</li>
                <li>• Voltage, current, and resistance basics</li>
                <li>• Ohm's Law and why it's important</li>
                <li>• Why electronics is worth learning</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <Link
            href="/electronics-101"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4 sm:mb-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Course
          </Link>

          <Link
            href="/electronics-101/essential-components"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Next: Essential Components
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </article>
    </div>
  );
};

export default WhatIsElectronicsPage;
