import Link from 'next/link';
import {
  BookOpen,
  Zap,
  CircuitBoard,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  Star
} from 'lucide-react';

const Electronics101Page = () => {
  const learningPath = [
    {
      id: 1,
      title: 'What is Electronics?',
      description: 'Understanding the basics of electricity and electronic components',
      duration: '15 min',
      difficulty: 'Beginner',
      href: '/electronics-101/what-is-electronics',
      completed: false,
      topics: ['Electricity basics', 'Voltage, Current, Resistance', 'Electronic vs Electrical']
    },
    {
      id: 2,
      title: 'Essential Components',
      description: 'Learn about resistors, capacitors, LEDs, and basic components',
      duration: '25 min',
      difficulty: 'Beginner',
      href: '/electronics-101/essential-components',
      completed: false,
      topics: ['Resistors', 'Capacitors', 'LEDs', 'Switches', 'Batteries']
    },
    {
      id: 3,
      title: 'Reading Circuit Diagrams',
      description: 'How to understand schematic symbols and circuit diagrams',
      duration: '20 min',
      difficulty: 'Beginner',
      href: '/electronics-101/reading-circuit-diagrams',
      completed: false,
      topics: ['Schematic symbols', 'Circuit diagrams', 'Component identification']
    },
    {
      id: 4,
      title: 'Using a Breadboard',
      description: 'Hands-on guide to building your first circuit',
      duration: '30 min',
      difficulty: 'Beginner',
      href: '/electronics-101/using-breadboard',
      completed: false,
      topics: ['Breadboard layout', 'Making connections', 'Common mistakes']
    },
    {
      id: 5,
      title: 'Your First LED Circuit',
      description: 'Build a simple LED circuit and understand Ohm\'s Law',
      duration: '35 min',
      difficulty: 'Beginner',
      href: '/electronics-101/first-led-circuit',
      completed: false,
      topics: ['LED basics', 'Current limiting', 'Ohm\'s Law', 'Safety']
    },
    {
      id: 6,
      title: 'LED Basics & Advanced Circuits',
      description: 'Complete tutorial on LED circuits, troubleshooting, and variations',
      duration: '40 min',
      difficulty: 'Beginner',
      href: '/electronics-101/led-basics',
      completed: false,
      topics: ['LED types', 'Multiple LEDs', 'Troubleshooting', 'Circuit variations']
    },
    {
      id: 7,
      title: 'DC Motor Control',
      description: 'Learn to connect and control DC motors safely',
      duration: '45 min',
      difficulty: 'Beginner',
      href: '/electronics-101/dc-motor-control',
      completed: false,
      topics: ['Motor basics', 'Power requirements', 'Direction control', 'Protection circuits']
    },
    {
      id: 8,
      title: 'Buzzer and Sound',
      description: 'Create audio circuits with buzzers and sound generation',
      duration: '35 min',
      difficulty: 'Beginner',
      href: '/electronics-101/buzzer-sound',
      completed: false,
      topics: ['Active vs passive buzzers', 'Tone generation', 'Volume control', 'Musical notes']
    },
    {
      id: 9,
      title: 'Advanced Components',
      description: 'Explore sensors, timing circuits, and component integration',
      duration: '50 min',
      difficulty: 'Intermediate',
      href: '/electronics-101/advanced-components',
      completed: false,
      topics: ['Sensors', 'Timing circuits', 'Logic gates', 'Component integration']
    },
    {
      id: 10,
      title: 'Arduino Introduction',
      description: 'Complete Arduino basics with programming and project building',
      duration: '60 min',
      difficulty: 'Intermediate',
      href: '/electronics-101/arduino-introduction',
      completed: false,
      topics: ['Arduino setup', 'Programming basics', 'Digital I/O', 'Analog & PWM', 'Projects']
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Step-by-Step Learning',
      description: 'Each lesson builds on the previous one, ensuring you understand every concept before moving forward.'
    },
    {
      icon: Lightbulb,
      title: 'Practical Examples',
      description: 'Learn by doing with real circuits and hands-on projects you can build at home.'
    },
    {
      icon: Users,
      title: 'Beginner-Friendly',
      description: 'No prior knowledge required. We explain everything in simple, easy-to-understand terms.'
    },
    {
      icon: CheckCircle,
      title: 'Progress Tracking',
      description: 'Track your learning progress and see how far you\'ve come in your electronics journey.'
    }
  ];

  const totalDuration = learningPath.reduce((total, lesson) => {
    const minutes = parseInt(lesson.duration.split(' ')[0]);
    return total + minutes;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <CircuitBoard className="h-10 w-10 text-blue-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Electronics 101
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your complete beginner's guide to electronics. Start from zero and build your first circuits with confidence!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#learning-path"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Start Learning Now
              </Link>
              <Link
                href="/glossary"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-blue-200"
              >
                View Glossary
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{learningPath.length}</div>
              <div className="text-gray-600">Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</div>
              <div className="text-gray-600">Total Duration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-gray-600">Free</div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center">
                  <div className="bg-blue-100 rounded-lg p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section id="learning-path" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your Learning Path
            </h2>
            <p className="text-lg text-gray-600">
              Follow this structured path to master electronics fundamentals
            </p>
          </div>

          <div className="space-y-6">
            {learningPath.map((lesson, index) => (
              <div key={lesson.id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                      {lesson.id}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 lg:mb-0">
                        {lesson.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {lesson.duration}
                        </span>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          {lesson.difficulty}
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{lesson.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {lesson.topics.map((topic) => (
                        <span key={topic} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {topic}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={lesson.href}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Start Lesson
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Electronics Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of beginners who have successfully learned electronics with our step-by-step approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/electronics-101/what-is-electronics"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start First Lesson
            </Link>
            <Link
              href="/faq"
              className="bg-blue-700 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-800 transition-colors"
            >
              Have Questions?
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Electronics101Page;
