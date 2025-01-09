import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quizzes",
  initialState: {
      quizzes: [],
      loading: false,
  },
  reducers: {
      setQuizzes(state, action) {
          state.quizzes = action.payload;
      },
      setLoading(state, action) {
          state.loading = action.payload;
      },
  },
});

export const { setQuizzes, setLoading } = quizSlice.actions;

export default quizSlice.reducer;
