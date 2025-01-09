import { useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function TopicList({ topics, onSelectTopic, selectedTopic, onDeleteTopic, onEditTopic }) {

useEffect(()=>{
  
},[topics])

  return (
    <div className="space-y-3">
      {topics.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No topics yet. Create one to get started!</p>
      ) : (
        topics.map((topic) => {
          const totalQuestions = topic.questions?.length || 0;
          const questionsLeft = topic.maxQuestions - totalQuestions;

          return (
            <div
              key={topic._id}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedTopic?.id === topic.id
                  ? 'bg-purple-100 border-purple-300' 
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
              } border`}
              onClick={() => onSelectTopic(topic)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">Topic Name : {topic.title}</h3>
                  <p className="text-sm text-gray-600">
                  <span className='text-red-500'>{totalQuestions}</span>  question{totalQuestions !== 1 ? 's' : ''} created,{' '}
                  </p>
                  <p className="text-sm text-gray-600">
                  <span className='text-red-500'>{questionsLeft > 0 ? questionsLeft : 0}</span>  question{questionsLeft !== 1 ? 's' : ''} left
                  </p>
                  <p className="text-sm text-gray-600">Marks per Question: <span className='text-red-500'>{topic.marksPerQuestion}</span></p>
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditTopic(topic);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteTopic(topic._id);
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

export default TopicList;
