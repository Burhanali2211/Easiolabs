'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X } from 'lucide-react';

interface SearchResult {
  title: string;
  description: string;
  href: string;
  category: string;
  keywords?: string[];
}

interface SearchResultsProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
}

// Comprehensive search data - real content index of all website pages
const searchData: SearchResult[] = [
  // Electronics 101 Course
  {
    title: 'Electronics 101: What is Electronics?',
    description: 'Learn the fundamentals of electronics, voltage, current, resistance, and Ohm\'s Law. Perfect starting point for beginners.',
    href: '/electronics-101/what-is-electronics',
    category: 'Electronics 101',
    keywords: ['electronics', 'voltage', 'current', 'resistance', 'ohms law', 'basics', 'fundamentals', 'beginner']
  },
  {
    title: 'Electronics 101: Essential Components',
    description: 'Understand resistors, capacitors, LEDs, switches, and batteries - the building blocks of electronic circuits.',
    href: '/electronics-101/essential-components',
    category: 'Electronics 101',
    keywords: ['resistor', 'capacitor', 'led', 'switch', 'battery', 'components', 'parts', 'electronic']
  },
  {
    title: 'Electronics 101: Reading Circuit Diagrams',
    description: 'Learn how to read and understand electronic circuit diagrams, symbols, and schematic conventions.',
    href: '/electronics-101/reading-circuit-diagrams',
    category: 'Electronics 101',
    keywords: ['circuit diagram', 'schematic', 'symbols', 'reading', 'understanding', 'conventions']
  },
  {
    title: 'Electronics 101: Using a Breadboard',
    description: 'Master breadboard prototyping - learn connections, power rails, and circuit building techniques.',
    href: '/electronics-101/using-breadboard',
    category: 'Electronics 101',
    keywords: ['breadboard', 'prototyping', 'connections', 'power rails', 'circuit building']
  },
  {
    title: 'Electronics 101: Your First LED Circuit',
    description: 'Build your first electronic circuit with an LED and current-limiting resistor. Hands-on learning!',
    href: '/electronics-101/first-led-circuit',
    category: 'Electronics 101',
    keywords: ['led circuit', 'first circuit', 'current limiting', 'resistor', 'hands-on', 'practical']
  },
  {
    title: 'Electronics 101: Introduction to Arduino',
    description: 'Get started with Arduino programming, hardware basics, and your first microcontroller project.',
    href: '/electronics-101/intro-arduino',
    category: 'Electronics 101',
    keywords: ['arduino', 'microcontroller', 'programming', 'hardware', 'getting started', 'beginner']
  },

  // Arduino Tutorials
  {
    title: 'HC-SR04 Ultrasonic Sensor with Arduino',
    description: 'Learn how to use the HC-SR04 ultrasonic sensor with Arduino for distance measurement and obstacle detection.',
    href: '/arduino-sr04-ultrasonic-sensor-tutorial',
    category: 'Arduino',
    keywords: ['hc-sr04', 'ultrasonic', 'sensor', 'distance', 'measurement', 'obstacle detection', 'arduino']
  },
  {
    title: 'DHT11 and DHT22 Sensors with Arduino',
    description: 'Complete guide to interfacing DHT11 and DHT22 temperature and humidity sensors with Arduino.',
    href: '/dht11-dht22-arduino-tutorial',
    category: 'Arduino',
    keywords: ['dht11', 'dht22', 'temperature', 'humidity', 'sensor', 'arduino', 'environmental']
  },
  {
    title: 'PIR Motion Sensor with Arduino',
    description: 'Interface PIR motion sensor with Arduino for motion detection, security systems, and automation.',
    href: '/pir-sensor-arduino-tutorial',
    category: 'Arduino',
    keywords: ['pir', 'motion sensor', 'detection', 'security', 'automation', 'arduino']
  },
  {
    title: 'Servo Motor Control with Arduino',
    description: 'Learn how to control servo motors with Arduino for robotics, automation, and precise positioning.',
    href: '/servo-motor-arduino-tutorial',
    category: 'Arduino',
    keywords: ['servo motor', 'control', 'robotics', 'automation', 'positioning', 'arduino']
  },
  {
    title: 'I2C LCD Display with Arduino',
    description: 'Connect and program I2C LCD displays with Arduino for text output and user interfaces.',
    href: '/i2c-lcd-arduino-tutorial',
    category: 'Arduino',
    keywords: ['i2c', 'lcd', 'display', 'text', 'output', 'interface', 'arduino']
  },
  {
    title: 'NRF24L01 Arduino Wireless Communication',
    description: 'Establish wireless communication between Arduino boards using NRF24L01 radio modules.',
    href: '/nrf24l01-arduino-wireless-communication',
    category: 'Arduino',
    keywords: ['nrf24l01', 'wireless', 'communication', 'radio', 'arduino', 'remote']
  },
  {
    title: 'Soil Moisture Sensor with Arduino',
    description: 'Monitor soil moisture levels using Arduino for automated plant watering and garden monitoring.',
    href: '/soil-moisture-sensor-arduino-tutorial',
    category: 'Arduino',
    keywords: ['soil moisture', 'sensor', 'plant watering', 'garden', 'monitoring', 'arduino']
  },

  // ESP32 Tutorials
  {
    title: 'ESP32 vs ESP8266: Complete Comparison',
    description: 'Detailed comparison between ESP32 and ESP8266 microcontrollers - features, performance, and use cases.',
    href: '/esp32-vs-esp8266-comparison',
    category: 'ESP32',
    keywords: ['esp32', 'esp8266', 'comparison', 'microcontroller', 'wifi', 'bluetooth', 'iot']
  },
  {
    title: 'BME280 ESP32 Weather Station',
    description: 'Build a complete IoT weather station using BME280 sensor and ESP32 with web interface and data logging.',
    href: '/bme280-esp32-weather-station',
    category: 'ESP32',
    keywords: ['bme280', 'weather station', 'esp32', 'iot', 'web interface', 'data logging']
  },
  {
    title: 'ESP32-CAM Pinout Reference Guide',
    description: 'Complete pinout reference for ESP32-CAM module with detailed pin descriptions and camera features.',
    href: '/esp32-cam-pinout-reference',
    category: 'ESP32',
    keywords: ['esp32-cam', 'pinout', 'reference', 'camera', 'pins', 'gpio']
  },

  // ESP8266 Tutorials
  {
    title: 'ESP8266 DHT11/DHT22 Web Server',
    description: 'Create a web server with ESP8266 to display temperature and humidity data from DHT sensors.',
    href: '/esp8266-dht11-dht22-web-server-tutorial',
    category: 'ESP8266',
    keywords: ['esp8266', 'web server', 'dht11', 'dht22', 'temperature', 'humidity', 'iot']
  },
  {
    title: 'ESP8266 WLED Tutorial: Smart LED Control',
    description: 'Learn how to set up WLED on ESP8266 for advanced LED strip control with effects and automation.',
    href: '/esp8266-wled-tutorial',
    category: 'ESP8266',
    keywords: ['esp8266', 'wled', 'led strip', 'smart lighting', 'effects', 'automation']
  },
  {
    title: 'Wemos D1 Mini Pinout Reference',
    description: 'Detailed pinout guide for Wemos D1 Mini ESP8266 development board with GPIO descriptions.',
    href: '/wemos-d1-mini-pinout-reference',
    category: 'ESP8266',
    keywords: ['wemos d1 mini', 'pinout', 'esp8266', 'gpio', 'development board', 'reference']
  },

  // Calculators and Tools
  {
    title: 'Electronics Calculators',
    description: 'Interactive tools for resistor color codes, Ohm\'s law, LED calculations, and more electronic calculations.',
    href: '/calculators',
    category: 'Calculators',
    keywords: ['calculators', 'tools', 'resistor', 'ohms law', 'led', 'voltage divider', 'capacitor']
  },
  {
    title: 'Resistor Color Code Calculator',
    description: 'Decode resistor values from color bands or find colors for specific resistance values. 4-band and 5-band support.',
    href: '/calculators/resistor-color-code',
    category: 'Calculators',
    keywords: ['resistor', 'color code', 'calculator', 'resistance', 'bands', 'decode']
  },
  {
    title: 'Ohm\'s Law Calculator',
    description: 'Calculate voltage, current, resistance, and power using Ohm\'s Law. Essential electronics calculator.',
    href: '/calculators/ohms-law',
    category: 'Calculators',
    keywords: ['ohms law', 'voltage', 'current', 'resistance', 'power', 'calculator']
  },
  {
    title: 'LED Resistor Calculator',
    description: 'Calculate the correct current-limiting resistor value for LED circuits. Prevent LED burnout.',
    href: '/calculators/led-resistor',
    category: 'Calculators',
    keywords: ['led', 'resistor', 'current limiting', 'calculator', 'led circuit']
  },
  {
    title: 'Voltage Divider Calculator',
    description: 'Calculate output voltage and resistor values for voltage divider circuits. Multiple calculation modes.',
    href: '/calculators/voltage-divider',
    category: 'Calculators',
    keywords: ['voltage divider', 'calculator', 'resistor', 'output voltage', 'circuit']
  },
  {
    title: 'Capacitor Calculator',
    description: 'Calculate capacitance, reactance, energy storage, and time constants for capacitor circuits.',
    href: '/calculators/capacitor',
    category: 'Calculators',
    keywords: ['capacitor', 'capacitance', 'reactance', 'energy storage', 'time constant']
  },
  {
    title: 'Inductor Calculator',
    description: 'Calculate inductance, reactance, and energy storage for inductors in AC and DC circuits.',
    href: '/calculators/inductor',
    category: 'Calculators',
    keywords: ['inductor', 'inductance', 'reactance', 'energy storage', 'ac', 'dc']
  },
  {
    title: 'PCB Trace Width Calculator',
    description: 'Calculate minimum trace width for PCB designs based on current and temperature rise using IPC-2221 standards.',
    href: '/calculators/pcb-trace-width',
    category: 'Calculators',
    keywords: ['pcb', 'trace width', 'current', 'temperature', 'ipc-2221', 'pcb design', 'copper']
  },
  {
    title: 'Battery Life Calculator',
    description: 'Estimate battery life based on capacity, current draw, usage patterns, and environmental factors.',
    href: '/calculators/battery-life',
    category: 'Calculators',
    keywords: ['battery', 'battery life', 'capacity', 'current draw', 'power consumption', 'runtime']
  },
  {
    title: 'Op-Amp Calculator',
    description: 'Calculate gain and parameters for operational amplifier configurations including inverting, non-inverting, and differential.',
    href: '/calculators/op-amp',
    category: 'Calculators',
    keywords: ['op-amp', 'operational amplifier', 'gain', 'inverting', 'non-inverting', 'differential', 'analog']
  },
  {
    title: 'Filter Calculator',
    description: 'Calculate frequency response and characteristics of RC, LC, and RLC electronic filters.',
    href: '/calculators/filter',
    category: 'Calculators',
    keywords: ['filter', 'frequency response', 'rc filter', 'lc filter', 'rlc filter', 'lowpass', 'highpass', 'bandpass']
  },

  // Interactive Tools
  {
    title: 'Circuit Simulator',
    description: 'Simulate electronic circuits in your browser with interactive components, real-time analysis, and visualization.',
    href: '/circuit-simulator',
    category: 'Tools',
    keywords: ['circuit simulator', 'simulation', 'electronic circuits', 'interactive', 'analysis']
  },
  {
    title: 'Arduino Code Playground',
    description: 'Write, test, and simulate Arduino code in your browser with virtual hardware and serial monitor.',
    href: '/arduino-playground',
    category: 'Tools',
    keywords: ['arduino', 'code', 'playground', 'simulator', 'programming', 'virtual']
  },

  // Theory and Reference
  {
    title: 'PN Junction Diode Fundamentals',
    description: 'Understanding the physics and applications of PN junction diodes in electronic circuits.',
    href: '/pn-junction-diode',
    category: 'Theory',
    keywords: ['pn junction', 'diode', 'semiconductor', 'physics', 'fundamentals']
  },
  {
    title: 'The Half-Wave Rectifier Circuit',
    description: 'Learn about half-wave rectifier circuits, operation principles, and power supply applications.',
    href: '/the-half-wave-rectifier',
    category: 'Theory',
    keywords: ['half-wave rectifier', 'power supply', 'ac to dc', 'diode', 'rectification']
  },
  {
    title: 'The Zener Diode: Voltage Regulation',
    description: 'Understanding Zener diodes and their use in voltage regulation and reference circuits.',
    href: '/the-zener-diode',
    category: 'Theory',
    keywords: ['zener diode', 'voltage regulation', 'reference', 'breakdown voltage']
  },
  {
    title: 'Component Guide',
    description: 'Comprehensive guide to electronic components - resistors, capacitors, semiconductors, and more.',
    href: '/component-guide',
    category: 'Reference',
    keywords: ['components', 'guide', 'resistors', 'capacitors', 'semiconductors', 'reference']
  },
  {
    title: 'Electronics Glossary',
    description: 'Definitions of common electronics terms, concepts, and technical vocabulary.',
    href: '/glossary',
    category: 'Reference',
    keywords: ['glossary', 'definitions', 'terms', 'electronics', 'vocabulary']
  },
  {
    title: 'Common Electronics Mistakes',
    description: 'Learn about common mistakes in electronics projects and how to avoid them. Troubleshooting tips.',
    href: '/common-mistakes',
    category: 'Tips',
    keywords: ['mistakes', 'troubleshooting', 'common errors', 'tips', 'debugging']
  },
  {
    title: 'Frequently Asked Questions',
    description: 'Answers to common questions about electronics, Arduino programming, and circuit design.',
    href: '/faq',
    category: 'Help',
    keywords: ['faq', 'questions', 'answers', 'help', 'support']
  },

  // Company Pages
  {
    title: 'About Us',
    description: 'Learn about our mission to make electronics education accessible to everyone.',
    href: '/about-us',
    category: 'Company',
    keywords: ['about', 'mission', 'team', 'electronics education']
  },
  {
    title: 'Contact Us',
    description: 'Get in touch with our team for questions, suggestions, or collaboration opportunities.',
    href: '/contact',
    category: 'Company',
    keywords: ['contact', 'support', 'questions', 'collaboration']
  },
  {
    title: 'Our Services',
    description: 'Tutorial services, project consultation, and custom development offerings.',
    href: '/services',
    category: 'Company',
    keywords: ['services', 'consultation', 'development', 'tutorials']
  }
];

