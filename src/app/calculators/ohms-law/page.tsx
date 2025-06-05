'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Calculator, RotateCcw, Info } from 'lucide-react';

const OhmsLawPage = () => {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [power, setPower] = useState('');
  const [calculating, setCalculating] = useState<'voltage' | 'current' | 'resistance' | 'power' | null>(null);

  useEffect(() => {
    if (calculating) {
      calculateMissingValue();
    }
  }, [voltage, current, resistance, power, calculating]);

  const calculateMissingValue = () => {
    const V = parseFloat(voltage);
    const I = parseFloat(current);
    const R = parseFloat(resistance);
    const P = parseFloat(power);

    switch (calculating) {
      case 'voltage':
        if (!isNaN(I) && !isNaN(R)) {
          setVoltage((I * R).toFixed(3));
          setPower((I * I * R).toFixed(3));
        } else if (!isNaN(P) && !isNaN(I)) {
          setVoltage((P / I).toFixed(3));
          setResistance((P / (I * I)).toFixed(3));
        } else if (!isNaN(P) && !isNaN(R)) {
          setVoltage(Math.sqrt(P * R).toFixed(3));
          setCurrent((Math.sqrt(P / R)).toFixed(3));
        }
        break;

      case 'current':
        if (!isNaN(V) && !isNaN(R)) {
          setCurrent((V / R).toFixed(3));
          setPower((V * V / R).toFixed(3));
        } else if (!isNaN(P) && !isNaN(V)) {
          setCurrent((P / V).toFixed(3));
          setResistance((V * V / P).toFixed(3));
        } else if (!isNaN(P) && !isNaN(R)) {
          setCurrent(Math.sqrt(P / R).toFixed(3));
          setVoltage(Math.sqrt(P * R).toFixed(3));
        }
        break;

      case 'resistance':
        if (!isNaN(V) && !isNaN(I)) {
          setResistance((V / I).toFixed(3));
          setPower((V * I).toFixed(3));
        } else if (!isNaN(V) && !isNaN(P)) {
          setResistance((V * V / P).toFixed(3));
          setCurrent((P / V).toFixed(3));
        } else if (!isNaN(I) && !isNaN(P)) {
          setResistance((P / (I * I)).toFixed(3));
          setVoltage((P / I).toFixed(3));
        }
        break;

      case 'power':
        if (!isNaN(V) && !isNaN(I)) {
          setPower((V * I).toFixed(3));
        } else if (!isNaN(V) && !isNaN(R)) {
          setPower((V * V / R).toFixed(3));
        } else if (!isNaN(I) && !isNaN(R)) {
          setPower((I * I * R).toFixed(3));
        }
        break;
    }
  };

  const handleInputChange = (
    value: string,
    setter: (value: string) => void,
    calculateType: 'voltage' | 'current' | 'resistance' | 'power'
  ) => {
    setter(value);
    if (value === '') {
      setCalculating(calculateType);
    } else {
      if (calculating === calculateType) {
        setCalculating(null);
      }
    }
  };

  const resetCalculator = () => {
    setVoltage('');
    setCurrent('');
    setResistance('');
    setPower('');
    setCalculating(null);
  };

  const formatUnit = (value: string, unit: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '';
    
    if (unit === 'A' && num < 1) {
      return `${(num * 1000).toFixed(1)} mA`;
    } else if (unit === 'Ω' && num >= 1000000) {
      return `${(num / 1000000).toFixed(2)} MΩ`;
    } else if (unit === 'Ω' && num >= 1000) {
      return `${(num / 1000).toFixed(2)} kΩ`;
    } else if (unit === 'W' && num < 1) {
      return `${(num * 1000).toFixed(1)} mW`;
    }
    return `${num.toFixed(3)} ${unit}`;
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
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Ohm's Law Calculator
            </h1>
            <p className="text-lg text-gray-600">
              Calculate voltage, current, resistance, or power using Ohm's Law and power formulas.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Calculator */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Calculator</h2>
            <button
              onClick={resetCalculator}
              className="inline-flex items-center text-gray-600 hover:text-blue-600"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Input Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voltage (V)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={voltage}
                    onChange={(e) => handleInputChange(e.target.value, setVoltage, 'voltage')}
                    placeholder="Enter voltage in volts"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      calculating === 'voltage' ? 'bg-blue-50 border-blue-300' : 'border-gray-300'
                    }`}
                  />
                  <span className="absolute right-3 top-3 text-gray-500">V</span>
                </div>
                {calculating === 'voltage' && (
                  <p className="text-xs text-blue-600 mt-1">This value will be calculated</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current (I)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={current}
                    onChange={(e) => handleInputChange(e.target.value, setCurrent, 'current')}
                    placeholder="Enter current in amperes"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      calculating === 'current' ? 'bg-blue-50 border-blue-300' : 'border-gray-300'
                    }`}
                  />
                  <span className="absolute right-3 top-3 text-gray-500">A</span>
                </div>
                {calculating === 'current' && (
                  <p className="text-xs text-blue-600 mt-1">This value will be calculated</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resistance (R)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={resistance}
                    onChange={(e) => handleInputChange(e.target.value, setResistance, 'resistance')}
                    placeholder="Enter resistance in ohms"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      calculating === 'resistance' ? 'bg-blue-50 border-blue-300' : 'border-gray-300'
                    }`}
                  />
                  <span className="absolute right-3 top-3 text-gray-500">Ω</span>
                </div>
                {calculating === 'resistance' && (
                  <p className="text-xs text-blue-600 mt-1">This value will be calculated</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Power (P)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={power}
                    onChange={(e) => handleInputChange(e.target.value, setPower, 'power')}
                    placeholder="Enter power in watts"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      calculating === 'power' ? 'bg-blue-50 border-blue-300' : 'border-gray-300'
                    }`}
                  />
                  <span className="absolute right-3 top-3 text-gray-500">W</span>
                </div>
                {calculating === 'power' && (
                  <p className="text-xs text-blue-600 mt-1">This value will be calculated</p>
                )}
              </div>
            </div>

            {/* Results */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Results</h3>
              <div className="space-y-4">
                {voltage && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Voltage:</span>
                    <span className="font-mono text-lg text-blue-600">{formatUnit(voltage, 'V')}</span>
                  </div>
                )}
                {current && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Current:</span>
                    <span className="font-mono text-lg text-blue-600">{formatUnit(current, 'A')}</span>
                  </div>
                )}
                {resistance && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Resistance:</span>
                    <span className="font-mono text-lg text-blue-600">{formatUnit(resistance, 'Ω')}</span>
                  </div>
                )}
                {power && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Power:</span>
                    <span className="font-mono text-lg text-blue-600">{formatUnit(power, 'W')}</span>
                  </div>
                )}
              </div>

              {!voltage && !current && !resistance && !power && (
                <div className="text-center text-gray-500 py-8">
                  <Calculator className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Enter any two values to calculate the others</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Formulas */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Formulas Used</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Ohm's Law</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-blue-50 p-3 rounded font-mono">V = I × R</div>
                <div className="bg-blue-50 p-3 rounded font-mono">I = V ÷ R</div>
                <div className="bg-blue-50 p-3 rounded font-mono">R = V ÷ I</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Power Formulas</h4>
              <div className="space-y-2 text-sm">
                <div className="bg-green-50 p-3 rounded font-mono">P = V × I</div>
                <div className="bg-green-50 p-3 rounded font-mono">P = V² ÷ R</div>
                <div className="bg-green-50 p-3 rounded font-mono">P = I² × R</div>
              </div>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Common Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">LED Circuit</h4>
              <div className="text-sm text-gray-700 space-y-1">
                <div>Voltage: 5V</div>
                <div>LED Forward Voltage: 2V</div>
                <div>LED Current: 20mA</div>
                <div className="font-medium text-blue-600">Resistor needed: 150Ω</div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Arduino Pin</h4>
              <div className="text-sm text-gray-700 space-y-1">
                <div>Voltage: 5V</div>
                <div>Max Current: 40mA</div>
                <div className="font-medium text-blue-600">Min Resistance: 125Ω</div>
                <div className="font-medium text-blue-600">Max Power: 0.2W</div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">9V Battery</h4>
              <div className="text-sm text-gray-700 space-y-1">
                <div>Voltage: 9V</div>
                <div>Load: 1kΩ</div>
                <div className="font-medium text-blue-600">Current: 9mA</div>
                <div className="font-medium text-blue-600">Power: 81mW</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-blue-900 mb-2">Tips for Using Ohm's Law</h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Always check that your calculated values make sense for your circuit</li>
                <li>• Remember that power dissipation creates heat - ensure components can handle it</li>
                <li>• Use safety margins: don't run components at their maximum ratings</li>
                <li>• For LEDs, subtract the forward voltage from supply voltage before calculating</li>
                <li>• Double-check your units: mA vs A, kΩ vs Ω, mW vs W</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OhmsLawPage;
