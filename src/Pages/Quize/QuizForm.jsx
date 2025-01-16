import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

function QuizForm({ onSubmit, onClose, editingQuiz }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    if (editingQuiz) {
      setName(editingQuiz.name || "");
      setDescription(editingQuiz.description || "");
      // Format startTime and endTime to match "datetime-local" input requirements
      setStartTime(
        editingQuiz.startTime
          ? new Date(editingQuiz.startTime).toISOString().slice(0, 16)
          : ""
      );
      setEndTime(
        editingQuiz.endTime
          ? new Date(editingQuiz.endTime).toISOString().slice(0, 16)
          : ""
      );
    }
  }, [editingQuiz]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(startTime) >= new Date(endTime)) {
      alert('End time must be greater than the start time.');
      return;
    }

    const quizData = { name, description, startTime, endTime };

    // Include id if editingQuiz is defined (edit mode)
    if (editingQuiz && editingQuiz.id) {
      quizData.id = editingQuiz._id;
    }

    onSubmit(quizData);
    setName('');
    setDescription('');
    setStartTime('');
    setEndTime('');
  };

  const minStartTime = new Date().toISOString().slice(0, 16); // Current date and time in "YYYY-MM-DDTHH:MM" format

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);

    // Automatically adjust end time if it's earlier than the new start time
    if (new Date(endTime) < new Date(newStartTime)) {
      setEndTime(newStartTime);
    }
  };

  const getEndTimeMin = () => {
    // Ensure end time is not earlier than start time
    return startTime;
  };

  const getEndTimeMax = () => {
    // Ensure end time is on the same day as start time
    const startDate = startTime.split('T')[0]; // Extract date part
    return `${startDate}T23:59`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            {editingQuiz ? 'Edit Quiz' : 'Add New Quiz'}
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
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              Start Time
            </label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={handleStartTimeChange}
              min={minStartTime}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              min={getEndTimeMin()}
              max={getEndTimeMax()}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>
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
            >
              {editingQuiz ? 'Update Quiz' : 'Add Quiz'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuizForm;
