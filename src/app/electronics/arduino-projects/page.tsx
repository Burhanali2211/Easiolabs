import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  href: string;
  image: string;
  category: string;
}

const ArduinoProjectsPage = () => {
  const projects: Project[] = [
    {
      title: 'How HC-SR04 Ultrasonic Sensor Works & Interface It With Arduino',
      description: 'Whether you\'re building a robot that needs to avoid obstacles, an automatic door that opens...',
      href: '/arduino-sr04-ultrasonic-sensor-tutorial',
      image: '/images/hc-sr04-tutorial.jpg',
      category: 'Sensors'
    },
    {
      title: 'How HC-SR501 PIR Sensor Works & Interface It With Arduino',
      description: 'Have you ever wondered how automatic doors know when you\'re approaching? Or how your hallway...',
      href: '/pir-sensor-arduino-tutorial',
      image: '/images/pir-sensor-tutorial.jpg',
      category: 'Sensors'
    },
    {
      title: 'Interfacing DHT11 and DHT22 Sensors with Arduino',
      description: 'Looking to keep track of the climate in your greenhouse, create a humidor control system...',
      href: '/dht11-dht22-arduino-tutorial',
      image: '/images/dht-sensor-tutorial.jpg',
      category: 'Sensors'
    },
    {
      title: 'Interface an I2C LCD with Arduino',
      description: 'If you\'ve ever tried connecting an LCD display to an Arduino, you\'ve probably noticed it...',
      href: '/i2c-lcd-arduino-tutorial',
      image: '/images/i2c-lcd-tutorial.jpg',
      category: 'Displays'
    },
    {
      title: 'How Servo Motor Works & Interface It With Arduino',
      description: 'When it comes to choosing the right motor for a project, the options can be...',
      href: '/servo-motor-arduino-tutorial',
      image: '/images/servo-motor-tutorial.jpg',
      category: 'Motors'
    },
    {
      title: 'How nRF24L01+ Wireless Module Works & Interface with Arduino',
      description: 'Imagine having two or more Arduinos talking to each other wirelessly! This opens up a...',
      href: '/nrf24l01-arduino-wireless-communication',
      image: '/images/nrf24l01-tutorial.jpg',
      category: 'Wireless & IoT'
    }
  ];

  const categories = ['All', 'Sensors', 'Modules', 'Displays', 'Motors', 'Wireless & IoT'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Arduino Projects</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore best useful Arduino Projects and tutorials with working principle, pinout, 
            detailed wiring diagram & step-by-step code explanation.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  category === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Sections */}
          {categories.slice(1).map((category) => (
            <div key={category} className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                <Link
                  href={`/electronics/arduino-projects/${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                  className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                >
                  View All
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects
                  .filter(project => project.category === category)
                  .slice(0, 3)
                  .map((project) => (
                    <Link
                      key={project.href}
                      href={project.href}
                      className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                    >
                      <div className="aspect-video bg-gray-200 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-20"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">Tutorial Image</span>
                        </div>
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
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArduinoProjectsPage;
