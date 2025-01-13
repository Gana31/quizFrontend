import { useState, useEffect } from 'react';
import { FiClock, FiBookOpen } from 'react-icons/fi';
import QuestionSidebar from './QuizSidebar';
import Result from './Result';

export const questions = [
    {
      id: 1,
      topic: "Algebra",
      timeAllowed: 45,
      question: "Solve for x: 2x + 5 = 13",
      options: ["x = 3", "x = 4", "x = 5", "x = 6"],
      correctAnswer: 1
    },
    {
      id: 2,
      topic: "Geometry",
      timeAllowed: 60,
      question: "What is the area of a circle with radius 5 units?",
      options: ["25π", "10π", "15π", "20π"],
      correctAnswer: 0
    },
    {
      id: 3,
      topic: "Speed",
      timeAllowed: 30,
      question: "A car travels 120 km in 2 hours. What is its speed?",
      options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
      correctAnswer: 1
    },
    {
      id: 4,
      topic: "Algebra",
      timeAllowed: 45,
      question: "Simplify: (x² + 2x) + (3x² - x)",
      options: ["4x² + x", "4x² - x", "4x² + 3x", "3x² + x"],
      correctAnswer: 0
    },
    {
      id: 5,
      topic: "Geometry",
      timeAllowed: 50,
      question: "What is the sum of angles in a triangle?",
      options: ["90°", "180°", "270°", "360°"],
      correctAnswer: 1
    }
  ];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questions[0].timeAllowed);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion(null);
    }
  }, [timeLeft, showResults]);

  const handleNextQuestion = (selectedOption) => {
    const newAnswer = {
      questionId: questions[currentQuestion].id,
      selectedOption
    };

    setAnswers([...answers, newAnswer]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(questions[currentQuestion + 1].timeAllowed);
    } else {
      setShowResults(true);
    }
  };

  if (showResults) {
    return <Result answers={answers} />;
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4 flex items-center justify-center">
      <div className="flex w-full max-w-6xl">
        <QuestionSidebar answers={answers} />
        <div className="bg-white rounded-2xl shadow-xl p-8 flex-1">
          <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FiBookOpen className="text-purple-600" />
                <span className="font-medium text-purple-800">{currentQ.topic}</span>
              </div>
              <p className="text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-purple-600" />
              <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-purple-600'}`}>
                {timeLeft}s
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentQ.question}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleNextQuestion(index)}
                  className="p-4 text-left border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
                >
                  <span className="font-medium text-gray-700">{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => handleNextQuestion(null)}
              className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
