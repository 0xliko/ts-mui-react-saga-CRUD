import { useCallback } from 'react'

import { postsActions, selectPosts,messageInfo,processing,curPost } from 'features/posts/store'
import { Post, PostFormInput } from 'features/posts/types'
import { useAppDispatch, useAppSelector } from 'store/hooks'

export type PostServiceOperators = {
  posts: Post[],
  selectedPost : Post ,
  messageInfo: {type: string,message: string} | null,
  processing: boolean,
  setLoading: (loading:boolean)=> void
  createPost: (data: PostFormInput) => void
  fetchAllPosts: () => void
  fetchOnePost: (id:string) => void
  deletePost: (post: Post) => void
  updatePost: (post: Post) => void,
  clearMessageInfo : () => void
}

/**
 * PostService custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const usePostService = (): Readonly<PostServiceOperators> => {
  const dispatch = useAppDispatch()

  return {
    posts: useAppSelector(selectPosts),
    selectedPost : useAppSelector(curPost) || { id: '', body: '', title: ''},
    messageInfo: useAppSelector(messageInfo),
    processing: useAppSelector(processing),
    createPost: useCallback(
      (post: PostFormInput) => {
        const result = postsActions.create({ title: post.title, body: post.body })
        dispatch(result);
      },
      [dispatch],
    ),
    fetchAllPosts: useCallback(() => {
      dispatch(postsActions.fetchAll())
    }, [dispatch]),
    fetchOnePost: useCallback((id:string) => {
      dispatch(postsActions.fetchItem(id))
    }, [dispatch]),
    deletePost: useCallback(
      (post: Post) => {
        dispatch(postsActions.delete(post))
      },
      [dispatch],
    ),
    updatePost: useCallback(
      (post: Post) => {
        dispatch(
          postsActions.update({
            ...post,
          }),
        )
      },
      [dispatch],
    ),
    clearMessageInfo: useCallback(()=>{
      dispatch(postsActions.clearMessageInfo())
    },[dispatch]),
    setLoading : useCallback((loading: boolean)=>{
      dispatch(postsActions.setLoading(loading));
    },[dispatch])
  }
}

export default usePostService
