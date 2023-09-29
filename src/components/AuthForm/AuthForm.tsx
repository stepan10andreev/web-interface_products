'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'
import { IAuthData } from './authForm.interface'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PASSWORD_REGEXP } from '@/utils/constants/regexp'
import { EERROR_MESSAGES } from '@/utils/constants/error-messages'
import cls from './AuthForm.module.css'
import { AuthService } from '../services/auth.service'
import { create } from '../services/actions'

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

  const onSubmit: SubmitHandler<IAuthData> = async (data) => {
    console.log(data)
    const isAuth = await create(data)
    console.log(isAuth)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
      <FormControl isInvalid={'username' in errors}>
        <FormLabel htmlFor='username'>Username</FormLabel>
        <Input
          id='username'
          placeholder='username'
          {...register('username', {
            required: 'This is required',
            minLength: { value: 4, message: 'Minimum length should be 4' },
          })}
        />
        <FormErrorMessage>
          {errors.username && errors.username.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={'password' in errors}>
        <FormLabel htmlFor='password'>Password</FormLabel>
        <Input
          id='password'
          placeholder='password'
          {...register('password', {
            required: 'This is required',
            minLength: { value: 3, message: 'Minimum length should be 4' },
          })}
        />
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
    </form>
  )
}
