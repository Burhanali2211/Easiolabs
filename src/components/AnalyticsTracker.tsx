'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ClientAnalytics } from '@/lib/client-analytics';

const AnalyticsTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize analytics on mount
    ClientAnalytics.init();
  }, []);

  useEffect(() => {
    // Track page changes
    if (pathname) {
      // Small delay to ensure page title is updated
      setTimeout(() => {
        ClientAnalytics.init();
      }, 100);
    }
  }, [pathname]);

  return null; // This component doesn't render anything
};

export default AnalyticsTracker;
