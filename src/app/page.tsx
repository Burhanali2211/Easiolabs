import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Zap, BookOpen, Cpu, Wifi, CircuitBoard, Lightbulb, Brain } from 'lucide-react';

export default function Home() {
  const categories = [
    {
      title: 'Electronics 101',
      description: 'Complete beginner? Start here! Step-by-step lessons from absolute basics to building your first circuits.',
      href: '/electronics-101',
      color: 'bg-green-500',
      icon: BookOpen,
      stats: '10 Lessons'
    },
    {
      title: 'Arduino',
      description: 'If this is your first experience tinkering with electronics, Arduino is the best platform you can start playing with.',
      href: '/electronics/arduino-projects',
      color: 'bg-blue-500',
      icon: Cpu,
      stats: '25+ Projects'
    },
    {
      title: 'ESP32',
      description: 'Building a sensor network? Want to create a BLE device? ESP32 is your one-stop-solution for many IoT apps.',
      href: '/electronics/esp32-projects',
      color: 'bg-indigo-500',
      icon: Wifi,
      stats: '15+ Projects'
    },
    {
      title: 'ESP8266',
      description: 'The ESP8266 is the easiest point of entry to basic IoT. It is great for beginners and advanced users alike.',
      href: '/electronics/esp8266-projects',
      color: 'bg-purple-500',
      icon: Zap,
      stats: '20+ Projects'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Learn Electronics the Easy Way
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            From complete beginner to advanced projects. Quick, easy and to the point!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/electronics-101"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Start Electronics 101
            </Link>
            <Link
              href="/component-guide"
              className="bg-gray-100 text-gray-700 px-8 py-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Component Guide
            </Link>
          </div>

          {/* Quick Links for Beginners */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/arduino-programming-fundamentals" className="text-blue-600 hover:text-blue-700 flex items-center">
              🧠 Learn Programming
            </Link>
            <Link href="/glossary" className="text-blue-600 hover:text-blue-700 flex items-center">
              📖 Electronics Glossary
            </Link>
            <Link href="/common-mistakes" className="text-blue-600 hover:text-blue-700 flex items-center">
              ⚠️ Common Mistakes
            </Link>
            <Link href="/faq" className="text-blue-600 hover:text-blue-700 flex items-center">
              ❓ FAQ
            </Link>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover:scale-105"
                >
                  <div className={`h-2 ${category.color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-lg ${category.color} bg-opacity-10 mr-3`}>
                        <Icon className={`h-6 w-6 ${category.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {category.title}
                        </h3>
                        <span className="text-xs text-gray-500">{category.stats}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Tools Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Interactive Learning Tools</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Practice with hands-on tools designed to make learning electronics fun and engaging
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                title: 'Arduino Programming',
                description: 'Learn programming with fun analogies',
                href: '/arduino-programming-fundamentals',
                icon: Brain,
                color: 'bg-purple-500'
              },
              {
                title: 'Circuit Simulator',
                description: 'Build and test circuits virtually',
                href: '/circuit-simulator',
                icon: CircuitBoard,
                color: 'bg-green-500'
              },
              {
                title: 'Arduino Playground',
                description: 'Write and test Arduino code',
                href: '/arduino-playground',
                icon: Cpu,
                color: 'bg-blue-500'
              },
              {
                title: 'Component Guide',
                description: 'Visual component identification',
                href: '/component-guide',
                icon: Lightbulb,
                color: 'bg-yellow-500'
              },
              {
                title: 'Calculators',
                description: 'Electronics calculation tools',
                href: '/calculators',
                icon: Zap,
                color: 'bg-orange-500'
              }
            ].map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 hover:bg-opacity-20 transition-all duration-300 text-center"
                >
                  <div className={`inline-flex p-4 rounded-full ${tool.color} bg-opacity-20 mb-4`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-blue-100 text-sm mb-4">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-center text-blue-200 font-medium text-sm group-hover:text-white">
                    Try Now
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Arduino Projects */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Arduino Projects</h2>
            <Link
              href="/electronics/arduino-projects"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              VIEW ALL
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'How nRF24L01+ Wireless Module Works & Interface with Arduino',
                description: 'Imagine having two or more Arduinos talking to each other...',
                href: '/nrf24l01-arduino-wireless-communication'
              },
              {
                title: 'How Soil Moisture Sensor Works and Interface it with Arduino',
                description: 'When you hear the term "smart garden," one of the...',
                href: '/soil-moisture-sensor-arduino-tutorial'
              },
              {
                title: 'Interface an I2C LCD with Arduino',
                description: 'If you\'ve ever tried connecting an LCD display to an...',
                href: '/i2c-lcd-arduino-tutorial'
              }
            ].map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="group bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">Arduino Tutorial</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured ESP32 Projects */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">ESP32 Projects</h2>
            <Link
              href="/electronics/esp32-projects"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              VIEW ALL
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'ESP32-CAM Pinout Reference',
                description: 'Without a doubt, the ESP32-CAM is a powerful device with...',
                href: '/esp32-cam-pinout-reference'
              },
              {
                title: 'Create A Simple ESP32 Weather Station With BME280',
                description: 'Don\'t rely solely on smartphone weather apps or commercial weather...',
                href: '/bme280-esp32-weather-station'
              },
              {
                title: 'ESP32 vs. ESP8266: Which Microcontroller Is Right for You?',
                description: 'ESP32 vs. ESP8266. If you have an Internet of Things...',
                href: '/esp32-vs-esp8266-comparison'
              }
            ].map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-green-500 to-blue-600 opacity-20 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">ESP32 Tutorial</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured ESP8266 Projects */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">ESP8266 Projects</h2>
            <Link
              href="/electronics/esp8266-projects"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              VIEW ALL
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'WeMos D1 Mini Pinout Reference',
                description: 'When it comes to ESP8266 boards, the WeMos D1 Mini...',
                href: '/wemos-d1-mini-pinout-reference'
              },
              {
                title: 'Control WS2812B Addressable LEDs with ESP8266 and WLED',
                description: 'Whether you call them individually addressable RGB LEDs, WS2812B, or...',
                href: '/esp8266-wled-tutorial'
              },
              {
                title: 'Interface DHT11 DHT22 w/ ESP8266 NodeMCU Using Web Server',
                description: 'Have you ever wished you could use your mobile, tablet,...',
                href: '/esp8266-dht11-dht22-web-server-tutorial'
              }
            ].map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="group bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 opacity-20 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">ESP8266 Tutorial</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Basic Electronics */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Basic Electronics</h2>
            <Link
              href="/electronics/basic-electronics"
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
            >
              VIEW ALL
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'The Zener Diode',
                description: 'Ordinary silicon diodes block any current through them when they...',
                href: '/the-zener-diode'
              },
              {
                title: 'The Half-Wave Rectifier',
                description: 'Most electronic systems, like TVs, audio systems, and computers, need...',
                href: '/the-half-wave-rectifier'
              },
              {
                title: 'PN Junction Diode',
                description: 'A piece of n-type semiconductor or p-type semiconductor is like...',
                href: '/pn-junction-diode'
              }
            ].map((tutorial) => (
              <Link
                key={tutorial.href}
                href={tutorial.href}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 opacity-20 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">Electronics Tutorial</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {tutorial.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {tutorial.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
