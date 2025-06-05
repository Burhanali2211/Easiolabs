import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  href: string;
  image: string;
}

const WirelessIoTPage = () => {
  const wirelessProjects: Project[] = [
    {
      title: 'How nRF24L01+ Wireless Module Works & Interface with Arduino',
      description: 'Imagine having two or more Arduinos talking to each other wirelessly! This opens up a world of possibilities for remote monitoring, control systems, and sensor networks.',
      href: '/nrf24l01-arduino-wireless-communication',
      image: '/images/nrf24l01-tutorial.jpg'
    },
    {
      title: 'ESP8266 WiFi Module with Arduino',
      description: 'Connect your Arduino projects to the internet using the ESP8266 WiFi module for IoT applications and remote monitoring.',
      href: '/esp8266-wifi-arduino-tutorial',
      image: '/images/esp8266-wifi-tutorial.jpg'
    },
    {
      title: 'Bluetooth Communication with Arduino',
      description: 'Learn how to add Bluetooth connectivity to your Arduino projects for wireless control and data transmission.',
      href: '/bluetooth-arduino-tutorial',
      image: '/images/bluetooth-tutorial.jpg'
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
            <span>Wireless & IoT</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Arduino Wireless & IoT Projects</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Explore wireless communication and Internet of Things (IoT) projects with Arduino including WiFi modules, 
            Bluetooth communication, and wireless sensor networks.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wirelessProjects.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Wireless Tutorial</span>
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

export default WirelessIoTPage;
