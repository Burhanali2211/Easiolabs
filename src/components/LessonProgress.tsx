'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';

interface LessonProgressProps {
  lessonId: string;
  totalLessons: number;
  currentLesson: number;
  estimatedTime: string;
}

const LessonProgress = ({ lessonId, totalLessons, currentLesson, estimatedTime }: LessonProgressProps) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    // Check if lesson is completed from localStorage
    const completed = localStorage.getItem(`lesson-${lessonId}-completed`) === 'true';
    setIsCompleted(completed);

    // Track start time
    const start = localStorage.getItem(`lesson-${lessonId}-start`);
    if (start) {
      setStartTime(parseInt(start));
    } else {
      const now = Date.now();
      setStartTime(now);
      localStorage.setItem(`lesson-${lessonId}-start`, now.toString());
    }

    // Update time spent every minute
    const interval = setInterval(() => {
      if (startTime) {
        const spent = Math.floor((Date.now() - startTime) / 60000); // minutes
        setTimeSpent(spent);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [lessonId, startTime]);

  const markAsCompleted = () => {
    setIsCompleted(true);
    localStorage.setItem(`lesson-${lessonId}-completed`, 'true');
    
    // Track completion time
    if (startTime) {
      const completionTime = Math.floor((Date.now() - startTime) / 60000);
      localStorage.setItem(`lesson-${lessonId}-time`, completionTime.toString());
    }
  };

  const progressPercentage = (currentLesson / totalLessons) * 100;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Lesson Progress</h3>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>{estimatedTime}</span>
          {timeSpent > 0 && (
            <span className="text-blue-600">• {timeSpent}m spent</span>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Lesson {currentLesson} of {totalLessons}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Completion Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isCompleted ? (
            <>
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-600 font-medium">Lesson Completed!</span>
            </>
          ) : (
            <>
              <Circle className="h-5 w-5 text-gray-400" />
              <span className="text-gray-600">In Progress</span>
            </>
          )}
        </div>

        {!isCompleted && (
          <button
            onClick={markAsCompleted}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Mark as Complete
          </button>
        )}
      </div>

      {/* Quick Stats */}
      {isCompleted && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Completion Time:</span>
              <span className="ml-2 font-medium">
                {localStorage.getItem(`lesson-${lessonId}-time`) || 'N/A'}m
              </span>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <span className="ml-2 font-medium text-green-600">✓ Complete</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonProgress;
