import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function QuestionForm({ onSubmit, onClose, editingQuestion }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [explanationLink, setExplanationLink] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (editingQuestion) {
      setQuestion(editingQuestion.title);
      setOptions(editingQuestion.options);
      setCorrectAnswer(editingQuestion.correctAnswer);
      setExplanationLink(editingQuestion.explanationLink || '');
    }
  }, [editingQuestion]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure the correct answer is selected from the options
    if (!correctAnswer) {
      setErrorMessage("Please select the correct answer.");
      return;
    }

    onSubmit({
      title: question,
      options,
      correctAnswer,
      explanationLink,
    });

    // Reset form after submission
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setExplanationLink('');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            {editingQuestion ? "Edit Question" : "Add New Question"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <FaTimes size={24} />
          </button>
        </div>
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
                  className="w-full px-4 py-1 md:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full sm:w-auto px-4 py-1 md:py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
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
              {editingQuestion ? "Update Question" : "Add Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuestionForm;
