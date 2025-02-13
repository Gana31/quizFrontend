import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

function ResourceForm({ onSubmit, onClose, editingResource }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setcategory] = useState("");
  useEffect(() => {
    if (editingResource) {
      setName(editingResource.name || "");
      setDescription(editingResource.description || "");
      setcategory(editingResource.category || "")
    }
  }, [editingResource]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const resourceData = { name, description ,category};

    // Include id if editingResource is defined (edit mode)
    if (editingResource && editingResource.id) {
      resourceData.id = editingResource.id;
    }

    onSubmit(resourceData);
    setName("");
    setDescription("");
    setcategory("")
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            {editingResource ? "Edit Resource" : "Add New Resource"}
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
              Category
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
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
              {editingResource ? "Update Resource" : "Add Resource"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResourceForm;
