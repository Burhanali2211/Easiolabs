import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  href: string;
  image: string;
}

const MotorsPage = () => {
  const motorProjects: Project[] = [
    {
      title: 'How Servo Motor Works & Interface It With Arduino',
      description: 'When it comes to choosing the right motor for a project, the options can be overwhelming. However, if you need precise control over the position of a rotating shaft, servo motors are often the perfect choice.',
      href: '/servo-motor-arduino-tutorial',
      image: '/images/servo-motor-tutorial.jpg'
    },
    {
      title: 'Stepper Motor Control with Arduino',
      description: 'Learn how to control stepper motors with Arduino for precise positioning in robotics and automation projects.',
      href: '/stepper-motor-arduino-tutorial',
      image: '/images/stepper-motor-tutorial.jpg'
    },
    {
      title: 'DC Motor Control with Arduino and L298N',
      description: 'Control DC motors with Arduino using the L298N motor driver for robotics and automation applications.',
      href: '/dc-motor-l298n-arduino-tutorial',
      image: '/images/dc-motor-tutorial.jpg'
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
            <span>Motors</span>
          </nav>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Arduino Motor Projects</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Learn how to control different types of motors with Arduino including servo motors, stepper motors, 
            and DC motors. Perfect for robotics and automation projects.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {motorProjects.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-600 opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Motor Tutorial</span>
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

export default MotorsPage;
