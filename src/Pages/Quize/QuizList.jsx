import { useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function formatDateTimeRange(startTime, endTime) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
  const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };

  const formattedDate = start.toLocaleDateString(undefined, optionsDate);
  const formattedStartTime = start.toLocaleTimeString(undefined, optionsTime);
  const formattedEndTime = end.toLocaleTimeString(undefined, optionsTime);

  return { formattedDate, formattedStartTime, formattedEndTime };
}

function QuizList({ quizzes, onSelectQuiz, selectedQuiz, onDeleteQuiz, onEditQuiz }) {
useEffect(()=>{
  
},[quizzes])
  return (
    <div className="space-y-3">
      {quizzes.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No quizzes yet. Create one to get started!
        </p>
      ) : (
        quizzes.map((quiz) => {
          const { formattedDate, formattedStartTime, formattedEndTime } = formatDateTimeRange(
            quiz.startTime,
            quiz.endTime
          );

          return (
            <div
              key={quiz._id}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedQuiz?._id === quiz._id
                  ? 'bg-purple-100 border-purple-300'
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
              } border`}
              onClick={() => onSelectQuiz(quiz)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">{quiz.name}</h3>
                  <p className="text-sm text-gray-600">{quiz.description}</p>
                  <p className="text-sm text-gray-500">
                    Date : {formattedDate}  
                  </p>
                  <p className="text-sm text-gray-500">
                    Timing : {formattedStartTime} to {formattedEndTime}
                  </p>
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
                      onDeleteQuiz(quiz._id);
                    }}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default QuizList;
