import { Alert, Container, Snackbar } from '@mui/material'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'


import { PostForm, PostFormInput, usePostService } from 'features/posts'
import TitleTypography from 'libs/ui/components/TitleTypography'

import LoadingIndicator from '../components/LoadingIndicator'


const CreatePage = () => {
  const { createPost,messageInfo,clearMessageInfo,setLoading, processing } = usePostService()
  const { t } = useTranslation()
  const onCreatePost = async (data:PostFormInput) => {
    createPost(data);
  }
  console.log(processing, "processing")
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
      <TitleTypography title={t('create.title')} />
      <Container maxWidth="xs">
        <PostForm onSubmitClick={onCreatePost} />
      </Container>

    </>
  )
}

export default CreatePage