const SearchResults = ({ isOpen, onClose, searchQuery }: SearchResultsProps) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsLoading(true);

      // Simulate API delay
      const timer = setTimeout(() => {
        const query = searchQuery.toLowerCase();
        const filteredResults = searchData.filter(item => {
          // Search in title, description, category, and keywords
          const titleMatch = item.title.toLowerCase().includes(query);
          const descriptionMatch = item.description.toLowerCase().includes(query);
          const categoryMatch = item.category.toLowerCase().includes(query);
          const keywordMatch = item.keywords?.some(keyword =>
            keyword.toLowerCase().includes(query)
          ) || false;

          return titleMatch || descriptionMatch || categoryMatch || keywordMatch;
        });

        // Sort results by relevance (title matches first, then description, then keywords)
        const sortedResults = filteredResults.sort((a, b) => {
          const aTitle = a.title.toLowerCase().includes(query);
          const bTitle = b.title.toLowerCase().includes(query);
          const aDesc = a.description.toLowerCase().includes(query);
          const bDesc = b.description.toLowerCase().includes(query);

          if (aTitle && !bTitle) return -1;
          if (!aTitle && bTitle) return 1;
          if (aDesc && !bDesc) return -1;
          if (!aDesc && bDesc) return 1;
          return 0;
        });

        setResults(sortedResults);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsLoading(false);
    }
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-96 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <Search className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-lg font-medium text-gray-900">
              Search Results
              {searchQuery && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  for "{searchQuery}"
                </span>
              )}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Searching...</p>
            </div>
          ) : searchQuery.length <= 2 ? (
            <div className="p-8 text-center text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Type at least 3 characters to search</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p>No results found for "{searchQuery}"</p>
              <p className="text-sm mt-2">Try different keywords or browse our categories</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {results.map((result, index) => (
                <Link
                  key={index}
                  href={result.href}
                  onClick={onClose}
                  className="block p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                        {result.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {result.description}
                      </p>
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {result.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <p className="text-sm text-gray-500 text-center">
              Found {results.length} result{results.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
