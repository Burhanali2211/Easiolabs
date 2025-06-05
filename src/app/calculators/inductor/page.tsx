'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, RotateCcw, Info, Zap } from 'lucide-react';

const InductorCalculatorPage = () => {
  const [inductance, setInductance] = useState('10');
  const [inductanceUnit, setInductanceUnit] = useState('mH');
  const [frequency, setFrequency] = useState('1000');
  const [current, setCurrent] = useState('0.1');
  const [resistance, setResistance] = useState('100');
  
  const [reactance, setReactance] = useState<number | null>(null);
  const [timeConstant, setTimeConstant] = useState<number | null>(null);
  const [cutoffFrequency, setCutoffFrequency] = useState<number | null>(null);
  const [energy, setEnergy] = useState<number | null>(null);
  const [impedance, setImpedance] = useState<number | null>(null);

  const inductanceUnits = {
    'H': 1,
    'mH': 1e-3,
    'µH': 1e-6,
    'nH': 1e-9
  };

  const convertInductance = (value: number, unit: string): number => {
    return value * inductanceUnits[unit as keyof typeof inductanceUnits];
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
    const L = convertInductance(parseFloat(inductance), inductanceUnit);
    const f = parseFloat(frequency);
    const I = parseFloat(current);
    const R = parseFloat(resistance);

    if (isNaN(L) || isNaN(f) || isNaN(I) || isNaN(R) || L <= 0 || f <= 0 || I <= 0 || R <= 0) {
      setReactance(null);
      setTimeConstant(null);
      setCutoffFrequency(null);
      setEnergy(null);
      setImpedance(null);
      return;
    }

    // Inductive Reactance: XL = 2πfL
    const XL = 2 * Math.PI * f * L;
    setReactance(XL);

    // Time Constant: τ = L/R
    const tau = L / R;
    setTimeConstant(tau);

    // Cutoff Frequency: fc = R / (2πL)
    const fc = R / (2 * Math.PI * L);
    setCutoffFrequency(fc);

    // Energy stored: E = 0.5 * L * I²
    const E = 0.5 * L * I * I;
    setEnergy(E);

    // Impedance: Z = √(R² + XL²)
    const Z = Math.sqrt(R * R + XL * XL);
    setImpedance(Z);
  };

  const resetCalculator = () => {
    setInductance('10');
    setInductanceUnit('mH');
    setFrequency('1000');
    setCurrent('0.1');
    setResistance('100');
    setReactance(null);
    setTimeConstant(null);
    setCutoffFrequency(null);
    setEnergy(null);
    setImpedance(null);
  };

  useEffect(() => {
    calculateValues();
  }, [inductance, inductanceUnit, frequency, current, resistance]);

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
            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Inductor Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calculate inductive reactance, time constants, energy storage, and RL circuit parameters
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
              
              {/* Inductance */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inductance
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={inductance}
                    onChange={(e) => setInductance(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter inductance"
                    step="0.1"
                  />
                  <select
                    value={inductanceUnit}
                    onChange={(e) => setInductanceUnit(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="H">H</option>
                    <option value="mH">mH</option>
                    <option value="µH">µH</option>
                    <option value="nH">nH</option>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter frequency"
                  step="1"
                />
              </div>

              {/* Current */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current (A)
                </label>
                <input
                  type="number"
                  value={current}
                  onChange={(e) => setCurrent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter current"
                  step="0.001"
                />
              </div>

              {/* Resistance */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resistance (Ω) - for RL calculations
                </label>
                <input
                  type="number"
                  value={resistance}
                  onChange={(e) => setResistance(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter resistance"
                  step="1"
                />
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Calculated Values</h2>
              
              <div className="space-y-4">
                {/* Inductive Reactance */}
                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <h3 className="font-bold text-indigo-900 mb-2">Inductive Reactance (XL)</h3>
                  <p className="text-2xl font-bold text-indigo-600">
                    {reactance !== null ? `${reactance.toFixed(2)} Ω` : '---'}
                  </p>
                  <p className="text-sm text-indigo-700 mt-1">
                    XL = 2πfL
                  </p>
                </div>

                {/* Time Constant */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-bold text-blue-900 mb-2">Time Constant (τ)</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {timeConstant !== null ? formatTime(timeConstant) : '---'}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    τ = L/R
                  </p>
                </div>

                {/* Cutoff Frequency */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-bold text-green-900 mb-2">Cutoff Frequency (fc)</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {cutoffFrequency !== null ? formatFrequency(cutoffFrequency) : '---'}
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    fc = R / (2πL)
                  </p>
                </div>

                {/* Energy Stored */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-bold text-yellow-900 mb-2">Energy Stored</h3>
                  <p className="text-2xl font-bold text-yellow-600">
                    {energy !== null ? `${(energy * 1e3).toFixed(3)} mJ` : '---'}
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    E = ½LI²
                  </p>
                </div>

                {/* Impedance */}
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h3 className="font-bold text-purple-900 mb-2">Total Impedance (Z)</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {impedance !== null ? `${impedance.toFixed(2)} Ω` : '---'}
                  </p>
                  <p className="text-sm text-purple-700 mt-1">
                    Z = √(R² + XL²)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Info className="h-6 w-6 text-indigo-600 mr-2" />
              <h3 className="text-lg font-bold text-indigo-900">Understanding Inductors</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-indigo-800">
              <div>
                <h4 className="font-medium mb-2">Key Properties:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Store energy in a magnetic field</li>
                  <li>• Oppose changes in current</li>
                  <li>• Reactance increases with frequency</li>
                  <li>• Allow DC current, oppose AC current</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Common Applications:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Power supply chokes</li>
                  <li>• RF circuits and filters</li>
                  <li>• Energy storage in switching supplies</li>
                  <li>• Motor windings and transformers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* RL Circuit Information */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">RL Circuit Behavior</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-blue-800">
              <div>
                <h4 className="font-medium mb-2">Current Rise:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 63.2% of final current after 1τ</li>
                  <li>• 86.5% of final current after 2τ</li>
                  <li>• 95.0% of final current after 3τ</li>
                  <li>• 99.3% of final current after 5τ</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Current Decay:</h4>
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
                  <li>• High-pass filter behavior</li>
                  <li>• -3dB at cutoff frequency</li>
                  <li>• +20dB/decade rolloff</li>
                  <li>• Phase shift: 0° to +90°</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InductorCalculatorPage;
