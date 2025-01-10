import { useState } from "react";

function QuizCard({ quiz }) {
  const [showAllTopics, setShowAllTopics] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Truncate the description to 50 characters
  const truncatedDescription =
    quiz.description.length > 50 ? quiz.description.slice(0, 50) + "..." : quiz.description;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 h-[500px]">
      <div className="p-6 h-full flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900">{quiz.title}</h3>
        </div>
        <div className="space-y-2 flex-1">
          {/* Display multiple topics, show only 2 initially */}
          <div className="flex flex-wrap gap-2 items-center">
            {quiz.topics.slice(0, 2).map((topic, index) => (
              <p key={index} className="px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                {topic}
              </p>
            ))}
            {/* Show "Show more" button for the 3rd topic */}
            {quiz.topics.length > 2 && !showAllTopics && (
              <p
                className="px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full cursor-pointer"
                onClick={() => setShowAllTopics(true)}
              >
                Show More
              </p>
            )}
            {/* Display all topics if "Show more" is clicked */}
            {showAllTopics && quiz.topics.slice(2).map((topic, index) => (
              <p key={index + 2} className="px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full">
                {topic}
              </p>
            ))}
          </div>

          {/* Truncated description */}
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
            <span className="font-medium">Description:</span>{" "}
            {showFullDescription ? quiz.description : truncatedDescription}
          </p>
          {quiz.description.length > 50 && !showFullDescription && (
            <button
              className="text-indigo-600 text-xs mt-2"
              onClick={() => setShowFullDescription(true)}
            >
              Show more
            </button>
          )}
        </div>

        <button className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
          Enroll Now
        </button>
      </div>
    </div>
  );
}

export default QuizCard;
