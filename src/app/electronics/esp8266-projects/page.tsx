import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  href: string;
  image: string;
}

const ESP8266ProjectsPage = () => {
  const projects: Project[] = [
    {
      title: 'WeMos D1 Mini Pinout Reference',
      description: 'When it comes to ESP8266 boards, the WeMos D1 Mini...',
      href: '/wemos-d1-mini-pinout-reference',
      image: '/images/wemos-d1-mini-pinout.jpg'
    },
    {
      title: 'ESP32 vs. ESP8266: Which Microcontroller Is Right for You?',
      description: 'ESP32 vs. ESP8266. If you have an Internet of Things...',
      href: '/esp32-vs-esp8266-comparison',
      image: '/images/esp32-vs-esp8266.jpg'
    },
    {
      title: 'Control WS2812B Addressable LEDs with ESP8266 and WLED',
      description: 'Whether you call them individually addressable RGB LEDs, WS2812B, or...',
      href: '/esp8266-wled-tutorial',
      image: '/images/esp8266-wled.jpg'
    },
    {
      title: 'Interface DHT11 DHT22 w/ ESP8266 NodeMCU Using Web Server',
      description: 'Have you ever wished you could use your mobile, tablet,...',
      href: '/esp8266-dht11-dht22-web-server-tutorial',
      image: '/images/esp8266-dht-web-server.jpg'
    },
    {
      title: 'Configuring & Handling ESP8266 GPIO Interrupts In Arduino IDE',
      description: 'Often in a project you want the ESP8266 to perform...',
      href: '/handling-esp8266-gpio-interrupts-tutorial',
      image: '/images/esp8266-gpio-interrupts.jpg'
    },
    {
      title: 'Display Values of Multiple DS18B20s on ESP8266 NodeMCU Web Server',
      description: 'Have you ever wanted to have sensors scattered all around...',
      href: '/multiple-ds18b20-esp8266-nodemcu-tutorial',
      image: '/images/multiple-ds18b20-esp8266.jpg'
    },
    {
      title: 'Create A Simple ESP8266 NodeMCU Web Server In Arduino IDE',
      description: 'In recent years, the ESP8266 has risen to prominence in...',
      href: '/creating-esp8266-web-server-arduino-ide',
      image: '/images/esp8266-web-server.jpg'
    },
    {
      title: 'Interface OLED Graphic Display Module with ESP8266 NodeMCU',
      description: 'Do you want to spice up your ESP8266 IoT projects...',
      href: '/oled-display-esp8266-tutorial',
      image: '/images/esp8266-oled.jpg'
    },
    {
      title: 'ESP8266 Pinout Reference',
      description: 'One of the nice things about the ESP8266 is that...',
      href: '/esp8266-pinout-reference',
      image: '/images/esp8266-pinout.jpg'
    },
    {
      title: 'Create A Simple ESP8266 Weather Station With BME280',
      description: 'Don\'t let the smartphone weather apps or commercial weather stations(that...',
      href: '/bme280-esp8266-weather-station',
      image: '/images/esp8266-weather-station.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">ESP8266 Projects</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Discover ESP8266 NodeMCU tutorials and projects for IoT development,
            wireless connectivity, and embedded programming with step-by-step guides.
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
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">ESP8266 Tutorial</span>
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

export default ESP8266ProjectsPage;
