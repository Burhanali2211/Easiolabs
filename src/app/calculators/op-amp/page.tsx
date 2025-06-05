'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, RotateCcw, AlertTriangle, Info, Zap } from 'lucide-react';

const OpAmpPage = () => {
  const [calculationType, setCalculationType] = useState<'inverting' | 'non-inverting' | 'differential' | 'integrator'>('non-inverting');
  const [r1Value, setR1Value] = useState('1000');
  const [r2Value, setR2Value] = useState('10000');
  const [inputVoltage, setInputVoltage] = useState('1');
  const [capacitorValue, setCapacitorValue] = useState('100');

  const [gain, setGain] = useState<number | null>(null);
  const [outputVoltage, setOutputVoltage] = useState<number | null>(null);
  const [inputImpedance, setInputImpedance] = useState<number | null>(null);
  const [cutoffFrequency, setCutoffFrequency] = useState<number | null>(null);

  const calculateOpAmp = () => {
    const R1 = parseFloat(r1Value);
    const R2 = parseFloat(r2Value);
    const Vin = parseFloat(inputVoltage);
    const C = parseFloat(capacitorValue) * 1e-9; // Convert nF to F

    if (isNaN(R1) || isNaN(R2) || isNaN(Vin) || R1 <= 0 || R2 <= 0) {
      setGain(null);
      setOutputVoltage(null);
      setInputImpedance(null);
      setCutoffFrequency(null);
      return;
    }

    let calculatedGain = 0;
    let calculatedInputImpedance = 0;
    let calculatedCutoff = null;

    switch (calculationType) {
      case 'non-inverting':
        calculatedGain = 1 + (R2 / R1);
        calculatedInputImpedance = 1e12; // Very high for ideal op-amp
        break;

      case 'inverting':
        calculatedGain = -(R2 / R1);
        calculatedInputImpedance = R1;
        break;

      case 'differential':
        // Assuming matched resistors for simplicity
        calculatedGain = R2 / R1;
        calculatedInputImpedance = R1;
        break;

      case 'integrator':
        if (!isNaN(C) && C > 0) {
          // For integrator, gain is frequency dependent
          // At 1 kHz: Gain = -1 / (2πfRC)
          const frequency = 1000; // 1 kHz reference
          calculatedGain = -1 / (2 * Math.PI * frequency * R1 * C);
          calculatedInputImpedance = R1;
          calculatedCutoff = 1 / (2 * Math.PI * R1 * C);
        }
        break;
    }

    const calculatedOutput = calculatedGain * Vin;

    setGain(calculatedGain);
    setOutputVoltage(calculatedOutput);
    setInputImpedance(calculatedInputImpedance);
    setCutoffFrequency(calculatedCutoff);
  };

  const resetCalculator = () => {
    setCalculationType('non-inverting');
    setR1Value('1000');
    setR2Value('10000');
    setInputVoltage('1');
    setCapacitorValue('100');
    setGain(null);
    setOutputVoltage(null);
    setInputImpedance(null);
    setCutoffFrequency(null);
  };

  const formatResistance = (value: number): string => {
    if (value >= 1e12) {
      return `${(value / 1e12).toFixed(1)} TΩ`;
    } else if (value >= 1e9) {
      return `${(value / 1e9).toFixed(1)} GΩ`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(1)} MΩ`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)} kΩ`;
    } else {
      return `${value.toFixed(0)} Ω`;
    }
  };

  const formatFrequency = (value: number): string => {
    if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)} MHz`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} kHz`;
    } else {
      return `${value.toFixed(2)} Hz`;
    }
  };

  useEffect(() => {
    calculateOpAmp();
  }, [calculationType, r1Value, r2Value, inputVoltage, capacitorValue]);

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
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Op-Amp Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calculate gain, output voltage, and other parameters for common op-amp configurations
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
              <h2 className="text-xl font-bold text-gray-900 mb-6">Op-Amp Configuration</h2>

              {/* Configuration Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Configuration Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="config"
                      value="non-inverting"
                      checked={calculationType === 'non-inverting'}
                      onChange={(e) => setCalculationType(e.target.value as any)}
                      className="mr-2"
                    />
                    <span>Non-Inverting Amplifier</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="config"
                      value="inverting"
                      checked={calculationType === 'inverting'}
                      onChange={(e) => setCalculationType(e.target.value as any)}
                      className="mr-2"
                    />
                    <span>Inverting Amplifier</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="config"
                      value="differential"
                      checked={calculationType === 'differential'}
                      onChange={(e) => setCalculationType(e.target.value as any)}
                      className="mr-2"
                    />
                    <span>Differential Amplifier</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="config"
                      value="integrator"
                      checked={calculationType === 'integrator'}
                      onChange={(e) => setCalculationType(e.target.value as any)}
                      className="mr-2"
                    />
                    <span>Integrator</span>
                  </label>
                </div>
              </div>

              {/* Input Voltage */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Input Voltage (V)
                </label>
                <input
                  type="number"
                  value={inputVoltage}
                  onChange={(e) => setInputVoltage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter input voltage"
                  step="0.1"
                />
              </div>

              {/* R1 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {calculationType === 'non-inverting' ? 'R1 (Feedback Resistor) - Ω' : 'R1 (Input Resistor) - Ω'}
                </label>
                <input
                  type="number"
                  value={r1Value}
                  onChange={(e) => setR1Value(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter R1 value"
                  step="100"
                />
              </div>

              {/* R2 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {calculationType === 'non-inverting' ? 'R2 (Ground Resistor) - Ω' : 'R2 (Feedback Resistor) - Ω'}
                </label>
                <input
                  type="number"
                  value={r2Value}
                  onChange={(e) => setR2Value(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter R2 value"
                  step="100"
                />
              </div>

              {/* Capacitor (for integrator) */}
              {calculationType === 'integrator' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacitor Value (nF)
                  </label>
                  <input
                    type="number"
                    value={capacitorValue}
                    onChange={(e) => setCapacitorValue(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter capacitor value"
                    step="10"
                  />
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Results</h2>

              {gain !== null && (
                <div className="space-y-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-bold text-purple-900 mb-2">
                      {calculationType === 'integrator' ? 'Gain at 1kHz' : 'Voltage Gain'}
                    </h3>
                    <p className="text-2xl font-bold text-purple-600">
                      {gain >= 0 ? '+' : ''}{gain.toFixed(2)}
                    </p>
                    <p className="text-sm text-purple-700 mt-1">
                      {gain && !isNaN(gain) ? (20 * Math.log10(Math.abs(gain))).toFixed(1) : '0.0'} dB
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-700 text-sm">Output Voltage</h4>
                      <p className="text-lg font-bold text-gray-900">{outputVoltage?.toFixed(3)} V</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-700 text-sm">Input Impedance</h4>
                      <p className="text-lg font-bold text-gray-900">{inputImpedance ? formatResistance(inputImpedance) : 'N/A'}</p>
                    </div>
                    {cutoffFrequency && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-700 text-sm">Cutoff Frequency</h4>
                        <p className="text-lg font-bold text-gray-900">{formatFrequency(cutoffFrequency)}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Circuit Diagram */}
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">Configuration</h4>
                <div className="text-center">
                  <div className="inline-block text-left font-mono text-xs">
                    {calculationType === 'non-inverting' && (
                      <div>
                        <div>Vin ──────┬─── (+)</div>
                        <div>          │      ╲</div>
                        <div>          │       ╲ Op-Amp</div>
                        <div>          │      ╱</div>
                        <div>          │ ┌── (-)  ╱── Vout</div>
                        <div>          │ │        │</div>
                        <div>          │ R2       R1</div>
                        <div>          │ │        │</div>
                        <div>         GND└────────┘</div>
                      </div>
                    )}
                    {calculationType === 'inverting' && (
                      <div>
                        <div>Vin ──R1── (-)</div>
                        <div>            ╲</div>
                        <div>             ╲ Op-Amp</div>
                        <div>            ╱</div>
                        <div>       ┌── (+)  ╱── Vout</div>
                        <div>       │        │</div>
                        <div>      GND       R2</div>
                        <div>               │</div>
                        <div>               └──┘</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600 text-center">
                  {calculationType === 'non-inverting' && 'Gain = 1 + (R1/R2)'}
                  {calculationType === 'inverting' && 'Gain = -(R2/R1)'}
                  {calculationType === 'differential' && 'Gain = R2/R1 (matched resistors)'}
                  {calculationType === 'integrator' && 'Gain = -1/(2πfRC)'}
                </div>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Info className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-blue-900">Op-Amp Configuration Guide</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
              <div>
                <h4 className="font-medium mb-2">Configuration Types:</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Non-Inverting:</strong> High input impedance, positive gain</li>
                  <li>• <strong>Inverting:</strong> Virtual ground, negative gain</li>
                  <li>• <strong>Differential:</strong> Amplifies difference between inputs</li>
                  <li>• <strong>Integrator:</strong> Frequency-dependent gain</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Design Considerations:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Choose appropriate op-amp for bandwidth</li>
                  <li>• Consider slew rate for fast signals</li>
                  <li>• Use stable resistor values (1kΩ - 1MΩ)</li>
                  <li>• Add compensation for high gains</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-6 w-6 text-yellow-600 mr-2" />
              <h3 className="text-lg font-bold text-yellow-900">Important Notes</h3>
            </div>
            <ul className="text-yellow-800 space-y-1 text-sm">
              <li>• Calculations assume ideal op-amp behavior</li>
              <li>• Real op-amps have finite gain, bandwidth, and offset</li>
              <li>• Consider power supply limitations for output voltage</li>
              <li>• Use appropriate decoupling capacitors in actual circuits</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OpAmpPage;
