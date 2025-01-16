import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quizzes",
  initialState: {
      quizzes: [],
      loading: false,
      token : null,

  },
  reducers: {
      setQuizzes(state, action) {
          state.quizzes = action.payload;
      },
      setLoading(state, action) {
          state.loading = action.payload;
      },
      setToken(state,action){
        state.token = action.payload;
      },
      removeToken(state,action){
        state.token = null
      }
  },
});

export const { setQuizzes, setLoading ,setToken,removeToken } = quizSlice.actions;

export default quizSlice.reducer;
