import Container from '@mui/material/Container'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import LoadingIndicator from 'components/LoadingIndicator'
import { PostList } from 'features/posts/components/PostList'
import { usePostService } from 'features/posts/hooks/usePostService'



export const PostContainer = () => {
  const { posts, deletePost, updatePost, fetchAllPosts , processing, messageInfo, clearMessageInfo} = usePostService()
  useEffect(() => {
    fetchAllPosts()
  }, [fetchAllPosts])
  useEffect(()=>{
    if(messageInfo){
      if(messageInfo.type === 'success')
        toast.success(messageInfo.message)
      else if(messageInfo.type === 'error')
        toast.error(messageInfo.message)
      clearMessageInfo();
    }
  },[messageInfo])
  return (
    <>
      {processing && <LoadingIndicator/>}
      <Container sx={{ py: 4 }} maxWidth="md">
        <PostList posts={posts} onDeletePost={deletePost} onUpdatePost={updatePost} />
      </Container>
    </>
  )
}
