import { useState } from "react";
import QuizDetails from './QuizDetails';

const previousQuizzes = [
  {
    id: 1,
    title: "Mathematics Fundamentals",
    date: "2024-03-15",
    score: 85,
    totalMarks: 100,
    timeTaken: "45 minutes",
    description: "A deep dive into mathematics fundamentals, covering various important topics in the subject.",
    status: "passed",
    topics: [
      {
        name: "Speed and Time",
        totalQuestions: 2,
        correctAnswers: 1,
        questions: [
          {
            id: 1,
            topic: "Speed and Time",
            question: "A car travels 300 km in 4 hours. What is its average speed?",
            userAnswer: "75 km/h",
            correctAnswer: "75 km/h",
            isCorrect: true
          },
          {
            id: 2,
            topic: "Speed and Time",
            question: "If a train covers 240 km in 2 hours, what will be its speed in m/s?",
            userAnswer: "30 m/s",
            correctAnswer: "33.33 m/s",
            isCorrect: false
          }
        ]
      },
      {
        name: "Proportions",
        totalQuestions: 2,
        correctAnswers: 2,
        
        questions: [
          {
            id: 3,
            topic: "Proportions",
            question: "If 3 books cost $45, how much will 7 books cost?",
            userAnswer: "$105",
            correctAnswer: "$105",
            isCorrect: true
          },
          {
            id: 4,
            topic: "Proportions",
            question: "In a map, 2 cm represents 1 km. How many km will 5 cm represent?",
            userAnswer: "2.5 km",
            correctAnswer: "2.5 km",
            isCorrect: true
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Science Quiz",
    date: "2024-03-20",
    score: 92,
    totalMarks: 100,
    timeTaken: "55 minutes",
    description: "A science quiz covering various topics including Physics and Chemistry.",
    status: "passed",
    topics: [
      {
        name: "Physics",
        totalQuestions: 2,
        correctAnswers: 2,
        questions: [
          {
            id: 1,
            topic: "Physics",
            question: "What is Newton's First Law?",
            userAnswer: "An object will remain at rest or in uniform motion unless acted upon by an external force",
            correctAnswer: "An object will remain at rest or in uniform motion unless acted upon by an external force",
            isCorrect: true
          },
          {
            id: 2,
            topic: "Physics",
            question: "What is the SI unit of force?",
            userAnswer: "Newton",
            correctAnswer: "Newton",
            isCorrect: true
          }
        ]
      },
      {
        name: "Chemistry",
        totalQuestions: 2,
        correctAnswers: 1,
        questions: [
          {
            id: 3,
            topic: "Chemistry",
            question: "What is the atomic number of Carbon?",
            userAnswer: "6",
            correctAnswer: "6",
            isCorrect: true
          },
          {
            id: 4,
            topic: "Chemistry",
            question: "What is the molecular formula of water?",
            userAnswer: "H2O2",
            correctAnswer: "H2O",
            isCorrect: false
          }
        ]
      }
    ]
  }
];

function PreviousQuizzes() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Truncate the description to 50 characters
  const truncatedDescription = (description) =>
    description.length > 50 ? description.slice(0, 50) + "..." : description;

  return (
    <>
      <div className="mt-8 bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <h3 className="text-lg md:text-xl font-semibold mb-6">Previous Quiz Attempts</h3>
        <div className="space-y-4">
          {previousQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow"
            >
              {/* Title */}
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm md:text-base font-semibold text-gray-800">{quiz.title}</h4>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    quiz.status === "passed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
                </span>
              </div>
              {/* Other Details */}
              <div className="text-sm text-gray-600 space-y-1">
                <div>
                  <strong>Date:</strong> {quiz.date}
                </div>
                <div>
                  <strong>Score:</strong>{" "}
                  {quiz.score}/{quiz.totalMarks} ({((quiz.score / quiz.totalMarks) * 100).toFixed(1)}%)
                </div>
                <div className="hidden md:block">
                  <strong>Time Taken:</strong> {quiz.timeTaken}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600">
                <span className="font-medium">Description:</span>{" "}
                {showFullDescription ? quiz.description : truncatedDescription(quiz.description)}
              </p>
              {quiz.description.length > 50 && !showFullDescription && (
                <button
                  className="text-indigo-600 text-xs mt-2"
                  onClick={() => setShowFullDescription(true)}
                >
                  Show more
                </button>
              )}

              {/* Topics */}
              <div className="flex flex-wrap gap-2 items-center mt-2">
                {quiz.topics.slice(0, 2).map((topic, index) => (
                  <p
                    key={index}
                    className="px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full"
                  >
                    {topic.name}
                  </p>
                ))}
                {/* Show "Show more" button for additional topics */}
                {quiz.topics.length > 2 && (
                  <p
                    className="px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full mt-2 cursor-pointer"
                    onClick={() => setShowAllTopics(true)}
                  >
                    Show More Topics
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="mt-3">
                <button
                  onClick={() => setSelectedQuiz(quiz)}
                  className="text-indigo-600 hover:text-indigo-900 text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedQuiz && (
        <QuizDetails quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
      )}
    </>
  );
}

export default PreviousQuizzes;
