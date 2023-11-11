import { Post } from "@/interfaces/interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: { posts: Post[] } = {
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPostsRedux: (state, { payload }) => {
      state.posts = [...state.posts, ...payload];
    },
    addPostRedux: (state, { payload }) => {
      state.posts = [payload, ...state.posts];
    },
  },
});

export default postSlice.reducer;
export const { addPostRedux, getPostsRedux } = postSlice.actions;
