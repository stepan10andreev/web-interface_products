import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
  Image,
  Stack,
  Button,
  ButtonGroup,
  CardFooter,
  Divider,
  Badge,
} from '@chakra-ui/react'
import React, { FC } from 'react'
import { IProductCardProps } from './productCard.interface'

export const ProductCard: FC<IProductCardProps> = ({
  id,
  title,
  price,
  image,
  description,
  category,
}) => {
  return (
    <Card height={'100%'}>
      <Badge p={1} colorScheme='green' fontSize='1em'>
        id: {id}
      </Badge>
      <Badge p={1} fontSize='1em' colorScheme='green'>
        {category}
      </Badge>
      <CardBody display={'flex'} flexDirection={'column'}>
        <Image src={image} alt='image' borderRadius='lg' boxSize='100px' />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{title}</Heading>
          <Text>{description}</Text>
        </Stack>
        <Text color='blue.600' fontSize='2xl' mt='auto'>
          {price}
        </Text>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='red'>
            Delete
          </Button>
          <Button variant='ghost' colorScheme='teal'>
            Change
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}
