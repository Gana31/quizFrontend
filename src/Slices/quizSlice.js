import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [], // Store quizzes data
  topics: {}, // Store topics data for each quiz (quizId -> [topics])
  questions: {}, // Store questions data for each topic (quizId -> topicId -> [questions])
  loading: false,
  error: null, // For handling any errors
};

const quizSlice = createSlice({
  name: "quiz",
  initialState: initialState,
  reducers: {
    // Set loading state
    setLoading(state, action) {
      state.loading = action.payload;
    },

    // Set quizzes data
    setQuizzes(state, action) {
      state.quizzes = action.payload;
    },

    // Set topics data for a specific quiz
    setTopics(state, action) {
      const { quizId, topics } = action.payload;
      state.topics[quizId] = topics;
    },

    // Set questions data for a specific topic within a quiz
    setQuestions(state, action) {
      const { quizId, topicId, questions } = action.payload;
      if (!state.questions[quizId]) {
        state.questions[quizId] = {};
      }
      state.questions[quizId][topicId] = questions;
    },

    // Handle error
    setError(state, action) {
      state.error = action.payload;
    },
    
    // Clear error
    clearError(state) {
      state.error = null;
    },
  },
});

export const { setLoading, setQuizzes, setTopics, setQuestions, setError, clearError } = quizSlice.actions;

export default quizSlice.reducer;
