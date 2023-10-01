import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react'
import { register } from 'module'
import React, { FC, SyntheticEvent, useState } from 'react'
import { IEditFormProps } from './editForm.interface'
import { IProduct } from '@/services/products.service'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import cls from './EditForm.module.css'
import * as yup from 'yup'
import { EERROR_MESSAGES } from '@/utils/constants/error-messages'
import { usePutProduct } from '../hooks/usePutProduct'
import { getCashedData } from '@/utils/helpers/getCashedData'
import { setCashedData } from '@/utils/helpers/setCashedData'
import { IMAGE_DEFAULT_PATH } from '@/utils/constants/general-constants'

const schema = yup
  .object({
    title: yup.string().required(EERROR_MESSAGES.required),
    description: yup.string().required(EERROR_MESSAGES.required),
    category: yup.string().required(EERROR_MESSAGES.required),
    price: yup.number().required(EERROR_MESSAGES.required).positive().integer(),
  })
  .required()

export const EditForm: FC<IEditFormProps> = ({
  category,
  description,
  price,
  title,
  id,
  onCloseModal,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: yupResolver(schema),
  })
  const [titleValue, setTitleValue] = useState(title)
  const [descriptionValue, setDescriptionValue] = useState(description)
  const [priceValue, setPriceValue] = useState(String(price))
  const [categoryValue, setCategoryValue] = useState(category)

  const [apiError, setApiError] = useState(false)

  const { mutate, isLoading } = usePutProduct()

  const onSubmit: SubmitHandler<IProduct> = (formData, event) => {
    const ID = id && id < 30 ? id : 1
    const formDataWithID = { id: ID, ...formData }

    mutate(formDataWithID, {
      onSuccess(data) {
        const form = event?.target as HTMLFormElement
        const fileInput = form.elements[4] as HTMLInputElement
        const file = fileInput.files && fileInput.files[0]

        const products = getCashedData<IProduct[]>('products')

        let editedProducts: IProduct[] = []

        if (file) {
          const reader = new FileReader()
          reader.addEventListener('load', function (event) {
            editedProducts = products.map((product) => {
              if (product.id === id) {
                const newProduct: IProduct = {
                  id: product.id,
                  title: data.data.title,
                  description: data.data.description,
                  price: data.data.price,
                  category: data.data.category,
                  image: (event.target?.result as string) || IMAGE_DEFAULT_PATH,
                }
                return newProduct
              }

              return product
            })
            setCashedData('products', editedProducts)
          })

          reader.readAsDataURL(file)
        } else {
          editedProducts = products.map((product) => {
            if (product.id === id) {
              const newProduct: IProduct = {
                id: product.id,
                title: data.data.title,
                description: data.data.description,
                price: data.data.price,
                category: data.data.category,
                image: IMAGE_DEFAULT_PATH,
              }
              return newProduct
            }
            return product
          }) as IProduct[]
          setCashedData('products', editedProducts)
        }

        onCloseModal()

        location.reload()
      },
      onError() {
        setApiError(true)
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
      <FormControl isInvalid={'title' in errors}>
        <FormLabel fontSize={20} htmlFor='title'>
          Title
        </FormLabel>
        <Input
          type='text'
          id='title'
          placeholder='title'
          {...register('title')}
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
        />
        <FormErrorMessage>
          {errors.title && errors.title.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={'description' in errors}>
        <FormLabel fontSize={20} htmlFor='description'>
          Description
        </FormLabel>
        <Input
          type='text'
          id='description'
          placeholder='description'
          {...register('description')}
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={'price' in errors}>
        <FormLabel fontSize={20} htmlFor='price'>
          Price
        </FormLabel>
        <Input
          type='number'
          id='price'
          placeholder='price'
          {...register('price')}
          value={priceValue}
          onChange={(e) => setPriceValue(e.target.value)}
        />
        <FormErrorMessage>
          {errors.price && errors.price.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={'category' in errors}>
        <FormLabel fontSize={20} htmlFor='category'>
          Product category
        </FormLabel>
        <Input
          type='text'
          id='category'
          placeholder='category'
          {...register('category')}
          value={categoryValue}
          onChange={(e) => setCategoryValue(e.target.value)}
        />
        <FormErrorMessage>
          {errors.category && errors.category.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={'image' in errors}>
        <FormLabel fontSize={20} htmlFor='image'>
          Upload new product image
        </FormLabel>
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
          Save
        </Button>
        <Button variant='ghost' size='lg' onClick={onCloseModal}>
          Close
        </Button>
      </ButtonGroup>

      {apiError && (
        <Box display='flex' alignItems='center' justifyContent='space-between'>
          <Text fontSize='lg' color='red'>
            Error when saving new product info
          </Text>
        </Box>
      )}
    </form>
  )
}
