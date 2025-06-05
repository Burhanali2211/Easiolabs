import Link from 'next/link';
import Newsletter from './Newsletter';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    tutorials: [
      { name: 'Electronics 101', href: '/electronics-101' },
      { name: 'Component Guide', href: '/component-guide' },
      { name: 'Arduino Projects', href: '/electronics/arduino-projects' },
      { name: 'ESP32 Projects', href: '/electronics/esp32-projects' },
      { name: 'ESP8266 Projects', href: '/electronics/esp8266-projects' }
    ],
    categories: [
      { name: 'Sensors', href: '/electronics/arduino-projects#sensors' },
      { name: 'Displays', href: '/electronics/arduino-projects#displays' },
      { name: 'Motors', href: '/electronics/arduino-projects#motors' },
      { name: 'Wireless & IoT', href: '/electronics/arduino-projects#wireless' }
    ],
    tools: [
      { name: 'Calculators', href: '/calculators' },
      { name: 'Circuit Simulator', href: '/circuit-simulator' },
      { name: 'Component Guide', href: '/component-guide' },
      { name: 'Glossary', href: '/glossary' }
    ],
    company: [
      { name: 'About Us', href: '/about-us' },
      { name: 'Services', href: '/services' },
      { name: 'Contact', href: '/contact' },
      { name: 'FAQ', href: '/faq' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Disclaimer', href: '/disclaimer' },
      { name: 'Sitemap', href: '/sitemap' }
    ]
  };

  return (
    <footer>
      {/* Newsletter Section */}
      <Newsletter />

      {/* Main Footer */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link href="/" className="text-2xl font-bold text-white mb-4 block">
                EasyioLabs
              </Link>
              <p className="text-gray-300 mb-4">
                Learn electronics the easy way with comprehensive tutorials,
                step-by-step guides, and practical projects.
              </p>
              <p className="text-gray-400 text-sm">
                Quick, easy and to the point!
              </p>
            </div>

            {/* Tutorials */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Tutorials</h3>
              <ul className="space-y-2">
                {footerLinks.tutorials.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Tools</h3>
              <ul className="space-y-2">
                {footerLinks.tools.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                Copyright © {currentYear} EasyioLabs. All rights reserved.
              </div>
              <div className="flex space-x-6 text-sm text-gray-400">
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy
                </Link>
                <Link href="/disclaimer" className="hover:text-white">
                  Terms
                </Link>
                <Link href="/contact" className="hover:text-white">
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
