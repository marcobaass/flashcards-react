import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  quizzes: {}
}

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      const { id, title, topicId, cardIds } = action.payload
      state.quizzes[id] = { id, title, topicId, cardIds }
    },
  },
});

export const selectQuizzes = (state) => state.quizzes.quizzes;

export const { addQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
