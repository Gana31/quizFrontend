import { useDispatch } from "react-redux";

import { useState } from "react";
import { enrollInQuiz } from "../../Services/Operations/userquizoperation";

function QuizCard({ quiz }) {
  const dispatch = useDispatch();
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const truncatedDescription =
    quiz.description.length > 50 ? quiz.description.slice(0, 50) + "..." : quiz.description;

    const handleEnterQuiz = () => {
      // Redirect to the quiz page or handle quiz entry logic
      console.log("Entering quiz:", quiz.id);
    };
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-[500px]">
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{quiz.title}</h3>
        </div>
        <div className="space-y-2 flex-1">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Date:</span> {new Date(quiz.date).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Timing:</span> {quiz.timing}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Total Marks:</span> {quiz.totalMarks}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Description:</span> {quiz.description}
          </p>
        </div>

        <button
          className={`mt-6 w-full py-2 px-4 rounded-lg transition-colors duration-300 ${
            quiz.isLive ? "bg-green-600 text-white hover:bg-green-700" : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
          onClick={quiz.isLive ? handleEnterQuiz : undefined}
        >
          {quiz.isLive ? "Enter Quiz" : "Enroll Now"}
        </button>
      </div>
    </div>
  );
}

export default QuizCard;
