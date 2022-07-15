import { SagaIterator } from '@redux-saga/core'
import { call, put, takeEvery } from 'redux-saga/effects'

import { createPost, deletePost, getPosts, updatePost, getPost } from 'features/posts/api'
import { postsActions } from 'features/posts/store/posts.slice'
import { Post } from 'features/posts/types'

// Worker Sagas
export function* onGetPosts(): SagaIterator {
  try {
    yield put(postsActions.setLoading(true))
    const posts: Post[] = yield call(getPosts)
    yield put(postsActions.fetchAllSucceeded(posts))
    yield put(postsActions.setLoading(false))
  } catch (e) {
    yield put(postsActions.setMessageInfo({type:'error',message:'Error while get item list!'}))
    yield put(postsActions.setLoading(false))
  }
}

export function* onGetPost({payload}: {
  type: typeof postsActions.fetchItem
  payload: string
}): SagaIterator {
  try {
    yield put(postsActions.setLoading(true))
    const post: Post = yield call(getPost,payload)
    yield put(postsActions.fetchSucceeded(post))
    yield put(postsActions.setLoading(false))
  } catch (e) {
    yield put(postsActions.setMessageInfo({type:'error',message:'Error while get item!'}))
    yield put(postsActions.setLoading(false))
  }
}

function* onCreatePost({
  payload,
}: {
  type: typeof postsActions.create
  payload: Post
}): SagaIterator {
  try {
    yield put(postsActions.setLoading(true))
    yield call(createPost, payload)
    yield put(postsActions.setLoading(false))
    yield put(postsActions.setMessageInfo({type:'success',message:'Item created successfully!'}))
  }
  catch(error) {
    yield put(postsActions.setLoading(false))
    yield put(postsActions.setMessageInfo({type:'error',message:'Error while create new item!'}))

  }
}

function* onUpdatePost({
  payload,
}: {
  type: typeof postsActions.update
  payload: Post
}): SagaIterator {
  try {
    yield put(postsActions.setLoading(true))
    yield call(updatePost, payload)
    yield put(postsActions.setLoading(false))
    yield put(postsActions.setMessageInfo({type:'success',message:'Item updated successfully!'}))
  }
  catch(error) {
    yield put(postsActions.setLoading(false))
    yield put(postsActions.setMessageInfo({type:'error',message:'Error while update item!'}))
  }
}

function* onDeletePost({
  payload,
}: {
  type: typeof postsActions.delete
  payload: Post
}): SagaIterator {
  try {
    yield put(postsActions.setLoading(true))
    yield call(deletePost, payload)
    yield put(postsActions.fetchAll())
    yield put(postsActions.setLoading(false))
    yield put(postsActions.setMessageInfo({type:'success',message:'Item removed successfully!'}))
  }
  catch(error) {
    yield put(postsActions.setLoading(false))
    yield put(postsActions.setMessageInfo({type:'error',message:'Error while remove item!'}))
  }


}

// Watcher Saga
export function* postsWatcherSaga(): SagaIterator {
  yield takeEvery(postsActions.fetchAll.type, onGetPosts)
  yield takeEvery(postsActions.update.type, onUpdatePost)
  yield takeEvery(postsActions.delete.type, onDeletePost)
  yield takeEvery(postsActions.create.type, onCreatePost)
  yield takeEvery(postsActions.fetchItem.type, onGetPost)
}

export default postsWatcherSaga
