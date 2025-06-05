'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Palette, Calculator, Info, RotateCcw } from 'lucide-react';

const ResistorColorCodePage = () => {
  const [mode, setMode] = useState<'color-to-value' | 'value-to-color'>('color-to-value');
  const [bandCount, setBandCount] = useState<4 | 5>(4);
  const [selectedColors, setSelectedColors] = useState<string[]>(['black', 'black', 'black', 'gold']);
  const [inputValue, setInputValue] = useState('');
  const [calculatedValue, setCalculatedValue] = useState<number | null>(null);
  const [tolerance, setTolerance] = useState<number | null>(null);

  const colors = {
    black: { value: 0, multiplier: 1, color: '#000000', tolerance: null },
    brown: { value: 1, multiplier: 10, color: '#8B4513', tolerance: 1 },
    red: { value: 2, multiplier: 100, color: '#FF0000', tolerance: 2 },
    orange: { value: 3, multiplier: 1000, color: '#FFA500', tolerance: null },
    yellow: { value: 4, multiplier: 10000, color: '#FFFF00', tolerance: null },
    green: { value: 5, multiplier: 100000, color: '#008000', tolerance: 0.5 },
    blue: { value: 6, multiplier: 1000000, color: '#0000FF', tolerance: 0.25 },
    violet: { value: 7, multiplier: 10000000, color: '#8A2BE2', tolerance: 0.1 },
    gray: { value: 8, multiplier: 100000000, color: '#808080', tolerance: 0.05 },
    white: { value: 9, multiplier: 1000000000, color: '#FFFFFF', tolerance: null },
    gold: { value: null, multiplier: 0.1, color: '#FFD700', tolerance: 5 },
    silver: { value: null, multiplier: 0.01, color: '#C0C0C0', tolerance: 10 }
  };

  const toleranceColors = {
    brown: 1,
    red: 2,
    green: 0.5,
    blue: 0.25,
    violet: 0.1,
    gray: 0.05,
    gold: 5,
    silver: 10
  };

  useEffect(() => {
    if (mode === 'color-to-value') {
      calculateValueFromColors();
    }
  }, [selectedColors, bandCount, mode]);

  const calculateValueFromColors = () => {
    if (bandCount === 4) {
      const digit1 = colors[selectedColors[0] as keyof typeof colors]?.value;
      const digit2 = colors[selectedColors[1] as keyof typeof colors]?.value;
      const multiplier = colors[selectedColors[2] as keyof typeof colors]?.multiplier;
      const toleranceColor = selectedColors[3];

      if (digit1 !== null && digit2 !== null && multiplier !== null) {
        const value = (digit1 * 10 + digit2) * multiplier;
        setCalculatedValue(value);
        setTolerance(toleranceColors[toleranceColor as keyof typeof toleranceColors] || null);
      }
    } else {
      const digit1 = colors[selectedColors[0] as keyof typeof colors]?.value;
      const digit2 = colors[selectedColors[1] as keyof typeof colors]?.value;
      const digit3 = colors[selectedColors[2] as keyof typeof colors]?.value;
      const multiplier = colors[selectedColors[3] as keyof typeof colors]?.multiplier;
      const toleranceColor = selectedColors[4];

      if (digit1 !== null && digit2 !== null && digit3 !== null && multiplier !== null) {
        const value = (digit1 * 100 + digit2 * 10 + digit3) * multiplier;
        setCalculatedValue(value);
        setTolerance(toleranceColors[toleranceColor as keyof typeof toleranceColors] || null);
      }
    }
  };

  const formatResistance = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}MΩ`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}kΩ`;
    } else {
      return `${value}Ω`;
    }
  };

  const updateColor = (bandIndex: number, color: string) => {
    const newColors = [...selectedColors];
    newColors[bandIndex] = color;
    setSelectedColors(newColors);
  };

  const resetCalculator = () => {
    setSelectedColors(['black', 'black', 'black', 'gold']);
    setInputValue('');
    setCalculatedValue(null);
    setTolerance(null);
  };

  const getAvailableColors = (bandIndex: number) => {
    if (bandIndex === bandCount - 1) {
      // Tolerance band
      return Object.keys(toleranceColors);
    } else if (bandIndex === bandCount - 2) {
      // Multiplier band
      return Object.keys(colors);
    } else {
      // Digit bands
      return Object.keys(colors).filter(color => colors[color as keyof typeof colors].value !== null);
    }
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
              <Palette className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Resistor Color Code Calculator
            </h1>
            <p className="text-lg text-gray-600">
              Decode resistor values from color bands or find the color combination for a specific resistance.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mode Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setMode('color-to-value')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  mode === 'color-to-value'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Colors → Value
              </button>
              <button
                onClick={() => setMode('value-to-color')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  mode === 'value-to-color'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Value → Colors
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setBandCount(4)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    bandCount === 4
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  4 Bands
                </button>
                <button
                  onClick={() => setBandCount(5)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    bandCount === 5
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  5 Bands
                </button>
              </div>

              <button
                onClick={resetCalculator}
                className="inline-flex items-center text-gray-600 hover:text-blue-600"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </button>
            </div>
          </div>

          {mode === 'color-to-value' ? (
            <div>
              {/* Resistor Visualization */}
              <div className="bg-gray-50 rounded-lg p-8 mb-6">
                <div className="flex justify-center">
                  <div className="relative">
                    {/* Resistor body */}
                    <div className="w-80 h-16 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-lg border-2 border-gray-300 flex items-center justify-center relative">
                      {/* Color bands */}
                      {selectedColors.slice(0, bandCount).map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-12 border border-gray-400 mx-1"
                          style={{ backgroundColor: colors[color as keyof typeof colors]?.color }}
                        />
                      ))}
                      
                      {/* Resistor leads */}
                      <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-1 bg-gray-400"></div>
                      <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-8 h-1 bg-gray-400"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-4 mb-6">
                {selectedColors.slice(0, bandCount).map((selectedColor, bandIndex) => (
                  <div key={bandIndex} className="flex items-center space-x-4">
                    <div className="w-20 text-sm font-medium text-gray-700">
                      {bandIndex === bandCount - 1 ? 'Tolerance' : 
                       bandIndex === bandCount - 2 ? 'Multiplier' : 
                       `Digit ${bandIndex + 1}`}:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getAvailableColors(bandIndex).map((color) => (
                        <button
                          key={color}
                          onClick={() => updateColor(bandIndex, color)}
                          className={`w-8 h-8 rounded border-2 transition-all ${
                            selectedColor === color
                              ? 'border-blue-500 scale-110'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: colors[color as keyof typeof colors]?.color }}
                          title={color.charAt(0).toUpperCase() + color.slice(1)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Result */}
              {calculatedValue !== null && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-2">Calculated Value</h3>
                  <div className="text-3xl font-bold text-green-800 mb-2">
                    {formatResistance(calculatedValue)}
                  </div>
                  {tolerance && (
                    <div className="text-green-700">
                      Tolerance: ±{tolerance}%
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* Value Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Resistance Value (in Ohms)
                </label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="e.g., 1000 for 1kΩ"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-center">
                  <Info className="h-5 w-5 text-yellow-600 mr-2" />
                  <span className="text-yellow-800">
                    Value-to-color conversion coming soon! This feature will help you find the correct 
                    color bands for a specific resistance value.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reference Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Color Code Reference</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">Color</th>
                  <th className="text-left py-2">Digit Value</th>
                  <th className="text-left py-2">Multiplier</th>
                  <th className="text-left py-2">Tolerance</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(colors).map(([colorName, colorData]) => (
                  <tr key={colorName} className="border-b border-gray-100">
                    <td className="py-2 flex items-center">
                      <div
                        className="w-6 h-6 rounded border border-gray-300 mr-2"
                        style={{ backgroundColor: colorData.color }}
                      />
                      {colorName.charAt(0).toUpperCase() + colorName.slice(1)}
                    </td>
                    <td className="py-2">{colorData.value !== null ? colorData.value : '-'}</td>
                    <td className="py-2">×{colorData.multiplier}</td>
                    <td className="py-2">{colorData.tolerance !== null ? `±${colorData.tolerance}%` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Tips for Reading Resistor Colors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Reading Direction</h4>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Start from the end with bands closer together</li>
                <li>• Tolerance band (gold/silver) is usually separated</li>
                <li>• If unsure, try both directions and see which makes sense</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Common Values</h4>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• 220Ω: Red-Red-Brown-Gold</li>
                <li>• 1kΩ: Brown-Black-Red-Gold</li>
                <li>• 10kΩ: Brown-Black-Orange-Gold</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResistorColorCodePage;
