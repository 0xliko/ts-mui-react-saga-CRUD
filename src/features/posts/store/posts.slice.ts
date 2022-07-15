// CURD pattern
import { createAction, createSlice, nanoid, PayloadAction , createAsyncThunk} from '@reduxjs/toolkit'

import { Post } from 'features/posts/types'
import type { RootState } from 'store/store'

export interface PostsState {
  posts: Post[],
  selectedPost: Post | null,
  messageInfo: {type: string, message: string} | null,
  processing: boolean
}

const initialState: PostsState = {
  posts: [],
  messageInfo: null,
  processing: false,
  selectedPost: null
}

// slice
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchAllSucceeded(state, action: PayloadAction<Post[]>) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      state.posts = action.payload
    },
    fetchSucceeded(state, action: PayloadAction<Post>) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      state.selectedPost = action.payload
    },
    setMessageInfo(state, action: PayloadAction<{message:string,type:string}>) {
      // it's okay to do this here, because immer makes it immutable under the hood😊
      state.messageInfo = action.payload
    },
    clearMessageInfo(state){
      state.messageInfo = null;
    },
    setLoading(state, action:PayloadAction<boolean>){
      state.processing = action.payload
    }
  },
})

// Actions
export const postsActions = {
  create: createAction(`${postsSlice.name}/create`, (post: Post) => ({
    payload: { title: post.title, body: post.body },
  })),
  fetchAll: createAction(`${postsSlice.name}/fetchAll`),
  fetchItem: createAction(`${postsSlice.name}/fetchItem`, (id: string) => ({
    payload: id ,
  })),
  fetchAllSucceeded: postsSlice.actions.fetchAllSucceeded,
  fetchSucceeded: postsSlice.actions.fetchSucceeded,
  update: createAction<Post>(`${postsSlice.name}/update`),
  delete: createAction<Post>(`${postsSlice.name}/delete`),
  setMessageInfo: postsSlice.actions.setMessageInfo,
  clearMessageInfo: postsSlice.actions.clearMessageInfo,
  setLoading: postsSlice.actions.setLoading
}

// Selectors
export const selectPosts = (state: RootState) => state.posts.posts
export const messageInfo = (state: RootState) => state.posts.messageInfo
export const processing = (state: RootState) => state.posts.processing
export const curPost = (state: RootState) => state.posts.selectedPost

// Reducer
export default postsSlice.reducer
