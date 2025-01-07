import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaQuestionCircle } from 'react-icons/fa';
import TopicList from './TopicList';
import TopicForm from './TopicForm';
import QuestionList from './QuestionList';
import QuestionForm from './QuestionForm';

function Quize() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingTopic, setEditingTopic] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const handleAddTopic = (topic) => {
    if (editingTopic) {
      setTopics(topics.map(t => t.id === editingTopic.id ? { ...topic, id: editingTopic.id } : t));
    } else {
      setTopics([...topics, { ...topic, id: Date.now(), questions: [] }]);
    }
    setShowTopicForm(false);
    setEditingTopic(null);
  };

  const handleDeleteTopic = (topicId) => {
    setTopics(topics.filter(t => t.id !== topicId));
    if (selectedTopic?.id === topicId) {
      setSelectedTopic(null);
    }
  };

  const handleEditTopic = (topic) => {
    setEditingTopic(topic);
    setShowTopicForm(true);
  };

  const handleAddQuestion = (question) => {
    if (editingQuestion) {
      const updatedTopics = topics.map(topic => {
        if (topic.id === selectedTopic.id) {
          return {
            ...topic,
            questions: topic.questions.map(q => 
              q.id === editingQuestion.id ? { ...question, id: editingQuestion.id } : q
            )
          };
        }
        return topic;
      });
      setTopics(updatedTopics);
    } else {
      const updatedTopics = topics.map(topic => {
        if (topic.id === selectedTopic.id) {
          return {
            ...topic,
            questions: [...topic.questions, { ...question, id: Date.now() }]
          };
        }
        return topic;
      });
      setTopics(updatedTopics);
    }
    setShowQuestionForm(false);
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (questionId) => {
    const updatedTopics = topics.map(topic => {
      if (topic.id === selectedTopic.id) {
        return {
          ...topic,
          questions: topic.questions.filter(q => q.id !== questionId)
        };
      }
      return topic;
    });
    setTopics(updatedTopics);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setShowQuestionForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Quiz Management System</h1>
          <p className="text-gray-600">Create and manage your quizzes with ease</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Topics</h2>
              <button
                onClick={() => setShowTopicForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaPlus /> Add Topic
              </button>
            </div>
            <TopicList
              topics={topics}
              onSelectTopic={setSelectedTopic}
              selectedTopic={selectedTopic}
              onDeleteTopic={handleDeleteTopic}
              onEditTopic={handleEditTopic}
            />
          </div>

          <div className="lg:col-span-2">
            {selectedTopic ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Questions for {selectedTopic.title}
                  </h2>
                  <button
                    onClick={() => setShowQuestionForm(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <FaPlus /> Add Question
                  </button>
                </div>
                <QuestionList
                  questions={selectedTopic.questions || []}
                  onDeleteQuestion={handleDeleteQuestion}
                  onEditQuestion={handleEditQuestion}
                />
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center min-h-[300px] text-gray-500">
                <FaQuestionCircle size={48} className="mb-4" />
                <p>Select a topic to manage its questions</p>
              </div>
            )}
          </div>
        </div>

        {showTopicForm && (
          <TopicForm
            onSubmit={handleAddTopic}
            onClose={() => {
              setShowTopicForm(false);
              setEditingTopic(null);
            }}
            editingTopic={editingTopic}
          />
        )}

        {showQuestionForm && selectedTopic && (
          <QuestionForm
            onSubmit={handleAddQuestion}
            onClose={() => {
              setShowQuestionForm(false);
              setEditingQuestion(null);
            }}
            editingQuestion={editingQuestion}
          />
        )}
      </div>
    </div>
  );
}

export default Quize;