import { FaEdit, FaTrash } from 'react-icons/fa';

function QuizList({ quizzes, onSelectQuiz, selectedQuiz, onDeleteQuiz, onEditQuiz }) {
  return (
    <div className="space-y-3">
      {quizzes.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No quizzes yet. Create one to get started!
        </p>
      ) : (
        quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              selectedQuiz?.id === quiz.id
                ? 'bg-purple-100 border-purple-300'
                : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
            } border`}
            onClick={() => onSelectQuiz(quiz)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-800">{quiz.name}</h3>
                <p className="text-sm text-gray-600">{quiz.description}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditQuiz(quiz);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteQuiz(quiz.id);
                  }}
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

export default QuizList;
