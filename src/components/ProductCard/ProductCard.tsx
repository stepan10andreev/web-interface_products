import {
  Card,
  CardBody,
  Heading,
  Text,
  Image,
  Button,
  CardFooter,
  Divider,
  Badge,
  ButtonGroup,
  Stack,
} from '@chakra-ui/react'
import React, { FC, useCallback, useMemo, useState } from 'react'
import { IProductCardProps } from './productCard.interface'
import { useRouter } from 'next/navigation'
import { useDeleteProduct } from '../hooks/useDeleteProduct'
import { getCashedData } from '@/utils/helpers/getCashedData'
import { IProduct } from '@/services/products.service'
import { setCashedData } from '@/utils/helpers/setCashedData'
import { EditButton } from '../EditButton/EditButton'

export const ProductCard: FC<IProductCardProps> = (props) => {
  const {
    id,
    title,
    price,
    image,
    description,
    category,
    detailed = false,
  } = props
  const [apiError, setApiError] = useState(false)

  const router = useRouter()

  const { mutate } = useDeleteProduct()

  const getProductInfo = useCallback(() => {
    router.push(`products/${id}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const deleteProduct = useCallback(() => {
    const ID = id && id < 30 ? id : 1

    mutate(String(ID), {
      onSuccess: () => {
        const products = getCashedData<IProduct[]>('products')

        setCashedData(
          'products',
          products.filter((product) => product.id !== id)
        )

        router.push(`/products`)
      },
      onError: () => {
        setApiError(true)
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const card = useMemo(() => {
    return detailed ? (
      <Card>
        <Badge p={1} colorScheme='green' fontSize='1em'>
          id: {id}
        </Badge>

        <Badge p={1} fontSize='1em' colorScheme='green'>
          {category}
        </Badge>

        <CardBody display='flex' flexDirection='column' gap={5}>
          <Image src={image} alt='image' borderRadius='lg' boxSize='100px' />

          <Stack mt='6' spacing='3'>
            <Heading size='xl' mb='auto'>
              {title}
            </Heading>

            <Text fontSize={16}>{description}</Text>
          </Stack>

          <Text color='blue.600' fontSize='2xl' mt='10'>
            {price}$
          </Text>
        </CardBody>

        <Divider />

        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='red' onClick={deleteProduct}>
              Delete
            </Button>

            <EditButton {...props} />

            {apiError && (
              <Text color='red' fontSize='2xl' mt='20' alignSelf='flex-start'>
                Error during deletion
              </Text>
            )}
          </ButtonGroup>
        </CardFooter>
      </Card>
    ) : (
      <Card height='100%'>
        <Badge p={1} colorScheme='green' fontSize='1em'>
          id: {id}
        </Badge>

        <Badge p={1} fontSize='1em' colorScheme='green'>
          {category}
        </Badge>

        <CardBody display='flex' flexDirection='column' gap={5}>
          <Image src={image} alt='image' borderRadius='lg' boxSize='100px' />

          <Heading size='md' mb='auto'>
            {title}
          </Heading>

          <Text color='blue.600' fontSize='2xl' mt='10'>
            {price}$
          </Text>
        </CardBody>

        <Divider />

        <CardFooter>
          <Button variant='solid' colorScheme='green' onClick={getProductInfo}>
            More details
          </Button>
        </CardFooter>
      </Card>
    )
  }, [
    apiError,
    category,
    deleteProduct,
    description,
    detailed,
    getProductInfo,
    id,
    image,
    price,
    props,
    title,
  ])

  return card
}
