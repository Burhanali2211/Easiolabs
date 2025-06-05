const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Disclaimer</h1>
          <p className="text-lg text-gray-600">
            Important information about using our tutorials and projects
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">General Information</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The information provided on EasyioLabs is for educational and informational purposes only.
              While we strive to provide accurate and up-to-date content, we make no representations or warranties
              of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or
              availability of the information, products, services, or related graphics contained on the website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Warning</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-6">
              <h3 className="text-lg font-bold text-red-900 mb-2">⚠️ Important Safety Notice</h3>
              <p className="text-red-800">
                Working with electronics involves potential risks including electrical shock, fire, and component damage.
                Always take proper safety precautions and work under adult supervision if you are a minor.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety Guidelines</h3>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>Always disconnect power when making connections</li>
              <li>Use appropriate safety equipment (safety glasses, anti-static wrist straps, etc.)</li>
              <li>Work in a well-ventilated area when soldering</li>
              <li>Double-check all connections before applying power</li>
              <li>Use proper voltage levels and current ratings for components</li>
              <li>Keep a fire extinguisher nearby when working with high-power circuits</li>
              <li>Never work on live circuits unless absolutely necessary and you are qualified to do so</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Educational Purpose</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              All tutorials, projects, and code examples provided on this website are intended for educational purposes.
              They are designed to help you learn about electronics, programming, and related technologies. The projects
              and circuits shown are for demonstration and learning purposes and may not be suitable for commercial or
              production use without proper testing and certification.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Professional Advice</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The content on this website does not constitute professional engineering, electrical, or technical advice.
              For commercial applications, safety-critical systems, or professional projects, always consult with
              qualified professionals and follow applicable industry standards and regulations.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              In no event will EasyioLabs be liable for any loss or damage including, without limitation, indirect
              or consequential loss or damage, or any loss or damage whatsoever arising from the use of information,
              tutorials, or projects found on this website.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              You acknowledge that:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>You use all information and follow all tutorials at your own risk</li>
              <li>You are responsible for ensuring your own safety and the safety of others</li>
              <li>You will not hold us liable for any damages, injuries, or losses</li>
              <li>You understand the risks involved in working with electronics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Code and Circuit Accuracy</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              While we test our code examples and circuit designs, we cannot guarantee they are error-free or will
              work in all situations. Electronic components can vary in specifications, and environmental factors can
              affect circuit behavior. Always verify circuit designs and test code thoroughly before implementing in
              any important application.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Components</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our tutorials may reference third-party components, libraries, or services. We are not responsible for
              the quality, safety, or functionality of these third-party items. Always refer to manufacturer
              specifications and documentation when using any components or software.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Regulatory Compliance</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Electronic projects may be subject to various regulations depending on your location and intended use.
              It is your responsibility to ensure compliance with all applicable local, national, and international
              regulations, including but not limited to:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>FCC regulations (in the United States)</li>
              <li>CE marking requirements (in Europe)</li>
              <li>Radio frequency emission standards</li>
              <li>Safety certifications for commercial products</li>
              <li>Environmental regulations for electronic waste</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates and Changes</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Technology evolves rapidly, and information that is current today may become outdated. We strive to
              keep our content current, but we cannot guarantee that all information will always be up-to-date.
              Always verify information with current sources and manufacturer documentation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Responsibility</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              By using this website and following our tutorials, you agree that:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>You will exercise proper caution and safety measures</li>
              <li>You will not attempt projects beyond your skill level without proper supervision</li>
              <li>You will verify all information and test all circuits safely</li>
              <li>You understand and accept all risks involved</li>
              <li>You will not hold us responsible for any outcomes</li>
            </ul>
          </section>

          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Questions?</h2>
            <p className="text-blue-800 mb-4">
              If you have any questions about this disclaimer or need clarification on any safety aspects of our tutorials,
              please don't hesitate to contact us.
            </p>
            <a
              href="/contact"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerPage;
