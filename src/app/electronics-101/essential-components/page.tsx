import Link from 'next/link';
import { ArrowRight, ArrowLeft, Lightbulb, Zap, Battery, AlertCircle, Eye } from 'lucide-react';

const EssentialComponentsPage = () => {
  const components = [
    {
      name: 'Resistor',
      symbol: 'R',
      purpose: 'Limits current flow',
      analogy: 'Like a narrow section in a water pipe that slows down the flow',
      commonUses: ['Protect LEDs from too much current', 'Set brightness levels', 'Pull-up/pull-down circuits'],
      identification: 'Colored bands indicate resistance value',
      safetyTips: ['No polarity - can be connected either way', 'Choose correct wattage rating'],
      beginnerTip: 'Start with 220Ω, 1kΩ, and 10kΩ resistors - they cover most basic projects'
    },
    {
      name: 'LED',
      symbol: 'LED',
      purpose: 'Converts electricity to light',
      analogy: 'Like a one-way valve that glows when electricity flows through it',
      commonUses: ['Status indicators', 'Simple displays', 'Lighting effects'],
      identification: 'Longer leg is positive (+), shorter leg is negative (-)',
      safetyTips: ['Always use with current-limiting resistor', 'Check polarity before connecting'],
      beginnerTip: 'Red LEDs need about 1.8V, blue/white LEDs need about 3.2V'
    },
    {
      name: 'Capacitor',
      symbol: 'C',
      purpose: 'Stores electrical energy temporarily',
      analogy: 'Like a small water tank that fills up and empties quickly',
      commonUses: ['Smooth power supply', 'Filter noise', 'Timing circuits'],
      identification: 'Value marked on body, larger ones have polarity markings',
      safetyTips: ['Large capacitors can hold dangerous charge', 'Electrolytic types have polarity'],
      beginnerTip: 'Start with small ceramic capacitors (10nF, 100nF) - they\'re safer and easier'
    },
    {
      name: 'Switch',
      symbol: 'SW',
      purpose: 'Controls the flow of electricity',
      analogy: 'Like a gate that can be opened or closed to let electricity through',
      commonUses: ['Turn circuits on/off', 'Select different modes', 'User input'],
      identification: 'Usually labeled with ON/OFF or numbered terminals',
      safetyTips: ['Check current rating', 'Make sure it can handle your circuit\'s voltage'],
      beginnerTip: 'Tactile push buttons are perfect for Arduino projects'
    },
    {
      name: 'Battery',
      symbol: 'BAT',
      purpose: 'Provides electrical power',
      analogy: 'Like a water pump that creates pressure to push water through pipes',
      commonUses: ['Power portable projects', 'Backup power', 'Mobile devices'],
      identification: 'Voltage marked on label (1.5V, 3.7V, 9V, etc.)',
      safetyTips: ['Never short-circuit', 'Check polarity', 'Don\'t mix old and new batteries'],
      beginnerTip: '4×AA battery pack (6V) or 9V battery are great for Arduino projects'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-600">Electronics 101</span>
            <span className="text-sm text-gray-600">Lesson 2 of 6</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '33.33%' }}></div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Essential Electronic Components
          </h1>
          <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
            <span className="flex items-center">
              <Lightbulb className="h-4 w-4 mr-1" />
              25 min read
            </span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Beginner</span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Let's meet the basic building blocks of electronics! These five components appear in almost 
            every electronic project. We'll learn what they do, how to identify them, and most importantly, 
            how to use them safely.
          </p>
        </header>

        {/* Content */}
        <div className="tutorial-content">
          <section className="mb-12">
            <h2>Your Electronics Toolkit</h2>
            
            <p>
              Think of electronic components like LEGO blocks - each one has a specific purpose, and you 
              combine them to build amazing things. Today we'll learn about the five most essential components 
              that every beginner should know.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
              <div className="flex items-start">
                <Lightbulb className="h-6 w-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-blue-900 mb-2">Learning Strategy</h4>
                  <p className="text-blue-800">
                    For each component, we'll cover: what it does, how to identify it, common uses, 
                    and safety tips. Don't try to memorize everything - focus on understanding the basic purpose!
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Component Details */}
          {components.map((component, index) => (
            <section key={component.name} className="mb-16">
              <div className="bg-gray-50 rounded-lg p-8">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{component.name}</h2>
                    <p className="text-gray-600">Symbol: {component.symbol}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">What It Does</h3>
                    <p className="text-gray-700 mb-4">{component.purpose}</p>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
                      <h4 className="font-bold text-yellow-900 mb-2">💡 Think of it like...</h4>
                      <p className="text-yellow-800 text-sm">{component.analogy}</p>
                    </div>

                    <h4 className="font-bold text-gray-900 mb-2">Common Uses:</h4>
                    <ul className="text-gray-700 space-y-1">
                      {component.commonUses.map((use, i) => (
                        <li key={i}>• {use}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">How to Identify</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start">
                        <Eye className="h-5 w-5 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                        <p className="text-blue-800 text-sm">{component.identification}</p>
                      </div>
                    </div>

                    <h4 className="font-bold text-gray-900 mb-2">Safety Tips:</h4>
                    <ul className="text-gray-700 space-y-1 mb-4">
                      {component.safetyTips.map((tip, i) => (
                        <li key={i} className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-bold text-green-900 mb-2">🎯 Beginner Tip</h4>
                      <p className="text-green-800 text-sm">{component.beginnerTip}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}

          <section className="mb-12">
            <h2>Building Your First Component Kit</h2>
            
            <p>
              Ready to start building? Here's a beginner-friendly shopping list of components that will 
              let you build dozens of projects:
            </p>

            <div className="bg-white border border-gray-200 rounded-lg p-6 my-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Essential Beginner Kit</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Resistors (pack of 10 each):</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• 220Ω (red-red-brown)</li>
                    <li>• 1kΩ (brown-black-red)</li>
                    <li>• 10kΩ (brown-black-orange)</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Other Components:</h4>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• 10× LEDs (assorted colors)</li>
                    <li>• 5× Push buttons</li>
                    <li>• 1× Breadboard</li>
                    <li>• 1× 9V battery + connector</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Budget tip:</strong> This basic kit costs about $15-20 and will keep you busy 
                  for weeks! You can find these components at electronics stores or online.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2>Component Safety Rules</h2>
            
            <p>
              Electronics is generally very safe, but following these simple rules will keep you and 
              your components happy:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="font-bold text-red-900 mb-3">❌ Never Do This</h4>
                <ul className="text-red-800 space-y-2 text-sm">
                  <li>• Connect LEDs directly to power (no resistor)</li>
                  <li>• Short-circuit batteries</li>
                  <li>• Work on live circuits</li>
                  <li>• Ignore polarity on components that have it</li>
                </ul>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-bold text-green-900 mb-3">✅ Always Do This</h4>
                <ul className="text-green-800 space-y-2 text-sm">
                  <li>• Check connections before applying power</li>
                  <li>• Use appropriate resistors with LEDs</li>
                  <li>• Double-check polarity</li>
                  <li>• Start with low voltages (5V or less)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2>What's Next?</h2>
            
            <p>
              Excellent! You now know the five essential components that appear in almost every electronic 
              project. In our next lesson, we'll learn how to read circuit diagrams - the "maps" that 
              show you how to connect these components together.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-8">
              <h4 className="font-bold text-green-900 mb-3">✅ What You Learned</h4>
              <ul className="text-green-800 space-y-1">
                <li>• Purpose and identification of 5 essential components</li>
                <li>• Safety considerations for each component</li>
                <li>• How to build your first component kit</li>
                <li>• Basic safety rules for electronics</li>
              </ul>
            </div>
          </section>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-200">
          <Link
            href="/electronics-101/what-is-electronics"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-4 sm:mb-0"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous: What is Electronics?
          </Link>
          
          <Link
            href="/electronics-101/reading-circuits"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Next: Reading Circuit Diagrams
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </article>
    </div>
  );
};

export default EssentialComponentsPage;
