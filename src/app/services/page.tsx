import Link from 'next/link';
import { 
  BookOpen, 
  Users, 
  Code, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Clock,
  Star,
  MessageSquare
} from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      id: 'tutorials',
      title: 'Comprehensive Tutorials',
      description: 'Step-by-step guides covering Arduino, ESP32, ESP8266, and basic electronics',
      icon: BookOpen,
      features: [
        'Detailed wiring diagrams',
        'Complete code examples',
        'Working principle explanations',
        'Troubleshooting guides',
        'Beginner to advanced levels'
      ],
      color: 'blue'
    },
    {
      id: 'consultation',
      title: 'Project Consultation',
      description: 'Get expert guidance for your electronics and IoT projects',
      icon: Users,
      features: [
        'Component selection advice',
        'Circuit design review',
        'Code optimization',
        'Troubleshooting support',
        'Best practices guidance'
      ],
      color: 'green'
    },
    {
      id: 'development',
      title: 'Custom Development',
      description: 'Professional development services for your specific project needs',
      icon: Code,
      features: [
        'Custom Arduino libraries',
        'IoT solution development',
        'PCB design consultation',
        'Firmware development',
        'System integration'
      ],
      color: 'purple'
    },
    {
      id: 'workshops',
      title: 'Workshops & Training',
      description: 'Interactive learning sessions for individuals and teams',
      icon: Zap,
      features: [
        'Hands-on workshops',
        'Corporate training',
        'Online sessions',
        'Custom curriculum',
        'Certificate programs'
      ],
      color: 'orange'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Engineering Student',
      content: 'The Arduino tutorials helped me complete my final year project. The explanations are clear and the code examples work perfectly!',
      rating: 5
    },
    {
      name: 'Mike Rodriguez',
      role: 'Hobbyist Maker',
      content: 'I went from knowing nothing about electronics to building my own IoT weather station. The step-by-step approach is fantastic.',
      rating: 5
    },
    {
      name: 'Tech Startup Team',
      role: 'Product Development',
      content: 'The consultation service saved us weeks of development time. Expert advice on component selection and circuit optimization.',
      rating: 5
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600 border-blue-200',
      green: 'bg-green-50 text-green-600 border-green-200',
      purple: 'bg-purple-50 text-purple-600 border-purple-200',
      orange: 'bg-orange-50 text-orange-600 border-orange-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From beginner tutorials to professional development services, 
            we help you succeed in your electronics journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started Today
            </Link>
            <Link
              href="/electronics/basic-electronics"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors border border-blue-200"
            >
              Browse Tutorials
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive electronics education and professional services 
              tailored to your learning and project needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
                  <div className={`inline-flex p-3 rounded-lg ${getColorClasses(service.color)} mb-6`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How We Work
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our proven process ensures you get the best learning experience and project outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">1. Consultation</h3>
              <p className="text-gray-600">
                We discuss your goals, current skill level, and project requirements to create a tailored approach.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">2. Learning Path</h3>
              <p className="text-gray-600">
                We provide structured tutorials, resources, and hands-on guidance based on your specific needs.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">3. Implementation</h3>
              <p className="text-gray-600">
                You build real projects with our support, gaining practical experience and confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of successful learners and makers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Electronics Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Whether you're a complete beginner or looking to advance your skills, 
            we have the right service for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Contact Us Today
            </Link>
            <Link
              href="/faq"
              className="bg-blue-700 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-800 transition-colors"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
