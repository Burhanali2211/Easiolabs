'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Square, RotateCcw, Zap, Info, Settings, Lightbulb } from 'lucide-react';

const CircuitSimulatorPage = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [circuitComponents, setCircuitComponents] = useState<any[]>([]);
  const [voltage, setVoltage] = useState(5);
  const [showValues, setShowValues] = useState(true);

  const components = [
    { id: 'battery', name: 'Battery', icon: '🔋', color: 'bg-red-100', category: 'Power', image: '/images/components/battery.svg' },
    { id: 'resistor', name: 'Resistor', icon: '⚡', color: 'bg-yellow-100', category: 'Passive', image: '/images/components/resistor.svg' },
    { id: 'capacitor', name: 'Capacitor', icon: '🔌', color: 'bg-purple-100', category: 'Passive', image: '/images/components/capacitor.svg' },
    { id: 'inductor', name: 'Inductor', icon: '🌀', color: 'bg-indigo-100', category: 'Passive', image: '/images/components/inductor.svg' },
    { id: 'led', name: 'LED', icon: '💡', color: 'bg-blue-100', category: 'Output', image: '/images/components/led.svg' },
    { id: 'diode', name: 'Diode', icon: '🔺', color: 'bg-orange-100', category: 'Semiconductor', image: '/images/components/diode.svg' },
    { id: 'transistor', name: 'Transistor', icon: '🔀', color: 'bg-pink-100', category: 'Semiconductor', image: '/images/components/transistor.svg' },
    { id: 'switch', name: 'Switch', icon: '🔘', color: 'bg-green-100', category: 'Control', image: '/images/components/switch.svg' },
    { id: 'potentiometer', name: 'Potentiometer', icon: '🎛️', color: 'bg-cyan-100', category: 'Control', image: '/images/components/potentiometer.svg' },
    { id: 'wire', name: 'Wire', icon: '➖', color: 'bg-gray-100', category: 'Connection', image: '/images/components/wire.svg' }
  ];

  const presetCircuits = [
    {
      name: 'Basic LED Circuit',
      description: 'Simple LED with current-limiting resistor',
      difficulty: 'Beginner',
      components: [
        { type: 'battery', x: 50, y: 100, value: 5 },
        { type: 'resistor', x: 150, y: 100, value: 220 },
        { type: 'led', x: 250, y: 100, value: 2.0 }
      ]
    },
    {
      name: 'LED with Switch',
      description: 'Controllable LED circuit with switch',
      difficulty: 'Beginner',
      components: [
        { type: 'battery', x: 50, y: 100, value: 5 },
        { type: 'switch', x: 120, y: 100, value: true },
        { type: 'resistor', x: 190, y: 100, value: 330 },
        { type: 'led', x: 260, y: 100, value: 2.0 }
      ]
    },
    {
      name: 'Voltage Divider',
      description: 'Two resistors dividing voltage',
      difficulty: 'Beginner',
      components: [
        { type: 'battery', x: 50, y: 80, value: 9 },
        { type: 'resistor', x: 150, y: 80, value: 1000 },
        { type: 'resistor', x: 150, y: 140, value: 2000 }
      ]
    },
    {
      name: 'RC Circuit',
      description: 'Resistor-Capacitor charging circuit',
      difficulty: 'Intermediate',
      components: [
        { type: 'battery', x: 50, y: 100, value: 9 },
        { type: 'resistor', x: 150, y: 100, value: 1000 },
        { type: 'capacitor', x: 250, y: 100, value: 100 },
        { type: 'switch', x: 100, y: 100, value: false }
      ]
    },
    {
      name: 'Diode Rectifier',
      description: 'Half-wave rectifier with diode',
      difficulty: 'Intermediate',
      components: [
        { type: 'battery', x: 50, y: 100, value: 5 },
        { type: 'diode', x: 150, y: 100, value: 0.7 },
        { type: 'resistor', x: 250, y: 100, value: 470 },
        { type: 'led', x: 350, y: 100, value: 2.0 }
      ]
    },
    {
      name: 'Transistor Switch',
      description: 'NPN transistor as a switch',
      difficulty: 'Advanced',
      components: [
        { type: 'battery', x: 50, y: 80, value: 9 },
        { type: 'resistor', x: 150, y: 80, value: 1000 },
        { type: 'transistor', x: 250, y: 100, value: 'NPN' },
        { type: 'resistor', x: 350, y: 80, value: 220 },
        { type: 'led', x: 450, y: 80, value: 2.0 }
      ]
    }
  ];

  const loadPresetCircuit = (preset: any) => {
    setCircuitComponents(preset.components);
    setIsRunning(false);
  };

  const clearCircuit = () => {
    setCircuitComponents([]);
    setIsRunning(false);
    setSelectedComponent(null);
  };

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  const calculateCircuitValues = () => {
    // Simple calculation for demonstration
    const battery = circuitComponents.find(c => c.type === 'battery');
    const resistors = circuitComponents.filter(c => c.type === 'resistor');
    const leds = circuitComponents.filter(c => c.type === 'led');

    if (!battery) return null;

    let totalResistance = resistors.reduce((sum, r) => sum + r.value, 0);
    let totalVoltage = battery.value;

    // Subtract LED forward voltages
    leds.forEach(led => {
      totalVoltage -= led.value;
    });

    const current = totalResistance > 0 ? totalVoltage / totalResistance : 0;
    const power = current * battery.value;

    return {
      voltage: totalVoltage,
      current: current * 1000, // Convert to mA
      resistance: totalResistance,
      power: power * 1000 // Convert to mW
    };
  };

  const circuitValues = calculateCircuitValues();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Circuit Simulator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Build and simulate basic electronic circuits. Perfect for learning how components work together!
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Component Palette */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Components</h3>
              <div className="space-y-4">
                {['Power', 'Passive', 'Semiconductor', 'Output', 'Control', 'Connection'].map((category) => {
                  const categoryComponents = components.filter(c => c.category === category);
                  if (categoryComponents.length === 0) return null;

                  return (
                    <div key={category}>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">{category}</h4>
                      <div className="space-y-1">
                        {categoryComponents.map((component) => (
                          <button
                            key={component.id}
                            onClick={() => setSelectedComponent(component.id)}
                            className={`w-full p-2 rounded-lg border-2 transition-all text-sm ${selectedComponent === component.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                              } ${component.color}`}
                          >
                            <div className="flex items-center">
                              <span className="text-lg mr-2">{component.icon}</span>
                              <span className="font-medium">{component.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preset Circuits */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Preset Circuits</h3>
              <div className="space-y-2">
                {presetCircuits.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => loadPresetCircuit(preset)}
                    className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium text-gray-900">{preset.name}</div>
                      <span className={`text-xs px-2 py-1 rounded ${preset.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        preset.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                        {preset.difficulty}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">{preset.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Controls</h3>
              <div className="space-y-3">
                <button
                  onClick={toggleSimulation}
                  className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${isRunning
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                >
                  {isRunning ? (
                    <>
                      <Square className="h-4 w-4 mr-2" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start
                    </>
                  )}
                </button>

                <button
                  onClick={clearCircuit}
                  className="w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium bg-gray-600 text-white hover:bg-gray-700 transition-colors"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </button>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="showValues"
                    checked={showValues}
                    onChange={(e) => setShowValues(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="showValues" className="text-sm text-gray-700">
                    Show Values
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Circuit Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Circuit Canvas</h3>
                <div className="flex items-center space-x-2">
                  <Settings className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {isRunning ? 'Simulation Running' : 'Simulation Stopped'}
                  </span>
                  <div className={`w-3 h-3 rounded-full ${isRunning ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
              </div>

              {/* Canvas Area */}
              <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 h-96 relative overflow-hidden">
                {circuitComponents.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <Zap className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Select a component or load a preset circuit to get started</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative h-full">
                    {/* Render circuit components */}
                    {circuitComponents.map((component, index) => (
                      <div
                        key={index}
                        className={`absolute w-16 h-16 rounded-lg border-2 flex items-center justify-center text-2xl ${isRunning ? 'border-green-500 bg-green-50' : 'border-gray-400 bg-white'
                          }`}
                        style={{ left: component.x, top: component.y }}
                      >
                        {component.type === 'battery' && '🔋'}
                        {component.type === 'resistor' && '⚡'}
                        {component.type === 'capacitor' && '🔌'}
                        {component.type === 'inductor' && '🌀'}
                        {component.type === 'led' && (isRunning ? '💡' : '⚪')}
                        {component.type === 'diode' && '🔺'}
                        {component.type === 'transistor' && '🔀'}
                        {component.type === 'switch' && (component.value ? '🟢' : '🔴')}
                        {component.type === 'potentiometer' && '🎛️'}
                        {component.type === 'wire' && '➖'}

                        {showValues && (
                          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs bg-white px-1 rounded border">
                            {component.type === 'battery' && `${component.value}V`}
                            {component.type === 'resistor' && `${component.value}Ω`}
                            {component.type === 'capacitor' && `${component.value}µF`}
                            {component.type === 'inductor' && `${component.value}mH`}
                            {component.type === 'led' && `${component.value}V`}
                            {component.type === 'diode' && `${component.value}V`}
                            {component.type === 'transistor' && `${component.value}`}
                            {component.type === 'potentiometer' && `${component.value}Ω`}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Simple wire connections */}
                    {circuitComponents.length > 1 && (
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {circuitComponents.slice(0, -1).map((component, index) => {
                          const nextComponent = circuitComponents[index + 1];
                          return (
                            <line
                              key={index}
                              x1={component.x + 32}
                              y1={component.y + 32}
                              x2={nextComponent.x + 32}
                              y2={nextComponent.y + 32}
                              stroke={isRunning ? "#10B981" : "#6B7280"}
                              strokeWidth="3"
                              className={isRunning ? "animate-pulse" : ""}
                            />
                          );
                        })}
                      </svg>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Circuit Analysis</h3>

              {circuitValues && isRunning ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-sm text-blue-700 mb-1">Voltage Drop</div>
                    <div className="text-xl font-bold text-blue-900">
                      {circuitValues.voltage.toFixed(2)}V
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="text-sm text-green-700 mb-1">Current</div>
                    <div className="text-xl font-bold text-green-900">
                      {circuitValues.current.toFixed(1)}mA
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-3">
                    <div className="text-sm text-yellow-700 mb-1">Total Resistance</div>
                    <div className="text-xl font-bold text-yellow-900">
                      {circuitValues.resistance}Ω
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="text-sm text-purple-700 mb-1">Power</div>
                    <div className="text-xl font-bold text-purple-900">
                      {circuitValues.power.toFixed(1)}mW
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Build a circuit and start simulation to see analysis</p>
                </div>
              )}
            </div>

            {/* Help */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-bold text-blue-900 mb-2">How to Use</h4>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Load a preset circuit to get started</li>
                <li>• Click "Start" to run the simulation</li>
                <li>• Watch components light up when active</li>
                <li>• Check the analysis panel for calculations</li>
                <li>• Toggle "Show Values" to see component values</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Educational Notes */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Understanding Circuit Simulation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Basic LED Circuit</h4>
              <p className="text-gray-700 text-sm">
                The most fundamental circuit: a battery, current-limiting resistor, and LED.
                The resistor prevents too much current from flowing through the LED.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Ohm's Law in Action</h4>
              <p className="text-gray-700 text-sm">
                Watch how voltage, current, and resistance relate to each other.
                Change component values to see how it affects the entire circuit.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Power Calculations</h4>
              <p className="text-gray-700 text-sm">
                See how much power your circuit consumes. This is important for
                battery life and component heat dissipation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitSimulatorPage;
