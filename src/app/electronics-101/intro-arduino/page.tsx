import Link from 'next/link';
import { ArrowRight, ArrowLeft, Cpu, Code, Zap, Wifi, CheckCircle, Lightbulb } from 'lucide-react';

const IntroArduinoPage = () => {
  const arduinoFeatures = [
    {
      icon: Cpu,
      title: 'Microcontroller Brain',
      description: 'A tiny computer that can read sensors, make decisions, and control outputs',
      example: 'Like a mini computer that never sleeps'
    },
    {
      icon: Code,
      title: 'Easy Programming',
      description: 'Write simple code to tell Arduino what to do, when to do it',
      example: 'If button pressed, turn on LED'
    },
    {
      icon: Zap,
      title: 'Digital & Analog I/O',
      description: 'Read sensors (temperature, light) and control devices (motors, LEDs)',
      example: 'Read temperature sensor, control fan speed'
    },
    {
      icon: Wifi,
      title: 'Expandable',
      description: 'Add shields and modules for WiFi, Bluetooth, GPS, and more',
      example: 'Send sensor data to your phone'
    }
  ];

  const projectIdeas = [
    {
      difficulty: 'Beginner',
      title: 'Blinking LED',
      description: 'Make an LED blink on and off automatically',
      skills: ['Basic programming', 'Digital output'],
      time: '30 minutes'
    },
    {
      difficulty: 'Beginner',
      title: 'Button-Controlled LED',
      description: 'Turn LED on/off with a push button',
      skills: ['Digital input', 'If statements'],
      time: '45 minutes'
    },
    {
      difficulty: 'Intermediate',
      title: 'Temperature Monitor',
      description: 'Display temperature on LCD screen',
      skills: ['Analog input', 'LCD display', 'Sensors'],
      time: '2 hours'
    },
    {
      difficulty: 'Intermediate',
      title: 'Smart Night Light',
      description: 'LED turns on automatically when dark',
      skills: ['Light sensor', 'Conditional logic'],
      time: '1 hour'
    },
    {
      difficulty: 'Advanced',
      title: 'Home Automation',
      description: 'Control lights and appliances remotely',
      skills: ['WiFi', 'Web interface', 'Relays'],
      time: '1 day'
    },
    {
      difficulty: 'Advanced',
      title: 'Weather Station',
      description: 'Monitor and log environmental data',
      skills: ['Multiple sensors', 'Data logging', 'Internet'],
      time: '2 days'
    }
  ];

  const gettingStarted = [
    {
      step: 1,
      title: 'Get an Arduino Kit',
      description: 'Arduino Uno R3 starter kit with breadboard, wires, and components',
      tip: 'Look for kits with tutorials and project guides included'
    },
    {
      step: 2,
      title: 'Install Arduino IDE',
      description: 'Free software to write and upload code to your Arduino',
      tip: 'Available for Windows, Mac, and Linux at arduino.cc'
    },
    {
      step: 3,
      title: 'Start with Examples',
      description: 'Arduino IDE includes many example programs to learn from',
      tip: 'Begin with "Blink" - the "Hello World" of Arduino'
    },
    {
      step: 4,
      title: 'Join the Community',
      description: 'Connect with other Arduino enthusiasts online',
      tip: 'Arduino forums, Reddit, and YouTube have great tutorials'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/electronics-101"
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Electronics 101
            </Link>
            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              Lesson 6 of 6
            </span>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Cpu className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Introduction to Arduino
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the world of microcontrollers and programmable electronics
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <section className="mb-12">
              <h2>What is Arduino?</h2>
              
              <p>
                Arduino is a small, programmable computer board that can interact with the physical 
                world. Think of it as the brain that can read sensors, make decisions, and control 
                devices automatically. It's like giving your electronics projects intelligence!
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg my-8">
                <div className="flex items-center mb-3">
                  <Lightbulb className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-lg font-bold text-blue-900">Why Arduino is Perfect for Beginners</h3>
                </div>
                <ul className="text-blue-800 space-y-1">
                  <li>• No complex setup - plug in and start programming</li>
                  <li>• Huge community with thousands of tutorials</li>
                  <li>• Affordable and widely available</li>
                  <li>• Mistakes won't break it - very forgiving</li>
                  <li>• Scales from simple LEDs to complex robots</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2>What Makes Arduino Special?</h2>
              
              <p>
                Arduino bridges the gap between simple circuits and complex programming. Here's what 
                makes it so powerful and accessible.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                {arduinoFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.title} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-100 rounded-lg p-3 mr-4">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
                      </div>
                      <p className="text-gray-600 mb-3">{feature.description}</p>
                      <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        <span className="font-medium text-gray-700">Example:</span>
                        <span className="text-gray-600 ml-2">{feature.example}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="mb-12">
              <h2>From Simple to Amazing</h2>
              
              <p>
                Arduino projects can start simple and grow as complex as your imagination. Here are 
                some project ideas organized by difficulty level.
              </p>

              <div className="space-y-6 my-8">
                {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                  <div key={level} className="bg-white border border-gray-200 rounded-lg p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">{level} Projects</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projectIdeas
                        .filter(project => project.difficulty === level)
                        .map((project) => (
                          <div key={project.title} className="border border-gray-100 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-gray-900">{project.title}</h5>
                              <span className="text-xs text-gray-500">{project.time}</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {project.skills.map((skill) => (
                                <span key={skill} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2>Getting Started with Arduino</h2>
              
              <p>
                Ready to dive into the world of programmable electronics? Here's your roadmap to 
                getting started with Arduino.
              </p>

              <div className="space-y-6 my-8">
                {gettingStarted.map((step) => (
                  <div key={step.step} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start">
                      <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                        <p className="text-gray-600 mb-3">{step.description}</p>
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                          <span className="font-medium text-green-800">💡 Tip:</span>
                          <span className="text-green-700 ml-2">{step.tip}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2>Arduino vs. Traditional Electronics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <h4 className="font-bold text-yellow-900 mb-3">⚡ Traditional Electronics</h4>
                  <ul className="text-yellow-800 space-y-2 text-sm">
                    <li>• Fixed behavior - circuit does one thing</li>
                    <li>• Changes require rewiring</li>
                    <li>• Complex logic needs many components</li>
                    <li>• Limited interaction capabilities</li>
                    <li>• Great for simple, reliable circuits</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-bold text-green-900 mb-3">🤖 Arduino Electronics</h4>
                  <ul className="text-green-800 space-y-2 text-sm">
                    <li>• Programmable behavior - endless possibilities</li>
                    <li>• Changes require only code updates</li>
                    <li>• Complex logic in simple code</li>
                    <li>• Rich interaction with sensors/internet</li>
                    <li>• Perfect for smart, adaptive projects</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2>Your Next Steps</h2>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 my-8">
                <h4 className="font-bold text-purple-900 mb-4">🚀 Continue Your Journey</h4>
                <div className="space-y-3 text-purple-800">
                  <div>
                    <strong>1. Practice the basics:</strong> Master LEDs, buttons, and sensors with traditional circuits
                  </div>
                  <div>
                    <strong>2. Get an Arduino kit:</strong> Start with Arduino Uno R3 and a beginner kit
                  </div>
                  <div>
                    <strong>3. Learn programming basics:</strong> Variables, loops, and functions
                  </div>
                  <div>
                    <strong>4. Build projects:</strong> Start simple, then gradually increase complexity
                  </div>
                  <div>
                    <strong>5. Join the community:</strong> Share projects and learn from others
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2>Congratulations!</h2>
              
              <p>
                You've completed Electronics 101! You now have a solid foundation in electronics 
                fundamentals and understand the exciting possibilities that await you. Whether you 
                stick with traditional circuits or dive into Arduino programming, you're ready to 
                start building amazing projects.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
                <h4 className="font-bold text-green-900 mb-3">🎉 Your Electronics Journey</h4>
                <ul className="text-green-800 space-y-1">
                  <li>• ✅ Understand electricity and electronic components</li>
                  <li>• ✅ Read circuit diagrams and schematic symbols</li>
                  <li>• ✅ Build circuits on breadboards</li>
                  <li>• ✅ Apply Ohm's Law and calculate component values</li>
                  <li>• ✅ Know about microcontrollers and Arduino</li>
                  <li>• 🚀 Ready to build your own projects!</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
                <h4 className="font-bold text-blue-900 mb-4">🔧 Recommended Next Steps</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-800">
                  <div>
                    <h5 className="font-medium mb-2">Explore Our Tools:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Use our calculators for component values</li>
                      <li>• Try the circuit simulator</li>
                      <li>• Browse Arduino project tutorials</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Build Real Projects:</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Start with simple LED circuits</li>
                      <li>• Add switches and sensors</li>
                      <li>• Progress to Arduino projects</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8 border-t border-gray-200">
            <Link
              href="/electronics-101/first-led-circuit"
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Previous: Your First LED Circuit
            </Link>
            
            <div className="flex gap-4">
              <Link
                href="/calculators"
                className="flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Explore Calculators
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
              <Link
                href="/electronics/arduino-projects"
                className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Arduino Projects
                <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IntroArduinoPage;
