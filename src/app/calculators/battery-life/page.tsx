'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, RotateCcw, AlertTriangle, Info, Battery } from 'lucide-react';

const BatteryLifePage = () => {
  const [batteryCapacity, setBatteryCapacity] = useState('2000');
  const [batteryType, setBatteryType] = useState('li-ion');
  const [averageCurrent, setAverageCurrent] = useState('50');
  const [dutyCycle, setDutyCycle] = useState('100');
  const [efficiency, setEfficiency] = useState('85');
  const [temperatureFactor, setTemperatureFactor] = useState('100');
  
  const [batteryLife, setBatteryLife] = useState<{
    hours: number;
    days: number;
    months: number;
  } | null>(null);
  const [effectiveCapacity, setEffectiveCapacity] = useState<number | null>(null);
  const [actualCurrent, setActualCurrent] = useState<number | null>(null);

  const batteryTypes = {
    'li-ion': { name: 'Lithium-ion', usableCapacity: 0.9, selfDischarge: 0.02 },
    'li-po': { name: 'Lithium Polymer', usableCapacity: 0.9, selfDischarge: 0.02 },
    'nimh': { name: 'NiMH', usableCapacity: 0.8, selfDischarge: 0.15 },
    'nicd': { name: 'NiCd', usableCapacity: 0.8, selfDischarge: 0.10 },
    'alkaline': { name: 'Alkaline', usableCapacity: 0.7, selfDischarge: 0.05 },
    'lead-acid': { name: 'Lead Acid', usableCapacity: 0.5, selfDischarge: 0.03 }
  };

  const calculateBatteryLife = () => {
    const capacity = parseFloat(batteryCapacity);
    const current = parseFloat(averageCurrent);
    const duty = parseFloat(dutyCycle);
    const eff = parseFloat(efficiency);
    const tempFactor = parseFloat(temperatureFactor);

    if (isNaN(capacity) || isNaN(current) || isNaN(duty) || isNaN(eff) || isNaN(tempFactor) ||
        capacity <= 0 || current <= 0 || duty <= 0 || eff <= 0 || tempFactor <= 0) {
      setBatteryLife(null);
      setEffectiveCapacity(null);
      setActualCurrent(null);
      return;
    }

    const batteryInfo = batteryTypes[batteryType as keyof typeof batteryTypes];
    
    // Calculate effective capacity considering battery type and temperature
    const tempAdjustedCapacity = capacity * (tempFactor / 100);
    const usableCapacity = tempAdjustedCapacity * batteryInfo.usableCapacity;
    
    // Calculate actual current draw considering duty cycle and efficiency
    const dutyCycleFactor = duty / 100;
    const efficiencyFactor = eff / 100;
    const effectiveCurrent = (current * dutyCycleFactor) / efficiencyFactor;
    
    // Add self-discharge current (monthly rate converted to hourly)
    const selfDischargeCurrent = (capacity * batteryInfo.selfDischarge) / (30 * 24);
    const totalCurrent = effectiveCurrent + selfDischargeCurrent;
    
    // Calculate battery life in hours
    const lifeHours = usableCapacity / totalCurrent;
    const lifeDays = lifeHours / 24;
    const lifeMonths = lifeDays / 30;
    
    setBatteryLife({
      hours: lifeHours,
      days: lifeDays,
      months: lifeMonths
    });
    setEffectiveCapacity(usableCapacity);
    setActualCurrent(totalCurrent);
  };

  const resetCalculator = () => {
    setBatteryCapacity('2000');
    setBatteryType('li-ion');
    setAverageCurrent('50');
    setDutyCycle('100');
    setEfficiency('85');
    setTemperatureFactor('100');
    setBatteryLife(null);
    setEffectiveCapacity(null);
    setActualCurrent(null);
  };

  const formatTime = (hours: number): string => {
    if (hours < 1) {
      return `${Math.round(hours * 60)} minutes`;
    } else if (hours < 24) {
      return `${hours.toFixed(1)} hours`;
    } else if (hours < 24 * 30) {
      return `${(hours / 24).toFixed(1)} days`;
    } else if (hours < 24 * 365) {
      return `${(hours / (24 * 30)).toFixed(1)} months`;
    } else {
      return `${(hours / (24 * 365)).toFixed(1)} years`;
    }
  };

  useEffect(() => {
    calculateBatteryLife();
  }, [batteryCapacity, batteryType, averageCurrent, dutyCycle, efficiency, temperatureFactor]);

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
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Battery className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Battery Life Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calculate how long your battery will last based on capacity, current draw, and usage patterns
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
              <h2 className="text-xl font-bold text-gray-900 mb-6">Battery & Load Settings</h2>
              
              {/* Battery Capacity */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Battery Capacity (mAh)
                </label>
                <input
                  type="number"
                  value={batteryCapacity}
                  onChange={(e) => setBatteryCapacity(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter battery capacity"
                  step="100"
                  min="0"
                />
              </div>

              {/* Battery Type */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Battery Type
                </label>
                <select
                  value={batteryType}
                  onChange={(e) => setBatteryType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(batteryTypes).map(([key, type]) => (
                    <option key={key} value={key}>{type.name}</option>
                  ))}
                </select>
              </div>

              {/* Average Current */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Average Current Draw (mA)
                </label>
                <input
                  type="number"
                  value={averageCurrent}
                  onChange={(e) => setAverageCurrent(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter average current"
                  step="1"
                  min="0"
                />
              </div>

              {/* Duty Cycle */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duty Cycle (%)
                </label>
                <input
                  type="number"
                  value={dutyCycle}
                  onChange={(e) => setDutyCycle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter duty cycle"
                  step="1"
                  min="0"
                  max="100"
                />
                <p className="text-xs text-gray-500 mt-1">Percentage of time the device is active</p>
              </div>

              {/* Efficiency */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  System Efficiency (%)
                </label>
                <input
                  type="number"
                  value={efficiency}
                  onChange={(e) => setEfficiency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter system efficiency"
                  step="1"
                  min="0"
                  max="100"
                />
                <p className="text-xs text-gray-500 mt-1">Power conversion efficiency (typical: 80-95%)</p>
              </div>

              {/* Temperature Factor */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperature Factor (%)
                </label>
                <input
                  type="number"
                  value={temperatureFactor}
                  onChange={(e) => setTemperatureFactor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter temperature factor"
                  step="5"
                  min="0"
                  max="120"
                />
                <p className="text-xs text-gray-500 mt-1">100% at 20°C, 80% at 0°C, 110% at 40°C</p>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Battery Life Estimation</h2>
              
              {batteryLife && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-bold text-green-900 mb-2">Estimated Battery Life</h3>
                    <p className="text-2xl font-bold text-green-600">{formatTime(batteryLife.hours)}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-700 text-sm">Hours</h4>
                      <p className="text-lg font-bold text-gray-900">{batteryLife.hours.toFixed(1)}</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-700 text-sm">Days</h4>
                      <p className="text-lg font-bold text-gray-900">{batteryLife.days.toFixed(1)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-700 text-sm">Effective Capacity</h4>
                      <p className="text-lg font-bold text-gray-900">{effectiveCapacity?.toFixed(0)} mAh</p>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <h4 className="font-medium text-gray-700 text-sm">Total Current Draw</h4>
                      <p className="text-lg font-bold text-gray-900">{actualCurrent?.toFixed(2)} mA</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Battery Info */}
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-3">Battery Characteristics</h4>
                {batteryType && (
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>• Usable Capacity: {(batteryTypes[batteryType as keyof typeof batteryTypes].usableCapacity * 100).toFixed(0)}%</p>
                    <p>• Self-discharge: {(batteryTypes[batteryType as keyof typeof batteryTypes].selfDischarge * 100).toFixed(1)}% per month</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Information Section */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Info className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-blue-900">Battery Life Factors</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
              <div>
                <h4 className="font-medium mb-2">Key Factors:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Battery capacity and type</li>
                  <li>• Average current consumption</li>
                  <li>• Duty cycle and usage patterns</li>
                  <li>• Operating temperature</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Optimization Tips:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Use sleep modes when possible</li>
                  <li>• Optimize code for lower power</li>
                  <li>• Choose efficient voltage regulators</li>
                  <li>• Consider battery chemistry carefully</li>
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
              <li>• This is an estimation - actual battery life may vary significantly</li>
              <li>• Battery aging, temperature, and discharge rate affect capacity</li>
              <li>• Consider adding 20-50% safety margin for critical applications</li>
              <li>• Test with actual hardware for accurate measurements</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BatteryLifePage;
