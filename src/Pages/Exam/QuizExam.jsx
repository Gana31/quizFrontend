import React, { useState, useEffect } from "react";
import { FiClock, FiBookOpen } from "react-icons/fi";
import QuestionSidebar from "./QuizSidebar";
import Result from "./Result"; // Import the Result page component
import apiClient from "../../Services/ApiConnector";
import { toast } from "react-toastify";
import { setLoading } from "../../Slices/authSlice";
import { useDispatch } from "react-redux";

export default function Quiz({ quizData }) {
  const [questions, setQuestions] = useState(quizData || []);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(
    questions.length > 0 ? questions[0].timeAllowed : 0
  );
  const [answers, setAnswers] = useState([]); // Tracks user answers
  const [showResults, setShowResults] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (quizData && quizData.length > 0) {
      setQuestions(quizData);
      setTimeLeft(quizData[0].timeAllowed); // Set initial time for the first question
    }
  }, [quizData]);

  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && currentQuestion < questions.length - 1) {
      handleNextQuestion(null); // Auto-advance when time is up
    } else if (timeLeft === 0 && currentQuestion === questions.length - 1) {
      // Submit answers for the last question when time runs out
      const newAnswer = {
        questionId: questions[currentQuestion]?.id,
        selectedOption: null, // If time is up and no answer was selected
      };
      setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
      submitAnswersToBackend([...answers, newAnswer]); // Submit the answers
      setShowResults(true); // Show results after the quiz ends
    }
  }, [timeLeft, showResults, currentQuestion, questions]);

  const handleNextQuestion = async (selectedOption) => {
    const newAnswer = {
      questionId: questions[currentQuestion]?.id,
      selectedOption: selectedOption === null ? null : selectedOption,
    };
  
    // Immediately update the answers state with the current answer
    setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
  
    // Move to the next question
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
      setTimeLeft(questions[currentQuestion + 1]?.timeAllowed || 0); // Set timer for next question
    } else {
      // Call API to save answers after the last question
      await submitAnswersToBackend([...answers, newAnswer]);
      setShowResults(true); // Show results after the quiz ends
    }
  };

  const submitAnswersToBackend = async (allAnswers) => {
    try {
      const payload = {
        quizId: questions[0]?.quizId, // Assuming quizId is available in questions
        topics: questions.reduce((acc, q, index) => {
          const topicIndex = acc.findIndex((topic) => topic.topicId === q.topicId);
  
          const answerObj = {
            questionId: q.id,
            questionTitle: q.question,
            selectedOption: allAnswers[index]?.selectedOption ?? null,
            options: q.options,
          };
  
          if (topicIndex === -1) {
            acc.push({
              topicName: q.topic,
              topicId: q.topicId,
              questions: [answerObj],
            });
          } else {
            acc[topicIndex].questions.push(answerObj);
          }
  
          return acc;
        }, []),
      };
  
      const response = await apiClient.post("/answersubmit", payload);
  
      if (response.data.success) {
        toast.success("Answers submitted successfully!");
      } else {
        toast.error(response.data.message || "Failed to submit answers.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while submitting answers.");
      console.error("Error submitting answers:", error);
    } finally {
      dispatch(setLoading(false)); // Stop the loading spinner
    }
  };

  const handleExitQuiz = () => {
    // Submit answers for any unanswered questions (set to null)
    const allAnswers = questions.map((q, index) => ({
      questionId: q.id,
      selectedOption: answers[index]?.selectedOption ?? null, // Use null if the answer doesn't exist
    }));

    // Submit all answers (including null values for unanswered questions)
    submitAnswersToBackend(allAnswers);
    setShowResults(true); // Show results after exit
  };

  // Wait for questions to load
  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  const currentQ = questions[currentQuestion];

  // If all questions are answered or skipped, show the result page
  if (showResults) {
    return <Result answers={answers} questions={questions} handleExitQuiz={handleExitQuiz} />;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 to-blue-50 p-4 flex items-center justify-center">
      <div className="flex w-full max-w-6xl">
        <QuestionSidebar answers={answers} questions={questions} />
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
              <span
                className={`font-bold ${
                  timeLeft <= 10 ? "text-red-500" : "text-purple-600"
                }`}
              >
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
              onClick={() => handleNextQuestion(null)} // Skip the question
              className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Skip
            </button>
          </div>

          {/* Exit Button to Exit the Quiz */}
          <button
            onClick={handleExitQuiz}
            className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
