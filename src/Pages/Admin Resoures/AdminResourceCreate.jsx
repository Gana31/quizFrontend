import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import QuestionForm from "./AdminQuestionForm";
import ResourceForm from "./AdminFileForm";
import QuestionList from "./AdminQuestionList";
import ResourceList from "./AdminFileList";
import { createOrUpdateResource, deleteResource, fetchResources, createOrUpdateQuestion, deleteQuestion, fetchQuestionsByResource } from "../../Services/Operations/resourceoperation";


function AdminResourceCreate() {
  const [selectedResource, setSelectedResource] = useState(null);
  const [showResourceForm, setShowResourceForm] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [resources, setResources] = useState([]);
  const [questions, setQuestions] = useState([]);

  // Fetch resources and questions when component mounts
  useEffect(() => {
    const getResources = async () => {
      try {
        const resourcesData = await fetchResources(); // Fetch all resources
        setResources(resourcesData); // Set resources data
      } catch (error) {
        // Handle error (error toast is already in the API function)
      }
    };

    getResources();
  }, []);

  // Fetch questions when a resource is selected
  useEffect(() => {
    const getQuestions = async () => {
      if (selectedResource) {
        try {
          const questionsData = await fetchQuestionsByResource(selectedResource._id); // Fetch questions for the selected resource
          setQuestions(questionsData);
        } catch (error) {
          // Handle error (error toast is already in the API function)
        }
      }
    };

    getQuestions();
  }, [selectedResource]);

  const handleAddResource = async (resource) => {
    try {
      const newResource = await createOrUpdateResource(resource, editingResource);
      if (editingResource) {
        // Update resource in the list
        setResources((prevResources) =>
          prevResources.map((r) => (r._id === editingResource._id ? newResource : r))
        );
      } else {
        // Add new resource to the list
        setResources((prevResources) => [...prevResources, newResource]);
      }
      setEditingResource(null);
      setShowResourceForm(false);
    } catch (error) {
      // Error is handled in API functions
    }
  };

  const handleDeleteResource = async (resourceId) => {
    try {
      await deleteResource(resourceId);
      setResources((prevResources) => prevResources.filter((r) => r._id !== resourceId));
      setSelectedResource(null);
    } catch (error) {
      // Error is handled in API functions
    }
  };

  const handleAddQuestion = async (question) => {
    try {
      question.resourceId = selectedResource._id;
      
      // Check if editingQuestion exists, i.e., if this is an update
      const newQuestion = await createOrUpdateQuestion(question, editingQuestion);
  
      if (editingQuestion) {
        // If editing, update the existing question in the list
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) => (q._id === editingQuestion._id ? newQuestion : q))
        );
      } else {
        // If it's a new question, add it to the list
        setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
      }
  
      setShowQuestionForm(false);
      setEditingQuestion(null);
    } catch (error) {
      // Error is handled in API functions
    }
  };
  

  const handleDeleteQuestion = async (questionId) => {
    try {
      await deleteQuestion(questionId);
      setQuestions((prevQuestions) => prevQuestions.filter((q) => q._id !== questionId)); // Remove deleted question from the list
    } catch (error) {
      // Error is handled in API functions
    }
  };

  const handleCloseForm = () => {
    setShowResourceForm(false);
    setShowQuestionForm(false);
    setEditingResource(null);
    setEditingQuestion(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Resource Management System</h1>
          <p className="text-gray-600">Create, manage, and organize your resources effortlessly.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resource List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-base md:text-2xl font-semibold mb-2 md:mb-0 text-gray-800">Resources</h2>
              <button
                onClick={() => {
                  setEditingResource(null);
                  setShowResourceForm(true);
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaPlus /> Add Resource
              </button>
            </div>
            <ResourceList
              resources={resources}
              onSelectResource={setSelectedResource}
              selectedResource={selectedResource}
              onDeleteResource={handleDeleteResource}
              onEditResource={(resource) => {
                setEditingResource(resource);
                setShowResourceForm(true);
              }}
            />
          </div>

          {/* Question Management */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {selectedResource ? (
              <>
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <h2 className="text-base md:text-2xl font-semibold mb-2 md:mb-0 text-gray-800">
                    Questions for: {selectedResource.name}
                  </h2>
                  <button
                    onClick={() => {
                      setEditingQuestion(null);
                      setShowQuestionForm(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <FaPlus /> Add Question
                  </button>
                </div>
                <QuestionList
                  questions={questions}
                  onDeleteQuestion={handleDeleteQuestion}
                  onEditQuestion={(question) => {
                    setEditingQuestion(question);
                    setShowQuestionForm(true);
                  }}
                />
              </>
            ) : (
              <p className="text-gray-500 text-center">Select a resource to manage its questions.</p>
            )}
          </div>
        </div>

        {/* Forms */}
        {showResourceForm && (
          <ResourceForm onSubmit={handleAddResource} onClose={handleCloseForm} editingResource={editingResource} />
        )}
        {showQuestionForm && (
          <QuestionForm onSubmit={handleAddQuestion} onClose={handleCloseForm} editingQuestion={editingQuestion} />
        )}
      </div>
    </div>
  );
}

export default AdminResourceCreate;
