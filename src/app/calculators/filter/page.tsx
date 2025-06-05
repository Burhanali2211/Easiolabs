'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, RotateCcw, AlertTriangle, Info, Zap } from 'lucide-react';

const FilterPage = () => {
  const [filterType, setFilterType] = useState<'rc-lowpass' | 'rc-highpass' | 'lc-lowpass' | 'lc-highpass' | 'rlc-bandpass'>('rc-lowpass');
  const [resistorValue, setResistorValue] = useState('1000');
  const [capacitorValue, setCapacitorValue] = useState('100');
  const [inductorValue, setInductorValue] = useState('10');
  const [frequency, setFrequency] = useState('1000');
  
  const [cutoffFrequency, setCutoffFrequency] = useState<number | null>(null);
  const [gain, setGain] = useState<number | null>(null);
  const [phaseShift, setPhaseShift] = useState<number | null>(null);
  const [impedance, setImpedance] = useState<number | null>(null);
  const [qFactor, setQFactor] = useState<number | null>(null);

  const calculateFilter = () => {
    const R = parseFloat(resistorValue);
    const C = parseFloat(capacitorValue) * 1e-9; // Convert nF to F
    const L = parseFloat(inductorValue) * 1e-3; // Convert mH to H
    const f = parseFloat(frequency);

    if (isNaN(R) || isNaN(C) || isNaN(L) || isNaN(f) || R <= 0 || C <= 0 || L <= 0 || f <= 0) {
      setCutoffFrequency(null);
      setGain(null);
      setPhaseShift(null);
      setImpedance(null);
      setQFactor(null);
      return;
    }

    const omega = 2 * Math.PI * f;
    let fc = 0;
    let gainValue = 0;
    let phase = 0;
    let Z = 0;
    let Q = null;

    switch (filterType) {
      case 'rc-lowpass':
        fc = 1 / (2 * Math.PI * R * C);
        const ratio_lp = f / fc;
        gainValue = -20 * Math.log10(Math.sqrt(1 + ratio_lp * ratio_lp));
        phase = -Math.atan(ratio_lp) * (180 / Math.PI);
        Z = Math.sqrt(R * R + (1 / (omega * C)) * (1 / (omega * C)));
        break;
        
      case 'rc-highpass':
        fc = 1 / (2 * Math.PI * R * C);
        const ratio_hp = fc / f;
        gainValue = -20 * Math.log10(Math.sqrt(1 + ratio_hp * ratio_hp));
        phase = Math.atan(ratio_hp) * (180 / Math.PI);
        Z = Math.sqrt(R * R + (1 / (omega * C)) * (1 / (omega * C)));
        break;
        
      case 'lc-lowpass':
        fc = 1 / (2 * Math.PI * Math.sqrt(L * C));
        const XL = omega * L;
        const XC = 1 / (omega * C);
        if (f < fc) {
          gainValue = 0; // Passband
        } else {
          gainValue = -40 * Math.log10(f / fc); // -40dB/decade rolloff
        }
        Z = Math.abs(XL - XC);
        Q = (1 / R) * Math.sqrt(L / C);
        break;
        
      case 'lc-highpass':
        fc = 1 / (2 * Math.PI * Math.sqrt(L * C));
        if (f > fc) {
          gainValue = 0; // Passband
        } else {
          gainValue = -40 * Math.log10(fc / f); // -40dB/decade rolloff
        }
        const XL_hp = omega * L;
        const XC_hp = 1 / (omega * C);
        Z = Math.abs(XL_hp - XC_hp);
        Q = (1 / R) * Math.sqrt(L / C);
        break;
        
      case 'rlc-bandpass':
        fc = 1 / (2 * Math.PI * Math.sqrt(L * C));
        Q = fc * R * C;
        const bandwidth = fc / Q;
        const deltaF = Math.abs(f - fc);
        
        if (deltaF <= bandwidth / 2) {
          gainValue = 0; // Passband
        } else {
          gainValue = -20 * Math.log10(1 + Math.pow(Q * (f / fc - fc / f), 2));
        }
        
        const XL_bp = omega * L;
        const XC_bp = 1 / (omega * C);
        Z = Math.sqrt(R * R + (XL_bp - XC_bp) * (XL_bp - XC_bp));
        break;
    }

    setCutoffFrequency(fc);
    setGain(gainValue);
    setPhaseShift(phase);
    setImpedance(Z);
    setQFactor(Q);
  };

  const resetCalculator = () => {
    setFilterType('rc-lowpass');
    setResistorValue('1000');
    setCapacitorValue('100');
    setInductorValue('10');
    setFrequency('1000');
    setCutoffFrequency(null);
    setGain(null);
    setPhaseShift(null);
    setImpedance(null);
    setQFactor(null);
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

  const formatImpedance = (value: number): string => {
    if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)} MΩ`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)} kΩ`;
    } else {
      return `${value.toFixed(1)} Ω`;
    }
  };

  useEffect(() => {
    calculateFilter();
  }, [filterType, resistorValue, capacitorValue, inductorValue, frequency]);

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
              <Zap className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Filter Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calculate frequency response, cutoff frequency, and characteristics of electronic filters
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
              <h2 className="text-xl font-bold text-gray-900 mb-6">Filter Configuration</h2>
              
              {/* Filter Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Filter Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="filter"
                      value="rc-lowpass"
                      checked={filterType === 'rc-lowpass'}
                      onChange={(e) => setFilterType(e.target.value as any)}
                      className="mr-2"
                    />
                    <span>RC Low-Pass Filter</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="filter"
                      value="rc-highpass"
                      checked={filterType === 'rc-highpass'}
                      onChange={(e) => setFilterType(e.target.value as any)}
                      className="mr-2"
                    />
                    <span>RC High-Pass Filter</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="filter"
                      value="lc-lowpass"
                      checked={filterType === 'lc-lowpass'}
                      onChange={(e) => setFilterType(e.target.value as any)}
                      className="mr-2"
                    />
                    <span>LC Low-Pass Filter</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="filter"
                      value="lc-highpass"
                      checked={filterType === 'lc-highpass'}
                      onChange={(e) => setFilterType(e.target.value as any)}
                      className="mr-2"
                    />
                    <span>LC High-Pass Filter</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="filter"
                      value="rlc-bandpass"
                      checked={filterType === 'rlc-bandpass'}
                      onChange={(e) => setFilterType(e.target.value as any)}
                      className="mr-2"
                    />
                    <span>RLC Band-Pass Filter</span>
                  </label>
                </div>
              </div>

              {/* Test Frequency */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Test Frequency (Hz)
                </label>
                <input
                  type="number"
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter test frequency"
                  step="100"
                  min="0"
                />
              </div>

              {/* Resistor */}
              {(filterType.includes('rc') || filterType.includes('rlc')) && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Resistor Value (Ω)
                  </label>
                  <input
                    type="number"
                    value={resistorValue}
                    onChange={(e) => setResistorValue(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter resistor value"
                    step="100"
                    min="0"
                  />
                </div>
              )}

              {/* Capacitor */}
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
                  min="0"
                />
              </div>

              {/* Inductor */}
              {(filterType.includes('lc') || filterType.includes('rlc')) && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inductor Value (mH)
                  </label>
                  <input
                    type="number"
                    value={inductorValue}
                    onChange={(e) => setInductorValue(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter inductor value"
                    step="1"
                    min="0"
                  />
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Filter Response</h2>
              
              {cutoffFrequency !== null && (
                <div className="space-y-4">
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <h3 className="font-bold text-indigo-900 mb-2">Cutoff Frequency</h3>
                    <p className="text-2xl font-bold text-indigo-600">{formatFrequency(cutoffFrequency)}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-700 text-sm">Gain at Test Frequency</h4>
                      <p className="text-lg font-bold text-gray-900">{gain?.toFixed(2)} dB</p>
                    </div>
                    {phaseShift !== null && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-700 text-sm">Phase Shift</h4>
                        <p className="text-lg font-bold text-gray-900">{phaseShift.toFixed(1)}°</p>
                      </div>
                    )}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-700 text-sm">Impedance</h4>
                      <p className="text-lg font-bold text-gray-900">{impedance ? formatImpedance(impedance) : 'N/A'}</p>
                    </div>
                    {qFactor && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <h4 className="font-medium text-gray-700 text-sm">Q Factor</h4>
                        <p className="text-lg font-bold text-gray-900">{qFactor.toFixed(2)}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Filter Characteristics */}
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">Filter Characteristics</h4>
                <div className="text-sm text-gray-700 space-y-1">
                  {filterType === 'rc-lowpass' && (
                    <>
                      <p>• Passes low frequencies, attenuates high frequencies</p>
                      <p>• -20dB/decade rolloff above cutoff</p>
                      <p>• Simple first-order filter</p>
                    </>
                  )}
                  {filterType === 'rc-highpass' && (
                    <>
                      <p>• Passes high frequencies, attenuates low frequencies</p>
                      <p>• -20dB/decade rolloff below cutoff</p>
                      <p>• Blocks DC signals</p>
                    </>
                  )}
                  {filterType.includes('lc') && (
                    <>
                      <p>• Second-order filter with sharper rolloff</p>
                      <p>• -40dB/decade rolloff rate</p>
                      <p>• Better selectivity than RC filters</p>
                    </>
                  )}
                  {filterType === 'rlc-bandpass' && (
                    <>
                      <p>• Passes frequencies near resonance</p>
                      <p>• Q factor determines bandwidth</p>
                      <p>• Higher Q = narrower bandwidth</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Info className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-blue-900">Filter Design Guide</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
              <div>
                <h4 className="font-medium mb-2">Filter Types:</h4>
                <ul className="text-sm space-y-1">
                  <li>• <strong>Low-Pass:</strong> Allows low frequencies to pass</li>
                  <li>• <strong>High-Pass:</strong> Allows high frequencies to pass</li>
                  <li>• <strong>Band-Pass:</strong> Allows specific frequency range</li>
                  <li>• <strong>RC:</strong> Simple, first-order response</li>
                  <li>• <strong>LC:</strong> Sharper, second-order response</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Design Considerations:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Choose cutoff frequency based on application</li>
                  <li>• Higher order filters have sharper rolloff</li>
                  <li>• Consider component tolerances</li>
                  <li>• LC filters need quality inductors</li>
                  <li>• Active filters can provide gain</li>
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
              <li>• Calculations assume ideal components with no parasitic effects</li>
              <li>• Real inductors have resistance and limited Q factor</li>
              <li>• Component tolerances affect actual filter performance</li>
              <li>• Consider load impedance effects in practical circuits</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FilterPage;
