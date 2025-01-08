import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import QuizList from "./QuizList";
import QuizForm from "./QuizForm";
import TopicList from "./TopicList";
import TopicForm from "./TopicForm";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function Quiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null); // Add this line
  // Handle adding/updating a quiz
  const handleAddQuiz = (quiz) => {
    if (editingQuiz) {
      const updatedQuizzes = quizzes.map((q) =>
        q.id === editingQuiz.id
          ? { ...quiz, id: editingQuiz.id, topics: editingQuiz.topics }
          : q
      );
      setQuizzes(updatedQuizzes);
      const updatedQuiz = updatedQuizzes.find((q) => q.id === editingQuiz.id);
      setSelectedQuiz(updatedQuiz); // Set the updated quiz as selected
    } else {
      const newQuiz = { ...quiz, id: Date.now(), topics: [] };
      setQuizzes([...quizzes, newQuiz]);
      setSelectedQuiz(newQuiz); // Set the newly created quiz as selected
    }

    setSelectedTopic(null); // Reset selected topic
    setShowQuizForm(false);
    setEditingQuiz(null);
  };

  // Handle deleting a quiz
  const handleDeleteQuiz = (quizId) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
    if (selectedQuiz?.id === quizId) setSelectedQuiz(null);
    setSelectedTopic(null);
  };

  // Handle adding/updating a topic
  const handleAddTopic = (topic) => {
    const updatedQuizzes = quizzes.map((quiz) => {
      if (quiz.id === selectedQuiz.id) {
        const topics = editingTopic
          ? quiz.topics.map((t) =>
              t.id === editingTopic.id
                ? { ...topic, id: editingTopic.id, questions: editingTopic.questions }
                : t
            )
          : [...quiz.topics, { ...topic, id: Date.now(), questions: [] }];
        return { ...quiz, topics };
      }
      return quiz;
    });

    setQuizzes(updatedQuizzes);
    const updatedQuiz = updatedQuizzes.find((q) => q.id === selectedQuiz.id);
    setSelectedQuiz(updatedQuiz);

    const updatedTopic = updatedQuiz.topics.find(
      (t) => t.id === (editingTopic ? editingTopic.id : Date.now())
    );
    setSelectedTopic(updatedTopic); // Set the newly created or updated topic as selected
    setShowTopicForm(false);
    setEditingTopic(null);
  };

  // Handle deleting a topic
  const handleDeleteTopic = (topicId) => {
    const updatedQuizzes = quizzes.map((quiz) => {
      if (quiz.id === selectedQuiz.id) {
        return {
          ...quiz,
          topics: quiz.topics.filter((t) => t.id !== topicId),
        };
      }
      return quiz;
    });

    setQuizzes(updatedQuizzes);
    const updatedQuiz = updatedQuizzes.find((q) => q.id === selectedQuiz.id);
    setSelectedQuiz(updatedQuiz);
    setSelectedTopic(null);
  };

  // Handle adding/updating a question
  const handleAddQuestion = (question) => {
    const updatedQuizzes = quizzes.map((quiz) => {
      if (quiz.id === selectedQuiz.id) {
        const updatedTopics = quiz.topics.map((topic) => {
          if (topic.id === selectedTopic.id) {
            const questions = editingQuestion
              ? topic.questions.map((q) =>
                  q.id === editingQuestion.id ? { ...question, id: editingQuestion.id } : q
                )
              : [...topic.questions, { ...question, id: Date.now() }];
            return { ...topic, questions };
          }
          return topic;
        });
        return { ...quiz, topics: updatedTopics };
      }
      return quiz;
    });

    setQuizzes(updatedQuizzes);
    const updatedQuiz = updatedQuizzes.find((q) => q.id === selectedQuiz.id);
    setSelectedQuiz(updatedQuiz);

    const updatedTopic = updatedQuiz.topics.find((t) => t.id === selectedTopic.id);
    setSelectedTopic(updatedTopic);

    const updatedQuestion = updatedTopic.questions.find(
      (q) => q.id === (editingQuestion ? editingQuestion.id : Date.now())
    );
    setEditingQuestion(null); // Reset editing question after submission
    setSelectedQuestion(updatedQuestion); // Set the newly created or updated question as selected
    setShowQuestionForm(false);
  };

  // Handle deleting a question
  const handleDeleteQuestion = (questionId) => {
    const updatedQuizzes = quizzes.map((quiz) => {
      if (quiz.id === selectedQuiz.id) {
        const updatedTopics = quiz.topics.map((topic) => {
          if (topic.id === selectedTopic.id) {
            return {
              ...topic,
              questions: topic.questions.filter((q) => q.id !== questionId),
            };
          }
          return topic;
        });
        return { ...quiz, topics: updatedTopics };
      }
      return quiz;
    });

    setQuizzes(updatedQuizzes);
    const updatedQuiz = updatedQuizzes.find((q) => q.id === selectedQuiz.id);
    setSelectedQuiz(updatedQuiz);

    const updatedTopic = updatedQuiz.topics.find((t) => t.id === selectedTopic.id);
    setSelectedTopic(updatedTopic);
  };

  // Handle selecting a quiz
  const handleSelectQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setSelectedTopic(null);
  };

  // Reset form state when closing form
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
          <QuizForm
            onSubmit={handleAddQuiz}
            onClose={handleCloseForm}
            editingQuiz={editingQuiz}
          />
        )}
        {showTopicForm && (
          <TopicForm
            onSubmit={handleAddTopic}
            onClose={handleCloseForm}
            editingTopic={editingTopic}
          />
        )}
        {showQuestionForm && (
          <QuestionForm
            onSubmit={handleAddQuestion}
            onClose={handleCloseForm}
            editingQuestion={editingQuestion}
          />
        )}
      </div>
    </div>
  );
}

export default Quiz;
