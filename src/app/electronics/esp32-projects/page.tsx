import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  href: string;
  image: string;
}

const ESP32ProjectsPage = () => {
  const projects: Project[] = [
    {
      title: 'ESP32-CAM Pinout Reference',
      description: 'Without a doubt, the ESP32-CAM is a powerful device with...',
      href: '/esp32-cam-pinout-reference',
      image: '/images/esp32-cam-pinout.jpg'
    },
    {
      title: 'Create A Simple ESP32 Weather Station With BME280',
      description: 'Don\'t rely solely on smartphone weather apps or commercial weather...',
      href: '/bme280-esp32-weather-station',
      image: '/images/esp32-weather-station.jpg'
    },
    {
      title: 'ESP32 vs. ESP8266: Which Microcontroller Is Right for You?',
      description: 'ESP32 vs. ESP8266. If you have an Internet of Things...',
      href: '/esp32-vs-esp8266-comparison',
      image: '/images/esp32-vs-esp8266.jpg'
    },
    {
      title: 'Getting Started with ESP32',
      description: 'A few years ago, the ESP8266 revolutionized the embedded IoT...',
      href: '/getting-started-with-esp32',
      image: '/images/getting-started-esp32.jpg'
    },
    {
      title: 'Interface DHT11 DHT22 with ESP32 & Display Values Using Web Server',
      description: 'Have you ever wished you could use your mobile, tablet,...',
      href: '/esp32-dht11-dht22-web-server-tutorial',
      image: '/images/esp32-dht-web-server.jpg'
    },
    {
      title: 'ESP32 Basics: Hall Effect Sensor',
      description: 'A Hall effect sensor (or simply Hall sensor) is a...',
      href: '/esp32-hall-effect-sensor-tutorial',
      image: '/images/esp32-hall-sensor.jpg'
    },
    {
      title: 'Create A Simple ESP32 Web Server In Arduino IDE',
      description: 'The ESP32, the newly released successor to the ESP8266, has...',
      href: '/creating-esp32-web-server-arduino-ide',
      image: '/images/esp32-web-server.jpg'
    },
    {
      title: 'How to Find and Change the MAC Address on ESP32',
      description: 'Each ESP32 has a unique MAC address that is hardcoded...',
      href: '/esp32-mac-address-tutorial',
      image: '/images/esp32-mac-address.jpg'
    },
    {
      title: 'ESP32 Basics: Bluetooth Low Energy (BLE)',
      description: 'Bluetooth Low Energy (BLE) is everywhere these days. If you...',
      href: '/esp32-ble-tutorial',
      image: '/images/esp32-ble.jpg'
    },
    {
      title: 'How to set up mDNS on an ESP32',
      description: 'If you have a single ESP32 on your network, you...',
      href: '/esp32-mdns-tutorial',
      image: '/images/esp32-mdns.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ESP32 Projects</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore comprehensive ESP32 tutorials and projects covering IoT applications,
            wireless communication, sensors, and advanced microcontroller programming.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-600 opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">ESP32 Tutorial</span>
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
      </section>
    </div>
  );
};

export default ESP32ProjectsPage;
