'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
} from '@chakra-ui/react'
import { IAuthData } from './authForm.interface'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PASSWORD_REGEXP } from '@/utils/constants/regexp'
import { EERROR_MESSAGES } from '@/utils/constants/error-messages'
import cls from './AuthForm.module.css'
import { AuthService } from '../../services/auth.service'
import { createTokenCookie } from '../../services/actions'
import { useState } from 'react'
import { Text } from '@chakra-ui/react'
import { useTokenStore } from '@/store/token'
import { useRouter } from 'next/navigation'

const schema = yup
  .object({
    username: yup
      .string()
      .required(EERROR_MESSAGES.required)
      .max(10, EERROR_MESSAGES.max_length)
      .min(3, EERROR_MESSAGES.min_length),
    password: yup
      .string()
      .required(EERROR_MESSAGES.required)
      .matches(PASSWORD_REGEXP, EERROR_MESSAGES.invalid_password),
  })
  .required()

export const AuthForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IAuthData>({
    resolver: yupResolver(schema),
  })

  const [apiError, setApiError] = useState('')

  const setToken = useTokenStore((state) => state.setAuth)

  const router = useRouter()

  const onSubmit: SubmitHandler<IAuthData> = async (data) => {
    const response = await AuthService.logIn(data)

    if (response.success) {
      createTokenCookie(response.token as string)
      setToken(true)
      // router.push('/products')
    } else {
      setApiError(response.message as string)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
      <FormControl isInvalid={'username' in errors}>
        <FormLabel htmlFor='username'>Username</FormLabel>
        <Input id='username' placeholder='username' {...register('username')} />
        <FormErrorMessage>
          {errors.username && errors.username.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={'password' in errors}>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input id='password' placeholder='password' {...register('password')} />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        size='lg'
        colorScheme='blue'
        variant='solid'
        isLoading={isSubmitting}
        type='submit'
      >
        Log In
      </Button>

      {apiError && (
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Text fontSize='lg' color='red'>
            {apiError}
          </Text>
        </Box>
      )}
    </form>
  )
}
