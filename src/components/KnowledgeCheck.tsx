'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Lightbulb } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface KnowledgeCheckProps {
  title?: string;
  questions: Question[];
}

const KnowledgeCheck = ({ title = "Knowledge Check", questions }: KnowledgeCheckProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
    setShowExplanation(false);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResults(false);
    setShowExplanation(false);
  };

  const checkAnswer = () => {
    setShowExplanation(true);
  };

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return score + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const currentQ = questions[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== -1;
  const isCorrect = selectedAnswers[currentQuestion] === currentQ?.correctAnswer;

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 my-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">{title} - Results</h3>
        
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-blue-600 mb-2">{score}/{questions.length}</div>
          <div className="text-lg text-gray-600 mb-4">{percentage}% Correct</div>
          
          <div className={`inline-flex items-center px-4 py-2 rounded-lg ${
            percentage >= 80 ? 'bg-green-100 text-green-800' :
            percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {percentage >= 80 ? (
              <>
                <CheckCircle className="h-5 w-5 mr-2" />
                Excellent! You've mastered this topic.
              </>
            ) : percentage >= 60 ? (
              <>
                <Lightbulb className="h-5 w-5 mr-2" />
                Good job! Review the missed concepts.
              </>
            ) : (
              <>
                <XCircle className="h-5 w-5 mr-2" />
                Keep studying! Review the lesson material.
              </>
            )}
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 my-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <span className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">{currentQ.question}</h4>
        
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                selectedAnswers[currentQuestion] === index
                  ? showExplanation
                    ? index === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-red-500 bg-red-50 text-red-800'
                    : 'border-blue-500 bg-blue-50'
                  : showExplanation && index === currentQ.correctAnswer
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <span className="font-medium mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                <span>{option}</span>
                {showExplanation && (
                  <span className="ml-auto">
                    {index === currentQ.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : selectedAnswers[currentQuestion] === index ? (
                      <XCircle className="h-5 w-5 text-red-600" />
                    ) : null}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`p-4 rounded-lg mb-6 ${
          isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-start">
            {isCorrect ? (
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
            )}
            <div>
              <div className={`font-medium mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </div>
              <div className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {currentQ.explanation}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        <div className="flex space-x-3">
          {isAnswered && !showExplanation && (
            <button
              onClick={checkAnswer}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Check Answer
            </button>
          )}
          
          {showExplanation && (
            <button
              onClick={handleNext}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              {currentQuestion === questions.length - 1 ? 'View Results' : 'Next →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeCheck;
