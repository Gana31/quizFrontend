import { toast } from "react-toastify";
import apiClient from "../ApiConnector.js"; // Assuming apiClient is the Axios instance
import { setLoading } from "../../Slices/authSlice";
import { setQuizzes } from "../../Slices/quizSlice.js";

// Add a quiz (Create)
export function addQuiz(data, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.post("/createQuiz", data);
      if (response.data.success) {
        toast.success("Quiz added successfully");
        navigate("/quiz"); // Redirect to quiz page after adding a quiz
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add quiz");
    }
    dispatch(setLoading(false));
  };
}

// Update a quiz
export function updateQuiz(quizId, data, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.put(`/updateQuiz/${quizId}`, data);
      if (response.data.success) {
        toast.success("Quiz updated successfully");
        navigate("/quiz"); // Redirect to quiz page after updating
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update quiz");
    }
    dispatch(setLoading(false));
  };
}

// Delete a quiz
export function deleteQuiz(quizId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.delete(`/deleteQuiz/${quizId}`);
      if (response.data.success) {
        toast.success("Quiz deleted successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete quiz");
    }
    dispatch(setLoading(false));
  };
}

// Fetch all quizzes (for listing)
export function fetchQuizzes() {
  return async (dispatch) => {
    dispatch(setLoading(true));
    // console.log("called")
    try {
      const response = await apiClient.get("/getUserPreviousQuizzes");
      if (response.data.success) {

        // console.log(response.data.data)
      
        dispatch(setQuizzes(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch quizzes");
    }
    dispatch(setLoading(false));
  };
}

// Add a topic to a quiz
export function addTopic(quizId, data) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      data.quizId = quizId
      const response = await apiClient.post(`/createTopic`, data);
      if (response.data.success) {
        toast.success("Topic added successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add topic");
    }
    dispatch(setLoading(false));
  };
}

// Update a topic
export function updateTopic(topicId, data) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    // console.log("called")
    try {
      const response = await apiClient.put(`/updateTopic/${topicId}`, data);
      if (response.data.success) {
        toast.success("Topic updated successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update topic");
    }
    dispatch(setLoading(false));
  };
}

// Delete a topic
export function deleteTopic(topicId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
  
      const response = await apiClient.delete(`/deleteTopic/${topicId}`);
      if (response.data.success) {
        toast.success("Topic deleted successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete topic");
    }
    dispatch(setLoading(false));
  };
}

// Add a question to a topic
export function addQuestion(topicId, data) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      data.topicId = topicId
      const response = await apiClient.post(`/createQuestion`, data);
      if (response.data.success) {
        toast.success("Question added successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add question");
    }
    dispatch(setLoading(false));
  };
}

// Update a question
export function updateQuestion(questionId, data) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.put(`/updateQuestion/${questionId}`, data);
      if (response.data.success) {
        toast.success("Question updated successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update question");
    }
    dispatch(setLoading(false));
  };
}

// Delete a question
export function deleteQuestion(questionId) {
  return async (dispatch) => {

    dispatch(setLoading(true));
    try {
      const response = await apiClient.delete(`/deleteQuestion/${questionId}`);
      if (response.data.success) {
        toast.success("Question deleted successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete question");
    }
    dispatch(setLoading(false));
  };
}

// Fetch all topics of a quiz
export function fetchTopics(quizId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.get(`/quiz/${quizId}/topics`);
      if (response.data.success) {
        return response.data.data; // Return the list of topics
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch topics");
    }
    dispatch(setLoading(false));
  };
}

// Fetch all questions of a topic
export function fetchQuestions(quizId, topicId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.get(`/quiz/${quizId}/topic/${topicId}/questions`);
      if (response.data.success) {
        return response.data.data; // Return the list of questions
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch questions");
    }
    dispatch(setLoading(false));
  };
}


export const fetchUpcomingQuizzes = async () => {
  try {
    const response = await apiClient.get("/getUpcomingQuizzes"); // Adjust the API endpoint
    if (response.data.success) {
      return response.data.data; // Return the upcoming quizzes data
    } else {
      toast.error(response.data.message);
      return [];
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch upcoming quizzes");
    return [];
  }
};


export const fetchLiveQuizzes = async () => {
  try {
    const response = await apiClient.get("/live-quizzes"); // Adjust the API endpoint
    if (response.data.success) {
      return response.data.data; // Return the upcoming quizzes data
    } else {
      toast.error(response.data.message);
      return [];
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch Live quizzes");
    return [];
  }
};