import { FaEdit, FaTrash } from 'react-icons/fa';

function QuestionList({ questions, onDeleteQuestion, onEditQuestion }) {
  return (
    <div className="space-y-4">
      {questions.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No questions yet. Add one to get started!
        </p>
      ) : (
        questions.map((question) => (
          <div
            key={question.id}
            className="bg-gray-50 rounded-lg p-6 border border-gray-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 mb-3">
                  {question.question}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {question.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        option === question.correctAnswer
                          ? 'bg-green-100 border-green-300'
                          : 'bg-white border-gray-200'
                      } border`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => onEditQuestion(question)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDeleteQuestion(question.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default QuestionList;