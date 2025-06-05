import Link from 'next/link';

interface Tutorial {
  title: string;
  description: string;
  href: string;
  image: string;
}

const BasicElectronicsPage = () => {
  const tutorials: Tutorial[] = [
    {
      title: 'The Zener Diode',
      description: 'Ordinary silicon diodes block any current through them when they...',
      href: '/the-zener-diode',
      image: '/images/zener-diode.jpg'
    },
    {
      title: 'The Half-Wave Rectifier',
      description: 'Most electronic systems, like TVs, audio systems, and computers, need...',
      href: '/the-half-wave-rectifier',
      image: '/images/half-wave-rectifier.jpg'
    },
    {
      title: 'PN Junction Diode',
      description: 'A piece of n-type semiconductor or p-type semiconductor is like...',
      href: '/pn-junction-diode',
      image: '/images/pn-junction-diode.jpg'
    },
    {
      title: 'The Full-Wave Rectifier',
      description: 'Although the half wave rectifier is used in some low...',
      href: '/the-full-wave-rectifier',
      image: '/images/full-wave-rectifier.jpg'
    },
    {
      title: 'Light Emitting Diode (LED)',
      description: 'LEDs are everywhere – in our phones, in our cars,...',
      href: '/light-emitting-diode-led',
      image: '/images/led-basics.jpg'
    },
    {
      title: 'Semiconductor Basics',
      description: 'To understand how diodes, transistors, or any integrated circuit work,...',
      href: '/semiconductor-basics',
      image: '/images/semiconductor-basics.jpg'
    },
    {
      title: 'The Full-Wave Bridge Rectifier',
      description: 'Another, more popular full-wave rectifier design exists and is built...',
      href: '/the-full-wave-bridge-rectifier',
      image: '/images/bridge-rectifier.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Basic Electronics</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            New to the world of electronics? Start here! Check out the best beginner friendly
            tutorials that teach the basics of electronic components, circuits, and fundamental concepts.
          </p>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutorials.map((tutorial) => (
              <Link
                key={tutorial.href}
                href={tutorial.href}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-600 opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Electronics Tutorial</span>
                  </div>
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
};

export default BasicElectronicsPage;
