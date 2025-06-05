'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, RotateCcw, AlertTriangle, Info, Zap } from 'lucide-react';

const VoltageDividerPage = () => {
  const [inputVoltage, setInputVoltage] = useState('9');
  const [r1Value, setR1Value] = useState('1000');
  const [r2Value, setR2Value] = useState('1000');
  const [calculationMode, setCalculationMode] = useState<'output' | 'r1' | 'r2'>('output');
  const [desiredOutput, setDesiredOutput] = useState('4.5');
  
  const [outputVoltage, setOutputVoltage] = useState<number | null>(null);
  const [voltageDrop1, setVoltageDrop1] = useState<number | null>(null);
  const [voltageDrop2, setVoltageDrop2] = useState<number | null>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [power1, setPower1] = useState<number | null>(null);
  const [power2, setPower2] = useState<number | null>(null);
  const [calculatedResistor, setCalculatedResistor] = useState<number | null>(null);

  const standardResistors = [
    10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82,
    100, 120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820,
    1000, 1200, 1500, 1800, 2200, 2700, 3300, 3900, 4700, 5600, 6800, 8200,
    10000, 12000, 15000, 18000, 22000, 27000, 33000, 39000, 47000, 56000, 68000, 82000,
    100000, 120000, 150000, 180000, 220000, 270000, 330000, 390000, 470000, 560000, 680000, 820000,
    1000000
  ];

  const formatResistance = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}MΩ`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}kΩ`;
    } else {
      return `${value.toFixed(0)}Ω`;
    }
  };

  const calculateVoltageDivider = () => {
    const Vin = parseFloat(inputVoltage);
    const R1 = parseFloat(r1Value);
    const R2 = parseFloat(r2Value);

    if (isNaN(Vin) || isNaN(R1) || isNaN(R2) || R1 <= 0 || R2 <= 0) {
      setOutputVoltage(null);
      setVoltageDrop1(null);
      setVoltageDrop2(null);
      setCurrent(null);
      setPower1(null);
      setPower2(null);
      return;
    }

    // Calculate output voltage
    const Vout = Vin * (R2 / (R1 + R2));
    const I = Vin / (R1 + R2); // Current in Amps
    const V1 = I * R1; // Voltage drop across R1
    const V2 = I * R2; // Voltage drop across R2
    const P1 = (V1 * V1) / R1; // Power dissipated by R1
    const P2 = (V2 * V2) / R2; // Power dissipated by R2

    setOutputVoltage(Vout);
    setVoltageDrop1(V1);
    setVoltageDrop2(V2);
    setCurrent(I * 1000); // Convert to mA
    setPower1(P1 * 1000); // Convert to mW
    setPower2(P2 * 1000); // Convert to mW
  };

  const calculateResistor = () => {
    const Vin = parseFloat(inputVoltage);
    const Vout = parseFloat(desiredOutput);

    if (isNaN(Vin) || isNaN(Vout) || Vout >= Vin || Vout <= 0) {
      setCalculatedResistor(null);
      return;
    }

    if (calculationMode === 'r1') {
      const R2 = parseFloat(r2Value);
      if (isNaN(R2) || R2 <= 0) {
        setCalculatedResistor(null);
        return;
      }
      // R1 = R2 * (Vin - Vout) / Vout
      const R1 = R2 * (Vin - Vout) / Vout;
      setCalculatedResistor(R1);
    } else if (calculationMode === 'r2') {
      const R1 = parseFloat(r1Value);
      if (isNaN(R1) || R1 <= 0) {
        setCalculatedResistor(null);
        return;
      }
      // R2 = R1 * Vout / (Vin - Vout)
      const R2 = R1 * Vout / (Vin - Vout);
      setCalculatedResistor(R2);
    }
  };

  const findNearestStandardResistor = (value: number): number => {
    return standardResistors.reduce((prev, curr) => 
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
    );
  };

  const resetCalculator = () => {
    setInputVoltage('9');
    setR1Value('1000');
    setR2Value('1000');
    setDesiredOutput('4.5');
    setCalculationMode('output');
    setOutputVoltage(null);
    setVoltageDrop1(null);
    setVoltageDrop2(null);
    setCurrent(null);
    setPower1(null);
    setPower2(null);
    setCalculatedResistor(null);
  };

  useEffect(() => {
    if (calculationMode === 'output') {
      calculateVoltageDivider();
    } else {
      calculateResistor();
    }
  }, [inputVoltage, r1Value, r2Value, desiredOutput, calculationMode]);

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
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Calculator className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Voltage Divider Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calculate output voltage and resistor values for voltage divider circuits
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
              <h2 className="text-xl font-bold text-gray-900 mb-6">Calculator Settings</h2>
              
              {/* Calculation Mode */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What do you want to calculate?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="mode"
                      value="output"
                      checked={calculationMode === 'output'}
                      onChange={(e) => setCalculationMode(e.target.value as 'output' | 'r1' | 'r2')}
                      className="mr-2"
                    />
                    <span>Output voltage (given R1 and R2)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="mode"
                      value="r1"
                      checked={calculationMode === 'r1'}
                      onChange={(e) => setCalculationMode(e.target.value as 'output' | 'r1' | 'r2')}
                      className="mr-2"
                    />
                    <span>R1 value (given R2 and desired output)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="mode"
                      value="r2"
                      checked={calculationMode === 'r2'}
                      onChange={(e) => setCalculationMode(e.target.value as 'output' | 'r1' | 'r2')}
                      className="mr-2"
                    />
                    <span>R2 value (given R1 and desired output)</span>
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

              {/* Resistor Values */}
              {calculationMode === 'output' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      R1 (Upper Resistor) - Ω
                    </label>
                    <input
                      type="number"
                      value={r1Value}
                      onChange={(e) => setR1Value(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter R1 value"
                      step="1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      R2 (Lower Resistor) - Ω
                    </label>
                    <input
                      type="number"
                      value={r2Value}
                      onChange={(e) => setR2Value(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter R2 value"
                      step="1"
                    />
                  </div>
                </>
              )}

              {calculationMode === 'r1' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Output Voltage (V)
                    </label>
                    <input
                      type="number"
                      value={desiredOutput}
                      onChange={(e) => setDesiredOutput(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter desired output voltage"
                      step="0.1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      R2 (Lower Resistor) - Ω
                    </label>
                    <input
                      type="number"
                      value={r2Value}
                      onChange={(e) => setR2Value(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter R2 value"
                      step="1"
                    />
                  </div>
                </>
              )}

              {calculationMode === 'r2' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Desired Output Voltage (V)
                    </label>
                    <input
                      type="number"
                      value={desiredOutput}
                      onChange={(e) => setDesiredOutput(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter desired output voltage"
                      step="0.1"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      R1 (Upper Resistor) - Ω
                    </label>
                    <input
                      type="number"
                      value={r1Value}
                      onChange={(e) => setR1Value(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter R1 value"
                      step="1"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Results</h2>
              
              {calculationMode === 'output' && outputVoltage !== null && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-bold text-blue-900 mb-2">Output Voltage</h3>
                    <p className="text-2xl font-bold text-blue-600">{outputVoltage.toFixed(3)} V</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-700 text-sm">Voltage Drop R1</h4>
                      <p className="text-lg font-bold text-gray-900">{voltageDrop1?.toFixed(3)} V</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-700 text-sm">Voltage Drop R2</h4>
                      <p className="text-lg font-bold text-gray-900">{voltageDrop2?.toFixed(3)} V</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-700 text-sm">Current</h4>
                      <p className="text-lg font-bold text-gray-900">{current?.toFixed(3)} mA</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-700 text-sm">Total Power</h4>
                      <p className="text-lg font-bold text-gray-900">{((power1 || 0) + (power2 || 0)).toFixed(1)} mW</p>
                    </div>
                  </div>
                </div>
              )}

              {(calculationMode === 'r1' || calculationMode === 'r2') && calculatedResistor !== null && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-bold text-green-900 mb-2">
                      Calculated {calculationMode === 'r1' ? 'R1' : 'R2'} Value
                    </h3>
                    <p className="text-2xl font-bold text-green-600">{formatResistance(calculatedResistor)}</p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-bold text-yellow-900 mb-2">Nearest Standard Resistor</h4>
                    <p className="text-xl font-bold text-yellow-600">
                      {formatResistance(findNearestStandardResistor(calculatedResistor))}
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Error: {(((findNearestStandardResistor(calculatedResistor) - calculatedResistor) / calculatedResistor) * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
              )}

              {/* Circuit Diagram */}
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">Circuit Diagram</h4>
                <div className="text-center">
                  <div className="inline-block text-left font-mono text-sm">
                    <div>Vin (+) ──┬── R1 ──┬── Vout</div>
                    <div>          │        │</div>
                    <div>          │        R2</div>
                    <div>          │        │</div>
                    <div>Vin (-) ──┴────────┴── GND</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-2 text-center">
                  Vout = Vin × (R2 / (R1 + R2))
                </p>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Info className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-blue-900">How Voltage Dividers Work</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
              <div>
                <h4 className="font-medium mb-2">Key Concepts:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Voltage divides proportionally to resistance</li>
                  <li>• Higher resistance = larger voltage drop</li>
                  <li>• Output voltage is always less than input</li>
                  <li>• Current is the same through both resistors</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Common Applications:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Sensor signal conditioning</li>
                  <li>• Reference voltage generation</li>
                  <li>• Level shifting circuits</li>
                  <li>• Biasing transistors</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-lg font-bold text-red-900">Important Considerations</h3>
            </div>
            <ul className="text-red-800 space-y-1 text-sm">
              <li>• Voltage dividers are not suitable for high-current loads</li>
              <li>• Output voltage will drop when current is drawn from the output</li>
              <li>• Use buffer amplifiers for driving loads</li>
              <li>• Consider power dissipation in resistors for high-voltage applications</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VoltageDividerPage;
