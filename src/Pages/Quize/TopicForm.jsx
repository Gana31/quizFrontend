import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

function TopicForm({ onSubmit, onClose, editingTopic }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [marksPerQuestion, setMarksPerQuestion] = useState('');
  const [maxQuestions, setMaxQuestions] = useState(0);
  const [error, setError] = useState('');

  // Populate form if editing an existing topic
  useEffect(() => {
    if (editingTopic) {
      setTitle(editingTopic.title);
      setDescription(editingTopic.description);
      setTotalMarks(editingTopic.totalMarks || '');
      setMarksPerQuestion(editingTopic.marksPerQuestion || '');
      if (editingTopic.totalMarks && editingTopic.marksPerQuestion) {
        setMaxQuestions(editingTopic.totalMarks * 4);  // Max questions = Total Marks * 4
      }
    }
  }, [editingTopic]);

  // Calculate max questions based on total marks
  useEffect(() => {
    if (totalMarks && marksPerQuestion) {
      setMaxQuestions(totalMarks * 4);  // Max questions = Total Marks * 4
    } else {
      setMaxQuestions(0);
    }
  }, [totalMarks, marksPerQuestion]);

  // Clear error if the form becomes valid
  useEffect(() => {
    if (totalMarks % marksPerQuestion === 0 && error) {
      setError('');
    }
  }, [totalMarks, marksPerQuestion, error]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that totalMarks is divisible by marksPerQuestion
    if (totalMarks % marksPerQuestion !== 0) {
      setError('Total Marks must be divisible by Marks Per Question.');
      return;
    }

    // Create topic data
    const topicData = {
      title,
      description,
      totalMarks: parseFloat(totalMarks),
      marksPerQuestion: parseFloat(marksPerQuestion),
      maxQuestions,
      sets: createSets(maxQuestions),
    };

    // Call onSubmit function to send data to parent
    onSubmit(topicData);

    // Reset form state after submission and close the form
    setTitle('');
    setDescription('');
    setTotalMarks('');
    setMarksPerQuestion('');
    setMaxQuestions(0);
    onClose(); // Close the form after submission
  };

  // Generate 4 sets of questions
  const createSets = (maxQuestions) => {
    const sets = Array.from({ length: 4 }, () => []); // Initialize 4 empty sets

    const questionsPerSet = maxQuestions / 4;  // Each set gets an equal number of questions

    const questionIds = Array.from({ length: maxQuestions }, (_, i) => i + 1); // Create question IDs

    // Distribute questions evenly across 4 sets
    for (let i = 0; i < questionIds.length; i++) {
      const setIndex = Math.floor(i / questionsPerSet);  // Assign questions evenly to sets
      sets[setIndex].push(questionIds[i]);
    }

    return sets;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            {editingTopic ? 'Edit Topic' : 'Add New Topic'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Marks
            </label>
            <input
              type="number"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min="1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Marks Per Question
            </label>
            <input
              type="number"
              value={marksPerQuestion}
              onChange={(e) => setMarksPerQuestion(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              min="1"
              required
            />
          </div>
          <div>
            <p className="text-sm text-gray-600">
              Maximum Questions: <span className="font-bold">{maxQuestions || 0}</span>
            </p>
          </div>
          {error && (
            <div className="text-red-500 text-sm">
              <p>{error}</p>
            </div>
          )}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              disabled={!totalMarks || !marksPerQuestion || maxQuestions === 0 || error}
            >
              {editingTopic ? 'Update Topic' : 'Add Topic'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TopicForm;
