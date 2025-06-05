'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lightbulb, Calculator, RotateCcw, AlertTriangle } from 'lucide-react';

const LEDResistorPage = () => {
  const [supplyVoltage, setSupplyVoltage] = useState('5');
  const [ledType, setLedType] = useState('red');
  const [ledCurrent, setLedCurrent] = useState('20');
  const [ledCount, setLedCount] = useState('1');
  const [configuration, setConfiguration] = useState<'series' | 'parallel'>('series');
  
  const [calculatedResistance, setCalculatedResistance] = useState<number | null>(null);
  const [powerDissipation, setPowerDissipation] = useState<number | null>(null);
  const [recommendedResistor, setRecommendedResistor] = useState<string>('');

  const ledTypes = {
    red: { voltage: 1.8, color: '#FF0000' },
    orange: { voltage: 2.0, color: '#FFA500' },
    yellow: { voltage: 2.1, color: '#FFFF00' },
    green: { voltage: 2.1, color: '#00FF00' },
    blue: { voltage: 3.2, color: '#0000FF' },
    white: { voltage: 3.2, color: '#FFFFFF' },
    uv: { voltage: 3.4, color: '#8A2BE2' }
  };

  const standardResistors = [
    10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82, 100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820,
    1000, 1200, 1500, 1800, 2200, 2700, 3300, 3900, 4700, 5600, 6800, 8200, 10000
  ];

  useEffect(() => {
    calculateResistor();
  }, [supplyVoltage, ledType, ledCurrent, ledCount, configuration]);

  const calculateResistor = () => {
    const Vs = parseFloat(supplyVoltage);
    const Vf = ledTypes[ledType as keyof typeof ledTypes].voltage;
    const If = parseFloat(ledCurrent) / 1000; // Convert mA to A
    const count = parseInt(ledCount);

    if (isNaN(Vs) || isNaN(If) || isNaN(count) || count <= 0) {
      setCalculatedResistance(null);
      setPowerDissipation(null);
      setRecommendedResistor('');
      return;
    }

    let resistance: number;
    let current: number;

    if (configuration === 'series') {
      const totalVf = Vf * count;
      if (Vs <= totalVf) {
        setCalculatedResistance(null);
        setPowerDissipation(null);
        setRecommendedResistor('Insufficient voltage for series configuration');
        return;
      }
      resistance = (Vs - totalVf) / If;
      current = If;
    } else {
      // Parallel configuration
      resistance = (Vs - Vf) / (If * count);
      current = If * count;
    }

    setCalculatedResistance(resistance);
    setPowerDissipation((Vs - (configuration === 'series' ? Vf * count : Vf)) * current);

    // Find nearest standard resistor
    const nearestResistor = standardResistors.reduce((prev, curr) => 
      Math.abs(curr - resistance) < Math.abs(prev - resistance) ? curr : prev
    );
    
    setRecommendedResistor(formatResistance(nearestResistor));
  };

  const formatResistance = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}MΩ`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}kΩ`;
    } else {
      return `${Math.round(value)}Ω`;
    }
  };

  const formatPower = (value: number) => {
    if (value < 0.001) {
      return `${(value * 1000000).toFixed(1)}µW`;
    } else if (value < 1) {
      return `${(value * 1000).toFixed(1)}mW`;
    } else {
      return `${value.toFixed(2)}W`;
    }
  };

  const getRecommendedWattage = (power: number) => {
    if (power <= 0.125) return '1/8W (0.125W)';
    if (power <= 0.25) return '1/4W (0.25W)';
    if (power <= 0.5) return '1/2W (0.5W)';
    if (power <= 1) return '1W';
    if (power <= 2) return '2W';
    return '5W or higher';
  };

  const resetCalculator = () => {
    setSupplyVoltage('5');
    setLedType('red');
    setLedCurrent('20');
    setLedCount('1');
    setConfiguration('series');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <Link
              href="/calculators"
              className="inline-flex items-center text-gray-600 hover:text-blue-600 mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Calculators
            </Link>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              LED Current Limiting Resistor Calculator
            </h1>
            <p className="text-lg text-gray-600">
              Calculate the correct resistor value to safely drive LEDs at your desired brightness.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Calculator */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">LED Resistor Calculator</h2>
            <button
              onClick={resetCalculator}
              className="inline-flex items-center text-gray-600 hover:text-blue-600"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supply Voltage
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={supplyVoltage}
                    onChange={(e) => setSupplyVoltage(e.target.value)}
                    placeholder="e.g., 5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-3 text-gray-500">V</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LED Type
                </label>
                <select
                  value={ledType}
                  onChange={(e) => setLedType(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Object.entries(ledTypes).map(([type, data]) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)} LED ({data.voltage}V)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LED Current
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={ledCurrent}
                    onChange={(e) => setLedCurrent(e.target.value)}
                    placeholder="e.g., 20"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-3 text-gray-500">mA</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Typical: 20mA for standard LEDs</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of LEDs
                </label>
                <input
                  type="number"
                  value={ledCount}
                  onChange={(e) => setLedCount(e.target.value)}
                  min="1"
                  placeholder="e.g., 1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Configuration
                </label>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setConfiguration('series')}
                    className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                      configuration === 'series'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    Series
                  </button>
                  <button
                    onClick={() => setConfiguration('parallel')}
                    className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
                      configuration === 'parallel'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    Parallel
                  </button>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Results</h3>
              
              {calculatedResistance !== null && powerDissipation !== null ? (
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Calculated Resistance:</span>
                      <span className="font-mono text-lg text-blue-600">
                        {formatResistance(calculatedResistance)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Recommended Resistor:</span>
                      <span className="font-mono text-lg text-green-600 font-bold">
                        {recommendedResistor}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Power Dissipation:</span>
                      <span className="font-mono text-lg text-orange-600">
                        {formatPower(powerDissipation)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Recommended Wattage:</span>
                      <span className="font-mono text-sm text-purple-600">
                        {getRecommendedWattage(powerDissipation)}
                      </span>
                    </div>
                  </div>

                  {/* Circuit Diagram */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-3">Circuit Diagram</h4>
                    <div className="flex items-center justify-center space-x-4 py-4">
                      <div className="text-center">
                        <div className="w-8 h-8 bg-red-500 rounded border-2 border-gray-400 mb-1"></div>
                        <span className="text-xs text-gray-600">+{supplyVoltage}V</span>
                      </div>
                      <div className="w-8 h-1 bg-gray-400"></div>
                      <div className="text-center">
                        <div className="w-12 h-6 bg-yellow-200 border-2 border-gray-400 rounded flex items-center justify-center">
                          <span className="text-xs">R</span>
                        </div>
                        <span className="text-xs text-gray-600">{recommendedResistor}</span>
                      </div>
                      <div className="w-8 h-1 bg-gray-400"></div>
                      <div className="text-center">
                        <div 
                          className="w-8 h-8 rounded-full border-2 border-gray-400 mb-1"
                          style={{ backgroundColor: ledTypes[ledType as keyof typeof ledTypes].color }}
                        ></div>
                        <span className="text-xs text-gray-600">LED</span>
                      </div>
                      <div className="w-8 h-1 bg-gray-400"></div>
                      <div className="text-center">
                        <div className="w-8 h-8 bg-black rounded border-2 border-gray-400 mb-1"></div>
                        <span className="text-xs text-gray-600">GND</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  {recommendedResistor === 'Insufficient voltage for series configuration' ? (
                    <div className="text-red-600">
                      <AlertTriangle className="h-12 w-12 mx-auto mb-2" />
                      <p className="font-medium">Insufficient Voltage</p>
                      <p className="text-sm">Supply voltage is too low for this LED configuration</p>
                    </div>
                  ) : (
                    <>
                      <Calculator className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Enter values to calculate resistor</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LED Reference */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">LED Reference</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">LED Color</th>
                  <th className="text-left py-2">Forward Voltage</th>
                  <th className="text-left py-2">Typical Current</th>
                  <th className="text-left py-2">Common Uses</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(ledTypes).map(([color, data]) => (
                  <tr key={color} className="border-b border-gray-100">
                    <td className="py-2 flex items-center">
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300 mr-2"
                        style={{ backgroundColor: data.color }}
                      />
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </td>
                    <td className="py-2">{data.voltage}V</td>
                    <td className="py-2">20mA</td>
                    <td className="py-2 text-xs text-gray-600">
                      {color === 'red' && 'Power indicators, status lights'}
                      {color === 'green' && 'Status indicators, displays'}
                      {color === 'blue' && 'Decorative lighting, displays'}
                      {color === 'white' && 'General lighting, backlighting'}
                      {color === 'yellow' && 'Warning indicators'}
                      {color === 'orange' && 'Warning lights, indicators'}
                      {color === 'uv' && 'UV applications, special effects'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4">LED Safety Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Current Limiting</h4>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Always use a current-limiting resistor with LEDs</li>
                <li>• Never connect LEDs directly to power sources</li>
                <li>• Check LED polarity: longer leg is positive (+)</li>
                <li>• Use lower current for longer LED life</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Power Considerations</h4>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Choose resistor wattage 2x calculated power</li>
                <li>• Higher wattage resistors run cooler</li>
                <li>• Consider heat dissipation in enclosed spaces</li>
                <li>• Use heat sinks for high-power applications</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LEDResistorPage;
