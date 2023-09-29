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
import React, { FC, useCallback, useMemo } from 'react'
import { IProductCardProps } from './productCard.interface'
import { useRouter } from 'next/navigation'

export const ProductCard: FC<IProductCardProps> = ({
  id,
  title,
  price,
  image,
  description,
  category,
  detailed = false,
}) => {
  const router = useRouter()

  const getProductInfo = useCallback(() => {
    router.push(`products/${id}`)
  }, [id, router])

  const deleteProduct = useCallback(() => {
    router.push(`products/${id}`)
  }, [id, router])

  const changeProduct = useCallback(() => {
    router.push(`products/${id}`)
  }, [id, router])

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
            <Heading size='md' mb='auto'>
              {title}
            </Heading>
            <Text>{description}</Text>
          </Stack>
          <Text color='blue.600' fontSize='2xl' mt='10'>
            {price}
          </Text>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='red' onClick={deleteProduct}>
              Delete
            </Button>
            <Button variant='solid' colorScheme='teal' onClick={changeProduct}>
              Change
            </Button>
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
            {price}
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
    category,
    changeProduct,
    deleteProduct,
    description,
    detailed,
    getProductInfo,
    id,
    image,
    price,
    title,
  ])

  return card
}
