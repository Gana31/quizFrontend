import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"; 
import apiClient from "../../Services/ApiConnector";
import { setToken } from "../../Slices/quizSlice";
import { enrollInQuiz } from "../../Services/Operations/userquizoperation";
import { useNavigate } from "react-router-dom";

function QuizCard({ quiz, onQuizUpdate }) {  // Add onQuizUpdate to trigger refetch
  const dispatch = useDispatch();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();

  const handleEnroll = async () => {
    try {
      setIsEnrolled(true);
      const enrolledQuiz = await dispatch(enrollInQuiz(quiz.id)); // Dispatch enroll service
      if (enrolledQuiz) {
       // Mark as enrolled
        toast.success("Successfully enrolled in the quiz!");
        
        // Call the parent function to update the list of quizzes (force a re-fetch)
        onQuizUpdate();  // Trigger the parent update (re-fetch quizzes)
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      toast.error("Failed to enroll in the quiz.");
    }finally{
      setIsEnrolled(false)
    }
  };

  const handleEnterQuiz = async () => {
    try {
      const response = await apiClient.post(`/startQuiz/${quiz.id}`);
      if (response.data.success) {
        const token = response.data.data.Token;
        dispatch(setToken(token));
        navigate(`/otp/${quiz.id}`, { state: { id: quiz.id } });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to start quiz");
    }
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
          onClick={quiz.isLive ? handleEnterQuiz : handleEnroll}
        >
          {quiz.isLive ? "Enter Quiz" : "Enroll Now"}
        </button>
      </div>
    </div>
  );
}

export default QuizCard;
