'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Search, Eye, Zap, Info, AlertTriangle, CheckCircle } from 'lucide-react';

interface Component {
  id: string;
  name: string;
  category: string;
  description: string;
  appearance: string;
  polarity: boolean;
  commonValues: string[];
  uses: string[];
  safetyNotes: string[];
  beginnerFriendly: boolean;
  image?: string;
}

const ComponentGuidePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  const categories = [
    { id: 'all', name: 'All Components' },
    { id: 'passive', name: 'Passive Components' },
    { id: 'active', name: 'Active Components' },
    { id: 'connectors', name: 'Connectors & Switches' },
    { id: 'power', name: 'Power Components' }
  ];

  const components: Component[] = [
    {
      id: 'resistor',
      name: 'Resistor',
      category: 'passive',
      description: 'Limits current flow in circuits. Essential for protecting other components.',
      appearance: 'Small cylinder with colored bands indicating resistance value',
      polarity: false,
      commonValues: ['220Ω', '1kΩ', '10kΩ', '100kΩ'],
      uses: ['Current limiting for LEDs', 'Pull-up/pull-down circuits', 'Voltage dividers'],
      safetyNotes: ['No polarity - can be connected either way', 'Check power rating (usually 1/4W for beginners)'],
      beginnerFriendly: true,
      image: '/images/components/resistor.svg'
    },
    {
      id: 'led',
      name: 'LED (Light Emitting Diode)',
      category: 'active',
      description: 'Converts electrical energy to light. Only allows current to flow in one direction.',
      appearance: 'Small bulb with two legs - longer leg is positive (+)',
      polarity: true,
      commonValues: ['Red (1.8V)', 'Green (2.1V)', 'Blue (3.2V)', 'White (3.2V)'],
      uses: ['Status indicators', 'Displays', 'Lighting effects', 'Visual feedback'],
      safetyNotes: ['Always use current-limiting resistor', 'Longer leg = positive', 'Typical current: 20mA'],
      beginnerFriendly: true,
      image: '/images/components/led.svg'
    },
    {
      id: 'capacitor-ceramic',
      name: 'Ceramic Capacitor',
      category: 'passive',
      description: 'Stores small amounts of electrical energy. Good for filtering and decoupling.',
      appearance: 'Small disc or rectangle, often yellow/brown, value printed on body',
      polarity: false,
      commonValues: ['10nF', '100nF', '1µF'],
      uses: ['Power supply filtering', 'Noise reduction', 'Timing circuits'],
      safetyNotes: ['No polarity', 'Safe to handle', 'Good for beginners'],
      beginnerFriendly: true
    },
    {
      id: 'capacitor-electrolytic',
      name: 'Electrolytic Capacitor',
      category: 'passive',
      description: 'Stores larger amounts of energy. Has polarity and must be connected correctly.',
      appearance: 'Cylindrical with two legs, negative side marked with stripe and minus signs',
      polarity: true,
      commonValues: ['10µF', '100µF', '1000µF'],
      uses: ['Power supply smoothing', 'Energy storage', 'Audio coupling'],
      safetyNotes: ['Has polarity - negative leg marked', 'Can hold charge when disconnected', 'Respect voltage rating'],
      beginnerFriendly: false,
      image: '/images/components/capacitor.svg'
    },
    {
      id: 'switch-tactile',
      name: 'Tactile Switch (Push Button)',
      category: 'connectors',
      description: 'Momentary switch that closes circuit when pressed, opens when released.',
      appearance: 'Small square button with 4 pins, often with colored cap',
      polarity: false,
      commonValues: ['6mm×6mm', '12mm×12mm'],
      uses: ['User input', 'Reset buttons', 'Mode selection', 'Interactive controls'],
      safetyNotes: ['No polarity', 'Check current rating', 'Use pull-up resistors with microcontrollers'],
      beginnerFriendly: true
    },
    {
      id: 'diode',
      name: 'Diode',
      category: 'active',
      description: 'Allows current to flow in only one direction. Used for protection and rectification.',
      appearance: 'Small cylinder with a band marking the cathode (negative) end',
      polarity: true,
      commonValues: ['1N4007', '1N4148'],
      uses: ['Reverse polarity protection', 'Flyback protection', 'Voltage rectification'],
      safetyNotes: ['Band marks cathode (negative)', 'Check current and voltage ratings'],
      beginnerFriendly: false
    },
    {
      id: 'transistor-npn',
      name: 'NPN Transistor',
      category: 'active',
      description: 'Electronic switch that can amplify signals or control larger currents.',
      appearance: 'Three-legged component, often in TO-92 package (half-cylinder)',
      polarity: true,
      commonValues: ['2N2222', 'BC547', '2N3904'],
      uses: ['Switching circuits', 'Signal amplification', 'Motor control', 'Logic circuits'],
      safetyNotes: ['Pin configuration varies by part', 'Check datasheet', 'ESD sensitive'],
      beginnerFriendly: false
    },
    {
      id: 'potentiometer',
      name: 'Potentiometer (Variable Resistor)',
      category: 'passive',
      description: 'Adjustable resistor with a knob or slider. Resistance changes as you turn it.',
      appearance: 'Round component with 3 pins and a shaft for knob attachment',
      polarity: false,
      commonValues: ['1kΩ', '10kΩ', '100kΩ'],
      uses: ['Volume controls', 'Brightness adjustment', 'Analog input to microcontrollers'],
      safetyNotes: ['Center pin is wiper', 'Outer pins are ends of resistor', 'Linear vs logarithmic taper'],
      beginnerFriendly: true
    }
  ];

  const filteredComponents = components.filter(component => {
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Eye className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Visual Component Guide
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn to identify electronic components by sight. Click on any component to see detailed
              information, safety notes, and common uses.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Component Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredComponents.map((component) => (
            <div
              key={component.id}
              onClick={() => setSelectedComponent(component)}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all"
            >
              {/* Component Image */}
              {component.image && (
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-16 flex items-center justify-center bg-gray-50 rounded-lg">
                    <Image
                      src={component.image}
                      alt={component.name}
                      width={80}
                      height={50}
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">{component.name}</h3>
                <div className="flex items-center space-x-2">
                  {component.beginnerFriendly && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Beginner
                    </span>
                  )}
                  {component.polarity && (
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                      Polarity
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{component.description}</p>

              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <h4 className="font-medium text-gray-900 text-sm mb-1">Appearance:</h4>
                <p className="text-gray-700 text-xs">{component.appearance}</p>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 capitalize">{component.category}</span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Learn More →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Component Detail Modal */}
        {selectedComponent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedComponent.name}</h2>
                    <p className="text-gray-600 capitalize">{selectedComponent.category} component</p>
                  </div>
                  <button
                    onClick={() => setSelectedComponent(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-700">{selectedComponent.description}</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      How to Identify
                    </h3>
                    <p className="text-gray-700">{selectedComponent.appearance}</p>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Common Values/Types</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedComponent.commonValues.map((value) => (
                        <span key={value} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Common Uses</h3>
                    <ul className="text-gray-700 space-y-1">
                      {selectedComponent.uses.map((use, index) => (
                        <li key={index}>• {use}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2 text-orange-500" />
                      Safety Notes
                    </h3>
                    <ul className="text-gray-700 space-y-1">
                      {selectedComponent.safetyNotes.map((note, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      {selectedComponent.beginnerFriendly ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Beginner Friendly
                        </span>
                      ) : (
                        <span className="flex items-center text-orange-600">
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Advanced Component
                        </span>
                      )}

                      {selectedComponent.polarity && (
                        <span className="flex items-center text-orange-600">
                          <Zap className="h-4 w-4 mr-1" />
                          Has Polarity
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedComponent(null)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Component Identification Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-blue-900 mb-2">For Beginners:</h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Start with components marked "Beginner Friendly"</li>
                <li>• Always check polarity before connecting</li>
                <li>• Use a multimeter to verify component values</li>
                <li>• Keep components organized in labeled containers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Safety First:</h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Read component markings carefully</li>
                <li>• Check voltage and current ratings</li>
                <li>• When in doubt, look up the datasheet</li>
                <li>• Start with low voltages (5V or less)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentGuidePage;
