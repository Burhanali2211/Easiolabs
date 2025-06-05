import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  href: string;
  image: string;
}

const SensorsPage = () => {
  const sensorProjects: Project[] = [
    {
      title: 'How HC-SR04 Ultrasonic Sensor Works & Interface It With Arduino',
      description: 'Whether you\'re building a robot that needs to avoid obstacles, an automatic door that opens when someone approaches, or a parking assistant, the HC-SR04 is perfect for your projects.',
      href: '/arduino-sr04-ultrasonic-sensor-tutorial',
      image: '/images/hc-sr04-tutorial.jpg'
    },
    {
      title: 'How HC-SR501 PIR Sensor Works & Interface It With Arduino',
      description: 'Have you ever wondered how automatic doors know when you\'re approaching? Or how your hallway light turns on when you walk by? The answer is PIR (Passive Infrared) sensors.',
      href: '/pir-sensor-arduino-tutorial',
      image: '/images/pir-sensor-tutorial.jpg'
    },
    {
      title: 'Interfacing DHT11 and DHT22 Sensors with Arduino',
      description: 'Looking to keep track of the climate in your greenhouse, create a humidor control system, or build a weather station? DHT sensors are perfect for these applications.',
      href: '/dht11-dht22-arduino-tutorial',
      image: '/images/dht-sensor-tutorial.jpg'
    },
    {
      title: 'How Soil Moisture Sensor Works and Interface it with Arduino',
      description: 'When you hear the term "smart garden," one of the first things that comes to mind is automated watering based on soil moisture levels.',
      href: '/soil-moisture-sensor-arduino-tutorial',
      image: '/images/soil-moisture-tutorial.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/electronics/arduino-projects" className="hover:text-blue-600">Arduino Projects</Link>
            <span className="mx-2">/</span>
            <span>Sensors</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Arduino Sensor Projects</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Discover how to interface various sensors with Arduino including ultrasonic sensors, PIR sensors, 
            temperature and humidity sensors, and more for your IoT and automation projects.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sensorProjects.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-green-600 opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Sensor Tutorial</span>
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

export default SensorsPage;
