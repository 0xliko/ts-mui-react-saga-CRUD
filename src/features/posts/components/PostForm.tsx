import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack'
import React, { useMemo,useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'

import { PostFormInput } from 'features/posts/types'
import { FormTextField } from 'libs/ui/components/FormTextField'

export type PostFormProps = {
  defaultValues?: PostFormInput
  onSubmitClick(data: PostFormInput): void
}

export const PostForm = (props: PostFormProps) => {
  const { t } = useTranslation()

  const {
    defaultValues = {
      id: '',
      title: '',
      body: '',
    },
    onSubmitClick,
  } = props



  const newPostValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required(t('home.form.validation.title-required'))
      .max(200, t('home.form.validation.title-max', { num: 200 })),
    body: Yup.string().required(t('home.form.validation.body-required')),
    id: Yup.string()
  })

  const methods = useForm<PostFormInput>({
    defaultValues: useMemo(() => props.defaultValues, [props]),
    resolver: yupResolver(newPostValidationSchema),
  })

  const { handleSubmit, reset, control } = methods

  useEffect(() => {
    reset(props.defaultValues);
  }, [props.defaultValues]);

  return (
    <Stack sx={{ pt: 0 }} direction="column" spacing={1} justifyContent="center">
      <FormTextField name="title" label={t('home.form.title')} control={control} />
      <FormTextField name="body" label={t('home.form.body')} control={control} />
      <Button onClick={handleSubmit(onSubmitClick)} variant={'contained'}>
        { defaultValues.id ? t('home.buttons.update') : t('home.buttons.submit')}
      </Button>
      <Button onClick={() => reset({...defaultValues,title:'',body:''})} variant={'outlined'}>
        {t('home.buttons.reset')}
      </Button>
    </Stack>
  )
}
