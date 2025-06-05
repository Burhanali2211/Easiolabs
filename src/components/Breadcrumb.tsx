'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    let currentPath = '';
    
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Convert segment to readable label
      let label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      // Special cases for better labels
      const labelMappings: { [key: string]: string } = {
        'electronics': 'Electronics',
        'arduino-projects': 'Arduino Projects',
        'esp32-projects': 'ESP32 Projects',
        'esp8266-projects': 'ESP8266 Projects',
        'basic-electronics': 'Basic Electronics',
        'about-us': 'About Us',
        'privacy-policy': 'Privacy Policy',
        'faq': 'FAQ',
        'services': 'Services',
        'contact': 'Contact',
        'disclaimer': 'Disclaimer',
        'sensors': 'Sensors',
        'displays': 'Displays',
        'motors': 'Motors',
        'wireless-iot': 'Wireless & IoT'
      };

      if (labelMappings[segment]) {
        label = labelMappings[segment];
      }

      // For tutorial pages, try to make them more readable
      if (segment.includes('tutorial') || segment.includes('sensor') || segment.includes('arduino')) {
        label = label
          .replace(/Tutorial/g, '')
          .replace(/Arduino/g, '')
          .replace(/Esp32/g, 'ESP32')
          .replace(/Esp8266/g, 'ESP8266')
          .replace(/Dht11/g, 'DHT11')
          .replace(/Dht22/g, 'DHT22')
          .replace(/Sr04/g, 'SR04')
          .replace(/Pir/g, 'PIR')
          .replace(/I2c/g, 'I2C')
          .replace(/Lcd/g, 'LCD')
          .replace(/Nrf24l01/g, 'nRF24L01+')
          .replace(/Bme280/g, 'BME280')
          .replace(/Wemos/g, 'WeMos')
          .replace(/D1/g, 'D1')
          .replace(/Wled/g, 'WLED')
          .replace(/Ws2812b/g, 'WS2812B')
          .replace(/Cam/g, 'CAM')
          .replace(/Vs/g, 'vs')
          .trim();
      }

      breadcrumbs.push({
        label,
        href: currentPath
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  // Don't show breadcrumbs on home page
  if (pathname === '/') {
    return null;
  }

  return (
    <nav className={`bg-gray-50 border-b border-gray-200 ${className}`} aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            const isFirst = index === 0;

            return (
              <li key={item.href} className="flex items-center">
                {!isFirst && (
                  <ChevronRight className="h-4 w-4 text-gray-400 mr-2" />
                )}
                
                {isLast ? (
                  <span className="text-gray-900 font-medium flex items-center">
                    {isFirst && <Home className="h-4 w-4 mr-1" />}
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors flex items-center"
                  >
                    {isFirst && <Home className="h-4 w-4 mr-1" />}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
