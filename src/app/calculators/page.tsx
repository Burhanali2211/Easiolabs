'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Zap, Palette, Ruler, ArrowRight } from 'lucide-react';

const CalculatorsPage = () => {
  const calculators = [
    {
      id: 'resistor-color-code',
      title: 'Resistor Color Code Calculator',
      description: 'Decode resistor values from color bands or find colors for a specific resistance value.',
      icon: Palette,
      difficulty: 'Beginner',
      category: 'Components',
      href: '/calculators/resistor-color-code',
      features: ['4-band and 5-band resistors', 'Color to value conversion', 'Value to color conversion', 'Tolerance calculation']
    },
    {
      id: 'ohms-law',
      title: 'Ohm\'s Law Calculator',
      description: 'Calculate voltage, current, resistance, or power using Ohm\'s Law and power formulas.',
      icon: Zap,
      difficulty: 'Beginner',
      category: 'Basic Calculations',
      href: '/calculators/ohms-law',
      features: ['V = I × R calculations', 'Power calculations', 'Unit conversions', 'Visual circuit diagram']
    },
    {
      id: 'voltage-divider',
      title: 'Voltage Divider Calculator',
      description: 'Calculate output voltage and resistor values for voltage divider circuits.',
      icon: Ruler,
      difficulty: 'Intermediate',
      category: 'Circuit Design',
      href: '/calculators/voltage-divider',
      features: ['Output voltage calculation', 'Resistor value finder', 'Load current effects', 'Circuit visualization']
    },
    {
      id: 'capacitor',
      title: 'Capacitor Calculator',
      description: 'Calculate capacitive reactance, time constants, and energy storage.',
      icon: Zap,
      difficulty: 'Intermediate',
      category: 'Components',
      href: '/calculators/capacitor',
      features: ['Capacitive reactance', 'RC time constants', 'Energy storage', 'Frequency response']
    },
    {
      id: 'inductor',
      title: 'Inductor Calculator',
      description: 'Calculate inductive reactance, time constants, and magnetic energy.',
      icon: Zap,
      difficulty: 'Intermediate',
      category: 'Components',
      href: '/calculators/inductor',
      features: ['Inductive reactance', 'RL time constants', 'Energy storage', 'Impedance calculations']
    },
    {
      id: 'led-resistor',
      title: 'LED Current Limiting Resistor',
      description: 'Calculate the correct resistor value to safely drive LEDs at desired brightness.',
      icon: Calculator,
      difficulty: 'Beginner',
      category: 'Components',
      href: '/calculators/led-resistor',
      features: ['Multiple LED types', 'Series/parallel configurations', 'Power dissipation', 'Safety margins']
    },
    {
      id: 'pcb-trace-width',
      title: 'PCB Trace Width Calculator',
      description: 'Calculate minimum trace width for PCB designs based on current and temperature rise.',
      icon: Ruler,
      difficulty: 'Advanced',
      category: 'PCB Design',
      href: '/calculators/pcb-trace-width',
      features: ['IPC-2221 standards', 'Internal/external layers', 'Temperature rise', 'Resistance calculation']
    },
    {
      id: 'battery-life',
      title: 'Battery Life Calculator',
      description: 'Estimate battery life based on capacity, current draw, and usage patterns.',
      icon: Calculator,
      difficulty: 'Intermediate',
      category: 'Power',
      href: '/calculators/battery-life',
      features: ['Multiple battery types', 'Duty cycle support', 'Temperature effects', 'Self-discharge']
    },
    {
      id: 'op-amp',
      title: 'Op-Amp Calculator',
      description: 'Calculate gain and parameters for common operational amplifier configurations.',
      icon: Zap,
      difficulty: 'Advanced',
      category: 'Analog',
      href: '/calculators/op-amp',
      features: ['Multiple configurations', 'Gain calculations', 'Input impedance', 'Frequency response']
    },
    {
      id: 'filter',
      title: 'Filter Calculator',
      description: 'Calculate frequency response and characteristics of RC, LC, and RLC filters.',
      icon: Zap,
      difficulty: 'Advanced',
      category: 'Analog',
      href: '/calculators/filter',
      features: ['Multiple filter types', 'Frequency response', 'Phase calculations', 'Q factor analysis']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Components': return 'bg-blue-100 text-blue-800';
      case 'Basic Calculations': return 'bg-purple-100 text-purple-800';
      case 'Circuit Design': return 'bg-indigo-100 text-indigo-800';
      case 'PCB Design': return 'bg-green-100 text-green-800';
      case 'Power': return 'bg-yellow-100 text-yellow-800';
      case 'Analog': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Calculator className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Electronics Calculators
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Interactive tools to help you design circuits, calculate component values,
              and solve electronics problems quickly and accurately.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Why Use Electronics Calculators?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Save Time & Avoid Errors</h3>
              <p className="text-blue-800 text-sm">
                Quickly calculate component values without manual math. Reduce calculation
                errors that could damage your circuits or components.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-blue-900 mb-2">Learn While You Calculate</h3>
              <p className="text-blue-800 text-sm">
                Each calculator shows the formulas and explains the concepts, helping you
                understand the theory behind the calculations.
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {calculators.map((calc) => {
            const Icon = calc.icon;
            return (
              <div key={calc.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-blue-100 rounded-lg p-3 mr-4">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{calc.title}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`px-2 py-1 text-xs rounded ${getCategoryColor(calc.category)}`}>
                            {calc.category}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(calc.difficulty)}`}>
                            {calc.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{calc.description}</p>

                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Features:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {calc.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-700">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={calc.href}
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full justify-center"
                  >
                    Open Calculator
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Tips */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            Calculator Tips for Beginners
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold text-green-900 mb-3">Getting Started</h3>
              <ul className="text-green-800 space-y-2 text-sm">
                <li>• Start with the Resistor Color Code calculator - it's the most commonly used</li>
                <li>• Use Ohm's Law calculator to understand the relationship between V, I, and R</li>
                <li>• Always double-check your calculations with a multimeter when possible</li>
                <li>• Keep a notebook of calculated values for your projects</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-green-900 mb-3">Best Practices</h3>
              <ul className="text-green-800 space-y-2 text-sm">
                <li>• Use standard resistor values (E12 or E24 series) when possible</li>
                <li>• Add safety margins to your calculations (10-20% extra)</li>
                <li>• Consider component tolerances in critical circuits</li>
                <li>• Verify power ratings for resistors and other components</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Professional-Grade Calculators
          </h2>
          <p className="text-gray-700 mb-6">
            Our advanced calculators use industry-standard formulas and provide professional-level accuracy:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">✅ PCB Trace Width Calculator</h4>
              <p className="text-gray-600 text-sm">IPC-2221 compliant calculations for professional PCB design</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">✅ Battery Life Calculator</h4>
              <p className="text-gray-600 text-sm">Comprehensive battery analysis with temperature and efficiency factors</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">✅ Op-Amp Calculator</h4>
              <p className="text-gray-600 text-sm">Multiple configurations with gain, impedance, and frequency analysis</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">✅ Filter Calculator</h4>
              <p className="text-gray-600 text-sm">RC, LC, and RLC filter analysis with frequency response calculations</p>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need Help Using These Calculators?
          </h2>
          <p className="text-gray-600 mb-8">
            Check out our tutorials and guides for step-by-step instructions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/electronics-101"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Electronics 101 Course
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorsPage;
