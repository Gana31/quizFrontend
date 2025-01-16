import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Quiz from "../Exam/QuizExam";
import apiClient from "../../Services/ApiConnector";
import { removeToken } from "../../Slices/quizSlice";
import { useDispatch } from "react-redux";

const QuizExam = ({ setIsFullscreen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quizData, setQuizData] = useState(null);
  const [quizId, setQuizId] = useState(null); // New state for quizId
  const { id } = useParams();
  const enterFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else {
      console.error("Fullscreen API not supported.");
    }
    setIsFullscreen && setIsFullscreen(true);  // Set fullscreen prop to true when entering fullscreen
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen && setIsFullscreen(false); // Set fullscreen prop to false when exiting fullscreen
    } else {
      console.warn("Document is not in fullscreen mode.");
    }
  };

  const fetchQuizData = async () => {
    try {
      const response = await apiClient.post("/getNextQuestion", {
        quizId: id, // Replace with dynamic quizId if needed
      });

      const quizId = response.data.data[0]?.quizId;
      setQuizId(quizId);
      
      const transformedData = response.data.data.slice(1).flatMap((topic) =>
        topic.questions.map((question) => ({
          id: question._id,
          topic: topic.topicName,
          timeAllowed: 60,
          question: question.title,
          options: question.options,
          quizId,
          topicId: topic.topicId,
        }))
      );

      setQuizData(transformedData); // Set the transformed data

    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  useEffect(() => {
    dispatch(removeToken());
    enterFullscreen();
    localStorage.setItem("quizActive", "true");
    fetchQuizData();

    return () => {
      exitFullscreen();
      localStorage.removeItem("quizActive");
    };
  }, []);

  useEffect(() => {
    const quizActive = localStorage.getItem("quizActive");
    if (!quizActive) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleFinish = () => {
    exitFullscreen();
    setIsFullscreen(false); // Set fullscreen to false when user exits
    navigate("/quiz", { replace: true });
  };

  return (
    <div className="relative w-[100vw] h-screen bg-gray-100">
      <button
        onClick={handleFinish}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg"
      >
        Finish
      </button>
      <div className="flex items-center justify-center w-full h-full">
        <Quiz quizData={quizData} quizId={quizId} />
      </div>
    </div>
  );
};

export default QuizExam;
