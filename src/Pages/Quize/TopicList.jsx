import { FaEdit, FaTrash } from 'react-icons/fa';

function TopicList({ topics, onSelectTopic, selectedTopic, onDeleteTopic, onEditTopic }) {
  return (
    <div className="space-y-3">
      {topics.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No topics yet. Create one to get started!</p>
      ) : (
        topics.map((topic) => (
          <div
            key={topic.id}
            className={`p-4 rounded-lg cursor-pointer transition-all ${
              selectedTopic?.id === topic.id
                ? 'bg-purple-100 border-purple-300'
                : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
            } border`}
            onClick={() => onSelectTopic(topic)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-800">{topic.title}</h3>
                <p className="text-sm text-gray-600">
                  {topic.questions?.length || 0} questions
                </p>
              </div>
              <div className="flex gap-2">
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
                    onDeleteTopic(topic.id);
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

export default TopicList;