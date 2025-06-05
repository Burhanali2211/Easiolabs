'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Info, Zap, AlertTriangle } from 'lucide-react';

interface Component {
  id: string;
  name: string;
  image: string;
  description: string;
  keyPoints: string[];
  safetyNote?: string;
  commonUse: string;
}

interface ComponentShowcaseProps {
  title?: string;
  components: Component[];
  layout?: 'grid' | 'carousel';
}

const ComponentShowcase = ({ 
  title = "Electronic Components", 
  components, 
  layout = 'grid' 
}: ComponentShowcaseProps) => {
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  return (
    <div className="my-8">
      {title && (
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Zap className="h-5 w-5 mr-2 text-blue-600" />
          {title}
        </h3>
      )}

      {/* Component Grid */}
      <div className={`grid gap-4 mb-6 ${
        layout === 'grid' 
          ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
          : 'grid-cols-1 md:grid-cols-2'
      }`}>
        {components.map((component) => (
          <div
            key={component.id}
            onClick={() => setSelectedComponent(component)}
            className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all"
          >
            <div className="flex justify-center mb-3">
              <div className="w-16 h-12 flex items-center justify-center bg-gray-50 rounded-lg">
                <Image
                  src={component.image}
                  alt={component.name}
                  width={60}
                  height={40}
                  className="object-contain"
                />
              </div>
            </div>
            <h4 className="font-medium text-gray-900 text-sm text-center mb-1">
              {component.name}
            </h4>
            <p className="text-xs text-gray-600 text-center">
              {component.commonUse}
            </p>
          </div>
        ))}
      </div>

      {/* Component Detail Modal */}
      {selectedComponent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedComponent.name}</h3>
                <button
                  onClick={() => setSelectedComponent(null)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>

              {/* Component Image */}
              <div className="flex justify-center mb-4">
                <div className="w-32 h-24 flex items-center justify-center bg-gray-50 rounded-lg">
                  <Image
                    src={selectedComponent.image}
                    alt={selectedComponent.name}
                    width={120}
                    height={80}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Info className="h-4 w-4 mr-2" />
                  Description
                </h4>
                <p className="text-gray-700 text-sm">{selectedComponent.description}</p>
              </div>

              {/* Key Points */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Key Points</h4>
                <ul className="text-gray-700 text-sm space-y-1">
                  {selectedComponent.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety Note */}
              {selectedComponent.safetyNote && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <div className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-yellow-800 text-sm mb-1">Safety Note</div>
                      <div className="text-yellow-700 text-sm">{selectedComponent.safetyNote}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Common Use */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="font-medium text-blue-900 text-sm mb-1">Common Use</div>
                <div className="text-blue-800 text-sm">{selectedComponent.commonUse}</div>
              </div>

              <button
                onClick={() => setSelectedComponent(null)}
                className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentShowcase;
