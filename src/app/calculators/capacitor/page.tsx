'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, RotateCcw, Info, Zap } from 'lucide-react';

const CapacitorCalculatorPage = () => {
  const [capacitance, setCapacitance] = useState('100');
  const [capacitanceUnit, setCapacitanceUnit] = useState('µF');
  const [frequency, setFrequency] = useState('1000');
  const [voltage, setVoltage] = useState('5');
  const [resistance, setResistance] = useState('1000');
  const [calculationMode, setCalculationMode] = useState<'reactance' | 'timeConstant' | 'energy'>('reactance');
  
  const [reactance, setReactance] = useState<number | null>(null);
  const [timeConstant, setTimeConstant] = useState<number | null>(null);
  const [cutoffFrequency, setCutoffFrequency] = useState<number | null>(null);
  const [energy, setEnergy] = useState<number | null>(null);
  const [chargingTime, setChargingTime] = useState<number | null>(null);

  const capacitanceUnits = {
    'F': 1,
    'mF': 1e-3,
    'µF': 1e-6,
    'nF': 1e-9,
    'pF': 1e-12
  };

  const convertCapacitance = (value: number, unit: string): number => {
    return value * capacitanceUnits[unit as keyof typeof capacitanceUnits];
  };

  const formatTime = (seconds: number): string => {
    if (seconds >= 1) {
      return `${seconds.toFixed(3)} s`;
    } else if (seconds >= 1e-3) {
      return `${(seconds * 1e3).toFixed(1)} ms`;
    } else if (seconds >= 1e-6) {
      return `${(seconds * 1e6).toFixed(1)} µs`;
    } else {
      return `${(seconds * 1e9).toFixed(1)} ns`;
    }
  };

  const formatFrequency = (freq: number): string => {
    if (freq >= 1e6) {
      return `${(freq / 1e6).toFixed(2)} MHz`;
    } else if (freq >= 1e3) {
      return `${(freq / 1e3).toFixed(2)} kHz`;
    } else {
      return `${freq.toFixed(2)} Hz`;
    }
  };

  const calculateValues = () => {
    const C = convertCapacitance(parseFloat(capacitance), capacitanceUnit);
    const f = parseFloat(frequency);
    const V = parseFloat(voltage);
    const R = parseFloat(resistance);

    if (isNaN(C) || isNaN(f) || isNaN(V) || isNaN(R) || C <= 0 || f <= 0 || V <= 0 || R <= 0) {
      setReactance(null);
      setTimeConstant(null);
      setCutoffFrequency(null);
      setEnergy(null);
      setChargingTime(null);
      return;
    }

    // Capacitive Reactance: Xc = 1 / (2πfC)
    const Xc = 1 / (2 * Math.PI * f * C);
    setReactance(Xc);

    // Time Constant: τ = RC
    const tau = R * C;
    setTimeConstant(tau);

    // Cutoff Frequency: fc = 1 / (2πRC)
    const fc = 1 / (2 * Math.PI * R * C);
    setCutoffFrequency(fc);

    // Energy stored: E = 0.5 * C * V²
    const E = 0.5 * C * V * V;
    setEnergy(E);

    // Time to charge to 63.2% (1 time constant)
    setChargingTime(tau);
  };

  const resetCalculator = () => {
    setCapacitance('100');
    setCapacitanceUnit('µF');
    setFrequency('1000');
    setVoltage('5');
    setResistance('1000');
    setCalculationMode('reactance');
    setReactance(null);
    setTimeConstant(null);
    setCutoffFrequency(null);
    setEnergy(null);
    setChargingTime(null);
  };

  useEffect(() => {
    calculateValues();
  }, [capacitance, capacitanceUnit, frequency, voltage, resistance]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/calculators"
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Calculators
            </Link>
            <button
              onClick={resetCalculator}
              className="flex items-center text-gray-600 hover:text-gray-700"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </button>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Capacitor Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calculate capacitive reactance, time constants, energy storage, and RC circuit parameters
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Input Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Input Parameters</h2>
              
              {/* Capacitance */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacitance
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={capacitance}
                    onChange={(e) => setCapacitance(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter capacitance"
                    step="0.1"
                  />
                  <select
                    value={capacitanceUnit}
                    onChange={(e) => setCapacitanceUnit(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="F">F</option>
                    <option value="mF">mF</option>
                    <option value="µF">µF</option>
                    <option value="nF">nF</option>
                    <option value="pF">pF</option>
                  </select>
                </div>
              </div>

              {/* Frequency */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency (Hz)
                </label>
                <input
                  type="number"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter frequency"
                  step="1"
                />
              </div>

              {/* Voltage */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Voltage (V)
                </label>
                <input
                  type="number"
                  value={voltage}
                  onChange={(e) => setVoltage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter voltage"
                  step="0.1"
                />
              </div>

              {/* Resistance */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resistance (Ω) - for RC calculations
                </label>
                <input
                  type="number"
                  value={resistance}
                  onChange={(e) => setResistance(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter resistance"
                  step="1"
                />
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Calculated Values</h2>
              
              <div className="space-y-4">
                {/* Capacitive Reactance */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-bold text-purple-900 mb-2">Capacitive Reactance (Xc)</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {reactance !== null ? `${reactance.toFixed(2)} Ω` : '---'}
                  </p>
                  <p className="text-sm text-purple-700 mt-1">
                    Xc = 1 / (2πfC)
                  </p>
                </div>

                {/* Time Constant */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-bold text-blue-900 mb-2">Time Constant (τ)</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {timeConstant !== null ? formatTime(timeConstant) : '---'}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    τ = RC
                  </p>
                </div>

                {/* Cutoff Frequency */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-green-900 mb-2">Cutoff Frequency (fc)</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {cutoffFrequency !== null ? formatFrequency(cutoffFrequency) : '---'}
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    fc = 1 / (2πRC)
                  </p>
                </div>

                {/* Energy Stored */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-bold text-yellow-900 mb-2">Energy Stored</h3>
                  <p className="text-2xl font-bold text-yellow-600">
                    {energy !== null ? `${(energy * 1e6).toFixed(3)} µJ` : '---'}
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    E = ½CV²
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="mt-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Info className="h-6 w-6 text-purple-600 mr-2" />
              <h3 className="text-lg font-bold text-purple-900">Understanding Capacitors</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-purple-800">
              <div>
                <h4 className="font-medium mb-2">Key Properties:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Store electrical energy in an electric field</li>
                  <li>• Block DC current, allow AC current</li>
                  <li>• Reactance decreases with frequency</li>
                  <li>• Charge and discharge through resistors</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Common Applications:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Power supply filtering</li>
                  <li>• AC coupling and decoupling</li>
                  <li>• Timing circuits (RC)</li>
                  <li>• Energy storage systems</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RC Circuit Information */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">RC Circuit Behavior</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-blue-800">
              <div>
                <h4 className="font-medium mb-2">Charging:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 63.2% charged after 1τ</li>
                  <li>• 86.5% charged after 2τ</li>
                  <li>• 95.0% charged after 3τ</li>
                  <li>• 99.3% charged after 5τ</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Discharging:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 36.8% remains after 1τ</li>
                  <li>• 13.5% remains after 2τ</li>
                  <li>• 5.0% remains after 3τ</li>
                  <li>• 0.7% remains after 5τ</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Frequency Response:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Low-pass filter behavior</li>
                  <li>• -3dB at cutoff frequency</li>
                  <li>• -20dB/decade rolloff</li>
                  <li>• Phase shift: 0° to -90°</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CapacitorCalculatorPage;
