'use client';

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate newsletter signup
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="bg-blue-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Mail className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get the latest tutorials, project ideas, and electronics tips delivered to your inbox.
          </p>
          
          {submitStatus === 'success' ? (
            <div className="max-w-md mx-auto">
              <div className="bg-green-500 text-white p-4 rounded-lg">
                <p className="font-medium">Thank you for subscribing!</p>
                <p className="text-sm mt-1">You'll receive our latest tutorials and updates.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Subscribe
                    </>
                  )}
                </button>
              </div>
              <p className="text-blue-100 text-sm mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
