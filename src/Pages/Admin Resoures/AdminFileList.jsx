import { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";


function ResourceList({ resources, onSelectResource, selectedResource, onDeleteResource, onEditResource }) {
  useEffect(() => {
    // Effect to handle changes in resources
  }, [resources]);

  return (
    <div className="space-y-3">
      {resources.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No resources yet. Create one to get started!
        </p>
      ) : (
        resources.map((resource) => {
          return (
            <div
              key={resource._id}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedResource?._id === resource._id
                  ? "bg-purple-100 border-purple-300"
                  : "bg-gray-50 hover:bg-gray-100 border-gray-200"
              } border`}
              onClick={() => onSelectResource(resource)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">{resource.name}</h3>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                  
                </div>
                <div className="flex flex-col md:flex-row gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditResource(resource);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteResource(resource._id);
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

export default ResourceList;
