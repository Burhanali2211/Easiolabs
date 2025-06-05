'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, RotateCcw, AlertTriangle, Info, Zap } from 'lucide-react';

const PCBTraceWidthPage = () => {
  const [current, setCurrent] = useState('1');
  const [tempRise, setTempRise] = useState('10');
  const [copperThickness, setCopperThickness] = useState('1');
  const [traceLength, setTraceLength] = useState('10');
  const [calculationMode, setCalculationMode] = useState<'internal' | 'external'>('external');
  
  const [traceWidth, setTraceWidth] = useState<number | null>(null);
  const [resistance, setResistance] = useState<number | null>(null);
  const [voltageDrop, setVoltageDrop] = useState<number | null>(null);
  const [powerLoss, setPowerLoss] = useState<number | null>(null);

  const calculateTraceWidth = () => {
    const I = parseFloat(current);
    const deltaT = parseFloat(tempRise);
    const thickness = parseFloat(copperThickness);
    const length = parseFloat(traceLength);

    if (isNaN(I) || isNaN(deltaT) || isNaN(thickness) || isNaN(length) || I <= 0 || deltaT <= 0) {
      setTraceWidth(null);
      setResistance(null);
      setVoltageDrop(null);
      setPowerLoss(null);
      return;
    }

    // IPC-2221 formula for trace width calculation
    // For external layers: A = (I / (k * (deltaT)^b))^(1/c)
    // For internal layers: A = (I / (k * (deltaT)^b))^(1/c)
    
    let k, b, c;
    if (calculationMode === 'external') {
      // External layer constants
      k = 0.048;
      b = 0.44;
      c = 0.725;
    } else {
      // Internal layer constants  
      k = 0.024;
      b = 0.44;
      c = 0.725;
    }

    // Calculate cross-sectional area in square mils
    const area = Math.pow(I / (k * Math.pow(deltaT, b)), 1/c);
    
    // Convert thickness from oz to mils (1 oz = 1.37 mils)
    const thicknessMils = thickness * 1.37;
    
    // Calculate width in mils
    const widthMils = area / thicknessMils;
    
    // Convert to mm (1 mil = 0.0254 mm)
    const widthMm = widthMils * 0.0254;
    
    setTraceWidth(widthMm);

    // Calculate resistance (ohms)
    // Resistivity of copper at 20°C = 1.68e-8 ohm⋅m = 0.0168 ohm⋅mm²/m
    const resistivity = 0.0168; // ohm⋅mm²/m
    const lengthM = length / 1000; // convert mm to m
    const areaMm2 = widthMm * (thickness * 0.035); // thickness in mm (1 oz = 0.035 mm)
    const R = (resistivity * lengthM) / areaMm2;
    
    setResistance(R);
    setVoltageDrop(I * R);
    setPowerLoss(I * I * R);
  };

  const resetCalculator = () => {
    setCurrent('1');
    setTempRise('10');
    setCopperThickness('1');
    setTraceLength('10');
    setCalculationMode('external');
    setTraceWidth(null);
    setResistance(null);
    setVoltageDrop(null);
    setPowerLoss(null);
  };

  useEffect(() => {
    calculateTraceWidth();
  }, [current, tempRise, copperThickness, traceLength, calculationMode]);

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
              PCB Trace Width Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calculate the minimum trace width required for your PCB based on current and temperature rise
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
              
              {/* Layer Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  PCB Layer Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="layer"
                      value="external"
                      checked={calculationMode === 'external'}
                      onChange={(e) => setCalculationMode(e.target.value as 'external' | 'internal')}
                      className="mr-2"
                    />
                    <span>External Layer (better heat dissipation)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="layer"
                      value="internal"
                      checked={calculationMode === 'internal'}
                      onChange={(e) => setCalculationMode(e.target.value as 'external' | 'internal')}
                      className="mr-2"
                    />
                    <span>Internal Layer (limited heat dissipation)</span>
                  </label>
                </div>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter current in amperes"
                  step="0.1"
                  min="0"
                />
              </div>

              {/* Temperature Rise */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature Rise (°C)
                </label>
                <input
                  type="number"
                  value={tempRise}
                  onChange={(e) => setTempRise(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter temperature rise"
                  step="1"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">Typical: 10°C for general use, 5°C for critical applications</p>
              </div>

              {/* Copper Thickness */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Copper Thickness (oz)
                </label>
                <select
                  value={copperThickness}
                  onChange={(e) => setCopperThickness(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="0.5">0.5 oz (17.5 μm)</option>
                  <option value="1">1 oz (35 μm) - Standard</option>
                  <option value="2">2 oz (70 μm)</option>
                  <option value="3">3 oz (105 μm)</option>
                  <option value="4">4 oz (140 μm)</option>
                </select>
              </div>

              {/* Trace Length */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trace Length (mm)
                </label>
                <input
                  type="number"
                  value={traceLength}
                  onChange={(e) => setTraceLength(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter trace length"
                  step="1"
                  min="0"
                />
                <p className="text-xs text-gray-500 mt-1">Used for resistance and voltage drop calculations</p>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Results</h2>
              
              {traceWidth !== null && (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-bold text-blue-900 mb-2">Minimum Trace Width</h3>
                    <p className="text-2xl font-bold text-blue-600">{traceWidth.toFixed(3)} mm</p>
                    <p className="text-sm text-blue-700 mt-1">{(traceWidth / 0.0254).toFixed(1)} mils</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-700 text-sm">Trace Resistance</h4>
                      <p className="text-lg font-bold text-gray-900">{resistance?.toFixed(6)} Ω</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-700 text-sm">Voltage Drop</h4>
                      <p className="text-lg font-bold text-gray-900">{voltageDrop?.toFixed(3)} V</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-700 text-sm">Power Loss</h4>
                      <p className="text-lg font-bold text-gray-900">{powerLoss?.toFixed(3)} W</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Design Guidelines */}
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">Design Guidelines</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Use wider traces for higher currents</li>
                  <li>• External layers dissipate heat better</li>
                  <li>• Consider via stitching for thermal relief</li>
                  <li>• Add copper pour for high-current paths</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Info className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-blue-900">PCB Trace Width Guidelines</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
              <div>
                <h4 className="font-medium mb-2">Key Factors:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Current carrying capacity</li>
                  <li>• Temperature rise limits</li>
                  <li>• Copper thickness (weight)</li>
                  <li>• Layer type (internal vs external)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Best Practices:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Use IPC-2221 standards</li>
                  <li>• Add safety margin (20-50%)</li>
                  <li>• Consider manufacturing limits</li>
                  <li>• Use thermal vias for heat dissipation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="text-lg font-bold text-red-900">Important Notes</h3>
            </div>
            <ul className="text-red-800 space-y-1 text-sm">
              <li>• This calculator uses IPC-2221 standards for continuous DC current</li>
              <li>• Add safety margin for pulsed currents or critical applications</li>
              <li>• Consider manufacturing capabilities and minimum trace widths</li>
              <li>• Verify calculations with thermal simulation for high-power designs</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PCBTraceWidthPage;
