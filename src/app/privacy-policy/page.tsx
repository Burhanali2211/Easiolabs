const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              At EasyioLabs, we are committed to protecting your privacy and ensuring the security of your personal information.
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Information You Provide</h3>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>Contact information when you reach out to us</li>
              <li>Email address when you subscribe to our newsletter</li>
              <li>Comments and feedback you provide</li>
              <li>Any other information you voluntarily submit</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>IP address and browser information</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website information</li>
              <li>Device and operating system information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>Provide and improve our educational content and services</li>
              <li>Send newsletters and updates (only if you subscribe)</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Analyze website usage to improve user experience</li>
              <li>Ensure the security and proper functioning of our website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>When required by law or to comply with legal processes</li>
              <li>To protect our rights, property, or safety, or that of our users</li>
              <li>With trusted service providers who assist in operating our website (under strict confidentiality agreements)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our website may use cookies and similar tracking technologies to enhance your browsing experience.
              These technologies help us understand how you use our site and improve our services. You can control
              cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Unsubscribe from our newsletter at any time</li>
              <li>Object to the processing of your personal information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices
              or content of these external sites. We encourage you to review the privacy policies of any third-party
              sites you visit.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Our website is not intended for children under 13 years of age. We do not knowingly collect personal
              information from children under 13. If you are a parent or guardian and believe your child has provided
              us with personal information, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an
              updated revision date. We encourage you to review this policy periodically to stay informed about how
              we protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@easyio-atl.com<br />
                <strong>Contact Form:</strong> <a href="/contact" className="text-blue-600 hover:underline">Contact Us</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
