import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../Slices/authSlice"; // Assuming you have the loading state in Redux
import { toast } from "react-toastify";
import apiClient from "../../Services/ApiConnector";
import QuizDetails from './QuizDetails';
import LoadingSpinner from "../../Component/Common/Spinner";

function PreviousQuizzes() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [previousQuizzes, setPreviousQuizzes] = useState([]);
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.auth.loading); 

  // Function to fetch user's previous quizzes
  const fetchPreviousQuizzes = async () => {
    dispatch(setLoading(true)); // Start loading

    try {
      const response = await apiClient.get("/previous-answers"); 
      if (response.data.success) {
        setPreviousQuizzes(response.data.data); 
      } else {
        toast.error(response.data.message); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load previous quizzes");
    }

    dispatch(setLoading(false)); // End loading
  };


  useEffect(() => {
    fetchPreviousQuizzes();
  }, []); 

  // Truncate the description to 50 characters
  const truncatedDescription = (description) =>
    description && description.length > 50 ? description.slice(0, 50) + "..." : description;

  return (
    <>
      <div className="mt-8 bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <h3 className="text-lg md:text-xl font-semibold mb-6">Previous Quiz Attempts</h3>
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center py-6">
            <LoadingSpinner/>
            </div>
          ) : previousQuizzes.length === 0 ? (
            <div className="text-center text-gray-500 font-medium py-6">
              No previous quizzes have been attended yet. Please check back later!
            </div>
          ) : (
            previousQuizzes.map((quiz,index) => (
              <div
              key={`${quiz.id}-${index}`} 
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
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Description:</span>{" "}
                  {showFullDescription ? quiz.description : truncatedDescription(quiz.description)}
                </p>
                {quiz.description && quiz.description.length > 50 && !showFullDescription && (
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
            ))
          )}
        </div>
      </div>

      {selectedQuiz && (
        <QuizDetails quiz={selectedQuiz} onClose={() => setSelectedQuiz(null)} />
      )}
    </>
  );
}

export default PreviousQuizzes;
