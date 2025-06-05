'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Search, Book, Zap, Cpu, HelpCircle } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'basics', name: 'Electronics Basics', icon: Book },
    { id: 'arduino', name: 'Arduino', icon: Cpu },
    { id: 'esp', name: 'ESP32/ESP8266', icon: Zap },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: Search }
  ];

  const faqItems: FAQItem[] = [
    {
      id: '1',
      category: 'basics',
      question: 'What is the difference between voltage, current, and resistance?',
      answer: 'Voltage (V) is the electrical potential difference, measured in volts. Think of it as electrical pressure. Current (I) is the flow of electrical charge, measured in amperes (amps). Resistance (R) opposes the flow of current, measured in ohms (Ω). They\'re related by Ohm\'s Law: V = I × R.'
    },
    {
      id: '2',
      category: 'basics',
      question: 'How do I read resistor color codes?',
      answer: 'Resistor color codes use colored bands to indicate resistance values. For 4-band resistors: the first two bands are digits, the third is a multiplier, and the fourth is tolerance. For example: Red-Red-Brown-Gold = 22 × 10¹ = 220Ω ±5%. We have a resistor calculator tool to help you with this!'
    },
    {
      id: '3',
      category: 'arduino',
      question: 'What Arduino board should I start with as a beginner?',
      answer: 'The Arduino Uno R3 is perfect for beginners. It has 14 digital pins, 6 analog inputs, built-in LED, and extensive community support. It\'s compatible with most shields and has plenty of tutorials available. The Arduino Nano is also great if you need something smaller.'
    },
    {
      id: '4',
      category: 'arduino',
      question: 'Why is my Arduino not uploading code?',
      answer: 'Common causes: 1) Wrong board/port selected in Arduino IDE, 2) USB cable issues (try a different cable), 3) Driver problems, 4) Another program using the serial port, 5) Faulty Arduino board. Check Tools > Board and Tools > Port settings first.'
    },
    {
      id: '5',
      category: 'esp',
      question: 'What\'s the difference between ESP32 and ESP8266?',
      answer: 'ESP32 is more powerful with dual-core processor, more GPIO pins, built-in Bluetooth, and better WiFi. ESP8266 is simpler, cheaper, and perfect for basic IoT projects. Choose ESP8266 for simple WiFi projects, ESP32 for complex applications requiring more processing power or Bluetooth.'
    },
    {
      id: '6',
      category: 'esp',
      question: 'How do I connect ESP8266 to WiFi?',
      answer: 'Use the WiFi library: WiFi.begin("your_ssid", "your_password"); then check connection with WiFi.status() == WL_CONNECTED. Make sure your network is 2.4GHz (ESP8266 doesn\'t support 5GHz). Check our ESP8266 WiFi tutorial for complete code examples.'
    },
    {
      id: '7',
      category: 'troubleshooting',
      question: 'My circuit isn\'t working. What should I check first?',
      answer: 'Follow this checklist: 1) Power supply - correct voltage and polarity, 2) Connections - loose wires or breadboard issues, 3) Component orientation - LEDs, diodes, ICs in correct direction, 4) Code - syntax errors or logic issues, 5) Component damage - test with multimeter.'
    },
    {
      id: '8',
      category: 'troubleshooting',
      question: 'How do I use a multimeter to debug circuits?',
      answer: 'Set multimeter to appropriate range. For voltage: connect probes across component (red to positive). For current: break circuit and connect in series. For resistance: power off circuit and measure across component. Always start with highest range and work down.'
    },
    {
      id: '9',
      category: 'basics',
      question: 'What tools do I need to start with electronics?',
      answer: 'Essential tools: breadboard, jumper wires, multimeter, basic components (resistors, LEDs, capacitors), Arduino/microcontroller, USB cable, and a computer. Optional but helpful: soldering iron, wire strippers, component storage, and a good workspace with proper lighting.'
    },
    {
      id: '10',
      category: 'arduino',
      question: 'How do I power my Arduino project without USB?',
      answer: 'Options: 1) DC barrel jack (7-12V recommended), 2) VIN pin with regulated voltage, 3) 5V pin with exactly 5V, 4) Battery pack through barrel jack or VIN. Never exceed voltage limits! For portable projects, consider 9V battery or 6×AA battery pack.'
    }
  ];

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about electronics, Arduino, ESP32/ESP8266, and troubleshooting. 
              Can't find what you're looking for? <a href="/contact" className="text-blue-600 hover:text-blue-700">Contact us</a>.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No questions found matching your search.</p>
              <p className="text-sm text-gray-500 mt-2">
                Try different keywords or browse all categories.
              </p>
            </div>
          ) : (
            filteredFAQs.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  {openItems.includes(item.id) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(item.id) && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Still Need Help?</h2>
          <p className="text-blue-800 mb-6">
            Can't find the answer you're looking for? Our community and support team are here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/electronics/basic-electronics"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-blue-200"
            >
              Browse Tutorials
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
