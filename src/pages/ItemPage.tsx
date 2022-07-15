import { Alert, Container, Snackbar } from '@mui/material'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'


import { PostForm, PostFormInput, usePostService } from 'features/posts'
import TitleTypography from 'libs/ui/components/TitleTypography'

import LoadingIndicator from '../components/LoadingIndicator'


const ItemPage = () => {
  const { updatePost,messageInfo,clearMessageInfo, processing,fetchOnePost,selectedPost } = usePostService()
  const { t } = useTranslation()
  const { id } = useParams();
  const onUpdatePost = async (data:PostFormInput) => {
    updatePost(data);
  }
  useEffect(()=>{
    if(messageInfo){
      if(messageInfo.type === 'success')
        toast.success(messageInfo.message)
      else if(messageInfo.type === 'error')
        toast.error(messageInfo.message)
      clearMessageInfo();
    }
  },[messageInfo])

  useEffect(()=>{
    fetchOnePost(String(id));
  },[id])

  return (
    <>
      {processing && <LoadingIndicator/>}
      <TitleTypography title={t('update.title')} />
      <Container maxWidth="xs">
        <PostForm onSubmitClick={onUpdatePost}  defaultValues={{id:selectedPost.id,title: selectedPost.title, body: selectedPost.body}}/>
      </Container>

    </>
  )
}

export default ItemPage
