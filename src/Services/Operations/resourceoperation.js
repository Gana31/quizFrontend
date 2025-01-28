
import { toast } from "react-toastify";
import apiClient from "../ApiConnector";
// Fetch all resources
export const fetchResources = async () => {
  try {
    const response = await apiClient.get("/getAllAdminResources"); // Update the route accordingly
    return response.data.data; // Assuming the response contains the resources in `data`
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch resources");
    throw error;
  }
};


export const fetchAllResources = async () => {
  try {
    const response = await apiClient.get("/resourcesAlldetails"); // Update the route accordingly
    return response.data.data; // Assuming the response contains the resources and categories in `data`
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch resources");
    throw error;
  }
};

// Create or Update a resource
export const createOrUpdateResource = async (data, editingResource) => {
  try {
    if (editingResource) {
      const response = await apiClient.put(`/updateResource/${editingResource._id}`, data);
      return response.data.data; // Return the updated resource
    } else {
      const response = await apiClient.post("/createResource", data);
      return response.data.data; // Return the newly created resource
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create/update resource");
    throw error;
  }
};

// Delete a resource
export const deleteResource = async (resourceId) => {
  try {
    const response = await apiClient.delete(`/deleteResource/${resourceId}`);
    return response.data; // Assuming the response contains a success message
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete resource");
    throw error;
  }
};



export const createOrUpdateQuestion = async (data, editingQuestion) => {
    try {
      if (editingQuestion) {
        const response = await apiClient.put(`/updateResourceQuestion/${editingQuestion._id}`, data);
        return response.data.data; // Return the updated question
      } else {
        const response = await apiClient.post("/createResourceQuestion", data);
        return response.data.data; // Return the newly created question
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create/update question");
      throw error;
    }
  };
  
  // Delete a question
  export const deleteQuestion = async (questionId) => {
    try {
      const response = await apiClient.delete(`/deleteResourceQuestion/${questionId}`);
      return response.data; // Assuming the response contains a success message
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete question");
      throw error;
    }
  };
  
  // Fetch questions by resource ID
  export const fetchQuestionsByResource = async (resourceId) => {
    try {
      const response = await apiClient.get(`/getQuestionsByResource/${resourceId}`);
      return response.data.data; // Return the questions for the resource
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch questions");
      throw error;
    }
  };