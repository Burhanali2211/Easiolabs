const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About EasyioLabs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted source for electronics tutorials, Arduino projects, and IoT development guides.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At EasyioLabs, we believe that learning electronics should be accessible, practical, and enjoyable.
              Our mission is to provide comprehensive, easy-to-follow tutorials that help makers, students, and
              hobbyists bring their electronic projects to life.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Whether you're taking your first steps into the world of Arduino programming or you're an experienced
              developer looking to explore ESP32 and ESP8266 capabilities, our tutorials are designed to guide you
              through every step of the process.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-900 mb-3">Arduino Tutorials</h3>
                <p className="text-blue-800">
                  Comprehensive guides covering sensors, displays, motors, and wireless communication modules
                  with detailed wiring diagrams and code explanations.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-900 mb-3">ESP32 & ESP8266 Projects</h3>
                <p className="text-green-800">
                  IoT-focused tutorials covering WiFi connectivity, web servers, sensor networks,
                  and advanced microcontroller programming.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-orange-900 mb-3">Basic Electronics</h3>
                <p className="text-orange-800">
                  Fundamental concepts covering diodes, transistors, rectifiers, and essential
                  electronic components for beginners.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-purple-900 mb-3">Step-by-Step Guides</h3>
                <p className="text-purple-800">
                  Detailed tutorials with working principles, pinout diagrams, wiring instructions,
                  and complete code explanations.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Approach</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We believe in learning by doing. Every tutorial on our site includes:
            </p>
            <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
              <li>Clear explanations of how components work</li>
              <li>Detailed wiring diagrams and pinout references</li>
              <li>Complete, tested code examples</li>
              <li>Practical projects you can build at home</li>
              <li>Troubleshooting tips and common pitfalls</li>
            </ul>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our tutorials are designed to be beginner-friendly while still providing the depth
              that experienced makers need. We focus on practical applications and real-world projects
              that you can actually use.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Community & Learning</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Electronics and programming are best learned through hands-on experience and community support.
              We encourage experimentation, modification of our projects, and sharing your own creations.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our goal is not just to provide tutorials, but to foster a community of makers who support
              each other in their learning journey. Whether you're building your first LED circuit or
              developing a complex IoT system, we're here to help you succeed.
            </p>
          </section>

          <section className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Get Started Today</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Ready to start your electronics journey? Browse our tutorials, pick a project that interests you,
              and start building. Remember, every expert was once a beginner, and every project teaches you
              something new.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/electronics/basic-electronics"
                className="btn-primary text-center"
              >
                Start with Basics
              </a>
              <a
                href="/electronics/arduino-projects"
                className="btn-secondary text-center"
              >
                Explore Arduino Projects
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
