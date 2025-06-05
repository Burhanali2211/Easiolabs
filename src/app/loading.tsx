import { Zap } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="animate-pulse">
            <div className="bg-blue-100 rounded-full p-6 mx-auto w-24 h-24 flex items-center justify-center">
              <Zap className="h-12 w-12 text-blue-600" />
            </div>
          </div>
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-4 border-blue-200 rounded-full animate-ping opacity-20"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-blue-100 rounded-full animate-ping opacity-10 animation-delay-200"></div>
          </div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Loading...
        </h2>
        <p className="text-gray-600 mb-8">
          Preparing your electronics learning experience
        </p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-blue-600 h-2 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading Tips */}
        <div className="mt-8 max-w-md mx-auto">
          <p className="text-sm text-gray-500 italic">
            💡 Tip: Always double-check your wiring before powering up your circuit!
          </p>
        </div>
      </div>
    </div>
  );
}
