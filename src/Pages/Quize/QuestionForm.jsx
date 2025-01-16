import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

function QuestionForm({ onSubmit, onClose, editingQuestion, selectedTopic }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [explanationLink, setExplanationLink] = useState('');
  const [selectedSets, setSelectedSets] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const totalQuestions = selectedTopic?.questions?.length || 0;
  const maxQuestions = selectedTopic?.maxQuestions || 0;
    
  useEffect(() => {
    if (editingQuestion) {
      setQuestion(editingQuestion.title);
      setOptions(editingQuestion.options);
      setCorrectAnswer(editingQuestion.correctAnswer);
      setExplanationLink(editingQuestion.explanationLink || '');
      setSelectedSets(editingQuestion.selectedSets || []);
    }
  }, [editingQuestion]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!editingQuestion && totalQuestions >= maxQuestions) {
      setErrorMessage('Maximum number of questions reached. You cannot add more questions.');
      return;
    }

    if (selectedSets.length > 2) {
      setErrorMessage('You can only select up to 2 sets.');
      return;
    }

    onSubmit({
      title: question,
      options,
      correctAnswer,
      explanationLink,
      selectedSets,
    });

    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setExplanationLink('');
    setSelectedSets([]);
    setErrorMessage('');
  };

  const handleSetSelection = (set) => {
    if (selectedSets.includes(set)) {
      // If the set is already selected, remove it
      setSelectedSets((prevSets) => prevSets.filter((s) => s !== set));
    } else {
      // Ensure the user can select up to 2 sets
      if (selectedSets.length < 2) {
        setSelectedSets((prevSets) => [...prevSets, set]);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            {editingQuestion ? 'Edit Question' : 'Add New Question'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>
        {totalQuestions >= maxQuestions && !editingQuestion ? (
          <div className="p-6 text-center">
            <p className="text-red-600 font-medium">
              You have reached the maximum number of questions for this topic ({maxQuestions}).
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-2 space-y-2 md:p-6 md:space-y-6">
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-2 py-1 md:px-4 md:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-4 gap-1">
              {options.map((option, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Option {index + 1}
                  </label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                    className="w-full px-4  py-1 md:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                Correct Answer
              </label>
              <select
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                className="w-full sm:w-auto px-4 py-1 md:py-2 text-sm  border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select correct answer</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sx md:text-sm font-medium text-gray-700 mb-1">
                Explanation Link (YouTube)
              </label>
              <input
                type="url"
                value={explanationLink}
                onChange={(e) => setExplanationLink(e.target.value)}
                placeholder="https://www.youtube.com/..."
                className="w-full px-4 py-1 md:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Sets (Choose up to 2 sets)
              </label>
              <div className="flex gap-4">
                {['A', 'B', 'C', 'D'].map((set) => (
                  <div
                    key={set}
                    onClick={() => handleSetSelection(set)}
                    className={`cursor-pointer text-xs md:text-base p-2 border rounded-lg ${
                      selectedSets.includes(set) ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    Set {set}
                  </div>
                ))}
              </div>
              {selectedSets.length === 2 && (
                <p className="text-red-600 text-sm mt-2">
                  You can select at Must 2 set.
                </p>
              )}
              {selectedSets.length > 2 && (
                <p className="text-red-600 text-sm mt-2">
                  You can only select up to 2 sets.
                </p>
              )}
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
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                {editingQuestion ? 'Update Question' : 'Add Question'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default QuestionForm;
