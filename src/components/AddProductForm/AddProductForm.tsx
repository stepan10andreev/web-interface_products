'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  ButtonGroup,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { EERROR_MESSAGES } from '@/utils/constants/error-messages'
import cls from './AddProduct.module.css'
import { BaseSyntheticEvent, FC, SyntheticEvent, useState } from 'react'
import { Text } from '@chakra-ui/react'
import { useTokenStore } from '@/store/token'
import { useRouter } from 'next/navigation'
import { IProduct } from '@/services/products.service'
import { IAddProductFormProps } from './addProductForm.interface'
import { usePostProduct } from '../hooks/usePostProduct'
import { getCashedData } from '@/utils/helpers/getCashedData'
import { setCashedData } from '@/utils/helpers/setCashedData'
import { v4 as uuidv4 } from 'uuid'
import { IMAGE_DEFAULT_PATH } from '@/utils/constants/general-constants'

const schema = yup
  .object({
    title: yup.string().required(EERROR_MESSAGES.required),
    description: yup.string().required(),
    category: yup.string().required(),
    price: yup.number().required().positive().integer(),
  })
  .required()

export const AddProductForm: FC<IAddProductFormProps> = ({ onCloseModal }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<IProduct>({
    resolver: yupResolver(schema),
  })
  const [apiError, setApiError] = useState(false)

  const { mutate, isLoading } = usePostProduct()

  const onSubmit: SubmitHandler<IProduct> = (formData, event) => {
    mutate(formData, {
      onSuccess(data) {
        const form = event?.target as HTMLFormElement

        const fileInput = form.elements[4] as HTMLInputElement
        const file = fileInput.files && fileInput.files[0]

        if (file) {
          const reader = new FileReader()
          reader.addEventListener('load', function (event) {
            const newProduct = {
              id: uuidv4().substring(0, 3),
              title: data.data.title,
              description: data.data.description,
              price: data.data.price,
              category: data.data.category,
              image: event.target?.result || IMAGE_DEFAULT_PATH,
            }

            const products = getCashedData<IProduct[]>('products')

            setCashedData('products', [...products, newProduct])

            onCloseModal()

            location.reload()
          })

          reader.readAsDataURL(file)
        }
      },
      onError() {
        setApiError(true)
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
      <FormControl isInvalid={'title' in errors}>
        <FormLabel htmlFor='title'>Title</FormLabel>
        <Input id='title' placeholder='title' {...register('title')} />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={'description' in errors}>
        <FormLabel htmlFor='description'>description</FormLabel>
        <Input
          id='description'
          placeholder='description'
          {...register('description')}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={'price' in errors}>
        <FormLabel htmlFor='price'>price</FormLabel>
        <Input
          type='number'
          id='price'
          placeholder='price'
          {...register('price')}
        />
        <FormErrorMessage>
          {errors.price && errors.price.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={'category' in errors}>
        <FormLabel htmlFor='category'>category</FormLabel>
        <Input id='category' placeholder='category' {...register('category')} />
        <FormErrorMessage>
          {errors.category && errors.category.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={'image' in errors}>
        <FormLabel htmlFor='image'>image</FormLabel>

        <Input
          type='file'
          id='image'
          placeholder='image'
          {...register('image')}
        />
        <FormErrorMessage>
          {errors.image && errors.image.message}
        </FormErrorMessage>
      </FormControl>
      <ButtonGroup spacing='2'>
        <Button
          size='lg'
          colorScheme='green'
          variant='solid'
          isLoading={isLoading}
          type='submit'
        >
          Add
        </Button>
        <Button variant='ghost' size='lg' onClick={onCloseModal}>
          Close
        </Button>
      </ButtonGroup>

      {apiError && (
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Text fontSize='lg' color='red'>
            Error when adding product
          </Text>
        </Box>
      )}
    </form>
  )
}
