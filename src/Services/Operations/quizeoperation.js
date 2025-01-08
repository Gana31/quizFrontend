import { toast } from "react-toastify";
import apiClient from "../ApiConnector.js"; // Assuming apiClient is the Axios instance
import { setLoading } from "../../Slices/authSlice";

// Add a quiz (Create)
export function addQuiz(data, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.post("/quiz", data);
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
      const response = await apiClient.put(`/quiz/${quizId}`, data);
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
      const response = await apiClient.delete(`/quiz/${quizId}`);
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
    try {
      const response = await apiClient.get("/quiz");
      if (response.data.success) {
        return response.data.data; // Return the list of quizzes
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
      const response = await apiClient.post(`/quiz/${quizId}/topic`, data);
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
export function updateTopic(quizId, topicId, data) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.put(`/quiz/${quizId}/topic/${topicId}`, data);
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
export function deleteTopic(quizId, topicId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.delete(`/quiz/${quizId}/topic/${topicId}`);
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
export function addQuestion(quizId, topicId, data) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.post(`/quiz/${quizId}/topic/${topicId}/question`, data);
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
export function updateQuestion(quizId, topicId, questionId, data) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.put(`/quiz/${quizId}/topic/${topicId}/question/${questionId}`, data);
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
export function deleteQuestion(quizId, topicId, questionId) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiClient.delete(`/quiz/${quizId}/topic/${topicId}/question/${questionId}`);
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