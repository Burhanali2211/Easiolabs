import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  href: string;
  image: string;
}

const DisplaysPage = () => {
  const displayProjects: Project[] = [
    {
      title: 'Interface an I2C LCD with Arduino',
      description: 'If you\'ve ever tried connecting an LCD display to an Arduino, you\'ve probably noticed it requires a lot of wiring. Learn how I2C LCD modules simplify this process.',
      href: '/i2c-lcd-arduino-tutorial',
      image: '/images/i2c-lcd-tutorial.jpg'
    },
    {
      title: 'OLED Display with Arduino Tutorial',
      description: 'Learn how to use OLED displays with Arduino for creating informative and visually appealing projects with crisp text and graphics.',
      href: '/oled-display-arduino-tutorial',
      image: '/images/oled-display-tutorial.jpg'
    },
    {
      title: '7-Segment Display with Arduino',
      description: 'Master the basics of 7-segment displays with Arduino for creating digital clocks, counters, and numeric displays.',
      href: '/7-segment-display-arduino-tutorial',
      image: '/images/7-segment-tutorial.jpg'
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
            <span>Displays</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Arduino Display Projects</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Learn how to interface various displays with Arduino including LCD displays, OLED screens, 
            7-segment displays, and more for creating informative and interactive projects.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-600 opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Display Tutorial</span>
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

export default DisplaysPage;
