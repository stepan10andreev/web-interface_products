'use client'
import { ProductCard } from '@/components/ProductCard/ProductCard'
import { useDeleteProduct } from '@/components/hooks/useDeleteProduct'
import { useProduct } from '@/components/hooks/useProduct'
import { IProduct } from '@/services/products.service'
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export default function Product({ params }: { params: { id: string } }) {
  const [cashedData, setCashedData] = useState<IProduct | null>(null)

  const { data, isLoading, isSuccess } = useProduct(params.id)

  useEffect(() => {
    if (!data) {
      setCashedData(localStorage.getItem('products'))
    }
  })

  return (
    <Box p={5} maxW='600px' mx='auto'>
      {data && (
        <ProductCard
          id={data.id}
          title={data.title}
          image={data.image}
          price={data.price}
          category={data.category}
          description={data.description}
          detailed
        />
      )}
    </Box>
  )
}
