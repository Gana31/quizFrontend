import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import QuizList from "./QuizList";
import QuizForm from "./QuizForm";
import TopicList from "./TopicList";
import TopicForm from "./TopicForm";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addQuiz, deleteQuiz, updateQuiz, fetchQuizzes, addTopic, updateTopic, deleteTopic, addQuestion, updateQuestion, deleteQuestion } from "../../Services/Operations/quizeoperation";

function Quiz() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const quizzes = useSelector((state) => state.quiz.quizzes); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch quizzes once when the component mounts
  useEffect(() => {
    // console.log("Fetch quizzes on mount",quizzes);
    dispatch(fetchQuizzes());
  }, [dispatch]);  // Only runs once when the component mounts

  // Update selectedQuiz and selectedTopic based on quizzes
  useEffect(() => {
    if (quizzes.length > 0 && !selectedQuiz) {
      setSelectedQuiz(quizzes[0]);  // Select the first quiz by default
    } else if (selectedQuiz) {
      const updatedQuiz = quizzes.find((q) => q._id === selectedQuiz._id);
      setSelectedQuiz(updatedQuiz || null);
    }

    if (selectedQuiz && selectedTopic) {
      const updatedTopic = selectedQuiz?.topics.find((t) => t._id === selectedTopic._id) || null;
      setSelectedTopic(updatedTopic);
    }
  }, [quizzes, selectedQuiz, selectedTopic]);  // Dependencies updated accordingly

  const handleAddQuiz = async (quiz) => {
    try {
      if (editingQuiz) {
        // Optimistically update the quiz list in Redux state for smoother UX
        await dispatch(updateQuiz(editingQuiz._id, quiz, navigate));
      } else {
        // Optimistically add new quiz to the list
       await dispatch(addQuiz(quiz, navigate));
      }
      dispatch(fetchQuizzes());  
    } catch (error) {
      toast.error("An error occurred while saving the quiz.");
    } finally {
      setShowQuizForm(false);
      setEditingQuiz(null);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      // Optimistically delete the quiz from the list
      await  dispatch(deleteQuiz(quizId));
      dispatch(fetchQuizzes()); // Ensure the latest quiz list is fetched after deletion
    } catch (error) {
      toast.error("An error occurred while deleting the quiz.");
    }
  };

  const handleAddTopic = async (topic) => {
    try {
      if (editingTopic) {
        // Optimistically update the topic in the selected quiz
        await dispatch(updateTopic(editingTopic._id, topic));
      } else {
        // Optimistically add new topic to the selected quiz
        await dispatch(addTopic(selectedQuiz._id, topic));
      }
      dispatch(fetchQuizzes()); // Ensure latest data is fetched after operation
      setShowTopicForm(false);
      setEditingTopic(null);
    } catch (error) {
      toast.error("An error occurred while saving the topic.");
    }
  };

  const handleDeleteTopic = async (topicId) => {
    try {
      // Optimistically delete the topic from the selected quiz
      await dispatch(deleteTopic(topicId));
      setSelectedTopic(null);
      await dispatch(fetchQuizzes()); // Ensure the latest quiz list is fetched after deletion
    } catch (error) {
      toast.error("An error occurred while deleting the topic.");
    }
  };

  const handleAddQuestion = async (question) => {
    try {
      if (editingQuestion) {
        // Optimistically update the question in the selected topic
        await  dispatch(updateQuestion(editingQuestion._id, question));
      } else {
        // Optimistically add a new question to the selected topic
        await dispatch(addQuestion(selectedTopic._id, question));
      }
      dispatch(fetchQuizzes()); // Ensure latest data is fetched after operation
      setShowQuestionForm(false);
      setEditingQuestion(null);
    } catch (error) {
      toast.error("An error occurred while saving the question.");
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      // Optimistically delete the question from the selected topic
      await dispatch(deleteQuestion(questionId));
      await dispatch(fetchQuizzes()); // Ensure the latest quiz list is fetched after deletion
    } catch (error) {
      toast.error("An error occurred while deleting the question.");
    }
  };

  const handleSelectQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setSelectedTopic(null);
  };

  const handleCloseForm = () => {
    setShowQuizForm(false);
    setShowTopicForm(false);
    setShowQuestionForm(false);
    setEditingQuiz(null);
    setEditingTopic(null);
    setEditingQuestion(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Management System</h1>
          <p className="text-gray-600">Create, manage, and organize your quizzes effortlessly.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quiz List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className=" text-base md:text-2xl font-semibold text-gray-800">Quizzes</h2>
              <button
                onClick={() => {
                  setEditingQuiz(null); // Reset form state when opening new form
                  setShowQuizForm(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaPlus /> Add Quiz
              </button>
            </div>
            <QuizList
              quizzes={quizzes}
              onSelectQuiz={handleSelectQuiz}
              selectedQuiz={selectedQuiz}
              onDeleteQuiz={handleDeleteQuiz}
              onEditQuiz={(quiz) => {
                setEditingQuiz(quiz);
                setShowQuizForm(true);
              }}
            />
          </div>

          {/* Topic Management */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            {selectedQuiz ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className=" text-base md:text-2xl font-semibold text-gray-800">Topics</h2>
                  <button
                    onClick={() => {
                      setEditingTopic(null); // Reset form state when opening new form
                      setShowTopicForm(true);
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <FaPlus /> Add Topic
                  </button>
                </div>
                <TopicList
                  topics={selectedQuiz.topics || []}
                  onDeleteTopic={handleDeleteTopic}
                  onEditTopic={(topic) => {
                    setEditingTopic(topic);
                    setShowTopicForm(true);
                  }}
                  selectedTopic={selectedTopic}
                  onSelectTopic={setSelectedTopic}
                />
              </>
            ) : (
              <p className="text-gray-500 text-center">Select a quiz to manage its topics.</p>
            )}

            {selectedTopic && (
              <>
                <div className="flex flex-col md:flex-row space-y-3 justify-between items-center my-8">
                  <h3 className=" text-base md:text-xl font-semibold text-gray-800">
                    Questions for Topic: {selectedTopic.name}
                  </h3>
                  <button
                    onClick={() => {
                      setEditingQuestion(null); // Reset form state when opening new form
                      setShowQuestionForm(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-2 text-base md:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <FaPlus /> Add Question
                  </button>
                </div>
                <QuestionList
                  questions={selectedTopic?.questions || []}
                  onDeleteQuestion={handleDeleteQuestion}
                  onEditQuestion={(question) => {
                    setEditingQuestion(question);
                    setShowQuestionForm(true);
                  }}
                />
              </>
            )}
          </div>
        </div>

        {/* Forms */}
        {showQuizForm && (
          <QuizForm onSubmit={handleAddQuiz} onClose={handleCloseForm} editingQuiz={editingQuiz} />
        )}
        {showTopicForm && (
          <TopicForm onSubmit={handleAddTopic} onClose={handleCloseForm} editingTopic={editingTopic} />
        )}
        {showQuestionForm && (
          <QuestionForm
            onSubmit={handleAddQuestion}
            onClose={handleCloseForm}
            editingQuestion={editingQuestion}
            selectedTopic={selectedTopic}
          />
        )}
      </div>
    </div>
  );
}

export default Quiz;
