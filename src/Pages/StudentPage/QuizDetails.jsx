import { useState } from 'react';
import { FaExternalLinkAlt } from "react-icons/fa";
import LoadingSpinner from '../../Component/Common/Spinner';
import { toast } from 'react-toastify';
import apiClient from '../../Services/ApiConnector';

function QuizDetails({ quiz, onClose }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [feedbackMessage, setFeedbackMessage] = useState(''); // Store feedback message
  const [loadingFeedback, setLoadingFeedback] = useState(false); // Track feedback submission state
  const [currentQuestion, setCurrentQuestion] = useState(null); // Track selected question for feedback

  // Function to handle feedback submission
  const handleFeedbackSubmit = async () => {
    if (!currentQuestion) return; // Ensure a question is selected

    setLoadingFeedback(true);

    // Gather the specific question details
    const feedbackData = {
      quizId: quiz.id,
      quizName: quiz.title,
      feedback: feedbackMessage,
      quizCreator:quiz.quizCreator,
      question: {
        questionText: currentQuestion.question,
        options: currentQuestion.options,
        correctAnswer: currentQuestion.correctAnswer,
        selectedAnswer: currentQuestion.userAnswer,
        isCorrect: currentQuestion.isCorrect,
        explanationLink : currentQuestion.explanationLink,
      },
    };

    try {
      // Send feedback to the backend
      const response = await apiClient.post("/createfeedback", feedbackData);
      
      if (response.data.success) {
        toast.success("Feedback submitted successfully!");
        setIsModalOpen(false); // Close the modal
      } else {
        toast.error("Failed to submit feedback.");
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.data?.message || "Error submitting feedback.");
    } finally {
      setLoadingFeedback(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 md:p-6 flex justify-between items-center">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">{quiz.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="p-4 md:p-6">
          {/* Quiz Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
              <p className="text-xs md:text-sm text-gray-500">Date Taken</p>
              <p className="text-sm md:text-lg font-semibold">{quiz.date}</p>
            </div>

            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
              <p className="text-xs md:text-sm text-gray-500">Score</p>
              <p className="text-sm md:text-lg font-semibold">
                {quiz.score}/{quiz.totalMarks} ({(quiz.score / quiz.totalMarks * 100).toFixed(1)}%)
              </p>
            </div>
            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
              <p className="text-xs md:text-sm text-gray-500">Status</p>
              <p className={`text-sm md:text-lg font-semibold ${quiz.status === 'passed' ? 'text-green-600' : 'text-red-600'}`}>
                {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
              </p>
            </div>
          </div>

          {/* Topics Review */}
          <div className="space-y-8">
            {quiz.topics.map((topic, topicIndex) => (
              <div key={topicIndex} className="bg-gray-50 p-4 md:p-6 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900">{topic.name}</h3>
                  <div className="mt-2 md:mt-0 flex items-center space-x-4">
                    <span className="text-sm text-gray-600">
                      Score: {topic.correctAnswers}/{topic.totalQuestions}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${ (topic.correctAnswers / topic.totalQuestions) >= 0.7 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }`}>
                      {((topic.correctAnswers / topic.totalQuestions) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {topic.questions.map((question, index) => (
                    <div
                      key={question.id}
                      className={`p-4 rounded-lg border ${question.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
                    >
                      <div className="flex flex-col md:flex-row justify-between mb-2">
                        <h4 className="text-base md:text-lg font-medium">Question {index + 1}</h4>
                        <span className={`mt-2 md:mt-0 px-2 py-1 rounded-full text-xs font-medium ${question.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {question.isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                      <p className="text-gray-800 mb-4 text-sm md:text-base">{question.question}</p>

                      {/* MCQ Options */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {question.options.map((option, optIndex) => (
                          <p
                            key={optIndex}
                            className={`text-sm md:text-base p-2 rounded-lg ${option === question.correctAnswer ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
                          >
                            {option}
                          </p>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs md:text-sm text-gray-500">Your Answer:</p>
                          <p className={`text-sm md:text-base font-medium ${question.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                            {question.userAnswer}
                          </p>
                        </div>
                        {!question.isCorrect && (
                          <div>
                            <p className="text-xs md:text-sm text-gray-500">Correct Answer:</p>
                            <p className="text-sm md:text-base font-medium text-green-700">
                              {question.correctAnswer}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Explanation and Feedback */}
                      <div className="flex items-center justify-between mt-4">
                        <a
                          href={question.explanationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm md:text-base flex items-center"
                        >
                          Watch Explanation Video <FaExternalLinkAlt className="ml-1" />
                        </a>
                        <button
                          onClick={() => {
                            setCurrentQuestion(question); // Set the current question for feedback
                            setIsModalOpen(true); // Open feedback modal
                          }}
                          className="text-sm md:text-base text-gray-700 border px-3 py-1 rounded-lg hover:bg-gray-100"
                        >
                          Give Feedback
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-3xl p-6">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Submit Feedback</h3>
            <textarea
              className="w-full p-4 border rounded-lg mb-4"
              rows="6"
              placeholder="Write your feedback here..."
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <button
                onClick={() => setIsModalOpen(false)} // Close modal
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleFeedbackSubmit}
                disabled={loadingFeedback || feedbackMessage.trim() === ''}
                className={`px-4 py-2 rounded-lg ${loadingFeedback ? 'bg-gray-300' : 'bg-blue-600 text-white'} ${feedbackMessage.trim() === '' ? 'bg-gray-200' : ''}`}
              >
                {loadingFeedback ? <LoadingSpinner /> : 'Submit Feedback'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizDetails;
