import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Assuming you are using react-toastify for error messages
import { fetchAllResources } from '../../Services/Operations/resourceoperation';


function StudentResourceMain() {
  const [resources, setResources] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showModal, setShowModal] = useState(false);

  // Fetch resources and categories from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllResources();
        setResources(data.resources);
        setCategories(data.categories);
      } catch (error) {
        toast.error('Failed to fetch resources');
      }
    };
    fetchData();
  }, []);

  // Filter resources by category
  const filteredResources = selectedCategory === 'All'
    ? resources
    : resources.filter(resource => resource.category === selectedCategory);

  // Handle resource card click
  const handleCardClick = (resource) => {
    setSelectedResource(resource);
    setShowModal(true); // Open the modal when a resource is selected
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedResource(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Aptitude Resources</h1>
          <p className="text-gray-600">Explore our wide range of learning resources</p>
        </header>

        {/* Category Filter */}
        <div className="mb-8">
          <label htmlFor="category" className="font-semibold text-gray-700">Filter by Category: </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="ml-2 p-2 border rounded-md"
          >
            <option value="All">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((resource) => (
            <div
              key={resource._id}
              onClick={() => handleCardClick(resource)}
              className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:bg-blue-50 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">{resource.name}</h3>
              <p className="text-gray-600 mt-2">{resource.description}</p>
              <p className="text-sm text-gray-500 mt-4">Created by: {resource.createdBy.name}</p>
              <p className="text-sm text-gray-400 mt-1">Category: {resource.category}</p>
            </div>
          ))}
        </div>

        {/* Modal for displaying questions */}
        {showModal && selectedResource && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl max-w-lg w-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Questions for {selectedResource.name}</h2>

              {/* Questions container with scrollable content */}
              <div className="max-h-96 overflow-y-auto mb-4">
                {selectedResource.questions.map((q, index) => (
                  <div key={index} className="bg-gray-100 p-4 mb-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800">{q.title}</h3>
                    <div className="mt-4">
                      {q.options.map((option, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`option-${i}`}
                            name={`question-${index}`}
                            value={option}
                            disabled
                            className="h-4 w-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                          />
                          <label htmlFor={`option-${i}`} className="text-gray-700">{option}</label>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-500">Correct Answer: <span className="font-bold text-green-500">{q.correctAnswer}</span></p>
                      <a href={q.explanationLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mt-2 block">
                        Explanation Link
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentResourceMain;
