import Link from 'next/link';
import {
  Home,
  BookOpen,
  Users,
  Mail,
  HelpCircle,
  FileText,
  Cpu,
  Zap,
  CircuitBoard
} from 'lucide-react';

const SitemapPage = () => {
  const siteStructure = [
    {
      title: 'Main Pages',
      icon: Home,
      links: [
        { name: 'Home', href: '/', description: 'Welcome to EasyioLabs' },
        { name: 'About Us', href: '/about-us', description: 'Learn about our mission and team' },
        { name: 'Services', href: '/services', description: 'Our tutorial and consultation services' },
        { name: 'Contact', href: '/contact', description: 'Get in touch with us' },
        { name: 'FAQ', href: '/faq', description: 'Frequently asked questions' }
      ]
    },
    {
      title: 'Arduino Tutorials',
      icon: Cpu,
      links: [
        { name: 'Arduino Projects', href: '/electronics/arduino-projects', description: 'All Arduino tutorials and projects' },
        { name: 'Sensors', href: '/electronics/arduino-projects/sensors', description: 'Arduino sensor tutorials' },
        { name: 'Displays', href: '/electronics/arduino-projects/displays', description: 'LCD and display tutorials' },
        { name: 'Motors', href: '/electronics/arduino-projects/motors', description: 'Motor control tutorials' },
        { name: 'Wireless & IoT', href: '/electronics/arduino-projects/wireless-iot', description: 'Wireless communication tutorials' },
        { name: 'HC-SR04 Ultrasonic Sensor', href: '/arduino-sr04-ultrasonic-sensor-tutorial', description: 'Distance measurement with Arduino' },
        { name: 'DHT11/DHT22 Sensors', href: '/dht11-dht22-arduino-tutorial', description: 'Temperature and humidity sensing' },
        { name: 'PIR Motion Sensor', href: '/pir-sensor-arduino-tutorial', description: 'Motion detection with Arduino' },
        { name: 'I2C LCD Display', href: '/i2c-lcd-arduino-tutorial', description: 'LCD display interfacing' },
        { name: 'Servo Motor Control', href: '/servo-motor-arduino-tutorial', description: 'Servo motor programming' },
        { name: 'Soil Moisture Sensor', href: '/soil-moisture-sensor-arduino-tutorial', description: 'Plant monitoring system' },
        { name: 'nRF24L01+ Wireless', href: '/nrf24l01-arduino-wireless-communication', description: 'Wireless Arduino communication' }
      ]
    },
    {
      title: 'ESP32 Tutorials',
      icon: Zap,
      links: [
        { name: 'ESP32 Projects', href: '/electronics/esp32-projects', description: 'All ESP32 tutorials and projects' },
        { name: 'ESP32-CAM Pinout', href: '/esp32-cam-pinout-reference', description: 'Complete ESP32-CAM pin reference' },
        { name: 'ESP32 Weather Station', href: '/bme280-esp32-weather-station', description: 'BME280 weather monitoring' },
        { name: 'ESP32 vs ESP8266', href: '/esp32-vs-esp8266-comparison', description: 'Microcontroller comparison guide' }
      ]
    },
    {
      title: 'ESP8266 Tutorials',
      icon: Zap,
      links: [
        { name: 'ESP8266 Projects', href: '/electronics/esp8266-projects', description: 'All ESP8266 tutorials and projects' },
        { name: 'WeMos D1 Mini Pinout', href: '/wemos-d1-mini-pinout-reference', description: 'WeMos D1 Mini pin reference' },
        { name: 'ESP8266 WLED Tutorial', href: '/esp8266-wled-tutorial', description: 'LED strip control with WLED' },
        { name: 'ESP8266 Web Server', href: '/esp8266-dht11-dht22-web-server-tutorial', description: 'DHT sensor web interface' }
      ]
    },
    {
      title: 'Basic Electronics',
      icon: CircuitBoard,
      links: [
        { name: 'Basic Electronics', href: '/electronics/basic-electronics', description: 'Fundamental electronics concepts' },
        { name: 'PN Junction Diode', href: '/pn-junction-diode', description: 'Understanding diode operation' },
        { name: 'Zener Diode', href: '/the-zener-diode', description: 'Voltage regulation with Zener diodes' },
        { name: 'Half-Wave Rectifier', href: '/the-half-wave-rectifier', description: 'AC to DC conversion basics' }
      ]
    },
    {
      title: 'Legal & Support',
      icon: FileText,
      links: [
        { name: 'Privacy Policy', href: '/privacy-policy', description: 'How we protect your privacy' },
        { name: 'Disclaimer', href: '/disclaimer', description: 'Terms and conditions' },
        { name: 'Sitemap', href: '/sitemap', description: 'Complete site structure' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Sitemap
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Complete overview of all pages and tutorials available on EasyioLabs.
              Find exactly what you're looking for.
            </p>
          </div>
        </div>
      </section>

      {/* Sitemap Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {siteStructure.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 rounded-lg p-2 mr-3">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-3">
                  {section.links.map((link) => (
                    <div key={link.href} className="border-l-2 border-gray-100 pl-4">
                      <Link
                        href={link.href}
                        className="block group"
                      >
                        <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {link.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {link.description}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Site Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-blue-600">15+</div>
                <div className="text-blue-800">Arduino Tutorials</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">8+</div>
                <div className="text-blue-800">ESP32/ESP8266 Guides</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">5+</div>
                <div className="text-blue-800">Electronics Basics</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">4</div>
                <div className="text-blue-800">Main Categories</div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/faq"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              <HelpCircle className="h-5 w-5 mr-2" />
              Check FAQ
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <Mail className="h-5 w-5 mr-2" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitemapPage;
