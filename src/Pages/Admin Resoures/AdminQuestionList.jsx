import { FaEdit, FaTrash, FaExternalLinkAlt } from "react-icons/fa";

function QuestionList({ questions = [], onDeleteQuestion, onEditQuestion }) {

  return (
    <div className="space-y-4">
      {questions.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No questions yet. Add one to get started!
        </p>
      ) : (
        questions.map((question, index) => (
          <div
            key={question._id}
            className="bg-gray-50 rounded-lg p-6 border border-gray-200"
          >
            <div className="flex flex-col md:flex-row md:justify-between items-start">
              <div className="flex-1 w-full">
                <h3 className="font-medium text-gray-800 mb-3">
                  <span className="font-semibold text-gray-600">Q{index + 1}:</span> {question.title}
                </h3>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                  {question.options.map((option, i) => {
                    const optionLabel = String.fromCharCode(65 + i); 
                    return (
                      <div
                        key={i}
                        className={`w-full p-3 rounded-lg ${
                          option === question.correctAnswer
                            ? "bg-green-100 border-green-300"
                            : "bg-white border-gray-200"
                        } border`}
                      >
                        <span className="font-semibold text-gray-700">{optionLabel}.</span> {option}
                      </div>
                    );
                  })}
                </div>

                {question.explanationLink && (
                  <div className="mt-3">
                    <a
                      href={question.explanationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      Watch Explanation <FaExternalLinkAlt className="ml-1" />
                    </a>
                  </div>
                )}
              </div>
              <div className="flex gap-2 ml-4 mt-4 md:mt-0">
                <button
                  onClick={() => onEditQuestion(question)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => onDeleteQuestion(question._id)}
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
